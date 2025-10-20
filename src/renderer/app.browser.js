// node_modules/fabric/dist/index.min.mjs
function t(t2, e, s) {
  return (e = function(t3) {
    var e2 = function(t4, e3) {
      if (typeof t4 != "object" || !t4)
        return t4;
      var s2 = t4[Symbol.toPrimitive];
      if (s2 !== undefined) {
        var i = s2.call(t4, e3 || "default");
        if (typeof i != "object")
          return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (e3 === "string" ? String : Number)(t4);
    }(t3, "string");
    return typeof e2 == "symbol" ? e2 : e2 + "";
  }(e)) in t2 ? Object.defineProperty(t2, e, { value: s, enumerable: true, configurable: true, writable: true }) : t2[e] = s, t2;
}
function e(t2, e2) {
  var s = Object.keys(t2);
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t2);
    e2 && (i = i.filter(function(e3) {
      return Object.getOwnPropertyDescriptor(t2, e3).enumerable;
    })), s.push.apply(s, i);
  }
  return s;
}
function s(s2) {
  for (var i = 1;i < arguments.length; i++) {
    var r = arguments[i] != null ? arguments[i] : {};
    i % 2 ? e(Object(r), true).forEach(function(e2) {
      t(s2, e2, r[e2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(s2, Object.getOwnPropertyDescriptors(r)) : e(Object(r)).forEach(function(t2) {
      Object.defineProperty(s2, t2, Object.getOwnPropertyDescriptor(r, t2));
    });
  }
  return s2;
}
function i(t2, e2) {
  if (t2 == null)
    return {};
  var s2, i2, r = function(t3, e3) {
    if (t3 == null)
      return {};
    var s3 = {};
    for (var i3 in t3)
      if ({}.hasOwnProperty.call(t3, i3)) {
        if (e3.indexOf(i3) >= 0)
          continue;
        s3[i3] = t3[i3];
      }
    return s3;
  }(t2, e2);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t2);
    for (i2 = 0;i2 < n.length; i2++)
      s2 = n[i2], e2.indexOf(s2) >= 0 || {}.propertyIsEnumerable.call(t2, s2) && (r[s2] = t2[s2]);
  }
  return r;
}
function r(t2, e2) {
  return e2 || (e2 = t2.slice(0)), Object.freeze(Object.defineProperties(t2, { raw: { value: Object.freeze(e2) } }));
}

class n {
  constructor() {
    t(this, "browserShadowBlurConstant", 1), t(this, "DPI", 96), t(this, "devicePixelRatio", typeof window != "undefined" ? window.devicePixelRatio : 1), t(this, "perfLimitSizeTotal", 2097152), t(this, "maxCacheSideLimit", 4096), t(this, "minCacheSideLimit", 256), t(this, "disableStyleCopyPaste", false), t(this, "enableGLFiltering", true), t(this, "textureSize", 4096), t(this, "forceGLPutImageData", false), t(this, "cachesBoundsOfCurve", false), t(this, "fontPaths", {}), t(this, "NUM_FRACTION_DIGITS", 4);
  }
}
var o = new class extends n {
  constructor(t2) {
    super(), this.configure(t2);
  }
  configure() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    Object.assign(this, t2);
  }
  addFonts() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.fontPaths = s(s({}, this.fontPaths), t2);
  }
  removeFonts() {
    (arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []).forEach((t2) => {
      delete this.fontPaths[t2];
    });
  }
  clearFonts() {
    this.fontPaths = {};
  }
  restoreDefaults(t2) {
    const e2 = new n, s2 = (t2 == null ? undefined : t2.reduce((t3, s3) => (t3[s3] = e2[s3], t3), {})) || e2;
    this.configure(s2);
  }
};
var a = function(t2) {
  for (var e2 = arguments.length, s2 = new Array(e2 > 1 ? e2 - 1 : 0), i2 = 1;i2 < e2; i2++)
    s2[i2 - 1] = arguments[i2];
  return console[t2]("fabric", ...s2);
};

class h extends Error {
  constructor(t2, e2) {
    super("fabric: ".concat(t2), e2);
  }
}

class c extends h {
  constructor(t2) {
    super("".concat(t2, " 'options.signal' is in 'aborted' state"));
  }
}

class l {
}

class u extends l {
  testPrecision(t2, e2) {
    const s2 = "precision ".concat(e2, ` float;
void main(){}`), i2 = t2.createShader(t2.FRAGMENT_SHADER);
    return !!i2 && (t2.shaderSource(i2, s2), t2.compileShader(i2), !!t2.getShaderParameter(i2, t2.COMPILE_STATUS));
  }
  queryWebGL(t2) {
    const e2 = t2.getContext("webgl");
    e2 && (this.maxTextureSize = e2.getParameter(e2.MAX_TEXTURE_SIZE), this.GLPrecision = ["highp", "mediump", "lowp"].find((t3) => this.testPrecision(e2, t3)), e2.getExtension("WEBGL_lose_context").loseContext(), a("log", "WebGL: max texture size ".concat(this.maxTextureSize)));
  }
  isSupported(t2) {
    return !!this.maxTextureSize && this.maxTextureSize >= t2;
  }
}
var d = {};
var g;
var p = () => g || (g = { document, window, isTouchSupported: "ontouchstart" in window || "ontouchstart" in document || window && window.navigator && window.navigator.maxTouchPoints > 0, WebGLProbe: new u, dispose() {}, copyPasteData: d });
var m = () => p().document;
var v = () => p().window;
var y = () => {
  var t2;
  return Math.max((t2 = o.devicePixelRatio) !== null && t2 !== undefined ? t2 : v().devicePixelRatio, 1);
};
var _ = new class {
  constructor() {
    t(this, "charWidthsCache", {}), t(this, "boundsOfCurveCache", {});
  }
  getFontCache(t2) {
    let { fontFamily: e2, fontStyle: s2, fontWeight: i2 } = t2;
    e2 = e2.toLowerCase(), this.charWidthsCache[e2] || (this.charWidthsCache[e2] = {});
    const r2 = this.charWidthsCache[e2], n2 = "".concat(s2.toLowerCase(), "_").concat((i2 + "").toLowerCase());
    return r2[n2] || (r2[n2] = {}), r2[n2];
  }
  clearFontCache(t2) {
    (t2 = (t2 || "").toLowerCase()) ? this.charWidthsCache[t2] && delete this.charWidthsCache[t2] : this.charWidthsCache = {};
  }
  limitDimsByArea(t2) {
    const { perfLimitSizeTotal: e2 } = o, s2 = Math.sqrt(e2 * t2);
    return [Math.floor(s2), Math.floor(e2 / s2)];
  }
};
var x = "6.7.1";
function C() {}
var b = Math.PI / 2;
var S = 2 * Math.PI;
var w = Math.PI / 180;
var T = Object.freeze([1, 0, 0, 1, 0, 0]);
var O = 16;
var k = 0.4477152502;
var D = "center";
var M = "left";
var P = "top";
var E = "bottom";
var A = "right";
var j = "none";
var F = /\r?\n/;
var L = "moving";
var R = "scaling";
var I = "rotating";
var B = "rotate";
var X = "skewing";
var Y = "resizing";
var W = "modifyPoly";
var V = "modifyPath";
var z = "changed";
var G = "scale";
var H = "scaleX";
var N = "scaleY";
var U = "skewX";
var q = "skewY";
var K = "fill";
var J = "stroke";
var Q = "modified";
var Z = "json";
var $ = "svg";
var tt = new class {
  constructor() {
    this[Z] = new Map, this[$] = new Map;
  }
  has(t2) {
    return this[Z].has(t2);
  }
  getClass(t2) {
    const e2 = this[Z].get(t2);
    if (!e2)
      throw new h("No class registered for ".concat(t2));
    return e2;
  }
  setClass(t2, e2) {
    e2 ? this[Z].set(e2, t2) : (this[Z].set(t2.type, t2), this[Z].set(t2.type.toLowerCase(), t2));
  }
  getSVGClass(t2) {
    return this[$].get(t2);
  }
  setSVGClass(t2, e2) {
    this[$].set(e2 != null ? e2 : t2.type.toLowerCase(), t2);
  }
};
var et = new class extends Array {
  remove(t2) {
    const e2 = this.indexOf(t2);
    e2 > -1 && this.splice(e2, 1);
  }
  cancelAll() {
    const t2 = this.splice(0);
    return t2.forEach((t3) => t3.abort()), t2;
  }
  cancelByCanvas(t2) {
    if (!t2)
      return [];
    const e2 = this.filter((e3) => {
      var s2;
      return e3.target === t2 || typeof e3.target == "object" && ((s2 = e3.target) === null || s2 === undefined ? undefined : s2.canvas) === t2;
    });
    return e2.forEach((t3) => t3.abort()), e2;
  }
  cancelByTarget(t2) {
    if (!t2)
      return [];
    const e2 = this.filter((e3) => e3.target === t2);
    return e2.forEach((t3) => t3.abort()), e2;
  }
};

class st {
  constructor() {
    t(this, "__eventListeners", {});
  }
  on(t2, e2) {
    if (this.__eventListeners || (this.__eventListeners = {}), typeof t2 == "object")
      return Object.entries(t2).forEach((t3) => {
        let [e3, s2] = t3;
        this.on(e3, s2);
      }), () => this.off(t2);
    if (e2) {
      const s2 = t2;
      return this.__eventListeners[s2] || (this.__eventListeners[s2] = []), this.__eventListeners[s2].push(e2), () => this.off(s2, e2);
    }
    return () => false;
  }
  once(t2, e2) {
    if (typeof t2 == "object") {
      const e3 = [];
      return Object.entries(t2).forEach((t3) => {
        let [s2, i2] = t3;
        e3.push(this.once(s2, i2));
      }), () => e3.forEach((t3) => t3());
    }
    if (e2) {
      const s2 = this.on(t2, function() {
        for (var t3 = arguments.length, i2 = new Array(t3), r2 = 0;r2 < t3; r2++)
          i2[r2] = arguments[r2];
        e2.call(this, ...i2), s2();
      });
      return s2;
    }
    return () => false;
  }
  _removeEventListener(t2, e2) {
    if (this.__eventListeners[t2])
      if (e2) {
        const s2 = this.__eventListeners[t2], i2 = s2.indexOf(e2);
        i2 > -1 && s2.splice(i2, 1);
      } else
        this.__eventListeners[t2] = [];
  }
  off(t2, e2) {
    if (this.__eventListeners)
      if (t2 === undefined)
        for (const t3 in this.__eventListeners)
          this._removeEventListener(t3);
      else
        typeof t2 == "object" ? Object.entries(t2).forEach((t3) => {
          let [e3, s2] = t3;
          this._removeEventListener(e3, s2);
        }) : this._removeEventListener(t2, e2);
  }
  fire(t2, e2) {
    var s2;
    if (!this.__eventListeners)
      return;
    const i2 = (s2 = this.__eventListeners[t2]) === null || s2 === undefined ? undefined : s2.concat();
    if (i2)
      for (let t3 = 0;t3 < i2.length; t3++)
        i2[t3].call(this, e2 || {});
  }
}
var it = (t2, e2) => {
  const s2 = t2.indexOf(e2);
  return s2 !== -1 && t2.splice(s2, 1), t2;
};
var rt = (t2) => {
  if (t2 === 0)
    return 1;
  switch (Math.abs(t2) / b) {
    case 1:
    case 3:
      return 0;
    case 2:
      return -1;
  }
  return Math.cos(t2);
};
var nt = (t2) => {
  if (t2 === 0)
    return 0;
  const e2 = t2 / b, s2 = Math.sign(t2);
  switch (e2) {
    case 1:
      return s2;
    case 2:
      return 0;
    case 3:
      return -s2;
  }
  return Math.sin(t2);
};

class ot {
  constructor() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0, e2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    typeof t2 == "object" ? (this.x = t2.x, this.y = t2.y) : (this.x = t2, this.y = e2);
  }
  add(t2) {
    return new ot(this.x + t2.x, this.y + t2.y);
  }
  addEquals(t2) {
    return this.x += t2.x, this.y += t2.y, this;
  }
  scalarAdd(t2) {
    return new ot(this.x + t2, this.y + t2);
  }
  scalarAddEquals(t2) {
    return this.x += t2, this.y += t2, this;
  }
  subtract(t2) {
    return new ot(this.x - t2.x, this.y - t2.y);
  }
  subtractEquals(t2) {
    return this.x -= t2.x, this.y -= t2.y, this;
  }
  scalarSubtract(t2) {
    return new ot(this.x - t2, this.y - t2);
  }
  scalarSubtractEquals(t2) {
    return this.x -= t2, this.y -= t2, this;
  }
  multiply(t2) {
    return new ot(this.x * t2.x, this.y * t2.y);
  }
  scalarMultiply(t2) {
    return new ot(this.x * t2, this.y * t2);
  }
  scalarMultiplyEquals(t2) {
    return this.x *= t2, this.y *= t2, this;
  }
  divide(t2) {
    return new ot(this.x / t2.x, this.y / t2.y);
  }
  scalarDivide(t2) {
    return new ot(this.x / t2, this.y / t2);
  }
  scalarDivideEquals(t2) {
    return this.x /= t2, this.y /= t2, this;
  }
  eq(t2) {
    return this.x === t2.x && this.y === t2.y;
  }
  lt(t2) {
    return this.x < t2.x && this.y < t2.y;
  }
  lte(t2) {
    return this.x <= t2.x && this.y <= t2.y;
  }
  gt(t2) {
    return this.x > t2.x && this.y > t2.y;
  }
  gte(t2) {
    return this.x >= t2.x && this.y >= t2.y;
  }
  lerp(t2) {
    let e2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
    return e2 = Math.max(Math.min(1, e2), 0), new ot(this.x + (t2.x - this.x) * e2, this.y + (t2.y - this.y) * e2);
  }
  distanceFrom(t2) {
    const e2 = this.x - t2.x, s2 = this.y - t2.y;
    return Math.sqrt(e2 * e2 + s2 * s2);
  }
  midPointFrom(t2) {
    return this.lerp(t2);
  }
  min(t2) {
    return new ot(Math.min(this.x, t2.x), Math.min(this.y, t2.y));
  }
  max(t2) {
    return new ot(Math.max(this.x, t2.x), Math.max(this.y, t2.y));
  }
  toString() {
    return "".concat(this.x, ",").concat(this.y);
  }
  setXY(t2, e2) {
    return this.x = t2, this.y = e2, this;
  }
  setX(t2) {
    return this.x = t2, this;
  }
  setY(t2) {
    return this.y = t2, this;
  }
  setFromPoint(t2) {
    return this.x = t2.x, this.y = t2.y, this;
  }
  swap(t2) {
    const e2 = this.x, s2 = this.y;
    this.x = t2.x, this.y = t2.y, t2.x = e2, t2.y = s2;
  }
  clone() {
    return new ot(this.x, this.y);
  }
  rotate(t2) {
    let e2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : at;
    const s2 = nt(t2), i2 = rt(t2), r2 = this.subtract(e2);
    return new ot(r2.x * i2 - r2.y * s2, r2.x * s2 + r2.y * i2).add(e2);
  }
  transform(t2) {
    let e2 = arguments.length > 1 && arguments[1] !== undefined && arguments[1];
    return new ot(t2[0] * this.x + t2[2] * this.y + (e2 ? 0 : t2[4]), t2[1] * this.x + t2[3] * this.y + (e2 ? 0 : t2[5]));
  }
}
var at = new ot(0, 0);
var ht = (t2) => !!t2 && Array.isArray(t2._objects);
function ct(e2) {

  class s2 extends e2 {
    constructor() {
      super(...arguments), t(this, "_objects", []);
    }
    _onObjectAdded(t2) {}
    _onObjectRemoved(t2) {}
    _onStackOrderChanged(t2) {}
    add() {
      for (var t2 = arguments.length, e3 = new Array(t2), s3 = 0;s3 < t2; s3++)
        e3[s3] = arguments[s3];
      const i2 = this._objects.push(...e3);
      return e3.forEach((t3) => this._onObjectAdded(t3)), i2;
    }
    insertAt(t2) {
      for (var e3 = arguments.length, s3 = new Array(e3 > 1 ? e3 - 1 : 0), i2 = 1;i2 < e3; i2++)
        s3[i2 - 1] = arguments[i2];
      return this._objects.splice(t2, 0, ...s3), s3.forEach((t3) => this._onObjectAdded(t3)), this._objects.length;
    }
    remove() {
      const t2 = this._objects, e3 = [];
      for (var s3 = arguments.length, i2 = new Array(s3), r2 = 0;r2 < s3; r2++)
        i2[r2] = arguments[r2];
      return i2.forEach((s4) => {
        const i3 = t2.indexOf(s4);
        i3 !== -1 && (t2.splice(i3, 1), e3.push(s4), this._onObjectRemoved(s4));
      }), e3;
    }
    forEachObject(t2) {
      this.getObjects().forEach((e3, s3, i2) => t2(e3, s3, i2));
    }
    getObjects() {
      for (var t2 = arguments.length, e3 = new Array(t2), s3 = 0;s3 < t2; s3++)
        e3[s3] = arguments[s3];
      return e3.length === 0 ? [...this._objects] : this._objects.filter((t3) => t3.isType(...e3));
    }
    item(t2) {
      return this._objects[t2];
    }
    isEmpty() {
      return this._objects.length === 0;
    }
    size() {
      return this._objects.length;
    }
    contains(t2, e3) {
      return !!this._objects.includes(t2) || !!e3 && this._objects.some((e4) => e4 instanceof s2 && e4.contains(t2, true));
    }
    complexity() {
      return this._objects.reduce((t2, e3) => t2 += e3.complexity ? e3.complexity() : 0, 0);
    }
    sendObjectToBack(t2) {
      return !(!t2 || t2 === this._objects[0]) && (it(this._objects, t2), this._objects.unshift(t2), this._onStackOrderChanged(t2), true);
    }
    bringObjectToFront(t2) {
      return !(!t2 || t2 === this._objects[this._objects.length - 1]) && (it(this._objects, t2), this._objects.push(t2), this._onStackOrderChanged(t2), true);
    }
    sendObjectBackwards(t2, e3) {
      if (!t2)
        return false;
      const s3 = this._objects.indexOf(t2);
      if (s3 !== 0) {
        const i2 = this.findNewLowerIndex(t2, s3, e3);
        return it(this._objects, t2), this._objects.splice(i2, 0, t2), this._onStackOrderChanged(t2), true;
      }
      return false;
    }
    bringObjectForward(t2, e3) {
      if (!t2)
        return false;
      const s3 = this._objects.indexOf(t2);
      if (s3 !== this._objects.length - 1) {
        const i2 = this.findNewUpperIndex(t2, s3, e3);
        return it(this._objects, t2), this._objects.splice(i2, 0, t2), this._onStackOrderChanged(t2), true;
      }
      return false;
    }
    moveObjectTo(t2, e3) {
      return t2 !== this._objects[e3] && (it(this._objects, t2), this._objects.splice(e3, 0, t2), this._onStackOrderChanged(t2), true);
    }
    findNewLowerIndex(t2, e3, s3) {
      let i2;
      if (s3) {
        i2 = e3;
        for (let s4 = e3 - 1;s4 >= 0; --s4)
          if (t2.isOverlapping(this._objects[s4])) {
            i2 = s4;
            break;
          }
      } else
        i2 = e3 - 1;
      return i2;
    }
    findNewUpperIndex(t2, e3, s3) {
      let i2;
      if (s3) {
        i2 = e3;
        for (let s4 = e3 + 1;s4 < this._objects.length; ++s4)
          if (t2.isOverlapping(this._objects[s4])) {
            i2 = s4;
            break;
          }
      } else
        i2 = e3 + 1;
      return i2;
    }
    collectObjects(t2) {
      let { left: e3, top: s3, width: i2, height: r2 } = t2, { includeIntersecting: n2 = true } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      const o2 = [], a2 = new ot(e3, s3), h2 = a2.add(new ot(i2, r2));
      for (let t3 = this._objects.length - 1;t3 >= 0; t3--) {
        const e4 = this._objects[t3];
        e4.selectable && e4.visible && (n2 && e4.intersectsWithRect(a2, h2) || e4.isContainedWithinRect(a2, h2) || n2 && e4.containsPoint(a2) || n2 && e4.containsPoint(h2)) && o2.push(e4);
      }
      return o2;
    }
  }
  return s2;
}

class lt extends st {
  _setOptions() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    for (const e2 in t2)
      this.set(e2, t2[e2]);
  }
  _setObject(t2) {
    for (const e2 in t2)
      this._set(e2, t2[e2]);
  }
  set(t2, e2) {
    return typeof t2 == "object" ? this._setObject(t2) : this._set(t2, e2), this;
  }
  _set(t2, e2) {
    this[t2] = e2;
  }
  toggle(t2) {
    const e2 = this.get(t2);
    return typeof e2 == "boolean" && this.set(t2, !e2), this;
  }
  get(t2) {
    return this[t2];
  }
}
function ut(t2) {
  return v().requestAnimationFrame(t2);
}
function dt(t2) {
  return v().cancelAnimationFrame(t2);
}
var gt = 0;
var ft = () => gt++;
var pt = () => {
  const t2 = m().createElement("canvas");
  if (!t2 || t2.getContext === undefined)
    throw new h("Failed to create `canvas` element");
  return t2;
};
var mt = () => m().createElement("img");
var vt = (t2) => {
  const e2 = pt();
  return e2.width = t2.width, e2.height = t2.height, e2;
};
var yt = (t2, e2, s2) => t2.toDataURL("image/".concat(e2), s2);
var _t = (t2, e2, s2) => new Promise((i2, r2) => {
  t2.toBlob(i2, "image/".concat(e2), s2);
});
var xt = (t2) => t2 * w;
var Ct = (t2) => t2 / w;
var bt = (t2) => t2.every((t3, e2) => t3 === T[e2]);
var St = (t2, e2, s2) => new ot(t2).transform(e2, s2);
var wt = (t2) => {
  const e2 = 1 / (t2[0] * t2[3] - t2[1] * t2[2]), s2 = [e2 * t2[3], -e2 * t2[1], -e2 * t2[2], e2 * t2[0], 0, 0], { x: i2, y: r2 } = new ot(t2[4], t2[5]).transform(s2, true);
  return s2[4] = -i2, s2[5] = -r2, s2;
};
var Tt = (t2, e2, s2) => [t2[0] * e2[0] + t2[2] * e2[1], t2[1] * e2[0] + t2[3] * e2[1], t2[0] * e2[2] + t2[2] * e2[3], t2[1] * e2[2] + t2[3] * e2[3], s2 ? 0 : t2[0] * e2[4] + t2[2] * e2[5] + t2[4], s2 ? 0 : t2[1] * e2[4] + t2[3] * e2[5] + t2[5]];
var Ot = (t2, e2) => t2.reduceRight((t3, s2) => s2 && t3 ? Tt(s2, t3, e2) : s2 || t3, undefined) || T.concat();
var kt = (t2) => {
  let [e2, s2] = t2;
  return Math.atan2(s2, e2);
};
var Dt = (t2) => {
  const e2 = kt(t2), s2 = Math.pow(t2[0], 2) + Math.pow(t2[1], 2), i2 = Math.sqrt(s2), r2 = (t2[0] * t2[3] - t2[2] * t2[1]) / i2, n2 = Math.atan2(t2[0] * t2[2] + t2[1] * t2[3], s2);
  return { angle: Ct(e2), scaleX: i2, scaleY: r2, skewX: Ct(n2), skewY: 0, translateX: t2[4] || 0, translateY: t2[5] || 0 };
};
var Mt = function(t2) {
  return [1, 0, 0, 1, t2, arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0];
};
function Pt() {
  let { angle: t2 = 0 } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}, { x: e2 = 0, y: s2 = 0 } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const i2 = xt(t2), r2 = rt(i2), n2 = nt(i2);
  return [r2, n2, -n2, r2, e2 ? e2 - (r2 * e2 - n2 * s2) : 0, s2 ? s2 - (n2 * e2 + r2 * s2) : 0];
}
var Et = function(t2) {
  return [t2, 0, 0, arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : t2, 0, 0];
};
var At = (t2) => Math.tan(xt(t2));
var jt = (t2) => [1, 0, At(t2), 1, 0, 0];
var Ft = (t2) => [1, At(t2), 0, 1, 0, 0];
var Lt = (t2) => {
  let { scaleX: e2 = 1, scaleY: s2 = 1, flipX: i2 = false, flipY: r2 = false, skewX: n2 = 0, skewY: o2 = 0 } = t2, a2 = Et(i2 ? -e2 : e2, r2 ? -s2 : s2);
  return n2 && (a2 = Tt(a2, jt(n2), true)), o2 && (a2 = Tt(a2, Ft(o2), true)), a2;
};
var Rt = (t2) => {
  const { translateX: e2 = 0, translateY: s2 = 0, angle: i2 = 0 } = t2;
  let r2 = Mt(e2, s2);
  i2 && (r2 = Tt(r2, Pt({ angle: i2 })));
  const n2 = Lt(t2);
  return bt(n2) || (r2 = Tt(r2, n2)), r2;
};
var It = function(t2) {
  let { signal: e2, crossOrigin: s2 = null } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new Promise(function(i2, r2) {
    if (e2 && e2.aborted)
      return r2(new c("loadImage"));
    const n2 = mt();
    let o2;
    e2 && (o2 = function(t3) {
      n2.src = "", r2(t3);
    }, e2.addEventListener("abort", o2, { once: true }));
    const a2 = function() {
      n2.onload = n2.onerror = null, o2 && (e2 == null || e2.removeEventListener("abort", o2)), i2(n2);
    };
    t2 ? (n2.onload = a2, n2.onerror = function() {
      o2 && (e2 == null || e2.removeEventListener("abort", o2)), r2(new h("Error loading ".concat(n2.src)));
    }, s2 && (n2.crossOrigin = s2), n2.src = t2) : a2();
  });
};
var Bt = function(t2) {
  let { signal: e2, reviver: s2 = C } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new Promise((i2, r2) => {
    const n2 = [];
    e2 && e2.addEventListener("abort", r2, { once: true }), Promise.all(t2.map((t3) => tt.getClass(t3.type).fromObject(t3, { signal: e2 }).then((e3) => (s2(t3, e3), n2.push(e3), e3)))).then(i2).catch((t3) => {
      n2.forEach((t4) => {
        t4.dispose && t4.dispose();
      }), r2(t3);
    }).finally(() => {
      e2 && e2.removeEventListener("abort", r2);
    });
  });
};
var Xt = function(t2) {
  let { signal: e2 } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new Promise((s2, i2) => {
    const r2 = [];
    e2 && e2.addEventListener("abort", i2, { once: true });
    const n2 = Object.values(t2).map((t3) => t3 && t3.type && tt.has(t3.type) ? Bt([t3], { signal: e2 }).then((t4) => {
      let [e3] = t4;
      return r2.push(e3), e3;
    }) : t3), o2 = Object.keys(t2);
    Promise.all(n2).then((t3) => t3.reduce((t4, e3, s3) => (t4[o2[s3]] = e3, t4), {})).then(s2).catch((t3) => {
      r2.forEach((t4) => {
        t4.dispose && t4.dispose();
      }), i2(t3);
    }).finally(() => {
      e2 && e2.removeEventListener("abort", i2);
    });
  });
};
var Yt = function(t2) {
  return (arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : []).reduce((e2, s2) => ((s2 in t2) && (e2[s2] = t2[s2]), e2), {});
};
var Wt = (t2, e2) => Object.keys(t2).reduce((s2, i2) => (e2(t2[i2], i2, t2) && (s2[i2] = t2[i2]), s2), {});
var Vt = (t2, e2) => parseFloat(Number(t2).toFixed(e2));
var zt = (t2) => "matrix(" + t2.map((t3) => Vt(t3, o.NUM_FRACTION_DIGITS)).join(" ") + ")";
var Gt = (t2) => !!t2 && t2.toLive !== undefined;
var Ht = (t2) => !!t2 && typeof t2.toObject == "function";
var Nt = (t2) => !!t2 && t2.offsetX !== undefined && ("source" in t2);
var Ut = (t2) => !!t2 && ("multiSelectionStacking" in t2);
function qt(t2) {
  const e2 = t2 && Kt(t2);
  let s2 = 0, i2 = 0;
  if (!t2 || !e2)
    return { left: s2, top: i2 };
  let r2 = t2;
  const n2 = e2.documentElement, o2 = e2.body || { scrollLeft: 0, scrollTop: 0 };
  for (;r2 && (r2.parentNode || r2.host) && (r2 = r2.parentNode || r2.host, r2 === e2 ? (s2 = o2.scrollLeft || n2.scrollLeft || 0, i2 = o2.scrollTop || n2.scrollTop || 0) : (s2 += r2.scrollLeft || 0, i2 += r2.scrollTop || 0), r2.nodeType !== 1 || r2.style.position !== "fixed"); )
    ;
  return { left: s2, top: i2 };
}
var Kt = (t2) => t2.ownerDocument || null;
var Jt = (t2) => {
  var e2;
  return ((e2 = t2.ownerDocument) === null || e2 === undefined ? undefined : e2.defaultView) || null;
};
var Qt = function(t2, e2, s2) {
  let { width: i2, height: r2 } = s2, n2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  t2.width = i2, t2.height = r2, n2 > 1 && (t2.setAttribute("width", (i2 * n2).toString()), t2.setAttribute("height", (r2 * n2).toString()), e2.scale(n2, n2));
};
var Zt = (t2, e2) => {
  let { width: s2, height: i2 } = e2;
  s2 && (t2.style.width = typeof s2 == "number" ? "".concat(s2, "px") : s2), i2 && (t2.style.height = typeof i2 == "number" ? "".concat(i2, "px") : i2);
};
function $t(t2) {
  return t2.onselectstart !== undefined && (t2.onselectstart = () => false), t2.style.userSelect = j, t2;
}

class te {
  constructor(e2) {
    t(this, "_originalCanvasStyle", undefined), t(this, "lower", undefined);
    const s2 = this.createLowerCanvas(e2);
    this.lower = { el: s2, ctx: s2.getContext("2d") };
  }
  createLowerCanvas(t2) {
    const e2 = (s2 = t2) && s2.getContext !== undefined ? t2 : t2 && m().getElementById(t2) || pt();
    var s2;
    if (e2.hasAttribute("data-fabric"))
      throw new h("Trying to initialize a canvas that has already been initialized. Did you forget to dispose the canvas?");
    return this._originalCanvasStyle = e2.style.cssText, e2.setAttribute("data-fabric", "main"), e2.classList.add("lower-canvas"), e2;
  }
  cleanupDOM(t2) {
    let { width: e2, height: s2 } = t2;
    const { el: i2 } = this.lower;
    i2.classList.remove("lower-canvas"), i2.removeAttribute("data-fabric"), i2.setAttribute("width", "".concat(e2)), i2.setAttribute("height", "".concat(s2)), i2.style.cssText = this._originalCanvasStyle || "", this._originalCanvasStyle = undefined;
  }
  setDimensions(t2, e2) {
    const { el: s2, ctx: i2 } = this.lower;
    Qt(s2, i2, t2, e2);
  }
  setCSSDimensions(t2) {
    Zt(this.lower.el, t2);
  }
  calcOffset() {
    return function(t2) {
      var e2;
      const s2 = t2 && Kt(t2), i2 = { left: 0, top: 0 };
      if (!s2)
        return i2;
      const r2 = ((e2 = Jt(t2)) === null || e2 === undefined ? undefined : e2.getComputedStyle(t2, null)) || {};
      i2.left += parseInt(r2.borderLeftWidth, 10) || 0, i2.top += parseInt(r2.borderTopWidth, 10) || 0, i2.left += parseInt(r2.paddingLeft, 10) || 0, i2.top += parseInt(r2.paddingTop, 10) || 0;
      let n2 = { left: 0, top: 0 };
      const o2 = s2.documentElement;
      t2.getBoundingClientRect !== undefined && (n2 = t2.getBoundingClientRect());
      const a2 = qt(t2);
      return { left: n2.left + a2.left - (o2.clientLeft || 0) + i2.left, top: n2.top + a2.top - (o2.clientTop || 0) + i2.top };
    }(this.lower.el);
  }
  dispose() {
    p().dispose(this.lower.el), delete this.lower;
  }
}
var ee = { backgroundVpt: true, backgroundColor: "", overlayVpt: true, overlayColor: "", includeDefaultValues: true, svgViewportTransformation: true, renderOnAddRemove: true, skipOffscreen: true, enableRetinaScaling: true, imageSmoothingEnabled: true, controlsAboveOverlay: false, allowTouchScrolling: false, viewportTransform: [...T] };

class se extends ct(lt) {
  get lowerCanvasEl() {
    var t2;
    return (t2 = this.elements.lower) === null || t2 === undefined ? undefined : t2.el;
  }
  get contextContainer() {
    var t2;
    return (t2 = this.elements.lower) === null || t2 === undefined ? undefined : t2.ctx;
  }
  static getDefaults() {
    return se.ownDefaults;
  }
  constructor(t2) {
    let e2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super(), Object.assign(this, this.constructor.getDefaults()), this.set(e2), this.initElements(t2), this._setDimensionsImpl({ width: this.width || this.elements.lower.el.width || 0, height: this.height || this.elements.lower.el.height || 0 }), this.skipControlsDrawing = false, this.viewportTransform = [...this.viewportTransform], this.calcViewportBoundaries();
  }
  initElements(t2) {
    this.elements = new te(t2);
  }
  add() {
    const t2 = super.add(...arguments);
    return arguments.length > 0 && this.renderOnAddRemove && this.requestRenderAll(), t2;
  }
  insertAt(t2) {
    for (var e2 = arguments.length, s2 = new Array(e2 > 1 ? e2 - 1 : 0), i2 = 1;i2 < e2; i2++)
      s2[i2 - 1] = arguments[i2];
    const r2 = super.insertAt(t2, ...s2);
    return s2.length > 0 && this.renderOnAddRemove && this.requestRenderAll(), r2;
  }
  remove() {
    const t2 = super.remove(...arguments);
    return t2.length > 0 && this.renderOnAddRemove && this.requestRenderAll(), t2;
  }
  _onObjectAdded(t2) {
    t2.canvas && t2.canvas !== this && (a("warn", `Canvas is trying to add an object that belongs to a different canvas.
Resulting to default behavior: removing object from previous canvas and adding to new canvas`), t2.canvas.remove(t2)), t2._set("canvas", this), t2.setCoords(), this.fire("object:added", { target: t2 }), t2.fire("added", { target: this });
  }
  _onObjectRemoved(t2) {
    t2._set("canvas", undefined), this.fire("object:removed", { target: t2 }), t2.fire("removed", { target: this });
  }
  _onStackOrderChanged() {
    this.renderOnAddRemove && this.requestRenderAll();
  }
  getRetinaScaling() {
    return this.enableRetinaScaling ? y() : 1;
  }
  calcOffset() {
    return this._offset = this.elements.calcOffset();
  }
  getWidth() {
    return this.width;
  }
  getHeight() {
    return this.height;
  }
  setWidth(t2, e2) {
    return this.setDimensions({ width: t2 }, e2);
  }
  setHeight(t2, e2) {
    return this.setDimensions({ height: t2 }, e2);
  }
  _setDimensionsImpl(t2) {
    let { cssOnly: e2 = false, backstoreOnly: i2 = false } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!e2) {
      const e3 = s({ width: this.width, height: this.height }, t2);
      this.elements.setDimensions(e3, this.getRetinaScaling()), this.hasLostContext = true, this.width = e3.width, this.height = e3.height;
    }
    i2 || this.elements.setCSSDimensions(t2), this.calcOffset();
  }
  setDimensions(t2, e2) {
    this._setDimensionsImpl(t2, e2), e2 && e2.cssOnly || this.requestRenderAll();
  }
  getZoom() {
    return this.viewportTransform[0];
  }
  setViewportTransform(t2) {
    this.viewportTransform = t2, this.calcViewportBoundaries(), this.renderOnAddRemove && this.requestRenderAll();
  }
  zoomToPoint(t2, e2) {
    const s2 = t2, i2 = [...this.viewportTransform], r2 = St(t2, wt(i2));
    i2[0] = e2, i2[3] = e2;
    const n2 = St(r2, i2);
    i2[4] += s2.x - n2.x, i2[5] += s2.y - n2.y, this.setViewportTransform(i2);
  }
  setZoom(t2) {
    this.zoomToPoint(new ot(0, 0), t2);
  }
  absolutePan(t2) {
    const e2 = [...this.viewportTransform];
    return e2[4] = -t2.x, e2[5] = -t2.y, this.setViewportTransform(e2);
  }
  relativePan(t2) {
    return this.absolutePan(new ot(-t2.x - this.viewportTransform[4], -t2.y - this.viewportTransform[5]));
  }
  getElement() {
    return this.elements.lower.el;
  }
  clearContext(t2) {
    t2.clearRect(0, 0, this.width, this.height);
  }
  getContext() {
    return this.elements.lower.ctx;
  }
  clear() {
    this.remove(...this.getObjects()), this.backgroundImage = undefined, this.overlayImage = undefined, this.backgroundColor = "", this.overlayColor = "", this.clearContext(this.getContext()), this.fire("canvas:cleared"), this.renderOnAddRemove && this.requestRenderAll();
  }
  renderAll() {
    this.cancelRequestedRender(), this.destroyed || this.renderCanvas(this.getContext(), this._objects);
  }
  renderAndReset() {
    this.nextRenderHandle = 0, this.renderAll();
  }
  requestRenderAll() {
    this.nextRenderHandle || this.disposed || this.destroyed || (this.nextRenderHandle = ut(() => this.renderAndReset()));
  }
  calcViewportBoundaries() {
    const t2 = this.width, e2 = this.height, s2 = wt(this.viewportTransform), i2 = St({ x: 0, y: 0 }, s2), r2 = St({ x: t2, y: e2 }, s2), n2 = i2.min(r2), o2 = i2.max(r2);
    return this.vptCoords = { tl: n2, tr: new ot(o2.x, n2.y), bl: new ot(n2.x, o2.y), br: o2 };
  }
  cancelRequestedRender() {
    this.nextRenderHandle && (dt(this.nextRenderHandle), this.nextRenderHandle = 0);
  }
  drawControls(t2) {}
  renderCanvas(t2, e2) {
    if (this.destroyed)
      return;
    const s2 = this.viewportTransform, i2 = this.clipPath;
    this.calcViewportBoundaries(), this.clearContext(t2), t2.imageSmoothingEnabled = this.imageSmoothingEnabled, t2.patternQuality = "best", this.fire("before:render", { ctx: t2 }), this._renderBackground(t2), t2.save(), t2.transform(s2[0], s2[1], s2[2], s2[3], s2[4], s2[5]), this._renderObjects(t2, e2), t2.restore(), this.controlsAboveOverlay || this.skipControlsDrawing || this.drawControls(t2), i2 && (i2._set("canvas", this), i2.shouldCache(), i2._transformDone = true, i2.renderCache({ forClipping: true }), this.drawClipPathOnCanvas(t2, i2)), this._renderOverlay(t2), this.controlsAboveOverlay && !this.skipControlsDrawing && this.drawControls(t2), this.fire("after:render", { ctx: t2 }), this.__cleanupTask && (this.__cleanupTask(), this.__cleanupTask = undefined);
  }
  drawClipPathOnCanvas(t2, e2) {
    const s2 = this.viewportTransform;
    t2.save(), t2.transform(...s2), t2.globalCompositeOperation = "destination-in", e2.transform(t2), t2.scale(1 / e2.zoomX, 1 / e2.zoomY), t2.drawImage(e2._cacheCanvas, -e2.cacheTranslationX, -e2.cacheTranslationY), t2.restore();
  }
  _renderObjects(t2, e2) {
    for (let s2 = 0, i2 = e2.length;s2 < i2; ++s2)
      e2[s2] && e2[s2].render(t2);
  }
  _renderBackgroundOrOverlay(t2, e2) {
    const s2 = this["".concat(e2, "Color")], i2 = this["".concat(e2, "Image")], r2 = this.viewportTransform, n2 = this["".concat(e2, "Vpt")];
    if (!s2 && !i2)
      return;
    const o2 = Gt(s2);
    if (s2) {
      if (t2.save(), t2.beginPath(), t2.moveTo(0, 0), t2.lineTo(this.width, 0), t2.lineTo(this.width, this.height), t2.lineTo(0, this.height), t2.closePath(), t2.fillStyle = o2 ? s2.toLive(t2) : s2, n2 && t2.transform(...r2), o2) {
        t2.transform(1, 0, 0, 1, s2.offsetX || 0, s2.offsetY || 0);
        const e3 = s2.gradientTransform || s2.patternTransform;
        e3 && t2.transform(...e3);
      }
      t2.fill(), t2.restore();
    }
    if (i2) {
      t2.save();
      const { skipOffscreen: e3 } = this;
      this.skipOffscreen = n2, n2 && t2.transform(...r2), i2.render(t2), this.skipOffscreen = e3, t2.restore();
    }
  }
  _renderBackground(t2) {
    this._renderBackgroundOrOverlay(t2, "background");
  }
  _renderOverlay(t2) {
    this._renderBackgroundOrOverlay(t2, "overlay");
  }
  getCenter() {
    return { top: this.height / 2, left: this.width / 2 };
  }
  getCenterPoint() {
    return new ot(this.width / 2, this.height / 2);
  }
  centerObjectH(t2) {
    return this._centerObject(t2, new ot(this.getCenterPoint().x, t2.getCenterPoint().y));
  }
  centerObjectV(t2) {
    return this._centerObject(t2, new ot(t2.getCenterPoint().x, this.getCenterPoint().y));
  }
  centerObject(t2) {
    return this._centerObject(t2, this.getCenterPoint());
  }
  viewportCenterObject(t2) {
    return this._centerObject(t2, this.getVpCenter());
  }
  viewportCenterObjectH(t2) {
    return this._centerObject(t2, new ot(this.getVpCenter().x, t2.getCenterPoint().y));
  }
  viewportCenterObjectV(t2) {
    return this._centerObject(t2, new ot(t2.getCenterPoint().x, this.getVpCenter().y));
  }
  getVpCenter() {
    return St(this.getCenterPoint(), wt(this.viewportTransform));
  }
  _centerObject(t2, e2) {
    t2.setXY(e2, D, D), t2.setCoords(), this.renderOnAddRemove && this.requestRenderAll();
  }
  toDatalessJSON(t2) {
    return this.toDatalessObject(t2);
  }
  toObject(t2) {
    return this._toObjectMethod("toObject", t2);
  }
  toJSON() {
    return this.toObject();
  }
  toDatalessObject(t2) {
    return this._toObjectMethod("toDatalessObject", t2);
  }
  _toObjectMethod(t2, e2) {
    const i2 = this.clipPath, r2 = i2 && !i2.excludeFromExport ? this._toObject(i2, t2, e2) : null;
    return s(s(s({ version: x }, Yt(this, e2)), {}, { objects: this._objects.filter((t3) => !t3.excludeFromExport).map((s2) => this._toObject(s2, t2, e2)) }, this.__serializeBgOverlay(t2, e2)), r2 ? { clipPath: r2 } : null);
  }
  _toObject(t2, e2, s2) {
    let i2;
    this.includeDefaultValues || (i2 = t2.includeDefaultValues, t2.includeDefaultValues = false);
    const r2 = t2[e2](s2);
    return this.includeDefaultValues || (t2.includeDefaultValues = !!i2), r2;
  }
  __serializeBgOverlay(t2, e2) {
    const s2 = {}, i2 = this.backgroundImage, r2 = this.overlayImage, n2 = this.backgroundColor, o2 = this.overlayColor;
    return Gt(n2) ? n2.excludeFromExport || (s2.background = n2.toObject(e2)) : n2 && (s2.background = n2), Gt(o2) ? o2.excludeFromExport || (s2.overlay = o2.toObject(e2)) : o2 && (s2.overlay = o2), i2 && !i2.excludeFromExport && (s2.backgroundImage = this._toObject(i2, t2, e2)), r2 && !r2.excludeFromExport && (s2.overlayImage = this._toObject(r2, t2, e2)), s2;
  }
  toSVG() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}, e2 = arguments.length > 1 ? arguments[1] : undefined;
    t2.reviver = e2;
    const s2 = [];
    return this._setSVGPreamble(s2, t2), this._setSVGHeader(s2, t2), this.clipPath && s2.push('<g clip-path="url(#'.concat(this.clipPath.clipPathId, `)" >
`)), this._setSVGBgOverlayColor(s2, "background"), this._setSVGBgOverlayImage(s2, "backgroundImage", e2), this._setSVGObjects(s2, e2), this.clipPath && s2.push(`</g>
`), this._setSVGBgOverlayColor(s2, "overlay"), this._setSVGBgOverlayImage(s2, "overlayImage", e2), s2.push("</svg>"), s2.join("");
  }
  _setSVGPreamble(t2, e2) {
    e2.suppressPreamble || t2.push('<?xml version="1.0" encoding="', e2.encoding || "UTF-8", `" standalone="no" ?>
`, '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" ', `"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
`);
  }
  _setSVGHeader(t2, e2) {
    const s2 = e2.width || "".concat(this.width), i2 = e2.height || "".concat(this.height), r2 = o.NUM_FRACTION_DIGITS, n2 = e2.viewBox;
    let a2;
    if (n2)
      a2 = 'viewBox="'.concat(n2.x, " ").concat(n2.y, " ").concat(n2.width, " ").concat(n2.height, '" ');
    else if (this.svgViewportTransformation) {
      const t3 = this.viewportTransform;
      a2 = 'viewBox="'.concat(Vt(-t3[4] / t3[0], r2), " ").concat(Vt(-t3[5] / t3[3], r2), " ").concat(Vt(this.width / t3[0], r2), " ").concat(Vt(this.height / t3[3], r2), '" ');
    } else
      a2 = 'viewBox="0 0 '.concat(this.width, " ").concat(this.height, '" ');
    t2.push("<svg ", 'xmlns="http://www.w3.org/2000/svg" ', 'xmlns:xlink="http://www.w3.org/1999/xlink" ', 'version="1.1" ', 'width="', s2, '" ', 'height="', i2, '" ', a2, `xml:space="preserve">
`, "<desc>Created with Fabric.js ", x, `</desc>
`, `<defs>
`, this.createSVGFontFacesMarkup(), this.createSVGRefElementsMarkup(), this.createSVGClipPathMarkup(e2), `</defs>
`);
  }
  createSVGClipPathMarkup(t2) {
    const e2 = this.clipPath;
    return e2 ? (e2.clipPathId = "CLIPPATH_".concat(ft()), '<clipPath id="'.concat(e2.clipPathId, `" >
`).concat(e2.toClipPathSVG(t2.reviver), `</clipPath>
`)) : "";
  }
  createSVGRefElementsMarkup() {
    return ["background", "overlay"].map((t2) => {
      const e2 = this["".concat(t2, "Color")];
      if (Gt(e2)) {
        const s2 = this["".concat(t2, "Vpt")], i2 = this.viewportTransform, r2 = { isType: () => false, width: this.width / (s2 ? i2[0] : 1), height: this.height / (s2 ? i2[3] : 1) };
        return e2.toSVG(r2, { additionalTransform: s2 ? zt(i2) : "" });
      }
    }).join("");
  }
  createSVGFontFacesMarkup() {
    const t2 = [], e2 = {}, s2 = o.fontPaths;
    this._objects.forEach(function e(s3) {
      t2.push(s3), ht(s3) && s3._objects.forEach(e);
    }), t2.forEach((t3) => {
      if (!(i3 = t3) || typeof i3._renderText != "function")
        return;
      var i3;
      const { styles: r2, fontFamily: n2 } = t3;
      !e2[n2] && s2[n2] && (e2[n2] = true, r2 && Object.values(r2).forEach((t4) => {
        Object.values(t4).forEach((t5) => {
          let { fontFamily: i4 = "" } = t5;
          !e2[i4] && s2[i4] && (e2[i4] = true);
        });
      }));
    });
    const i2 = Object.keys(e2).map((t3) => `		@font-face {
			font-family: '`.concat(t3, `';
			src: url('`).concat(s2[t3], `');
		}
`)).join("");
    return i2 ? `	<style type="text/css"><![CDATA[
`.concat(i2, `]]></style>
`) : "";
  }
  _setSVGObjects(t2, e2) {
    this.forEachObject((s2) => {
      s2.excludeFromExport || this._setSVGObject(t2, s2, e2);
    });
  }
  _setSVGObject(t2, e2, s2) {
    t2.push(e2.toSVG(s2));
  }
  _setSVGBgOverlayImage(t2, e2, s2) {
    const i2 = this[e2];
    i2 && !i2.excludeFromExport && i2.toSVG && t2.push(i2.toSVG(s2));
  }
  _setSVGBgOverlayColor(t2, e2) {
    const s2 = this["".concat(e2, "Color")];
    if (s2)
      if (Gt(s2)) {
        const i2 = s2.repeat || "", r2 = this.width, n2 = this.height, o2 = this["".concat(e2, "Vpt")] ? zt(wt(this.viewportTransform)) : "";
        t2.push('<rect transform="'.concat(o2, " translate(").concat(r2 / 2, ",").concat(n2 / 2, ')" x="').concat(s2.offsetX - r2 / 2, '" y="').concat(s2.offsetY - n2 / 2, '" width="').concat(i2 !== "repeat-y" && i2 !== "no-repeat" || !Nt(s2) ? r2 : s2.source.width, '" height="').concat(i2 !== "repeat-x" && i2 !== "no-repeat" || !Nt(s2) ? n2 : s2.source.height, '" fill="url(#SVGID_').concat(s2.id, `)"></rect>
`));
      } else
        t2.push('<rect x="0" y="0" width="100%" height="100%" ', 'fill="', s2, '"', `></rect>
`);
  }
  loadFromJSON(t2, e2) {
    let { signal: s2 } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    if (!t2)
      return Promise.reject(new h("`json` is undefined"));
    const i2 = typeof t2 == "string" ? JSON.parse(t2) : t2, { objects: r2 = [], backgroundImage: n2, background: o2, overlayImage: a2, overlay: c2, clipPath: l2 } = i2, u2 = this.renderOnAddRemove;
    return this.renderOnAddRemove = false, Promise.all([Bt(r2, { reviver: e2, signal: s2 }), Xt({ backgroundImage: n2, backgroundColor: o2, overlayImage: a2, overlayColor: c2, clipPath: l2 }, { signal: s2 })]).then((t3) => {
      let [e3, s3] = t3;
      return this.clear(), this.add(...e3), this.set(i2), this.set(s3), this.renderOnAddRemove = u2, this;
    });
  }
  clone(t2) {
    const e2 = this.toObject(t2);
    return this.cloneWithoutData().loadFromJSON(e2);
  }
  cloneWithoutData() {
    const t2 = vt(this);
    return new this.constructor(t2);
  }
  toDataURL() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const { format: e2 = "png", quality: s2 = 1, multiplier: i2 = 1, enableRetinaScaling: r2 = false } = t2, n2 = i2 * (r2 ? this.getRetinaScaling() : 1);
    return yt(this.toCanvasElement(n2, t2), e2, s2);
  }
  toBlob() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const { format: e2 = "png", quality: s2 = 1, multiplier: i2 = 1, enableRetinaScaling: r2 = false } = t2, n2 = i2 * (r2 ? this.getRetinaScaling() : 1);
    return _t(this.toCanvasElement(n2, t2), e2, s2);
  }
  toCanvasElement() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1, { width: e2, height: s2, left: i2, top: r2, filter: n2 } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const o2 = (e2 || this.width) * t2, a2 = (s2 || this.height) * t2, h2 = this.getZoom(), c2 = this.width, l2 = this.height, u2 = this.skipControlsDrawing, d2 = h2 * t2, g2 = this.viewportTransform, f = [d2, 0, 0, d2, (g2[4] - (i2 || 0)) * t2, (g2[5] - (r2 || 0)) * t2], p2 = this.enableRetinaScaling, m2 = vt({ width: o2, height: a2 }), v2 = n2 ? this._objects.filter((t3) => n2(t3)) : this._objects;
    return this.enableRetinaScaling = false, this.viewportTransform = f, this.width = o2, this.height = a2, this.skipControlsDrawing = true, this.calcViewportBoundaries(), this.renderCanvas(m2.getContext("2d"), v2), this.viewportTransform = g2, this.width = c2, this.height = l2, this.calcViewportBoundaries(), this.enableRetinaScaling = p2, this.skipControlsDrawing = u2, m2;
  }
  dispose() {
    return !this.disposed && this.elements.cleanupDOM({ width: this.width, height: this.height }), et.cancelByCanvas(this), this.disposed = true, new Promise((t2, e2) => {
      const s2 = () => {
        this.destroy(), t2(true);
      };
      s2.kill = e2, this.__cleanupTask && this.__cleanupTask.kill("aborted"), this.destroyed ? t2(false) : this.nextRenderHandle ? this.__cleanupTask = s2 : s2();
    });
  }
  destroy() {
    this.destroyed = true, this.cancelRequestedRender(), this.forEachObject((t2) => t2.dispose()), this._objects = [], this.backgroundImage && this.backgroundImage.dispose(), this.backgroundImage = undefined, this.overlayImage && this.overlayImage.dispose(), this.overlayImage = undefined, this.elements.dispose();
  }
  toString() {
    return "#<Canvas (".concat(this.complexity(), "): { objects: ").concat(this._objects.length, " }>");
  }
}
t(se, "ownDefaults", ee);
var ie = ["touchstart", "touchmove", "touchend"];
var re = (t2) => {
  const e2 = qt(t2.target), s2 = function(t3) {
    const e3 = t3.changedTouches;
    return e3 && e3[0] ? e3[0] : t3;
  }(t2);
  return new ot(s2.clientX + e2.left, s2.clientY + e2.top);
};
var ne = (t2) => ie.includes(t2.type) || t2.pointerType === "touch";
var oe = (t2) => {
  t2.preventDefault(), t2.stopPropagation();
};
var ae = (t2) => {
  let e2 = 0, s2 = 0, i2 = 0, r2 = 0;
  for (let n2 = 0, o2 = t2.length;n2 < o2; n2++) {
    const { x: o3, y: a2 } = t2[n2];
    (o3 > i2 || !n2) && (i2 = o3), (o3 < e2 || !n2) && (e2 = o3), (a2 > r2 || !n2) && (r2 = a2), (a2 < s2 || !n2) && (s2 = a2);
  }
  return { left: e2, top: s2, width: i2 - e2, height: r2 - s2 };
};
var he = ["translateX", "translateY", "scaleX", "scaleY"];
var ce = (t2, e2) => le(t2, Tt(e2, t2.calcOwnMatrix()));
var le = (t2, e2) => {
  const s2 = Dt(e2), { translateX: r2, translateY: n2, scaleX: o2, scaleY: a2 } = s2, h2 = i(s2, he), c2 = new ot(r2, n2);
  t2.flipX = false, t2.flipY = false, Object.assign(t2, h2), t2.set({ scaleX: o2, scaleY: a2 }), t2.setPositionByOrigin(c2, D, D);
};
var ue = (t2) => {
  t2.scaleX = 1, t2.scaleY = 1, t2.skewX = 0, t2.skewY = 0, t2.flipX = false, t2.flipY = false, t2.rotate(0);
};
var de = (t2) => ({ scaleX: t2.scaleX, scaleY: t2.scaleY, skewX: t2.skewX, skewY: t2.skewY, angle: t2.angle, left: t2.left, flipX: t2.flipX, flipY: t2.flipY, top: t2.top });
var ge = (t2, e2, s2) => {
  const i2 = t2 / 2, r2 = e2 / 2, n2 = [new ot(-i2, -r2), new ot(i2, -r2), new ot(-i2, r2), new ot(i2, r2)].map((t3) => t3.transform(s2)), o2 = ae(n2);
  return new ot(o2.width, o2.height);
};
var fe = function() {
  let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : T;
  return Tt(wt(arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : T), t2);
};
var pe = function(t2) {
  let e2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : T, s2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : T;
  return t2.transform(fe(e2, s2));
};
var me = function(t2) {
  let e2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : T, s2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : T;
  return t2.transform(fe(e2, s2), true);
};
var ve = (t2, e2, s2) => {
  const i2 = fe(e2, s2);
  return le(t2, Tt(i2, t2.calcOwnMatrix())), i2;
};
var ye = (t2, e2) => {
  var i2;
  const { transform: { target: r2 } } = e2;
  (i2 = r2.canvas) === null || i2 === undefined || i2.fire("object:".concat(t2), s(s({}, e2), {}, { target: r2 })), r2.fire(t2, e2);
};
var _e = { left: -0.5, top: -0.5, center: 0, bottom: 0.5, right: 0.5 };
var xe = (t2) => typeof t2 == "string" ? _e[t2] : t2 - 0.5;
var Ce = "not-allowed";
function be(t2) {
  return xe(t2.originX) === xe(D) && xe(t2.originY) === xe(D);
}
function Se(t2) {
  return 0.5 - xe(t2);
}
var we = (t2, e2) => t2[e2];
var Te = (t2, e2, s2, i2) => ({ e: t2, transform: e2, pointer: new ot(s2, i2) });
function Oe(t2, e2) {
  const s2 = t2.getTotalAngle() + Ct(Math.atan2(e2.y, e2.x)) + 360;
  return Math.round(s2 % 360 / 45);
}
function ke(t2, e2, s2, i2, r2) {
  var n2;
  let { target: o2, corner: a2 } = t2;
  const h2 = o2.controls[a2], c2 = ((n2 = o2.canvas) === null || n2 === undefined ? undefined : n2.getZoom()) || 1, l2 = o2.padding / c2, u2 = function(t3, e3, s3, i3) {
    const r3 = t3.getRelativeCenterPoint(), n3 = s3 !== undefined && i3 !== undefined ? t3.translateToGivenOrigin(r3, D, D, s3, i3) : new ot(t3.left, t3.top);
    return (t3.angle ? e3.rotate(-xt(t3.angle), r3) : e3).subtract(n3);
  }(o2, new ot(i2, r2), e2, s2);
  return u2.x >= l2 && (u2.x -= l2), u2.x <= -l2 && (u2.x += l2), u2.y >= l2 && (u2.y -= l2), u2.y <= l2 && (u2.y += l2), u2.x -= h2.offsetX, u2.y -= h2.offsetY, u2;
}
var De = (t2, e2, s2, i2) => {
  const { target: r2, offsetX: n2, offsetY: o2 } = e2, a2 = s2 - n2, h2 = i2 - o2, c2 = !we(r2, "lockMovementX") && r2.left !== a2, l2 = !we(r2, "lockMovementY") && r2.top !== h2;
  return c2 && r2.set(M, a2), l2 && r2.set(P, h2), (c2 || l2) && ye(L, Te(t2, e2, s2, i2)), c2 || l2;
};
var Me = { aliceblue: "#F0F8FF", antiquewhite: "#FAEBD7", aqua: "#0FF", aquamarine: "#7FFFD4", azure: "#F0FFFF", beige: "#F5F5DC", bisque: "#FFE4C4", black: "#000", blanchedalmond: "#FFEBCD", blue: "#00F", blueviolet: "#8A2BE2", brown: "#A52A2A", burlywood: "#DEB887", cadetblue: "#5F9EA0", chartreuse: "#7FFF00", chocolate: "#D2691E", coral: "#FF7F50", cornflowerblue: "#6495ED", cornsilk: "#FFF8DC", crimson: "#DC143C", cyan: "#0FF", darkblue: "#00008B", darkcyan: "#008B8B", darkgoldenrod: "#B8860B", darkgray: "#A9A9A9", darkgrey: "#A9A9A9", darkgreen: "#006400", darkkhaki: "#BDB76B", darkmagenta: "#8B008B", darkolivegreen: "#556B2F", darkorange: "#FF8C00", darkorchid: "#9932CC", darkred: "#8B0000", darksalmon: "#E9967A", darkseagreen: "#8FBC8F", darkslateblue: "#483D8B", darkslategray: "#2F4F4F", darkslategrey: "#2F4F4F", darkturquoise: "#00CED1", darkviolet: "#9400D3", deeppink: "#FF1493", deepskyblue: "#00BFFF", dimgray: "#696969", dimgrey: "#696969", dodgerblue: "#1E90FF", firebrick: "#B22222", floralwhite: "#FFFAF0", forestgreen: "#228B22", fuchsia: "#F0F", gainsboro: "#DCDCDC", ghostwhite: "#F8F8FF", gold: "#FFD700", goldenrod: "#DAA520", gray: "#808080", grey: "#808080", green: "#008000", greenyellow: "#ADFF2F", honeydew: "#F0FFF0", hotpink: "#FF69B4", indianred: "#CD5C5C", indigo: "#4B0082", ivory: "#FFFFF0", khaki: "#F0E68C", lavender: "#E6E6FA", lavenderblush: "#FFF0F5", lawngreen: "#7CFC00", lemonchiffon: "#FFFACD", lightblue: "#ADD8E6", lightcoral: "#F08080", lightcyan: "#E0FFFF", lightgoldenrodyellow: "#FAFAD2", lightgray: "#D3D3D3", lightgrey: "#D3D3D3", lightgreen: "#90EE90", lightpink: "#FFB6C1", lightsalmon: "#FFA07A", lightseagreen: "#20B2AA", lightskyblue: "#87CEFA", lightslategray: "#789", lightslategrey: "#789", lightsteelblue: "#B0C4DE", lightyellow: "#FFFFE0", lime: "#0F0", limegreen: "#32CD32", linen: "#FAF0E6", magenta: "#F0F", maroon: "#800000", mediumaquamarine: "#66CDAA", mediumblue: "#0000CD", mediumorchid: "#BA55D3", mediumpurple: "#9370DB", mediumseagreen: "#3CB371", mediumslateblue: "#7B68EE", mediumspringgreen: "#00FA9A", mediumturquoise: "#48D1CC", mediumvioletred: "#C71585", midnightblue: "#191970", mintcream: "#F5FFFA", mistyrose: "#FFE4E1", moccasin: "#FFE4B5", navajowhite: "#FFDEAD", navy: "#000080", oldlace: "#FDF5E6", olive: "#808000", olivedrab: "#6B8E23", orange: "#FFA500", orangered: "#FF4500", orchid: "#DA70D6", palegoldenrod: "#EEE8AA", palegreen: "#98FB98", paleturquoise: "#AFEEEE", palevioletred: "#DB7093", papayawhip: "#FFEFD5", peachpuff: "#FFDAB9", peru: "#CD853F", pink: "#FFC0CB", plum: "#DDA0DD", powderblue: "#B0E0E6", purple: "#800080", rebeccapurple: "#639", red: "#F00", rosybrown: "#BC8F8F", royalblue: "#4169E1", saddlebrown: "#8B4513", salmon: "#FA8072", sandybrown: "#F4A460", seagreen: "#2E8B57", seashell: "#FFF5EE", sienna: "#A0522D", silver: "#C0C0C0", skyblue: "#87CEEB", slateblue: "#6A5ACD", slategray: "#708090", slategrey: "#708090", snow: "#FFFAFA", springgreen: "#00FF7F", steelblue: "#4682B4", tan: "#D2B48C", teal: "#008080", thistle: "#D8BFD8", tomato: "#FF6347", turquoise: "#40E0D0", violet: "#EE82EE", wheat: "#F5DEB3", white: "#FFF", whitesmoke: "#F5F5F5", yellow: "#FF0", yellowgreen: "#9ACD32" };
var Pe = (t2, e2, s2) => (s2 < 0 && (s2 += 1), s2 > 1 && (s2 -= 1), s2 < 1 / 6 ? t2 + 6 * (e2 - t2) * s2 : s2 < 0.5 ? e2 : s2 < 2 / 3 ? t2 + (e2 - t2) * (2 / 3 - s2) * 6 : t2);
var Ee = (t2, e2, s2, i2) => {
  t2 /= 255, e2 /= 255, s2 /= 255;
  const r2 = Math.max(t2, e2, s2), n2 = Math.min(t2, e2, s2);
  let o2, a2;
  const h2 = (r2 + n2) / 2;
  if (r2 === n2)
    o2 = a2 = 0;
  else {
    const i3 = r2 - n2;
    switch (a2 = h2 > 0.5 ? i3 / (2 - r2 - n2) : i3 / (r2 + n2), r2) {
      case t2:
        o2 = (e2 - s2) / i3 + (e2 < s2 ? 6 : 0);
        break;
      case e2:
        o2 = (s2 - t2) / i3 + 2;
        break;
      case s2:
        o2 = (t2 - e2) / i3 + 4;
    }
    o2 /= 6;
  }
  return [Math.round(360 * o2), Math.round(100 * a2), Math.round(100 * h2), i2];
};
var Ae = function() {
  let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "1";
  return parseFloat(t2) / (t2.endsWith("%") ? 100 : 1);
};
var je = (t2) => Math.min(Math.round(t2), 255).toString(16).toUpperCase().padStart(2, "0");
var Fe = (t2) => {
  let [e2, s2, i2, r2 = 1] = t2;
  const n2 = Math.round(0.3 * e2 + 0.59 * s2 + 0.11 * i2);
  return [n2, n2, n2, r2];
};

class Le {
  constructor(e2) {
    if (t(this, "isUnrecognised", false), e2)
      if (e2 instanceof Le)
        this.setSource([...e2._source]);
      else if (Array.isArray(e2)) {
        const [t2, s2, i2, r2 = 1] = e2;
        this.setSource([t2, s2, i2, r2]);
      } else
        this.setSource(this._tryParsingColor(e2));
    else
      this.setSource([0, 0, 0, 1]);
  }
  _tryParsingColor(t2) {
    return (t2 = t2.toLowerCase()) in Me && (t2 = Me[t2]), t2 === "transparent" ? [255, 255, 255, 0] : Le.sourceFromHex(t2) || Le.sourceFromRgb(t2) || Le.sourceFromHsl(t2) || (this.isUnrecognised = true) && [0, 0, 0, 1];
  }
  getSource() {
    return this._source;
  }
  setSource(t2) {
    this._source = t2;
  }
  toRgb() {
    const [t2, e2, s2] = this.getSource();
    return "rgb(".concat(t2, ",").concat(e2, ",").concat(s2, ")");
  }
  toRgba() {
    return "rgba(".concat(this.getSource().join(","), ")");
  }
  toHsl() {
    const [t2, e2, s2] = Ee(...this.getSource());
    return "hsl(".concat(t2, ",").concat(e2, "%,").concat(s2, "%)");
  }
  toHsla() {
    const [t2, e2, s2, i2] = Ee(...this.getSource());
    return "hsla(".concat(t2, ",").concat(e2, "%,").concat(s2, "%,").concat(i2, ")");
  }
  toHex() {
    return this.toHexa().slice(0, 6);
  }
  toHexa() {
    const [t2, e2, s2, i2] = this.getSource();
    return "".concat(je(t2)).concat(je(e2)).concat(je(s2)).concat(je(Math.round(255 * i2)));
  }
  getAlpha() {
    return this.getSource()[3];
  }
  setAlpha(t2) {
    return this._source[3] = t2, this;
  }
  toGrayscale() {
    return this.setSource(Fe(this.getSource())), this;
  }
  toBlackWhite(t2) {
    const [e2, , , s2] = Fe(this.getSource()), i2 = e2 < (t2 || 127) ? 0 : 255;
    return this.setSource([i2, i2, i2, s2]), this;
  }
  overlayWith(t2) {
    t2 instanceof Le || (t2 = new Le(t2));
    const e2 = this.getSource(), s2 = t2.getSource(), [i2, r2, n2] = e2.map((t3, e3) => Math.round(0.5 * t3 + 0.5 * s2[e3]));
    return this.setSource([i2, r2, n2, e2[3]]), this;
  }
  static fromRgb(t2) {
    return Le.fromRgba(t2);
  }
  static fromRgba(t2) {
    return new Le(Le.sourceFromRgb(t2));
  }
  static sourceFromRgb(t2) {
    const e2 = t2.match(/^rgba?\(\s*(\d{0,3}(?:\.\d+)?%?)\s*[\s|,]\s*(\d{0,3}(?:\.\d+)?%?)\s*[\s|,]\s*(\d{0,3}(?:\.\d+)?%?)\s*(?:\s*[,/]\s*(\d{0,3}(?:\.\d+)?%?)\s*)?\)$/i);
    if (e2) {
      const [t3, s2, i2] = e2.slice(1, 4).map((t4) => {
        const e3 = parseFloat(t4);
        return t4.endsWith("%") ? Math.round(2.55 * e3) : e3;
      });
      return [t3, s2, i2, Ae(e2[4])];
    }
  }
  static fromHsl(t2) {
    return Le.fromHsla(t2);
  }
  static fromHsla(t2) {
    return new Le(Le.sourceFromHsl(t2));
  }
  static sourceFromHsl(t2) {
    const e2 = t2.match(/^hsla?\(\s*([+-]?\d{0,3}(?:\.\d+)?(?:deg|turn|rad)?)\s*[\s|,]\s*(\d{0,3}(?:\.\d+)?%?)\s*[\s|,]\s*(\d{0,3}(?:\.\d+)?%?)\s*(?:\s*[,/]\s*(\d*(?:\.\d+)?%?)\s*)?\)$/i);
    if (!e2)
      return;
    const s2 = (Le.parseAngletoDegrees(e2[1]) % 360 + 360) % 360 / 360, i2 = parseFloat(e2[2]) / 100, r2 = parseFloat(e2[3]) / 100;
    let n2, o2, a2;
    if (i2 === 0)
      n2 = o2 = a2 = r2;
    else {
      const t3 = r2 <= 0.5 ? r2 * (i2 + 1) : r2 + i2 - r2 * i2, e3 = 2 * r2 - t3;
      n2 = Pe(e3, t3, s2 + 1 / 3), o2 = Pe(e3, t3, s2), a2 = Pe(e3, t3, s2 - 1 / 3);
    }
    return [Math.round(255 * n2), Math.round(255 * o2), Math.round(255 * a2), Ae(e2[4])];
  }
  static fromHex(t2) {
    return new Le(Le.sourceFromHex(t2));
  }
  static sourceFromHex(t2) {
    if (t2.match(/^#?(([0-9a-f]){3,4}|([0-9a-f]{2}){3,4})$/i)) {
      const e2 = t2.slice(t2.indexOf("#") + 1);
      let s2;
      s2 = e2.length <= 4 ? e2.split("").map((t3) => t3 + t3) : e2.match(/.{2}/g);
      const [i2, r2, n2, o2 = 255] = s2.map((t3) => parseInt(t3, 16));
      return [i2, r2, n2, o2 / 255];
    }
  }
  static parseAngletoDegrees(t2) {
    const e2 = t2.toLowerCase(), s2 = parseFloat(e2);
    return e2.includes("rad") ? Ct(s2) : e2.includes("turn") ? 360 * s2 : s2;
  }
}
var Re = function(t2) {
  let e2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : O;
  const s2 = /\D{0,2}$/.exec(t2), i2 = parseFloat(t2), r2 = o.DPI;
  switch (s2 == null ? undefined : s2[0]) {
    case "mm":
      return i2 * r2 / 25.4;
    case "cm":
      return i2 * r2 / 2.54;
    case "in":
      return i2 * r2;
    case "pt":
      return i2 * r2 / 72;
    case "pc":
      return i2 * r2 / 72 * 12;
    case "em":
      return i2 * e2;
    default:
      return i2;
  }
};
var Ie = (t2) => {
  const [e2, s2] = t2.trim().split(" "), [i2, r2] = (n2 = e2) && n2 !== j ? [n2.slice(1, 4), n2.slice(5, 8)] : n2 === j ? [n2, n2] : ["Mid", "Mid"];
  var n2;
  return { meetOrSlice: s2 || "meet", alignX: i2, alignY: r2 };
};
var Be = function(t2, e2) {
  let s2, i2, r2 = !(arguments.length > 2 && arguments[2] !== undefined) || arguments[2];
  if (e2)
    if (e2.toLive)
      s2 = "url(#SVGID_".concat(e2.id, ")");
    else {
      const t3 = new Le(e2), r3 = t3.getAlpha();
      s2 = t3.toRgb(), r3 !== 1 && (i2 = r3.toString());
    }
  else
    s2 = "none";
  return r2 ? "".concat(t2, ": ").concat(s2, "; ").concat(i2 ? "".concat(t2, "-opacity: ").concat(i2, "; ") : "") : "".concat(t2, '="').concat(s2, '" ').concat(i2 ? "".concat(t2, '-opacity="').concat(i2, '" ') : "");
};

class Xe {
  getSvgStyles(t2) {
    const e2 = this.fillRule ? this.fillRule : "nonzero", s2 = this.strokeWidth ? this.strokeWidth : "0", i2 = this.strokeDashArray ? this.strokeDashArray.join(" ") : j, r2 = this.strokeDashOffset ? this.strokeDashOffset : "0", n2 = this.strokeLineCap ? this.strokeLineCap : "butt", o2 = this.strokeLineJoin ? this.strokeLineJoin : "miter", a2 = this.strokeMiterLimit ? this.strokeMiterLimit : "4", h2 = this.opacity !== undefined ? this.opacity : "1", c2 = this.visible ? "" : " visibility: hidden;", l2 = t2 ? "" : this.getSvgFilter(), u2 = Be(K, this.fill);
    return [Be(J, this.stroke), "stroke-width: ", s2, "; ", "stroke-dasharray: ", i2, "; ", "stroke-linecap: ", n2, "; ", "stroke-dashoffset: ", r2, "; ", "stroke-linejoin: ", o2, "; ", "stroke-miterlimit: ", a2, "; ", u2, "fill-rule: ", e2, "; ", "opacity: ", h2, ";", l2, c2].join("");
  }
  getSvgFilter() {
    return this.shadow ? "filter: url(#SVGID_".concat(this.shadow.id, ");") : "";
  }
  getSvgCommons() {
    return [this.id ? 'id="'.concat(this.id, '" ') : "", this.clipPath ? 'clip-path="url(#'.concat(this.clipPath.clipPathId, ')" ') : ""].join("");
  }
  getSvgTransform(t2) {
    let e2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    const s2 = t2 ? this.calcTransformMatrix() : this.calcOwnMatrix(), i2 = 'transform="'.concat(zt(s2));
    return "".concat(i2).concat(e2, '" ');
  }
  _toSVG(t2) {
    return [""];
  }
  toSVG(t2) {
    return this._createBaseSVGMarkup(this._toSVG(t2), { reviver: t2 });
  }
  toClipPathSVG(t2) {
    return "\t" + this._createBaseClipPathSVGMarkup(this._toSVG(t2), { reviver: t2 });
  }
  _createBaseClipPathSVGMarkup(t2) {
    let { reviver: e2, additionalTransform: s2 = "" } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const i2 = [this.getSvgTransform(true, s2), this.getSvgCommons()].join(""), r2 = t2.indexOf("COMMON_PARTS");
    return t2[r2] = i2, e2 ? e2(t2.join("")) : t2.join("");
  }
  _createBaseSVGMarkup(t2) {
    let { noStyle: e2, reviver: s2, withShadow: i2, additionalTransform: r2 } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const n2 = e2 ? "" : 'style="'.concat(this.getSvgStyles(), '" '), o2 = i2 ? 'style="'.concat(this.getSvgFilter(), '" ') : "", a2 = this.clipPath, h2 = this.strokeUniform ? 'vector-effect="non-scaling-stroke" ' : "", c2 = a2 && a2.absolutePositioned, l2 = this.stroke, u2 = this.fill, d2 = this.shadow, g2 = [], f = t2.indexOf("COMMON_PARTS");
    let p2;
    a2 && (a2.clipPathId = "CLIPPATH_".concat(ft()), p2 = '<clipPath id="'.concat(a2.clipPathId, `" >
`).concat(a2.toClipPathSVG(s2), `</clipPath>
`)), c2 && g2.push("<g ", o2, this.getSvgCommons(), ` >
`), g2.push("<g ", this.getSvgTransform(false), c2 ? "" : o2 + this.getSvgCommons(), ` >
`);
    const m2 = [n2, h2, e2 ? "" : this.addPaintOrder(), " ", r2 ? 'transform="'.concat(r2, '" ') : ""].join("");
    return t2[f] = m2, Gt(u2) && g2.push(u2.toSVG(this)), Gt(l2) && g2.push(l2.toSVG(this)), d2 && g2.push(d2.toSVG(this)), a2 && g2.push(p2), g2.push(t2.join("")), g2.push(`</g>
`), c2 && g2.push(`</g>
`), s2 ? s2(g2.join("")) : g2.join("");
  }
  addPaintOrder() {
    return this.paintFirst !== K ? ' paint-order="'.concat(this.paintFirst, '" ') : "";
  }
}
function Ye(t2) {
  return new RegExp("^(" + t2.join("|") + ")\\b", "i");
}
var We = "textDecorationThickness";
var Ve = ["fontSize", "fontWeight", "fontFamily", "fontStyle"];
var ze = ["underline", "overline", "linethrough"];
var Ge = [...Ve, "lineHeight", "text", "charSpacing", "textAlign", "styles", "path", "pathStartOffset", "pathSide", "pathAlign"];
var He = [...Ge, ...ze, "textBackgroundColor", "direction", We];
var Ne = [...Ve, ...ze, J, "strokeWidth", K, "deltaY", "textBackgroundColor", We];
var Ue = { _reNewline: F, _reSpacesAndTabs: /[ \t\r]/g, _reSpaceAndTab: /[ \t\r]/, _reWords: /\S+/g, fontSize: 40, fontWeight: "normal", fontFamily: "Times New Roman", underline: false, overline: false, linethrough: false, textAlign: M, fontStyle: "normal", lineHeight: 1.16, textBackgroundColor: "", stroke: null, shadow: null, path: undefined, pathStartOffset: 0, pathSide: M, pathAlign: "baseline", charSpacing: 0, deltaY: 0, direction: "ltr", CACHE_FONT_SIZE: 400, MIN_TEXT_WIDTH: 2, superscript: { size: 0.6, baseline: -0.35 }, subscript: { size: 0.6, baseline: 0.11 }, _fontSizeFraction: 0.222, offsets: { underline: 0.1, linethrough: -0.28167, overline: -0.81333 }, _fontSizeMult: 1.13, [We]: 66.667 };
var qe = "justify";
var Ke = "justify-left";
var Je = "justify-right";
var Qe = "justify-center";
var Ze;
var $e;
var ts;
var es = String.raw(Ze || (Ze = r(["[-+]?(?:d*.d+|d+.?)(?:[eE][-+]?d+)?"], ["[-+]?(?:\\d*\\.\\d+|\\d+\\.?)(?:[eE][-+]?\\d+)?"])));
var ss = String.raw($e || ($e = r(["(?:s*,?s+|s*,s*)"], ["(?:\\s*,?\\s+|\\s*,\\s*)"])));
var rs = new RegExp("(normal|italic)?\\s*(normal|small-caps)?\\s*(normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900)?\\s*(" + es + "(?:px|cm|mm|em|pt|pc|in)*)(?:\\/(normal|" + es + "))?\\s+(.*)");
var ns = { cx: M, x: M, r: "radius", cy: P, y: P, display: "visible", visibility: "visible", transform: "transformMatrix", "fill-opacity": "fillOpacity", "fill-rule": "fillRule", "font-family": "fontFamily", "font-size": "fontSize", "font-style": "fontStyle", "font-weight": "fontWeight", "letter-spacing": "charSpacing", "paint-order": "paintFirst", "stroke-dasharray": "strokeDashArray", "stroke-dashoffset": "strokeDashOffset", "stroke-linecap": "strokeLineCap", "stroke-linejoin": "strokeLineJoin", "stroke-miterlimit": "strokeMiterLimit", "stroke-opacity": "strokeOpacity", "stroke-width": "strokeWidth", "text-decoration": "textDecoration", "text-anchor": "textAnchor", opacity: "opacity", "clip-path": "clipPath", "clip-rule": "clipRule", "vector-effect": "strokeUniform", "image-rendering": "imageSmoothing", "text-decoration-thickness": We };
var os = "font-size";
var as = "clip-path";
var hs = Ye(["path", "circle", "polygon", "polyline", "ellipse", "rect", "line", "image", "text"]);
var cs = Ye(["symbol", "image", "marker", "pattern", "view", "svg"]);
var ls = Ye(["symbol", "g", "a", "svg", "clipPath", "defs"]);
var us = new RegExp(String.raw(ts || (ts = r(["^s*(", ")", "(", ")", "(", ")", "(", ")s*$"], ["^\\s*(", ")", "(", ")", "(", ")", "(", ")\\s*$"])), es, ss, es, ss, es, ss, es));
var ds = new ot(1, 0);
var gs = new ot;
var fs = (t2, e2) => t2.rotate(e2);
var ps = (t2, e2) => new ot(e2).subtract(t2);
var ms = (t2) => t2.distanceFrom(gs);
var vs = (t2, e2) => Math.atan2(Cs(t2, e2), bs(t2, e2));
var ys = (t2) => vs(ds, t2);
var _s = (t2) => t2.eq(gs) ? t2 : t2.scalarDivide(ms(t2));
var xs = function(t2) {
  let e2 = !(arguments.length > 1 && arguments[1] !== undefined) || arguments[1];
  return _s(new ot(-t2.y, t2.x).scalarMultiply(e2 ? 1 : -1));
};
var Cs = (t2, e2) => t2.x * e2.y - t2.y * e2.x;
var bs = (t2, e2) => t2.x * e2.x + t2.y * e2.y;
var Ss = (t2, e2, s2) => {
  if (t2.eq(e2) || t2.eq(s2))
    return true;
  const i2 = Cs(e2, s2), r2 = Cs(e2, t2), n2 = Cs(s2, t2);
  return i2 >= 0 ? r2 >= 0 && n2 <= 0 : !(r2 <= 0 && n2 >= 0);
};
var ws = "(-?\\d+(?:\\.\\d*)?(?:px)?(?:\\s?|$))?";
var Ts = new RegExp("(?:\\s|^)" + ws + ws + "(" + es + "?(?:px)?)?(?:\\s?|$)(?:$|\\s)");

class Os {
  constructor(t2) {
    const e2 = typeof t2 == "string" ? Os.parseShadow(t2) : t2;
    Object.assign(this, Os.ownDefaults, e2), this.id = ft();
  }
  static parseShadow(t2) {
    const e2 = t2.trim(), [, s2 = 0, i2 = 0, r2 = 0] = (Ts.exec(e2) || []).map((t3) => parseFloat(t3) || 0);
    return { color: (e2.replace(Ts, "") || "rgb(0,0,0)").trim(), offsetX: s2, offsetY: i2, blur: r2 };
  }
  toString() {
    return [this.offsetX, this.offsetY, this.blur, this.color].join("px ");
  }
  toSVG(t2) {
    const e2 = fs(new ot(this.offsetX, this.offsetY), xt(-t2.angle)), s2 = new Le(this.color);
    let i2 = 40, r2 = 40;
    return t2.width && t2.height && (i2 = 100 * Vt((Math.abs(e2.x) + this.blur) / t2.width, o.NUM_FRACTION_DIGITS) + 20, r2 = 100 * Vt((Math.abs(e2.y) + this.blur) / t2.height, o.NUM_FRACTION_DIGITS) + 20), t2.flipX && (e2.x *= -1), t2.flipY && (e2.y *= -1), '<filter id="SVGID_'.concat(this.id, '" y="-').concat(r2, '%" height="').concat(100 + 2 * r2, '%" x="-').concat(i2, '%" width="').concat(100 + 2 * i2, `%" >
	<feGaussianBlur in="SourceAlpha" stdDeviation="`).concat(Vt(this.blur ? this.blur / 2 : 0, o.NUM_FRACTION_DIGITS), `"></feGaussianBlur>
	<feOffset dx="`).concat(Vt(e2.x, o.NUM_FRACTION_DIGITS), '" dy="').concat(Vt(e2.y, o.NUM_FRACTION_DIGITS), `" result="oBlur" ></feOffset>
	<feFlood flood-color="`).concat(s2.toRgb(), '" flood-opacity="').concat(s2.getAlpha(), `"/>
	<feComposite in2="oBlur" operator="in" />
	<feMerge>
		<feMergeNode></feMergeNode>
		<feMergeNode in="SourceGraphic"></feMergeNode>
	</feMerge>
</filter>
`);
  }
  toObject() {
    const t2 = { color: this.color, blur: this.blur, offsetX: this.offsetX, offsetY: this.offsetY, affectStroke: this.affectStroke, nonScaling: this.nonScaling, type: this.constructor.type }, e2 = Os.ownDefaults;
    return this.includeDefaultValues ? t2 : Wt(t2, (t3, s2) => t3 !== e2[s2]);
  }
  static async fromObject(t2) {
    return new this(t2);
  }
}
t(Os, "ownDefaults", { color: "rgb(0,0,0)", blur: 0, offsetX: 0, offsetY: 0, affectStroke: false, includeDefaultValues: true, nonScaling: false }), t(Os, "type", "shadow"), tt.setClass(Os, "shadow");
var ks = (t2, e2, s2) => Math.max(t2, Math.min(e2, s2));
var Ds = [P, M, H, N, "flipX", "flipY", "originX", "originY", "angle", "opacity", "globalCompositeOperation", "shadow", "visible", U, q];
var Ms = [K, J, "strokeWidth", "strokeDashArray", "width", "height", "paintFirst", "strokeUniform", "strokeLineCap", "strokeDashOffset", "strokeLineJoin", "strokeMiterLimit", "backgroundColor", "clipPath"];
var Ps = { top: 0, left: 0, width: 0, height: 0, angle: 0, flipX: false, flipY: false, scaleX: 1, scaleY: 1, minScaleLimit: 0, skewX: 0, skewY: 0, originX: M, originY: P, strokeWidth: 1, strokeUniform: false, padding: 0, opacity: 1, paintFirst: K, fill: "rgb(0,0,0)", fillRule: "nonzero", stroke: null, strokeDashArray: null, strokeDashOffset: 0, strokeLineCap: "butt", strokeLineJoin: "miter", strokeMiterLimit: 4, globalCompositeOperation: "source-over", backgroundColor: "", shadow: null, visible: true, includeDefaultValues: true, excludeFromExport: false, objectCaching: true, clipPath: undefined, inverted: false, absolutePositioned: false, centeredRotation: true, centeredScaling: false, dirty: true };
var Es = (t2, e2, s2, i2) => (t2 < Math.abs(e2) ? (t2 = e2, i2 = s2 / 4) : i2 = e2 === 0 && t2 === 0 ? s2 / S * Math.asin(1) : s2 / S * Math.asin(e2 / t2), { a: t2, c: e2, p: s2, s: i2 });
var As = (t2, e2, s2, i2, r2) => t2 * Math.pow(2, 10 * (i2 -= 1)) * Math.sin((i2 * r2 - e2) * S / s2);
var js = (t2, e2, s2, i2) => -s2 * Math.cos(t2 / i2 * b) + s2 + e2;
var Fs = (t2, e2, s2, i2) => (t2 /= i2) < 1 / 2.75 ? s2 * (7.5625 * t2 * t2) + e2 : t2 < 2 / 2.75 ? s2 * (7.5625 * (t2 -= 1.5 / 2.75) * t2 + 0.75) + e2 : t2 < 2.5 / 2.75 ? s2 * (7.5625 * (t2 -= 2.25 / 2.75) * t2 + 0.9375) + e2 : s2 * (7.5625 * (t2 -= 2.625 / 2.75) * t2 + 0.984375) + e2;
var Ls = (t2, e2, s2, i2) => s2 - Fs(i2 - t2, 0, s2, i2) + e2;
var Rs = Object.freeze({ __proto__: null, defaultEasing: js, easeInBack: function(t2, e2, s2, i2) {
  let r2 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1.70158;
  return s2 * (t2 /= i2) * t2 * ((r2 + 1) * t2 - r2) + e2;
}, easeInBounce: Ls, easeInCirc: (t2, e2, s2, i2) => -s2 * (Math.sqrt(1 - (t2 /= i2) * t2) - 1) + e2, easeInCubic: (t2, e2, s2, i2) => s2 * (t2 / i2) ** 3 + e2, easeInElastic: (t2, e2, s2, i2) => {
  const r2 = s2;
  let n2 = 0;
  if (t2 === 0)
    return e2;
  if ((t2 /= i2) === 1)
    return e2 + s2;
  n2 || (n2 = 0.3 * i2);
  const { a: o2, s: a2, p: h2 } = Es(r2, s2, n2, 1.70158);
  return -As(o2, a2, h2, t2, i2) + e2;
}, easeInExpo: (t2, e2, s2, i2) => t2 === 0 ? e2 : s2 * 2 ** (10 * (t2 / i2 - 1)) + e2, easeInOutBack: function(t2, e2, s2, i2) {
  let r2 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1.70158;
  return (t2 /= i2 / 2) < 1 ? s2 / 2 * (t2 * t2 * ((1 + (r2 *= 1.525)) * t2 - r2)) + e2 : s2 / 2 * ((t2 -= 2) * t2 * ((1 + (r2 *= 1.525)) * t2 + r2) + 2) + e2;
}, easeInOutBounce: (t2, e2, s2, i2) => t2 < i2 / 2 ? 0.5 * Ls(2 * t2, 0, s2, i2) + e2 : 0.5 * Fs(2 * t2 - i2, 0, s2, i2) + 0.5 * s2 + e2, easeInOutCirc: (t2, e2, s2, i2) => (t2 /= i2 / 2) < 1 ? -s2 / 2 * (Math.sqrt(1 - t2 ** 2) - 1) + e2 : s2 / 2 * (Math.sqrt(1 - (t2 -= 2) * t2) + 1) + e2, easeInOutCubic: (t2, e2, s2, i2) => (t2 /= i2 / 2) < 1 ? s2 / 2 * t2 ** 3 + e2 : s2 / 2 * ((t2 - 2) ** 3 + 2) + e2, easeInOutElastic: (t2, e2, s2, i2) => {
  const r2 = s2;
  let n2 = 0;
  if (t2 === 0)
    return e2;
  if ((t2 /= i2 / 2) === 2)
    return e2 + s2;
  n2 || (n2 = i2 * (0.3 * 1.5));
  const { a: o2, s: a2, p: h2, c: c2 } = Es(r2, s2, n2, 1.70158);
  return t2 < 1 ? -0.5 * As(o2, a2, h2, t2, i2) + e2 : o2 * Math.pow(2, -10 * (t2 -= 1)) * Math.sin((t2 * i2 - a2) * S / h2) * 0.5 + c2 + e2;
}, easeInOutExpo: (t2, e2, s2, i2) => t2 === 0 ? e2 : t2 === i2 ? e2 + s2 : (t2 /= i2 / 2) < 1 ? s2 / 2 * 2 ** (10 * (t2 - 1)) + e2 : s2 / 2 * -(2 ** (-10 * --t2) + 2) + e2, easeInOutQuad: (t2, e2, s2, i2) => (t2 /= i2 / 2) < 1 ? s2 / 2 * t2 ** 2 + e2 : -s2 / 2 * (--t2 * (t2 - 2) - 1) + e2, easeInOutQuart: (t2, e2, s2, i2) => (t2 /= i2 / 2) < 1 ? s2 / 2 * t2 ** 4 + e2 : -s2 / 2 * ((t2 -= 2) * t2 ** 3 - 2) + e2, easeInOutQuint: (t2, e2, s2, i2) => (t2 /= i2 / 2) < 1 ? s2 / 2 * t2 ** 5 + e2 : s2 / 2 * ((t2 - 2) ** 5 + 2) + e2, easeInOutSine: (t2, e2, s2, i2) => -s2 / 2 * (Math.cos(Math.PI * t2 / i2) - 1) + e2, easeInQuad: (t2, e2, s2, i2) => s2 * (t2 /= i2) * t2 + e2, easeInQuart: (t2, e2, s2, i2) => s2 * (t2 /= i2) * t2 ** 3 + e2, easeInQuint: (t2, e2, s2, i2) => s2 * (t2 / i2) ** 5 + e2, easeInSine: (t2, e2, s2, i2) => -s2 * Math.cos(t2 / i2 * b) + s2 + e2, easeOutBack: function(t2, e2, s2, i2) {
  let r2 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1.70158;
  return s2 * ((t2 = t2 / i2 - 1) * t2 * ((r2 + 1) * t2 + r2) + 1) + e2;
}, easeOutBounce: Fs, easeOutCirc: (t2, e2, s2, i2) => s2 * Math.sqrt(1 - (t2 = t2 / i2 - 1) * t2) + e2, easeOutCubic: (t2, e2, s2, i2) => s2 * ((t2 / i2 - 1) ** 3 + 1) + e2, easeOutElastic: (t2, e2, s2, i2) => {
  const r2 = s2;
  let n2 = 0;
  if (t2 === 0)
    return e2;
  if ((t2 /= i2) === 1)
    return e2 + s2;
  n2 || (n2 = 0.3 * i2);
  const { a: o2, s: a2, p: h2, c: c2 } = Es(r2, s2, n2, 1.70158);
  return o2 * 2 ** (-10 * t2) * Math.sin((t2 * i2 - a2) * S / h2) + c2 + e2;
}, easeOutExpo: (t2, e2, s2, i2) => t2 === i2 ? e2 + s2 : s2 * -(2 ** (-10 * t2 / i2) + 1) + e2, easeOutQuad: (t2, e2, s2, i2) => -s2 * (t2 /= i2) * (t2 - 2) + e2, easeOutQuart: (t2, e2, s2, i2) => -s2 * ((t2 = t2 / i2 - 1) * t2 ** 3 - 1) + e2, easeOutQuint: (t2, e2, s2, i2) => s2 * ((t2 / i2 - 1) ** 5 + 1) + e2, easeOutSine: (t2, e2, s2, i2) => s2 * Math.sin(t2 / i2 * b) + e2 });
var Is = () => false;

class Bs {
  constructor(e2) {
    let { startValue: s2, byValue: i2, duration: r2 = 500, delay: n2 = 0, easing: o2 = js, onStart: a2 = C, onChange: h2 = C, onComplete: c2 = C, abort: l2 = Is, target: u2 } = e2;
    t(this, "_state", "pending"), t(this, "durationProgress", 0), t(this, "valueProgress", 0), this.tick = this.tick.bind(this), this.duration = r2, this.delay = n2, this.easing = o2, this._onStart = a2, this._onChange = h2, this._onComplete = c2, this._abort = l2, this.target = u2, this.startValue = s2, this.byValue = i2, this.value = this.startValue, this.endValue = Object.freeze(this.calculate(this.duration).value);
  }
  get state() {
    return this._state;
  }
  isDone() {
    return this._state === "aborted" || this._state === "completed";
  }
  start() {
    const t2 = (t3) => {
      this._state === "pending" && (this.startTime = t3 || +new Date, this._state = "running", this._onStart(), this.tick(this.startTime));
    };
    this.register(), this.delay > 0 ? setTimeout(() => ut(t2), this.delay) : ut(t2);
  }
  tick(t2) {
    const e2 = (t2 || +new Date) - this.startTime, s2 = Math.min(e2, this.duration);
    this.durationProgress = s2 / this.duration;
    const { value: i2, valueProgress: r2 } = this.calculate(s2);
    this.value = Object.freeze(i2), this.valueProgress = r2, this._state !== "aborted" && (this._abort(this.value, this.valueProgress, this.durationProgress) ? (this._state = "aborted", this.unregister()) : e2 >= this.duration ? (this.durationProgress = this.valueProgress = 1, this._onChange(this.endValue, this.valueProgress, this.durationProgress), this._state = "completed", this._onComplete(this.endValue, this.valueProgress, this.durationProgress), this.unregister()) : (this._onChange(this.value, this.valueProgress, this.durationProgress), ut(this.tick)));
  }
  register() {
    et.push(this);
  }
  unregister() {
    et.remove(this);
  }
  abort() {
    this._state = "aborted", this.unregister();
  }
}
var Xs = ["startValue", "endValue"];

class Ys extends Bs {
  constructor(t2) {
    let { startValue: e2 = 0, endValue: r2 = 100 } = t2;
    super(s(s({}, i(t2, Xs)), {}, { startValue: e2, byValue: r2 - e2 }));
  }
  calculate(t2) {
    const e2 = this.easing(t2, this.startValue, this.byValue, this.duration);
    return { value: e2, valueProgress: Math.abs((e2 - this.startValue) / this.byValue) };
  }
}
var Ws = ["startValue", "endValue"];

class Vs extends Bs {
  constructor(t2) {
    let { startValue: e2 = [0], endValue: r2 = [100] } = t2;
    super(s(s({}, i(t2, Ws)), {}, { startValue: e2, byValue: r2.map((t3, s2) => t3 - e2[s2]) }));
  }
  calculate(t2) {
    const e2 = this.startValue.map((e3, s2) => this.easing(t2, e3, this.byValue[s2], this.duration, s2));
    return { value: e2, valueProgress: Math.abs((e2[0] - this.startValue[0]) / this.byValue[0]) };
  }
}
var zs = ["startValue", "endValue", "easing", "onChange", "onComplete", "abort"];
var Gs = (t2, e2, s2, i2) => e2 + s2 * (1 - Math.cos(t2 / i2 * b));
var Hs = (t2) => t2 && ((e2, s2, i2) => t2(new Le(e2).toRgba(), s2, i2));

class Ns extends Bs {
  constructor(t2) {
    let { startValue: e2, endValue: r2, easing: n2 = Gs, onChange: o2, onComplete: a2, abort: h2 } = t2, c2 = i(t2, zs);
    const l2 = new Le(e2).getSource(), u2 = new Le(r2).getSource();
    super(s(s({}, c2), {}, { startValue: l2, byValue: u2.map((t3, e3) => t3 - l2[e3]), easing: n2, onChange: Hs(o2), onComplete: Hs(a2), abort: Hs(h2) }));
  }
  calculate(t2) {
    const [e2, s2, i2, r2] = this.startValue.map((e3, s3) => this.easing(t2, e3, this.byValue[s3], this.duration, s3)), n2 = [...[e2, s2, i2].map(Math.round), ks(0, r2, 1)];
    return { value: n2, valueProgress: n2.map((t3, e3) => this.byValue[e3] !== 0 ? Math.abs((t3 - this.startValue[e3]) / this.byValue[e3]) : 0).find((t3) => t3 !== 0) || 0 };
  }
}
function Us(t2) {
  const e2 = ((t3) => Array.isArray(t3.startValue) || Array.isArray(t3.endValue))(t2) ? new Vs(t2) : new Ys(t2);
  return e2.start(), e2;
}
function qs(t2) {
  const e2 = new Ns(t2);
  return e2.start(), e2;
}

class Ks {
  constructor(t2) {
    this.status = t2, this.points = [];
  }
  includes(t2) {
    return this.points.some((e2) => e2.eq(t2));
  }
  append() {
    for (var t2 = arguments.length, e2 = new Array(t2), s2 = 0;s2 < t2; s2++)
      e2[s2] = arguments[s2];
    return this.points = this.points.concat(e2.filter((t3) => !this.includes(t3))), this;
  }
  static isPointContained(t2, e2, s2) {
    let i2 = arguments.length > 3 && arguments[3] !== undefined && arguments[3];
    if (e2.eq(s2))
      return t2.eq(e2);
    if (e2.x === s2.x)
      return t2.x === e2.x && (i2 || t2.y >= Math.min(e2.y, s2.y) && t2.y <= Math.max(e2.y, s2.y));
    if (e2.y === s2.y)
      return t2.y === e2.y && (i2 || t2.x >= Math.min(e2.x, s2.x) && t2.x <= Math.max(e2.x, s2.x));
    {
      const r2 = ps(e2, s2), n2 = ps(e2, t2).divide(r2);
      return i2 ? Math.abs(n2.x) === Math.abs(n2.y) : n2.x === n2.y && n2.x >= 0 && n2.x <= 1;
    }
  }
  static isPointInPolygon(t2, e2) {
    const s2 = new ot(t2).setX(Math.min(t2.x - 1, ...e2.map((t3) => t3.x)));
    let i2 = 0;
    for (let r2 = 0;r2 < e2.length; r2++) {
      const n2 = this.intersectSegmentSegment(e2[r2], e2[(r2 + 1) % e2.length], t2, s2);
      if (n2.includes(t2))
        return true;
      i2 += Number(n2.status === "Intersection");
    }
    return i2 % 2 == 1;
  }
  static intersectLineLine(t2, e2, s2, i2) {
    let r2 = !(arguments.length > 4 && arguments[4] !== undefined) || arguments[4], n2 = !(arguments.length > 5 && arguments[5] !== undefined) || arguments[5];
    const o2 = e2.x - t2.x, a2 = e2.y - t2.y, h2 = i2.x - s2.x, c2 = i2.y - s2.y, l2 = t2.x - s2.x, u2 = t2.y - s2.y, d2 = h2 * u2 - c2 * l2, g2 = o2 * u2 - a2 * l2, f = c2 * o2 - h2 * a2;
    if (f !== 0) {
      const e3 = d2 / f, s3 = g2 / f;
      return (r2 || 0 <= e3 && e3 <= 1) && (n2 || 0 <= s3 && s3 <= 1) ? new Ks("Intersection").append(new ot(t2.x + e3 * o2, t2.y + e3 * a2)) : new Ks;
    }
    if (d2 === 0 || g2 === 0) {
      const o3 = r2 || n2 || Ks.isPointContained(t2, s2, i2) || Ks.isPointContained(e2, s2, i2) || Ks.isPointContained(s2, t2, e2) || Ks.isPointContained(i2, t2, e2);
      return new Ks(o3 ? "Coincident" : undefined);
    }
    return new Ks("Parallel");
  }
  static intersectSegmentLine(t2, e2, s2, i2) {
    return Ks.intersectLineLine(t2, e2, s2, i2, false, true);
  }
  static intersectSegmentSegment(t2, e2, s2, i2) {
    return Ks.intersectLineLine(t2, e2, s2, i2, false, false);
  }
  static intersectLinePolygon(t2, e2, s2) {
    let i2 = !(arguments.length > 3 && arguments[3] !== undefined) || arguments[3];
    const r2 = new Ks, n2 = s2.length;
    for (let o2, a2, h2, c2 = 0;c2 < n2; c2++) {
      if (o2 = s2[c2], a2 = s2[(c2 + 1) % n2], h2 = Ks.intersectLineLine(t2, e2, o2, a2, i2, false), h2.status === "Coincident")
        return h2;
      r2.append(...h2.points);
    }
    return r2.points.length > 0 && (r2.status = "Intersection"), r2;
  }
  static intersectSegmentPolygon(t2, e2, s2) {
    return Ks.intersectLinePolygon(t2, e2, s2, false);
  }
  static intersectPolygonPolygon(t2, e2) {
    const s2 = new Ks, i2 = t2.length, r2 = [];
    for (let n2 = 0;n2 < i2; n2++) {
      const o2 = t2[n2], a2 = t2[(n2 + 1) % i2], h2 = Ks.intersectSegmentPolygon(o2, a2, e2);
      h2.status === "Coincident" ? (r2.push(h2), s2.append(o2, a2)) : s2.append(...h2.points);
    }
    return r2.length > 0 && r2.length === t2.length ? new Ks("Coincident") : (s2.points.length > 0 && (s2.status = "Intersection"), s2);
  }
  static intersectPolygonRectangle(t2, e2, s2) {
    const i2 = e2.min(s2), r2 = e2.max(s2), n2 = new ot(r2.x, i2.y), o2 = new ot(i2.x, r2.y);
    return Ks.intersectPolygonPolygon(t2, [i2, n2, r2, o2]);
  }
}

class Js extends lt {
  getX() {
    return this.getXY().x;
  }
  setX(t2) {
    this.setXY(this.getXY().setX(t2));
  }
  getY() {
    return this.getXY().y;
  }
  setY(t2) {
    this.setXY(this.getXY().setY(t2));
  }
  getRelativeX() {
    return this.left;
  }
  setRelativeX(t2) {
    this.left = t2;
  }
  getRelativeY() {
    return this.top;
  }
  setRelativeY(t2) {
    this.top = t2;
  }
  getXY() {
    const t2 = this.getRelativeXY();
    return this.group ? St(t2, this.group.calcTransformMatrix()) : t2;
  }
  setXY(t2, e2, s2) {
    this.group && (t2 = St(t2, wt(this.group.calcTransformMatrix()))), this.setRelativeXY(t2, e2, s2);
  }
  getRelativeXY() {
    return new ot(this.left, this.top);
  }
  setRelativeXY(t2) {
    let e2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.originX, s2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.originY;
    this.setPositionByOrigin(t2, e2, s2);
  }
  isStrokeAccountedForInDimensions() {
    return false;
  }
  getCoords() {
    const { tl: t2, tr: e2, br: s2, bl: i2 } = this.aCoords || (this.aCoords = this.calcACoords()), r2 = [t2, e2, s2, i2];
    if (this.group) {
      const t3 = this.group.calcTransformMatrix();
      return r2.map((e3) => St(e3, t3));
    }
    return r2;
  }
  intersectsWithRect(t2, e2) {
    return Ks.intersectPolygonRectangle(this.getCoords(), t2, e2).status === "Intersection";
  }
  intersectsWithObject(t2) {
    const e2 = Ks.intersectPolygonPolygon(this.getCoords(), t2.getCoords());
    return e2.status === "Intersection" || e2.status === "Coincident" || t2.isContainedWithinObject(this) || this.isContainedWithinObject(t2);
  }
  isContainedWithinObject(t2) {
    return this.getCoords().every((e2) => t2.containsPoint(e2));
  }
  isContainedWithinRect(t2, e2) {
    const { left: s2, top: i2, width: r2, height: n2 } = this.getBoundingRect();
    return s2 >= t2.x && s2 + r2 <= e2.x && i2 >= t2.y && i2 + n2 <= e2.y;
  }
  isOverlapping(t2) {
    return this.intersectsWithObject(t2) || this.isContainedWithinObject(t2) || t2.isContainedWithinObject(this);
  }
  containsPoint(t2) {
    return Ks.isPointInPolygon(t2, this.getCoords());
  }
  isOnScreen() {
    if (!this.canvas)
      return false;
    const { tl: t2, br: e2 } = this.canvas.vptCoords;
    return !!this.getCoords().some((s2) => s2.x <= e2.x && s2.x >= t2.x && s2.y <= e2.y && s2.y >= t2.y) || (!!this.intersectsWithRect(t2, e2) || this.containsPoint(t2.midPointFrom(e2)));
  }
  isPartiallyOnScreen() {
    if (!this.canvas)
      return false;
    const { tl: t2, br: e2 } = this.canvas.vptCoords;
    if (this.intersectsWithRect(t2, e2))
      return true;
    return this.getCoords().every((s2) => (s2.x >= e2.x || s2.x <= t2.x) && (s2.y >= e2.y || s2.y <= t2.y)) && this.containsPoint(t2.midPointFrom(e2));
  }
  getBoundingRect() {
    return ae(this.getCoords());
  }
  getScaledWidth() {
    return this._getTransformedDimensions().x;
  }
  getScaledHeight() {
    return this._getTransformedDimensions().y;
  }
  scale(t2) {
    this._set(H, t2), this._set(N, t2), this.setCoords();
  }
  scaleToWidth(t2) {
    const e2 = this.getBoundingRect().width / this.getScaledWidth();
    return this.scale(t2 / this.width / e2);
  }
  scaleToHeight(t2) {
    const e2 = this.getBoundingRect().height / this.getScaledHeight();
    return this.scale(t2 / this.height / e2);
  }
  getCanvasRetinaScaling() {
    var t2;
    return ((t2 = this.canvas) === null || t2 === undefined ? undefined : t2.getRetinaScaling()) || 1;
  }
  getTotalAngle() {
    return this.group ? Ct(kt(this.calcTransformMatrix())) : this.angle;
  }
  getViewportTransform() {
    var t2;
    return ((t2 = this.canvas) === null || t2 === undefined ? undefined : t2.viewportTransform) || T.concat();
  }
  calcACoords() {
    const t2 = Pt({ angle: this.angle }), { x: e2, y: s2 } = this.getRelativeCenterPoint(), i2 = Mt(e2, s2), r2 = Tt(i2, t2), n2 = this._getTransformedDimensions(), o2 = n2.x / 2, a2 = n2.y / 2;
    return { tl: St({ x: -o2, y: -a2 }, r2), tr: St({ x: o2, y: -a2 }, r2), bl: St({ x: -o2, y: a2 }, r2), br: St({ x: o2, y: a2 }, r2) };
  }
  setCoords() {
    this.aCoords = this.calcACoords();
  }
  transformMatrixKey() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined && arguments[0], e2 = [];
    return !t2 && this.group && (e2 = this.group.transformMatrixKey(t2)), e2.push(this.top, this.left, this.width, this.height, this.scaleX, this.scaleY, this.angle, this.strokeWidth, this.skewX, this.skewY, +this.flipX, +this.flipY, xe(this.originX), xe(this.originY)), e2;
  }
  calcTransformMatrix() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined && arguments[0], e2 = this.calcOwnMatrix();
    if (t2 || !this.group)
      return e2;
    const s2 = this.transformMatrixKey(t2), i2 = this.matrixCache;
    return i2 && i2.key.every((t3, e3) => t3 === s2[e3]) ? i2.value : (this.group && (e2 = Tt(this.group.calcTransformMatrix(false), e2)), this.matrixCache = { key: s2, value: e2 }, e2);
  }
  calcOwnMatrix() {
    const t2 = this.transformMatrixKey(true), e2 = this.ownMatrixCache;
    if (e2 && e2.key === t2)
      return e2.value;
    const s2 = this.getRelativeCenterPoint(), i2 = { angle: this.angle, translateX: s2.x, translateY: s2.y, scaleX: this.scaleX, scaleY: this.scaleY, skewX: this.skewX, skewY: this.skewY, flipX: this.flipX, flipY: this.flipY }, r2 = Rt(i2);
    return this.ownMatrixCache = { key: t2, value: r2 }, r2;
  }
  _getNonTransformedDimensions() {
    return new ot(this.width, this.height).scalarAdd(this.strokeWidth);
  }
  _calculateCurrentDimensions(t2) {
    return this._getTransformedDimensions(t2).transform(this.getViewportTransform(), true).scalarAdd(2 * this.padding);
  }
  _getTransformedDimensions() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const e2 = s({ scaleX: this.scaleX, scaleY: this.scaleY, skewX: this.skewX, skewY: this.skewY, width: this.width, height: this.height, strokeWidth: this.strokeWidth }, t2), i2 = e2.strokeWidth;
    let r2 = i2, n2 = 0;
    this.strokeUniform && (r2 = 0, n2 = i2);
    const o2 = e2.width + r2, a2 = e2.height + r2;
    let h2;
    return h2 = e2.skewX === 0 && e2.skewY === 0 ? new ot(o2 * e2.scaleX, a2 * e2.scaleY) : ge(o2, a2, Lt(e2)), h2.scalarAdd(n2);
  }
  translateToGivenOrigin(t2, e2, s2, i2, r2) {
    let { x: n2, y: o2 } = t2;
    const a2 = xe(i2) - xe(e2), h2 = xe(r2) - xe(s2);
    if (a2 || h2) {
      const t3 = this._getTransformedDimensions();
      n2 += a2 * t3.x, o2 += h2 * t3.y;
    }
    return new ot(n2, o2);
  }
  translateToCenterPoint(t2, e2, s2) {
    if (e2 === D && s2 === D)
      return t2;
    const i2 = this.translateToGivenOrigin(t2, e2, s2, D, D);
    return this.angle ? i2.rotate(xt(this.angle), t2) : i2;
  }
  translateToOriginPoint(t2, e2, s2) {
    const i2 = this.translateToGivenOrigin(t2, D, D, e2, s2);
    return this.angle ? i2.rotate(xt(this.angle), t2) : i2;
  }
  getCenterPoint() {
    const t2 = this.getRelativeCenterPoint();
    return this.group ? St(t2, this.group.calcTransformMatrix()) : t2;
  }
  getRelativeCenterPoint() {
    return this.translateToCenterPoint(new ot(this.left, this.top), this.originX, this.originY);
  }
  getPointByOrigin(t2, e2) {
    return this.translateToOriginPoint(this.getRelativeCenterPoint(), t2, e2);
  }
  setPositionByOrigin(t2, e2, s2) {
    const i2 = this.translateToCenterPoint(t2, e2, s2), r2 = this.translateToOriginPoint(i2, this.originX, this.originY);
    this.set({ left: r2.x, top: r2.y });
  }
  _getLeftTopCoords() {
    return this.translateToOriginPoint(this.getRelativeCenterPoint(), M, P);
  }
}
var Qs = ["type"];
var Zs = ["extraParam"];
var $s = class e2 extends Js {
  static getDefaults() {
    return e2.ownDefaults;
  }
  get type() {
    const t2 = this.constructor.type;
    return t2 === "FabricObject" ? "object" : t2.toLowerCase();
  }
  set type(t2) {
    a("warn", "Setting type has no effect", t2);
  }
  constructor(s2) {
    super(), t(this, "_cacheContext", null), Object.assign(this, e2.ownDefaults), this.setOptions(s2);
  }
  _createCacheCanvas() {
    this._cacheCanvas = pt(), this._cacheContext = this._cacheCanvas.getContext("2d"), this._updateCacheCanvas(), this.dirty = true;
  }
  _limitCacheSize(t2) {
    const { width: e3, height: s2 } = t2, i2 = o.maxCacheSideLimit, r2 = o.minCacheSideLimit;
    if (e3 <= i2 && s2 <= i2 && e3 * s2 <= o.perfLimitSizeTotal)
      return e3 < r2 && (t2.width = r2), s2 < r2 && (t2.height = r2), t2;
    const n2 = e3 / s2, [a2, h2] = _.limitDimsByArea(n2), c2 = ks(r2, a2, i2), l2 = ks(r2, h2, i2);
    return e3 > c2 && (t2.zoomX /= e3 / c2, t2.width = c2, t2.capped = true), s2 > l2 && (t2.zoomY /= s2 / l2, t2.height = l2, t2.capped = true), t2;
  }
  _getCacheCanvasDimensions() {
    const t2 = this.getTotalObjectScaling(), e3 = this._getTransformedDimensions({ skewX: 0, skewY: 0 }), s2 = e3.x * t2.x / this.scaleX, i2 = e3.y * t2.y / this.scaleY;
    return { width: Math.ceil(s2 + 2), height: Math.ceil(i2 + 2), zoomX: t2.x, zoomY: t2.y, x: s2, y: i2 };
  }
  _updateCacheCanvas() {
    const t2 = this._cacheCanvas, e3 = this._cacheContext, { width: s2, height: i2, zoomX: r2, zoomY: n2, x: o2, y: a2 } = this._limitCacheSize(this._getCacheCanvasDimensions()), h2 = s2 !== t2.width || i2 !== t2.height, c2 = this.zoomX !== r2 || this.zoomY !== n2;
    if (!t2 || !e3)
      return false;
    if (h2 || c2) {
      s2 !== t2.width || i2 !== t2.height ? (t2.width = s2, t2.height = i2) : (e3.setTransform(1, 0, 0, 1, 0, 0), e3.clearRect(0, 0, t2.width, t2.height));
      const h3 = o2 / 2, c3 = a2 / 2;
      return this.cacheTranslationX = Math.round(t2.width / 2 - h3) + h3, this.cacheTranslationY = Math.round(t2.height / 2 - c3) + c3, e3.translate(this.cacheTranslationX, this.cacheTranslationY), e3.scale(r2, n2), this.zoomX = r2, this.zoomY = n2, true;
    }
    return false;
  }
  setOptions() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this._setOptions(t2);
  }
  transform(t2) {
    const e3 = this.group && !this.group._transformDone || this.group && this.canvas && t2 === this.canvas.contextTop, s2 = this.calcTransformMatrix(!e3);
    t2.transform(s2[0], s2[1], s2[2], s2[3], s2[4], s2[5]);
  }
  getObjectScaling() {
    if (!this.group)
      return new ot(Math.abs(this.scaleX), Math.abs(this.scaleY));
    const t2 = Dt(this.calcTransformMatrix());
    return new ot(Math.abs(t2.scaleX), Math.abs(t2.scaleY));
  }
  getTotalObjectScaling() {
    const t2 = this.getObjectScaling();
    if (this.canvas) {
      const e3 = this.canvas.getZoom(), s2 = this.getCanvasRetinaScaling();
      return t2.scalarMultiply(e3 * s2);
    }
    return t2;
  }
  getObjectOpacity() {
    let t2 = this.opacity;
    return this.group && (t2 *= this.group.getObjectOpacity()), t2;
  }
  _constrainScale(t2) {
    return Math.abs(t2) < this.minScaleLimit ? t2 < 0 ? -this.minScaleLimit : this.minScaleLimit : t2 === 0 ? 0.0001 : t2;
  }
  _set(t2, e3) {
    t2 !== H && t2 !== N || (e3 = this._constrainScale(e3)), t2 === H && e3 < 0 ? (this.flipX = !this.flipX, e3 *= -1) : t2 === "scaleY" && e3 < 0 ? (this.flipY = !this.flipY, e3 *= -1) : t2 !== "shadow" || !e3 || e3 instanceof Os || (e3 = new Os(e3));
    const s2 = this[t2] !== e3;
    return this[t2] = e3, s2 && this.constructor.cacheProperties.includes(t2) && (this.dirty = true), this.parent && (this.dirty || s2 && this.constructor.stateProperties.includes(t2)) && this.parent._set("dirty", true), this;
  }
  isNotVisible() {
    return this.opacity === 0 || !this.width && !this.height && this.strokeWidth === 0 || !this.visible;
  }
  render(t2) {
    this.isNotVisible() || this.canvas && this.canvas.skipOffscreen && !this.group && !this.isOnScreen() || (t2.save(), this._setupCompositeOperation(t2), this.drawSelectionBackground(t2), this.transform(t2), this._setOpacity(t2), this._setShadow(t2), this.shouldCache() ? (this.renderCache(), this.drawCacheOnCanvas(t2)) : (this._removeCacheCanvas(), this.drawObject(t2, false, {}), this.dirty = false), t2.restore());
  }
  drawSelectionBackground(t2) {}
  renderCache(t2) {
    if (t2 = t2 || {}, this._cacheCanvas && this._cacheContext || this._createCacheCanvas(), this.isCacheDirty() && this._cacheContext) {
      const { zoomX: e3, zoomY: s2, cacheTranslationX: i2, cacheTranslationY: r2 } = this, { width: n2, height: o2 } = this._cacheCanvas;
      this.drawObject(this._cacheContext, t2.forClipping, { zoomX: e3, zoomY: s2, cacheTranslationX: i2, cacheTranslationY: r2, width: n2, height: o2, parentClipPaths: [] }), this.dirty = false;
    }
  }
  _removeCacheCanvas() {
    this._cacheCanvas = undefined, this._cacheContext = null;
  }
  hasStroke() {
    return this.stroke && this.stroke !== "transparent" && this.strokeWidth !== 0;
  }
  hasFill() {
    return this.fill && this.fill !== "transparent";
  }
  needsItsOwnCache() {
    return !!(this.paintFirst === J && this.hasFill() && this.hasStroke() && this.shadow) || !!this.clipPath;
  }
  shouldCache() {
    return this.ownCaching = this.objectCaching && (!this.parent || !this.parent.isOnACache()) || this.needsItsOwnCache(), this.ownCaching;
  }
  willDrawShadow() {
    return !!this.shadow && (this.shadow.offsetX !== 0 || this.shadow.offsetY !== 0);
  }
  drawClipPathOnCache(t2, e3, s2) {
    t2.save(), e3.inverted ? t2.globalCompositeOperation = "destination-out" : t2.globalCompositeOperation = "destination-in", t2.setTransform(1, 0, 0, 1, 0, 0), t2.drawImage(s2, 0, 0), t2.restore();
  }
  drawObject(t2, e3, s2) {
    const i2 = this.fill, r2 = this.stroke;
    e3 ? (this.fill = "black", this.stroke = "", this._setClippingProperties(t2)) : this._renderBackground(t2), this._render(t2), this._drawClipPath(t2, this.clipPath, s2), this.fill = i2, this.stroke = r2;
  }
  createClipPathLayer(t2, e3) {
    const s2 = vt(e3), i2 = s2.getContext("2d");
    if (i2.translate(e3.cacheTranslationX, e3.cacheTranslationY), i2.scale(e3.zoomX, e3.zoomY), t2._cacheCanvas = s2, e3.parentClipPaths.forEach((t3) => {
      t3.transform(i2);
    }), e3.parentClipPaths.push(t2), t2.absolutePositioned) {
      const t3 = wt(this.calcTransformMatrix());
      i2.transform(t3[0], t3[1], t3[2], t3[3], t3[4], t3[5]);
    }
    return t2.transform(i2), t2.drawObject(i2, true, e3), s2;
  }
  _drawClipPath(t2, e3, s2) {
    if (!e3)
      return;
    e3._transformDone = true;
    const i2 = this.createClipPathLayer(e3, s2);
    this.drawClipPathOnCache(t2, e3, i2);
  }
  drawCacheOnCanvas(t2) {
    t2.scale(1 / this.zoomX, 1 / this.zoomY), t2.drawImage(this._cacheCanvas, -this.cacheTranslationX, -this.cacheTranslationY);
  }
  isCacheDirty() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined && arguments[0];
    if (this.isNotVisible())
      return false;
    const e3 = this._cacheCanvas, s2 = this._cacheContext;
    return !(!e3 || !s2 || t2 || !this._updateCacheCanvas()) || !!(this.dirty || this.clipPath && this.clipPath.absolutePositioned) && (e3 && s2 && !t2 && (s2.save(), s2.setTransform(1, 0, 0, 1, 0, 0), s2.clearRect(0, 0, e3.width, e3.height), s2.restore()), true);
  }
  _renderBackground(t2) {
    if (!this.backgroundColor)
      return;
    const e3 = this._getNonTransformedDimensions();
    t2.fillStyle = this.backgroundColor, t2.fillRect(-e3.x / 2, -e3.y / 2, e3.x, e3.y), this._removeShadow(t2);
  }
  _setOpacity(t2) {
    this.group && !this.group._transformDone ? t2.globalAlpha = this.getObjectOpacity() : t2.globalAlpha *= this.opacity;
  }
  _setStrokeStyles(t2, e3) {
    const s2 = e3.stroke;
    s2 && (t2.lineWidth = e3.strokeWidth, t2.lineCap = e3.strokeLineCap, t2.lineDashOffset = e3.strokeDashOffset, t2.lineJoin = e3.strokeLineJoin, t2.miterLimit = e3.strokeMiterLimit, Gt(s2) ? s2.gradientUnits === "percentage" || s2.gradientTransform || s2.patternTransform ? this._applyPatternForTransformedGradient(t2, s2) : (t2.strokeStyle = s2.toLive(t2), this._applyPatternGradientTransform(t2, s2)) : t2.strokeStyle = e3.stroke);
  }
  _setFillStyles(t2, e3) {
    let { fill: s2 } = e3;
    s2 && (Gt(s2) ? (t2.fillStyle = s2.toLive(t2), this._applyPatternGradientTransform(t2, s2)) : t2.fillStyle = s2);
  }
  _setClippingProperties(t2) {
    t2.globalAlpha = 1, t2.strokeStyle = "transparent", t2.fillStyle = "#000000";
  }
  _setLineDash(t2, e3) {
    e3 && e3.length !== 0 && t2.setLineDash(e3);
  }
  _setShadow(t2) {
    if (!this.shadow)
      return;
    const e3 = this.shadow, s2 = this.canvas, i2 = this.getCanvasRetinaScaling(), [r2, , , n2] = (s2 == null ? undefined : s2.viewportTransform) || T, a2 = r2 * i2, h2 = n2 * i2, c2 = e3.nonScaling ? new ot(1, 1) : this.getObjectScaling();
    t2.shadowColor = e3.color, t2.shadowBlur = e3.blur * o.browserShadowBlurConstant * (a2 + h2) * (c2.x + c2.y) / 4, t2.shadowOffsetX = e3.offsetX * a2 * c2.x, t2.shadowOffsetY = e3.offsetY * h2 * c2.y;
  }
  _removeShadow(t2) {
    this.shadow && (t2.shadowColor = "", t2.shadowBlur = t2.shadowOffsetX = t2.shadowOffsetY = 0);
  }
  _applyPatternGradientTransform(t2, e3) {
    if (!Gt(e3))
      return { offsetX: 0, offsetY: 0 };
    const s2 = e3.gradientTransform || e3.patternTransform, i2 = -this.width / 2 + e3.offsetX || 0, r2 = -this.height / 2 + e3.offsetY || 0;
    return e3.gradientUnits === "percentage" ? t2.transform(this.width, 0, 0, this.height, i2, r2) : t2.transform(1, 0, 0, 1, i2, r2), s2 && t2.transform(s2[0], s2[1], s2[2], s2[3], s2[4], s2[5]), { offsetX: i2, offsetY: r2 };
  }
  _renderPaintInOrder(t2) {
    this.paintFirst === J ? (this._renderStroke(t2), this._renderFill(t2)) : (this._renderFill(t2), this._renderStroke(t2));
  }
  _render(t2) {}
  _renderFill(t2) {
    this.fill && (t2.save(), this._setFillStyles(t2, this), this.fillRule === "evenodd" ? t2.fill("evenodd") : t2.fill(), t2.restore());
  }
  _renderStroke(t2) {
    if (this.stroke && this.strokeWidth !== 0) {
      if (this.shadow && !this.shadow.affectStroke && this._removeShadow(t2), t2.save(), this.strokeUniform) {
        const e3 = this.getObjectScaling();
        t2.scale(1 / e3.x, 1 / e3.y);
      }
      this._setLineDash(t2, this.strokeDashArray), this._setStrokeStyles(t2, this), t2.stroke(), t2.restore();
    }
  }
  _applyPatternForTransformedGradient(t2, e3) {
    var s2;
    const i2 = this._limitCacheSize(this._getCacheCanvasDimensions()), r2 = this.getCanvasRetinaScaling(), n2 = i2.x / this.scaleX / r2, o2 = i2.y / this.scaleY / r2, a2 = vt({ width: Math.ceil(n2), height: Math.ceil(o2) }), h2 = a2.getContext("2d");
    h2 && (h2.beginPath(), h2.moveTo(0, 0), h2.lineTo(n2, 0), h2.lineTo(n2, o2), h2.lineTo(0, o2), h2.closePath(), h2.translate(n2 / 2, o2 / 2), h2.scale(i2.zoomX / this.scaleX / r2, i2.zoomY / this.scaleY / r2), this._applyPatternGradientTransform(h2, e3), h2.fillStyle = e3.toLive(t2), h2.fill(), t2.translate(-this.width / 2 - this.strokeWidth / 2, -this.height / 2 - this.strokeWidth / 2), t2.scale(r2 * this.scaleX / i2.zoomX, r2 * this.scaleY / i2.zoomY), t2.strokeStyle = (s2 = h2.createPattern(a2, "no-repeat")) !== null && s2 !== undefined ? s2 : "");
  }
  _findCenterFromElement() {
    return new ot(this.left + this.width / 2, this.top + this.height / 2);
  }
  clone(t2) {
    const e3 = this.toObject(t2);
    return this.constructor.fromObject(e3);
  }
  cloneAsImage(t2) {
    const e3 = this.toCanvasElement(t2);
    return new (tt.getClass("image"))(e3);
  }
  toCanvasElement() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const e3 = de(this), s2 = this.group, i2 = this.shadow, r2 = Math.abs, n2 = t2.enableRetinaScaling ? y() : 1, o2 = (t2.multiplier || 1) * n2, a2 = t2.canvasProvider || ((t3) => new se(t3, { enableRetinaScaling: false, renderOnAddRemove: false, skipOffscreen: false }));
    delete this.group, t2.withoutTransform && ue(this), t2.withoutShadow && (this.shadow = null), t2.viewportTransform && ve(this, this.getViewportTransform()), this.setCoords();
    const h2 = pt(), c2 = this.getBoundingRect(), l2 = this.shadow, u2 = new ot;
    if (l2) {
      const t3 = l2.blur, e4 = l2.nonScaling ? new ot(1, 1) : this.getObjectScaling();
      u2.x = 2 * Math.round(r2(l2.offsetX) + t3) * r2(e4.x), u2.y = 2 * Math.round(r2(l2.offsetY) + t3) * r2(e4.y);
    }
    const d2 = c2.width + u2.x, g2 = c2.height + u2.y;
    h2.width = Math.ceil(d2), h2.height = Math.ceil(g2);
    const f = a2(h2);
    t2.format === "jpeg" && (f.backgroundColor = "#fff"), this.setPositionByOrigin(new ot(f.width / 2, f.height / 2), D, D);
    const p2 = this.canvas;
    f._objects = [this], this.set("canvas", f), this.setCoords();
    const m2 = f.toCanvasElement(o2 || 1, t2);
    return this.set("canvas", p2), this.shadow = i2, s2 && (this.group = s2), this.set(e3), this.setCoords(), f._objects = [], f.destroy(), m2;
  }
  toDataURL() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return yt(this.toCanvasElement(t2), t2.format || "png", t2.quality || 1);
  }
  toBlob() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _t(this.toCanvasElement(t2), t2.format || "png", t2.quality || 1);
  }
  isType() {
    for (var t2 = arguments.length, e3 = new Array(t2), s2 = 0;s2 < t2; s2++)
      e3[s2] = arguments[s2];
    return e3.includes(this.constructor.type) || e3.includes(this.type);
  }
  complexity() {
    return 1;
  }
  toJSON() {
    return this.toObject();
  }
  rotate(t2) {
    const { centeredRotation: e3, originX: s2, originY: i2 } = this;
    if (e3) {
      const { x: t3, y: e4 } = this.getRelativeCenterPoint();
      this.originX = D, this.originY = D, this.left = t3, this.top = e4;
    }
    if (this.set("angle", t2), e3) {
      const { x: t3, y: e4 } = this.translateToOriginPoint(this.getRelativeCenterPoint(), s2, i2);
      this.left = t3, this.top = e4, this.originX = s2, this.originY = i2;
    }
  }
  setOnGroup() {}
  _setupCompositeOperation(t2) {
    this.globalCompositeOperation && (t2.globalCompositeOperation = this.globalCompositeOperation);
  }
  dispose() {
    et.cancelByTarget(this), this.off(), this._set("canvas", undefined), this._cacheCanvas && p().dispose(this._cacheCanvas), this._cacheCanvas = undefined, this._cacheContext = null;
  }
  animate(t2, e3) {
    return Object.entries(t2).reduce((t3, s2) => {
      let [i2, r2] = s2;
      return t3[i2] = this._animate(i2, r2, e3), t3;
    }, {});
  }
  _animate(t2, e3) {
    let i2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const r2 = t2.split("."), n2 = this.constructor.colorProperties.includes(r2[r2.length - 1]), { abort: o2, startValue: a2, onChange: h2, onComplete: c2 } = i2, l2 = s(s({}, i2), {}, { target: this, startValue: a2 != null ? a2 : r2.reduce((t3, e4) => t3[e4], this), endValue: e3, abort: o2 == null ? undefined : o2.bind(this), onChange: (t3, e4, s2) => {
      r2.reduce((e5, s3, i3) => (i3 === r2.length - 1 && (e5[s3] = t3), e5[s3]), this), h2 && h2(t3, e4, s2);
    }, onComplete: (t3, e4, s2) => {
      this.setCoords(), c2 && c2(t3, e4, s2);
    } });
    return n2 ? qs(l2) : Us(l2);
  }
  isDescendantOf(t2) {
    const { parent: e3, group: s2 } = this;
    return e3 === t2 || s2 === t2 || !!e3 && e3.isDescendantOf(t2) || !!s2 && s2 !== e3 && s2.isDescendantOf(t2);
  }
  getAncestors() {
    const t2 = [];
    let e3 = this;
    do {
      e3 = e3.parent, e3 && t2.push(e3);
    } while (e3);
    return t2;
  }
  findCommonAncestors(t2) {
    if (this === t2)
      return { fork: [], otherFork: [], common: [this, ...this.getAncestors()] };
    const e3 = this.getAncestors(), s2 = t2.getAncestors();
    if (e3.length === 0 && s2.length > 0 && this === s2[s2.length - 1])
      return { fork: [], otherFork: [t2, ...s2.slice(0, s2.length - 1)], common: [this] };
    for (let i2, r2 = 0;r2 < e3.length; r2++) {
      if (i2 = e3[r2], i2 === t2)
        return { fork: [this, ...e3.slice(0, r2)], otherFork: [], common: e3.slice(r2) };
      for (let n2 = 0;n2 < s2.length; n2++) {
        if (this === s2[n2])
          return { fork: [], otherFork: [t2, ...s2.slice(0, n2)], common: [this, ...e3] };
        if (i2 === s2[n2])
          return { fork: [this, ...e3.slice(0, r2)], otherFork: [t2, ...s2.slice(0, n2)], common: e3.slice(r2) };
      }
    }
    return { fork: [this, ...e3], otherFork: [t2, ...s2], common: [] };
  }
  hasCommonAncestors(t2) {
    const e3 = this.findCommonAncestors(t2);
    return e3 && !!e3.common.length;
  }
  isInFrontOf(t2) {
    if (this === t2)
      return;
    const e3 = this.findCommonAncestors(t2);
    if (e3.fork.includes(t2))
      return true;
    if (e3.otherFork.includes(this))
      return false;
    const s2 = e3.common[0] || this.canvas;
    if (!s2)
      return;
    const i2 = e3.fork.pop(), r2 = e3.otherFork.pop(), n2 = s2._objects.indexOf(i2), o2 = s2._objects.indexOf(r2);
    return n2 > -1 && n2 > o2;
  }
  toObject() {
    const t2 = (arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []).concat(e2.customProperties, this.constructor.customProperties || []);
    let i2;
    const r2 = o.NUM_FRACTION_DIGITS, { clipPath: n2, fill: a2, stroke: h2, shadow: c2, strokeDashArray: l2, left: u2, top: d2, originX: g2, originY: f, width: p2, height: m2, strokeWidth: v2, strokeLineCap: y2, strokeDashOffset: _2, strokeLineJoin: C2, strokeUniform: b2, strokeMiterLimit: S2, scaleX: w2, scaleY: T2, angle: O2, flipX: k2, flipY: D2, opacity: M2, visible: P2, backgroundColor: E2, fillRule: A2, paintFirst: j2, globalCompositeOperation: F2, skewX: L2, skewY: R2 } = this;
    n2 && !n2.excludeFromExport && (i2 = n2.toObject(t2.concat("inverted", "absolutePositioned")));
    const I2 = (t3) => Vt(t3, r2), B2 = s(s({}, Yt(this, t2)), {}, { type: this.constructor.type, version: x, originX: g2, originY: f, left: I2(u2), top: I2(d2), width: I2(p2), height: I2(m2), fill: Ht(a2) ? a2.toObject() : a2, stroke: Ht(h2) ? h2.toObject() : h2, strokeWidth: I2(v2), strokeDashArray: l2 ? l2.concat() : l2, strokeLineCap: y2, strokeDashOffset: _2, strokeLineJoin: C2, strokeUniform: b2, strokeMiterLimit: I2(S2), scaleX: I2(w2), scaleY: I2(T2), angle: I2(O2), flipX: k2, flipY: D2, opacity: I2(M2), shadow: c2 ? c2.toObject() : c2, visible: P2, backgroundColor: E2, fillRule: A2, paintFirst: j2, globalCompositeOperation: F2, skewX: I2(L2), skewY: I2(R2) }, i2 ? { clipPath: i2 } : null);
    return this.includeDefaultValues ? B2 : this._removeDefaultValues(B2);
  }
  toDatalessObject(t2) {
    return this.toObject(t2);
  }
  _removeDefaultValues(t2) {
    const e3 = this.constructor.getDefaults(), s2 = Object.keys(e3).length > 0 ? e3 : Object.getPrototypeOf(this);
    return Wt(t2, (t3, e4) => {
      if (e4 === M || e4 === P || e4 === "type")
        return true;
      const i2 = s2[e4];
      return t3 !== i2 && !(Array.isArray(t3) && Array.isArray(i2) && t3.length === 0 && i2.length === 0);
    });
  }
  toString() {
    return "#<".concat(this.constructor.type, ">");
  }
  static _fromObject(t2) {
    let e3 = i(t2, Qs), s2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}, { extraParam: r2 } = s2, n2 = i(s2, Zs);
    return Xt(e3, n2).then((t3) => r2 ? (delete t3[r2], new this(e3[r2], t3)) : new this(t3));
  }
  static fromObject(t2, e3) {
    return this._fromObject(t2, e3);
  }
};
t($s, "stateProperties", Ds), t($s, "cacheProperties", Ms), t($s, "ownDefaults", Ps), t($s, "type", "FabricObject"), t($s, "colorProperties", [K, J, "backgroundColor"]), t($s, "customProperties", []), tt.setClass($s), tt.setClass($s, "object");
var ti = (t2, e3, i2) => (r2, n2, o2, a2) => {
  const h2 = e3(r2, n2, o2, a2);
  return h2 && ye(t2, s(s({}, Te(r2, n2, o2, a2)), i2)), h2;
};
function ei(t2) {
  return (e3, s2, i2, r2) => {
    const { target: n2, originX: o2, originY: a2 } = s2, h2 = n2.getRelativeCenterPoint(), c2 = n2.translateToOriginPoint(h2, o2, a2), l2 = t2(e3, s2, i2, r2);
    return n2.setPositionByOrigin(c2, s2.originX, s2.originY), l2;
  };
}
var si = ti(Y, ei((t2, e3, s2, i2) => {
  const r2 = ke(e3, e3.originX, e3.originY, s2, i2);
  if (xe(e3.originX) === xe(D) || xe(e3.originX) === xe(A) && r2.x < 0 || xe(e3.originX) === xe(M) && r2.x > 0) {
    const { target: t3 } = e3, s3 = t3.strokeWidth / (t3.strokeUniform ? t3.scaleX : 1), i3 = be(e3) ? 2 : 1, n2 = t3.width, o2 = Math.abs(r2.x * i3 / t3.scaleX) - s3;
    return t3.set("width", Math.max(o2, 1)), n2 !== t3.width;
  }
  return false;
}));
function ii(t2, e3, s2, i2, r2) {
  i2 = i2 || {};
  const n2 = this.sizeX || i2.cornerSize || r2.cornerSize, o2 = this.sizeY || i2.cornerSize || r2.cornerSize, a2 = i2.transparentCorners !== undefined ? i2.transparentCorners : r2.transparentCorners, h2 = a2 ? J : K, c2 = !a2 && (i2.cornerStrokeColor || r2.cornerStrokeColor);
  let l2, u2 = e3, d2 = s2;
  t2.save(), t2.fillStyle = i2.cornerColor || r2.cornerColor || "", t2.strokeStyle = i2.cornerStrokeColor || r2.cornerStrokeColor || "", n2 > o2 ? (l2 = n2, t2.scale(1, o2 / n2), d2 = s2 * n2 / o2) : o2 > n2 ? (l2 = o2, t2.scale(n2 / o2, 1), u2 = e3 * o2 / n2) : l2 = n2, t2.beginPath(), t2.arc(u2, d2, l2 / 2, 0, S, false), t2[h2](), c2 && t2.stroke(), t2.restore();
}
function ri(t2, e3, s2, i2, r2) {
  i2 = i2 || {};
  const n2 = this.sizeX || i2.cornerSize || r2.cornerSize, o2 = this.sizeY || i2.cornerSize || r2.cornerSize, a2 = i2.transparentCorners !== undefined ? i2.transparentCorners : r2.transparentCorners, h2 = a2 ? J : K, c2 = !a2 && (i2.cornerStrokeColor || r2.cornerStrokeColor), l2 = n2 / 2, u2 = o2 / 2;
  t2.save(), t2.fillStyle = i2.cornerColor || r2.cornerColor || "", t2.strokeStyle = i2.cornerStrokeColor || r2.cornerStrokeColor || "", t2.translate(e3, s2);
  const d2 = r2.getTotalAngle();
  t2.rotate(xt(d2)), t2["".concat(h2, "Rect")](-l2, -u2, n2, o2), c2 && t2.strokeRect(-l2, -u2, n2, o2), t2.restore();
}

class ni {
  constructor(e3) {
    t(this, "visible", true), t(this, "actionName", G), t(this, "angle", 0), t(this, "x", 0), t(this, "y", 0), t(this, "offsetX", 0), t(this, "offsetY", 0), t(this, "sizeX", 0), t(this, "sizeY", 0), t(this, "touchSizeX", 0), t(this, "touchSizeY", 0), t(this, "cursorStyle", "crosshair"), t(this, "withConnection", false), Object.assign(this, e3);
  }
  shouldActivate(t2, e3, s2, i2) {
    var r2;
    let { tl: n2, tr: o2, br: a2, bl: h2 } = i2;
    return ((r2 = e3.canvas) === null || r2 === undefined ? undefined : r2.getActiveObject()) === e3 && e3.isControlVisible(t2) && Ks.isPointInPolygon(s2, [n2, o2, a2, h2]);
  }
  getActionHandler(t2, e3, s2) {
    return this.actionHandler;
  }
  getMouseDownHandler(t2, e3, s2) {
    return this.mouseDownHandler;
  }
  getMouseUpHandler(t2, e3, s2) {
    return this.mouseUpHandler;
  }
  cursorStyleHandler(t2, e3, s2) {
    return e3.cursorStyle;
  }
  getActionName(t2, e3, s2) {
    return e3.actionName;
  }
  getVisibility(t2, e3) {
    var s2, i2;
    return (s2 = (i2 = t2._controlsVisibility) === null || i2 === undefined ? undefined : i2[e3]) !== null && s2 !== undefined ? s2 : this.visible;
  }
  setVisibility(t2, e3, s2) {
    this.visible = t2;
  }
  positionHandler(t2, e3, s2, i2) {
    return new ot(this.x * t2.x + this.offsetX, this.y * t2.y + this.offsetY).transform(e3);
  }
  calcCornerCoords(t2, e3, s2, i2, r2, n2) {
    const o2 = Ot([Mt(s2, i2), Pt({ angle: t2 }), Et((r2 ? this.touchSizeX : this.sizeX) || e3, (r2 ? this.touchSizeY : this.sizeY) || e3)]);
    return { tl: new ot(-0.5, -0.5).transform(o2), tr: new ot(0.5, -0.5).transform(o2), br: new ot(0.5, 0.5).transform(o2), bl: new ot(-0.5, 0.5).transform(o2) };
  }
  render(t2, e3, s2, i2, r2) {
    if (((i2 = i2 || {}).cornerStyle || r2.cornerStyle) === "circle")
      ii.call(this, t2, e3, s2, i2, r2);
    else
      ri.call(this, t2, e3, s2, i2, r2);
  }
}
var oi = (t2, e3, s2) => s2.lockRotation ? Ce : e3.cursorStyle;
var ai = ti(I, ei((t2, e3, s2, i2) => {
  let { target: r2, ex: n2, ey: o2, theta: a2, originX: h2, originY: c2 } = e3;
  const l2 = r2.translateToOriginPoint(r2.getRelativeCenterPoint(), h2, c2);
  if (we(r2, "lockRotation"))
    return false;
  const u2 = Math.atan2(o2 - l2.y, n2 - l2.x), d2 = Math.atan2(i2 - l2.y, s2 - l2.x);
  let g2 = Ct(d2 - u2 + a2);
  if (r2.snapAngle && r2.snapAngle > 0) {
    const t3 = r2.snapAngle, e4 = r2.snapThreshold || t3, s3 = Math.ceil(g2 / t3) * t3, i3 = Math.floor(g2 / t3) * t3;
    Math.abs(g2 - i3) < e4 ? g2 = i3 : Math.abs(g2 - s3) < e4 && (g2 = s3);
  }
  g2 < 0 && (g2 = 360 + g2), g2 %= 360;
  const f = r2.angle !== g2;
  return r2.angle = g2, f;
}));
function hi(t2, e3) {
  const s2 = e3.canvas, i2 = t2[s2.uniScaleKey];
  return s2.uniformScaling && !i2 || !s2.uniformScaling && i2;
}
function ci(t2, e3, s2) {
  const i2 = we(t2, "lockScalingX"), r2 = we(t2, "lockScalingY");
  if (i2 && r2)
    return true;
  if (!e3 && (i2 || r2) && s2)
    return true;
  if (i2 && e3 === "x")
    return true;
  if (r2 && e3 === "y")
    return true;
  const { width: n2, height: o2, strokeWidth: a2 } = t2;
  return n2 === 0 && a2 === 0 && e3 !== "y" || o2 === 0 && a2 === 0 && e3 !== "x";
}
var li = ["e", "se", "s", "sw", "w", "nw", "n", "ne", "e"];
var ui = (t2, e3, s2) => {
  const i2 = hi(t2, s2);
  if (ci(s2, e3.x !== 0 && e3.y === 0 ? "x" : e3.x === 0 && e3.y !== 0 ? "y" : "", i2))
    return Ce;
  const r2 = Oe(s2, e3);
  return "".concat(li[r2], "-resize");
};
function di(t2, e3, s2, i2) {
  let r2 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  const n2 = e3.target, o2 = r2.by, a2 = hi(t2, n2);
  let h2, c2, l2, u2, d2, g2;
  if (ci(n2, o2, a2))
    return false;
  if (e3.gestureScale)
    c2 = e3.scaleX * e3.gestureScale, l2 = e3.scaleY * e3.gestureScale;
  else {
    if (h2 = ke(e3, e3.originX, e3.originY, s2, i2), d2 = o2 !== "y" ? Math.sign(h2.x || e3.signX || 1) : 1, g2 = o2 !== "x" ? Math.sign(h2.y || e3.signY || 1) : 1, e3.signX || (e3.signX = d2), e3.signY || (e3.signY = g2), we(n2, "lockScalingFlip") && (e3.signX !== d2 || e3.signY !== g2))
      return false;
    if (u2 = n2._getTransformedDimensions(), a2 && !o2) {
      const t3 = Math.abs(h2.x) + Math.abs(h2.y), { original: s3 } = e3, i3 = t3 / (Math.abs(u2.x * s3.scaleX / n2.scaleX) + Math.abs(u2.y * s3.scaleY / n2.scaleY));
      c2 = s3.scaleX * i3, l2 = s3.scaleY * i3;
    } else
      c2 = Math.abs(h2.x * n2.scaleX / u2.x), l2 = Math.abs(h2.y * n2.scaleY / u2.y);
    be(e3) && (c2 *= 2, l2 *= 2), e3.signX !== d2 && o2 !== "y" && (e3.originX = Se(e3.originX), c2 *= -1, e3.signX = d2), e3.signY !== g2 && o2 !== "x" && (e3.originY = Se(e3.originY), l2 *= -1, e3.signY = g2);
  }
  const { scaleX: f, scaleY: p2 } = n2;
  return o2 ? (o2 === "x" && n2.set(H, c2), o2 === "y" && n2.set(N, l2)) : (!we(n2, "lockScalingX") && n2.set(H, c2), !we(n2, "lockScalingY") && n2.set(N, l2)), f !== n2.scaleX || p2 !== n2.scaleY;
}
var gi = ti(R, ei((t2, e3, s2, i2) => di(t2, e3, s2, i2)));
var fi = ti(R, ei((t2, e3, s2, i2) => di(t2, e3, s2, i2, { by: "x" })));
var pi = ti(R, ei((t2, e3, s2, i2) => di(t2, e3, s2, i2, { by: "y" })));
var mi = ["target", "ex", "ey", "skewingSide"];
var vi = { x: { counterAxis: "y", scale: H, skew: U, lockSkewing: "lockSkewingX", origin: "originX", flip: "flipX" }, y: { counterAxis: "x", scale: N, skew: q, lockSkewing: "lockSkewingY", origin: "originY", flip: "flipY" } };
var yi = ["ns", "nesw", "ew", "nwse"];
var _i = (t2, e3, s2) => {
  if (e3.x !== 0 && we(s2, "lockSkewingY"))
    return Ce;
  if (e3.y !== 0 && we(s2, "lockSkewingX"))
    return Ce;
  const i2 = Oe(s2, e3) % 4;
  return "".concat(yi[i2], "-resize");
};
function xi(t2, e3, r2, n2, o2) {
  const { target: a2 } = r2, { counterAxis: h2, origin: c2, lockSkewing: l2, skew: u2, flip: d2 } = vi[t2];
  if (we(a2, l2))
    return false;
  const { origin: g2, flip: f } = vi[h2], p2 = xe(r2[g2]) * (a2[f] ? -1 : 1), m2 = -Math.sign(p2) * (a2[d2] ? -1 : 1), v2 = 0.5 * -((a2[u2] === 0 && ke(r2, D, D, n2, o2)[t2] > 0 || a2[u2] > 0 ? 1 : -1) * m2) + 0.5, y2 = ti(X, ei((e4, s2, r3, n3) => function(t3, e5, s3) {
    let { target: r4, ex: n4, ey: o3, skewingSide: a3 } = e5, h3 = i(e5, mi);
    const { skew: c3 } = vi[t3], l3 = s3.subtract(new ot(n4, o3)).divide(new ot(r4.scaleX, r4.scaleY))[t3], u3 = r4[c3], d3 = h3[c3], g3 = Math.tan(xt(d3)), f2 = t3 === "y" ? r4._getTransformedDimensions({ scaleX: 1, scaleY: 1, skewX: 0 }).x : r4._getTransformedDimensions({ scaleX: 1, scaleY: 1 }).y, p3 = 2 * l3 * a3 / Math.max(f2, 1) + g3, m3 = Ct(Math.atan(p3));
    r4.set(c3, m3);
    const v3 = u3 !== r4[c3];
    if (v3 && t3 === "y") {
      const { skewX: t4, scaleX: e6 } = r4, s4 = r4._getTransformedDimensions({ skewY: u3 }), i2 = r4._getTransformedDimensions(), n5 = t4 !== 0 ? s4.x / i2.x : 1;
      n5 !== 1 && r4.set(H, n5 * e6);
    }
    return v3;
  }(t2, s2, new ot(r3, n3))));
  return y2(e3, s(s({}, r2), {}, { [c2]: v2, skewingSide: m2 }), n2, o2);
}
var Ci = (t2, e3, s2, i2) => xi("x", t2, e3, s2, i2);
var bi = (t2, e3, s2, i2) => xi("y", t2, e3, s2, i2);
function Si(t2, e3) {
  return t2[e3.canvas.altActionKey];
}
var wi = (t2, e3, s2) => {
  const i2 = Si(t2, s2);
  return e3.x === 0 ? i2 ? U : N : e3.y === 0 ? i2 ? q : H : "";
};
var Ti = (t2, e3, s2) => Si(t2, s2) ? _i(0, e3, s2) : ui(t2, e3, s2);
var Oi = (t2, e3, s2, i2) => Si(t2, e3.target) ? bi(t2, e3, s2, i2) : fi(t2, e3, s2, i2);
var ki = (t2, e3, s2, i2) => Si(t2, e3.target) ? Ci(t2, e3, s2, i2) : pi(t2, e3, s2, i2);
var Di = () => ({ ml: new ni({ x: -0.5, y: 0, cursorStyleHandler: Ti, actionHandler: Oi, getActionName: wi }), mr: new ni({ x: 0.5, y: 0, cursorStyleHandler: Ti, actionHandler: Oi, getActionName: wi }), mb: new ni({ x: 0, y: 0.5, cursorStyleHandler: Ti, actionHandler: ki, getActionName: wi }), mt: new ni({ x: 0, y: -0.5, cursorStyleHandler: Ti, actionHandler: ki, getActionName: wi }), tl: new ni({ x: -0.5, y: -0.5, cursorStyleHandler: ui, actionHandler: gi }), tr: new ni({ x: 0.5, y: -0.5, cursorStyleHandler: ui, actionHandler: gi }), bl: new ni({ x: -0.5, y: 0.5, cursorStyleHandler: ui, actionHandler: gi }), br: new ni({ x: 0.5, y: 0.5, cursorStyleHandler: ui, actionHandler: gi }), mtr: new ni({ x: 0, y: -0.5, actionHandler: ai, cursorStyleHandler: oi, offsetY: -40, withConnection: true, actionName: B }) });
var Mi = () => ({ mr: new ni({ x: 0.5, y: 0, actionHandler: si, cursorStyleHandler: Ti, actionName: Y }), ml: new ni({ x: -0.5, y: 0, actionHandler: si, cursorStyleHandler: Ti, actionName: Y }) });
var Pi = () => s(s({}, Di()), Mi());

class Ei extends $s {
  static getDefaults() {
    return s(s({}, super.getDefaults()), Ei.ownDefaults);
  }
  constructor(t2) {
    super(), Object.assign(this, this.constructor.createControls(), Ei.ownDefaults), this.setOptions(t2);
  }
  static createControls() {
    return { controls: Di() };
  }
  _updateCacheCanvas() {
    const t2 = this.canvas;
    if (this.noScaleCache && t2 && t2._currentTransform) {
      const e3 = t2._currentTransform, s2 = e3.target, i2 = e3.action;
      if (this === s2 && i2 && i2.startsWith(G))
        return false;
    }
    return super._updateCacheCanvas();
  }
  getActiveControl() {
    const t2 = this.__corner;
    return t2 ? { key: t2, control: this.controls[t2], coord: this.oCoords[t2] } : undefined;
  }
  findControl(t2) {
    let e3 = arguments.length > 1 && arguments[1] !== undefined && arguments[1];
    if (!this.hasControls || !this.canvas)
      return;
    this.__corner = undefined;
    const s2 = Object.entries(this.oCoords);
    for (let i2 = s2.length - 1;i2 >= 0; i2--) {
      const [r2, n2] = s2[i2], o2 = this.controls[r2];
      if (o2.shouldActivate(r2, this, t2, e3 ? n2.touchCorner : n2.corner))
        return this.__corner = r2, { key: r2, control: o2, coord: this.oCoords[r2] };
    }
  }
  calcOCoords() {
    const t2 = this.getViewportTransform(), e3 = this.getCenterPoint(), s2 = Mt(e3.x, e3.y), i2 = Pt({ angle: this.getTotalAngle() - (this.group && this.flipX ? 180 : 0) }), r2 = Tt(s2, i2), n2 = Tt(t2, r2), o2 = Tt(n2, [1 / t2[0], 0, 0, 1 / t2[3], 0, 0]), a2 = this.group ? Dt(this.calcTransformMatrix()) : undefined;
    a2 && (a2.scaleX = Math.abs(a2.scaleX), a2.scaleY = Math.abs(a2.scaleY));
    const h2 = this._calculateCurrentDimensions(a2), c2 = {};
    return this.forEachControl((t3, e4) => {
      const s3 = t3.positionHandler(h2, o2, this, t3);
      c2[e4] = Object.assign(s3, this._calcCornerCoords(t3, s3));
    }), c2;
  }
  _calcCornerCoords(t2, e3) {
    const s2 = this.getTotalAngle();
    return { corner: t2.calcCornerCoords(s2, this.cornerSize, e3.x, e3.y, false, this), touchCorner: t2.calcCornerCoords(s2, this.touchCornerSize, e3.x, e3.y, true, this) };
  }
  setCoords() {
    super.setCoords(), this.canvas && (this.oCoords = this.calcOCoords());
  }
  forEachControl(t2) {
    for (const e3 in this.controls)
      t2(this.controls[e3], e3, this);
  }
  drawSelectionBackground(t2) {
    if (!this.selectionBackgroundColor || this.canvas && this.canvas._activeObject !== this)
      return;
    t2.save();
    const e3 = this.getRelativeCenterPoint(), s2 = this._calculateCurrentDimensions(), i2 = this.getViewportTransform();
    t2.translate(e3.x, e3.y), t2.scale(1 / i2[0], 1 / i2[3]), t2.rotate(xt(this.angle)), t2.fillStyle = this.selectionBackgroundColor, t2.fillRect(-s2.x / 2, -s2.y / 2, s2.x, s2.y), t2.restore();
  }
  strokeBorders(t2, e3) {
    t2.strokeRect(-e3.x / 2, -e3.y / 2, e3.x, e3.y);
  }
  _drawBorders(t2, e3) {
    let i2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const r2 = s({ hasControls: this.hasControls, borderColor: this.borderColor, borderDashArray: this.borderDashArray }, i2);
    t2.save(), t2.strokeStyle = r2.borderColor, this._setLineDash(t2, r2.borderDashArray), this.strokeBorders(t2, e3), r2.hasControls && this.drawControlsConnectingLines(t2, e3), t2.restore();
  }
  _renderControls(t2) {
    let e3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const { hasBorders: i2, hasControls: r2 } = this, n2 = s({ hasBorders: i2, hasControls: r2 }, e3), o2 = this.getViewportTransform(), a2 = n2.hasBorders, h2 = n2.hasControls, c2 = Tt(o2, this.calcTransformMatrix()), l2 = Dt(c2);
    t2.save(), t2.translate(l2.translateX, l2.translateY), t2.lineWidth = this.borderScaleFactor, this.group === this.parent && (t2.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1), this.flipX && (l2.angle -= 180), t2.rotate(xt(this.group ? l2.angle : this.angle)), a2 && this.drawBorders(t2, l2, e3), h2 && this.drawControls(t2, e3), t2.restore();
  }
  drawBorders(t2, e3, s2) {
    let i2;
    if (s2 && s2.forActiveSelection || this.group) {
      const t3 = ge(this.width, this.height, Lt(e3)), s3 = this.isStrokeAccountedForInDimensions() ? at : (this.strokeUniform ? new ot().scalarAdd(this.canvas ? this.canvas.getZoom() : 1) : new ot(e3.scaleX, e3.scaleY)).scalarMultiply(this.strokeWidth);
      i2 = t3.add(s3).scalarAdd(this.borderScaleFactor).scalarAdd(2 * this.padding);
    } else
      i2 = this._calculateCurrentDimensions().scalarAdd(this.borderScaleFactor);
    this._drawBorders(t2, i2, s2);
  }
  drawControlsConnectingLines(t2, e3) {
    let s2 = false;
    t2.beginPath(), this.forEachControl((i2, r2) => {
      i2.withConnection && i2.getVisibility(this, r2) && (s2 = true, t2.moveTo(i2.x * e3.x, i2.y * e3.y), t2.lineTo(i2.x * e3.x + i2.offsetX, i2.y * e3.y + i2.offsetY));
    }), s2 && t2.stroke();
  }
  drawControls(t2) {
    let e3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    t2.save();
    const i2 = this.getCanvasRetinaScaling(), { cornerStrokeColor: r2, cornerDashArray: n2, cornerColor: o2 } = this, a2 = s({ cornerStrokeColor: r2, cornerDashArray: n2, cornerColor: o2 }, e3);
    t2.setTransform(i2, 0, 0, i2, 0, 0), t2.strokeStyle = t2.fillStyle = a2.cornerColor, this.transparentCorners || (t2.strokeStyle = a2.cornerStrokeColor), this._setLineDash(t2, a2.cornerDashArray), this.forEachControl((e4, s2) => {
      if (e4.getVisibility(this, s2)) {
        const i3 = this.oCoords[s2];
        e4.render(t2, i3.x, i3.y, a2, this);
      }
    }), t2.restore();
  }
  isControlVisible(t2) {
    return this.controls[t2] && this.controls[t2].getVisibility(this, t2);
  }
  setControlVisible(t2, e3) {
    this._controlsVisibility || (this._controlsVisibility = {}), this._controlsVisibility[t2] = e3;
  }
  setControlsVisibility() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    Object.entries(t2).forEach((t3) => {
      let [e3, s2] = t3;
      return this.setControlVisible(e3, s2);
    });
  }
  clearContextTop(t2) {
    if (!this.canvas)
      return;
    const e3 = this.canvas.contextTop;
    if (!e3)
      return;
    const s2 = this.canvas.viewportTransform;
    e3.save(), e3.transform(s2[0], s2[1], s2[2], s2[3], s2[4], s2[5]), this.transform(e3);
    const i2 = this.width + 4, r2 = this.height + 4;
    return e3.clearRect(-i2 / 2, -r2 / 2, i2, r2), t2 || e3.restore(), e3;
  }
  onDeselect(t2) {
    return false;
  }
  onSelect(t2) {
    return false;
  }
  shouldStartDragging(t2) {
    return false;
  }
  onDragStart(t2) {
    return false;
  }
  canDrop(t2) {
    return false;
  }
  renderDragSourceEffect(t2) {}
  renderDropTargetEffect(t2) {}
}
function Ai(t2, e3) {
  return e3.forEach((e4) => {
    Object.getOwnPropertyNames(e4.prototype).forEach((s2) => {
      s2 !== "constructor" && Object.defineProperty(t2.prototype, s2, Object.getOwnPropertyDescriptor(e4.prototype, s2) || Object.create(null));
    });
  }), t2;
}
t(Ei, "ownDefaults", { noScaleCache: true, lockMovementX: false, lockMovementY: false, lockRotation: false, lockScalingX: false, lockScalingY: false, lockSkewingX: false, lockSkewingY: false, lockScalingFlip: false, cornerSize: 13, touchCornerSize: 24, transparentCorners: true, cornerColor: "rgb(178,204,255)", cornerStrokeColor: "", cornerStyle: "rect", cornerDashArray: null, hasControls: true, borderColor: "rgb(178,204,255)", borderDashArray: null, borderOpacityWhenMoving: 0.4, borderScaleFactor: 1, hasBorders: true, selectionBackgroundColor: "", selectable: true, evented: true, perPixelTargetFind: false, activeOn: "down", hoverCursor: null, moveCursor: null });

class ji extends Ei {
}
Ai(ji, [Xe]), tt.setClass(ji), tt.setClass(ji, "object");
var Fi = (t2, e3, s2, i2) => {
  const r2 = 2 * (i2 = Math.round(i2)) + 1, { data: n2 } = t2.getImageData(e3 - i2, s2 - i2, r2, r2);
  for (let t3 = 3;t3 < n2.length; t3 += 4) {
    if (n2[t3] > 0)
      return false;
  }
  return true;
};

class Li {
  constructor(t2) {
    this.options = t2, this.strokeProjectionMagnitude = this.options.strokeWidth / 2, this.scale = new ot(this.options.scaleX, this.options.scaleY), this.strokeUniformScalar = this.options.strokeUniform ? new ot(1 / this.options.scaleX, 1 / this.options.scaleY) : new ot(1, 1);
  }
  createSideVector(t2, e3) {
    const s2 = ps(t2, e3);
    return this.options.strokeUniform ? s2.multiply(this.scale) : s2;
  }
  projectOrthogonally(t2, e3, s2) {
    return this.applySkew(t2.add(this.calcOrthogonalProjection(t2, e3, s2)));
  }
  isSkewed() {
    return this.options.skewX !== 0 || this.options.skewY !== 0;
  }
  applySkew(t2) {
    const e3 = new ot(t2);
    return e3.y += e3.x * Math.tan(xt(this.options.skewY)), e3.x += e3.y * Math.tan(xt(this.options.skewX)), e3;
  }
  scaleUnitVector(t2, e3) {
    return t2.multiply(this.strokeUniformScalar).scalarMultiply(e3);
  }
}
var Ri = new ot;

class Ii extends Li {
  static getOrthogonalRotationFactor(t2, e3) {
    const s2 = e3 ? vs(t2, e3) : ys(t2);
    return Math.abs(s2) < b ? -1 : 1;
  }
  constructor(e3, s2, i2, r2) {
    super(r2), t(this, "AB", undefined), t(this, "AC", undefined), t(this, "alpha", undefined), t(this, "bisector", undefined), this.A = new ot(e3), this.B = new ot(s2), this.C = new ot(i2), this.AB = this.createSideVector(this.A, this.B), this.AC = this.createSideVector(this.A, this.C), this.alpha = vs(this.AB, this.AC), this.bisector = _s(fs(this.AB.eq(Ri) ? this.AC : this.AB, this.alpha / 2));
  }
  calcOrthogonalProjection(t2, e3) {
    let s2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.strokeProjectionMagnitude;
    const i2 = this.createSideVector(t2, e3), r2 = xs(i2), n2 = Ii.getOrthogonalRotationFactor(r2, this.bisector);
    return this.scaleUnitVector(r2, s2 * n2);
  }
  projectBevel() {
    const t2 = [];
    return (this.alpha % S == 0 ? [this.B] : [this.B, this.C]).forEach((e3) => {
      t2.push(this.projectOrthogonally(this.A, e3)), t2.push(this.projectOrthogonally(this.A, e3, -this.strokeProjectionMagnitude));
    }), t2;
  }
  projectMiter() {
    const t2 = [], e3 = Math.abs(this.alpha), s2 = 1 / Math.sin(e3 / 2), i2 = this.scaleUnitVector(this.bisector, -this.strokeProjectionMagnitude * s2), r2 = this.options.strokeUniform ? ms(this.scaleUnitVector(this.bisector, this.options.strokeMiterLimit)) : this.options.strokeMiterLimit;
    return ms(i2) / this.strokeProjectionMagnitude <= r2 && t2.push(this.applySkew(this.A.add(i2))), t2.push(...this.projectBevel()), t2;
  }
  projectRoundNoSkew(t2, e3) {
    const s2 = [], i2 = new ot(Ii.getOrthogonalRotationFactor(this.bisector), Ii.getOrthogonalRotationFactor(new ot(this.bisector.y, this.bisector.x)));
    return [new ot(1, 0).scalarMultiply(this.strokeProjectionMagnitude).multiply(this.strokeUniformScalar).multiply(i2), new ot(0, 1).scalarMultiply(this.strokeProjectionMagnitude).multiply(this.strokeUniformScalar).multiply(i2)].forEach((i3) => {
      Ss(i3, t2, e3) && s2.push(this.A.add(i3));
    }), s2;
  }
  projectRoundWithSkew(t2, e3) {
    const s2 = [], { skewX: i2, skewY: r2, scaleX: n2, scaleY: o2, strokeUniform: a2 } = this.options, h2 = new ot(Math.tan(xt(i2)), Math.tan(xt(r2))), c2 = this.strokeProjectionMagnitude, l2 = a2 ? c2 / o2 / Math.sqrt(1 / o2 ** 2 + 1 / n2 ** 2 * h2.y ** 2) : c2 / Math.sqrt(1 + h2.y ** 2), u2 = new ot(Math.sqrt(Math.max(c2 ** 2 - l2 ** 2, 0)), l2), d2 = a2 ? c2 / Math.sqrt(1 + h2.x ** 2 * (1 / o2) ** 2 / (1 / n2 + 1 / n2 * h2.x * h2.y) ** 2) : c2 / Math.sqrt(1 + h2.x ** 2 / (1 + h2.x * h2.y) ** 2), g2 = new ot(d2, Math.sqrt(Math.max(c2 ** 2 - d2 ** 2, 0)));
    return [g2, g2.scalarMultiply(-1), u2, u2.scalarMultiply(-1)].map((t3) => this.applySkew(a2 ? t3.multiply(this.strokeUniformScalar) : t3)).forEach((i3) => {
      Ss(i3, t2, e3) && s2.push(this.applySkew(this.A).add(i3));
    }), s2;
  }
  projectRound() {
    const t2 = [];
    t2.push(...this.projectBevel());
    const e3 = this.alpha % S == 0, s2 = this.applySkew(this.A), i2 = t2[e3 ? 0 : 2].subtract(s2), r2 = t2[e3 ? 1 : 0].subtract(s2), n2 = e3 ? this.applySkew(this.AB.scalarMultiply(-1)) : this.applySkew(this.bisector.multiply(this.strokeUniformScalar).scalarMultiply(-1)), o2 = Cs(i2, n2) > 0, a2 = o2 ? i2 : r2, h2 = o2 ? r2 : i2;
    return this.isSkewed() ? t2.push(...this.projectRoundWithSkew(a2, h2)) : t2.push(...this.projectRoundNoSkew(a2, h2)), t2;
  }
  projectPoints() {
    switch (this.options.strokeLineJoin) {
      case "miter":
        return this.projectMiter();
      case "round":
        return this.projectRound();
      default:
        return this.projectBevel();
    }
  }
  project() {
    return this.projectPoints().map((t2) => ({ originPoint: this.A, projectedPoint: t2, angle: this.alpha, bisector: this.bisector }));
  }
}

class Bi extends Li {
  constructor(t2, e3, s2) {
    super(s2), this.A = new ot(t2), this.T = new ot(e3);
  }
  calcOrthogonalProjection(t2, e3) {
    let s2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.strokeProjectionMagnitude;
    const i2 = this.createSideVector(t2, e3);
    return this.scaleUnitVector(xs(i2), s2);
  }
  projectButt() {
    return [this.projectOrthogonally(this.A, this.T, this.strokeProjectionMagnitude), this.projectOrthogonally(this.A, this.T, -this.strokeProjectionMagnitude)];
  }
  projectRound() {
    const t2 = [];
    if (!this.isSkewed() && this.A.eq(this.T)) {
      const e3 = new ot(1, 1).scalarMultiply(this.strokeProjectionMagnitude).multiply(this.strokeUniformScalar);
      t2.push(this.applySkew(this.A.add(e3)), this.applySkew(this.A.subtract(e3)));
    } else
      t2.push(...new Ii(this.A, this.T, this.T, this.options).projectRound());
    return t2;
  }
  projectSquare() {
    const t2 = [];
    if (this.A.eq(this.T)) {
      const e3 = new ot(1, 1).scalarMultiply(this.strokeProjectionMagnitude).multiply(this.strokeUniformScalar);
      t2.push(this.A.add(e3), this.A.subtract(e3));
    } else {
      const e3 = this.calcOrthogonalProjection(this.A, this.T, this.strokeProjectionMagnitude), s2 = this.scaleUnitVector(_s(this.createSideVector(this.A, this.T)), -this.strokeProjectionMagnitude), i2 = this.A.add(s2);
      t2.push(i2.add(e3), i2.subtract(e3));
    }
    return t2.map((t3) => this.applySkew(t3));
  }
  projectPoints() {
    switch (this.options.strokeLineCap) {
      case "round":
        return this.projectRound();
      case "square":
        return this.projectSquare();
      default:
        return this.projectButt();
    }
  }
  project() {
    return this.projectPoints().map((t2) => ({ originPoint: this.A, projectedPoint: t2 }));
  }
}
var Xi = function(t2, e3) {
  let s2 = arguments.length > 2 && arguments[2] !== undefined && arguments[2];
  const i2 = [];
  if (t2.length === 0)
    return i2;
  const r2 = t2.reduce((t3, e4) => (t3[t3.length - 1].eq(e4) || t3.push(new ot(e4)), t3), [new ot(t2[0])]);
  if (r2.length === 1)
    s2 = true;
  else if (!s2) {
    const t3 = r2[0], e4 = ((t4, e5) => {
      for (let s3 = t4.length - 1;s3 >= 0; s3--)
        if (e5(t4[s3], s3, t4))
          return s3;
      return -1;
    })(r2, (e5) => !e5.eq(t3));
    r2.splice(e4 + 1);
  }
  return r2.forEach((t3, r3, n2) => {
    let o2, a2;
    r3 === 0 ? (a2 = n2[1], o2 = s2 ? t3 : n2[n2.length - 1]) : r3 === n2.length - 1 ? (o2 = n2[r3 - 1], a2 = s2 ? t3 : n2[0]) : (o2 = n2[r3 - 1], a2 = n2[r3 + 1]), s2 && n2.length === 1 ? i2.push(...new Bi(t3, t3, e3).project()) : !s2 || r3 !== 0 && r3 !== n2.length - 1 ? i2.push(...new Ii(t3, o2, a2, e3).project()) : i2.push(...new Bi(t3, r3 === 0 ? a2 : o2, e3).project());
  }), i2;
};
var Yi = (t2) => {
  const e3 = {};
  return Object.keys(t2).forEach((i2) => {
    e3[i2] = {}, Object.keys(t2[i2]).forEach((r2) => {
      e3[i2][r2] = s({}, t2[i2][r2]);
    });
  }), e3;
};
var Wi = (t2) => t2.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
var Vi;
var zi = (t2) => {
  if (Vi || Vi || (Vi = ("Intl" in v()) && ("Segmenter" in Intl) && new Intl.Segmenter(undefined, { granularity: "grapheme" })), Vi) {
    const e3 = Vi.segment(t2);
    return Array.from(e3).map((t3) => {
      let { segment: e4 } = t3;
      return e4;
    });
  }
  return Gi(t2);
};
var Gi = (t2) => {
  const e3 = [];
  for (let s2, i2 = 0;i2 < t2.length; i2++)
    (s2 = Hi(t2, i2)) !== false && e3.push(s2);
  return e3;
};
var Hi = (t2, e3) => {
  const s2 = t2.charCodeAt(e3);
  if (isNaN(s2))
    return "";
  if (s2 < 55296 || s2 > 57343)
    return t2.charAt(e3);
  if (55296 <= s2 && s2 <= 56319) {
    if (t2.length <= e3 + 1)
      throw "High surrogate without following low surrogate";
    const s3 = t2.charCodeAt(e3 + 1);
    if (56320 > s3 || s3 > 57343)
      throw "High surrogate without following low surrogate";
    return t2.charAt(e3) + t2.charAt(e3 + 1);
  }
  if (e3 === 0)
    throw "Low surrogate without preceding high surrogate";
  const i2 = t2.charCodeAt(e3 - 1);
  if (55296 > i2 || i2 > 56319)
    throw "Low surrogate without preceding high surrogate";
  return false;
};
var Ni = Object.freeze({ __proto__: null, capitalize: function(t2) {
  let e3 = arguments.length > 1 && arguments[1] !== undefined && arguments[1];
  return "".concat(t2.charAt(0).toUpperCase()).concat(e3 ? t2.slice(1) : t2.slice(1).toLowerCase());
}, escapeXml: Wi, graphemeSplit: zi });
var Ui = function(t2, e3) {
  let s2 = arguments.length > 2 && arguments[2] !== undefined && arguments[2];
  return t2.fill !== e3.fill || t2.stroke !== e3.stroke || t2.strokeWidth !== e3.strokeWidth || t2.fontSize !== e3.fontSize || t2.fontFamily !== e3.fontFamily || t2.fontWeight !== e3.fontWeight || t2.fontStyle !== e3.fontStyle || t2.textDecorationThickness !== e3.textDecorationThickness || t2.textBackgroundColor !== e3.textBackgroundColor || t2.deltaY !== e3.deltaY || s2 && (t2.overline !== e3.overline || t2.underline !== e3.underline || t2.linethrough !== e3.linethrough);
};
var qi = (t2, e3) => {
  const s2 = e3.split(`
`), i2 = [];
  let r2 = -1, n2 = {};
  t2 = Yi(t2);
  for (let e4 = 0;e4 < s2.length; e4++) {
    const o2 = zi(s2[e4]);
    if (t2[e4])
      for (let s3 = 0;s3 < o2.length; s3++) {
        r2++;
        const o3 = t2[e4][s3];
        o3 && Object.keys(o3).length > 0 && (Ui(n2, o3, true) ? i2.push({ start: r2, end: r2 + 1, style: o3 }) : i2[i2.length - 1].end++), n2 = o3 || {};
      }
    else
      r2 += o2.length, n2 = {};
  }
  return i2;
};
var Ki = (t2, e3) => {
  if (!Array.isArray(t2))
    return Yi(t2);
  const i2 = e3.split(F), r2 = {};
  let n2 = -1, o2 = 0;
  for (let e4 = 0;e4 < i2.length; e4++) {
    const a2 = zi(i2[e4]);
    for (let i3 = 0;i3 < a2.length; i3++)
      n2++, t2[o2] && t2[o2].start <= n2 && n2 < t2[o2].end && (r2[e4] = r2[e4] || {}, r2[e4][i3] = s({}, t2[o2].style), n2 === t2[o2].end - 1 && o2++);
  }
  return r2;
};
var Ji = ["display", "transform", K, "fill-opacity", "fill-rule", "opacity", J, "stroke-dasharray", "stroke-linecap", "stroke-dashoffset", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "id", "paint-order", "vector-effect", "instantiated_by_use", "clip-path"];
function Qi(t2, e3) {
  const s2 = t2.nodeName, i2 = t2.getAttribute("class"), r2 = t2.getAttribute("id"), n2 = "(?![a-zA-Z\\-]+)";
  let o2;
  if (o2 = new RegExp("^" + s2, "i"), e3 = e3.replace(o2, ""), r2 && e3.length && (o2 = new RegExp("#" + r2 + n2, "i"), e3 = e3.replace(o2, "")), i2 && e3.length) {
    const t3 = i2.split(" ");
    for (let s3 = t3.length;s3--; )
      o2 = new RegExp("\\." + t3[s3] + n2, "i"), e3 = e3.replace(o2, "");
  }
  return e3.length === 0;
}
function Zi(t2, e3) {
  let s2 = true;
  const i2 = Qi(t2, e3.pop());
  return i2 && e3.length && (s2 = function(t3, e4) {
    let s3, i3 = true;
    for (;t3.parentElement && t3.parentElement.nodeType === 1 && e4.length; )
      i3 && (s3 = e4.pop()), i3 = Qi(t3 = t3.parentElement, s3);
    return e4.length === 0;
  }(t2, e3)), i2 && s2 && e3.length === 0;
}
var $i = (t2) => {
  var e3;
  return (e3 = ns[t2]) !== null && e3 !== undefined ? e3 : t2;
};
var tr = new RegExp("(".concat(es, ")"), "gi");
var er = (t2) => t2.replace(tr, " $1 ").replace(/,/gi, " ").replace(/\s+/gi, " ");
var sr;
var ir;
var rr;
var nr;
var or;
var ar;
var hr;
var cr = "(".concat(es, ")");
var lr = String.raw(sr || (sr = r(["(skewX)(", ")"], ["(skewX)\\(", "\\)"])), cr);
var ur = String.raw(ir || (ir = r(["(skewY)(", ")"], ["(skewY)\\(", "\\)"])), cr);
var dr = String.raw(rr || (rr = r(["(rotate)(", "(?: ", " ", ")?)"], ["(rotate)\\(", "(?: ", " ", ")?\\)"])), cr, cr, cr);
var gr = String.raw(nr || (nr = r(["(scale)(", "(?: ", ")?)"], ["(scale)\\(", "(?: ", ")?\\)"])), cr, cr);
var fr = String.raw(or || (or = r(["(translate)(", "(?: ", ")?)"], ["(translate)\\(", "(?: ", ")?\\)"])), cr, cr);
var pr = String.raw(ar || (ar = r(["(matrix)(", " ", " ", " ", " ", " ", ")"], ["(matrix)\\(", " ", " ", " ", " ", " ", "\\)"])), cr, cr, cr, cr, cr, cr);
var mr = "(?:".concat(pr, "|").concat(fr, "|").concat(dr, "|").concat(gr, "|").concat(lr, "|").concat(ur, ")");
var vr = "(?:".concat(mr, "*)");
var yr = String.raw(hr || (hr = r(["^s*(?:", "?)s*$"], ["^\\s*(?:", "?)\\s*$"])), vr);
var _r = new RegExp(yr);
var xr = new RegExp(mr);
var Cr = new RegExp(mr, "g");
function br(t2) {
  const e3 = [];
  if (!(t2 = er(t2).replace(/\s*([()])\s*/gi, "$1")) || t2 && !_r.test(t2))
    return [...T];
  for (const s2 of t2.matchAll(Cr)) {
    const t3 = xr.exec(s2[0]);
    if (!t3)
      continue;
    let i2 = T;
    const r2 = t3.filter((t4) => !!t4), [, n2, ...o2] = r2, [a2, h2, c2, l2, u2, d2] = o2.map((t4) => parseFloat(t4));
    switch (n2) {
      case "translate":
        i2 = Mt(a2, h2);
        break;
      case B:
        i2 = Pt({ angle: a2 }, { x: h2, y: c2 });
        break;
      case G:
        i2 = Et(a2, h2);
        break;
      case U:
        i2 = jt(a2);
        break;
      case q:
        i2 = Ft(a2);
        break;
      case "matrix":
        i2 = [a2, h2, c2, l2, u2, d2];
    }
    e3.push(i2);
  }
  return Ot(e3);
}
function Sr(t2, e3, s2, i2) {
  const r2 = Array.isArray(e3);
  let n2, o2 = e3;
  if (t2 !== K && t2 !== J || e3 !== j) {
    if (t2 === "strokeUniform")
      return e3 === "non-scaling-stroke";
    if (t2 === "strokeDashArray")
      o2 = e3 === j ? null : e3.replace(/,/g, " ").split(/\s+/).map(parseFloat);
    else if (t2 === "transformMatrix")
      o2 = s2 && s2.transformMatrix ? Tt(s2.transformMatrix, br(e3)) : br(e3);
    else if (t2 === "visible")
      o2 = e3 !== j && e3 !== "hidden", s2 && s2.visible === false && (o2 = false);
    else if (t2 === "opacity")
      o2 = parseFloat(e3), s2 && s2.opacity !== undefined && (o2 *= s2.opacity);
    else if (t2 === "textAnchor")
      o2 = e3 === "start" ? M : e3 === "end" ? A : D;
    else if (t2 === "charSpacing" || t2 === We)
      n2 = Re(e3, i2) / i2 * 1000;
    else if (t2 === "paintFirst") {
      const t3 = e3.indexOf(K), s3 = e3.indexOf(J);
      o2 = K, (t3 > -1 && s3 > -1 && s3 < t3 || t3 === -1 && s3 > -1) && (o2 = J);
    } else {
      if (t2 === "href" || t2 === "xlink:href" || t2 === "font" || t2 === "id")
        return e3;
      if (t2 === "imageSmoothing")
        return e3 === "optimizeQuality";
      n2 = r2 ? e3.map(Re) : Re(e3, i2);
    }
  } else
    o2 = "";
  return !r2 && isNaN(n2) ? o2 : n2;
}
function wr(t2, e3) {
  const s2 = t2.match(rs);
  if (!s2)
    return;
  const i2 = s2[1], r2 = s2[3], n2 = s2[4], o2 = s2[5], a2 = s2[6];
  i2 && (e3.fontStyle = i2), r2 && (e3.fontWeight = isNaN(parseFloat(r2)) ? r2 : parseFloat(r2)), n2 && (e3.fontSize = Re(n2)), a2 && (e3.fontFamily = a2), o2 && (e3.lineHeight = o2 === "normal" ? 1 : o2);
}
function Tr(t2, e3) {
  t2.replace(/;\s*$/, "").split(";").forEach((t3) => {
    if (!t3)
      return;
    const [s2, i2] = t3.split(":");
    e3[s2.trim().toLowerCase()] = i2.trim();
  });
}
function Or(t2) {
  const e3 = {}, s2 = t2.getAttribute("style");
  return s2 ? (typeof s2 == "string" ? Tr(s2, e3) : function(t3, e4) {
    Object.entries(t3).forEach((t4) => {
      let [s3, i2] = t4;
      i2 !== undefined && (e4[s3.toLowerCase()] = i2);
    });
  }(s2, e3), e3) : e3;
}
var kr = { stroke: "strokeOpacity", fill: "fillOpacity" };
function Dr(t2, e3, i2) {
  if (!t2)
    return {};
  let r2, n2 = {}, o2 = O;
  t2.parentNode && ls.test(t2.parentNode.nodeName) && (n2 = Dr(t2.parentElement, e3, i2), n2.fontSize && (r2 = o2 = Re(n2.fontSize)));
  const a2 = s(s(s({}, e3.reduce((e4, s2) => {
    const i3 = t2.getAttribute(s2);
    return i3 && (e4[s2] = i3), e4;
  }, {})), function(t3) {
    let e4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}, i3 = {};
    for (const r3 in e4)
      Zi(t3, r3.split(" ")) && (i3 = s(s({}, i3), e4[r3]));
    return i3;
  }(t2, i2)), Or(t2));
  a2[as] && t2.setAttribute(as, a2[as]), a2[os] && (r2 = Re(a2[os], o2), a2[os] = "".concat(r2));
  const h2 = {};
  for (const t3 in a2) {
    const e4 = $i(t3), s2 = Sr(e4, a2[t3], n2, r2);
    h2[e4] = s2;
  }
  h2 && h2.font && wr(h2.font, h2);
  const c2 = s(s({}, n2), h2);
  return ls.test(t2.nodeName) ? c2 : function(t3) {
    const e4 = ji.getDefaults();
    return Object.entries(kr).forEach((s2) => {
      let [i3, r3] = s2;
      if (t3[r3] === undefined || t3[i3] === "")
        return;
      if (t3[i3] === undefined) {
        if (!e4[i3])
          return;
        t3[i3] = e4[i3];
      }
      if (t3[i3].indexOf("url(") === 0)
        return;
      const n3 = new Le(t3[i3]);
      t3[i3] = n3.setAlpha(Vt(n3.getAlpha() * t3[r3], 2)).toRgba();
    }), t3;
  }(c2);
}
var Mr = ["left", "top", "width", "height", "visible"];
var Pr = ["rx", "ry"];

class Er extends ji {
  static getDefaults() {
    return s(s({}, super.getDefaults()), Er.ownDefaults);
  }
  constructor(t2) {
    super(), Object.assign(this, Er.ownDefaults), this.setOptions(t2), this._initRxRy();
  }
  _initRxRy() {
    const { rx: t2, ry: e3 } = this;
    t2 && !e3 ? this.ry = t2 : e3 && !t2 && (this.rx = e3);
  }
  _render(t2) {
    const { width: e3, height: s2 } = this, i2 = -e3 / 2, r2 = -s2 / 2, n2 = this.rx ? Math.min(this.rx, e3 / 2) : 0, o2 = this.ry ? Math.min(this.ry, s2 / 2) : 0, a2 = n2 !== 0 || o2 !== 0;
    t2.beginPath(), t2.moveTo(i2 + n2, r2), t2.lineTo(i2 + e3 - n2, r2), a2 && t2.bezierCurveTo(i2 + e3 - k * n2, r2, i2 + e3, r2 + k * o2, i2 + e3, r2 + o2), t2.lineTo(i2 + e3, r2 + s2 - o2), a2 && t2.bezierCurveTo(i2 + e3, r2 + s2 - k * o2, i2 + e3 - k * n2, r2 + s2, i2 + e3 - n2, r2 + s2), t2.lineTo(i2 + n2, r2 + s2), a2 && t2.bezierCurveTo(i2 + k * n2, r2 + s2, i2, r2 + s2 - k * o2, i2, r2 + s2 - o2), t2.lineTo(i2, r2 + o2), a2 && t2.bezierCurveTo(i2, r2 + k * o2, i2 + k * n2, r2, i2 + n2, r2), t2.closePath(), this._renderPaintInOrder(t2);
  }
  toObject() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return super.toObject([...Pr, ...t2]);
  }
  _toSVG() {
    const { width: t2, height: e3, rx: s2, ry: i2 } = this;
    return ["<rect ", "COMMON_PARTS", 'x="'.concat(-t2 / 2, '" y="').concat(-e3 / 2, '" rx="').concat(s2, '" ry="').concat(i2, '" width="').concat(t2, '" height="').concat(e3, `" />
`)];
  }
  static async fromElement(t2, e3, r2) {
    const n2 = Dr(t2, this.ATTRIBUTE_NAMES, r2), { left: o2 = 0, top: a2 = 0, width: h2 = 0, height: c2 = 0, visible: l2 = true } = n2, u2 = i(n2, Mr);
    return new this(s(s(s({}, e3), u2), {}, { left: o2, top: a2, width: h2, height: c2, visible: Boolean(l2 && h2 && c2) }));
  }
}
t(Er, "type", "Rect"), t(Er, "cacheProperties", [...Ms, ...Pr]), t(Er, "ownDefaults", { rx: 0, ry: 0 }), t(Er, "ATTRIBUTE_NAMES", [...Ji, "x", "y", "rx", "ry", "width", "height"]), tt.setClass(Er), tt.setSVGClass(Er);
var Ar = "initialization";
var jr = "added";
var Fr = "removed";
var Lr = "imperative";
var Rr = (t2, e3) => {
  const { strokeUniform: s2, strokeWidth: i2, width: r2, height: n2, group: o2 } = e3, a2 = o2 && o2 !== t2 ? fe(o2.calcTransformMatrix(), t2.calcTransformMatrix()) : null, h2 = a2 ? e3.getRelativeCenterPoint().transform(a2) : e3.getRelativeCenterPoint(), c2 = !e3.isStrokeAccountedForInDimensions(), l2 = s2 && c2 ? me(new ot(i2, i2), undefined, t2.calcTransformMatrix()) : at, u2 = !s2 && c2 ? i2 : 0, d2 = ge(r2 + u2, n2 + u2, Ot([a2, e3.calcOwnMatrix()], true)).add(l2).scalarDivide(2);
  return [h2.subtract(d2), h2.add(d2)];
};

class Ir {
  calcLayoutResult(t2, e3) {
    if (this.shouldPerformLayout(t2))
      return this.calcBoundingBox(e3, t2);
  }
  shouldPerformLayout(t2) {
    let { type: e3, prevStrategy: s2, strategy: i2 } = t2;
    return e3 === Ar || e3 === Lr || !!s2 && i2 !== s2;
  }
  shouldLayoutClipPath(t2) {
    let { type: e3, target: { clipPath: s2 } } = t2;
    return e3 !== Ar && s2 && !s2.absolutePositioned;
  }
  getInitialSize(t2, e3) {
    return e3.size;
  }
  calcBoundingBox(t2, e3) {
    const { type: s2, target: i2 } = e3;
    if (s2 === Lr && e3.overrides)
      return e3.overrides;
    if (t2.length === 0)
      return;
    const { left: r2, top: n2, width: o2, height: a2 } = ae(t2.map((t3) => Rr(i2, t3)).reduce((t3, e4) => t3.concat(e4), [])), h2 = new ot(o2, a2), c2 = new ot(r2, n2).add(h2.scalarDivide(2));
    if (s2 === Ar) {
      const t3 = this.getInitialSize(e3, { size: h2, center: c2 });
      return { center: c2, relativeCorrection: new ot(0, 0), size: t3 };
    }
    return { center: c2.transform(i2.calcOwnMatrix()), size: h2 };
  }
}
t(Ir, "type", "strategy");

class Br extends Ir {
  shouldPerformLayout(t2) {
    return true;
  }
}
t(Br, "type", "fit-content"), tt.setClass(Br);
var Xr = ["strategy"];
var Yr = ["target", "strategy", "bubbles", "prevStrategy"];
var Wr = "layoutManager";

class Vr {
  constructor() {
    let e3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Br;
    t(this, "strategy", undefined), this.strategy = e3, this._subscriptions = new Map;
  }
  performLayout(t2) {
    const e3 = s(s({ bubbles: true, strategy: this.strategy }, t2), {}, { prevStrategy: this._prevLayoutStrategy, stopPropagation() {
      this.bubbles = false;
    } });
    this.onBeforeLayout(e3);
    const i2 = this.getLayoutResult(e3);
    i2 && this.commitLayout(e3, i2), this.onAfterLayout(e3, i2), this._prevLayoutStrategy = e3.strategy;
  }
  attachHandlers(t2, e3) {
    const { target: s2 } = e3;
    return [Q, L, Y, I, R, X, z, W, V].map((e4) => t2.on(e4, (t3) => this.performLayout(e4 === Q ? { type: "object_modified", trigger: e4, e: t3, target: s2 } : { type: "object_modifying", trigger: e4, e: t3, target: s2 })));
  }
  subscribe(t2, e3) {
    this.unsubscribe(t2, e3);
    const s2 = this.attachHandlers(t2, e3);
    this._subscriptions.set(t2, s2);
  }
  unsubscribe(t2, e3) {
    (this._subscriptions.get(t2) || []).forEach((t3) => t3()), this._subscriptions.delete(t2);
  }
  unsubscribeTargets(t2) {
    t2.targets.forEach((e3) => this.unsubscribe(e3, t2));
  }
  subscribeTargets(t2) {
    t2.targets.forEach((e3) => this.subscribe(e3, t2));
  }
  onBeforeLayout(t2) {
    const { target: e3, type: r2 } = t2, { canvas: n2 } = e3;
    if (r2 === Ar || r2 === jr ? this.subscribeTargets(t2) : r2 === Fr && this.unsubscribeTargets(t2), e3.fire("layout:before", { context: t2 }), n2 && n2.fire("object:layout:before", { target: e3, context: t2 }), r2 === Lr && t2.deep) {
      const r3 = i(t2, Xr);
      e3.forEachObject((t3) => t3.layoutManager && t3.layoutManager.performLayout(s(s({}, r3), {}, { bubbles: false, target: t3 })));
    }
  }
  getLayoutResult(t2) {
    const { target: e3, strategy: s2, type: i2 } = t2, r2 = s2.calcLayoutResult(t2, e3.getObjects());
    if (!r2)
      return;
    const n2 = i2 === Ar ? new ot : e3.getRelativeCenterPoint(), { center: o2, correction: a2 = new ot, relativeCorrection: h2 = new ot } = r2, c2 = n2.subtract(o2).add(a2).transform(i2 === Ar ? T : wt(e3.calcOwnMatrix()), true).add(h2);
    return { result: r2, prevCenter: n2, nextCenter: o2, offset: c2 };
  }
  commitLayout(t2, e3) {
    const { target: s2 } = t2, { result: { size: i2 }, nextCenter: r2 } = e3;
    var n2, o2;
    (s2.set({ width: i2.x, height: i2.y }), this.layoutObjects(t2, e3), t2.type === Ar) ? s2.set({ left: (n2 = t2.x) !== null && n2 !== undefined ? n2 : r2.x + i2.x * xe(s2.originX), top: (o2 = t2.y) !== null && o2 !== undefined ? o2 : r2.y + i2.y * xe(s2.originY) }) : (s2.setPositionByOrigin(r2, D, D), s2.setCoords(), s2.set("dirty", true));
  }
  layoutObjects(t2, e3) {
    const { target: s2 } = t2;
    s2.forEachObject((i2) => {
      i2.group === s2 && this.layoutObject(t2, e3, i2);
    }), t2.strategy.shouldLayoutClipPath(t2) && this.layoutObject(t2, e3, s2.clipPath);
  }
  layoutObject(t2, e3, s2) {
    let { offset: i2 } = e3;
    s2.set({ left: s2.left + i2.x, top: s2.top + i2.y });
  }
  onAfterLayout(t2, e3) {
    const { target: r2, strategy: n2, bubbles: o2, prevStrategy: a2 } = t2, h2 = i(t2, Yr), { canvas: c2 } = r2;
    r2.fire("layout:after", { context: t2, result: e3 }), c2 && c2.fire("object:layout:after", { context: t2, result: e3, target: r2 });
    const l2 = r2.parent;
    o2 && l2 != null && l2.layoutManager && ((h2.path || (h2.path = [])).push(r2), l2.layoutManager.performLayout(s(s({}, h2), {}, { target: l2 }))), r2.set("dirty", true);
  }
  dispose() {
    const { _subscriptions: t2 } = this;
    t2.forEach((t3) => t3.forEach((t4) => t4())), t2.clear();
  }
  toObject() {
    return { type: Wr, strategy: this.strategy.constructor.type };
  }
  toJSON() {
    return this.toObject();
  }
}
tt.setClass(Vr, Wr);
var zr = ["type", "objects", "layoutManager"];

class Gr extends Vr {
  performLayout() {}
}

class Hr extends ct(ji) {
  static getDefaults() {
    return s(s({}, super.getDefaults()), Hr.ownDefaults);
  }
  constructor() {
    let e3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [], s2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super(), t(this, "_activeObjects", []), t(this, "__objectSelectionTracker", undefined), t(this, "__objectSelectionDisposer", undefined), Object.assign(this, Hr.ownDefaults), this.setOptions(s2), this.groupInit(e3, s2);
  }
  groupInit(t2, e3) {
    var s2;
    this._objects = [...t2], this.__objectSelectionTracker = this.__objectSelectionMonitor.bind(this, true), this.__objectSelectionDisposer = this.__objectSelectionMonitor.bind(this, false), this.forEachObject((t3) => {
      this.enterGroup(t3, false);
    }), this.layoutManager = (s2 = e3.layoutManager) !== null && s2 !== undefined ? s2 : new Vr, this.layoutManager.performLayout({ type: Ar, target: this, targets: [...t2], x: e3.left, y: e3.top });
  }
  canEnterGroup(t2) {
    return t2 === this || this.isDescendantOf(t2) ? (a("error", "Group: circular object trees are not supported, this call has no effect"), false) : this._objects.indexOf(t2) === -1 || (a("error", "Group: duplicate objects are not supported inside group, this call has no effect"), false);
  }
  _filterObjectsBeforeEnteringGroup(t2) {
    return t2.filter((t3, e3, s2) => this.canEnterGroup(t3) && s2.indexOf(t3) === e3);
  }
  add() {
    for (var t2 = arguments.length, e3 = new Array(t2), s2 = 0;s2 < t2; s2++)
      e3[s2] = arguments[s2];
    const i2 = this._filterObjectsBeforeEnteringGroup(e3), r2 = super.add(...i2);
    return this._onAfterObjectsChange(jr, i2), r2;
  }
  insertAt(t2) {
    for (var e3 = arguments.length, s2 = new Array(e3 > 1 ? e3 - 1 : 0), i2 = 1;i2 < e3; i2++)
      s2[i2 - 1] = arguments[i2];
    const r2 = this._filterObjectsBeforeEnteringGroup(s2), n2 = super.insertAt(t2, ...r2);
    return this._onAfterObjectsChange(jr, r2), n2;
  }
  remove() {
    const t2 = super.remove(...arguments);
    return this._onAfterObjectsChange(Fr, t2), t2;
  }
  _onObjectAdded(t2) {
    this.enterGroup(t2, true), this.fire("object:added", { target: t2 }), t2.fire("added", { target: this });
  }
  _onObjectRemoved(t2, e3) {
    this.exitGroup(t2, e3), this.fire("object:removed", { target: t2 }), t2.fire("removed", { target: this });
  }
  _onAfterObjectsChange(t2, e3) {
    this.layoutManager.performLayout({ type: t2, targets: e3, target: this });
  }
  _onStackOrderChanged() {
    this._set("dirty", true);
  }
  _set(t2, e3) {
    const s2 = this[t2];
    return super._set(t2, e3), t2 === "canvas" && s2 !== e3 && (this._objects || []).forEach((s3) => {
      s3._set(t2, e3);
    }), this;
  }
  _shouldSetNestedCoords() {
    return this.subTargetCheck;
  }
  removeAll() {
    return this._activeObjects = [], this.remove(...this._objects);
  }
  __objectSelectionMonitor(t2, e3) {
    let { target: s2 } = e3;
    const i2 = this._activeObjects;
    if (t2)
      i2.push(s2), this._set("dirty", true);
    else if (i2.length > 0) {
      const t3 = i2.indexOf(s2);
      t3 > -1 && (i2.splice(t3, 1), this._set("dirty", true));
    }
  }
  _watchObject(t2, e3) {
    t2 && this._watchObject(false, e3), t2 ? (e3.on("selected", this.__objectSelectionTracker), e3.on("deselected", this.__objectSelectionDisposer)) : (e3.off("selected", this.__objectSelectionTracker), e3.off("deselected", this.__objectSelectionDisposer));
  }
  enterGroup(t2, e3) {
    t2.group && t2.group.remove(t2), t2._set("parent", this), this._enterGroup(t2, e3);
  }
  _enterGroup(t2, e3) {
    e3 && le(t2, Tt(wt(this.calcTransformMatrix()), t2.calcTransformMatrix())), this._shouldSetNestedCoords() && t2.setCoords(), t2._set("group", this), t2._set("canvas", this.canvas), this._watchObject(true, t2);
    const s2 = this.canvas && this.canvas.getActiveObject && this.canvas.getActiveObject();
    s2 && (s2 === t2 || t2.isDescendantOf(s2)) && this._activeObjects.push(t2);
  }
  exitGroup(t2, e3) {
    this._exitGroup(t2, e3), t2._set("parent", undefined), t2._set("canvas", undefined);
  }
  _exitGroup(t2, e3) {
    t2._set("group", undefined), e3 || (le(t2, Tt(this.calcTransformMatrix(), t2.calcTransformMatrix())), t2.setCoords()), this._watchObject(false, t2);
    const s2 = this._activeObjects.length > 0 ? this._activeObjects.indexOf(t2) : -1;
    s2 > -1 && this._activeObjects.splice(s2, 1);
  }
  shouldCache() {
    const t2 = ji.prototype.shouldCache.call(this);
    if (t2) {
      for (let t3 = 0;t3 < this._objects.length; t3++)
        if (this._objects[t3].willDrawShadow())
          return this.ownCaching = false, false;
    }
    return t2;
  }
  willDrawShadow() {
    if (super.willDrawShadow())
      return true;
    for (let t2 = 0;t2 < this._objects.length; t2++)
      if (this._objects[t2].willDrawShadow())
        return true;
    return false;
  }
  isOnACache() {
    return this.ownCaching || !!this.parent && this.parent.isOnACache();
  }
  drawObject(t2, e3, s2) {
    this._renderBackground(t2);
    for (let e4 = 0;e4 < this._objects.length; e4++) {
      var i2;
      const s3 = this._objects[e4];
      (i2 = this.canvas) !== null && i2 !== undefined && i2.preserveObjectStacking && s3.group !== this ? (t2.save(), t2.transform(...wt(this.calcTransformMatrix())), s3.render(t2), t2.restore()) : s3.group === this && s3.render(t2);
    }
    this._drawClipPath(t2, this.clipPath, s2);
  }
  setCoords() {
    super.setCoords(), this._shouldSetNestedCoords() && this.forEachObject((t2) => t2.setCoords());
  }
  triggerLayout() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.layoutManager.performLayout(s({ target: this, type: Lr }, t2));
  }
  render(t2) {
    this._transformDone = true, super.render(t2), this._transformDone = false;
  }
  __serializeObjects(t2, e3) {
    const s2 = this.includeDefaultValues;
    return this._objects.filter(function(t3) {
      return !t3.excludeFromExport;
    }).map(function(i2) {
      const r2 = i2.includeDefaultValues;
      i2.includeDefaultValues = s2;
      const n2 = i2[t2 || "toObject"](e3);
      return i2.includeDefaultValues = r2, n2;
    });
  }
  toObject() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    const e3 = this.layoutManager.toObject();
    return s(s(s({}, super.toObject(["subTargetCheck", "interactive", ...t2])), e3.strategy !== "fit-content" || this.includeDefaultValues ? { layoutManager: e3 } : {}), {}, { objects: this.__serializeObjects("toObject", t2) });
  }
  toString() {
    return "#<Group: (".concat(this.complexity(), ")>");
  }
  dispose() {
    this.layoutManager.unsubscribeTargets({ targets: this.getObjects(), target: this }), this._activeObjects = [], this.forEachObject((t2) => {
      this._watchObject(false, t2), t2.dispose();
    }), super.dispose();
  }
  _createSVGBgRect(t2) {
    if (!this.backgroundColor)
      return "";
    const e3 = Er.prototype._toSVG.call(this), s2 = e3.indexOf("COMMON_PARTS");
    e3[s2] = 'for="group" ';
    const i2 = e3.join("");
    return t2 ? t2(i2) : i2;
  }
  _toSVG(t2) {
    const e3 = ["<g ", "COMMON_PARTS", ` >
`], s2 = this._createSVGBgRect(t2);
    s2 && e3.push("\t\t", s2);
    for (let s3 = 0;s3 < this._objects.length; s3++)
      e3.push("\t\t", this._objects[s3].toSVG(t2));
    return e3.push(`</g>
`), e3;
  }
  getSvgStyles() {
    const t2 = this.opacity !== undefined && this.opacity !== 1 ? "opacity: ".concat(this.opacity, ";") : "", e3 = this.visible ? "" : " visibility: hidden;";
    return [t2, this.getSvgFilter(), e3].join("");
  }
  toClipPathSVG(t2) {
    const e3 = [], s2 = this._createSVGBgRect(t2);
    s2 && e3.push("\t", s2);
    for (let s3 = 0;s3 < this._objects.length; s3++)
      e3.push("\t", this._objects[s3].toClipPathSVG(t2));
    return this._createBaseClipPathSVGMarkup(e3, { reviver: t2 });
  }
  static fromObject(t2, e3) {
    let { type: r2, objects: n2 = [], layoutManager: o2 } = t2, a2 = i(t2, zr);
    return Promise.all([Bt(n2, e3), Xt(a2, e3)]).then((t3) => {
      let [e4, i2] = t3;
      const r3 = new this(e4, s(s(s({}, a2), i2), {}, { layoutManager: new Gr }));
      if (o2) {
        const t4 = tt.getClass(o2.type), e5 = tt.getClass(o2.strategy);
        r3.layoutManager = new t4(new e5);
      } else
        r3.layoutManager = new Vr;
      return r3.layoutManager.subscribeTargets({ type: Ar, target: r3, targets: r3.getObjects() }), r3.setCoords(), r3;
    });
  }
}
t(Hr, "type", "Group"), t(Hr, "ownDefaults", { strokeWidth: 0, subTargetCheck: false, interactive: false }), tt.setClass(Hr);
var Nr = (t2, e3) => Math.min(e3.width / t2.width, e3.height / t2.height);
var Ur = (t2, e3) => Math.max(e3.width / t2.width, e3.height / t2.height);
var qr = "\\s*,?\\s*";
var Kr = "".concat(qr, "(").concat(es, ")");
var Jr = "".concat(Kr).concat(Kr).concat(Kr).concat(qr, "([01])").concat(qr, "([01])").concat(Kr).concat(Kr);
var Qr = { m: "l", M: "L" };
var Zr = (t2, e3, s2, i2, r2, n2, o2, a2, h2, c2, l2) => {
  const u2 = rt(t2), d2 = nt(t2), g2 = rt(e3), f = nt(e3), p2 = s2 * r2 * g2 - i2 * n2 * f + o2, m2 = i2 * r2 * g2 + s2 * n2 * f + a2;
  return ["C", c2 + h2 * (-s2 * r2 * d2 - i2 * n2 * u2), l2 + h2 * (-i2 * r2 * d2 + s2 * n2 * u2), p2 + h2 * (s2 * r2 * f + i2 * n2 * g2), m2 + h2 * (i2 * r2 * f - s2 * n2 * g2), p2, m2];
};
var $r = (t2, e3, s2, i2) => {
  const r2 = Math.atan2(e3, t2), n2 = Math.atan2(i2, s2);
  return n2 >= r2 ? n2 - r2 : 2 * Math.PI - (r2 - n2);
};
function tn(t2, e3, s2, i2, r2, n2, a2, h2) {
  let c2;
  if (o.cachesBoundsOfCurve && (c2 = [...arguments].join(), _.boundsOfCurveCache[c2]))
    return _.boundsOfCurveCache[c2];
  const { sqrt: l2, abs: u2 } = Math, d2 = [], g2 = [[0, 0], [0, 0]];
  let f = 6 * t2 - 12 * s2 + 6 * r2, p2 = -3 * t2 + 9 * s2 - 9 * r2 + 3 * a2, m2 = 3 * s2 - 3 * t2;
  for (let t3 = 0;t3 < 2; ++t3) {
    if (t3 > 0 && (f = 6 * e3 - 12 * i2 + 6 * n2, p2 = -3 * e3 + 9 * i2 - 9 * n2 + 3 * h2, m2 = 3 * i2 - 3 * e3), u2(p2) < 0.000000000001) {
      if (u2(f) < 0.000000000001)
        continue;
      const t4 = -m2 / f;
      0 < t4 && t4 < 1 && d2.push(t4);
      continue;
    }
    const s3 = f * f - 4 * m2 * p2;
    if (s3 < 0)
      continue;
    const r3 = l2(s3), o2 = (-f + r3) / (2 * p2);
    0 < o2 && o2 < 1 && d2.push(o2);
    const a3 = (-f - r3) / (2 * p2);
    0 < a3 && a3 < 1 && d2.push(a3);
  }
  let v2 = d2.length;
  const y2 = v2, x2 = nn(t2, e3, s2, i2, r2, n2, a2, h2);
  for (;v2--; ) {
    const { x: t3, y: e4 } = x2(d2[v2]);
    g2[0][v2] = t3, g2[1][v2] = e4;
  }
  g2[0][y2] = t2, g2[1][y2] = e3, g2[0][y2 + 1] = a2, g2[1][y2 + 1] = h2;
  const C2 = [new ot(Math.min(...g2[0]), Math.min(...g2[1])), new ot(Math.max(...g2[0]), Math.max(...g2[1]))];
  return o.cachesBoundsOfCurve && (_.boundsOfCurveCache[c2] = C2), C2;
}
var en = (t2, e3, s2) => {
  let [i2, r2, n2, o2, a2, h2, c2, l2] = s2;
  const u2 = ((t3, e4, s3, i3, r3, n3, o3) => {
    if (s3 === 0 || i3 === 0)
      return [];
    let a3 = 0, h3 = 0, c3 = 0;
    const l3 = Math.PI, u3 = o3 * w, d2 = nt(u3), g2 = rt(u3), f = 0.5 * (-g2 * t3 - d2 * e4), p2 = 0.5 * (-g2 * e4 + d2 * t3), m2 = s3 ** 2, v2 = i3 ** 2, y2 = p2 ** 2, _2 = f ** 2, x2 = m2 * v2 - m2 * y2 - v2 * _2;
    let C2 = Math.abs(s3), b2 = Math.abs(i3);
    if (x2 < 0) {
      const t4 = Math.sqrt(1 - x2 / (m2 * v2));
      C2 *= t4, b2 *= t4;
    } else
      c3 = (r3 === n3 ? -1 : 1) * Math.sqrt(x2 / (m2 * y2 + v2 * _2));
    const S2 = c3 * C2 * p2 / b2, T2 = -c3 * b2 * f / C2, O2 = g2 * S2 - d2 * T2 + 0.5 * t3, k2 = d2 * S2 + g2 * T2 + 0.5 * e4;
    let D2 = $r(1, 0, (f - S2) / C2, (p2 - T2) / b2), M2 = $r((f - S2) / C2, (p2 - T2) / b2, (-f - S2) / C2, (-p2 - T2) / b2);
    n3 === 0 && M2 > 0 ? M2 -= 2 * l3 : n3 === 1 && M2 < 0 && (M2 += 2 * l3);
    const P2 = Math.ceil(Math.abs(M2 / l3 * 2)), E2 = [], A2 = M2 / P2, j2 = 8 / 3 * Math.sin(A2 / 4) * Math.sin(A2 / 4) / Math.sin(A2 / 2);
    let F2 = D2 + A2;
    for (let t4 = 0;t4 < P2; t4++)
      E2[t4] = Zr(D2, F2, g2, d2, C2, b2, O2, k2, j2, a3, h3), a3 = E2[t4][5], h3 = E2[t4][6], D2 = F2, F2 += A2;
    return E2;
  })(c2 - t2, l2 - e3, r2, n2, a2, h2, o2);
  for (let s3 = 0, i3 = u2.length;s3 < i3; s3++)
    u2[s3][1] += t2, u2[s3][2] += e3, u2[s3][3] += t2, u2[s3][4] += e3, u2[s3][5] += t2, u2[s3][6] += e3;
  return u2;
};
var sn = (t2) => {
  let e3 = 0, s2 = 0, i2 = 0, r2 = 0;
  const n2 = [];
  let o2, a2 = 0, h2 = 0;
  for (const c2 of t2) {
    const t3 = [...c2];
    let l2;
    switch (t3[0]) {
      case "l":
        t3[1] += e3, t3[2] += s2;
      case "L":
        e3 = t3[1], s2 = t3[2], l2 = ["L", e3, s2];
        break;
      case "h":
        t3[1] += e3;
      case "H":
        e3 = t3[1], l2 = ["L", e3, s2];
        break;
      case "v":
        t3[1] += s2;
      case "V":
        s2 = t3[1], l2 = ["L", e3, s2];
        break;
      case "m":
        t3[1] += e3, t3[2] += s2;
      case "M":
        e3 = t3[1], s2 = t3[2], i2 = t3[1], r2 = t3[2], l2 = ["M", e3, s2];
        break;
      case "c":
        t3[1] += e3, t3[2] += s2, t3[3] += e3, t3[4] += s2, t3[5] += e3, t3[6] += s2;
      case "C":
        a2 = t3[3], h2 = t3[4], e3 = t3[5], s2 = t3[6], l2 = ["C", t3[1], t3[2], a2, h2, e3, s2];
        break;
      case "s":
        t3[1] += e3, t3[2] += s2, t3[3] += e3, t3[4] += s2;
      case "S":
        o2 === "C" ? (a2 = 2 * e3 - a2, h2 = 2 * s2 - h2) : (a2 = e3, h2 = s2), e3 = t3[3], s2 = t3[4], l2 = ["C", a2, h2, t3[1], t3[2], e3, s2], a2 = l2[3], h2 = l2[4];
        break;
      case "q":
        t3[1] += e3, t3[2] += s2, t3[3] += e3, t3[4] += s2;
      case "Q":
        a2 = t3[1], h2 = t3[2], e3 = t3[3], s2 = t3[4], l2 = ["Q", a2, h2, e3, s2];
        break;
      case "t":
        t3[1] += e3, t3[2] += s2;
      case "T":
        o2 === "Q" ? (a2 = 2 * e3 - a2, h2 = 2 * s2 - h2) : (a2 = e3, h2 = s2), e3 = t3[1], s2 = t3[2], l2 = ["Q", a2, h2, e3, s2];
        break;
      case "a":
        t3[6] += e3, t3[7] += s2;
      case "A":
        en(e3, s2, t3).forEach((t4) => n2.push(t4)), e3 = t3[6], s2 = t3[7];
        break;
      case "z":
      case "Z":
        e3 = i2, s2 = r2, l2 = ["Z"];
    }
    l2 ? (n2.push(l2), o2 = l2[0]) : o2 = "";
  }
  return n2;
};
var rn = (t2, e3, s2, i2) => Math.sqrt((s2 - t2) ** 2 + (i2 - e3) ** 2);
var nn = (t2, e3, s2, i2, r2, n2, o2, a2) => (h2) => {
  const c2 = h2 ** 3, l2 = ((t3) => 3 * t3 ** 2 * (1 - t3))(h2), u2 = ((t3) => 3 * t3 * (1 - t3) ** 2)(h2), d2 = ((t3) => (1 - t3) ** 3)(h2);
  return new ot(o2 * c2 + r2 * l2 + s2 * u2 + t2 * d2, a2 * c2 + n2 * l2 + i2 * u2 + e3 * d2);
};
var on = (t2) => t2 ** 2;
var an = (t2) => 2 * t2 * (1 - t2);
var hn = (t2) => (1 - t2) ** 2;
var cn = (t2, e3, s2, i2, r2, n2, o2, a2) => (h2) => {
  const c2 = on(h2), l2 = an(h2), u2 = hn(h2), d2 = 3 * (u2 * (s2 - t2) + l2 * (r2 - s2) + c2 * (o2 - r2)), g2 = 3 * (u2 * (i2 - e3) + l2 * (n2 - i2) + c2 * (a2 - n2));
  return Math.atan2(g2, d2);
};
var ln = (t2, e3, s2, i2, r2, n2) => (o2) => {
  const a2 = on(o2), h2 = an(o2), c2 = hn(o2);
  return new ot(r2 * a2 + s2 * h2 + t2 * c2, n2 * a2 + i2 * h2 + e3 * c2);
};
var un = (t2, e3, s2, i2, r2, n2) => (o2) => {
  const a2 = 1 - o2, h2 = 2 * (a2 * (s2 - t2) + o2 * (r2 - s2)), c2 = 2 * (a2 * (i2 - e3) + o2 * (n2 - i2));
  return Math.atan2(c2, h2);
};
var dn = (t2, e3, s2) => {
  let i2 = new ot(e3, s2), r2 = 0;
  for (let e4 = 1;e4 <= 100; e4 += 1) {
    const s3 = t2(e4 / 100);
    r2 += rn(i2.x, i2.y, s3.x, s3.y), i2 = s3;
  }
  return r2;
};
var gn = (t2, e3) => {
  let i2, r2 = 0, n2 = 0, o2 = { x: t2.x, y: t2.y }, a2 = s({}, o2), h2 = 0.01, c2 = 0;
  const { iterator: l2, angleFinder: u2 } = t2;
  for (;n2 < e3 && h2 > 0.0001; )
    a2 = l2(r2), c2 = r2, i2 = rn(o2.x, o2.y, a2.x, a2.y), i2 + n2 > e3 ? (r2 -= h2, h2 /= 2) : (o2 = a2, r2 += h2, n2 += i2);
  return s(s({}, a2), {}, { angle: u2(c2) });
};
var fn = (t2) => {
  let e3, s2, i2 = 0, r2 = 0, n2 = 0, o2 = 0, a2 = 0;
  const h2 = [];
  for (const c2 of t2) {
    const t3 = { x: r2, y: n2, command: c2[0], length: 0 };
    switch (c2[0]) {
      case "M":
        s2 = t3, s2.x = o2 = r2 = c2[1], s2.y = a2 = n2 = c2[2];
        break;
      case "L":
        s2 = t3, s2.length = rn(r2, n2, c2[1], c2[2]), r2 = c2[1], n2 = c2[2];
        break;
      case "C":
        e3 = nn(r2, n2, c2[1], c2[2], c2[3], c2[4], c2[5], c2[6]), s2 = t3, s2.iterator = e3, s2.angleFinder = cn(r2, n2, c2[1], c2[2], c2[3], c2[4], c2[5], c2[6]), s2.length = dn(e3, r2, n2), r2 = c2[5], n2 = c2[6];
        break;
      case "Q":
        e3 = ln(r2, n2, c2[1], c2[2], c2[3], c2[4]), s2 = t3, s2.iterator = e3, s2.angleFinder = un(r2, n2, c2[1], c2[2], c2[3], c2[4]), s2.length = dn(e3, r2, n2), r2 = c2[3], n2 = c2[4];
        break;
      case "Z":
        s2 = t3, s2.destX = o2, s2.destY = a2, s2.length = rn(r2, n2, o2, a2), r2 = o2, n2 = a2;
    }
    i2 += s2.length, h2.push(s2);
  }
  return h2.push({ length: i2, x: r2, y: n2 }), h2;
};
var pn = function(t2, e3) {
  let i2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : fn(t2), r2 = 0;
  for (;e3 - i2[r2].length > 0 && r2 < i2.length - 2; )
    e3 -= i2[r2].length, r2++;
  const n2 = i2[r2], o2 = e3 / n2.length, a2 = t2[r2];
  switch (n2.command) {
    case "M":
      return { x: n2.x, y: n2.y, angle: 0 };
    case "Z":
      return s(s({}, new ot(n2.x, n2.y).lerp(new ot(n2.destX, n2.destY), o2)), {}, { angle: Math.atan2(n2.destY - n2.y, n2.destX - n2.x) });
    case "L":
      return s(s({}, new ot(n2.x, n2.y).lerp(new ot(a2[1], a2[2]), o2)), {}, { angle: Math.atan2(a2[2] - n2.y, a2[1] - n2.x) });
    case "C":
    case "Q":
      return gn(n2, e3);
  }
};
var mn = new RegExp("[mzlhvcsqta][^mzlhvcsqta]*", "gi");
var vn = new RegExp(Jr, "g");
var yn = new RegExp(es, "gi");
var _n = { m: 2, l: 2, h: 1, v: 1, c: 6, s: 4, q: 4, t: 2, a: 7 };
var xn = (t2) => {
  var e3;
  const s2 = [], i2 = (e3 = t2.match(mn)) !== null && e3 !== undefined ? e3 : [];
  for (const t3 of i2) {
    const e4 = t3[0];
    if (e4 === "z" || e4 === "Z") {
      s2.push([e4]);
      continue;
    }
    const i3 = _n[e4.toLowerCase()];
    let r2 = [];
    if (e4 === "a" || e4 === "A") {
      vn.lastIndex = 0;
      for (let e5 = null;e5 = vn.exec(t3); )
        r2.push(...e5.slice(1));
    } else
      r2 = t3.match(yn) || [];
    for (let t4 = 0;t4 < r2.length; t4 += i3) {
      const n2 = new Array(i3), o2 = Qr[e4];
      n2[0] = t4 > 0 && o2 ? o2 : e4;
      for (let e5 = 0;e5 < i3; e5++)
        n2[e5 + 1] = parseFloat(r2[t4 + e5]);
      s2.push(n2);
    }
  }
  return s2;
};
var Cn = function(t2) {
  let e3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0, s2 = new ot(t2[0]), i2 = new ot(t2[1]), r2 = 1, n2 = 0;
  const o2 = [], a2 = t2.length, h2 = a2 > 2;
  let c2;
  for (h2 && (r2 = t2[2].x < i2.x ? -1 : t2[2].x === i2.x ? 0 : 1, n2 = t2[2].y < i2.y ? -1 : t2[2].y === i2.y ? 0 : 1), o2.push(["M", s2.x - r2 * e3, s2.y - n2 * e3]), c2 = 1;c2 < a2; c2++) {
    if (!s2.eq(i2)) {
      const t3 = s2.midPointFrom(i2);
      o2.push(["Q", s2.x, s2.y, t3.x, t3.y]);
    }
    s2 = t2[c2], c2 + 1 < t2.length && (i2 = t2[c2 + 1]);
  }
  return h2 && (r2 = s2.x > t2[c2 - 2].x ? 1 : s2.x === t2[c2 - 2].x ? 0 : -1, n2 = s2.y > t2[c2 - 2].y ? 1 : s2.y === t2[c2 - 2].y ? 0 : -1), o2.push(["L", s2.x + r2 * e3, s2.y + n2 * e3]), o2;
};
var bn = (t2, e3) => t2.map((t3) => t3.map((t4, s2) => s2 === 0 || e3 === undefined ? t4 : Vt(t4, e3)).join(" ")).join(" ");
function Sn(t2, e3) {
  const s2 = t2.style;
  s2 && e3 && (typeof e3 == "string" ? s2.cssText += ";" + e3 : Object.entries(e3).forEach((t3) => {
    let [e4, i2] = t3;
    return s2.setProperty(e4, i2);
  }));
}
var wn = (t2, e3) => Math.floor(Math.random() * (e3 - t2 + 1)) + t2;
function Tn(t2) {
  let e3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const s2 = e3.onComplete || C, i2 = new (v()).XMLHttpRequest, r2 = e3.signal, n2 = function() {
    i2.abort();
  }, o2 = function() {
    r2 && r2.removeEventListener("abort", n2), i2.onerror = i2.ontimeout = C;
  };
  if (r2 && r2.aborted)
    throw new c("request");
  return r2 && r2.addEventListener("abort", n2, { once: true }), i2.onreadystatechange = function() {
    i2.readyState === 4 && (o2(), s2(i2), i2.onreadystatechange = C);
  }, i2.onerror = i2.ontimeout = o2, i2.open("get", t2, true), i2.send(), i2;
}
var On = (t2, e3) => {
  let s2 = t2._findCenterFromElement();
  t2.transformMatrix && (((t3) => {
    if (t3.transformMatrix) {
      const { scaleX: e4, scaleY: s3, angle: i2, skewX: r2 } = Dt(t3.transformMatrix);
      t3.flipX = false, t3.flipY = false, t3.set(H, e4), t3.set(N, s3), t3.angle = i2, t3.skewX = r2, t3.skewY = 0;
    }
  })(t2), s2 = s2.transform(t2.transformMatrix)), delete t2.transformMatrix, e3 && (t2.scaleX *= e3.scaleX, t2.scaleY *= e3.scaleY, t2.cropX = e3.cropX, t2.cropY = e3.cropY, s2.x += e3.offsetLeft, s2.y += e3.offsetTop, t2.width = e3.width, t2.height = e3.height), t2.setPositionByOrigin(s2, D, D);
};
var kn = Object.freeze({ __proto__: null, addTransformToObject: ce, animate: Us, animateColor: qs, applyTransformToObject: le, calcAngleBetweenVectors: vs, calcDimensionsMatrix: Lt, calcPlaneChangeMatrix: fe, calcVectorRotation: ys, cancelAnimFrame: dt, capValue: ks, composeMatrix: Rt, copyCanvasElement: (t2) => {
  var e3;
  const s2 = vt(t2);
  return (e3 = s2.getContext("2d")) === null || e3 === undefined || e3.drawImage(t2, 0, 0), s2;
}, cos: rt, createCanvasElement: pt, createImage: mt, createRotateMatrix: Pt, createScaleMatrix: Et, createSkewXMatrix: jt, createSkewYMatrix: Ft, createTranslateMatrix: Mt, createVector: ps, crossProduct: Cs, degreesToRadians: xt, dotProduct: bs, ease: Rs, enlivenObjectEnlivables: Xt, enlivenObjects: Bt, findScaleToCover: Ur, findScaleToFit: Nr, getBoundsOfCurve: tn, getOrthonormalVector: xs, getPathSegmentsInfo: fn, getPointOnPath: pn, getPointer: re, getRandomInt: wn, getRegularPolygonPath: (t2, e3) => {
  const s2 = 2 * Math.PI / t2;
  let i2 = -b;
  t2 % 2 == 0 && (i2 += s2 / 2);
  const r2 = new Array(t2 + 1);
  for (let n2 = 0;n2 < t2; n2++) {
    const t3 = n2 * s2 + i2, { x: o2, y: a2 } = new ot(rt(t3), nt(t3)).scalarMultiply(e3);
    r2[n2] = [n2 === 0 ? "M" : "L", o2, a2];
  }
  return r2[t2] = ["Z"], r2;
}, getSmoothPathFromPoints: Cn, getSvgAttributes: (t2) => {
  const e3 = ["instantiated_by_use", "style", "id", "class"];
  switch (t2) {
    case "linearGradient":
      return e3.concat(["x1", "y1", "x2", "y2", "gradientUnits", "gradientTransform"]);
    case "radialGradient":
      return e3.concat(["gradientUnits", "gradientTransform", "cx", "cy", "r", "fx", "fy", "fr"]);
    case "stop":
      return e3.concat(["offset", "stop-color", "stop-opacity"]);
  }
  return e3;
}, getUnitVector: _s, groupSVGElements: (t2, e3) => t2 && t2.length === 1 ? t2[0] : new Hr(t2, e3), hasStyleChanged: Ui, invertTransform: wt, isBetweenVectors: Ss, isIdentityMatrix: bt, isTouchEvent: ne, isTransparent: Fi, joinPath: bn, loadImage: It, magnitude: ms, makeBoundingBoxFromPoints: ae, makePathSimpler: sn, matrixToSVG: zt, mergeClipPaths: (t2, e3) => {
  var s2;
  let i2 = t2, r2 = e3;
  i2.inverted && !r2.inverted && (i2 = e3, r2 = t2), ve(r2, (s2 = r2.group) === null || s2 === undefined ? undefined : s2.calcTransformMatrix(), i2.calcTransformMatrix());
  const n2 = i2.inverted && r2.inverted;
  return n2 && (i2.inverted = r2.inverted = false), new Hr([i2], { clipPath: r2, inverted: n2 });
}, multiplyTransformMatrices: Tt, multiplyTransformMatrixArray: Ot, parsePath: xn, parsePreserveAspectRatioAttribute: Ie, parseUnit: Re, pick: Yt, projectStrokeOnPoints: Xi, qrDecompose: Dt, radiansToDegrees: Ct, removeFromArray: it, removeTransformFromObject: (t2, e3) => {
  const s2 = wt(e3), i2 = Tt(s2, t2.calcOwnMatrix());
  le(t2, i2);
}, removeTransformMatrixForSvgParsing: On, request: Tn, requestAnimFrame: ut, resetObjectTransform: ue, rotatePoint: (t2, e3, s2) => t2.rotate(s2, e3), rotateVector: fs, saveObjectTransform: de, sendObjectToPlane: ve, sendPointToPlane: pe, sendVectorToPlane: me, setStyle: Sn, sin: nt, sizeAfterTransform: ge, string: Ni, stylesFromArray: Ki, stylesToArray: qi, toBlob: _t, toDataURL: yt, toFixed: Vt, transformPath: (t2, e3, s2) => (s2 && (e3 = Tt(e3, [1, 0, 0, 1, -s2.x, -s2.y])), t2.map((t3) => {
  const s3 = [...t3];
  for (let i2 = 1;i2 < t3.length - 1; i2 += 2) {
    const { x: r2, y: n2 } = St({ x: t3[i2], y: t3[i2 + 1] }, e3);
    s3[i2] = r2, s3[i2 + 1] = n2;
  }
  return s3;
})), transformPoint: St });

class Dn extends te {
  constructor(e3) {
    let { allowTouchScrolling: s2 = false, containerClass: i2 = "" } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super(e3), t(this, "upper", undefined), t(this, "container", undefined);
    const { el: r2 } = this.lower, n2 = this.createUpperCanvas();
    this.upper = { el: n2, ctx: n2.getContext("2d") }, this.applyCanvasStyle(r2, { allowTouchScrolling: s2 }), this.applyCanvasStyle(n2, { allowTouchScrolling: s2, styles: { position: "absolute", left: "0", top: "0" } });
    const o2 = this.createContainerElement();
    o2.classList.add(i2), r2.parentNode && r2.parentNode.replaceChild(o2, r2), o2.append(r2, n2), this.container = o2;
  }
  createUpperCanvas() {
    const { el: t2 } = this.lower, e3 = pt();
    return e3.className = t2.className, e3.classList.remove("lower-canvas"), e3.classList.add("upper-canvas"), e3.setAttribute("data-fabric", "top"), e3.style.cssText = t2.style.cssText, e3.setAttribute("draggable", "true"), e3;
  }
  createContainerElement() {
    const t2 = m().createElement("div");
    return t2.setAttribute("data-fabric", "wrapper"), Sn(t2, { position: "relative" }), $t(t2), t2;
  }
  applyCanvasStyle(t2, e3) {
    const { styles: i2, allowTouchScrolling: r2 } = e3;
    Sn(t2, s(s({}, i2), {}, { "touch-action": r2 ? "manipulation" : j })), $t(t2);
  }
  setDimensions(t2, e3) {
    super.setDimensions(t2, e3);
    const { el: s2, ctx: i2 } = this.upper;
    Qt(s2, i2, t2, e3);
  }
  setCSSDimensions(t2) {
    super.setCSSDimensions(t2), Zt(this.upper.el, t2), Zt(this.container, t2);
  }
  cleanupDOM(t2) {
    const e3 = this.container, { el: s2 } = this.lower, { el: i2 } = this.upper;
    super.cleanupDOM(t2), e3.removeChild(i2), e3.removeChild(s2), e3.parentNode && e3.parentNode.replaceChild(s2, e3);
  }
  dispose() {
    super.dispose(), p().dispose(this.upper.el), delete this.upper, delete this.container;
  }
}

class Mn extends se {
  constructor() {
    super(...arguments), t(this, "targets", []), t(this, "_hoveredTargets", []), t(this, "_objectsToRender", undefined), t(this, "_currentTransform", null), t(this, "_groupSelector", null), t(this, "contextTopDirty", false);
  }
  static getDefaults() {
    return s(s({}, super.getDefaults()), Mn.ownDefaults);
  }
  get upperCanvasEl() {
    var t2;
    return (t2 = this.elements.upper) === null || t2 === undefined ? undefined : t2.el;
  }
  get contextTop() {
    var t2;
    return (t2 = this.elements.upper) === null || t2 === undefined ? undefined : t2.ctx;
  }
  get wrapperEl() {
    return this.elements.container;
  }
  initElements(t2) {
    this.elements = new Dn(t2, { allowTouchScrolling: this.allowTouchScrolling, containerClass: this.containerClass }), this._createCacheCanvas();
  }
  _onObjectAdded(t2) {
    this._objectsToRender = undefined, super._onObjectAdded(t2);
  }
  _onObjectRemoved(t2) {
    this._objectsToRender = undefined, t2 === this._activeObject && (this.fire("before:selection:cleared", { deselected: [t2] }), this._discardActiveObject(), this.fire("selection:cleared", { deselected: [t2] }), t2.fire("deselected", { target: t2 })), t2 === this._hoveredTarget && (this._hoveredTarget = undefined, this._hoveredTargets = []), super._onObjectRemoved(t2);
  }
  _onStackOrderChanged() {
    this._objectsToRender = undefined, super._onStackOrderChanged();
  }
  _chooseObjectsToRender() {
    const t2 = this._activeObject;
    return !this.preserveObjectStacking && t2 ? this._objects.filter((e3) => !e3.group && e3 !== t2).concat(t2) : this._objects;
  }
  renderAll() {
    this.cancelRequestedRender(), this.destroyed || (!this.contextTopDirty || this._groupSelector || this.isDrawingMode || (this.clearContext(this.contextTop), this.contextTopDirty = false), this.hasLostContext && (this.renderTopLayer(this.contextTop), this.hasLostContext = false), !this._objectsToRender && (this._objectsToRender = this._chooseObjectsToRender()), this.renderCanvas(this.getContext(), this._objectsToRender));
  }
  renderTopLayer(t2) {
    t2.save(), this.isDrawingMode && this._isCurrentlyDrawing && (this.freeDrawingBrush && this.freeDrawingBrush._render(), this.contextTopDirty = true), this.selection && this._groupSelector && (this._drawSelection(t2), this.contextTopDirty = true), t2.restore();
  }
  renderTop() {
    const t2 = this.contextTop;
    this.clearContext(t2), this.renderTopLayer(t2), this.fire("after:render", { ctx: t2 });
  }
  setTargetFindTolerance(t2) {
    t2 = Math.round(t2), this.targetFindTolerance = t2;
    const e3 = this.getRetinaScaling(), s2 = Math.ceil((2 * t2 + 1) * e3);
    this.pixelFindCanvasEl.width = this.pixelFindCanvasEl.height = s2, this.pixelFindContext.scale(e3, e3);
  }
  isTargetTransparent(t2, e3, s2) {
    const i2 = this.targetFindTolerance, r2 = this.pixelFindContext;
    this.clearContext(r2), r2.save(), r2.translate(-e3 + i2, -s2 + i2), r2.transform(...this.viewportTransform);
    const n2 = t2.selectionBackgroundColor;
    t2.selectionBackgroundColor = "", t2.render(r2), t2.selectionBackgroundColor = n2, r2.restore();
    const o2 = Math.round(i2 * this.getRetinaScaling());
    return Fi(r2, o2, o2, o2);
  }
  _isSelectionKeyPressed(t2) {
    const e3 = this.selectionKey;
    return !!e3 && (Array.isArray(e3) ? !!e3.find((e4) => !!e4 && t2[e4] === true) : t2[e3]);
  }
  _shouldClearSelection(t2, e3) {
    const s2 = this.getActiveObjects(), i2 = this._activeObject;
    return !!(!e3 || e3 && i2 && s2.length > 1 && s2.indexOf(e3) === -1 && i2 !== e3 && !this._isSelectionKeyPressed(t2) || e3 && !e3.evented || e3 && !e3.selectable && i2 && i2 !== e3);
  }
  _shouldCenterTransform(t2, e3, s2) {
    if (!t2)
      return;
    let i2;
    return e3 === G || e3 === H || e3 === N || e3 === Y ? i2 = this.centeredScaling || t2.centeredScaling : e3 === B && (i2 = this.centeredRotation || t2.centeredRotation), i2 ? !s2 : s2;
  }
  _getOriginFromCorner(t2, e3) {
    const s2 = { x: t2.originX, y: t2.originY };
    return e3 ? (["ml", "tl", "bl"].includes(e3) ? s2.x = A : ["mr", "tr", "br"].includes(e3) && (s2.x = M), ["tl", "mt", "tr"].includes(e3) ? s2.y = E : ["bl", "mb", "br"].includes(e3) && (s2.y = P), s2) : s2;
  }
  _setupCurrentTransform(t2, e3, i2) {
    var r2;
    const n2 = e3.group ? pe(this.getScenePoint(t2), undefined, e3.group.calcTransformMatrix()) : this.getScenePoint(t2), { key: o2 = "", control: a2 } = e3.getActiveControl() || {}, h2 = i2 && a2 ? (r2 = a2.getActionHandler(t2, e3, a2)) === null || r2 === undefined ? undefined : r2.bind(a2) : De, c2 = ((t3, e4, s2, i3) => {
      if (!e4 || !t3)
        return "drag";
      const r3 = i3.controls[e4];
      return r3.getActionName(s2, r3, i3);
    })(i2, o2, t2, e3), l2 = t2[this.centeredKey], u2 = this._shouldCenterTransform(e3, c2, l2) ? { x: D, y: D } : this._getOriginFromCorner(e3, o2), d2 = { target: e3, action: c2, actionHandler: h2, actionPerformed: false, corner: o2, scaleX: e3.scaleX, scaleY: e3.scaleY, skewX: e3.skewX, skewY: e3.skewY, offsetX: n2.x - e3.left, offsetY: n2.y - e3.top, originX: u2.x, originY: u2.y, ex: n2.x, ey: n2.y, lastX: n2.x, lastY: n2.y, theta: xt(e3.angle), width: e3.width, height: e3.height, shiftKey: t2.shiftKey, altKey: l2, original: s(s({}, de(e3)), {}, { originX: u2.x, originY: u2.y }) };
    this._currentTransform = d2, this.fire("before:transform", { e: t2, transform: d2 });
  }
  setCursor(t2) {
    this.upperCanvasEl.style.cursor = t2;
  }
  _drawSelection(t2) {
    const { x: e3, y: s2, deltaX: i2, deltaY: r2 } = this._groupSelector, n2 = new ot(e3, s2).transform(this.viewportTransform), o2 = new ot(e3 + i2, s2 + r2).transform(this.viewportTransform), a2 = this.selectionLineWidth / 2;
    let h2 = Math.min(n2.x, o2.x), c2 = Math.min(n2.y, o2.y), l2 = Math.max(n2.x, o2.x), u2 = Math.max(n2.y, o2.y);
    this.selectionColor && (t2.fillStyle = this.selectionColor, t2.fillRect(h2, c2, l2 - h2, u2 - c2)), this.selectionLineWidth && this.selectionBorderColor && (t2.lineWidth = this.selectionLineWidth, t2.strokeStyle = this.selectionBorderColor, h2 += a2, c2 += a2, l2 -= a2, u2 -= a2, ji.prototype._setLineDash.call(this, t2, this.selectionDashArray), t2.strokeRect(h2, c2, l2 - h2, u2 - c2));
  }
  findTarget(t2) {
    if (this.skipTargetFind)
      return;
    const e3 = this.getViewportPoint(t2), s2 = this._activeObject, i2 = this.getActiveObjects();
    if (this.targets = [], s2 && i2.length >= 1) {
      if (s2.findControl(e3, ne(t2)))
        return s2;
      if (i2.length > 1 && this.searchPossibleTargets([s2], e3))
        return s2;
      if (s2 === this.searchPossibleTargets([s2], e3)) {
        if (this.preserveObjectStacking) {
          const i3 = this.targets;
          this.targets = [];
          const r2 = this.searchPossibleTargets(this._objects, e3);
          return t2[this.altSelectionKey] && r2 && r2 !== s2 ? (this.targets = i3, s2) : r2;
        }
        return s2;
      }
    }
    return this.searchPossibleTargets(this._objects, e3);
  }
  _pointIsInObjectSelectionArea(t2, e3) {
    let s2 = t2.getCoords();
    const i2 = this.getZoom(), r2 = t2.padding / i2;
    if (r2) {
      const [t3, e4, i3, n2] = s2, o2 = Math.atan2(e4.y - t3.y, e4.x - t3.x), a2 = rt(o2) * r2, h2 = nt(o2) * r2, c2 = a2 + h2, l2 = a2 - h2;
      s2 = [new ot(t3.x - l2, t3.y - c2), new ot(e4.x + c2, e4.y - l2), new ot(i3.x + l2, i3.y + c2), new ot(n2.x - c2, n2.y + l2)];
    }
    return Ks.isPointInPolygon(e3, s2);
  }
  _checkTarget(t2, e3) {
    if (t2 && t2.visible && t2.evented && this._pointIsInObjectSelectionArea(t2, pe(e3, undefined, this.viewportTransform))) {
      if (!this.perPixelTargetFind && !t2.perPixelTargetFind || t2.isEditing)
        return true;
      if (!this.isTargetTransparent(t2, e3.x, e3.y))
        return true;
    }
    return false;
  }
  _searchPossibleTargets(t2, e3) {
    let s2 = t2.length;
    for (;s2--; ) {
      const i2 = t2[s2];
      if (this._checkTarget(i2, e3)) {
        if (ht(i2) && i2.subTargetCheck) {
          const t3 = this._searchPossibleTargets(i2._objects, e3);
          t3 && this.targets.push(t3);
        }
        return i2;
      }
    }
  }
  searchPossibleTargets(t2, e3) {
    const s2 = this._searchPossibleTargets(t2, e3);
    if (s2 && ht(s2) && s2.interactive && this.targets[0]) {
      const t3 = this.targets;
      for (let e4 = t3.length - 1;e4 > 0; e4--) {
        const s3 = t3[e4];
        if (!ht(s3) || !s3.interactive)
          return s3;
      }
      return t3[0];
    }
    return s2;
  }
  getViewportPoint(t2) {
    return this._pointer ? this._pointer : this.getPointer(t2, true);
  }
  getScenePoint(t2) {
    return this._absolutePointer ? this._absolutePointer : this.getPointer(t2);
  }
  getPointer(t2) {
    let e3 = arguments.length > 1 && arguments[1] !== undefined && arguments[1];
    const s2 = this.upperCanvasEl, i2 = s2.getBoundingClientRect();
    let r2 = re(t2), n2 = i2.width || 0, o2 = i2.height || 0;
    n2 && o2 || ((P in i2) && (E in i2) && (o2 = Math.abs(i2.top - i2.bottom)), (A in i2) && (M in i2) && (n2 = Math.abs(i2.right - i2.left))), this.calcOffset(), r2.x = r2.x - this._offset.left, r2.y = r2.y - this._offset.top, e3 || (r2 = pe(r2, undefined, this.viewportTransform));
    const a2 = this.getRetinaScaling();
    a2 !== 1 && (r2.x /= a2, r2.y /= a2);
    const h2 = n2 === 0 || o2 === 0 ? new ot(1, 1) : new ot(s2.width / n2, s2.height / o2);
    return r2.multiply(h2);
  }
  _setDimensionsImpl(t2, e3) {
    this._resetTransformEventData(), super._setDimensionsImpl(t2, e3), this._isCurrentlyDrawing && this.freeDrawingBrush && this.freeDrawingBrush._setBrushStyles(this.contextTop);
  }
  _createCacheCanvas() {
    this.pixelFindCanvasEl = pt(), this.pixelFindContext = this.pixelFindCanvasEl.getContext("2d", { willReadFrequently: true }), this.setTargetFindTolerance(this.targetFindTolerance);
  }
  getTopContext() {
    return this.elements.upper.ctx;
  }
  getSelectionContext() {
    return this.elements.upper.ctx;
  }
  getSelectionElement() {
    return this.elements.upper.el;
  }
  getActiveObject() {
    return this._activeObject;
  }
  getActiveObjects() {
    const t2 = this._activeObject;
    return Ut(t2) ? t2.getObjects() : t2 ? [t2] : [];
  }
  _fireSelectionEvents(t2, e3) {
    let s2 = false, i2 = false;
    const r2 = this.getActiveObjects(), n2 = [], o2 = [];
    t2.forEach((t3) => {
      r2.includes(t3) || (s2 = true, t3.fire("deselected", { e: e3, target: t3 }), o2.push(t3));
    }), r2.forEach((i3) => {
      t2.includes(i3) || (s2 = true, i3.fire("selected", { e: e3, target: i3 }), n2.push(i3));
    }), t2.length > 0 && r2.length > 0 ? (i2 = true, s2 && this.fire("selection:updated", { e: e3, selected: n2, deselected: o2 })) : r2.length > 0 ? (i2 = true, this.fire("selection:created", { e: e3, selected: n2 })) : t2.length > 0 && (i2 = true, this.fire("selection:cleared", { e: e3, deselected: o2 })), i2 && (this._objectsToRender = undefined);
  }
  setActiveObject(t2, e3) {
    const s2 = this.getActiveObjects(), i2 = this._setActiveObject(t2, e3);
    return this._fireSelectionEvents(s2, e3), i2;
  }
  _setActiveObject(t2, e3) {
    const s2 = this._activeObject;
    return s2 !== t2 && (!(!this._discardActiveObject(e3, t2) && this._activeObject) && (!t2.onSelect({ e: e3 }) && (this._activeObject = t2, Ut(t2) && s2 !== t2 && t2.set("canvas", this), t2.setCoords(), true)));
  }
  _discardActiveObject(t2, e3) {
    const s2 = this._activeObject;
    return !!s2 && (!s2.onDeselect({ e: t2, object: e3 }) && (this._currentTransform && this._currentTransform.target === s2 && this.endCurrentTransform(t2), Ut(s2) && s2 === this._hoveredTarget && (this._hoveredTarget = undefined), this._activeObject = undefined, true));
  }
  discardActiveObject(t2) {
    const e3 = this.getActiveObjects(), s2 = this.getActiveObject();
    e3.length && this.fire("before:selection:cleared", { e: t2, deselected: [s2] });
    const i2 = this._discardActiveObject(t2);
    return this._fireSelectionEvents(e3, t2), i2;
  }
  endCurrentTransform(t2) {
    const e3 = this._currentTransform;
    this._finalizeCurrentTransform(t2), e3 && e3.target && (e3.target.isMoving = false), this._currentTransform = null;
  }
  _finalizeCurrentTransform(t2) {
    const e3 = this._currentTransform, s2 = e3.target, i2 = { e: t2, target: s2, transform: e3, action: e3.action };
    s2._scaling && (s2._scaling = false), s2.setCoords(), e3.actionPerformed && (this.fire("object:modified", i2), s2.fire(Q, i2));
  }
  setViewportTransform(t2) {
    super.setViewportTransform(t2);
    const e3 = this._activeObject;
    e3 && e3.setCoords();
  }
  destroy() {
    const t2 = this._activeObject;
    Ut(t2) && (t2.removeAll(), t2.dispose()), delete this._activeObject, super.destroy(), this.pixelFindContext = null, this.pixelFindCanvasEl = undefined;
  }
  clear() {
    this.discardActiveObject(), this._activeObject = undefined, this.clearContext(this.contextTop), super.clear();
  }
  drawControls(t2) {
    const e3 = this._activeObject;
    e3 && e3._renderControls(t2);
  }
  _toObject(t2, e3, s2) {
    const i2 = this._realizeGroupTransformOnObject(t2), r2 = super._toObject(t2, e3, s2);
    return t2.set(i2), r2;
  }
  _realizeGroupTransformOnObject(t2) {
    const { group: e3 } = t2;
    if (e3 && Ut(e3) && this._activeObject === e3) {
      const s2 = Yt(t2, ["angle", "flipX", "flipY", M, H, N, U, q, P]);
      return ce(t2, e3.calcOwnMatrix()), s2;
    }
    return {};
  }
  _setSVGObject(t2, e3, s2) {
    const i2 = this._realizeGroupTransformOnObject(e3);
    super._setSVGObject(t2, e3, s2), e3.set(i2);
  }
}
t(Mn, "ownDefaults", { uniformScaling: true, uniScaleKey: "shiftKey", centeredScaling: false, centeredRotation: false, centeredKey: "altKey", altActionKey: "shiftKey", selection: true, selectionKey: "shiftKey", selectionColor: "rgba(100, 100, 255, 0.3)", selectionDashArray: [], selectionBorderColor: "rgba(255, 255, 255, 0.3)", selectionLineWidth: 1, selectionFullyContained: false, hoverCursor: "move", moveCursor: "move", defaultCursor: "default", freeDrawingCursor: "crosshair", notAllowedCursor: "not-allowed", perPixelTargetFind: false, targetFindTolerance: 0, skipTargetFind: false, stopContextMenu: false, fireRightClick: false, fireMiddleClick: false, enablePointerEvents: false, containerClass: "canvas-container", preserveObjectStacking: false });

class Pn {
  constructor(e3) {
    t(this, "targets", []), t(this, "__disposer", undefined);
    const s2 = () => {
      const { hiddenTextarea: t2 } = e3.getActiveObject() || {};
      t2 && t2.focus();
    }, i2 = e3.upperCanvasEl;
    i2.addEventListener("click", s2), this.__disposer = () => i2.removeEventListener("click", s2);
  }
  exitTextEditing() {
    this.target = undefined, this.targets.forEach((t2) => {
      t2.isEditing && t2.exitEditing();
    });
  }
  add(t2) {
    this.targets.push(t2);
  }
  remove(t2) {
    this.unregister(t2), it(this.targets, t2);
  }
  register(t2) {
    this.target = t2;
  }
  unregister(t2) {
    t2 === this.target && (this.target = undefined);
  }
  onMouseMove(t2) {
    var e3;
    ((e3 = this.target) === null || e3 === undefined ? undefined : e3.isEditing) && this.target.updateSelectionOnMouseMove(t2);
  }
  clear() {
    this.targets = [], this.target = undefined;
  }
  dispose() {
    this.clear(), this.__disposer(), delete this.__disposer;
  }
}
var En = ["target", "oldTarget", "fireCanvas", "e"];
var An = { passive: false };
var jn = (t2, e3) => {
  const s2 = t2.getViewportPoint(e3), i2 = t2.getScenePoint(e3);
  return { viewportPoint: s2, scenePoint: i2, pointer: s2, absolutePointer: i2 };
};
var Fn = function(t2) {
  for (var e3 = arguments.length, s2 = new Array(e3 > 1 ? e3 - 1 : 0), i2 = 1;i2 < e3; i2++)
    s2[i2 - 1] = arguments[i2];
  return t2.addEventListener(...s2);
};
var Ln = function(t2) {
  for (var e3 = arguments.length, s2 = new Array(e3 > 1 ? e3 - 1 : 0), i2 = 1;i2 < e3; i2++)
    s2[i2 - 1] = arguments[i2];
  return t2.removeEventListener(...s2);
};
var Rn = { mouse: { in: "over", out: "out", targetIn: "mouseover", targetOut: "mouseout", canvasIn: "mouse:over", canvasOut: "mouse:out" }, drag: { in: "enter", out: "leave", targetIn: "dragenter", targetOut: "dragleave", canvasIn: "drag:enter", canvasOut: "drag:leave" } };

class In extends Mn {
  constructor(e3) {
    super(e3, arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}), t(this, "_isClick", undefined), t(this, "textEditingManager", new Pn(this)), ["_onMouseDown", "_onTouchStart", "_onMouseMove", "_onMouseUp", "_onTouchEnd", "_onResize", "_onMouseWheel", "_onMouseOut", "_onMouseEnter", "_onContextMenu", "_onClick", "_onDragStart", "_onDragEnd", "_onDragProgress", "_onDragOver", "_onDragEnter", "_onDragLeave", "_onDrop"].forEach((t2) => {
      this[t2] = this[t2].bind(this);
    }), this.addOrRemove(Fn, "add");
  }
  _getEventPrefix() {
    return this.enablePointerEvents ? "pointer" : "mouse";
  }
  addOrRemove(t2, e3) {
    const s2 = this.upperCanvasEl, i2 = this._getEventPrefix();
    t2(Jt(s2), "resize", this._onResize), t2(s2, i2 + "down", this._onMouseDown), t2(s2, "".concat(i2, "move"), this._onMouseMove, An), t2(s2, "".concat(i2, "out"), this._onMouseOut), t2(s2, "".concat(i2, "enter"), this._onMouseEnter), t2(s2, "wheel", this._onMouseWheel), t2(s2, "contextmenu", this._onContextMenu), t2(s2, "click", this._onClick), t2(s2, "dblclick", this._onClick), t2(s2, "dragstart", this._onDragStart), t2(s2, "dragend", this._onDragEnd), t2(s2, "dragover", this._onDragOver), t2(s2, "dragenter", this._onDragEnter), t2(s2, "dragleave", this._onDragLeave), t2(s2, "drop", this._onDrop), this.enablePointerEvents || t2(s2, "touchstart", this._onTouchStart, An);
  }
  removeListeners() {
    this.addOrRemove(Ln, "remove");
    const t2 = this._getEventPrefix(), e3 = Kt(this.upperCanvasEl);
    Ln(e3, "".concat(t2, "up"), this._onMouseUp), Ln(e3, "touchend", this._onTouchEnd, An), Ln(e3, "".concat(t2, "move"), this._onMouseMove, An), Ln(e3, "touchmove", this._onMouseMove, An), clearTimeout(this._willAddMouseDown);
  }
  _onMouseWheel(t2) {
    this.__onMouseWheel(t2);
  }
  _onMouseOut(t2) {
    const e3 = this._hoveredTarget, i2 = s({ e: t2 }, jn(this, t2));
    this.fire("mouse:out", s(s({}, i2), {}, { target: e3 })), this._hoveredTarget = undefined, e3 && e3.fire("mouseout", s({}, i2)), this._hoveredTargets.forEach((t3) => {
      this.fire("mouse:out", s(s({}, i2), {}, { target: t3 })), t3 && t3.fire("mouseout", s({}, i2));
    }), this._hoveredTargets = [];
  }
  _onMouseEnter(t2) {
    this._currentTransform || this.findTarget(t2) || (this.fire("mouse:over", s({ e: t2 }, jn(this, t2))), this._hoveredTarget = undefined, this._hoveredTargets = []);
  }
  _onDragStart(t2) {
    this._isClick = false;
    const e3 = this.getActiveObject();
    if (e3 && e3.onDragStart(t2)) {
      this._dragSource = e3;
      const s2 = { e: t2, target: e3 };
      return this.fire("dragstart", s2), e3.fire("dragstart", s2), void Fn(this.upperCanvasEl, "drag", this._onDragProgress);
    }
    oe(t2);
  }
  _renderDragEffects(t2, e3, s2) {
    let i2 = false;
    const r2 = this._dropTarget;
    r2 && r2 !== e3 && r2 !== s2 && (r2.clearContextTop(), i2 = true), e3 == null || e3.clearContextTop(), s2 !== e3 && (s2 == null || s2.clearContextTop());
    const n2 = this.contextTop;
    n2.save(), n2.transform(...this.viewportTransform), e3 && (n2.save(), e3.transform(n2), e3.renderDragSourceEffect(t2), n2.restore(), i2 = true), s2 && (n2.save(), s2.transform(n2), s2.renderDropTargetEffect(t2), n2.restore(), i2 = true), n2.restore(), i2 && (this.contextTopDirty = true);
  }
  _onDragEnd(t2) {
    const e3 = !!t2.dataTransfer && t2.dataTransfer.dropEffect !== j, s2 = e3 ? this._activeObject : undefined, i2 = { e: t2, target: this._dragSource, subTargets: this.targets, dragSource: this._dragSource, didDrop: e3, dropTarget: s2 };
    Ln(this.upperCanvasEl, "drag", this._onDragProgress), this.fire("dragend", i2), this._dragSource && this._dragSource.fire("dragend", i2), delete this._dragSource, this._onMouseUp(t2);
  }
  _onDragProgress(t2) {
    const e3 = { e: t2, target: this._dragSource, dragSource: this._dragSource, dropTarget: this._draggedoverTarget };
    this.fire("drag", e3), this._dragSource && this._dragSource.fire("drag", e3);
  }
  findDragTargets(t2) {
    this.targets = [];
    return { target: this._searchPossibleTargets(this._objects, this.getViewportPoint(t2)), targets: [...this.targets] };
  }
  _onDragOver(t2) {
    const e3 = "dragover", { target: s2, targets: i2 } = this.findDragTargets(t2), r2 = this._dragSource, n2 = { e: t2, target: s2, subTargets: i2, dragSource: r2, canDrop: false, dropTarget: undefined };
    let o2;
    this.fire(e3, n2), this._fireEnterLeaveEvents(s2, n2), s2 && (s2.canDrop(t2) && (o2 = s2), s2.fire(e3, n2));
    for (let s3 = 0;s3 < i2.length; s3++) {
      const r3 = i2[s3];
      r3.canDrop(t2) && (o2 = r3), r3.fire(e3, n2);
    }
    this._renderDragEffects(t2, r2, o2), this._dropTarget = o2;
  }
  _onDragEnter(t2) {
    const { target: e3, targets: s2 } = this.findDragTargets(t2), i2 = { e: t2, target: e3, subTargets: s2, dragSource: this._dragSource };
    this.fire("dragenter", i2), this._fireEnterLeaveEvents(e3, i2);
  }
  _onDragLeave(t2) {
    const e3 = { e: t2, target: this._draggedoverTarget, subTargets: this.targets, dragSource: this._dragSource };
    this.fire("dragleave", e3), this._fireEnterLeaveEvents(undefined, e3), this._renderDragEffects(t2, this._dragSource), this._dropTarget = undefined, this.targets = [], this._hoveredTargets = [];
  }
  _onDrop(t2) {
    const { target: e3, targets: i2 } = this.findDragTargets(t2), r2 = this._basicEventHandler("drop:before", s({ e: t2, target: e3, subTargets: i2, dragSource: this._dragSource }, jn(this, t2)));
    r2.didDrop = false, r2.dropTarget = undefined, this._basicEventHandler("drop", r2), this.fire("drop:after", r2);
  }
  _onContextMenu(t2) {
    const e3 = this.findTarget(t2), s2 = this.targets || [], i2 = this._basicEventHandler("contextmenu:before", { e: t2, target: e3, subTargets: s2 });
    return this.stopContextMenu && oe(t2), this._basicEventHandler("contextmenu", i2), false;
  }
  _onClick(t2) {
    const e3 = t2.detail;
    e3 > 3 || e3 < 2 || (this._cacheTransformEventData(t2), e3 == 2 && t2.type === "dblclick" && this._handleEvent(t2, "dblclick"), e3 == 3 && this._handleEvent(t2, "tripleclick"), this._resetTransformEventData());
  }
  getPointerId(t2) {
    const e3 = t2.changedTouches;
    return e3 ? e3[0] && e3[0].identifier : this.enablePointerEvents ? t2.pointerId : -1;
  }
  _isMainEvent(t2) {
    return t2.isPrimary === true || t2.isPrimary !== false && (t2.type === "touchend" && t2.touches.length === 0 || (!t2.changedTouches || t2.changedTouches[0].identifier === this.mainTouchId));
  }
  _onTouchStart(t2) {
    let e3 = !this.allowTouchScrolling;
    const s2 = this._activeObject;
    this.mainTouchId === undefined && (this.mainTouchId = this.getPointerId(t2)), this.__onMouseDown(t2), (this.isDrawingMode || s2 && this._target === s2) && (e3 = true), e3 && t2.preventDefault(), this._resetTransformEventData();
    const i2 = this.upperCanvasEl, r2 = this._getEventPrefix(), n2 = Kt(i2);
    Fn(n2, "touchend", this._onTouchEnd, An), e3 && Fn(n2, "touchmove", this._onMouseMove, An), Ln(i2, "".concat(r2, "down"), this._onMouseDown);
  }
  _onMouseDown(t2) {
    this.__onMouseDown(t2), this._resetTransformEventData();
    const e3 = this.upperCanvasEl, s2 = this._getEventPrefix();
    Ln(e3, "".concat(s2, "move"), this._onMouseMove, An);
    const i2 = Kt(e3);
    Fn(i2, "".concat(s2, "up"), this._onMouseUp), Fn(i2, "".concat(s2, "move"), this._onMouseMove, An);
  }
  _onTouchEnd(t2) {
    if (t2.touches.length > 0)
      return;
    this.__onMouseUp(t2), this._resetTransformEventData(), delete this.mainTouchId;
    const e3 = this._getEventPrefix(), s2 = Kt(this.upperCanvasEl);
    Ln(s2, "touchend", this._onTouchEnd, An), Ln(s2, "touchmove", this._onMouseMove, An), this._willAddMouseDown && clearTimeout(this._willAddMouseDown), this._willAddMouseDown = setTimeout(() => {
      Fn(this.upperCanvasEl, "".concat(e3, "down"), this._onMouseDown), this._willAddMouseDown = 0;
    }, 400);
  }
  _onMouseUp(t2) {
    this.__onMouseUp(t2), this._resetTransformEventData();
    const e3 = this.upperCanvasEl, s2 = this._getEventPrefix();
    if (this._isMainEvent(t2)) {
      const t3 = Kt(this.upperCanvasEl);
      Ln(t3, "".concat(s2, "up"), this._onMouseUp), Ln(t3, "".concat(s2, "move"), this._onMouseMove, An), Fn(e3, "".concat(s2, "move"), this._onMouseMove, An);
    }
  }
  _onMouseMove(t2) {
    const e3 = this.getActiveObject();
    !this.allowTouchScrolling && (!e3 || !e3.shouldStartDragging(t2)) && t2.preventDefault && t2.preventDefault(), this.__onMouseMove(t2);
  }
  _onResize() {
    this.calcOffset(), this._resetTransformEventData();
  }
  _shouldRender(t2) {
    const e3 = this.getActiveObject();
    return !!e3 != !!t2 || e3 && t2 && e3 !== t2;
  }
  __onMouseUp(t2) {
    var e3;
    this._cacheTransformEventData(t2), this._handleEvent(t2, "up:before");
    const s2 = this._currentTransform, i2 = this._isClick, r2 = this._target, { button: n2 } = t2;
    if (n2)
      return (this.fireMiddleClick && n2 === 1 || this.fireRightClick && n2 === 2) && this._handleEvent(t2, "up"), void this._resetTransformEventData();
    if (this.isDrawingMode && this._isCurrentlyDrawing)
      return void this._onMouseUpInDrawingMode(t2);
    if (!this._isMainEvent(t2))
      return;
    let o2, a2, h2 = false;
    if (s2 && (this._finalizeCurrentTransform(t2), h2 = s2.actionPerformed), !i2) {
      const e4 = r2 === this._activeObject;
      this.handleSelection(t2), h2 || (h2 = this._shouldRender(r2) || !e4 && r2 === this._activeObject);
    }
    if (r2) {
      const e4 = r2.findControl(this.getViewportPoint(t2), ne(t2)), { key: i3, control: n3 } = e4 || {};
      if (a2 = i3, r2.selectable && r2 !== this._activeObject && r2.activeOn === "up")
        this.setActiveObject(r2, t2), h2 = true;
      else if (n3) {
        const e5 = n3.getMouseUpHandler(t2, r2, n3);
        e5 && (o2 = this.getScenePoint(t2), e5.call(n3, t2, s2, o2.x, o2.y));
      }
      r2.isMoving = false;
    }
    if (s2 && (s2.target !== r2 || s2.corner !== a2)) {
      const e4 = s2.target && s2.target.controls[s2.corner], i3 = e4 && e4.getMouseUpHandler(t2, s2.target, e4);
      o2 = o2 || this.getScenePoint(t2), i3 && i3.call(e4, t2, s2, o2.x, o2.y);
    }
    this._setCursorFromEvent(t2, r2), this._handleEvent(t2, "up"), this._groupSelector = null, this._currentTransform = null, r2 && (r2.__corner = undefined), h2 ? this.requestRenderAll() : i2 || (e3 = this._activeObject) !== null && e3 !== undefined && e3.isEditing || this.renderTop();
  }
  _basicEventHandler(t2, e3) {
    const { target: s2, subTargets: i2 = [] } = e3;
    this.fire(t2, e3), s2 && s2.fire(t2, e3);
    for (let r2 = 0;r2 < i2.length; r2++)
      i2[r2] !== s2 && i2[r2].fire(t2, e3);
    return e3;
  }
  _handleEvent(t2, e3, i2) {
    const r2 = this._target, n2 = this.targets || [], o2 = s(s(s({ e: t2, target: r2, subTargets: n2 }, jn(this, t2)), {}, { transform: this._currentTransform }, e3 === "up:before" || e3 === "up" ? { isClick: this._isClick, currentTarget: this.findTarget(t2), currentSubTargets: this.targets } : {}), e3 === "down:before" || e3 === "down" ? i2 : {});
    this.fire("mouse:".concat(e3), o2), r2 && r2.fire("mouse".concat(e3), o2);
    for (let t3 = 0;t3 < n2.length; t3++)
      n2[t3] !== r2 && n2[t3].fire("mouse".concat(e3), o2);
  }
  _onMouseDownInDrawingMode(t2) {
    this._isCurrentlyDrawing = true, this.getActiveObject() && (this.discardActiveObject(t2), this.requestRenderAll());
    const e3 = this.getScenePoint(t2);
    this.freeDrawingBrush && this.freeDrawingBrush.onMouseDown(e3, { e: t2, pointer: e3 }), this._handleEvent(t2, "down", { alreadySelected: false });
  }
  _onMouseMoveInDrawingMode(t2) {
    if (this._isCurrentlyDrawing) {
      const e3 = this.getScenePoint(t2);
      this.freeDrawingBrush && this.freeDrawingBrush.onMouseMove(e3, { e: t2, pointer: e3 });
    }
    this.setCursor(this.freeDrawingCursor), this._handleEvent(t2, "move");
  }
  _onMouseUpInDrawingMode(t2) {
    const e3 = this.getScenePoint(t2);
    this.freeDrawingBrush ? this._isCurrentlyDrawing = !!this.freeDrawingBrush.onMouseUp({ e: t2, pointer: e3 }) : this._isCurrentlyDrawing = false, this._handleEvent(t2, "up");
  }
  __onMouseDown(t2) {
    this._isClick = true, this._cacheTransformEventData(t2), this._handleEvent(t2, "down:before");
    let e3 = this._target, s2 = !!e3 && e3 === this._activeObject;
    const { button: i2 } = t2;
    if (i2)
      return (this.fireMiddleClick && i2 === 1 || this.fireRightClick && i2 === 2) && this._handleEvent(t2, "down", { alreadySelected: s2 }), void this._resetTransformEventData();
    if (this.isDrawingMode)
      return void this._onMouseDownInDrawingMode(t2);
    if (!this._isMainEvent(t2))
      return;
    if (this._currentTransform)
      return;
    let r2 = this._shouldRender(e3), n2 = false;
    if (this.handleMultiSelection(t2, e3) ? (e3 = this._activeObject, n2 = true, r2 = true) : this._shouldClearSelection(t2, e3) && this.discardActiveObject(t2), this.selection && (!e3 || !e3.selectable && !e3.isEditing && e3 !== this._activeObject)) {
      const e4 = this.getScenePoint(t2);
      this._groupSelector = { x: e4.x, y: e4.y, deltaY: 0, deltaX: 0 };
    }
    if (s2 = !!e3 && e3 === this._activeObject, e3) {
      e3.selectable && e3.activeOn === "down" && this.setActiveObject(e3, t2);
      const i3 = e3.findControl(this.getViewportPoint(t2), ne(t2));
      if (e3 === this._activeObject && (i3 || !n2)) {
        this._setupCurrentTransform(t2, e3, s2);
        const r3 = i3 ? i3.control : undefined, n3 = this.getScenePoint(t2), o2 = r3 && r3.getMouseDownHandler(t2, e3, r3);
        o2 && o2.call(r3, t2, this._currentTransform, n3.x, n3.y);
      }
    }
    r2 && (this._objectsToRender = undefined), this._handleEvent(t2, "down", { alreadySelected: s2 }), r2 && this.requestRenderAll();
  }
  _resetTransformEventData() {
    this._target = this._pointer = this._absolutePointer = undefined;
  }
  _cacheTransformEventData(t2) {
    this._resetTransformEventData(), this._pointer = this.getViewportPoint(t2), this._absolutePointer = pe(this._pointer, undefined, this.viewportTransform), this._target = this._currentTransform ? this._currentTransform.target : this.findTarget(t2);
  }
  __onMouseMove(t2) {
    if (this._isClick = false, this._cacheTransformEventData(t2), this._handleEvent(t2, "move:before"), this.isDrawingMode)
      return void this._onMouseMoveInDrawingMode(t2);
    if (!this._isMainEvent(t2))
      return;
    const e3 = this._groupSelector;
    if (e3) {
      const s2 = this.getScenePoint(t2);
      e3.deltaX = s2.x - e3.x, e3.deltaY = s2.y - e3.y, this.renderTop();
    } else if (this._currentTransform)
      this._transformObject(t2);
    else {
      const e4 = this.findTarget(t2);
      this._setCursorFromEvent(t2, e4), this._fireOverOutEvents(t2, e4);
    }
    this.textEditingManager.onMouseMove(t2), this._handleEvent(t2, "move"), this._resetTransformEventData();
  }
  _fireOverOutEvents(t2, e3) {
    const s2 = this._hoveredTarget, i2 = this._hoveredTargets, r2 = this.targets, n2 = Math.max(i2.length, r2.length);
    this.fireSyntheticInOutEvents("mouse", { e: t2, target: e3, oldTarget: s2, fireCanvas: true });
    for (let e4 = 0;e4 < n2; e4++)
      this.fireSyntheticInOutEvents("mouse", { e: t2, target: r2[e4], oldTarget: i2[e4] });
    this._hoveredTarget = e3, this._hoveredTargets = this.targets.concat();
  }
  _fireEnterLeaveEvents(t2, e3) {
    const i2 = this._draggedoverTarget, r2 = this._hoveredTargets, n2 = this.targets, o2 = Math.max(r2.length, n2.length);
    this.fireSyntheticInOutEvents("drag", s(s({}, e3), {}, { target: t2, oldTarget: i2, fireCanvas: true }));
    for (let t3 = 0;t3 < o2; t3++)
      this.fireSyntheticInOutEvents("drag", s(s({}, e3), {}, { target: n2[t3], oldTarget: r2[t3] }));
    this._draggedoverTarget = t2;
  }
  fireSyntheticInOutEvents(t2, e3) {
    let { target: r2, oldTarget: n2, fireCanvas: o2, e: a2 } = e3, h2 = i(e3, En);
    const { targetIn: c2, targetOut: l2, canvasIn: u2, canvasOut: d2 } = Rn[t2], g2 = n2 !== r2;
    if (n2 && g2) {
      const t3 = s(s({}, h2), {}, { e: a2, target: n2, nextTarget: r2 }, jn(this, a2));
      o2 && this.fire(d2, t3), n2.fire(l2, t3);
    }
    if (r2 && g2) {
      const t3 = s(s({}, h2), {}, { e: a2, target: r2, previousTarget: n2 }, jn(this, a2));
      o2 && this.fire(u2, t3), r2.fire(c2, t3);
    }
  }
  __onMouseWheel(t2) {
    this._cacheTransformEventData(t2), this._handleEvent(t2, "wheel"), this._resetTransformEventData();
  }
  _transformObject(t2) {
    const e3 = this.getScenePoint(t2), s2 = this._currentTransform, i2 = s2.target, r2 = i2.group ? pe(e3, undefined, i2.group.calcTransformMatrix()) : e3;
    s2.shiftKey = t2.shiftKey, s2.altKey = !!this.centeredKey && t2[this.centeredKey], this._performTransformAction(t2, s2, r2), s2.actionPerformed && this.requestRenderAll();
  }
  _performTransformAction(t2, e3, s2) {
    const { action: i2, actionHandler: r2, target: n2 } = e3, o2 = !!r2 && r2(t2, e3, s2.x, s2.y);
    o2 && n2.setCoords(), i2 === "drag" && o2 && (e3.target.isMoving = true, this.setCursor(e3.target.moveCursor || this.moveCursor)), e3.actionPerformed = e3.actionPerformed || o2;
  }
  _setCursorFromEvent(t2, e3) {
    if (!e3)
      return void this.setCursor(this.defaultCursor);
    let s2 = e3.hoverCursor || this.hoverCursor;
    const i2 = Ut(this._activeObject) ? this._activeObject : null, r2 = (!i2 || e3.group !== i2) && e3.findControl(this.getViewportPoint(t2));
    if (r2) {
      const s3 = r2.control;
      this.setCursor(s3.cursorStyleHandler(t2, s3, e3));
    } else
      e3.subTargetCheck && this.targets.concat().reverse().map((t3) => {
        s2 = t3.hoverCursor || s2;
      }), this.setCursor(s2);
  }
  handleMultiSelection(t2, e3) {
    const s2 = this._activeObject, i2 = Ut(s2);
    if (s2 && this._isSelectionKeyPressed(t2) && this.selection && e3 && e3.selectable && (s2 !== e3 || i2) && (i2 || !e3.isDescendantOf(s2) && !s2.isDescendantOf(e3)) && !e3.onSelect({ e: t2 }) && !s2.getActiveControl()) {
      if (i2) {
        const i3 = s2.getObjects();
        if (e3 === s2) {
          const s3 = this.getViewportPoint(t2);
          if (!(e3 = this.searchPossibleTargets(i3, s3) || this.searchPossibleTargets(this._objects, s3)) || !e3.selectable)
            return false;
        }
        e3.group === s2 ? (s2.remove(e3), this._hoveredTarget = e3, this._hoveredTargets = [...this.targets], s2.size() === 1 && this._setActiveObject(s2.item(0), t2)) : (s2.multiSelectAdd(e3), this._hoveredTarget = s2, this._hoveredTargets = [...this.targets]), this._fireSelectionEvents(i3, t2);
      } else {
        s2.isEditing && s2.exitEditing();
        const i3 = new (tt.getClass("ActiveSelection"))([], { canvas: this });
        i3.multiSelectAdd(s2, e3), this._hoveredTarget = i3, this._setActiveObject(i3, t2), this._fireSelectionEvents([s2], t2);
      }
      return true;
    }
    return false;
  }
  handleSelection(t2) {
    if (!this.selection || !this._groupSelector)
      return false;
    const { x: e3, y: s2, deltaX: i2, deltaY: r2 } = this._groupSelector, n2 = new ot(e3, s2), o2 = n2.add(new ot(i2, r2)), a2 = n2.min(o2), h2 = n2.max(o2).subtract(a2), c2 = this.collectObjects({ left: a2.x, top: a2.y, width: h2.x, height: h2.y }, { includeIntersecting: !this.selectionFullyContained }), l2 = n2.eq(o2) ? c2[0] ? [c2[0]] : [] : c2.length > 1 ? c2.filter((e4) => !e4.onSelect({ e: t2 })).reverse() : c2;
    if (l2.length === 1)
      this.setActiveObject(l2[0], t2);
    else if (l2.length > 1) {
      const e4 = tt.getClass("ActiveSelection");
      this.setActiveObject(new e4(l2, { canvas: this }), t2);
    }
    return this._groupSelector = null, true;
  }
  clear() {
    this.textEditingManager.clear(), super.clear();
  }
  destroy() {
    this.removeListeners(), this.textEditingManager.dispose(), super.destroy();
  }
}
var Bn = { x1: 0, y1: 0, x2: 0, y2: 0 };
var Xn = s(s({}, Bn), {}, { r1: 0, r2: 0 });
var Yn = (t2, e3) => isNaN(t2) && typeof e3 == "number" ? e3 : t2;
var Wn = /^(\d+\.\d+)%|(\d+)%$/;
function Vn(t2) {
  return t2 && Wn.test(t2);
}
function zn(t2, e3) {
  const s2 = typeof t2 == "number" ? t2 : typeof t2 == "string" ? parseFloat(t2) / (Vn(t2) ? 100 : 1) : NaN;
  return ks(0, Yn(s2, e3), 1);
}
var Gn = /\s*;\s*/;
var Hn = /\s*:\s*/;
function Nn(t2, e3) {
  let s2, i2;
  const r2 = t2.getAttribute("style");
  if (r2) {
    const t3 = r2.split(Gn);
    t3[t3.length - 1] === "" && t3.pop();
    for (let e4 = t3.length;e4--; ) {
      const [r3, n3] = t3[e4].split(Hn).map((t4) => t4.trim());
      r3 === "stop-color" ? s2 = n3 : r3 === "stop-opacity" && (i2 = n3);
    }
  }
  const n2 = new Le(s2 || t2.getAttribute("stop-color") || "rgb(0,0,0)");
  return { offset: zn(t2.getAttribute("offset"), 0), color: n2.toRgb(), opacity: Yn(parseFloat(i2 || t2.getAttribute("stop-opacity") || ""), 1) * n2.getAlpha() * e3 };
}
function Un(t2, e3) {
  const s2 = [], i2 = t2.getElementsByTagName("stop"), r2 = zn(e3, 1);
  for (let t3 = i2.length;t3--; )
    s2.push(Nn(i2[t3], r2));
  return s2;
}
function qn(t2) {
  return t2.nodeName === "linearGradient" || t2.nodeName === "LINEARGRADIENT" ? "linear" : "radial";
}
function Kn(t2) {
  return t2.getAttribute("gradientUnits") === "userSpaceOnUse" ? "pixels" : "percentage";
}
function Jn(t2, e3) {
  return t2.getAttribute(e3);
}
function Qn(t2, e3) {
  return function(t3, e4) {
    let s2, { width: i2, height: r2, gradientUnits: n2 } = e4;
    return Object.keys(t3).reduce((e5, o2) => {
      const a2 = t3[o2];
      return a2 === "Infinity" ? s2 = 1 : a2 === "-Infinity" ? s2 = 0 : (s2 = typeof a2 == "string" ? parseFloat(a2) : a2, typeof a2 == "string" && Vn(a2) && (s2 *= 0.01, n2 === "pixels" && (o2 !== "x1" && o2 !== "x2" && o2 !== "r2" || (s2 *= i2), o2 !== "y1" && o2 !== "y2" || (s2 *= r2)))), e5[o2] = s2, e5;
    }, {});
  }(qn(t2) === "linear" ? function(t3) {
    return { x1: Jn(t3, "x1") || 0, y1: Jn(t3, "y1") || 0, x2: Jn(t3, "x2") || "100%", y2: Jn(t3, "y2") || 0 };
  }(t2) : function(t3) {
    return { x1: Jn(t3, "fx") || Jn(t3, "cx") || "50%", y1: Jn(t3, "fy") || Jn(t3, "cy") || "50%", r1: 0, x2: Jn(t3, "cx") || "50%", y2: Jn(t3, "cy") || "50%", r2: Jn(t3, "r") || "50%" };
  }(t2), s(s({}, e3), {}, { gradientUnits: Kn(t2) }));
}

class Zn {
  constructor(t2) {
    const { type: e3 = "linear", gradientUnits: i2 = "pixels", coords: r2 = {}, colorStops: n2 = [], offsetX: o2 = 0, offsetY: a2 = 0, gradientTransform: h2, id: c2 } = t2 || {};
    Object.assign(this, { type: e3, gradientUnits: i2, coords: s(s({}, e3 === "radial" ? Xn : Bn), r2), colorStops: n2, offsetX: o2, offsetY: a2, gradientTransform: h2, id: c2 ? "".concat(c2, "_").concat(ft()) : ft() });
  }
  addColorStop(t2) {
    for (const e3 in t2) {
      const s2 = new Le(t2[e3]);
      this.colorStops.push({ offset: parseFloat(e3), color: s2.toRgb(), opacity: s2.getAlpha() });
    }
    return this;
  }
  toObject(t2) {
    return s(s({}, Yt(this, t2)), {}, { type: this.type, coords: s({}, this.coords), colorStops: this.colorStops.map((t3) => s({}, t3)), offsetX: this.offsetX, offsetY: this.offsetY, gradientUnits: this.gradientUnits, gradientTransform: this.gradientTransform ? [...this.gradientTransform] : undefined });
  }
  toSVG(t2) {
    let { additionalTransform: e3 } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const i2 = [], r2 = this.gradientTransform ? this.gradientTransform.concat() : T.concat(), n2 = this.gradientUnits === "pixels" ? "userSpaceOnUse" : "objectBoundingBox", o2 = this.colorStops.map((t3) => s({}, t3)).sort((t3, e4) => t3.offset - e4.offset);
    let a2 = -this.offsetX, h2 = -this.offsetY;
    var c2;
    n2 === "objectBoundingBox" ? (a2 /= t2.width, h2 /= t2.height) : (a2 += t2.width / 2, h2 += t2.height / 2), (c2 = t2) && typeof c2._renderPathCommands == "function" && this.gradientUnits !== "percentage" && (a2 -= t2.pathOffset.x, h2 -= t2.pathOffset.y), r2[4] -= a2, r2[5] -= h2;
    const l2 = ['id="SVGID_'.concat(this.id, '"'), 'gradientUnits="'.concat(n2, '"'), 'gradientTransform="'.concat(e3 ? e3 + " " : "").concat(zt(r2), '"'), ""].join(" ");
    if (this.type === "linear") {
      const { x1: t3, y1: e4, x2: s2, y2: r3 } = this.coords;
      i2.push("<linearGradient ", l2, ' x1="', t3, '" y1="', e4, '" x2="', s2, '" y2="', r3, `">
`);
    } else if (this.type === "radial") {
      const { x1: t3, y1: e4, x2: s2, y2: r3, r1: n3, r2: a3 } = this.coords, h3 = n3 > a3;
      i2.push("<radialGradient ", l2, ' cx="', h3 ? t3 : s2, '" cy="', h3 ? e4 : r3, '" r="', h3 ? n3 : a3, '" fx="', h3 ? s2 : t3, '" fy="', h3 ? r3 : e4, `">
`), h3 && (o2.reverse(), o2.forEach((t4) => {
        t4.offset = 1 - t4.offset;
      }));
      const c3 = Math.min(n3, a3);
      if (c3 > 0) {
        const t4 = c3 / Math.max(n3, a3);
        o2.forEach((e5) => {
          e5.offset += t4 * (1 - e5.offset);
        });
      }
    }
    return o2.forEach((t3) => {
      let { color: e4, offset: s2, opacity: r3 } = t3;
      i2.push("<stop ", 'offset="', 100 * s2 + "%", '" style="stop-color:', e4, r3 !== undefined ? ";stop-opacity: " + r3 : ";", `"/>
`);
    }), i2.push(this.type === "linear" ? "</linearGradient>" : "</radialGradient>", `
`), i2.join("");
  }
  toLive(t2) {
    const { x1: e3, y1: s2, x2: i2, y2: r2, r1: n2, r2: o2 } = this.coords, a2 = this.type === "linear" ? t2.createLinearGradient(e3, s2, i2, r2) : t2.createRadialGradient(e3, s2, n2, i2, r2, o2);
    return this.colorStops.forEach((t3) => {
      let { color: e4, opacity: s3, offset: i3 } = t3;
      a2.addColorStop(i3, s3 !== undefined ? new Le(e4).setAlpha(s3).toRgba() : e4);
    }), a2;
  }
  static async fromObject(t2) {
    const { colorStops: e3, gradientTransform: i2 } = t2;
    return new this(s(s({}, t2), {}, { colorStops: e3 ? e3.map((t3) => s({}, t3)) : undefined, gradientTransform: i2 ? [...i2] : undefined }));
  }
  static fromElement(t2, e3, i2) {
    const r2 = Kn(t2), n2 = e3._findCenterFromElement();
    return new this(s({ id: t2.getAttribute("id") || undefined, type: qn(t2), coords: Qn(t2, { width: i2.viewBoxWidth || i2.width, height: i2.viewBoxHeight || i2.height }), colorStops: Un(t2, i2.opacity), gradientUnits: r2, gradientTransform: br(t2.getAttribute("gradientTransform") || "") }, r2 === "pixels" ? { offsetX: e3.width / 2 - n2.x, offsetY: e3.height / 2 - n2.y } : { offsetX: 0, offsetY: 0 }));
  }
}
t(Zn, "type", "Gradient"), tt.setClass(Zn, "gradient"), tt.setClass(Zn, "linear"), tt.setClass(Zn, "radial");
var $n = ["type", "source", "patternTransform"];

class to {
  get type() {
    return "pattern";
  }
  set type(t2) {
    a("warn", "Setting type has no effect", t2);
  }
  constructor(e3) {
    t(this, "repeat", "repeat"), t(this, "offsetX", 0), t(this, "offsetY", 0), t(this, "crossOrigin", ""), this.id = ft(), Object.assign(this, e3);
  }
  isImageSource() {
    return !!this.source && typeof this.source.src == "string";
  }
  isCanvasSource() {
    return !!this.source && !!this.source.toDataURL;
  }
  sourceToString() {
    return this.isImageSource() ? this.source.src : this.isCanvasSource() ? this.source.toDataURL() : "";
  }
  toLive(t2) {
    return this.source && (!this.isImageSource() || this.source.complete && this.source.naturalWidth !== 0 && this.source.naturalHeight !== 0) ? t2.createPattern(this.source, this.repeat) : null;
  }
  toObject() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    const { repeat: e3, crossOrigin: i2 } = this;
    return s(s({}, Yt(this, t2)), {}, { type: "pattern", source: this.sourceToString(), repeat: e3, crossOrigin: i2, offsetX: Vt(this.offsetX, o.NUM_FRACTION_DIGITS), offsetY: Vt(this.offsetY, o.NUM_FRACTION_DIGITS), patternTransform: this.patternTransform ? [...this.patternTransform] : null });
  }
  toSVG(t2) {
    let { width: e3, height: s2 } = t2;
    const { source: i2, repeat: r2, id: n2 } = this, o2 = Yn(this.offsetX / e3, 0), a2 = Yn(this.offsetY / s2, 0), h2 = r2 === "repeat-y" || r2 === "no-repeat" ? 1 + Math.abs(o2 || 0) : Yn(i2.width / e3, 0), c2 = r2 === "repeat-x" || r2 === "no-repeat" ? 1 + Math.abs(a2 || 0) : Yn(i2.height / s2, 0);
    return ['<pattern id="SVGID_'.concat(n2, '" x="').concat(o2, '" y="').concat(a2, '" width="').concat(h2, '" height="').concat(c2, '">'), '<image x="0" y="0" width="'.concat(i2.width, '" height="').concat(i2.height, '" xlink:href="').concat(this.sourceToString(), '"></image>'), "</pattern>", ""].join(`
`);
  }
  static async fromObject(t2, e3) {
    let { type: r2, source: n2, patternTransform: o2 } = t2, a2 = i(t2, $n);
    const h2 = await It(n2, s(s({}, e3), {}, { crossOrigin: a2.crossOrigin }));
    return new this(s(s({}, a2), {}, { patternTransform: o2 && o2.slice(0), source: h2 }));
  }
}
t(to, "type", "Pattern"), tt.setClass(to), tt.setClass(to, "pattern");
var so = ["path", "left", "top"];
var io = ["d"];

class ro extends ji {
  constructor(t2) {
    let e3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}, { path: s2, left: r2, top: n2 } = e3, o2 = i(e3, so);
    super(), Object.assign(this, ro.ownDefaults), this.setOptions(o2), this._setPath(t2 || [], true), typeof r2 == "number" && this.set(M, r2), typeof n2 == "number" && this.set(P, n2);
  }
  _setPath(t2, e3) {
    this.path = sn(Array.isArray(t2) ? t2 : xn(t2)), this.setBoundingBox(e3);
  }
  _findCenterFromElement() {
    const t2 = this._calcBoundsFromPath();
    return new ot(t2.left + t2.width / 2, t2.top + t2.height / 2);
  }
  _renderPathCommands(t2) {
    const e3 = -this.pathOffset.x, s2 = -this.pathOffset.y;
    t2.beginPath();
    for (const i2 of this.path)
      switch (i2[0]) {
        case "L":
          t2.lineTo(i2[1] + e3, i2[2] + s2);
          break;
        case "M":
          t2.moveTo(i2[1] + e3, i2[2] + s2);
          break;
        case "C":
          t2.bezierCurveTo(i2[1] + e3, i2[2] + s2, i2[3] + e3, i2[4] + s2, i2[5] + e3, i2[6] + s2);
          break;
        case "Q":
          t2.quadraticCurveTo(i2[1] + e3, i2[2] + s2, i2[3] + e3, i2[4] + s2);
          break;
        case "Z":
          t2.closePath();
      }
  }
  _render(t2) {
    this._renderPathCommands(t2), this._renderPaintInOrder(t2);
  }
  toString() {
    return "#<Path (".concat(this.complexity(), '): { "top": ').concat(this.top, ', "left": ').concat(this.left, " }>");
  }
  toObject() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return s(s({}, super.toObject(t2)), {}, { path: this.path.map((t3) => t3.slice()) });
  }
  toDatalessObject() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    const e3 = this.toObject(t2);
    return this.sourcePath && (delete e3.path, e3.sourcePath = this.sourcePath), e3;
  }
  _toSVG() {
    const t2 = bn(this.path, o.NUM_FRACTION_DIGITS);
    return ["<path ", "COMMON_PARTS", 'd="'.concat(t2, `" stroke-linecap="round" />
`)];
  }
  _getOffsetTransform() {
    const t2 = o.NUM_FRACTION_DIGITS;
    return " translate(".concat(Vt(-this.pathOffset.x, t2), ", ").concat(Vt(-this.pathOffset.y, t2), ")");
  }
  toClipPathSVG(t2) {
    const e3 = this._getOffsetTransform();
    return "\t" + this._createBaseClipPathSVGMarkup(this._toSVG(), { reviver: t2, additionalTransform: e3 });
  }
  toSVG(t2) {
    const e3 = this._getOffsetTransform();
    return this._createBaseSVGMarkup(this._toSVG(), { reviver: t2, additionalTransform: e3 });
  }
  complexity() {
    return this.path.length;
  }
  setDimensions() {
    this.setBoundingBox();
  }
  setBoundingBox(t2) {
    const { width: e3, height: s2, pathOffset: i2 } = this._calcDimensions();
    this.set({ width: e3, height: s2, pathOffset: i2 }), t2 && this.setPositionByOrigin(i2, D, D);
  }
  _calcBoundsFromPath() {
    const t2 = [];
    let e3 = 0, s2 = 0, i2 = 0, r2 = 0;
    for (const n2 of this.path)
      switch (n2[0]) {
        case "L":
          i2 = n2[1], r2 = n2[2], t2.push({ x: e3, y: s2 }, { x: i2, y: r2 });
          break;
        case "M":
          i2 = n2[1], r2 = n2[2], e3 = i2, s2 = r2;
          break;
        case "C":
          t2.push(...tn(i2, r2, n2[1], n2[2], n2[3], n2[4], n2[5], n2[6])), i2 = n2[5], r2 = n2[6];
          break;
        case "Q":
          t2.push(...tn(i2, r2, n2[1], n2[2], n2[1], n2[2], n2[3], n2[4])), i2 = n2[3], r2 = n2[4];
          break;
        case "Z":
          i2 = e3, r2 = s2;
      }
    return ae(t2);
  }
  _calcDimensions() {
    const t2 = this._calcBoundsFromPath();
    return s(s({}, t2), {}, { pathOffset: new ot(t2.left + t2.width / 2, t2.top + t2.height / 2) });
  }
  static fromObject(t2) {
    return this._fromObject(t2, { extraParam: "path" });
  }
  static async fromElement(t2, e3, r2) {
    const n2 = Dr(t2, this.ATTRIBUTE_NAMES, r2), { d: o2 } = n2;
    return new this(o2, s(s(s({}, i(n2, io)), e3), {}, { left: undefined, top: undefined }));
  }
}
t(ro, "type", "Path"), t(ro, "cacheProperties", [...Ms, "path", "fillRule"]), t(ro, "ATTRIBUTE_NAMES", [...Ji, "d"]), tt.setClass(ro), tt.setSVGClass(ro);
var oo = ["left", "top", "radius"];
var ao = ["radius", "startAngle", "endAngle", "counterClockwise"];

class ho extends ji {
  static getDefaults() {
    return s(s({}, super.getDefaults()), ho.ownDefaults);
  }
  constructor(t2) {
    super(), Object.assign(this, ho.ownDefaults), this.setOptions(t2);
  }
  _set(t2, e3) {
    return super._set(t2, e3), t2 === "radius" && this.setRadius(e3), this;
  }
  _render(t2) {
    t2.beginPath(), t2.arc(0, 0, this.radius, xt(this.startAngle), xt(this.endAngle), this.counterClockwise), this._renderPaintInOrder(t2);
  }
  getRadiusX() {
    return this.get("radius") * this.get(H);
  }
  getRadiusY() {
    return this.get("radius") * this.get(N);
  }
  setRadius(t2) {
    this.radius = t2, this.set({ width: 2 * t2, height: 2 * t2 });
  }
  toObject() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return super.toObject([...ao, ...t2]);
  }
  _toSVG() {
    const t2 = (this.endAngle - this.startAngle) % 360;
    if (t2 === 0)
      return ["<circle ", "COMMON_PARTS", 'cx="0" cy="0" ', 'r="', "".concat(this.radius), `" />
`];
    {
      const { radius: e3 } = this, s2 = xt(this.startAngle), i2 = xt(this.endAngle), r2 = rt(s2) * e3, n2 = nt(s2) * e3, o2 = rt(i2) * e3, a2 = nt(i2) * e3, h2 = t2 > 180 ? 1 : 0, c2 = this.counterClockwise ? 0 : 1;
      return ['<path d="M '.concat(r2, " ").concat(n2, " A ").concat(e3, " ").concat(e3, " 0 ").concat(h2, " ").concat(c2, " ").concat(o2, " ").concat(a2, '" '), "COMMON_PARTS", ` />
`];
    }
  }
  static async fromElement(t2, e3, r2) {
    const n2 = Dr(t2, this.ATTRIBUTE_NAMES, r2), { left: o2 = 0, top: a2 = 0, radius: h2 = 0 } = n2;
    return new this(s(s({}, i(n2, oo)), {}, { radius: h2, left: o2 - h2, top: a2 - h2 }));
  }
  static fromObject(t2) {
    return super._fromObject(t2);
  }
}
t(ho, "type", "Circle"), t(ho, "cacheProperties", [...Ms, ...ao]), t(ho, "ownDefaults", { radius: 0, startAngle: 0, endAngle: 360, counterClockwise: false }), t(ho, "ATTRIBUTE_NAMES", ["cx", "cy", "r", ...Ji]), tt.setClass(ho), tt.setSVGClass(ho);
var go = ["x1", "y1", "x2", "y2"];
var fo = ["x1", "y1", "x2", "y2"];
var po = ["x1", "x2", "y1", "y2"];

class mo extends ji {
  constructor() {
    let [t2, e3, s2, i2] = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [0, 0, 0, 0], r2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super(), Object.assign(this, mo.ownDefaults), this.setOptions(r2), this.x1 = t2, this.x2 = s2, this.y1 = e3, this.y2 = i2, this._setWidthHeight();
    const { left: n2, top: o2 } = r2;
    typeof n2 == "number" && this.set(M, n2), typeof o2 == "number" && this.set(P, o2);
  }
  _setWidthHeight() {
    const { x1: t2, y1: e3, x2: s2, y2: i2 } = this;
    this.width = Math.abs(s2 - t2), this.height = Math.abs(i2 - e3);
    const { left: r2, top: n2, width: o2, height: a2 } = ae([{ x: t2, y: e3 }, { x: s2, y: i2 }]), h2 = new ot(r2 + o2 / 2, n2 + a2 / 2);
    this.setPositionByOrigin(h2, D, D);
  }
  _set(t2, e3) {
    return super._set(t2, e3), po.includes(t2) && this._setWidthHeight(), this;
  }
  _render(t2) {
    t2.beginPath();
    const e3 = this.calcLinePoints();
    t2.moveTo(e3.x1, e3.y1), t2.lineTo(e3.x2, e3.y2), t2.lineWidth = this.strokeWidth;
    const s2 = t2.strokeStyle;
    var i2;
    Gt(this.stroke) ? t2.strokeStyle = this.stroke.toLive(t2) : t2.strokeStyle = (i2 = this.stroke) !== null && i2 !== undefined ? i2 : t2.fillStyle;
    this.stroke && this._renderStroke(t2), t2.strokeStyle = s2;
  }
  _findCenterFromElement() {
    return new ot((this.x1 + this.x2) / 2, (this.y1 + this.y2) / 2);
  }
  toObject() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return s(s({}, super.toObject(t2)), this.calcLinePoints());
  }
  _getNonTransformedDimensions() {
    const t2 = super._getNonTransformedDimensions();
    return this.strokeLineCap === "butt" && (this.width === 0 && (t2.y -= this.strokeWidth), this.height === 0 && (t2.x -= this.strokeWidth)), t2;
  }
  calcLinePoints() {
    const { x1: t2, x2: e3, y1: s2, y2: i2, width: r2, height: n2 } = this, o2 = t2 <= e3 ? -1 : 1, a2 = s2 <= i2 ? -1 : 1;
    return { x1: o2 * r2 / 2, x2: o2 * -r2 / 2, y1: a2 * n2 / 2, y2: a2 * -n2 / 2 };
  }
  _toSVG() {
    const { x1: t2, x2: e3, y1: s2, y2: i2 } = this.calcLinePoints();
    return ["<line ", "COMMON_PARTS", 'x1="'.concat(t2, '" y1="').concat(s2, '" x2="').concat(e3, '" y2="').concat(i2, `" />
`)];
  }
  static async fromElement(t2, e3, s2) {
    const r2 = Dr(t2, this.ATTRIBUTE_NAMES, s2), { x1: n2 = 0, y1: o2 = 0, x2: a2 = 0, y2: h2 = 0 } = r2;
    return new this([n2, o2, a2, h2], i(r2, go));
  }
  static fromObject(t2) {
    let { x1: e3, y1: r2, x2: n2, y2: o2 } = t2, a2 = i(t2, fo);
    return this._fromObject(s(s({}, a2), {}, { points: [e3, r2, n2, o2] }), { extraParam: "points" });
  }
}
t(mo, "type", "Line"), t(mo, "cacheProperties", [...Ms, ...po]), t(mo, "ATTRIBUTE_NAMES", Ji.concat(po)), tt.setClass(mo), tt.setSVGClass(mo);

class vo extends ji {
  static getDefaults() {
    return s(s({}, super.getDefaults()), vo.ownDefaults);
  }
  constructor(t2) {
    super(), Object.assign(this, vo.ownDefaults), this.setOptions(t2);
  }
  _render(t2) {
    const e3 = this.width / 2, s2 = this.height / 2;
    t2.beginPath(), t2.moveTo(-e3, s2), t2.lineTo(0, -s2), t2.lineTo(e3, s2), t2.closePath(), this._renderPaintInOrder(t2);
  }
  _toSVG() {
    const t2 = this.width / 2, e3 = this.height / 2;
    return ["<polygon ", "COMMON_PARTS", 'points="', "".concat(-t2, " ").concat(e3, ",0 ").concat(-e3, ",").concat(t2, " ").concat(e3), '" />'];
  }
}
t(vo, "type", "Triangle"), t(vo, "ownDefaults", { width: 100, height: 100 }), tt.setClass(vo), tt.setSVGClass(vo);
var yo = ["rx", "ry"];

class _o extends ji {
  static getDefaults() {
    return s(s({}, super.getDefaults()), _o.ownDefaults);
  }
  constructor(t2) {
    super(), Object.assign(this, _o.ownDefaults), this.setOptions(t2);
  }
  _set(t2, e3) {
    switch (super._set(t2, e3), t2) {
      case "rx":
        this.rx = e3, this.set("width", 2 * e3);
        break;
      case "ry":
        this.ry = e3, this.set("height", 2 * e3);
    }
    return this;
  }
  getRx() {
    return this.get("rx") * this.get(H);
  }
  getRy() {
    return this.get("ry") * this.get(N);
  }
  toObject() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return super.toObject([...yo, ...t2]);
  }
  _toSVG() {
    return ["<ellipse ", "COMMON_PARTS", 'cx="0" cy="0" rx="'.concat(this.rx, '" ry="').concat(this.ry, `" />
`)];
  }
  _render(t2) {
    t2.beginPath(), t2.save(), t2.transform(1, 0, 0, this.ry / this.rx, 0, 0), t2.arc(0, 0, this.rx, 0, S, false), t2.restore(), this._renderPaintInOrder(t2);
  }
  static async fromElement(t2, e3, s2) {
    const i2 = Dr(t2, this.ATTRIBUTE_NAMES, s2);
    return i2.left = (i2.left || 0) - i2.rx, i2.top = (i2.top || 0) - i2.ry, new this(i2);
  }
}
function xo(t2) {
  if (!t2)
    return [];
  const e3 = t2.replace(/,/g, " ").trim().split(/\s+/), s2 = [];
  for (let t3 = 0;t3 < e3.length; t3 += 2)
    s2.push({ x: parseFloat(e3[t3]), y: parseFloat(e3[t3 + 1]) });
  return s2;
}
t(_o, "type", "Ellipse"), t(_o, "cacheProperties", [...Ms, ...yo]), t(_o, "ownDefaults", { rx: 0, ry: 0 }), t(_o, "ATTRIBUTE_NAMES", [...Ji, "cx", "cy", "rx", "ry"]), tt.setClass(_o), tt.setSVGClass(_o);
var Co = ["left", "top"];
var bo = { exactBoundingBox: false };

class So extends ji {
  static getDefaults() {
    return s(s({}, super.getDefaults()), So.ownDefaults);
  }
  constructor() {
    let e3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [], s2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super(), t(this, "strokeDiff", undefined), Object.assign(this, So.ownDefaults), this.setOptions(s2), this.points = e3;
    const { left: i2, top: r2 } = s2;
    this.initialized = true, this.setBoundingBox(true), typeof i2 == "number" && this.set(M, i2), typeof r2 == "number" && this.set(P, r2);
  }
  isOpen() {
    return true;
  }
  _projectStrokeOnPoints(t2) {
    return Xi(this.points, t2, this.isOpen());
  }
  _calcDimensions(t2) {
    t2 = s({ scaleX: this.scaleX, scaleY: this.scaleY, skewX: this.skewX, skewY: this.skewY, strokeLineCap: this.strokeLineCap, strokeLineJoin: this.strokeLineJoin, strokeMiterLimit: this.strokeMiterLimit, strokeUniform: this.strokeUniform, strokeWidth: this.strokeWidth }, t2 || {});
    const e3 = this.exactBoundingBox ? this._projectStrokeOnPoints(t2).map((t3) => t3.projectedPoint) : this.points;
    if (e3.length === 0)
      return { left: 0, top: 0, width: 0, height: 0, pathOffset: new ot, strokeOffset: new ot, strokeDiff: new ot };
    const i2 = ae(e3), r2 = Lt(s(s({}, t2), {}, { scaleX: 1, scaleY: 1 })), n2 = ae(this.points.map((t3) => St(t3, r2, true))), o2 = new ot(this.scaleX, this.scaleY);
    let a2 = i2.left + i2.width / 2, h2 = i2.top + i2.height / 2;
    return this.exactBoundingBox && (a2 -= h2 * Math.tan(xt(this.skewX)), h2 -= a2 * Math.tan(xt(this.skewY))), s(s({}, i2), {}, { pathOffset: new ot(a2, h2), strokeOffset: new ot(n2.left, n2.top).subtract(new ot(i2.left, i2.top)).multiply(o2), strokeDiff: new ot(i2.width, i2.height).subtract(new ot(n2.width, n2.height)).multiply(o2) });
  }
  _findCenterFromElement() {
    const t2 = ae(this.points);
    return new ot(t2.left + t2.width / 2, t2.top + t2.height / 2);
  }
  setDimensions() {
    this.setBoundingBox();
  }
  setBoundingBox(t2) {
    const { left: e3, top: s2, width: i2, height: r2, pathOffset: n2, strokeOffset: o2, strokeDiff: a2 } = this._calcDimensions();
    this.set({ width: i2, height: r2, pathOffset: n2, strokeOffset: o2, strokeDiff: a2 }), t2 && this.setPositionByOrigin(new ot(e3 + i2 / 2, s2 + r2 / 2), D, D);
  }
  isStrokeAccountedForInDimensions() {
    return this.exactBoundingBox;
  }
  _getNonTransformedDimensions() {
    return this.exactBoundingBox ? new ot(this.width, this.height) : super._getNonTransformedDimensions();
  }
  _getTransformedDimensions() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (this.exactBoundingBox) {
      let n2;
      if (Object.keys(t2).some((t3) => this.strokeUniform || this.constructor.layoutProperties.includes(t3))) {
        var e3, s2;
        const { width: i3, height: r3 } = this._calcDimensions(t2);
        n2 = new ot((e3 = t2.width) !== null && e3 !== undefined ? e3 : i3, (s2 = t2.height) !== null && s2 !== undefined ? s2 : r3);
      } else {
        var i2, r2;
        n2 = new ot((i2 = t2.width) !== null && i2 !== undefined ? i2 : this.width, (r2 = t2.height) !== null && r2 !== undefined ? r2 : this.height);
      }
      return n2.multiply(new ot(t2.scaleX || this.scaleX, t2.scaleY || this.scaleY));
    }
    return super._getTransformedDimensions(t2);
  }
  _set(t2, e3) {
    const s2 = this.initialized && this[t2] !== e3, i2 = super._set(t2, e3);
    return this.exactBoundingBox && s2 && ((t2 === H || t2 === N) && this.strokeUniform && this.constructor.layoutProperties.includes("strokeUniform") || this.constructor.layoutProperties.includes(t2)) && this.setDimensions(), i2;
  }
  toObject() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return s(s({}, super.toObject(t2)), {}, { points: this.points.map((t3) => {
      let { x: e3, y: s2 } = t3;
      return { x: e3, y: s2 };
    }) });
  }
  _toSVG() {
    const t2 = [], e3 = this.pathOffset.x, s2 = this.pathOffset.y, i2 = o.NUM_FRACTION_DIGITS;
    for (let r2 = 0, n2 = this.points.length;r2 < n2; r2++)
      t2.push(Vt(this.points[r2].x - e3, i2), ",", Vt(this.points[r2].y - s2, i2), " ");
    return ["<".concat(this.constructor.type.toLowerCase(), " "), "COMMON_PARTS", 'points="'.concat(t2.join(""), `" />
`)];
  }
  _render(t2) {
    const e3 = this.points.length, s2 = this.pathOffset.x, i2 = this.pathOffset.y;
    if (e3 && !isNaN(this.points[e3 - 1].y)) {
      t2.beginPath(), t2.moveTo(this.points[0].x - s2, this.points[0].y - i2);
      for (let r2 = 0;r2 < e3; r2++) {
        const e4 = this.points[r2];
        t2.lineTo(e4.x - s2, e4.y - i2);
      }
      !this.isOpen() && t2.closePath(), this._renderPaintInOrder(t2);
    }
  }
  complexity() {
    return this.points.length;
  }
  static async fromElement(t2, e3, r2) {
    return new this(xo(t2.getAttribute("points")), s(s({}, i(Dr(t2, this.ATTRIBUTE_NAMES, r2), Co)), e3));
  }
  static fromObject(t2) {
    return this._fromObject(t2, { extraParam: "points" });
  }
}
t(So, "ownDefaults", bo), t(So, "type", "Polyline"), t(So, "layoutProperties", [U, q, "strokeLineCap", "strokeLineJoin", "strokeMiterLimit", "strokeWidth", "strokeUniform", "points"]), t(So, "cacheProperties", [...Ms, "points"]), t(So, "ATTRIBUTE_NAMES", [...Ji]), tt.setClass(So), tt.setSVGClass(So);

class wo extends So {
  isOpen() {
    return false;
  }
}
t(wo, "ownDefaults", bo), t(wo, "type", "Polygon"), tt.setClass(wo), tt.setSVGClass(wo);

class To extends ji {
  isEmptyStyles(t2) {
    if (!this.styles)
      return true;
    if (t2 !== undefined && !this.styles[t2])
      return true;
    const e3 = t2 === undefined ? this.styles : { line: this.styles[t2] };
    for (const t3 in e3)
      for (const s2 in e3[t3])
        for (const i2 in e3[t3][s2])
          return false;
    return true;
  }
  styleHas(t2, e3) {
    if (!this.styles)
      return false;
    if (e3 !== undefined && !this.styles[e3])
      return false;
    const s2 = e3 === undefined ? this.styles : { 0: this.styles[e3] };
    for (const e4 in s2)
      for (const i2 in s2[e4])
        if (s2[e4][i2][t2] !== undefined)
          return true;
    return false;
  }
  cleanStyle(t2) {
    if (!this.styles)
      return false;
    const e3 = this.styles;
    let s2, i2, r2 = 0, n2 = true, o2 = 0;
    for (const o3 in e3) {
      s2 = 0;
      for (const a2 in e3[o3]) {
        const h2 = e3[o3][a2] || {};
        r2++, h2[t2] !== undefined ? (i2 ? h2[t2] !== i2 && (n2 = false) : i2 = h2[t2], h2[t2] === this[t2] && delete h2[t2]) : n2 = false, Object.keys(h2).length !== 0 ? s2++ : delete e3[o3][a2];
      }
      s2 === 0 && delete e3[o3];
    }
    for (let t3 = 0;t3 < this._textLines.length; t3++)
      o2 += this._textLines[t3].length;
    n2 && r2 === o2 && (this[t2] = i2, this.removeStyle(t2));
  }
  removeStyle(t2) {
    if (!this.styles)
      return;
    const e3 = this.styles;
    let s2, i2, r2;
    for (i2 in e3) {
      for (r2 in s2 = e3[i2], s2)
        delete s2[r2][t2], Object.keys(s2[r2]).length === 0 && delete s2[r2];
      Object.keys(s2).length === 0 && delete e3[i2];
    }
  }
  _extendStyles(t2, e3) {
    const { lineIndex: i2, charIndex: r2 } = this.get2DCursorLocation(t2);
    this._getLineStyle(i2) || this._setLineStyle(i2);
    const n2 = Wt(s(s({}, this._getStyleDeclaration(i2, r2)), e3), (t3) => t3 !== undefined);
    this._setStyleDeclaration(i2, r2, n2);
  }
  getSelectionStyles(t2, e3, s2) {
    const i2 = [];
    for (let r2 = t2;r2 < (e3 || t2); r2++)
      i2.push(this.getStyleAtPosition(r2, s2));
    return i2;
  }
  getStyleAtPosition(t2, e3) {
    const { lineIndex: s2, charIndex: i2 } = this.get2DCursorLocation(t2);
    return e3 ? this.getCompleteStyleDeclaration(s2, i2) : this._getStyleDeclaration(s2, i2);
  }
  setSelectionStyles(t2, e3, s2) {
    for (let i2 = e3;i2 < (s2 || e3); i2++)
      this._extendStyles(i2, t2);
    this._forceClearCache = true;
  }
  _getStyleDeclaration(t2, e3) {
    var s2;
    const i2 = this.styles && this.styles[t2];
    return i2 && (s2 = i2[e3]) !== null && s2 !== undefined ? s2 : {};
  }
  getCompleteStyleDeclaration(t2, e3) {
    return s(s({}, Yt(this, this.constructor._styleProperties)), this._getStyleDeclaration(t2, e3));
  }
  _setStyleDeclaration(t2, e3, s2) {
    this.styles[t2][e3] = s2;
  }
  _deleteStyleDeclaration(t2, e3) {
    delete this.styles[t2][e3];
  }
  _getLineStyle(t2) {
    return !!this.styles[t2];
  }
  _setLineStyle(t2) {
    this.styles[t2] = {};
  }
  _deleteLineStyle(t2) {
    delete this.styles[t2];
  }
}
t(To, "_styleProperties", Ne);
var Oo = /  +/g;
var ko = /"/g;
function Do(t2, e3, s2, i2, r2) {
  return "\t\t".concat(function(t3, e4) {
    let { left: s3, top: i3, width: r3, height: n2 } = e4, a2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : o.NUM_FRACTION_DIGITS;
    const h2 = Be(K, t3, false), [c2, l2, u2, d2] = [s3, i3, r3, n2].map((t4) => Vt(t4, a2));
    return "<rect ".concat(h2, ' x="').concat(c2, '" y="').concat(l2, '" width="').concat(u2, '" height="').concat(d2, '"></rect>');
  }(t2, { left: e3, top: s2, width: i2, height: r2 }), `
`);
}
var Mo = ["textAnchor", "textDecoration", "dx", "dy", "top", "left", "fontSize", "strokeWidth"];
var Po;

class Eo extends To {
  static getDefaults() {
    return s(s({}, super.getDefaults()), Eo.ownDefaults);
  }
  constructor(e3, s2) {
    super(), t(this, "__charBounds", []), Object.assign(this, Eo.ownDefaults), this.setOptions(s2), this.styles || (this.styles = {}), this.text = e3, this.initialized = true, this.path && this.setPathInfo(), this.initDimensions(), this.setCoords();
  }
  setPathInfo() {
    const t2 = this.path;
    t2 && (t2.segmentsInfo = fn(t2.path));
  }
  _splitText() {
    const t2 = this._splitTextIntoLines(this.text);
    return this.textLines = t2.lines, this._textLines = t2.graphemeLines, this._unwrappedTextLines = t2._unwrappedLines, this._text = t2.graphemeText, t2;
  }
  initDimensions() {
    this._splitText(), this._clearCache(), this.dirty = true, this.path ? (this.width = this.path.width, this.height = this.path.height) : (this.width = this.calcTextWidth() || this.cursorWidth || this.MIN_TEXT_WIDTH, this.height = this.calcTextHeight()), this.textAlign.includes(qe) && this.enlargeSpaces();
  }
  enlargeSpaces() {
    let t2, e3, s2, i2, r2, n2, o2;
    for (let a2 = 0, h2 = this._textLines.length;a2 < h2; a2++)
      if ((this.textAlign === qe || a2 !== h2 - 1 && !this.isEndOfWrapping(a2)) && (i2 = 0, r2 = this._textLines[a2], e3 = this.getLineWidth(a2), e3 < this.width && (o2 = this.textLines[a2].match(this._reSpacesAndTabs)))) {
        s2 = o2.length, t2 = (this.width - e3) / s2;
        for (let e4 = 0;e4 <= r2.length; e4++)
          n2 = this.__charBounds[a2][e4], this._reSpaceAndTab.test(r2[e4]) ? (n2.width += t2, n2.kernedWidth += t2, n2.left += i2, i2 += t2) : n2.left += i2;
      }
  }
  isEndOfWrapping(t2) {
    return t2 === this._textLines.length - 1;
  }
  missingNewlineOffset(t2) {
    return 1;
  }
  get2DCursorLocation(t2, e3) {
    const s2 = e3 ? this._unwrappedTextLines : this._textLines;
    let i2;
    for (i2 = 0;i2 < s2.length; i2++) {
      if (t2 <= s2[i2].length)
        return { lineIndex: i2, charIndex: t2 };
      t2 -= s2[i2].length + this.missingNewlineOffset(i2, e3);
    }
    return { lineIndex: i2 - 1, charIndex: s2[i2 - 1].length < t2 ? s2[i2 - 1].length : t2 };
  }
  toString() {
    return "#<Text (".concat(this.complexity(), '): { "text": "').concat(this.text, '", "fontFamily": "').concat(this.fontFamily, '" }>');
  }
  _getCacheCanvasDimensions() {
    const t2 = super._getCacheCanvasDimensions(), e3 = this.fontSize;
    return t2.width += e3 * t2.zoomX, t2.height += e3 * t2.zoomY, t2;
  }
  _render(t2) {
    const e3 = this.path;
    e3 && !e3.isNotVisible() && e3._render(t2), this._setTextStyles(t2), this._renderTextLinesBackground(t2), this._renderTextDecoration(t2, "underline"), this._renderText(t2), this._renderTextDecoration(t2, "overline"), this._renderTextDecoration(t2, "linethrough");
  }
  _renderText(t2) {
    this.paintFirst === J ? (this._renderTextStroke(t2), this._renderTextFill(t2)) : (this._renderTextFill(t2), this._renderTextStroke(t2));
  }
  _setTextStyles(t2, e3, s2) {
    if (t2.textBaseline = "alphabetic", this.path)
      switch (this.pathAlign) {
        case D:
          t2.textBaseline = "middle";
          break;
        case "ascender":
          t2.textBaseline = P;
          break;
        case "descender":
          t2.textBaseline = E;
      }
    t2.font = this._getFontDeclaration(e3, s2);
  }
  calcTextWidth() {
    let t2 = this.getLineWidth(0);
    for (let e3 = 1, s2 = this._textLines.length;e3 < s2; e3++) {
      const s3 = this.getLineWidth(e3);
      s3 > t2 && (t2 = s3);
    }
    return t2;
  }
  _renderTextLine(t2, e3, s2, i2, r2, n2) {
    this._renderChars(t2, e3, s2, i2, r2, n2);
  }
  _renderTextLinesBackground(t2) {
    if (!this.textBackgroundColor && !this.styleHas("textBackgroundColor"))
      return;
    const e3 = t2.fillStyle, s2 = this._getLeftOffset();
    let i2 = this._getTopOffset();
    for (let e4 = 0, r2 = this._textLines.length;e4 < r2; e4++) {
      const r3 = this.getHeightOfLine(e4);
      if (!this.textBackgroundColor && !this.styleHas("textBackgroundColor", e4)) {
        i2 += r3;
        continue;
      }
      const n2 = this._textLines[e4].length, o2 = this._getLineLeftOffset(e4);
      let a2, h2, c2 = 0, l2 = 0, u2 = this.getValueOfPropertyAt(e4, 0, "textBackgroundColor");
      for (let d2 = 0;d2 < n2; d2++) {
        const n3 = this.__charBounds[e4][d2];
        h2 = this.getValueOfPropertyAt(e4, d2, "textBackgroundColor"), this.path ? (t2.save(), t2.translate(n3.renderLeft, n3.renderTop), t2.rotate(n3.angle), t2.fillStyle = h2, h2 && t2.fillRect(-n3.width / 2, -r3 / this.lineHeight * (1 - this._fontSizeFraction), n3.width, r3 / this.lineHeight), t2.restore()) : h2 !== u2 ? (a2 = s2 + o2 + l2, this.direction === "rtl" && (a2 = this.width - a2 - c2), t2.fillStyle = u2, u2 && t2.fillRect(a2, i2, c2, r3 / this.lineHeight), l2 = n3.left, c2 = n3.width, u2 = h2) : c2 += n3.kernedWidth;
      }
      h2 && !this.path && (a2 = s2 + o2 + l2, this.direction === "rtl" && (a2 = this.width - a2 - c2), t2.fillStyle = h2, t2.fillRect(a2, i2, c2, r3 / this.lineHeight)), i2 += r3;
    }
    t2.fillStyle = e3, this._removeShadow(t2);
  }
  _measureChar(t2, e3, s2, i2) {
    const r2 = _.getFontCache(e3), n2 = this._getFontDeclaration(e3), o2 = s2 + t2, a2 = s2 && n2 === this._getFontDeclaration(i2), h2 = e3.fontSize / this.CACHE_FONT_SIZE;
    let c2, l2, u2, d2;
    if (s2 && r2[s2] !== undefined && (u2 = r2[s2]), r2[t2] !== undefined && (d2 = c2 = r2[t2]), a2 && r2[o2] !== undefined && (l2 = r2[o2], d2 = l2 - u2), c2 === undefined || u2 === undefined || l2 === undefined) {
      const i3 = function() {
        if (!Po) {
          const t3 = vt({ width: 0, height: 0 });
          Po = t3.getContext("2d");
        }
        return Po;
      }();
      this._setTextStyles(i3, e3, true), c2 === undefined && (d2 = c2 = i3.measureText(t2).width, r2[t2] = c2), u2 === undefined && a2 && s2 && (u2 = i3.measureText(s2).width, r2[s2] = u2), a2 && l2 === undefined && (l2 = i3.measureText(o2).width, r2[o2] = l2, d2 = l2 - u2);
    }
    return { width: c2 * h2, kernedWidth: d2 * h2 };
  }
  getHeightOfChar(t2, e3) {
    return this.getValueOfPropertyAt(t2, e3, "fontSize");
  }
  measureLine(t2) {
    const e3 = this._measureLine(t2);
    return this.charSpacing !== 0 && (e3.width -= this._getWidthOfCharSpacing()), e3.width < 0 && (e3.width = 0), e3;
  }
  _measureLine(t2) {
    let e3, s2, i2 = 0;
    const r2 = this.pathSide === A, n2 = this.path, o2 = this._textLines[t2], a2 = o2.length, h2 = new Array(a2);
    this.__charBounds[t2] = h2;
    for (let r3 = 0;r3 < a2; r3++) {
      const n3 = o2[r3];
      s2 = this._getGraphemeBox(n3, t2, r3, e3), h2[r3] = s2, i2 += s2.kernedWidth, e3 = n3;
    }
    if (h2[a2] = { left: s2 ? s2.left + s2.width : 0, width: 0, kernedWidth: 0, height: this.fontSize, deltaY: 0 }, n2 && n2.segmentsInfo) {
      let t3 = 0;
      const e4 = n2.segmentsInfo[n2.segmentsInfo.length - 1].length;
      switch (this.textAlign) {
        case M:
          t3 = r2 ? e4 - i2 : 0;
          break;
        case D:
          t3 = (e4 - i2) / 2;
          break;
        case A:
          t3 = r2 ? 0 : e4 - i2;
      }
      t3 += this.pathStartOffset * (r2 ? -1 : 1);
      for (let i3 = r2 ? a2 - 1 : 0;r2 ? i3 >= 0 : i3 < a2; r2 ? i3-- : i3++)
        s2 = h2[i3], t3 > e4 ? t3 %= e4 : t3 < 0 && (t3 += e4), this._setGraphemeOnPath(t3, s2), t3 += s2.kernedWidth;
    }
    return { width: i2, numOfSpaces: 0 };
  }
  _setGraphemeOnPath(t2, e3) {
    const s2 = t2 + e3.kernedWidth / 2, i2 = this.path, r2 = pn(i2.path, s2, i2.segmentsInfo);
    e3.renderLeft = r2.x - i2.pathOffset.x, e3.renderTop = r2.y - i2.pathOffset.y, e3.angle = r2.angle + (this.pathSide === A ? Math.PI : 0);
  }
  _getGraphemeBox(t2, e3, s2, i2, r2) {
    const n2 = this.getCompleteStyleDeclaration(e3, s2), o2 = i2 ? this.getCompleteStyleDeclaration(e3, s2 - 1) : {}, a2 = this._measureChar(t2, n2, i2, o2);
    let h2, c2 = a2.kernedWidth, l2 = a2.width;
    this.charSpacing !== 0 && (h2 = this._getWidthOfCharSpacing(), l2 += h2, c2 += h2);
    const u2 = { width: l2, left: 0, height: n2.fontSize, kernedWidth: c2, deltaY: n2.deltaY };
    if (s2 > 0 && !r2) {
      const t3 = this.__charBounds[e3][s2 - 1];
      u2.left = t3.left + t3.width + a2.kernedWidth - a2.width;
    }
    return u2;
  }
  getHeightOfLine(t2) {
    if (this.__lineHeights[t2])
      return this.__lineHeights[t2];
    let e3 = this.getHeightOfChar(t2, 0);
    for (let s2 = 1, i2 = this._textLines[t2].length;s2 < i2; s2++)
      e3 = Math.max(this.getHeightOfChar(t2, s2), e3);
    return this.__lineHeights[t2] = e3 * this.lineHeight * this._fontSizeMult;
  }
  calcTextHeight() {
    let t2, e3 = 0;
    for (let s2 = 0, i2 = this._textLines.length;s2 < i2; s2++)
      t2 = this.getHeightOfLine(s2), e3 += s2 === i2 - 1 ? t2 / this.lineHeight : t2;
    return e3;
  }
  _getLeftOffset() {
    return this.direction === "ltr" ? -this.width / 2 : this.width / 2;
  }
  _getTopOffset() {
    return -this.height / 2;
  }
  _renderTextCommon(t2, e3) {
    t2.save();
    let s2 = 0;
    const i2 = this._getLeftOffset(), r2 = this._getTopOffset();
    for (let n2 = 0, o2 = this._textLines.length;n2 < o2; n2++) {
      const o3 = this.getHeightOfLine(n2), a2 = o3 / this.lineHeight, h2 = this._getLineLeftOffset(n2);
      this._renderTextLine(e3, t2, this._textLines[n2], i2 + h2, r2 + s2 + a2, n2), s2 += o3;
    }
    t2.restore();
  }
  _renderTextFill(t2) {
    (this.fill || this.styleHas(K)) && this._renderTextCommon(t2, "fillText");
  }
  _renderTextStroke(t2) {
    (this.stroke && this.strokeWidth !== 0 || !this.isEmptyStyles()) && (this.shadow && !this.shadow.affectStroke && this._removeShadow(t2), t2.save(), this._setLineDash(t2, this.strokeDashArray), t2.beginPath(), this._renderTextCommon(t2, "strokeText"), t2.closePath(), t2.restore());
  }
  _renderChars(t2, e3, s2, i2, r2, n2) {
    const o2 = this.getHeightOfLine(n2), a2 = this.textAlign.includes(qe), h2 = this.path, c2 = !a2 && this.charSpacing === 0 && this.isEmptyStyles(n2) && !h2, l2 = this.direction === "ltr", u2 = this.direction === "ltr" ? 1 : -1, d2 = e3.direction;
    let g2, f, p2, m2, v2, y2 = "", _2 = 0;
    if (e3.save(), d2 !== this.direction && (e3.canvas.setAttribute("dir", l2 ? "ltr" : "rtl"), e3.direction = l2 ? "ltr" : "rtl", e3.textAlign = l2 ? M : A), r2 -= o2 * this._fontSizeFraction / this.lineHeight, c2)
      return this._renderChar(t2, e3, n2, 0, s2.join(""), i2, r2), void e3.restore();
    for (let o3 = 0, c3 = s2.length - 1;o3 <= c3; o3++)
      m2 = o3 === c3 || this.charSpacing || h2, y2 += s2[o3], p2 = this.__charBounds[n2][o3], _2 === 0 ? (i2 += u2 * (p2.kernedWidth - p2.width), _2 += p2.width) : _2 += p2.kernedWidth, a2 && !m2 && this._reSpaceAndTab.test(s2[o3]) && (m2 = true), m2 || (g2 = g2 || this.getCompleteStyleDeclaration(n2, o3), f = this.getCompleteStyleDeclaration(n2, o3 + 1), m2 = Ui(g2, f, false)), m2 && (h2 ? (e3.save(), e3.translate(p2.renderLeft, p2.renderTop), e3.rotate(p2.angle), this._renderChar(t2, e3, n2, o3, y2, -_2 / 2, 0), e3.restore()) : (v2 = i2, this._renderChar(t2, e3, n2, o3, y2, v2, r2)), y2 = "", g2 = f, i2 += u2 * _2, _2 = 0);
    e3.restore();
  }
  _applyPatternGradientTransformText(t2) {
    const e3 = this.width + this.strokeWidth, s2 = this.height + this.strokeWidth, i2 = vt({ width: e3, height: s2 }), r2 = i2.getContext("2d");
    return i2.width = e3, i2.height = s2, r2.beginPath(), r2.moveTo(0, 0), r2.lineTo(e3, 0), r2.lineTo(e3, s2), r2.lineTo(0, s2), r2.closePath(), r2.translate(e3 / 2, s2 / 2), r2.fillStyle = t2.toLive(r2), this._applyPatternGradientTransform(r2, t2), r2.fill(), r2.createPattern(i2, "no-repeat");
  }
  handleFiller(t2, e3, s2) {
    let i2, r2;
    return Gt(s2) ? s2.gradientUnits === "percentage" || s2.gradientTransform || s2.patternTransform ? (i2 = -this.width / 2, r2 = -this.height / 2, t2.translate(i2, r2), t2[e3] = this._applyPatternGradientTransformText(s2), { offsetX: i2, offsetY: r2 }) : (t2[e3] = s2.toLive(t2), this._applyPatternGradientTransform(t2, s2)) : (t2[e3] = s2, { offsetX: 0, offsetY: 0 });
  }
  _setStrokeStyles(t2, e3) {
    let { stroke: s2, strokeWidth: i2 } = e3;
    return t2.lineWidth = i2, t2.lineCap = this.strokeLineCap, t2.lineDashOffset = this.strokeDashOffset, t2.lineJoin = this.strokeLineJoin, t2.miterLimit = this.strokeMiterLimit, this.handleFiller(t2, "strokeStyle", s2);
  }
  _setFillStyles(t2, e3) {
    let { fill: s2 } = e3;
    return this.handleFiller(t2, "fillStyle", s2);
  }
  _renderChar(t2, e3, s2, i2, r2, n2, o2) {
    const a2 = this._getStyleDeclaration(s2, i2), h2 = this.getCompleteStyleDeclaration(s2, i2), c2 = t2 === "fillText" && h2.fill, l2 = t2 === "strokeText" && h2.stroke && h2.strokeWidth;
    if (l2 || c2) {
      if (e3.save(), e3.font = this._getFontDeclaration(h2), a2.textBackgroundColor && this._removeShadow(e3), a2.deltaY && (o2 += a2.deltaY), c2) {
        const t3 = this._setFillStyles(e3, h2);
        e3.fillText(r2, n2 - t3.offsetX, o2 - t3.offsetY);
      }
      if (l2) {
        const t3 = this._setStrokeStyles(e3, h2);
        e3.strokeText(r2, n2 - t3.offsetX, o2 - t3.offsetY);
      }
      e3.restore();
    }
  }
  setSuperscript(t2, e3) {
    this._setScript(t2, e3, this.superscript);
  }
  setSubscript(t2, e3) {
    this._setScript(t2, e3, this.subscript);
  }
  _setScript(t2, e3, s2) {
    const i2 = this.get2DCursorLocation(t2, true), r2 = this.getValueOfPropertyAt(i2.lineIndex, i2.charIndex, "fontSize"), n2 = this.getValueOfPropertyAt(i2.lineIndex, i2.charIndex, "deltaY"), o2 = { fontSize: r2 * s2.size, deltaY: n2 + r2 * s2.baseline };
    this.setSelectionStyles(o2, t2, e3);
  }
  _getLineLeftOffset(t2) {
    const e3 = this.getLineWidth(t2), s2 = this.width - e3, i2 = this.textAlign, r2 = this.direction, n2 = this.isEndOfWrapping(t2);
    let o2 = 0;
    return i2 === qe || i2 === Qe && !n2 || i2 === Je && !n2 || i2 === Ke && !n2 ? 0 : (i2 === D && (o2 = s2 / 2), i2 === A && (o2 = s2), i2 === Qe && (o2 = s2 / 2), i2 === Je && (o2 = s2), r2 === "rtl" && (i2 === A || i2 === qe || i2 === Je ? o2 = 0 : i2 === M || i2 === Ke ? o2 = -s2 : i2 !== D && i2 !== Qe || (o2 = -s2 / 2)), o2);
  }
  _clearCache() {
    this._forceClearCache = false, this.__lineWidths = [], this.__lineHeights = [], this.__charBounds = [];
  }
  getLineWidth(t2) {
    if (this.__lineWidths[t2] !== undefined)
      return this.__lineWidths[t2];
    const { width: e3 } = this.measureLine(t2);
    return this.__lineWidths[t2] = e3, e3;
  }
  _getWidthOfCharSpacing() {
    return this.charSpacing !== 0 ? this.fontSize * this.charSpacing / 1000 : 0;
  }
  getValueOfPropertyAt(t2, e3, s2) {
    var i2;
    return (i2 = this._getStyleDeclaration(t2, e3)[s2]) !== null && i2 !== undefined ? i2 : this[s2];
  }
  _renderTextDecoration(t2, e3) {
    if (!this[e3] && !this.styleHas(e3))
      return;
    let s2 = this._getTopOffset();
    const i2 = this._getLeftOffset(), r2 = this.path, n2 = this._getWidthOfCharSpacing(), o2 = e3 === "linethrough" ? 0.5 : e3 === "overline" ? 1 : 0, a2 = this.offsets[e3];
    for (let h2 = 0, c2 = this._textLines.length;h2 < c2; h2++) {
      const c3 = this.getHeightOfLine(h2);
      if (!this[e3] && !this.styleHas(e3, h2)) {
        s2 += c3;
        continue;
      }
      const l2 = this._textLines[h2], u2 = c3 / this.lineHeight, d2 = this._getLineLeftOffset(h2);
      let g2 = 0, f = 0, p2 = this.getValueOfPropertyAt(h2, 0, e3), m2 = this.getValueOfPropertyAt(h2, 0, K), v2 = this.getValueOfPropertyAt(h2, 0, We), y2 = p2, _2 = m2, x2 = v2;
      const C2 = s2 + u2 * (1 - this._fontSizeFraction);
      let b2 = this.getHeightOfChar(h2, 0), S2 = this.getValueOfPropertyAt(h2, 0, "deltaY");
      for (let s3 = 0, n3 = l2.length;s3 < n3; s3++) {
        const n4 = this.__charBounds[h2][s3];
        y2 = this.getValueOfPropertyAt(h2, s3, e3), _2 = this.getValueOfPropertyAt(h2, s3, K), x2 = this.getValueOfPropertyAt(h2, s3, We);
        const c4 = this.getHeightOfChar(h2, s3), l3 = this.getValueOfPropertyAt(h2, s3, "deltaY");
        if (r2 && y2 && _2) {
          const e4 = this.fontSize * x2 / 1000;
          t2.save(), t2.fillStyle = m2, t2.translate(n4.renderLeft, n4.renderTop), t2.rotate(n4.angle), t2.fillRect(-n4.kernedWidth / 2, a2 * c4 + l3 - o2 * e4, n4.kernedWidth, e4), t2.restore();
        } else if ((y2 !== p2 || _2 !== m2 || c4 !== b2 || x2 !== v2 || l3 !== S2) && f > 0) {
          const e4 = this.fontSize * v2 / 1000;
          let s4 = i2 + d2 + g2;
          this.direction === "rtl" && (s4 = this.width - s4 - f), p2 && m2 && v2 && (t2.fillStyle = m2, t2.fillRect(s4, C2 + a2 * b2 + S2 - o2 * e4, f, e4)), g2 = n4.left, f = n4.width, p2 = y2, v2 = x2, m2 = _2, b2 = c4, S2 = l3;
        } else
          f += n4.kernedWidth;
      }
      let w2 = i2 + d2 + g2;
      this.direction === "rtl" && (w2 = this.width - w2 - f), t2.fillStyle = _2;
      const T2 = this.fontSize * x2 / 1000;
      y2 && _2 && x2 && t2.fillRect(w2, C2 + a2 * b2 + S2 - o2 * T2, f - n2, T2), s2 += c3;
    }
    this._removeShadow(t2);
  }
  _getFontDeclaration() {
    let { fontFamily: t2 = this.fontFamily, fontStyle: e3 = this.fontStyle, fontWeight: s2 = this.fontWeight, fontSize: i2 = this.fontSize } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}, r2 = arguments.length > 1 ? arguments[1] : undefined;
    const n2 = t2.includes("'") || t2.includes('"') || t2.includes(",") || Eo.genericFonts.includes(t2.toLowerCase()) ? t2 : '"'.concat(t2, '"');
    return [e3, s2, "".concat(r2 ? this.CACHE_FONT_SIZE : i2, "px"), n2].join(" ");
  }
  render(t2) {
    this.visible && (this.canvas && this.canvas.skipOffscreen && !this.group && !this.isOnScreen() || (this._forceClearCache && this.initDimensions(), super.render(t2)));
  }
  graphemeSplit(t2) {
    return zi(t2);
  }
  _splitTextIntoLines(t2) {
    const e3 = t2.split(this._reNewline), s2 = new Array(e3.length), i2 = [`
`];
    let r2 = [];
    for (let t3 = 0;t3 < e3.length; t3++)
      s2[t3] = this.graphemeSplit(e3[t3]), r2 = r2.concat(s2[t3], i2);
    return r2.pop(), { _unwrappedLines: s2, lines: e3, graphemeText: r2, graphemeLines: s2 };
  }
  toObject() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return s(s({}, super.toObject([...He, ...t2])), {}, { styles: qi(this.styles, this.text) }, this.path ? { path: this.path.toObject() } : {});
  }
  set(t2, e3) {
    const { textLayoutProperties: s2 } = this.constructor;
    super.set(t2, e3);
    let i2 = false, r2 = false;
    if (typeof t2 == "object")
      for (const e4 in t2)
        e4 === "path" && this.setPathInfo(), i2 = i2 || s2.includes(e4), r2 = r2 || e4 === "path";
    else
      i2 = s2.includes(t2), r2 = t2 === "path";
    return r2 && this.setPathInfo(), i2 && this.initialized && (this.initDimensions(), this.setCoords()), this;
  }
  complexity() {
    return 1;
  }
  static async fromElement(t2, e3, r2) {
    const n2 = Dr(t2, Eo.ATTRIBUTE_NAMES, r2), o2 = s(s({}, e3), n2), { textAnchor: a2 = M, textDecoration: h2 = "", dx: c2 = 0, dy: l2 = 0, top: u2 = 0, left: d2 = 0, fontSize: g2 = O, strokeWidth: f = 1 } = o2, p2 = i(o2, Mo), m2 = new this((t2.textContent || "").replace(/^\s+|\s+$|\n+/g, "").replace(/\s+/g, " "), s({ left: d2 + c2, top: u2 + l2, underline: h2.includes("underline"), overline: h2.includes("overline"), linethrough: h2.includes("line-through"), strokeWidth: 0, fontSize: g2 }, p2)), v2 = m2.getScaledHeight() / m2.height, y2 = ((m2.height + m2.strokeWidth) * m2.lineHeight - m2.height) * v2, _2 = m2.getScaledHeight() + y2;
    let x2 = 0;
    return a2 === D && (x2 = m2.getScaledWidth() / 2), a2 === A && (x2 = m2.getScaledWidth()), m2.set({ left: m2.left - x2, top: m2.top - (_2 - m2.fontSize * (0.07 + m2._fontSizeFraction)) / m2.lineHeight, strokeWidth: f }), m2;
  }
  static fromObject(t2) {
    return this._fromObject(s(s({}, t2), {}, { styles: Ki(t2.styles || {}, t2.text) }), { extraParam: "text" });
  }
}
t(Eo, "textLayoutProperties", Ge), t(Eo, "cacheProperties", [...Ms, ...He]), t(Eo, "ownDefaults", Ue), t(Eo, "type", "Text"), t(Eo, "genericFonts", ["serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui", "ui-serif", "ui-sans-serif", "ui-monospace", "ui-rounded", "math", "emoji", "fangsong"]), t(Eo, "ATTRIBUTE_NAMES", Ji.concat("x", "y", "dx", "dy", "font-family", "font-style", "font-weight", "font-size", "letter-spacing", "text-decoration", "text-anchor")), Ai(Eo, [class extends Xe {
  _toSVG() {
    const t2 = this._getSVGLeftTopOffsets(), e3 = this._getSVGTextAndBg(t2.textTop, t2.textLeft);
    return this._wrapSVGTextAndBg(e3);
  }
  toSVG(t2) {
    const e3 = this._createBaseSVGMarkup(this._toSVG(), { reviver: t2, noStyle: true, withShadow: true }), s2 = this.path;
    return s2 ? e3 + s2._createBaseSVGMarkup(s2._toSVG(), { reviver: t2, withShadow: true, additionalTransform: zt(this.calcOwnMatrix()) }) : e3;
  }
  _getSVGLeftTopOffsets() {
    return { textLeft: -this.width / 2, textTop: -this.height / 2, lineTop: this.getHeightOfLine(0) };
  }
  _wrapSVGTextAndBg(t2) {
    let { textBgRects: e3, textSpans: s2 } = t2;
    const i2 = this.getSvgTextDecoration(this);
    return [e3.join(""), '\t\t<text xml:space="preserve" ', 'font-family="'.concat(this.fontFamily.replace(ko, "'"), '" '), 'font-size="'.concat(this.fontSize, '" '), this.fontStyle ? 'font-style="'.concat(this.fontStyle, '" ') : "", this.fontWeight ? 'font-weight="'.concat(this.fontWeight, '" ') : "", i2 ? 'text-decoration="'.concat(i2, '" ') : "", this.direction === "rtl" ? 'direction="'.concat(this.direction, '" ') : "", 'style="', this.getSvgStyles(true), '"', this.addPaintOrder(), " >", s2.join(""), `</text>
`];
  }
  _getSVGTextAndBg(t2, e3) {
    const s2 = [], i2 = [];
    let r2, n2 = t2;
    this.backgroundColor && i2.push(...Do(this.backgroundColor, -this.width / 2, -this.height / 2, this.width, this.height));
    for (let t3 = 0, o2 = this._textLines.length;t3 < o2; t3++)
      r2 = this._getLineLeftOffset(t3), this.direction === "rtl" && (r2 += this.width), (this.textBackgroundColor || this.styleHas("textBackgroundColor", t3)) && this._setSVGTextLineBg(i2, t3, e3 + r2, n2), this._setSVGTextLineText(s2, t3, e3 + r2, n2), n2 += this.getHeightOfLine(t3);
    return { textSpans: s2, textBgRects: i2 };
  }
  _createTextCharSpan(t2, e3, s2, i2, r2) {
    const n2 = o.NUM_FRACTION_DIGITS, a2 = this.getSvgSpanStyles(e3, t2 !== t2.trim() || !!t2.match(Oo)), h2 = a2 ? 'style="'.concat(a2, '"') : "", c2 = e3.deltaY, l2 = c2 ? ' dy="'.concat(Vt(c2, n2), '" ') : "", { angle: u2, renderLeft: d2, renderTop: g2, width: f } = r2;
    let p2 = "";
    if (d2 !== undefined) {
      const t3 = f / 2;
      u2 && (p2 = ' rotate="'.concat(Vt(Ct(u2), n2), '"'));
      const e4 = Pt({ angle: Ct(u2) });
      e4[4] = d2, e4[5] = g2;
      const r3 = new ot(-t3, 0).transform(e4);
      s2 = r3.x, i2 = r3.y;
    }
    return '<tspan x="'.concat(Vt(s2, n2), '" y="').concat(Vt(i2, n2), '" ').concat(l2).concat(p2).concat(h2, ">").concat(Wi(t2), "</tspan>");
  }
  _setSVGTextLineText(t2, e3, s2, i2) {
    const r2 = this.getHeightOfLine(e3), n2 = this.textAlign.includes(qe), o2 = this._textLines[e3];
    let a2, h2, c2, l2, u2, d2 = "", g2 = 0;
    i2 += r2 * (1 - this._fontSizeFraction) / this.lineHeight;
    for (let r3 = 0, f = o2.length - 1;r3 <= f; r3++)
      u2 = r3 === f || this.charSpacing || this.path, d2 += o2[r3], c2 = this.__charBounds[e3][r3], g2 === 0 ? (s2 += c2.kernedWidth - c2.width, g2 += c2.width) : g2 += c2.kernedWidth, n2 && !u2 && this._reSpaceAndTab.test(o2[r3]) && (u2 = true), u2 || (a2 = a2 || this.getCompleteStyleDeclaration(e3, r3), h2 = this.getCompleteStyleDeclaration(e3, r3 + 1), u2 = Ui(a2, h2, true)), u2 && (l2 = this._getStyleDeclaration(e3, r3), t2.push(this._createTextCharSpan(d2, l2, s2, i2, c2)), d2 = "", a2 = h2, this.direction === "rtl" ? s2 -= g2 : s2 += g2, g2 = 0);
  }
  _setSVGTextLineBg(t2, e3, s2, i2) {
    const r2 = this._textLines[e3], n2 = this.getHeightOfLine(e3) / this.lineHeight;
    let o2, a2 = 0, h2 = 0, c2 = this.getValueOfPropertyAt(e3, 0, "textBackgroundColor");
    for (let l2 = 0;l2 < r2.length; l2++) {
      const { left: r3, width: u2, kernedWidth: d2 } = this.__charBounds[e3][l2];
      o2 = this.getValueOfPropertyAt(e3, l2, "textBackgroundColor"), o2 !== c2 ? (c2 && t2.push(...Do(c2, s2 + h2, i2, a2, n2)), h2 = r3, a2 = u2, c2 = o2) : a2 += d2;
    }
    o2 && t2.push(...Do(c2, s2 + h2, i2, a2, n2));
  }
  _getSVGLineTopOffset(t2) {
    let e3, s2 = 0;
    for (e3 = 0;e3 < t2; e3++)
      s2 += this.getHeightOfLine(e3);
    const i2 = this.getHeightOfLine(e3);
    return { lineTop: s2, offset: (this._fontSizeMult - this._fontSizeFraction) * i2 / (this.lineHeight * this._fontSizeMult) };
  }
  getSvgStyles(t2) {
    return "".concat(super.getSvgStyles(t2), " text-decoration-thickness: ").concat(Vt(this.textDecorationThickness * this.getObjectScaling().y / 10, o.NUM_FRACTION_DIGITS), "%; white-space: pre;");
  }
  getSvgSpanStyles(t2, e3) {
    const { fontFamily: s2, strokeWidth: i2, stroke: r2, fill: n2, fontSize: a2, fontStyle: h2, fontWeight: c2, deltaY: l2, textDecorationThickness: u2, linethrough: d2, overline: g2, underline: f } = t2, p2 = this.getSvgTextDecoration({ underline: f != null ? f : this.underline, overline: g2 != null ? g2 : this.overline, linethrough: d2 != null ? d2 : this.linethrough }), m2 = u2 || this.textDecorationThickness;
    return [r2 ? Be(J, r2) : "", i2 ? "stroke-width: ".concat(i2, "; ") : "", s2 ? "font-family: ".concat(s2.includes("'") || s2.includes('"') ? s2 : "'".concat(s2, "'"), "; ") : "", a2 ? "font-size: ".concat(a2, "px; ") : "", h2 ? "font-style: ".concat(h2, "; ") : "", c2 ? "font-weight: ".concat(c2, "; ") : "", p2 ? "text-decoration: ".concat(p2, "; text-decoration-thickness: ").concat(Vt(m2 * this.getObjectScaling().y / 10, o.NUM_FRACTION_DIGITS), "%; ") : "", n2 ? Be(K, n2) : "", l2 ? "baseline-shift: ".concat(-l2, "; ") : "", e3 ? "white-space: pre; " : ""].join("");
  }
  getSvgTextDecoration(t2) {
    return ["overline", "underline", "line-through"].filter((e3) => t2[e3.replace("-", "")]).join(" ");
  }
}]), tt.setClass(Eo), tt.setSVGClass(Eo);

class Ao {
  constructor(e3) {
    t(this, "target", undefined), t(this, "__mouseDownInPlace", false), t(this, "__dragStartFired", false), t(this, "__isDraggingOver", false), t(this, "__dragStartSelection", undefined), t(this, "__dragImageDisposer", undefined), t(this, "_dispose", undefined), this.target = e3;
    const s2 = [this.target.on("dragenter", this.dragEnterHandler.bind(this)), this.target.on("dragover", this.dragOverHandler.bind(this)), this.target.on("dragleave", this.dragLeaveHandler.bind(this)), this.target.on("dragend", this.dragEndHandler.bind(this)), this.target.on("drop", this.dropHandler.bind(this))];
    this._dispose = () => {
      s2.forEach((t2) => t2()), this._dispose = undefined;
    };
  }
  isPointerOverSelection(t2) {
    const e3 = this.target, s2 = e3.getSelectionStartFromPointer(t2);
    return e3.isEditing && s2 >= e3.selectionStart && s2 <= e3.selectionEnd && e3.selectionStart < e3.selectionEnd;
  }
  start(t2) {
    return this.__mouseDownInPlace = this.isPointerOverSelection(t2);
  }
  isActive() {
    return this.__mouseDownInPlace;
  }
  end(t2) {
    const e3 = this.isActive();
    return e3 && !this.__dragStartFired && (this.target.setCursorByClick(t2), this.target.initDelayedCursor(true)), this.__mouseDownInPlace = false, this.__dragStartFired = false, this.__isDraggingOver = false, e3;
  }
  getDragStartSelection() {
    return this.__dragStartSelection;
  }
  setDragImage(t2, e3) {
    var s2;
    let { selectionStart: i2, selectionEnd: r2 } = e3;
    const n2 = this.target, o2 = n2.canvas, a2 = new ot(n2.flipX ? -1 : 1, n2.flipY ? -1 : 1), h2 = n2._getCursorBoundaries(i2), c2 = new ot(h2.left + h2.leftOffset, h2.top + h2.topOffset).multiply(a2).transform(n2.calcTransformMatrix()), l2 = o2.getScenePoint(t2).subtract(c2), u2 = n2.getCanvasRetinaScaling(), d2 = n2.getBoundingRect(), g2 = c2.subtract(new ot(d2.left, d2.top)), f = o2.viewportTransform, p2 = g2.add(l2).transform(f, true), m2 = n2.backgroundColor, v2 = Yi(n2.styles);
    n2.backgroundColor = "";
    const y2 = { stroke: "transparent", fill: "transparent", textBackgroundColor: "transparent" };
    n2.setSelectionStyles(y2, 0, i2), n2.setSelectionStyles(y2, r2, n2.text.length), n2.dirty = true;
    const _2 = n2.toCanvasElement({ enableRetinaScaling: o2.enableRetinaScaling, viewportTransform: true });
    n2.backgroundColor = m2, n2.styles = v2, n2.dirty = true, Sn(_2, { position: "fixed", left: "".concat(-_2.width, "px"), border: j, width: "".concat(_2.width / u2, "px"), height: "".concat(_2.height / u2, "px") }), this.__dragImageDisposer && this.__dragImageDisposer(), this.__dragImageDisposer = () => {
      _2.remove();
    }, Kt(t2.target || this.target.hiddenTextarea).body.appendChild(_2), (s2 = t2.dataTransfer) === null || s2 === undefined || s2.setDragImage(_2, p2.x, p2.y);
  }
  onDragStart(t2) {
    this.__dragStartFired = true;
    const e3 = this.target, i2 = this.isActive();
    if (i2 && t2.dataTransfer) {
      const i3 = this.__dragStartSelection = { selectionStart: e3.selectionStart, selectionEnd: e3.selectionEnd }, r2 = e3._text.slice(i3.selectionStart, i3.selectionEnd).join(""), n2 = s({ text: e3.text, value: r2 }, i3);
      t2.dataTransfer.setData("text/plain", r2), t2.dataTransfer.setData("application/fabric", JSON.stringify({ value: r2, styles: e3.getSelectionStyles(i3.selectionStart, i3.selectionEnd, true) })), t2.dataTransfer.effectAllowed = "copyMove", this.setDragImage(t2, n2);
    }
    return e3.abortCursorAnimation(), i2;
  }
  canDrop(t2) {
    if (this.target.editable && !this.target.getActiveControl() && !t2.defaultPrevented) {
      if (this.isActive() && this.__dragStartSelection) {
        const e3 = this.target.getSelectionStartFromPointer(t2), s2 = this.__dragStartSelection;
        return e3 < s2.selectionStart || e3 > s2.selectionEnd;
      }
      return true;
    }
    return false;
  }
  targetCanDrop(t2) {
    return this.target.canDrop(t2);
  }
  dragEnterHandler(t2) {
    let { e: e3 } = t2;
    const s2 = this.targetCanDrop(e3);
    !this.__isDraggingOver && s2 && (this.__isDraggingOver = true);
  }
  dragOverHandler(t2) {
    const { e: e3 } = t2, s2 = this.targetCanDrop(e3);
    !this.__isDraggingOver && s2 ? this.__isDraggingOver = true : this.__isDraggingOver && !s2 && (this.__isDraggingOver = false), this.__isDraggingOver && (e3.preventDefault(), t2.canDrop = true, t2.dropTarget = this.target);
  }
  dragLeaveHandler() {
    (this.__isDraggingOver || this.isActive()) && (this.__isDraggingOver = false);
  }
  dropHandler(t2) {
    var e3;
    const { e: s2 } = t2, i2 = s2.defaultPrevented;
    this.__isDraggingOver = false, s2.preventDefault();
    let r2 = (e3 = s2.dataTransfer) === null || e3 === undefined ? undefined : e3.getData("text/plain");
    if (r2 && !i2) {
      const e4 = this.target, i3 = e4.canvas;
      let n2 = e4.getSelectionStartFromPointer(s2);
      const { styles: o2 } = s2.dataTransfer.types.includes("application/fabric") ? JSON.parse(s2.dataTransfer.getData("application/fabric")) : {}, a2 = r2[Math.max(0, r2.length - 1)], h2 = 0;
      if (this.__dragStartSelection) {
        const t3 = this.__dragStartSelection.selectionStart, s3 = this.__dragStartSelection.selectionEnd;
        n2 > t3 && n2 <= s3 ? n2 = t3 : n2 > s3 && (n2 -= s3 - t3), e4.removeChars(t3, s3), delete this.__dragStartSelection;
      }
      e4._reNewline.test(a2) && (e4._reNewline.test(e4._text[n2]) || n2 === e4._text.length) && (r2 = r2.trimEnd()), t2.didDrop = true, t2.dropTarget = e4, e4.insertChars(r2, o2, n2), i3.setActiveObject(e4), e4.enterEditing(s2), e4.selectionStart = Math.min(n2 + h2, e4._text.length), e4.selectionEnd = Math.min(e4.selectionStart + r2.length, e4._text.length), e4.hiddenTextarea.value = e4.text, e4._updateTextarea(), e4.hiddenTextarea.focus(), e4.fire(z, { index: n2 + h2, action: "drop" }), i3.fire("text:changed", { target: e4 }), i3.contextTopDirty = true, i3.requestRenderAll();
    }
  }
  dragEndHandler(t2) {
    let { e: e3 } = t2;
    if (this.isActive() && this.__dragStartFired && this.__dragStartSelection) {
      var s2;
      const t3 = this.target, i2 = this.target.canvas, { selectionStart: r2, selectionEnd: n2 } = this.__dragStartSelection, o2 = ((s2 = e3.dataTransfer) === null || s2 === undefined ? undefined : s2.dropEffect) || j;
      o2 === j ? (t3.selectionStart = r2, t3.selectionEnd = n2, t3._updateTextarea(), t3.hiddenTextarea.focus()) : (t3.clearContextTop(), o2 === "move" && (t3.removeChars(r2, n2), t3.selectionStart = t3.selectionEnd = r2, t3.hiddenTextarea && (t3.hiddenTextarea.value = t3.text), t3._updateTextarea(), t3.fire(z, { index: r2, action: "dragend" }), i2.fire("text:changed", { target: t3 }), i2.requestRenderAll()), t3.exitEditing());
    }
    this.__dragImageDisposer && this.__dragImageDisposer(), delete this.__dragImageDisposer, delete this.__dragStartSelection, this.__isDraggingOver = false;
  }
  dispose() {
    this._dispose && this._dispose();
  }
}
var jo = /[ \n\.,;!\?\-]/;

class Fo extends Eo {
  constructor() {
    super(...arguments), t(this, "_currentCursorOpacity", 1);
  }
  initBehavior() {
    this._tick = this._tick.bind(this), this._onTickComplete = this._onTickComplete.bind(this), this.updateSelectionOnMouseMove = this.updateSelectionOnMouseMove.bind(this);
  }
  onDeselect(t2) {
    return this.isEditing && this.exitEditing(), this.selected = false, super.onDeselect(t2);
  }
  _animateCursor(t2) {
    let { toValue: e3, duration: s2, delay: i2, onComplete: r2 } = t2;
    return Us({ startValue: this._currentCursorOpacity, endValue: e3, duration: s2, delay: i2, onComplete: r2, abort: () => !this.canvas || this.selectionStart !== this.selectionEnd, onChange: (t3) => {
      this._currentCursorOpacity = t3, this.renderCursorOrSelection();
    } });
  }
  _tick(t2) {
    this._currentTickState = this._animateCursor({ toValue: 0, duration: this.cursorDuration / 2, delay: Math.max(t2 || 0, 100), onComplete: this._onTickComplete });
  }
  _onTickComplete() {
    var t2;
    (t2 = this._currentTickCompleteState) === null || t2 === undefined || t2.abort(), this._currentTickCompleteState = this._animateCursor({ toValue: 1, duration: this.cursorDuration, onComplete: this._tick });
  }
  initDelayedCursor(t2) {
    this.abortCursorAnimation(), this._tick(t2 ? 0 : this.cursorDelay);
  }
  abortCursorAnimation() {
    let t2 = false;
    [this._currentTickState, this._currentTickCompleteState].forEach((e3) => {
      e3 && !e3.isDone() && (t2 = true, e3.abort());
    }), this._currentCursorOpacity = 1, t2 && this.clearContextTop();
  }
  restartCursorIfNeeded() {
    [this._currentTickState, this._currentTickCompleteState].some((t2) => !t2 || t2.isDone()) && this.initDelayedCursor();
  }
  selectAll() {
    return this.selectionStart = 0, this.selectionEnd = this._text.length, this._fireSelectionChanged(), this._updateTextarea(), this;
  }
  cmdAll() {
    this.selectAll(), this.renderCursorOrSelection();
  }
  getSelectedText() {
    return this._text.slice(this.selectionStart, this.selectionEnd).join("");
  }
  findWordBoundaryLeft(t2) {
    let e3 = 0, s2 = t2 - 1;
    if (this._reSpace.test(this._text[s2]))
      for (;this._reSpace.test(this._text[s2]); )
        e3++, s2--;
    for (;/\S/.test(this._text[s2]) && s2 > -1; )
      e3++, s2--;
    return t2 - e3;
  }
  findWordBoundaryRight(t2) {
    let e3 = 0, s2 = t2;
    if (this._reSpace.test(this._text[s2]))
      for (;this._reSpace.test(this._text[s2]); )
        e3++, s2++;
    for (;/\S/.test(this._text[s2]) && s2 < this._text.length; )
      e3++, s2++;
    return t2 + e3;
  }
  findLineBoundaryLeft(t2) {
    let e3 = 0, s2 = t2 - 1;
    for (;!/\n/.test(this._text[s2]) && s2 > -1; )
      e3++, s2--;
    return t2 - e3;
  }
  findLineBoundaryRight(t2) {
    let e3 = 0, s2 = t2;
    for (;!/\n/.test(this._text[s2]) && s2 < this._text.length; )
      e3++, s2++;
    return t2 + e3;
  }
  searchWordBoundary(t2, e3) {
    const s2 = this._text;
    let i2 = t2 > 0 && this._reSpace.test(s2[t2]) && (e3 === -1 || !F.test(s2[t2 - 1])) ? t2 - 1 : t2, r2 = s2[i2];
    for (;i2 > 0 && i2 < s2.length && !jo.test(r2); )
      i2 += e3, r2 = s2[i2];
    return e3 === -1 && jo.test(r2) && i2++, i2;
  }
  selectWord(t2) {
    var e3;
    t2 = (e3 = t2) !== null && e3 !== undefined ? e3 : this.selectionStart;
    const s2 = this.searchWordBoundary(t2, -1), i2 = Math.max(s2, this.searchWordBoundary(t2, 1));
    this.selectionStart = s2, this.selectionEnd = i2, this._fireSelectionChanged(), this._updateTextarea(), this.renderCursorOrSelection();
  }
  selectLine(t2) {
    var e3;
    t2 = (e3 = t2) !== null && e3 !== undefined ? e3 : this.selectionStart;
    const s2 = this.findLineBoundaryLeft(t2), i2 = this.findLineBoundaryRight(t2);
    this.selectionStart = s2, this.selectionEnd = i2, this._fireSelectionChanged(), this._updateTextarea();
  }
  enterEditing(t2) {
    !this.isEditing && this.editable && (this.enterEditingImpl(), this.fire("editing:entered", t2 ? { e: t2 } : undefined), this._fireSelectionChanged(), this.canvas && (this.canvas.fire("text:editing:entered", { target: this, e: t2 }), this.canvas.requestRenderAll()));
  }
  enterEditingImpl() {
    this.canvas && (this.canvas.calcOffset(), this.canvas.textEditingManager.exitTextEditing()), this.isEditing = true, this.initHiddenTextarea(), this.hiddenTextarea.focus(), this.hiddenTextarea.value = this.text, this._updateTextarea(), this._saveEditingProps(), this._setEditingProps(), this._textBeforeEdit = this.text, this._tick();
  }
  updateSelectionOnMouseMove(t2) {
    if (this.getActiveControl())
      return;
    const e3 = this.hiddenTextarea;
    Kt(e3).activeElement !== e3 && e3.focus();
    const s2 = this.getSelectionStartFromPointer(t2), i2 = this.selectionStart, r2 = this.selectionEnd;
    (s2 === this.__selectionStartOnMouseDown && i2 !== r2 || i2 !== s2 && r2 !== s2) && (s2 > this.__selectionStartOnMouseDown ? (this.selectionStart = this.__selectionStartOnMouseDown, this.selectionEnd = s2) : (this.selectionStart = s2, this.selectionEnd = this.__selectionStartOnMouseDown), this.selectionStart === i2 && this.selectionEnd === r2 || (this._fireSelectionChanged(), this._updateTextarea(), this.renderCursorOrSelection()));
  }
  _setEditingProps() {
    this.hoverCursor = "text", this.canvas && (this.canvas.defaultCursor = this.canvas.moveCursor = "text"), this.borderColor = this.editingBorderColor, this.hasControls = this.selectable = false, this.lockMovementX = this.lockMovementY = true;
  }
  fromStringToGraphemeSelection(t2, e3, s2) {
    const i2 = s2.slice(0, t2), r2 = this.graphemeSplit(i2).length;
    if (t2 === e3)
      return { selectionStart: r2, selectionEnd: r2 };
    const n2 = s2.slice(t2, e3);
    return { selectionStart: r2, selectionEnd: r2 + this.graphemeSplit(n2).length };
  }
  fromGraphemeToStringSelection(t2, e3, s2) {
    const i2 = s2.slice(0, t2).join("").length;
    if (t2 === e3)
      return { selectionStart: i2, selectionEnd: i2 };
    return { selectionStart: i2, selectionEnd: i2 + s2.slice(t2, e3).join("").length };
  }
  _updateTextarea() {
    if (this.cursorOffsetCache = {}, this.hiddenTextarea) {
      if (!this.inCompositionMode) {
        const t2 = this.fromGraphemeToStringSelection(this.selectionStart, this.selectionEnd, this._text);
        this.hiddenTextarea.selectionStart = t2.selectionStart, this.hiddenTextarea.selectionEnd = t2.selectionEnd;
      }
      this.updateTextareaPosition();
    }
  }
  updateFromTextArea() {
    if (!this.hiddenTextarea)
      return;
    this.cursorOffsetCache = {};
    const t2 = this.hiddenTextarea;
    this.text = t2.value, this.set("dirty", true), this.initDimensions(), this.setCoords();
    const e3 = this.fromStringToGraphemeSelection(t2.selectionStart, t2.selectionEnd, t2.value);
    this.selectionEnd = this.selectionStart = e3.selectionEnd, this.inCompositionMode || (this.selectionStart = e3.selectionStart), this.updateTextareaPosition();
  }
  updateTextareaPosition() {
    if (this.selectionStart === this.selectionEnd) {
      const t2 = this._calcTextareaPosition();
      this.hiddenTextarea.style.left = t2.left, this.hiddenTextarea.style.top = t2.top;
    }
  }
  _calcTextareaPosition() {
    if (!this.canvas)
      return { left: "1px", top: "1px" };
    const t2 = this.inCompositionMode ? this.compositionStart : this.selectionStart, e3 = this._getCursorBoundaries(t2), s2 = this.get2DCursorLocation(t2), i2 = s2.lineIndex, r2 = s2.charIndex, n2 = this.getValueOfPropertyAt(i2, r2, "fontSize") * this.lineHeight, o2 = e3.leftOffset, a2 = this.getCanvasRetinaScaling(), h2 = this.canvas.upperCanvasEl, c2 = h2.width / a2, l2 = h2.height / a2, u2 = c2 - n2, d2 = l2 - n2, g2 = new ot(e3.left + o2, e3.top + e3.topOffset + n2).transform(this.calcTransformMatrix()).transform(this.canvas.viewportTransform).multiply(new ot(h2.clientWidth / c2, h2.clientHeight / l2));
    return g2.x < 0 && (g2.x = 0), g2.x > u2 && (g2.x = u2), g2.y < 0 && (g2.y = 0), g2.y > d2 && (g2.y = d2), g2.x += this.canvas._offset.left, g2.y += this.canvas._offset.top, { left: "".concat(g2.x, "px"), top: "".concat(g2.y, "px"), fontSize: "".concat(n2, "px"), charHeight: n2 };
  }
  _saveEditingProps() {
    this._savedProps = { hasControls: this.hasControls, borderColor: this.borderColor, lockMovementX: this.lockMovementX, lockMovementY: this.lockMovementY, hoverCursor: this.hoverCursor, selectable: this.selectable, defaultCursor: this.canvas && this.canvas.defaultCursor, moveCursor: this.canvas && this.canvas.moveCursor };
  }
  _restoreEditingProps() {
    this._savedProps && (this.hoverCursor = this._savedProps.hoverCursor, this.hasControls = this._savedProps.hasControls, this.borderColor = this._savedProps.borderColor, this.selectable = this._savedProps.selectable, this.lockMovementX = this._savedProps.lockMovementX, this.lockMovementY = this._savedProps.lockMovementY, this.canvas && (this.canvas.defaultCursor = this._savedProps.defaultCursor || this.canvas.defaultCursor, this.canvas.moveCursor = this._savedProps.moveCursor || this.canvas.moveCursor), delete this._savedProps);
  }
  _exitEditing() {
    const t2 = this.hiddenTextarea;
    this.selected = false, this.isEditing = false, t2 && (t2.blur && t2.blur(), t2.parentNode && t2.parentNode.removeChild(t2)), this.hiddenTextarea = null, this.abortCursorAnimation(), this.selectionStart !== this.selectionEnd && this.clearContextTop();
  }
  exitEditingImpl() {
    this._exitEditing(), this.selectionEnd = this.selectionStart, this._restoreEditingProps(), this._forceClearCache && (this.initDimensions(), this.setCoords());
  }
  exitEditing() {
    const t2 = this._textBeforeEdit !== this.text;
    return this.exitEditingImpl(), this.fire("editing:exited"), t2 && this.fire(Q), this.canvas && (this.canvas.fire("text:editing:exited", { target: this }), t2 && this.canvas.fire("object:modified", { target: this })), this;
  }
  _removeExtraneousStyles() {
    for (const t2 in this.styles)
      this._textLines[t2] || delete this.styles[t2];
  }
  removeStyleFromTo(t2, e3) {
    const { lineIndex: s2, charIndex: i2 } = this.get2DCursorLocation(t2, true), { lineIndex: r2, charIndex: n2 } = this.get2DCursorLocation(e3, true);
    if (s2 !== r2) {
      if (this.styles[s2])
        for (let t3 = i2;t3 < this._unwrappedTextLines[s2].length; t3++)
          delete this.styles[s2][t3];
      if (this.styles[r2])
        for (let t3 = n2;t3 < this._unwrappedTextLines[r2].length; t3++) {
          const e4 = this.styles[r2][t3];
          e4 && (this.styles[s2] || (this.styles[s2] = {}), this.styles[s2][i2 + t3 - n2] = e4);
        }
      for (let t3 = s2 + 1;t3 <= r2; t3++)
        delete this.styles[t3];
      this.shiftLineStyles(r2, s2 - r2);
    } else if (this.styles[s2]) {
      const t3 = this.styles[s2], e4 = n2 - i2;
      for (let e5 = i2;e5 < n2; e5++)
        delete t3[e5];
      for (const i3 in this.styles[s2]) {
        const s3 = parseInt(i3, 10);
        s3 >= n2 && (t3[s3 - e4] = t3[i3], delete t3[i3]);
      }
    }
  }
  shiftLineStyles(t2, e3) {
    const s2 = Object.assign({}, this.styles);
    for (const i2 in this.styles) {
      const r2 = parseInt(i2, 10);
      r2 > t2 && (this.styles[r2 + e3] = s2[r2], s2[r2 - e3] || delete this.styles[r2]);
    }
  }
  insertNewlineStyleObject(t2, e3, i2, r2) {
    const n2 = {}, o2 = this._unwrappedTextLines[t2].length, a2 = o2 === e3;
    let h2 = false;
    i2 || (i2 = 1), this.shiftLineStyles(t2, i2);
    const c2 = this.styles[t2] ? this.styles[t2][e3 === 0 ? e3 : e3 - 1] : undefined;
    for (const s2 in this.styles[t2]) {
      const i3 = parseInt(s2, 10);
      i3 >= e3 && (h2 = true, n2[i3 - e3] = this.styles[t2][s2], a2 && e3 === 0 || delete this.styles[t2][s2]);
    }
    let l2 = false;
    for (h2 && !a2 && (this.styles[t2 + i2] = n2, l2 = true), (l2 || o2 > e3) && i2--;i2 > 0; )
      r2 && r2[i2 - 1] ? this.styles[t2 + i2] = { 0: s({}, r2[i2 - 1]) } : c2 ? this.styles[t2 + i2] = { 0: s({}, c2) } : delete this.styles[t2 + i2], i2--;
    this._forceClearCache = true;
  }
  insertCharStyleObject(t2, e3, i2, r2) {
    this.styles || (this.styles = {});
    const n2 = this.styles[t2], o2 = n2 ? s({}, n2) : {};
    i2 || (i2 = 1);
    for (const t3 in o2) {
      const s2 = parseInt(t3, 10);
      s2 >= e3 && (n2[s2 + i2] = o2[s2], o2[s2 - i2] || delete n2[s2]);
    }
    if (this._forceClearCache = true, r2) {
      for (;i2--; )
        Object.keys(r2[i2]).length && (this.styles[t2] || (this.styles[t2] = {}), this.styles[t2][e3 + i2] = s({}, r2[i2]));
      return;
    }
    if (!n2)
      return;
    const a2 = n2[e3 ? e3 - 1 : 1];
    for (;a2 && i2--; )
      this.styles[t2][e3 + i2] = s({}, a2);
  }
  insertNewStyleBlock(t2, e3, s2) {
    const i2 = this.get2DCursorLocation(e3, true), r2 = [0];
    let n2, o2 = 0;
    for (let e4 = 0;e4 < t2.length; e4++)
      t2[e4] === `
` ? (o2++, r2[o2] = 0) : r2[o2]++;
    for (r2[0] > 0 && (this.insertCharStyleObject(i2.lineIndex, i2.charIndex, r2[0], s2), s2 = s2 && s2.slice(r2[0] + 1)), o2 && this.insertNewlineStyleObject(i2.lineIndex, i2.charIndex + r2[0], o2), n2 = 1;n2 < o2; n2++)
      r2[n2] > 0 ? this.insertCharStyleObject(i2.lineIndex + n2, 0, r2[n2], s2) : s2 && this.styles[i2.lineIndex + n2] && s2[0] && (this.styles[i2.lineIndex + n2][0] = s2[0]), s2 = s2 && s2.slice(r2[n2] + 1);
    r2[n2] > 0 && this.insertCharStyleObject(i2.lineIndex + n2, 0, r2[n2], s2);
  }
  removeChars(t2) {
    let e3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : t2 + 1;
    this.removeStyleFromTo(t2, e3), this._text.splice(t2, e3 - t2), this.text = this._text.join(""), this.set("dirty", true), this.initDimensions(), this.setCoords(), this._removeExtraneousStyles();
  }
  insertChars(t2, e3, s2) {
    let i2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : s2;
    i2 > s2 && this.removeStyleFromTo(s2, i2);
    const r2 = this.graphemeSplit(t2);
    this.insertNewStyleBlock(r2, s2, e3), this._text = [...this._text.slice(0, s2), ...r2, ...this._text.slice(i2)], this.text = this._text.join(""), this.set("dirty", true), this.initDimensions(), this.setCoords(), this._removeExtraneousStyles();
  }
  setSelectionStartEndWithShift(t2, e3, s2) {
    s2 <= t2 ? (e3 === t2 ? this._selectionDirection = M : this._selectionDirection === A && (this._selectionDirection = M, this.selectionEnd = t2), this.selectionStart = s2) : s2 > t2 && s2 < e3 ? this._selectionDirection === A ? this.selectionEnd = s2 : this.selectionStart = s2 : (e3 === t2 ? this._selectionDirection = A : this._selectionDirection === M && (this._selectionDirection = A, this.selectionStart = e3), this.selectionEnd = s2);
  }
}

class Lo extends Fo {
  initHiddenTextarea() {
    const t2 = this.canvas && Kt(this.canvas.getElement()) || m(), e3 = t2.createElement("textarea");
    Object.entries({ autocapitalize: "off", autocorrect: "off", autocomplete: "off", spellcheck: "false", "data-fabric": "textarea", wrap: "off" }).map((t3) => {
      let [s3, i3] = t3;
      return e3.setAttribute(s3, i3);
    });
    const { top: s2, left: i2, fontSize: r2 } = this._calcTextareaPosition();
    e3.style.cssText = "position: absolute; top: ".concat(s2, "; left: ").concat(i2, "; z-index: -999; opacity: 0; width: 1px; height: 1px; font-size: 1px; padding-top: ").concat(r2, ";"), (this.hiddenTextareaContainer || t2.body).appendChild(e3), Object.entries({ blur: "blur", keydown: "onKeyDown", keyup: "onKeyUp", input: "onInput", copy: "copy", cut: "copy", paste: "paste", compositionstart: "onCompositionStart", compositionupdate: "onCompositionUpdate", compositionend: "onCompositionEnd" }).map((t3) => {
      let [s3, i3] = t3;
      return e3.addEventListener(s3, this[i3].bind(this));
    }), this.hiddenTextarea = e3;
  }
  blur() {
    this.abortCursorAnimation();
  }
  onKeyDown(t2) {
    if (!this.isEditing)
      return;
    const e3 = this.direction === "rtl" ? this.keysMapRtl : this.keysMap;
    if (t2.keyCode in e3)
      this[e3[t2.keyCode]](t2);
    else {
      if (!(t2.keyCode in this.ctrlKeysMapDown) || !t2.ctrlKey && !t2.metaKey)
        return;
      this[this.ctrlKeysMapDown[t2.keyCode]](t2);
    }
    t2.stopImmediatePropagation(), t2.preventDefault(), t2.keyCode >= 33 && t2.keyCode <= 40 ? (this.inCompositionMode = false, this.clearContextTop(), this.renderCursorOrSelection()) : this.canvas && this.canvas.requestRenderAll();
  }
  onKeyUp(t2) {
    !this.isEditing || this._copyDone || this.inCompositionMode ? this._copyDone = false : (t2.keyCode in this.ctrlKeysMapUp) && (t2.ctrlKey || t2.metaKey) && (this[this.ctrlKeysMapUp[t2.keyCode]](t2), t2.stopImmediatePropagation(), t2.preventDefault(), this.canvas && this.canvas.requestRenderAll());
  }
  onInput(t2) {
    const e3 = this.fromPaste, { value: s2, selectionStart: i2, selectionEnd: r2 } = this.hiddenTextarea;
    if (this.fromPaste = false, t2 && t2.stopPropagation(), !this.isEditing)
      return;
    const n2 = () => {
      this.updateFromTextArea(), this.fire(z), this.canvas && (this.canvas.fire("text:changed", { target: this }), this.canvas.requestRenderAll());
    };
    if (this.hiddenTextarea.value === "")
      return this.styles = {}, void n2();
    const a2 = this._splitTextIntoLines(s2).graphemeText, h2 = this._text.length, c2 = a2.length, l2 = this.selectionStart, u2 = this.selectionEnd, d2 = l2 !== u2;
    let g2, f, m2, v2, y2 = c2 - h2;
    const _2 = this.fromStringToGraphemeSelection(i2, r2, s2), x2 = l2 > _2.selectionStart;
    d2 ? (f = this._text.slice(l2, u2), y2 += u2 - l2) : c2 < h2 && (f = x2 ? this._text.slice(u2 + y2, u2) : this._text.slice(l2, l2 - y2));
    const C2 = a2.slice(_2.selectionEnd - y2, _2.selectionEnd);
    if (f && f.length && (C2.length && (g2 = this.getSelectionStyles(l2, l2 + 1, false), g2 = C2.map(() => g2[0])), d2 ? (m2 = l2, v2 = u2) : x2 ? (m2 = u2 - f.length, v2 = u2) : (m2 = u2, v2 = u2 + f.length), this.removeStyleFromTo(m2, v2)), C2.length) {
      const { copyPasteData: t3 } = p();
      e3 && C2.join("") === t3.copiedText && !o.disableStyleCopyPaste && (g2 = t3.copiedTextStyle), this.insertNewStyleBlock(C2, l2, g2);
    }
    n2();
  }
  onCompositionStart() {
    this.inCompositionMode = true;
  }
  onCompositionEnd() {
    this.inCompositionMode = false;
  }
  onCompositionUpdate(t2) {
    let { target: e3 } = t2;
    const { selectionStart: s2, selectionEnd: i2 } = e3;
    this.compositionStart = s2, this.compositionEnd = i2, this.updateTextareaPosition();
  }
  copy() {
    if (this.selectionStart === this.selectionEnd)
      return;
    const { copyPasteData: t2 } = p();
    t2.copiedText = this.getSelectedText(), o.disableStyleCopyPaste ? t2.copiedTextStyle = undefined : t2.copiedTextStyle = this.getSelectionStyles(this.selectionStart, this.selectionEnd, true), this._copyDone = true;
  }
  paste() {
    this.fromPaste = true;
  }
  _getWidthBeforeCursor(t2, e3) {
    let s2, i2 = this._getLineLeftOffset(t2);
    return e3 > 0 && (s2 = this.__charBounds[t2][e3 - 1], i2 += s2.left + s2.width), i2;
  }
  getDownCursorOffset(t2, e3) {
    const s2 = this._getSelectionForOffset(t2, e3), i2 = this.get2DCursorLocation(s2), r2 = i2.lineIndex;
    if (r2 === this._textLines.length - 1 || t2.metaKey || t2.keyCode === 34)
      return this._text.length - s2;
    const n2 = i2.charIndex, o2 = this._getWidthBeforeCursor(r2, n2), a2 = this._getIndexOnLine(r2 + 1, o2);
    return this._textLines[r2].slice(n2).length + a2 + 1 + this.missingNewlineOffset(r2);
  }
  _getSelectionForOffset(t2, e3) {
    return t2.shiftKey && this.selectionStart !== this.selectionEnd && e3 ? this.selectionEnd : this.selectionStart;
  }
  getUpCursorOffset(t2, e3) {
    const s2 = this._getSelectionForOffset(t2, e3), i2 = this.get2DCursorLocation(s2), r2 = i2.lineIndex;
    if (r2 === 0 || t2.metaKey || t2.keyCode === 33)
      return -s2;
    const n2 = i2.charIndex, o2 = this._getWidthBeforeCursor(r2, n2), a2 = this._getIndexOnLine(r2 - 1, o2), h2 = this._textLines[r2].slice(0, n2), c2 = this.missingNewlineOffset(r2 - 1);
    return -this._textLines[r2 - 1].length + a2 - h2.length + (1 - c2);
  }
  _getIndexOnLine(t2, e3) {
    const s2 = this._textLines[t2];
    let i2, r2, n2 = this._getLineLeftOffset(t2), o2 = 0;
    for (let a2 = 0, h2 = s2.length;a2 < h2; a2++)
      if (i2 = this.__charBounds[t2][a2].width, n2 += i2, n2 > e3) {
        r2 = true;
        const t3 = n2 - i2, s3 = n2, h3 = Math.abs(t3 - e3);
        o2 = Math.abs(s3 - e3) < h3 ? a2 : a2 - 1;
        break;
      }
    return r2 || (o2 = s2.length - 1), o2;
  }
  moveCursorDown(t2) {
    this.selectionStart >= this._text.length && this.selectionEnd >= this._text.length || this._moveCursorUpOrDown("Down", t2);
  }
  moveCursorUp(t2) {
    this.selectionStart === 0 && this.selectionEnd === 0 || this._moveCursorUpOrDown("Up", t2);
  }
  _moveCursorUpOrDown(t2, e3) {
    const s2 = this["get".concat(t2, "CursorOffset")](e3, this._selectionDirection === A);
    if (e3.shiftKey ? this.moveCursorWithShift(s2) : this.moveCursorWithoutShift(s2), s2 !== 0) {
      const t3 = this.text.length;
      this.selectionStart = ks(0, this.selectionStart, t3), this.selectionEnd = ks(0, this.selectionEnd, t3), this.abortCursorAnimation(), this.initDelayedCursor(), this._fireSelectionChanged(), this._updateTextarea();
    }
  }
  moveCursorWithShift(t2) {
    const e3 = this._selectionDirection === M ? this.selectionStart + t2 : this.selectionEnd + t2;
    return this.setSelectionStartEndWithShift(this.selectionStart, this.selectionEnd, e3), t2 !== 0;
  }
  moveCursorWithoutShift(t2) {
    return t2 < 0 ? (this.selectionStart += t2, this.selectionEnd = this.selectionStart) : (this.selectionEnd += t2, this.selectionStart = this.selectionEnd), t2 !== 0;
  }
  moveCursorLeft(t2) {
    this.selectionStart === 0 && this.selectionEnd === 0 || this._moveCursorLeftOrRight("Left", t2);
  }
  _move(t2, e3, s2) {
    let i2;
    if (t2.altKey)
      i2 = this["findWordBoundary".concat(s2)](this[e3]);
    else {
      if (!t2.metaKey && t2.keyCode !== 35 && t2.keyCode !== 36)
        return this[e3] += s2 === "Left" ? -1 : 1, true;
      i2 = this["findLineBoundary".concat(s2)](this[e3]);
    }
    return i2 !== undefined && this[e3] !== i2 && (this[e3] = i2, true);
  }
  _moveLeft(t2, e3) {
    return this._move(t2, e3, "Left");
  }
  _moveRight(t2, e3) {
    return this._move(t2, e3, "Right");
  }
  moveCursorLeftWithoutShift(t2) {
    let e3 = true;
    return this._selectionDirection = M, this.selectionEnd === this.selectionStart && this.selectionStart !== 0 && (e3 = this._moveLeft(t2, "selectionStart")), this.selectionEnd = this.selectionStart, e3;
  }
  moveCursorLeftWithShift(t2) {
    return this._selectionDirection === A && this.selectionStart !== this.selectionEnd ? this._moveLeft(t2, "selectionEnd") : this.selectionStart !== 0 ? (this._selectionDirection = M, this._moveLeft(t2, "selectionStart")) : undefined;
  }
  moveCursorRight(t2) {
    this.selectionStart >= this._text.length && this.selectionEnd >= this._text.length || this._moveCursorLeftOrRight("Right", t2);
  }
  _moveCursorLeftOrRight(t2, e3) {
    const s2 = "moveCursor".concat(t2).concat(e3.shiftKey ? "WithShift" : "WithoutShift");
    this._currentCursorOpacity = 1, this[s2](e3) && (this.abortCursorAnimation(), this.initDelayedCursor(), this._fireSelectionChanged(), this._updateTextarea());
  }
  moveCursorRightWithShift(t2) {
    return this._selectionDirection === M && this.selectionStart !== this.selectionEnd ? this._moveRight(t2, "selectionStart") : this.selectionEnd !== this._text.length ? (this._selectionDirection = A, this._moveRight(t2, "selectionEnd")) : undefined;
  }
  moveCursorRightWithoutShift(t2) {
    let e3 = true;
    return this._selectionDirection = A, this.selectionStart === this.selectionEnd ? (e3 = this._moveRight(t2, "selectionStart"), this.selectionEnd = this.selectionStart) : this.selectionStart = this.selectionEnd, e3;
  }
}
var Ro = (t2) => !!t2.button;

class Io extends Lo {
  constructor() {
    super(...arguments), t(this, "draggableTextDelegate", undefined);
  }
  initBehavior() {
    this.on("mousedown", this._mouseDownHandler), this.on("mouseup", this.mouseUpHandler), this.on("mousedblclick", this.doubleClickHandler), this.on("mousetripleclick", this.tripleClickHandler), this.draggableTextDelegate = new Ao(this), super.initBehavior();
  }
  shouldStartDragging() {
    return this.draggableTextDelegate.isActive();
  }
  onDragStart(t2) {
    return this.draggableTextDelegate.onDragStart(t2);
  }
  canDrop(t2) {
    return this.draggableTextDelegate.canDrop(t2);
  }
  doubleClickHandler(t2) {
    this.isEditing && (this.selectWord(this.getSelectionStartFromPointer(t2.e)), this.renderCursorOrSelection());
  }
  tripleClickHandler(t2) {
    this.isEditing && (this.selectLine(this.getSelectionStartFromPointer(t2.e)), this.renderCursorOrSelection());
  }
  _mouseDownHandler(t2) {
    let { e: e3, alreadySelected: s2 } = t2;
    this.canvas && this.editable && !Ro(e3) && !this.getActiveControl() && (this.draggableTextDelegate.start(e3) || (this.canvas.textEditingManager.register(this), s2 && (this.inCompositionMode = false, this.setCursorByClick(e3)), this.isEditing && (this.__selectionStartOnMouseDown = this.selectionStart, this.selectionStart === this.selectionEnd && this.abortCursorAnimation(), this.renderCursorOrSelection()), this.selected || (this.selected = s2 || this.isEditing)));
  }
  mouseUpHandler(t2) {
    let { e: e3, transform: s2 } = t2;
    const i2 = this.draggableTextDelegate.end(e3);
    if (this.canvas) {
      this.canvas.textEditingManager.unregister(this);
      const t3 = this.canvas._activeObject;
      if (t3 && t3 !== this)
        return;
    }
    !this.editable || this.group && !this.group.interactive || s2 && s2.actionPerformed || Ro(e3) || i2 || this.selected && !this.getActiveControl() && (this.enterEditing(e3), this.selectionStart === this.selectionEnd ? this.initDelayedCursor(true) : this.renderCursorOrSelection());
  }
  setCursorByClick(t2) {
    const e3 = this.getSelectionStartFromPointer(t2), s2 = this.selectionStart, i2 = this.selectionEnd;
    t2.shiftKey ? this.setSelectionStartEndWithShift(s2, i2, e3) : (this.selectionStart = e3, this.selectionEnd = e3), this.isEditing && (this._fireSelectionChanged(), this._updateTextarea());
  }
  getSelectionStartFromPointer(t2) {
    const e3 = this.canvas.getScenePoint(t2).transform(wt(this.calcTransformMatrix())).add(new ot(-this._getLeftOffset(), -this._getTopOffset()));
    let s2 = 0, i2 = 0, r2 = 0;
    for (let t3 = 0;t3 < this._textLines.length && s2 <= e3.y; t3++)
      s2 += this.getHeightOfLine(t3), r2 = t3, t3 > 0 && (i2 += this._textLines[t3 - 1].length + this.missingNewlineOffset(t3 - 1));
    let n2 = Math.abs(this._getLineLeftOffset(r2));
    const o2 = this._textLines[r2].length, a2 = this.__charBounds[r2];
    for (let t3 = 0;t3 < o2; t3++) {
      const s3 = n2 + a2[t3].kernedWidth;
      if (e3.x <= s3) {
        Math.abs(e3.x - s3) <= Math.abs(e3.x - n2) && i2++;
        break;
      }
      n2 = s3, i2++;
    }
    return Math.min(this.flipX ? o2 - i2 : i2, this._text.length);
  }
}
var Bo = "moveCursorUp";
var Xo = "moveCursorDown";
var Yo = "moveCursorLeft";
var Wo = "moveCursorRight";
var Vo = "exitEditing";
var zo = (t2, e3) => {
  const s2 = e3.getRetinaScaling();
  t2.setTransform(s2, 0, 0, s2, 0, 0);
  const i2 = e3.viewportTransform;
  t2.transform(i2[0], i2[1], i2[2], i2[3], i2[4], i2[5]);
};
var Go = s({ selectionStart: 0, selectionEnd: 0, selectionColor: "rgba(17,119,255,0.3)", isEditing: false, editable: true, editingBorderColor: "rgba(102,153,255,0.25)", cursorWidth: 2, cursorColor: "", cursorDelay: 1000, cursorDuration: 600, caching: true, hiddenTextareaContainer: null, keysMap: { 9: Vo, 27: Vo, 33: Bo, 34: Xo, 35: Wo, 36: Yo, 37: Yo, 38: Bo, 39: Wo, 40: Xo }, keysMapRtl: { 9: Vo, 27: Vo, 33: Bo, 34: Xo, 35: Yo, 36: Wo, 37: Wo, 38: Bo, 39: Yo, 40: Xo }, ctrlKeysMapDown: { 65: "cmdAll" }, ctrlKeysMapUp: { 67: "copy", 88: "cut" } }, { _selectionDirection: null, _reSpace: /\s|\r?\n/, inCompositionMode: false });

class Ho extends Io {
  static getDefaults() {
    return s(s({}, super.getDefaults()), Ho.ownDefaults);
  }
  get type() {
    const t2 = super.type;
    return t2 === "itext" ? "i-text" : t2;
  }
  constructor(t2, e3) {
    super(t2, s(s({}, Ho.ownDefaults), e3)), this.initBehavior();
  }
  _set(t2, e3) {
    return this.isEditing && this._savedProps && t2 in this._savedProps ? (this._savedProps[t2] = e3, this) : (t2 === "canvas" && (this.canvas instanceof In && this.canvas.textEditingManager.remove(this), e3 instanceof In && e3.textEditingManager.add(this)), super._set(t2, e3));
  }
  setSelectionStart(t2) {
    t2 = Math.max(t2, 0), this._updateAndFire("selectionStart", t2);
  }
  setSelectionEnd(t2) {
    t2 = Math.min(t2, this.text.length), this._updateAndFire("selectionEnd", t2);
  }
  _updateAndFire(t2, e3) {
    this[t2] !== e3 && (this._fireSelectionChanged(), this[t2] = e3), this._updateTextarea();
  }
  _fireSelectionChanged() {
    this.fire("selection:changed"), this.canvas && this.canvas.fire("text:selection:changed", { target: this });
  }
  initDimensions() {
    this.isEditing && this.initDelayedCursor(), super.initDimensions();
  }
  getSelectionStyles() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.selectionStart || 0, e3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.selectionEnd, s2 = arguments.length > 2 ? arguments[2] : undefined;
    return super.getSelectionStyles(t2, e3, s2);
  }
  setSelectionStyles(t2) {
    let e3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.selectionStart || 0, s2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.selectionEnd;
    return super.setSelectionStyles(t2, e3, s2);
  }
  get2DCursorLocation() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.selectionStart, e3 = arguments.length > 1 ? arguments[1] : undefined;
    return super.get2DCursorLocation(t2, e3);
  }
  render(t2) {
    super.render(t2), this.cursorOffsetCache = {}, this.renderCursorOrSelection();
  }
  toCanvasElement(t2) {
    const e3 = this.isEditing;
    this.isEditing = false;
    const s2 = super.toCanvasElement(t2);
    return this.isEditing = e3, s2;
  }
  renderCursorOrSelection() {
    if (!this.isEditing || !this.canvas)
      return;
    const t2 = this.clearContextTop(true);
    if (!t2)
      return;
    const e3 = this._getCursorBoundaries(), s2 = this.findAncestorsWithClipPath(), i2 = s2.length > 0;
    let r2, n2 = t2;
    if (i2) {
      r2 = vt(t2.canvas), n2 = r2.getContext("2d"), zo(n2, this.canvas);
      const e4 = this.calcTransformMatrix();
      n2.transform(e4[0], e4[1], e4[2], e4[3], e4[4], e4[5]);
    }
    if (this.selectionStart !== this.selectionEnd || this.inCompositionMode ? this.renderSelection(n2, e3) : this.renderCursor(n2, e3), i2)
      for (const e4 of s2) {
        const s3 = e4.clipPath, i3 = vt(t2.canvas), r3 = i3.getContext("2d");
        if (zo(r3, this.canvas), !s3.absolutePositioned) {
          const t3 = e4.calcTransformMatrix();
          r3.transform(t3[0], t3[1], t3[2], t3[3], t3[4], t3[5]);
        }
        s3.transform(r3), s3.drawObject(r3, true, {}), this.drawClipPathOnCache(n2, s3, i3);
      }
    i2 && (t2.setTransform(1, 0, 0, 1, 0, 0), t2.drawImage(r2, 0, 0)), this.canvas.contextTopDirty = true, t2.restore();
  }
  findAncestorsWithClipPath() {
    const t2 = [];
    let e3 = this;
    for (;e3; )
      e3.clipPath && t2.push(e3), e3 = e3.parent;
    return t2;
  }
  _getCursorBoundaries() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.selectionStart, e3 = arguments.length > 1 ? arguments[1] : undefined;
    const s2 = this._getLeftOffset(), i2 = this._getTopOffset(), r2 = this._getCursorBoundariesOffsets(t2, e3);
    return { left: s2, top: i2, leftOffset: r2.left, topOffset: r2.top };
  }
  _getCursorBoundariesOffsets(t2, e3) {
    return e3 ? this.__getCursorBoundariesOffsets(t2) : this.cursorOffsetCache && ("top" in this.cursorOffsetCache) ? this.cursorOffsetCache : this.cursorOffsetCache = this.__getCursorBoundariesOffsets(t2);
  }
  __getCursorBoundariesOffsets(t2) {
    let e3 = 0, s2 = 0;
    const { charIndex: i2, lineIndex: r2 } = this.get2DCursorLocation(t2);
    for (let t3 = 0;t3 < r2; t3++)
      e3 += this.getHeightOfLine(t3);
    const n2 = this._getLineLeftOffset(r2), o2 = this.__charBounds[r2][i2];
    o2 && (s2 = o2.left), this.charSpacing !== 0 && i2 === this._textLines[r2].length && (s2 -= this._getWidthOfCharSpacing());
    const a2 = { top: e3, left: n2 + (s2 > 0 ? s2 : 0) };
    return this.direction === "rtl" && (this.textAlign === A || this.textAlign === qe || this.textAlign === Je ? a2.left *= -1 : this.textAlign === M || this.textAlign === Ke ? a2.left = n2 - (s2 > 0 ? s2 : 0) : this.textAlign !== D && this.textAlign !== Qe || (a2.left = n2 - (s2 > 0 ? s2 : 0))), a2;
  }
  renderCursorAt(t2) {
    this._renderCursor(this.canvas.contextTop, this._getCursorBoundaries(t2, true), t2);
  }
  renderCursor(t2, e3) {
    this._renderCursor(t2, e3, this.selectionStart);
  }
  getCursorRenderingData() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.selectionStart, e3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._getCursorBoundaries(t2);
    const s2 = this.get2DCursorLocation(t2), i2 = s2.lineIndex, r2 = s2.charIndex > 0 ? s2.charIndex - 1 : 0, n2 = this.getValueOfPropertyAt(i2, r2, "fontSize"), o2 = this.getObjectScaling().x * this.canvas.getZoom(), a2 = this.cursorWidth / o2, h2 = this.getValueOfPropertyAt(i2, r2, "deltaY"), c2 = e3.topOffset + (1 - this._fontSizeFraction) * this.getHeightOfLine(i2) / this.lineHeight - n2 * (1 - this._fontSizeFraction);
    return { color: this.cursorColor || this.getValueOfPropertyAt(i2, r2, "fill"), opacity: this._currentCursorOpacity, left: e3.left + e3.leftOffset - a2 / 2, top: c2 + e3.top + h2, width: a2, height: n2 };
  }
  _renderCursor(t2, e3, s2) {
    const { color: i2, opacity: r2, left: n2, top: o2, width: a2, height: h2 } = this.getCursorRenderingData(s2, e3);
    t2.fillStyle = i2, t2.globalAlpha = r2, t2.fillRect(n2, o2, a2, h2);
  }
  renderSelection(t2, e3) {
    const s2 = { selectionStart: this.inCompositionMode ? this.hiddenTextarea.selectionStart : this.selectionStart, selectionEnd: this.inCompositionMode ? this.hiddenTextarea.selectionEnd : this.selectionEnd };
    this._renderSelection(t2, s2, e3);
  }
  renderDragSourceEffect() {
    const t2 = this.draggableTextDelegate.getDragStartSelection();
    this._renderSelection(this.canvas.contextTop, t2, this._getCursorBoundaries(t2.selectionStart, true));
  }
  renderDropTargetEffect(t2) {
    const e3 = this.getSelectionStartFromPointer(t2);
    this.renderCursorAt(e3);
  }
  _renderSelection(t2, e3, s2) {
    const { selectionStart: i2, selectionEnd: r2 } = e3, n2 = this.textAlign.includes(qe), o2 = this.get2DCursorLocation(i2), a2 = this.get2DCursorLocation(r2), h2 = o2.lineIndex, c2 = a2.lineIndex, l2 = o2.charIndex < 0 ? 0 : o2.charIndex, u2 = a2.charIndex < 0 ? 0 : a2.charIndex;
    for (let e4 = h2;e4 <= c2; e4++) {
      const i3 = this._getLineLeftOffset(e4) || 0;
      let r3 = this.getHeightOfLine(e4), o3 = 0, a3 = 0, d2 = 0;
      if (e4 === h2 && (a3 = this.__charBounds[h2][l2].left), e4 >= h2 && e4 < c2)
        d2 = n2 && !this.isEndOfWrapping(e4) ? this.width : this.getLineWidth(e4) || 5;
      else if (e4 === c2)
        if (u2 === 0)
          d2 = this.__charBounds[c2][u2].left;
        else {
          const t3 = this._getWidthOfCharSpacing();
          d2 = this.__charBounds[c2][u2 - 1].left + this.__charBounds[c2][u2 - 1].width - t3;
        }
      o3 = r3, (this.lineHeight < 1 || e4 === c2 && this.lineHeight > 1) && (r3 /= this.lineHeight);
      let g2 = s2.left + i3 + a3, f = r3, p2 = 0;
      const m2 = d2 - a3;
      this.inCompositionMode ? (t2.fillStyle = this.compositionColor || "black", f = 1, p2 = r3) : t2.fillStyle = this.selectionColor, this.direction === "rtl" && (this.textAlign === A || this.textAlign === qe || this.textAlign === Je ? g2 = this.width - g2 - m2 : this.textAlign === M || this.textAlign === Ke ? g2 = s2.left + i3 - d2 : this.textAlign !== D && this.textAlign !== Qe || (g2 = s2.left + i3 - d2)), t2.fillRect(g2, s2.top + s2.topOffset + p2, m2, f), s2.topOffset += o3;
    }
  }
  getCurrentCharFontSize() {
    const t2 = this._getCurrentCharIndex();
    return this.getValueOfPropertyAt(t2.l, t2.c, "fontSize");
  }
  getCurrentCharColor() {
    const t2 = this._getCurrentCharIndex();
    return this.getValueOfPropertyAt(t2.l, t2.c, K);
  }
  _getCurrentCharIndex() {
    const t2 = this.get2DCursorLocation(this.selectionStart, true), e3 = t2.charIndex > 0 ? t2.charIndex - 1 : 0;
    return { l: t2.lineIndex, c: e3 };
  }
  dispose() {
    this.exitEditingImpl(), this.draggableTextDelegate.dispose(), super.dispose();
  }
}
t(Ho, "ownDefaults", Go), t(Ho, "type", "IText"), tt.setClass(Ho), tt.setClass(Ho, "i-text");

class No extends Ho {
  static getDefaults() {
    return s(s({}, super.getDefaults()), No.ownDefaults);
  }
  constructor(t2, e3) {
    super(t2, s(s({}, No.ownDefaults), e3));
  }
  static createControls() {
    return { controls: Pi() };
  }
  initDimensions() {
    this.initialized && (this.isEditing && this.initDelayedCursor(), this._clearCache(), this.dynamicMinWidth = 0, this._styleMap = this._generateStyleMap(this._splitText()), this.dynamicMinWidth > this.width && this._set("width", this.dynamicMinWidth), this.textAlign.includes(qe) && this.enlargeSpaces(), this.height = this.calcTextHeight());
  }
  _generateStyleMap(t2) {
    let e3 = 0, s2 = 0, i2 = 0;
    const r2 = {};
    for (let n2 = 0;n2 < t2.graphemeLines.length; n2++)
      t2.graphemeText[i2] === `
` && n2 > 0 ? (s2 = 0, i2++, e3++) : !this.splitByGrapheme && this._reSpaceAndTab.test(t2.graphemeText[i2]) && n2 > 0 && (s2++, i2++), r2[n2] = { line: e3, offset: s2 }, i2 += t2.graphemeLines[n2].length, s2 += t2.graphemeLines[n2].length;
    return r2;
  }
  styleHas(t2, e3) {
    if (this._styleMap && !this.isWrapping) {
      const t3 = this._styleMap[e3];
      t3 && (e3 = t3.line);
    }
    return super.styleHas(t2, e3);
  }
  isEmptyStyles(t2) {
    if (!this.styles)
      return true;
    let e3, s2 = 0, i2 = t2 + 1, r2 = false;
    const n2 = this._styleMap[t2], o2 = this._styleMap[t2 + 1];
    n2 && (t2 = n2.line, s2 = n2.offset), o2 && (i2 = o2.line, r2 = i2 === t2, e3 = o2.offset);
    const a2 = t2 === undefined ? this.styles : { line: this.styles[t2] };
    for (const t3 in a2)
      for (const i3 in a2[t3]) {
        const n3 = parseInt(i3, 10);
        if (n3 >= s2 && (!r2 || n3 < e3))
          for (const e4 in a2[t3][i3])
            return false;
      }
    return true;
  }
  _getStyleDeclaration(t2, e3) {
    if (this._styleMap && !this.isWrapping) {
      const s2 = this._styleMap[t2];
      if (!s2)
        return {};
      t2 = s2.line, e3 = s2.offset + e3;
    }
    return super._getStyleDeclaration(t2, e3);
  }
  _setStyleDeclaration(t2, e3, s2) {
    const i2 = this._styleMap[t2];
    super._setStyleDeclaration(i2.line, i2.offset + e3, s2);
  }
  _deleteStyleDeclaration(t2, e3) {
    const s2 = this._styleMap[t2];
    super._deleteStyleDeclaration(s2.line, s2.offset + e3);
  }
  _getLineStyle(t2) {
    const e3 = this._styleMap[t2];
    return !!this.styles[e3.line];
  }
  _setLineStyle(t2) {
    const e3 = this._styleMap[t2];
    super._setLineStyle(e3.line);
  }
  _wrapText(t2, e3) {
    this.isWrapping = true;
    const s2 = this.getGraphemeDataForRender(t2), i2 = [];
    for (let t3 = 0;t3 < s2.wordsData.length; t3++)
      i2.push(...this._wrapLine(t3, e3, s2));
    return this.isWrapping = false, i2;
  }
  getGraphemeDataForRender(t2) {
    const e3 = this.splitByGrapheme, s2 = e3 ? "" : " ";
    let i2 = 0;
    return { wordsData: t2.map((t3, r2) => {
      let n2 = 0;
      const o2 = e3 ? this.graphemeSplit(t3) : this.wordSplit(t3);
      return o2.length === 0 ? [{ word: [], width: 0 }] : o2.map((t4) => {
        const o3 = e3 ? [t4] : this.graphemeSplit(t4), a2 = this._measureWord(o3, r2, n2);
        return i2 = Math.max(a2, i2), n2 += o3.length + s2.length, { word: o3, width: a2 };
      });
    }), largestWordWidth: i2 };
  }
  _measureWord(t2, e3) {
    let s2, i2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0, r2 = 0;
    for (let n2 = 0, o2 = t2.length;n2 < o2; n2++) {
      r2 += this._getGraphemeBox(t2[n2], e3, n2 + i2, s2, true).kernedWidth, s2 = t2[n2];
    }
    return r2;
  }
  wordSplit(t2) {
    return t2.split(this._wordJoiners);
  }
  _wrapLine(t2, e3, s2) {
    let { largestWordWidth: i2, wordsData: r2 } = s2, n2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    const o2 = this._getWidthOfCharSpacing(), a2 = this.splitByGrapheme, h2 = [], c2 = a2 ? "" : " ";
    let l2 = 0, u2 = [], d2 = 0, g2 = 0, f = true;
    e3 -= n2;
    const p2 = Math.max(e3, i2, this.dynamicMinWidth), m2 = r2[t2];
    let v2;
    for (d2 = 0, v2 = 0;v2 < m2.length; v2++) {
      const { word: e4, width: s3 } = m2[v2];
      d2 += e4.length, l2 += g2 + s3 - o2, l2 > p2 && !f ? (h2.push(u2), u2 = [], l2 = s3, f = true) : l2 += o2, f || a2 || u2.push(c2), u2 = u2.concat(e4), g2 = a2 ? 0 : this._measureWord([c2], t2, d2), d2++, f = false;
    }
    return v2 && h2.push(u2), i2 + n2 > this.dynamicMinWidth && (this.dynamicMinWidth = i2 - o2 + n2), h2;
  }
  isEndOfWrapping(t2) {
    return !this._styleMap[t2 + 1] || this._styleMap[t2 + 1].line !== this._styleMap[t2].line;
  }
  missingNewlineOffset(t2, e3) {
    return this.splitByGrapheme && !e3 ? this.isEndOfWrapping(t2) ? 1 : 0 : 1;
  }
  _splitTextIntoLines(t2) {
    const e3 = super._splitTextIntoLines(t2), s2 = this._wrapText(e3.lines, this.width), i2 = new Array(s2.length);
    for (let t3 = 0;t3 < s2.length; t3++)
      i2[t3] = s2[t3].join("");
    return e3.lines = i2, e3.graphemeLines = s2, e3;
  }
  getMinWidth() {
    return Math.max(this.minWidth, this.dynamicMinWidth);
  }
  _removeExtraneousStyles() {
    const t2 = new Map;
    for (const e3 in this._styleMap) {
      const s2 = parseInt(e3, 10);
      if (this._textLines[s2]) {
        const s3 = this._styleMap[e3].line;
        t2.set("".concat(s3), true);
      }
    }
    for (const e3 in this.styles)
      t2.has(e3) || delete this.styles[e3];
  }
  toObject() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return super.toObject(["minWidth", "splitByGrapheme", ...t2]);
  }
}
t(No, "type", "Textbox"), t(No, "textLayoutProperties", [...Ho.textLayoutProperties, "width"]), t(No, "ownDefaults", { minWidth: 20, dynamicMinWidth: 2, lockScalingFlip: true, noScaleCache: false, _wordJoiners: /[ \t\r]/, splitByGrapheme: false }), tt.setClass(No);

class Uo extends Ir {
  shouldPerformLayout(t2) {
    return !!t2.target.clipPath && super.shouldPerformLayout(t2);
  }
  shouldLayoutClipPath() {
    return false;
  }
  calcLayoutResult(t2, e3) {
    const { target: s2 } = t2, { clipPath: i2, group: r2 } = s2;
    if (!i2 || !this.shouldPerformLayout(t2))
      return;
    const { width: n2, height: o2 } = ae(Rr(s2, i2)), a2 = new ot(n2, o2);
    if (i2.absolutePositioned) {
      return { center: pe(i2.getRelativeCenterPoint(), undefined, r2 ? r2.calcTransformMatrix() : undefined), size: a2 };
    }
    {
      const r3 = i2.getRelativeCenterPoint().transform(s2.calcOwnMatrix(), true);
      if (this.shouldPerformLayout(t2)) {
        const { center: s3 = new ot, correction: i3 = new ot } = this.calcBoundingBox(e3, t2) || {};
        return { center: s3.add(r3), correction: i3.subtract(r3), size: a2 };
      }
      return { center: s2.getRelativeCenterPoint().add(r3), size: a2 };
    }
  }
}
t(Uo, "type", "clip-path"), tt.setClass(Uo);

class qo extends Ir {
  getInitialSize(t2, e3) {
    let { target: s2 } = t2, { size: i2 } = e3;
    return new ot(s2.width || i2.x, s2.height || i2.y);
  }
}
t(qo, "type", "fixed"), tt.setClass(qo);

class Ko extends Vr {
  subscribeTargets(t2) {
    const e3 = t2.target;
    t2.targets.reduce((t3, e4) => (e4.parent && t3.add(e4.parent), t3), new Set).forEach((t3) => {
      t3.layoutManager.subscribeTargets({ target: t3, targets: [e3] });
    });
  }
  unsubscribeTargets(t2) {
    const e3 = t2.target, s2 = e3.getObjects();
    t2.targets.reduce((t3, e4) => (e4.parent && t3.add(e4.parent), t3), new Set).forEach((t3) => {
      !s2.some((e4) => e4.parent === t3) && t3.layoutManager.unsubscribeTargets({ target: t3, targets: [e3] });
    });
  }
}

class Jo extends Hr {
  static getDefaults() {
    return s(s({}, super.getDefaults()), Jo.ownDefaults);
  }
  constructor() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [], e3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super(), Object.assign(this, Jo.ownDefaults), this.setOptions(e3);
    const { left: s2, top: i2, layoutManager: r2 } = e3;
    this.groupInit(t2, { left: s2, top: i2, layoutManager: r2 != null ? r2 : new Ko });
  }
  _shouldSetNestedCoords() {
    return true;
  }
  __objectSelectionMonitor() {}
  multiSelectAdd() {
    for (var t2 = arguments.length, e3 = new Array(t2), s2 = 0;s2 < t2; s2++)
      e3[s2] = arguments[s2];
    this.multiSelectionStacking === "selection-order" ? this.add(...e3) : e3.forEach((t3) => {
      const e4 = this._objects.findIndex((e5) => e5.isInFrontOf(t3)), s3 = e4 === -1 ? this.size() : e4;
      this.insertAt(s3, t3);
    });
  }
  canEnterGroup(t2) {
    return this.getObjects().some((e3) => e3.isDescendantOf(t2) || t2.isDescendantOf(e3)) ? (a("error", "ActiveSelection: circular object trees are not supported, this call has no effect"), false) : super.canEnterGroup(t2);
  }
  enterGroup(t2, e3) {
    t2.parent && t2.parent === t2.group ? t2.parent._exitGroup(t2) : t2.group && t2.parent !== t2.group && t2.group.remove(t2), this._enterGroup(t2, e3);
  }
  exitGroup(t2, e3) {
    this._exitGroup(t2, e3), t2.parent && t2.parent._enterGroup(t2, true);
  }
  _onAfterObjectsChange(t2, e3) {
    super._onAfterObjectsChange(t2, e3);
    const s2 = new Set;
    e3.forEach((t3) => {
      const { parent: e4 } = t3;
      e4 && s2.add(e4);
    }), t2 === Fr ? s2.forEach((t3) => {
      t3._onAfterObjectsChange(jr, e3);
    }) : s2.forEach((t3) => {
      t3._set("dirty", true);
    });
  }
  onDeselect() {
    return this.removeAll(), false;
  }
  toString() {
    return "#<ActiveSelection: (".concat(this.complexity(), ")>");
  }
  shouldCache() {
    return false;
  }
  isOnACache() {
    return false;
  }
  _renderControls(t2, e3, i2) {
    t2.save(), t2.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1;
    const r2 = s(s({ hasControls: false }, i2), {}, { forActiveSelection: true });
    for (let e4 = 0;e4 < this._objects.length; e4++)
      this._objects[e4]._renderControls(t2, r2);
    super._renderControls(t2, e3), t2.restore();
  }
}
t(Jo, "type", "ActiveSelection"), t(Jo, "ownDefaults", { multiSelectionStacking: "canvas-stacking" }), tt.setClass(Jo), tt.setClass(Jo, "activeSelection");

class Qo {
  constructor() {
    t(this, "resources", {});
  }
  applyFilters(t2, e3, s2, i2, r2) {
    const n2 = r2.getContext("2d");
    if (!n2)
      return;
    n2.drawImage(e3, 0, 0, s2, i2);
    const o2 = { sourceWidth: s2, sourceHeight: i2, imageData: n2.getImageData(0, 0, s2, i2), originalEl: e3, originalImageData: n2.getImageData(0, 0, s2, i2), canvasEl: r2, ctx: n2, filterBackend: this };
    t2.forEach((t3) => {
      t3.applyTo(o2);
    });
    const { imageData: a2 } = o2;
    return a2.width === s2 && a2.height === i2 || (r2.width = a2.width, r2.height = a2.height), n2.putImageData(a2, 0, 0), o2;
  }
}

class Zo {
  constructor() {
    let { tileSize: e3 = o.textureSize } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    t(this, "aPosition", new Float32Array([0, 0, 0, 1, 1, 0, 1, 1])), t(this, "resources", {}), this.tileSize = e3, this.setupGLContext(e3, e3), this.captureGPUInfo();
  }
  setupGLContext(t2, e3) {
    this.dispose(), this.createWebGLCanvas(t2, e3);
  }
  createWebGLCanvas(t2, e3) {
    const s2 = vt({ width: t2, height: e3 }), i2 = s2.getContext("webgl", { alpha: true, premultipliedAlpha: false, depth: false, stencil: false, antialias: false });
    i2 && (i2.clearColor(0, 0, 0, 0), this.canvas = s2, this.gl = i2);
  }
  applyFilters(t2, e3, s2, i2, r2, n2) {
    const o2 = this.gl, a2 = r2.getContext("2d");
    if (!o2 || !a2)
      return;
    let h2;
    n2 && (h2 = this.getCachedTexture(n2, e3));
    const c2 = { originalWidth: e3.width || e3.naturalWidth || 0, originalHeight: e3.height || e3.naturalHeight || 0, sourceWidth: s2, sourceHeight: i2, destinationWidth: s2, destinationHeight: i2, context: o2, sourceTexture: this.createTexture(o2, s2, i2, h2 ? undefined : e3), targetTexture: this.createTexture(o2, s2, i2), originalTexture: h2 || this.createTexture(o2, s2, i2, h2 ? undefined : e3), passes: t2.length, webgl: true, aPosition: this.aPosition, programCache: this.programCache, pass: 0, filterBackend: this, targetCanvas: r2 }, l2 = o2.createFramebuffer();
    return o2.bindFramebuffer(o2.FRAMEBUFFER, l2), t2.forEach((t3) => {
      t3 && t3.applyTo(c2);
    }), function(t3) {
      const e4 = t3.targetCanvas, s3 = e4.width, i3 = e4.height, r3 = t3.destinationWidth, n3 = t3.destinationHeight;
      s3 === r3 && i3 === n3 || (e4.width = r3, e4.height = n3);
    }(c2), this.copyGLTo2D(o2, c2), o2.bindTexture(o2.TEXTURE_2D, null), o2.deleteTexture(c2.sourceTexture), o2.deleteTexture(c2.targetTexture), o2.deleteFramebuffer(l2), a2.setTransform(1, 0, 0, 1, 0, 0), c2;
  }
  dispose() {
    this.canvas && (this.canvas = null, this.gl = null), this.clearWebGLCaches();
  }
  clearWebGLCaches() {
    this.programCache = {}, this.textureCache = {};
  }
  createTexture(t2, e3, s2, i2, r2) {
    const { NEAREST: n2, TEXTURE_2D: o2, RGBA: a2, UNSIGNED_BYTE: h2, CLAMP_TO_EDGE: c2, TEXTURE_MAG_FILTER: l2, TEXTURE_MIN_FILTER: u2, TEXTURE_WRAP_S: d2, TEXTURE_WRAP_T: g2 } = t2, f = t2.createTexture();
    return t2.bindTexture(o2, f), t2.texParameteri(o2, l2, r2 || n2), t2.texParameteri(o2, u2, r2 || n2), t2.texParameteri(o2, d2, c2), t2.texParameteri(o2, g2, c2), i2 ? t2.texImage2D(o2, 0, a2, a2, h2, i2) : t2.texImage2D(o2, 0, a2, e3, s2, 0, a2, h2, null), f;
  }
  getCachedTexture(t2, e3, s2) {
    const { textureCache: i2 } = this;
    if (i2[t2])
      return i2[t2];
    {
      const r2 = this.createTexture(this.gl, e3.width, e3.height, e3, s2);
      return r2 && (i2[t2] = r2), r2;
    }
  }
  evictCachesForKey(t2) {
    this.textureCache[t2] && (this.gl.deleteTexture(this.textureCache[t2]), delete this.textureCache[t2]);
  }
  copyGLTo2D(t2, e3) {
    const s2 = t2.canvas, i2 = e3.targetCanvas, r2 = i2.getContext("2d");
    if (!r2)
      return;
    r2.translate(0, i2.height), r2.scale(1, -1);
    const n2 = s2.height - i2.height;
    r2.drawImage(s2, 0, n2, i2.width, i2.height, 0, 0, i2.width, i2.height);
  }
  copyGLTo2DPutImageData(t2, e3) {
    const s2 = e3.targetCanvas.getContext("2d"), i2 = e3.destinationWidth, r2 = e3.destinationHeight, n2 = i2 * r2 * 4;
    if (!s2)
      return;
    const o2 = new Uint8Array(this.imageBuffer, 0, n2), a2 = new Uint8ClampedArray(this.imageBuffer, 0, n2);
    t2.readPixels(0, 0, i2, r2, t2.RGBA, t2.UNSIGNED_BYTE, o2);
    const h2 = new ImageData(a2, i2, r2);
    s2.putImageData(h2, 0, 0);
  }
  captureGPUInfo() {
    if (this.gpuInfo)
      return this.gpuInfo;
    const t2 = this.gl, e3 = { renderer: "", vendor: "" };
    if (!t2)
      return e3;
    const s2 = t2.getExtension("WEBGL_debug_renderer_info");
    if (s2) {
      const i2 = t2.getParameter(s2.UNMASKED_RENDERER_WEBGL), r2 = t2.getParameter(s2.UNMASKED_VENDOR_WEBGL);
      i2 && (e3.renderer = i2.toLowerCase()), r2 && (e3.vendor = r2.toLowerCase());
    }
    return this.gpuInfo = e3, e3;
  }
}
var $o;
function ta() {
  const { WebGLProbe: t2 } = p();
  return t2.queryWebGL(pt()), o.enableGLFiltering && t2.isSupported(o.textureSize) ? new Zo({ tileSize: o.textureSize }) : new Qo;
}
function ea() {
  return !$o && (!(arguments.length > 0 && arguments[0] !== undefined) || arguments[0]) && ($o = ta()), $o;
}
var ia = ["filters", "resizeFilter", "src", "crossOrigin", "type"];
var ra = ["cropX", "cropY"];

class na extends ji {
  static getDefaults() {
    return s(s({}, super.getDefaults()), na.ownDefaults);
  }
  constructor(e3, s2) {
    super(), t(this, "_lastScaleX", 1), t(this, "_lastScaleY", 1), t(this, "_filterScalingX", 1), t(this, "_filterScalingY", 1), this.filters = [], Object.assign(this, na.ownDefaults), this.setOptions(s2), this.cacheKey = "texture".concat(ft()), this.setElement(typeof e3 == "string" ? (this.canvas && Kt(this.canvas.getElement()) || m()).getElementById(e3) : e3, s2);
  }
  getElement() {
    return this._element;
  }
  setElement(t2) {
    var e3;
    let s2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.removeTexture(this.cacheKey), this.removeTexture("".concat(this.cacheKey, "_filtered")), this._element = t2, this._originalElement = t2, this._setWidthHeight(s2), (e3 = t2.classList) === null || e3 === undefined || e3.add(na.CSS_CANVAS), this.filters.length !== 0 && this.applyFilters(), this.resizeFilter && this.applyResizeFilters();
  }
  removeTexture(t2) {
    const e3 = ea(false);
    e3 instanceof Zo && e3.evictCachesForKey(t2);
  }
  dispose() {
    super.dispose(), this.removeTexture(this.cacheKey), this.removeTexture("".concat(this.cacheKey, "_filtered")), this._cacheContext = null, ["_originalElement", "_element", "_filteredEl", "_cacheCanvas"].forEach((t2) => {
      const e3 = this[t2];
      e3 && p().dispose(e3), this[t2] = undefined;
    });
  }
  getCrossOrigin() {
    return this._originalElement && (this._originalElement.crossOrigin || null);
  }
  getOriginalSize() {
    const t2 = this.getElement();
    return t2 ? { width: t2.naturalWidth || t2.width, height: t2.naturalHeight || t2.height } : { width: 0, height: 0 };
  }
  _stroke(t2) {
    if (!this.stroke || this.strokeWidth === 0)
      return;
    const e3 = this.width / 2, s2 = this.height / 2;
    t2.beginPath(), t2.moveTo(-e3, -s2), t2.lineTo(e3, -s2), t2.lineTo(e3, s2), t2.lineTo(-e3, s2), t2.lineTo(-e3, -s2), t2.closePath();
  }
  toObject() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    const e3 = [];
    return this.filters.forEach((t3) => {
      t3 && e3.push(t3.toObject());
    }), s(s({}, super.toObject([...ra, ...t2])), {}, { src: this.getSrc(), crossOrigin: this.getCrossOrigin(), filters: e3 }, this.resizeFilter ? { resizeFilter: this.resizeFilter.toObject() } : {});
  }
  hasCrop() {
    return !!this.cropX || !!this.cropY || this.width < this._element.width || this.height < this._element.height;
  }
  _toSVG() {
    const t2 = [], e3 = this._element, s2 = -this.width / 2, i2 = -this.height / 2;
    let r2 = [], n2 = [], o2 = "", a2 = "";
    if (!e3)
      return [];
    if (this.hasCrop()) {
      const t3 = ft();
      r2.push('<clipPath id="imageCrop_' + t3 + `">
`, '\t<rect x="' + s2 + '" y="' + i2 + '" width="' + this.width + '" height="' + this.height + `" />
`, `</clipPath>
`), o2 = ' clip-path="url(#imageCrop_' + t3 + ')" ';
    }
    if (this.imageSmoothing || (a2 = ' image-rendering="optimizeSpeed"'), t2.push("\t<image ", "COMMON_PARTS", 'xlink:href="'.concat(this.getSvgSrc(true), '" x="').concat(s2 - this.cropX, '" y="').concat(i2 - this.cropY, '" width="').concat(e3.width || e3.naturalWidth, '" height="').concat(e3.height || e3.naturalHeight, '"').concat(a2).concat(o2, `></image>
`)), this.stroke || this.strokeDashArray) {
      const t3 = this.fill;
      this.fill = null, n2 = ['\t<rect x="'.concat(s2, '" y="').concat(i2, '" width="').concat(this.width, '" height="').concat(this.height, '" style="').concat(this.getSvgStyles(), `" />
`)], this.fill = t3;
    }
    return r2 = this.paintFirst !== K ? r2.concat(n2, t2) : r2.concat(t2, n2), r2;
  }
  getSrc(t2) {
    const e3 = t2 ? this._element : this._originalElement;
    return e3 ? e3.toDataURL ? e3.toDataURL() : this.srcFromAttribute ? e3.getAttribute("src") || "" : e3.src : this.src || "";
  }
  getSvgSrc(t2) {
    return this.getSrc(t2);
  }
  setSrc(t2) {
    let { crossOrigin: e3, signal: s2 } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return It(t2, { crossOrigin: e3, signal: s2 }).then((t3) => {
      e3 !== undefined && this.set({ crossOrigin: e3 }), this.setElement(t3);
    });
  }
  toString() {
    return '#<Image: { src: "'.concat(this.getSrc(), '" }>');
  }
  applyResizeFilters() {
    const t2 = this.resizeFilter, e3 = this.minimumScaleTrigger, s2 = this.getTotalObjectScaling(), i2 = s2.x, r2 = s2.y, n2 = this._filteredEl || this._originalElement;
    if (this.group && this.set("dirty", true), !t2 || i2 > e3 && r2 > e3)
      return this._element = n2, this._filterScalingX = 1, this._filterScalingY = 1, this._lastScaleX = i2, void (this._lastScaleY = r2);
    const o2 = vt(n2), { width: a2, height: h2 } = n2;
    this._element = o2, this._lastScaleX = t2.scaleX = i2, this._lastScaleY = t2.scaleY = r2, ea().applyFilters([t2], n2, a2, h2, this._element), this._filterScalingX = o2.width / this._originalElement.width, this._filterScalingY = o2.height / this._originalElement.height;
  }
  applyFilters() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.filters || [];
    if (t2 = t2.filter((t3) => t3 && !t3.isNeutralState()), this.set("dirty", true), this.removeTexture("".concat(this.cacheKey, "_filtered")), t2.length === 0)
      return this._element = this._originalElement, this._filteredEl = undefined, this._filterScalingX = 1, void (this._filterScalingY = 1);
    const e3 = this._originalElement, s2 = e3.naturalWidth || e3.width, i2 = e3.naturalHeight || e3.height;
    if (this._element === this._originalElement) {
      const t3 = vt({ width: s2, height: i2 });
      this._element = t3, this._filteredEl = t3;
    } else
      this._filteredEl && (this._element = this._filteredEl, this._filteredEl.getContext("2d").clearRect(0, 0, s2, i2), this._lastScaleX = 1, this._lastScaleY = 1);
    ea().applyFilters(t2, this._originalElement, s2, i2, this._element, this.cacheKey), this._originalElement.width === this._element.width && this._originalElement.height === this._element.height || (this._filterScalingX = this._element.width / this._originalElement.width, this._filterScalingY = this._element.height / this._originalElement.height);
  }
  _render(t2) {
    t2.imageSmoothingEnabled = this.imageSmoothing, this.isMoving !== true && this.resizeFilter && this._needsResize() && this.applyResizeFilters(), this._stroke(t2), this._renderPaintInOrder(t2);
  }
  drawCacheOnCanvas(t2) {
    t2.imageSmoothingEnabled = this.imageSmoothing, super.drawCacheOnCanvas(t2);
  }
  shouldCache() {
    return this.needsItsOwnCache();
  }
  _renderFill(t2) {
    const e3 = this._element;
    if (!e3)
      return;
    const s2 = this._filterScalingX, i2 = this._filterScalingY, r2 = this.width, n2 = this.height, o2 = Math.max(this.cropX, 0), a2 = Math.max(this.cropY, 0), h2 = e3.naturalWidth || e3.width, c2 = e3.naturalHeight || e3.height, l2 = o2 * s2, u2 = a2 * i2, d2 = Math.min(r2 * s2, h2 - l2), g2 = Math.min(n2 * i2, c2 - u2), f = -r2 / 2, p2 = -n2 / 2, m2 = Math.min(r2, h2 / s2 - o2), v2 = Math.min(n2, c2 / i2 - a2);
    e3 && t2.drawImage(e3, l2, u2, d2, g2, f, p2, m2, v2);
  }
  _needsResize() {
    const t2 = this.getTotalObjectScaling();
    return t2.x !== this._lastScaleX || t2.y !== this._lastScaleY;
  }
  _resetWidthHeight() {
    this.set(this.getOriginalSize());
  }
  _setWidthHeight() {
    let { width: t2, height: e3 } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const s2 = this.getOriginalSize();
    this.width = t2 || s2.width, this.height = e3 || s2.height;
  }
  parsePreserveAspectRatioAttribute() {
    const t2 = Ie(this.preserveAspectRatio || ""), e3 = this.width, s2 = this.height, i2 = { width: e3, height: s2 };
    let r2, n2 = this._element.width, o2 = this._element.height, a2 = 1, h2 = 1, c2 = 0, l2 = 0, u2 = 0, d2 = 0;
    return !t2 || t2.alignX === j && t2.alignY === j ? (a2 = e3 / n2, h2 = s2 / o2) : (t2.meetOrSlice === "meet" && (a2 = h2 = Nr(this._element, i2), r2 = (e3 - n2 * a2) / 2, t2.alignX === "Min" && (c2 = -r2), t2.alignX === "Max" && (c2 = r2), r2 = (s2 - o2 * h2) / 2, t2.alignY === "Min" && (l2 = -r2), t2.alignY === "Max" && (l2 = r2)), t2.meetOrSlice === "slice" && (a2 = h2 = Ur(this._element, i2), r2 = n2 - e3 / a2, t2.alignX === "Mid" && (u2 = r2 / 2), t2.alignX === "Max" && (u2 = r2), r2 = o2 - s2 / h2, t2.alignY === "Mid" && (d2 = r2 / 2), t2.alignY === "Max" && (d2 = r2), n2 = e3 / a2, o2 = s2 / h2)), { width: n2, height: o2, scaleX: a2, scaleY: h2, offsetLeft: c2, offsetTop: l2, cropX: u2, cropY: d2 };
  }
  static fromObject(t2, e3) {
    let { filters: r2, resizeFilter: n2, src: o2, crossOrigin: a2, type: h2 } = t2, c2 = i(t2, ia);
    return Promise.all([It(o2, s(s({}, e3), {}, { crossOrigin: a2 })), r2 && Bt(r2, e3), n2 && Bt([n2], e3), Xt(c2, e3)]).then((t3) => {
      let [e4, i2 = [], [r3] = [], n3 = {}] = t3;
      return new this(e4, s(s({}, c2), {}, { src: o2, filters: i2, resizeFilter: r3 }, n3));
    });
  }
  static fromURL(t2) {
    let { crossOrigin: e3 = null, signal: s2 } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}, i2 = arguments.length > 2 ? arguments[2] : undefined;
    return It(t2, { crossOrigin: e3, signal: s2 }).then((t3) => new this(t3, i2));
  }
  static async fromElement(t2) {
    let e3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}, s2 = arguments.length > 2 ? arguments[2] : undefined;
    const i2 = Dr(t2, this.ATTRIBUTE_NAMES, s2);
    return this.fromURL(i2["xlink:href"] || i2.href, e3, i2).catch((t3) => (a("log", "Unable to parse Image", t3), null));
  }
}
t(na, "type", "Image"), t(na, "cacheProperties", [...Ms, ...ra]), t(na, "ownDefaults", { strokeWidth: 0, srcFromAttribute: false, minimumScaleTrigger: 0.5, cropX: 0, cropY: 0, imageSmoothing: true }), t(na, "CSS_CANVAS", "canvas-img"), t(na, "ATTRIBUTE_NAMES", [...Ji, "x", "y", "width", "height", "preserveAspectRatio", "xlink:href", "href", "crossOrigin", "image-rendering"]), tt.setClass(na), tt.setSVGClass(na);
var ha = Ye(["pattern", "defs", "symbol", "metadata", "clipPath", "mask", "desc"]);
var ba = W;
var Sa = (t2) => function(e3, s2, i2) {
  const { points: r2, pathOffset: n2 } = i2;
  return new ot(r2[t2]).subtract(n2).transform(Tt(i2.getViewportTransform(), i2.calcTransformMatrix()));
};
var wa = (t2, e3, s2, i2) => {
  const { target: r2, pointIndex: n2 } = e3, o2 = r2, a2 = pe(new ot(s2, i2), undefined, o2.calcOwnMatrix());
  return o2.points[n2] = a2.add(o2.pathOffset), o2.setDimensions(), o2.set("dirty", true), true;
};
var Ta = (t2, e3) => function(i2, r2, n2, o2) {
  const a2 = r2.target, h2 = new ot(a2.points[(t2 > 0 ? t2 : a2.points.length) - 1]), c2 = h2.subtract(a2.pathOffset).transform(a2.calcOwnMatrix()), l2 = e3(i2, s(s({}, r2), {}, { pointIndex: t2 }), n2, o2), u2 = h2.subtract(a2.pathOffset).transform(a2.calcOwnMatrix()).subtract(c2);
  return a2.left -= u2.x, a2.top -= u2.y, l2;
};
var Oa = (t2) => ti(ba, Ta(t2, wa));
var ka = (t2, e3, s2) => {
  const { path: i2, pathOffset: r2 } = t2, n2 = i2[e3];
  return new ot(n2[s2] - r2.x, n2[s2 + 1] - r2.y).transform(Tt(t2.getViewportTransform(), t2.calcTransformMatrix()));
};
function Da(t2, e3, s2) {
  const { commandIndex: i2, pointIndex: r2 } = this;
  return ka(s2, i2, r2);
}
function Ma(t2, e3, i2, r2) {
  const { target: n2 } = e3, { commandIndex: o2, pointIndex: a2 } = this, h2 = ((t3, e4, s2, i3, r3) => {
    const { path: n3, pathOffset: o3 } = t3, a3 = n3[(i3 > 0 ? i3 : n3.length) - 1], h3 = new ot(a3[r3], a3[r3 + 1]), c2 = h3.subtract(o3).transform(t3.calcOwnMatrix()), l2 = pe(new ot(e4, s2), undefined, t3.calcOwnMatrix());
    n3[i3][r3] = l2.x + o3.x, n3[i3][r3 + 1] = l2.y + o3.y, t3.setDimensions();
    const u2 = h3.subtract(t3.pathOffset).transform(t3.calcOwnMatrix()).subtract(c2);
    return t3.left -= u2.x, t3.top -= u2.y, t3.set("dirty", true), true;
  })(n2, i2, r2, o2, a2);
  return ye(this.actionName, s(s({}, Te(t2, e3, i2, r2)), {}, { commandIndex: o2, pointIndex: a2 })), h2;
}

class Pa extends ni {
  constructor(t2) {
    super(t2);
  }
  render(t2, e3, i2, r2, n2) {
    const o2 = s(s({}, r2), {}, { cornerColor: this.controlFill, cornerStrokeColor: this.controlStroke, transparentCorners: !this.controlFill });
    super.render(t2, e3, i2, o2, n2);
  }
}

class Ea extends Pa {
  constructor(t2) {
    super(t2);
  }
  render(t2, e3, s2, i2, r2) {
    const { path: n2 } = r2, { commandIndex: o2, pointIndex: a2, connectToCommandIndex: h2, connectToPointIndex: c2 } = this;
    t2.save(), t2.strokeStyle = this.controlStroke, this.connectionDashArray && t2.setLineDash(this.connectionDashArray);
    const [l2] = n2[o2], u2 = ka(r2, h2, c2);
    if (l2 === "Q") {
      const i3 = ka(r2, o2, a2 + 2);
      t2.moveTo(i3.x, i3.y), t2.lineTo(e3, s2);
    } else
      t2.moveTo(e3, s2);
    t2.lineTo(u2.x, u2.y), t2.stroke(), t2.restore(), super.render(t2, e3, s2, i2, r2);
  }
}
var Aa = (t2, e3, i2, r2, n2, o2) => new (i2 ? Ea : Pa)(s(s({ commandIndex: t2, pointIndex: e3, actionName: "modifyPath", positionHandler: Da, actionHandler: Ma, connectToCommandIndex: n2, connectToPointIndex: o2 }, r2), i2 ? r2.controlPointStyle : r2.pointStyle));
var ja = Object.freeze({ __proto__: null, changeWidth: si, createObjectDefaultControls: Di, createPathControls: function(t2) {
  let e3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const s2 = {};
  let i2 = "M";
  return t2.path.forEach((t3, r2) => {
    const n2 = t3[0];
    switch (n2 !== "Z" && (s2["c_".concat(r2, "_").concat(n2)] = Aa(r2, t3.length - 2, false, e3)), n2) {
      case "C":
        s2["c_".concat(r2, "_C_CP_1")] = Aa(r2, 1, true, e3, r2 - 1, ((t4) => t4 === "C" ? 5 : t4 === "Q" ? 3 : 1)(i2)), s2["c_".concat(r2, "_C_CP_2")] = Aa(r2, 3, true, e3, r2, 5);
        break;
      case "Q":
        s2["c_".concat(r2, "_Q_CP_1")] = Aa(r2, 1, true, e3, r2, 3);
    }
    i2 = n2;
  }), s2;
}, createPolyActionHandler: Oa, createPolyControls: function(t2) {
  let e3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const i2 = {};
  for (let r2 = 0;r2 < (typeof t2 == "number" ? t2 : t2.points.length); r2++)
    i2["p".concat(r2)] = new ni(s({ actionName: ba, positionHandler: Sa(r2), actionHandler: Oa(r2) }, e3));
  return i2;
}, createPolyPositionHandler: Sa, createResizeControls: Mi, createTextboxDefaultControls: Pi, dragHandler: De, factoryPolyActionHandler: Ta, getLocalPoint: ke, polyActionHandler: wa, renderCircleControl: ii, renderSquareControl: ri, rotationStyleHandler: oi, rotationWithSnapping: ai, scaleCursorStyleHandler: ui, scaleOrSkewActionName: wi, scaleSkewCursorStyleHandler: Ti, scalingEqually: gi, scalingX: fi, scalingXOrSkewingY: Oi, scalingY: pi, scalingYOrSkewingX: ki, skewCursorStyleHandler: _i, skewHandlerX: Ci, skewHandlerY: bi, wrapWithFireEvent: ti, wrapWithFixedAnchor: ei });
var Fa = (t2) => t2.webgl !== undefined;
var Ra = "precision highp float";
var Ia = `
    `.concat(Ra, `;
    varying vec2 vTexCoord;
    uniform sampler2D uTexture;
    void main() {
      gl_FragColor = texture2D(uTexture, vTexCoord);
    }`);
var Ba = ["type"];
var Xa = ["type"];
var Ya = new RegExp(Ra, "g");

class Wa {
  get type() {
    return this.constructor.type;
  }
  constructor() {
    let t2 = i(arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}, Ba);
    Object.assign(this, this.constructor.defaults, t2);
  }
  getFragmentSource() {
    return Ia;
  }
  getVertexSource() {
    return `
    attribute vec2 aPosition;
    varying vec2 vTexCoord;
    void main() {
      vTexCoord = aPosition;
      gl_Position = vec4(aPosition * 2.0 - 1.0, 0.0, 1.0);
    }`;
  }
  createProgram(t2) {
    let e3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getFragmentSource(), s2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.getVertexSource();
    const { WebGLProbe: { GLPrecision: i2 = "highp" } } = p();
    i2 !== "highp" && (e3 = e3.replace(Ya, Ra.replace("highp", i2)));
    const r2 = t2.createShader(t2.VERTEX_SHADER), n2 = t2.createShader(t2.FRAGMENT_SHADER), o2 = t2.createProgram();
    if (!r2 || !n2 || !o2)
      throw new h("Vertex, fragment shader or program creation error");
    if (t2.shaderSource(r2, s2), t2.compileShader(r2), !t2.getShaderParameter(r2, t2.COMPILE_STATUS))
      throw new h("Vertex shader compile error for ".concat(this.type, ": ").concat(t2.getShaderInfoLog(r2)));
    if (t2.shaderSource(n2, e3), t2.compileShader(n2), !t2.getShaderParameter(n2, t2.COMPILE_STATUS))
      throw new h("Fragment shader compile error for ".concat(this.type, ": ").concat(t2.getShaderInfoLog(n2)));
    if (t2.attachShader(o2, r2), t2.attachShader(o2, n2), t2.linkProgram(o2), !t2.getProgramParameter(o2, t2.LINK_STATUS))
      throw new h('Shader link error for "'.concat(this.type, '" ').concat(t2.getProgramInfoLog(o2)));
    const a2 = this.getUniformLocations(t2, o2) || {};
    return a2.uStepW = t2.getUniformLocation(o2, "uStepW"), a2.uStepH = t2.getUniformLocation(o2, "uStepH"), { program: o2, attributeLocations: this.getAttributeLocations(t2, o2), uniformLocations: a2 };
  }
  getAttributeLocations(t2, e3) {
    return { aPosition: t2.getAttribLocation(e3, "aPosition") };
  }
  getUniformLocations(t2, e3) {
    const s2 = this.constructor.uniformLocations, i2 = {};
    for (let r2 = 0;r2 < s2.length; r2++)
      i2[s2[r2]] = t2.getUniformLocation(e3, s2[r2]);
    return i2;
  }
  sendAttributeData(t2, e3, s2) {
    const i2 = e3.aPosition, r2 = t2.createBuffer();
    t2.bindBuffer(t2.ARRAY_BUFFER, r2), t2.enableVertexAttribArray(i2), t2.vertexAttribPointer(i2, 2, t2.FLOAT, false, 0, 0), t2.bufferData(t2.ARRAY_BUFFER, s2, t2.STATIC_DRAW);
  }
  _setupFrameBuffer(t2) {
    const e3 = t2.context;
    if (t2.passes > 1) {
      const { destinationWidth: s2, destinationHeight: i2 } = t2;
      t2.sourceWidth === s2 && t2.sourceHeight === i2 || (e3.deleteTexture(t2.targetTexture), t2.targetTexture = t2.filterBackend.createTexture(e3, s2, i2)), e3.framebufferTexture2D(e3.FRAMEBUFFER, e3.COLOR_ATTACHMENT0, e3.TEXTURE_2D, t2.targetTexture, 0);
    } else
      e3.bindFramebuffer(e3.FRAMEBUFFER, null), e3.finish();
  }
  _swapTextures(t2) {
    t2.passes--, t2.pass++;
    const e3 = t2.targetTexture;
    t2.targetTexture = t2.sourceTexture, t2.sourceTexture = e3;
  }
  isNeutralState(t2) {
    return false;
  }
  applyTo(t2) {
    Fa(t2) ? (this._setupFrameBuffer(t2), this.applyToWebGL(t2), this._swapTextures(t2)) : this.applyTo2d(t2);
  }
  applyTo2d(t2) {}
  getCacheKey() {
    return this.type;
  }
  retrieveShader(t2) {
    const e3 = this.getCacheKey();
    return t2.programCache[e3] || (t2.programCache[e3] = this.createProgram(t2.context)), t2.programCache[e3];
  }
  applyToWebGL(t2) {
    const e3 = t2.context, s2 = this.retrieveShader(t2);
    t2.pass === 0 && t2.originalTexture ? e3.bindTexture(e3.TEXTURE_2D, t2.originalTexture) : e3.bindTexture(e3.TEXTURE_2D, t2.sourceTexture), e3.useProgram(s2.program), this.sendAttributeData(e3, s2.attributeLocations, t2.aPosition), e3.uniform1f(s2.uniformLocations.uStepW, 1 / t2.sourceWidth), e3.uniform1f(s2.uniformLocations.uStepH, 1 / t2.sourceHeight), this.sendUniformData(e3, s2.uniformLocations), e3.viewport(0, 0, t2.destinationWidth, t2.destinationHeight), e3.drawArrays(e3.TRIANGLE_STRIP, 0, 4);
  }
  bindAdditionalTexture(t2, e3, s2) {
    t2.activeTexture(s2), t2.bindTexture(t2.TEXTURE_2D, e3), t2.activeTexture(t2.TEXTURE0);
  }
  unbindAdditionalTexture(t2, e3) {
    t2.activeTexture(e3), t2.bindTexture(t2.TEXTURE_2D, null), t2.activeTexture(t2.TEXTURE0);
  }
  sendUniformData(t2, e3) {}
  createHelpLayer(t2) {
    if (!t2.helpLayer) {
      const { sourceWidth: e3, sourceHeight: s2 } = t2, i2 = vt({ width: e3, height: s2 });
      t2.helpLayer = i2;
    }
  }
  toObject() {
    const t2 = Object.keys(this.constructor.defaults || {});
    return s({ type: this.type }, t2.reduce((t3, e3) => (t3[e3] = this[e3], t3), {}));
  }
  toJSON() {
    return this.toObject();
  }
  static async fromObject(t2, e3) {
    return new this(i(t2, Xa));
  }
}
t(Wa, "type", "BaseFilter"), t(Wa, "uniformLocations", []);
var Va = { multiply: `gl_FragColor.rgb *= uColor.rgb;
`, screen: `gl_FragColor.rgb = 1.0 - (1.0 - gl_FragColor.rgb) * (1.0 - uColor.rgb);
`, add: `gl_FragColor.rgb += uColor.rgb;
`, difference: `gl_FragColor.rgb = abs(gl_FragColor.rgb - uColor.rgb);
`, subtract: `gl_FragColor.rgb -= uColor.rgb;
`, lighten: `gl_FragColor.rgb = max(gl_FragColor.rgb, uColor.rgb);
`, darken: `gl_FragColor.rgb = min(gl_FragColor.rgb, uColor.rgb);
`, exclusion: `gl_FragColor.rgb += uColor.rgb - 2.0 * (uColor.rgb * gl_FragColor.rgb);
`, overlay: `
    if (uColor.r < 0.5) {
      gl_FragColor.r *= 2.0 * uColor.r;
    } else {
      gl_FragColor.r = 1.0 - 2.0 * (1.0 - gl_FragColor.r) * (1.0 - uColor.r);
    }
    if (uColor.g < 0.5) {
      gl_FragColor.g *= 2.0 * uColor.g;
    } else {
      gl_FragColor.g = 1.0 - 2.0 * (1.0 - gl_FragColor.g) * (1.0 - uColor.g);
    }
    if (uColor.b < 0.5) {
      gl_FragColor.b *= 2.0 * uColor.b;
    } else {
      gl_FragColor.b = 1.0 - 2.0 * (1.0 - gl_FragColor.b) * (1.0 - uColor.b);
    }
    `, tint: `
    gl_FragColor.rgb *= (1.0 - uColor.a);
    gl_FragColor.rgb += uColor.rgb;
    ` };

class za extends Wa {
  getCacheKey() {
    return "".concat(this.type, "_").concat(this.mode);
  }
  getFragmentSource() {
    return `
      precision highp float;
      uniform sampler2D uTexture;
      uniform vec4 uColor;
      varying vec2 vTexCoord;
      void main() {
        vec4 color = texture2D(uTexture, vTexCoord);
        gl_FragColor = color;
        if (color.a > 0.0) {
          `.concat(Va[this.mode], `
        }
      }
      `);
  }
  applyTo2d(t2) {
    let { imageData: { data: e3 } } = t2;
    const s2 = new Le(this.color).getSource(), i2 = this.alpha, r2 = s2[0] * i2, n2 = s2[1] * i2, o2 = s2[2] * i2, a2 = 1 - i2;
    for (let t3 = 0;t3 < e3.length; t3 += 4) {
      const s3 = e3[t3], i3 = e3[t3 + 1], h2 = e3[t3 + 2];
      let c2, l2, u2;
      switch (this.mode) {
        case "multiply":
          c2 = s3 * r2 / 255, l2 = i3 * n2 / 255, u2 = h2 * o2 / 255;
          break;
        case "screen":
          c2 = 255 - (255 - s3) * (255 - r2) / 255, l2 = 255 - (255 - i3) * (255 - n2) / 255, u2 = 255 - (255 - h2) * (255 - o2) / 255;
          break;
        case "add":
          c2 = s3 + r2, l2 = i3 + n2, u2 = h2 + o2;
          break;
        case "difference":
          c2 = Math.abs(s3 - r2), l2 = Math.abs(i3 - n2), u2 = Math.abs(h2 - o2);
          break;
        case "subtract":
          c2 = s3 - r2, l2 = i3 - n2, u2 = h2 - o2;
          break;
        case "darken":
          c2 = Math.min(s3, r2), l2 = Math.min(i3, n2), u2 = Math.min(h2, o2);
          break;
        case "lighten":
          c2 = Math.max(s3, r2), l2 = Math.max(i3, n2), u2 = Math.max(h2, o2);
          break;
        case "overlay":
          c2 = r2 < 128 ? 2 * s3 * r2 / 255 : 255 - 2 * (255 - s3) * (255 - r2) / 255, l2 = n2 < 128 ? 2 * i3 * n2 / 255 : 255 - 2 * (255 - i3) * (255 - n2) / 255, u2 = o2 < 128 ? 2 * h2 * o2 / 255 : 255 - 2 * (255 - h2) * (255 - o2) / 255;
          break;
        case "exclusion":
          c2 = r2 + s3 - 2 * r2 * s3 / 255, l2 = n2 + i3 - 2 * n2 * i3 / 255, u2 = o2 + h2 - 2 * o2 * h2 / 255;
          break;
        case "tint":
          c2 = r2 + s3 * a2, l2 = n2 + i3 * a2, u2 = o2 + h2 * a2;
      }
      e3[t3] = c2, e3[t3 + 1] = l2, e3[t3 + 2] = u2;
    }
  }
  sendUniformData(t2, e3) {
    const s2 = new Le(this.color).getSource();
    s2[0] = this.alpha * s2[0] / 255, s2[1] = this.alpha * s2[1] / 255, s2[2] = this.alpha * s2[2] / 255, s2[3] = this.alpha, t2.uniform4fv(e3.uColor, s2);
  }
}
t(za, "defaults", { color: "#F95C63", mode: "multiply", alpha: 1 }), t(za, "type", "BlendColor"), t(za, "uniformLocations", ["uColor"]), tt.setClass(za);
var Ga = { multiply: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform sampler2D uImage;
    uniform vec4 uColor;
    varying vec2 vTexCoord;
    varying vec2 vTexCoord2;
    void main() {
      vec4 color = texture2D(uTexture, vTexCoord);
      vec4 color2 = texture2D(uImage, vTexCoord2);
      color.rgba *= color2.rgba;
      gl_FragColor = color;
    }
    `, mask: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform sampler2D uImage;
    uniform vec4 uColor;
    varying vec2 vTexCoord;
    varying vec2 vTexCoord2;
    void main() {
      vec4 color = texture2D(uTexture, vTexCoord);
      vec4 color2 = texture2D(uImage, vTexCoord2);
      color.a = color2.a;
      gl_FragColor = color;
    }
    ` };
var Ha = ["type", "image"];

class Na extends Wa {
  getCacheKey() {
    return "".concat(this.type, "_").concat(this.mode);
  }
  getFragmentSource() {
    return Ga[this.mode];
  }
  getVertexSource() {
    return `
    attribute vec2 aPosition;
    varying vec2 vTexCoord;
    varying vec2 vTexCoord2;
    uniform mat3 uTransformMatrix;
    void main() {
      vTexCoord = aPosition;
      vTexCoord2 = (uTransformMatrix * vec3(aPosition, 1.0)).xy;
      gl_Position = vec4(aPosition * 2.0 - 1.0, 0.0, 1.0);
    }
    `;
  }
  applyToWebGL(t2) {
    const e3 = t2.context, s2 = this.createTexture(t2.filterBackend, this.image);
    this.bindAdditionalTexture(e3, s2, e3.TEXTURE1), super.applyToWebGL(t2), this.unbindAdditionalTexture(e3, e3.TEXTURE1);
  }
  createTexture(t2, e3) {
    return t2.getCachedTexture(e3.cacheKey, e3.getElement());
  }
  calculateMatrix() {
    const t2 = this.image, { width: e3, height: s2 } = t2.getElement();
    return [1 / t2.scaleX, 0, 0, 0, 1 / t2.scaleY, 0, -t2.left / e3, -t2.top / s2, 1];
  }
  applyTo2d(t2) {
    let { imageData: { data: e3, width: s2, height: i2 }, filterBackend: { resources: r2 } } = t2;
    const n2 = this.image;
    r2.blendImage || (r2.blendImage = pt());
    const o2 = r2.blendImage, a2 = o2.getContext("2d");
    o2.width !== s2 || o2.height !== i2 ? (o2.width = s2, o2.height = i2) : a2.clearRect(0, 0, s2, i2), a2.setTransform(n2.scaleX, 0, 0, n2.scaleY, n2.left, n2.top), a2.drawImage(n2.getElement(), 0, 0, s2, i2);
    const h2 = a2.getImageData(0, 0, s2, i2).data;
    for (let t3 = 0;t3 < e3.length; t3 += 4) {
      const s3 = e3[t3], i3 = e3[t3 + 1], r3 = e3[t3 + 2], n3 = e3[t3 + 3], o3 = h2[t3], a3 = h2[t3 + 1], c2 = h2[t3 + 2], l2 = h2[t3 + 3];
      switch (this.mode) {
        case "multiply":
          e3[t3] = s3 * o3 / 255, e3[t3 + 1] = i3 * a3 / 255, e3[t3 + 2] = r3 * c2 / 255, e3[t3 + 3] = n3 * l2 / 255;
          break;
        case "mask":
          e3[t3 + 3] = l2;
      }
    }
  }
  sendUniformData(t2, e3) {
    const s2 = this.calculateMatrix();
    t2.uniform1i(e3.uImage, 1), t2.uniformMatrix3fv(e3.uTransformMatrix, false, s2);
  }
  toObject() {
    return s(s({}, super.toObject()), {}, { image: this.image && this.image.toObject() });
  }
  static async fromObject(t2, e3) {
    let { type: r2, image: n2 } = t2, o2 = i(t2, Ha);
    return na.fromObject(n2, e3).then((t3) => new this(s(s({}, o2), {}, { image: t3 })));
  }
}
t(Na, "type", "BlendImage"), t(Na, "defaults", { mode: "multiply", alpha: 1 }), t(Na, "uniformLocations", ["uTransformMatrix", "uImage"]), tt.setClass(Na);

class Ua extends Wa {
  getFragmentSource() {
    return `
    precision highp float;
    uniform sampler2D uTexture;
    uniform vec2 uDelta;
    varying vec2 vTexCoord;
    const float nSamples = 15.0;
    vec3 v3offset = vec3(12.9898, 78.233, 151.7182);
    float random(vec3 scale) {
      /* use the fragment position for a different seed per-pixel */
      return fract(sin(dot(gl_FragCoord.xyz, scale)) * 43758.5453);
    }
    void main() {
      vec4 color = vec4(0.0);
      float totalC = 0.0;
      float totalA = 0.0;
      float offset = random(v3offset);
      for (float t = -nSamples; t <= nSamples; t++) {
        float percent = (t + offset - 0.5) / nSamples;
        vec4 sample = texture2D(uTexture, vTexCoord + uDelta * percent);
        float weight = 1.0 - abs(percent);
        float alpha = weight * sample.a;
        color.rgb += sample.rgb * alpha;
        color.a += alpha;
        totalA += weight;
        totalC += alpha;
      }
      gl_FragColor.rgb = color.rgb / totalC;
      gl_FragColor.a = color.a / totalA;
    }
  `;
  }
  applyTo(t2) {
    Fa(t2) ? (this.aspectRatio = t2.sourceWidth / t2.sourceHeight, t2.passes++, this._setupFrameBuffer(t2), this.horizontal = true, this.applyToWebGL(t2), this._swapTextures(t2), this._setupFrameBuffer(t2), this.horizontal = false, this.applyToWebGL(t2), this._swapTextures(t2)) : this.applyTo2d(t2);
  }
  applyTo2d(t2) {
    let { imageData: { data: e3, width: s2, height: i2 } } = t2;
    this.aspectRatio = s2 / i2, this.horizontal = true;
    let r2 = this.getBlurValue() * s2;
    const n2 = new Uint8ClampedArray(e3), o2 = 15, a2 = 4 * s2;
    for (let t3 = 0;t3 < e3.length; t3 += 4) {
      let s3 = 0, i3 = 0, h2 = 0, c2 = 0, l2 = 0;
      const u2 = t3 - t3 % a2, d2 = u2 + a2;
      for (let n3 = -14;n3 < o2; n3++) {
        const a3 = n3 / o2, g2 = 4 * Math.floor(r2 * a3), f = 1 - Math.abs(a3);
        let p2 = t3 + g2;
        p2 < u2 ? p2 = u2 : p2 > d2 && (p2 = d2);
        const m2 = e3[p2 + 3] * f;
        s3 += e3[p2] * m2, i3 += e3[p2 + 1] * m2, h2 += e3[p2 + 2] * m2, c2 += m2, l2 += f;
      }
      n2[t3] = s3 / c2, n2[t3 + 1] = i3 / c2, n2[t3 + 2] = h2 / c2, n2[t3 + 3] = c2 / l2;
    }
    this.horizontal = false, r2 = this.getBlurValue() * i2;
    for (let t3 = 0;t3 < n2.length; t3 += 4) {
      let s3 = 0, i3 = 0, h2 = 0, c2 = 0, l2 = 0;
      const u2 = t3 % a2, d2 = n2.length - a2 + u2;
      for (let e4 = -14;e4 < o2; e4++) {
        const g2 = e4 / o2, f = Math.floor(r2 * g2) * a2, p2 = 1 - Math.abs(g2);
        let m2 = t3 + f;
        m2 < u2 ? m2 = u2 : m2 > d2 && (m2 = d2);
        const v2 = n2[m2 + 3] * p2;
        s3 += n2[m2] * v2, i3 += n2[m2 + 1] * v2, h2 += n2[m2 + 2] * v2, c2 += v2, l2 += p2;
      }
      e3[t3] = s3 / c2, e3[t3 + 1] = i3 / c2, e3[t3 + 2] = h2 / c2, e3[t3 + 3] = c2 / l2;
    }
  }
  sendUniformData(t2, e3) {
    const s2 = this.chooseRightDelta();
    t2.uniform2fv(e3.uDelta, s2);
  }
  isNeutralState() {
    return this.blur === 0;
  }
  getBlurValue() {
    let t2 = 1;
    const { horizontal: e3, aspectRatio: s2 } = this;
    return e3 ? s2 > 1 && (t2 = 1 / s2) : s2 < 1 && (t2 = s2), t2 * this.blur * 0.12;
  }
  chooseRightDelta() {
    const t2 = this.getBlurValue();
    return this.horizontal ? [t2, 0] : [0, t2];
  }
}
t(Ua, "type", "Blur"), t(Ua, "defaults", { blur: 0 }), t(Ua, "uniformLocations", ["uDelta"]), tt.setClass(Ua);

class qa extends Wa {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uBrightness;
  varying vec2 vTexCoord;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    color.rgb += uBrightness;
    gl_FragColor = color;
  }
`;
  }
  applyTo2d(t2) {
    let { imageData: { data: e3 } } = t2;
    const s2 = Math.round(255 * this.brightness);
    for (let t3 = 0;t3 < e3.length; t3 += 4)
      e3[t3] += s2, e3[t3 + 1] += s2, e3[t3 + 2] += s2;
  }
  isNeutralState() {
    return this.brightness === 0;
  }
  sendUniformData(t2, e3) {
    t2.uniform1f(e3.uBrightness, this.brightness);
  }
}
t(qa, "type", "Brightness"), t(qa, "defaults", { brightness: 0 }), t(qa, "uniformLocations", ["uBrightness"]), tt.setClass(qa);
var Ka = { matrix: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0], colorsOnly: true };

class Ja extends Wa {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  varying vec2 vTexCoord;
  uniform mat4 uColorMatrix;
  uniform vec4 uConstants;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    color *= uColorMatrix;
    color += uConstants;
    gl_FragColor = color;
  }`;
  }
  applyTo2d(t2) {
    const e3 = t2.imageData.data, s2 = this.matrix, i2 = this.colorsOnly;
    for (let t3 = 0;t3 < e3.length; t3 += 4) {
      const r2 = e3[t3], n2 = e3[t3 + 1], o2 = e3[t3 + 2];
      if (e3[t3] = r2 * s2[0] + n2 * s2[1] + o2 * s2[2] + 255 * s2[4], e3[t3 + 1] = r2 * s2[5] + n2 * s2[6] + o2 * s2[7] + 255 * s2[9], e3[t3 + 2] = r2 * s2[10] + n2 * s2[11] + o2 * s2[12] + 255 * s2[14], !i2) {
        const i3 = e3[t3 + 3];
        e3[t3] += i3 * s2[3], e3[t3 + 1] += i3 * s2[8], e3[t3 + 2] += i3 * s2[13], e3[t3 + 3] = r2 * s2[15] + n2 * s2[16] + o2 * s2[17] + i3 * s2[18] + 255 * s2[19];
      }
    }
  }
  sendUniformData(t2, e3) {
    const s2 = this.matrix, i2 = [s2[0], s2[1], s2[2], s2[3], s2[5], s2[6], s2[7], s2[8], s2[10], s2[11], s2[12], s2[13], s2[15], s2[16], s2[17], s2[18]], r2 = [s2[4], s2[9], s2[14], s2[19]];
    t2.uniformMatrix4fv(e3.uColorMatrix, false, i2), t2.uniform4fv(e3.uConstants, r2);
  }
  toObject() {
    return s(s({}, super.toObject()), {}, { matrix: [...this.matrix] });
  }
}
function Qa(e3, s2) {
  var i2;
  const r2 = (t(i2 = class extends Ja {
    toObject() {
      return { type: this.type, colorsOnly: this.colorsOnly };
    }
  }, "type", e3), t(i2, "defaults", { colorsOnly: false, matrix: s2 }), i2);
  return tt.setClass(r2, e3), r2;
}
t(Ja, "type", "ColorMatrix"), t(Ja, "defaults", Ka), t(Ja, "uniformLocations", ["uColorMatrix", "uConstants"]), tt.setClass(Ja);
var Za = Qa("Brownie", [0.5997, 0.34553, -0.27082, 0, 0.186, -0.0377, 0.86095, 0.15059, 0, -0.1449, 0.24113, -0.07441, 0.44972, 0, -0.02965, 0, 0, 0, 1, 0]);
var $a = Qa("Vintage", [0.62793, 0.32021, -0.03965, 0, 0.03784, 0.02578, 0.64411, 0.03259, 0, 0.02926, 0.0466, -0.08512, 0.52416, 0, 0.02023, 0, 0, 0, 1, 0]);
var th = Qa("Kodachrome", [1.12855, -0.39673, -0.03992, 0, 0.24991, -0.16404, 1.08352, -0.05498, 0, 0.09698, -0.16786, -0.56034, 1.60148, 0, 0.13972, 0, 0, 0, 1, 0]);
var eh = Qa("Technicolor", [1.91252, -0.85453, -0.09155, 0, 0.04624, -0.30878, 1.76589, -0.10601, 0, -0.27589, -0.2311, -0.75018, 1.84759, 0, 0.12137, 0, 0, 0, 1, 0]);
var sh = Qa("Polaroid", [1.438, -0.062, -0.062, 0, 0, -0.122, 1.378, -0.122, 0, 0, -0.016, -0.016, 1.483, 0, 0, 0, 0, 0, 1, 0]);
var ih = Qa("Sepia", [0.393, 0.769, 0.189, 0, 0, 0.349, 0.686, 0.168, 0, 0, 0.272, 0.534, 0.131, 0, 0, 0, 0, 0, 1, 0]);
var rh = Qa("BlackWhite", [1.5, 1.5, 1.5, 0, -1, 1.5, 1.5, 1.5, 0, -1, 1.5, 1.5, 1.5, 0, -1, 0, 0, 0, 1, 0]);

class nh extends Wa {
  constructor() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super(t2), this.subFilters = t2.subFilters || [];
  }
  applyTo(t2) {
    Fa(t2) && (t2.passes += this.subFilters.length - 1), this.subFilters.forEach((e3) => {
      e3.applyTo(t2);
    });
  }
  toObject() {
    return { type: this.type, subFilters: this.subFilters.map((t2) => t2.toObject()) };
  }
  isNeutralState() {
    return !this.subFilters.some((t2) => !t2.isNeutralState());
  }
  static fromObject(t2, e3) {
    return Promise.all((t2.subFilters || []).map((t3) => tt.getClass(t3.type).fromObject(t3, e3))).then((t3) => new this({ subFilters: t3 }));
  }
}
t(nh, "type", "Composed"), tt.setClass(nh);

class oh extends Wa {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uContrast;
  varying vec2 vTexCoord;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    float contrastF = 1.015 * (uContrast + 1.0) / (1.0 * (1.015 - uContrast));
    color.rgb = contrastF * (color.rgb - 0.5) + 0.5;
    gl_FragColor = color;
  }`;
  }
  isNeutralState() {
    return this.contrast === 0;
  }
  applyTo2d(t2) {
    let { imageData: { data: e3 } } = t2;
    const s2 = Math.floor(255 * this.contrast), i2 = 259 * (s2 + 255) / (255 * (259 - s2));
    for (let t3 = 0;t3 < e3.length; t3 += 4)
      e3[t3] = i2 * (e3[t3] - 128) + 128, e3[t3 + 1] = i2 * (e3[t3 + 1] - 128) + 128, e3[t3 + 2] = i2 * (e3[t3 + 2] - 128) + 128;
  }
  sendUniformData(t2, e3) {
    t2.uniform1f(e3.uContrast, this.contrast);
  }
}
t(oh, "type", "Contrast"), t(oh, "defaults", { contrast: 0 }), t(oh, "uniformLocations", ["uContrast"]), tt.setClass(oh);
var ah = { Convolute_3_1: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[9];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 0);
      for (float h = 0.0; h < 3.0; h+=1.0) {
        for (float w = 0.0; w < 3.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 1), uStepH * (h - 1));
          color += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 3.0 + w)];
        }
      }
      gl_FragColor = color;
    }
    `, Convolute_3_0: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[9];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 1);
      for (float h = 0.0; h < 3.0; h+=1.0) {
        for (float w = 0.0; w < 3.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 1.0), uStepH * (h - 1.0));
          color.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 3.0 + w)];
        }
      }
      float alpha = texture2D(uTexture, vTexCoord).a;
      gl_FragColor = color;
      gl_FragColor.a = alpha;
    }
    `, Convolute_5_1: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[25];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 0);
      for (float h = 0.0; h < 5.0; h+=1.0) {
        for (float w = 0.0; w < 5.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 2.0), uStepH * (h - 2.0));
          color += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 5.0 + w)];
        }
      }
      gl_FragColor = color;
    }
    `, Convolute_5_0: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[25];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 1);
      for (float h = 0.0; h < 5.0; h+=1.0) {
        for (float w = 0.0; w < 5.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 2.0), uStepH * (h - 2.0));
          color.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 5.0 + w)];
        }
      }
      float alpha = texture2D(uTexture, vTexCoord).a;
      gl_FragColor = color;
      gl_FragColor.a = alpha;
    }
    `, Convolute_7_1: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[49];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 0);
      for (float h = 0.0; h < 7.0; h+=1.0) {
        for (float w = 0.0; w < 7.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 3.0), uStepH * (h - 3.0));
          color += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 7.0 + w)];
        }
      }
      gl_FragColor = color;
    }
    `, Convolute_7_0: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[49];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 1);
      for (float h = 0.0; h < 7.0; h+=1.0) {
        for (float w = 0.0; w < 7.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 3.0), uStepH * (h - 3.0));
          color.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 7.0 + w)];
        }
      }
      float alpha = texture2D(uTexture, vTexCoord).a;
      gl_FragColor = color;
      gl_FragColor.a = alpha;
    }
    `, Convolute_9_1: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[81];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 0);
      for (float h = 0.0; h < 9.0; h+=1.0) {
        for (float w = 0.0; w < 9.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 4.0), uStepH * (h - 4.0));
          color += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 9.0 + w)];
        }
      }
      gl_FragColor = color;
    }
    `, Convolute_9_0: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform float uMatrix[81];
    uniform float uStepW;
    uniform float uStepH;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = vec4(0, 0, 0, 1);
      for (float h = 0.0; h < 9.0; h+=1.0) {
        for (float w = 0.0; w < 9.0; w+=1.0) {
          vec2 matrixPos = vec2(uStepW * (w - 4.0), uStepH * (h - 4.0));
          color.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 9.0 + w)];
        }
      }
      float alpha = texture2D(uTexture, vTexCoord).a;
      gl_FragColor = color;
      gl_FragColor.a = alpha;
    }
    ` };

class hh extends Wa {
  getCacheKey() {
    return "".concat(this.type, "_").concat(Math.sqrt(this.matrix.length), "_").concat(this.opaque ? 1 : 0);
  }
  getFragmentSource() {
    return ah[this.getCacheKey()];
  }
  applyTo2d(t2) {
    const e3 = t2.imageData, s2 = e3.data, i2 = this.matrix, r2 = Math.round(Math.sqrt(i2.length)), n2 = Math.floor(r2 / 2), o2 = e3.width, a2 = e3.height, h2 = t2.ctx.createImageData(o2, a2), c2 = h2.data, l2 = this.opaque ? 1 : 0;
    let u2, d2, g2, f, p2, m2, v2, y2, _2, x2, C2, b2, S2;
    for (C2 = 0;C2 < a2; C2++)
      for (x2 = 0;x2 < o2; x2++) {
        for (p2 = 4 * (C2 * o2 + x2), u2 = 0, d2 = 0, g2 = 0, f = 0, S2 = 0;S2 < r2; S2++)
          for (b2 = 0;b2 < r2; b2++)
            v2 = C2 + S2 - n2, m2 = x2 + b2 - n2, v2 < 0 || v2 >= a2 || m2 < 0 || m2 >= o2 || (y2 = 4 * (v2 * o2 + m2), _2 = i2[S2 * r2 + b2], u2 += s2[y2] * _2, d2 += s2[y2 + 1] * _2, g2 += s2[y2 + 2] * _2, l2 || (f += s2[y2 + 3] * _2));
        c2[p2] = u2, c2[p2 + 1] = d2, c2[p2 + 2] = g2, c2[p2 + 3] = l2 ? s2[p2 + 3] : f;
      }
    t2.imageData = h2;
  }
  sendUniformData(t2, e3) {
    t2.uniform1fv(e3.uMatrix, this.matrix);
  }
  toObject() {
    return s(s({}, super.toObject()), {}, { opaque: this.opaque, matrix: [...this.matrix] });
  }
}
t(hh, "type", "Convolute"), t(hh, "defaults", { opaque: false, matrix: [0, 0, 0, 0, 1, 0, 0, 0, 0] }), t(hh, "uniformLocations", ["uMatrix", "uOpaque", "uHalfSize", "uSize"]), tt.setClass(hh);
var ch = "Gamma";

class lh extends Wa {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform vec3 uGamma;
  varying vec2 vTexCoord;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    vec3 correction = (1.0 / uGamma);
    color.r = pow(color.r, correction.r);
    color.g = pow(color.g, correction.g);
    color.b = pow(color.b, correction.b);
    gl_FragColor = color;
    gl_FragColor.rgb *= color.a;
  }
`;
  }
  constructor() {
    let t2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    super(t2), this.gamma = t2.gamma || this.constructor.defaults.gamma.concat();
  }
  applyTo2d(t2) {
    let { imageData: { data: e3 } } = t2;
    const s2 = this.gamma, i2 = 1 / s2[0], r2 = 1 / s2[1], n2 = 1 / s2[2];
    this.rgbValues || (this.rgbValues = { r: new Uint8Array(256), g: new Uint8Array(256), b: new Uint8Array(256) });
    const o2 = this.rgbValues;
    for (let t3 = 0;t3 < 256; t3++)
      o2.r[t3] = 255 * Math.pow(t3 / 255, i2), o2.g[t3] = 255 * Math.pow(t3 / 255, r2), o2.b[t3] = 255 * Math.pow(t3 / 255, n2);
    for (let t3 = 0;t3 < e3.length; t3 += 4)
      e3[t3] = o2.r[e3[t3]], e3[t3 + 1] = o2.g[e3[t3 + 1]], e3[t3 + 2] = o2.b[e3[t3 + 2]];
  }
  sendUniformData(t2, e3) {
    t2.uniform3fv(e3.uGamma, this.gamma);
  }
  isNeutralState() {
    const { gamma: t2 } = this;
    return t2[0] === 1 && t2[1] === 1 && t2[2] === 1;
  }
  toObject() {
    return { type: ch, gamma: this.gamma.concat() };
  }
}
t(lh, "type", ch), t(lh, "defaults", { gamma: [1, 1, 1] }), t(lh, "uniformLocations", ["uGamma"]), tt.setClass(lh);
var uh = { average: `
    precision highp float;
    uniform sampler2D uTexture;
    varying vec2 vTexCoord;
    void main() {
      vec4 color = texture2D(uTexture, vTexCoord);
      float average = (color.r + color.b + color.g) / 3.0;
      gl_FragColor = vec4(average, average, average, color.a);
    }
    `, lightness: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform int uMode;
    varying vec2 vTexCoord;
    void main() {
      vec4 col = texture2D(uTexture, vTexCoord);
      float average = (max(max(col.r, col.g),col.b) + min(min(col.r, col.g),col.b)) / 2.0;
      gl_FragColor = vec4(average, average, average, col.a);
    }
    `, luminosity: `
    precision highp float;
    uniform sampler2D uTexture;
    uniform int uMode;
    varying vec2 vTexCoord;
    void main() {
      vec4 col = texture2D(uTexture, vTexCoord);
      float average = 0.21 * col.r + 0.72 * col.g + 0.07 * col.b;
      gl_FragColor = vec4(average, average, average, col.a);
    }
    ` };

class dh extends Wa {
  applyTo2d(t2) {
    let { imageData: { data: e3 } } = t2;
    for (let t3, s2 = 0;s2 < e3.length; s2 += 4) {
      const i2 = e3[s2], r2 = e3[s2 + 1], n2 = e3[s2 + 2];
      switch (this.mode) {
        case "average":
          t3 = (i2 + r2 + n2) / 3;
          break;
        case "lightness":
          t3 = (Math.min(i2, r2, n2) + Math.max(i2, r2, n2)) / 2;
          break;
        case "luminosity":
          t3 = 0.21 * i2 + 0.72 * r2 + 0.07 * n2;
      }
      e3[s2 + 2] = e3[s2 + 1] = e3[s2] = t3;
    }
  }
  getCacheKey() {
    return "".concat(this.type, "_").concat(this.mode);
  }
  getFragmentSource() {
    return uh[this.mode];
  }
  sendUniformData(t2, e3) {
    t2.uniform1i(e3.uMode, 1);
  }
  isNeutralState() {
    return false;
  }
}
t(dh, "type", "Grayscale"), t(dh, "defaults", { mode: "average" }), t(dh, "uniformLocations", ["uMode"]), tt.setClass(dh);
var gh = s(s({}, Ka), {}, { rotation: 0 });

class fh extends Ja {
  calculateMatrix() {
    const t2 = this.rotation * Math.PI, e3 = rt(t2), s2 = nt(t2), i2 = 1 / 3, r2 = Math.sqrt(i2) * s2, n2 = 1 - e3;
    this.matrix = [e3 + n2 / 3, i2 * n2 - r2, i2 * n2 + r2, 0, 0, i2 * n2 + r2, e3 + i2 * n2, i2 * n2 - r2, 0, 0, i2 * n2 - r2, i2 * n2 + r2, e3 + i2 * n2, 0, 0, 0, 0, 0, 1, 0];
  }
  isNeutralState() {
    return this.rotation === 0;
  }
  applyTo(t2) {
    this.calculateMatrix(), super.applyTo(t2);
  }
  toObject() {
    return { type: this.type, rotation: this.rotation };
  }
}
t(fh, "type", "HueRotation"), t(fh, "defaults", gh), tt.setClass(fh);

class ph extends Wa {
  applyTo2d(t2) {
    let { imageData: { data: e3 } } = t2;
    for (let t3 = 0;t3 < e3.length; t3 += 4)
      e3[t3] = 255 - e3[t3], e3[t3 + 1] = 255 - e3[t3 + 1], e3[t3 + 2] = 255 - e3[t3 + 2], this.alpha && (e3[t3 + 3] = 255 - e3[t3 + 3]);
  }
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform int uInvert;
  uniform int uAlpha;
  varying vec2 vTexCoord;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    if (uInvert == 1) {
      if (uAlpha == 1) {
        gl_FragColor = vec4(1.0 - color.r,1.0 -color.g,1.0 -color.b,1.0 -color.a);
      } else {
        gl_FragColor = vec4(1.0 - color.r,1.0 -color.g,1.0 -color.b,color.a);
      }
    } else {
      gl_FragColor = color;
    }
  }
`;
  }
  isNeutralState() {
    return !this.invert;
  }
  sendUniformData(t2, e3) {
    t2.uniform1i(e3.uInvert, Number(this.invert)), t2.uniform1i(e3.uAlpha, Number(this.alpha));
  }
}
t(ph, "type", "Invert"), t(ph, "defaults", { alpha: false, invert: true }), t(ph, "uniformLocations", ["uInvert", "uAlpha"]), tt.setClass(ph);

class mh extends Wa {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uStepH;
  uniform float uNoise;
  uniform float uSeed;
  varying vec2 vTexCoord;
  float rand(vec2 co, float seed, float vScale) {
    return fract(sin(dot(co.xy * vScale ,vec2(12.9898 , 78.233))) * 43758.5453 * (seed + 0.01) / 2.0);
  }
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    color.rgb += (0.5 - rand(vTexCoord, uSeed, 0.1 / uStepH)) * uNoise;
    gl_FragColor = color;
  }
`;
  }
  applyTo2d(t2) {
    let { imageData: { data: e3 } } = t2;
    const s2 = this.noise;
    for (let t3 = 0;t3 < e3.length; t3 += 4) {
      const i2 = (0.5 - Math.random()) * s2;
      e3[t3] += i2, e3[t3 + 1] += i2, e3[t3 + 2] += i2;
    }
  }
  sendUniformData(t2, e3) {
    t2.uniform1f(e3.uNoise, this.noise / 255), t2.uniform1f(e3.uSeed, Math.random());
  }
  isNeutralState() {
    return this.noise === 0;
  }
}
t(mh, "type", "Noise"), t(mh, "defaults", { noise: 0 }), t(mh, "uniformLocations", ["uNoise", "uSeed"]), tt.setClass(mh);

class vh extends Wa {
  applyTo2d(t2) {
    let { imageData: { data: e3, width: s2, height: i2 } } = t2;
    for (let t3 = 0;t3 < i2; t3 += this.blocksize)
      for (let r2 = 0;r2 < s2; r2 += this.blocksize) {
        const n2 = 4 * t3 * s2 + 4 * r2, o2 = e3[n2], a2 = e3[n2 + 1], h2 = e3[n2 + 2], c2 = e3[n2 + 3];
        for (let n3 = t3;n3 < Math.min(t3 + this.blocksize, i2); n3++)
          for (let t4 = r2;t4 < Math.min(r2 + this.blocksize, s2); t4++) {
            const i3 = 4 * n3 * s2 + 4 * t4;
            e3[i3] = o2, e3[i3 + 1] = a2, e3[i3 + 2] = h2, e3[i3 + 3] = c2;
          }
      }
  }
  isNeutralState() {
    return this.blocksize === 1;
  }
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uBlocksize;
  uniform float uStepW;
  uniform float uStepH;
  varying vec2 vTexCoord;
  void main() {
    float blockW = uBlocksize * uStepW;
    float blockH = uBlocksize * uStepH;
    int posX = int(vTexCoord.x / blockW);
    int posY = int(vTexCoord.y / blockH);
    float fposX = float(posX);
    float fposY = float(posY);
    vec2 squareCoords = vec2(fposX * blockW, fposY * blockH);
    vec4 color = texture2D(uTexture, squareCoords);
    gl_FragColor = color;
  }
`;
  }
  sendUniformData(t2, e3) {
    t2.uniform1f(e3.uBlocksize, this.blocksize);
  }
}
t(vh, "type", "Pixelate"), t(vh, "defaults", { blocksize: 4 }), t(vh, "uniformLocations", ["uBlocksize"]), tt.setClass(vh);

class yh extends Wa {
  getFragmentSource() {
    return `
precision highp float;
uniform sampler2D uTexture;
uniform vec4 uLow;
uniform vec4 uHigh;
varying vec2 vTexCoord;
void main() {
  gl_FragColor = texture2D(uTexture, vTexCoord);
  if(all(greaterThan(gl_FragColor.rgb,uLow.rgb)) && all(greaterThan(uHigh.rgb,gl_FragColor.rgb))) {
    gl_FragColor.a = 0.0;
  }
}
`;
  }
  applyTo2d(t2) {
    let { imageData: { data: e3 } } = t2;
    const s2 = 255 * this.distance, i2 = new Le(this.color).getSource(), r2 = [i2[0] - s2, i2[1] - s2, i2[2] - s2], n2 = [i2[0] + s2, i2[1] + s2, i2[2] + s2];
    for (let t3 = 0;t3 < e3.length; t3 += 4) {
      const s3 = e3[t3], i3 = e3[t3 + 1], o2 = e3[t3 + 2];
      s3 > r2[0] && i3 > r2[1] && o2 > r2[2] && s3 < n2[0] && i3 < n2[1] && o2 < n2[2] && (e3[t3 + 3] = 0);
    }
  }
  sendUniformData(t2, e3) {
    const s2 = new Le(this.color).getSource(), i2 = this.distance, r2 = [0 + s2[0] / 255 - i2, 0 + s2[1] / 255 - i2, 0 + s2[2] / 255 - i2, 1], n2 = [s2[0] / 255 + i2, s2[1] / 255 + i2, s2[2] / 255 + i2, 1];
    t2.uniform4fv(e3.uLow, r2), t2.uniform4fv(e3.uHigh, n2);
  }
}
t(yh, "type", "RemoveColor"), t(yh, "defaults", { color: "#FFFFFF", distance: 0.02, useAlpha: false }), t(yh, "uniformLocations", ["uLow", "uHigh"]), tt.setClass(yh);

class _h extends Wa {
  sendUniformData(t2, e3) {
    t2.uniform2fv(e3.uDelta, this.horizontal ? [1 / this.width, 0] : [0, 1 / this.height]), t2.uniform1fv(e3.uTaps, this.taps);
  }
  getFilterWindow() {
    const t2 = this.tempScale;
    return Math.ceil(this.lanczosLobes / t2);
  }
  getCacheKey() {
    const t2 = this.getFilterWindow();
    return "".concat(this.type, "_").concat(t2);
  }
  getFragmentSource() {
    const t2 = this.getFilterWindow();
    return this.generateShader(t2);
  }
  getTaps() {
    const t2 = this.lanczosCreate(this.lanczosLobes), e3 = this.tempScale, s2 = this.getFilterWindow(), i2 = new Array(s2);
    for (let r2 = 1;r2 <= s2; r2++)
      i2[r2 - 1] = t2(r2 * e3);
    return i2;
  }
  generateShader(t2) {
    const e3 = new Array(t2);
    for (let s2 = 1;s2 <= t2; s2++)
      e3[s2 - 1] = "".concat(s2, ".0 * uDelta");
    return `
      precision highp float;
      uniform sampler2D uTexture;
      uniform vec2 uDelta;
      varying vec2 vTexCoord;
      uniform float uTaps[`.concat(t2, `];
      void main() {
        vec4 color = texture2D(uTexture, vTexCoord);
        float sum = 1.0;
        `).concat(e3.map((t3, e4) => `
              color += texture2D(uTexture, vTexCoord + `.concat(t3, ") * uTaps[").concat(e4, "] + texture2D(uTexture, vTexCoord - ").concat(t3, ") * uTaps[").concat(e4, `];
              sum += 2.0 * uTaps[`).concat(e4, `];
            `)).join(`
`), `
        gl_FragColor = color / sum;
      }
    `);
  }
  applyToForWebgl(t2) {
    t2.passes++, this.width = t2.sourceWidth, this.horizontal = true, this.dW = Math.round(this.width * this.scaleX), this.dH = t2.sourceHeight, this.tempScale = this.dW / this.width, this.taps = this.getTaps(), t2.destinationWidth = this.dW, super.applyTo(t2), t2.sourceWidth = t2.destinationWidth, this.height = t2.sourceHeight, this.horizontal = false, this.dH = Math.round(this.height * this.scaleY), this.tempScale = this.dH / this.height, this.taps = this.getTaps(), t2.destinationHeight = this.dH, super.applyTo(t2), t2.sourceHeight = t2.destinationHeight;
  }
  applyTo(t2) {
    Fa(t2) ? this.applyToForWebgl(t2) : this.applyTo2d(t2);
  }
  isNeutralState() {
    return this.scaleX === 1 && this.scaleY === 1;
  }
  lanczosCreate(t2) {
    return (e3) => {
      if (e3 >= t2 || e3 <= -t2)
        return 0;
      if (e3 < 0.00000011920929 && e3 > -0.00000011920929)
        return 1;
      const s2 = (e3 *= Math.PI) / t2;
      return Math.sin(e3) / e3 * Math.sin(s2) / s2;
    };
  }
  applyTo2d(t2) {
    const e3 = t2.imageData, s2 = this.scaleX, i2 = this.scaleY;
    this.rcpScaleX = 1 / s2, this.rcpScaleY = 1 / i2;
    const { width: r2, height: n2 } = e3, o2 = Math.round(r2 * s2), a2 = Math.round(n2 * i2);
    let h2;
    h2 = this.resizeType === "sliceHack" ? this.sliceByTwo(t2, r2, n2, o2, a2) : this.resizeType === "hermite" ? this.hermiteFastResize(t2, r2, n2, o2, a2) : this.resizeType === "bilinear" ? this.bilinearFiltering(t2, r2, n2, o2, a2) : this.resizeType === "lanczos" ? this.lanczosResize(t2, r2, n2, o2, a2) : new ImageData(o2, a2), t2.imageData = h2;
  }
  sliceByTwo(t2, e3, s2, i2, r2) {
    const n2 = t2.imageData, o2 = 0.5;
    let a2 = false, h2 = false, c2 = e3 * o2, l2 = s2 * o2;
    const u2 = t2.filterBackend.resources;
    let d2 = 0, g2 = 0;
    const f = e3;
    let p2 = 0;
    u2.sliceByTwo || (u2.sliceByTwo = pt());
    const m2 = u2.sliceByTwo;
    (m2.width < 1.5 * e3 || m2.height < s2) && (m2.width = 1.5 * e3, m2.height = s2);
    const v2 = m2.getContext("2d");
    for (v2.clearRect(0, 0, 1.5 * e3, s2), v2.putImageData(n2, 0, 0), i2 = Math.floor(i2), r2 = Math.floor(r2);!a2 || !h2; )
      e3 = c2, s2 = l2, i2 < Math.floor(c2 * o2) ? c2 = Math.floor(c2 * o2) : (c2 = i2, a2 = true), r2 < Math.floor(l2 * o2) ? l2 = Math.floor(l2 * o2) : (l2 = r2, h2 = true), v2.drawImage(m2, d2, g2, e3, s2, f, p2, c2, l2), d2 = f, g2 = p2, p2 += l2;
    return v2.getImageData(d2, g2, i2, r2);
  }
  lanczosResize(t2, e3, s2, i2, r2) {
    const n2 = t2.imageData.data, o2 = t2.ctx.createImageData(i2, r2), a2 = o2.data, h2 = this.lanczosCreate(this.lanczosLobes), c2 = this.rcpScaleX, l2 = this.rcpScaleY, u2 = 2 / this.rcpScaleX, d2 = 2 / this.rcpScaleY, g2 = Math.ceil(c2 * this.lanczosLobes / 2), f = Math.ceil(l2 * this.lanczosLobes / 2), p2 = {}, m2 = { x: 0, y: 0 }, v2 = { x: 0, y: 0 };
    return function t(y2) {
      let _2, x2, C2, b2, S2, w2, T2, O2, k2, D2, M2;
      for (m2.x = (y2 + 0.5) * c2, v2.x = Math.floor(m2.x), _2 = 0;_2 < r2; _2++) {
        for (m2.y = (_2 + 0.5) * l2, v2.y = Math.floor(m2.y), S2 = 0, w2 = 0, T2 = 0, O2 = 0, k2 = 0, x2 = v2.x - g2;x2 <= v2.x + g2; x2++)
          if (!(x2 < 0 || x2 >= e3)) {
            D2 = Math.floor(1000 * Math.abs(x2 - m2.x)), p2[D2] || (p2[D2] = {});
            for (let t3 = v2.y - f;t3 <= v2.y + f; t3++)
              t3 < 0 || t3 >= s2 || (M2 = Math.floor(1000 * Math.abs(t3 - m2.y)), p2[D2][M2] || (p2[D2][M2] = h2(Math.sqrt(Math.pow(D2 * u2, 2) + Math.pow(M2 * d2, 2)) / 1000)), C2 = p2[D2][M2], C2 > 0 && (b2 = 4 * (t3 * e3 + x2), S2 += C2, w2 += C2 * n2[b2], T2 += C2 * n2[b2 + 1], O2 += C2 * n2[b2 + 2], k2 += C2 * n2[b2 + 3]));
          }
        b2 = 4 * (_2 * i2 + y2), a2[b2] = w2 / S2, a2[b2 + 1] = T2 / S2, a2[b2 + 2] = O2 / S2, a2[b2 + 3] = k2 / S2;
      }
      return ++y2 < i2 ? t(y2) : o2;
    }(0);
  }
  bilinearFiltering(t2, e3, s2, i2, r2) {
    let n2, o2, a2, h2, c2, l2, u2, d2, g2, f, p2, m2, v2, y2 = 0;
    const _2 = this.rcpScaleX, x2 = this.rcpScaleY, C2 = 4 * (e3 - 1), b2 = t2.imageData.data, S2 = t2.ctx.createImageData(i2, r2), w2 = S2.data;
    for (u2 = 0;u2 < r2; u2++)
      for (d2 = 0;d2 < i2; d2++)
        for (c2 = Math.floor(_2 * d2), l2 = Math.floor(x2 * u2), g2 = _2 * d2 - c2, f = x2 * u2 - l2, v2 = 4 * (l2 * e3 + c2), p2 = 0;p2 < 4; p2++)
          n2 = b2[v2 + p2], o2 = b2[v2 + 4 + p2], a2 = b2[v2 + C2 + p2], h2 = b2[v2 + C2 + 4 + p2], m2 = n2 * (1 - g2) * (1 - f) + o2 * g2 * (1 - f) + a2 * f * (1 - g2) + h2 * g2 * f, w2[y2++] = m2;
    return S2;
  }
  hermiteFastResize(t2, e3, s2, i2, r2) {
    const n2 = this.rcpScaleX, o2 = this.rcpScaleY, a2 = Math.ceil(n2 / 2), h2 = Math.ceil(o2 / 2), c2 = t2.imageData.data, l2 = t2.ctx.createImageData(i2, r2), u2 = l2.data;
    for (let t3 = 0;t3 < r2; t3++)
      for (let s3 = 0;s3 < i2; s3++) {
        const r3 = 4 * (s3 + t3 * i2);
        let l3 = 0, d2 = 0, g2 = 0, f = 0, p2 = 0, m2 = 0, v2 = 0;
        const y2 = (t3 + 0.5) * o2;
        for (let i3 = Math.floor(t3 * o2);i3 < (t3 + 1) * o2; i3++) {
          const t4 = Math.abs(y2 - (i3 + 0.5)) / h2, r4 = (s3 + 0.5) * n2, o3 = t4 * t4;
          for (let t5 = Math.floor(s3 * n2);t5 < (s3 + 1) * n2; t5++) {
            let s4 = Math.abs(r4 - (t5 + 0.5)) / a2;
            const n3 = Math.sqrt(o3 + s4 * s4);
            n3 > 1 && n3 < -1 || (l3 = 2 * n3 * n3 * n3 - 3 * n3 * n3 + 1, l3 > 0 && (s4 = 4 * (t5 + i3 * e3), v2 += l3 * c2[s4 + 3], g2 += l3, c2[s4 + 3] < 255 && (l3 = l3 * c2[s4 + 3] / 250), f += l3 * c2[s4], p2 += l3 * c2[s4 + 1], m2 += l3 * c2[s4 + 2], d2 += l3));
          }
        }
        u2[r3] = f / d2, u2[r3 + 1] = p2 / d2, u2[r3 + 2] = m2 / d2, u2[r3 + 3] = v2 / g2;
      }
    return l2;
  }
}
t(_h, "type", "Resize"), t(_h, "defaults", { resizeType: "hermite", scaleX: 1, scaleY: 1, lanczosLobes: 3 }), t(_h, "uniformLocations", ["uDelta", "uTaps"]), tt.setClass(_h);

class xh extends Wa {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uSaturation;
  varying vec2 vTexCoord;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    float rgMax = max(color.r, color.g);
    float rgbMax = max(rgMax, color.b);
    color.r += rgbMax != color.r ? (rgbMax - color.r) * uSaturation : 0.00;
    color.g += rgbMax != color.g ? (rgbMax - color.g) * uSaturation : 0.00;
    color.b += rgbMax != color.b ? (rgbMax - color.b) * uSaturation : 0.00;
    gl_FragColor = color;
  }
`;
  }
  applyTo2d(t2) {
    let { imageData: { data: e3 } } = t2;
    const s2 = -this.saturation;
    for (let t3 = 0;t3 < e3.length; t3 += 4) {
      const i2 = e3[t3], r2 = e3[t3 + 1], n2 = e3[t3 + 2], o2 = Math.max(i2, r2, n2);
      e3[t3] += o2 !== i2 ? (o2 - i2) * s2 : 0, e3[t3 + 1] += o2 !== r2 ? (o2 - r2) * s2 : 0, e3[t3 + 2] += o2 !== n2 ? (o2 - n2) * s2 : 0;
    }
  }
  sendUniformData(t2, e3) {
    t2.uniform1f(e3.uSaturation, -this.saturation);
  }
  isNeutralState() {
    return this.saturation === 0;
  }
}
t(xh, "type", "Saturation"), t(xh, "defaults", { saturation: 0 }), t(xh, "uniformLocations", ["uSaturation"]), tt.setClass(xh);

class Ch extends Wa {
  getFragmentSource() {
    return `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uVibrance;
  varying vec2 vTexCoord;
  void main() {
    vec4 color = texture2D(uTexture, vTexCoord);
    float max = max(color.r, max(color.g, color.b));
    float avg = (color.r + color.g + color.b) / 3.0;
    float amt = (abs(max - avg) * 2.0) * uVibrance;
    color.r += max != color.r ? (max - color.r) * amt : 0.00;
    color.g += max != color.g ? (max - color.g) * amt : 0.00;
    color.b += max != color.b ? (max - color.b) * amt : 0.00;
    gl_FragColor = color;
  }
`;
  }
  applyTo2d(t2) {
    let { imageData: { data: e3 } } = t2;
    const s2 = -this.vibrance;
    for (let t3 = 0;t3 < e3.length; t3 += 4) {
      const i2 = e3[t3], r2 = e3[t3 + 1], n2 = e3[t3 + 2], o2 = Math.max(i2, r2, n2), a2 = (i2 + r2 + n2) / 3, h2 = 2 * Math.abs(o2 - a2) / 255 * s2;
      e3[t3] += o2 !== i2 ? (o2 - i2) * h2 : 0, e3[t3 + 1] += o2 !== r2 ? (o2 - r2) * h2 : 0, e3[t3 + 2] += o2 !== n2 ? (o2 - n2) * h2 : 0;
    }
  }
  sendUniformData(t2, e3) {
    t2.uniform1f(e3.uVibrance, -this.vibrance);
  }
  isNeutralState() {
    return this.vibrance === 0;
  }
}
t(Ch, "type", "Vibrance"), t(Ch, "defaults", { vibrance: 0 }), t(Ch, "uniformLocations", ["uVibrance"]), tt.setClass(Ch);
var bh = Object.freeze({ __proto__: null, BaseFilter: Wa, BlackWhite: rh, BlendColor: za, BlendImage: Na, Blur: Ua, Brightness: qa, Brownie: Za, ColorMatrix: Ja, Composed: nh, Contrast: oh, Convolute: hh, Gamma: lh, Grayscale: dh, HueRotation: fh, Invert: ph, Kodachrome: th, Noise: mh, Pixelate: vh, Polaroid: sh, RemoveColor: yh, Resize: _h, Saturation: xh, Sepia: ih, Technicolor: eh, Vibrance: Ch, Vintage: $a });

// src/renderer/app.ts
var isElectronEnvironment = Boolean(window.process?.versions?.electron);
var browserWindow = window;
var appNameElement = document.querySelector("#app-name");
var workspaceMenuToggle = document.querySelector("#workspace-menu-toggle");
var workspaceDropdown = workspaceMenuToggle.closest("[data-footer-dropdown]");
var workspaceCreatePanelButton = document.querySelector("#workspace-create-panel");
var workspaceList = document.querySelector("#workspace-list");
var activeWorkspaceLabel = document.querySelector("#active-workspace-label");
var openSettingsFromPanelButton = document.querySelector("#open-settings-from-panel");
var pageMenuToggle = document.querySelector("#page-menu-toggle");
var pageDropdown = pageMenuToggle.closest("[data-footer-dropdown]");
var pageList = document.querySelector("#page-list");
var pageCreateButton = document.querySelector("#page-create");
var pageIndicator = document.querySelector("#page-indicator");
var pageNavBack = document.querySelector("#page-nav-back");
var pageNavForward = document.querySelector("#page-nav-forward");
var zoomMenuToggle = document.querySelector("#zoom-menu-toggle");
var zoomDropdown = zoomMenuToggle.closest("[data-footer-dropdown]");
var zoomMenu = document.querySelector("#zoom-menu");
var zoomIndicator = document.querySelector("#zoom-indicator");
var settingsWorkspaceList = document.querySelector("#settings-workspace-list");
var settingsWorkspaceCreateButton = document.querySelector("#settings-workspace-create");
var settingsPageList = document.querySelector("#settings-page-list");
var settingsPageCreateButton = document.querySelector("#settings-page-create");
var captureButton = document.querySelector("#capture-screenshot");
var captureFeedback = document.querySelector("#capture-feedback");
var openSettingsButton = document.querySelector("#open-settings");
var settingsModal = document.querySelector("#settings-modal");
var settingsClose = document.querySelector("#settings-close");
var openReferenceButton = document.querySelector("#open-reference");
var referenceModal = document.querySelector("#reference-modal");
var referenceClose = document.querySelector("#reference-close");
var assetViewerModal = document.querySelector("#asset-viewer-modal");
var assetViewerModalClose = document.querySelector("#asset-viewer-modal-close");
var assetViewerModalBody = document.querySelector("#asset-viewer-modal-body");
var tabButtons = Array.from(document.querySelectorAll(".tab-btn"));
var panels = Array.from(document.querySelectorAll(".settings-panel"));
var settingsCloseX = document.querySelector("#settings-close-x");
var contextMenu = document.querySelector("#canvas-context-menu");
var contextMenuPasteButton = contextMenu.querySelector('button[data-action="paste"]');
var contextMenuNavigateButton = contextMenu.querySelector('button[data-action="navigate"]');
var contextMenuMoveButton = contextMenu.querySelector('button[data-action="move"]');
var contextMenuBringFrontButton = contextMenu.querySelector('button[data-action="front"]');
var contextMenuSendBackButton = contextMenu.querySelector('button[data-action="back"]');
var contextMenuDeleteButton = contextMenu.querySelector('button[data-action="delete"]');
var contextSubmenu = document.querySelector("#canvas-context-submenu");
var contextMenuSelectionItems = Array.from(contextMenu.querySelectorAll('[data-visibility="selection"]'));
var contextMenuEmptyItems = Array.from(contextMenu.querySelectorAll('[data-visibility="empty"]'));
var contextSubmenuTitle = document.querySelector("#context-menu-submenu-title");
var contextSubmenuList = document.querySelector("#context-menu-page-list");
var contextSubmenuEmpty = document.querySelector("#context-menu-submenu-empty");
var dropProgress = document.querySelector("#drop-progress");
var dropProgressTitle = document.querySelector("#drop-progress-title");
var dropProgressSubtitle = document.querySelector("#drop-progress-subtitle");
var workspaceCreateModal = document.querySelector("#workspace-create-modal");
var workspaceCreateForm = document.querySelector("#workspace-create-form");
var workspaceCreateInput = document.querySelector("#workspace-create-input");
var workspaceCreateSubmit = document.querySelector("#workspace-create-submit");
var workspaceCreateCancel = document.querySelector("#workspace-create-cancel");
var workspaceCreateError = document.querySelector("#workspace-create-error");
var pageCreateModal = document.querySelector("#page-create-modal");
var pageCreateForm = document.querySelector("#page-create-form");
var pageCreateInput = document.querySelector("#page-create-input");
var pageCreateSubmit = document.querySelector("#page-create-submit");
var pageCreateCancel = document.querySelector("#page-create-cancel");
var pageCreateError = document.querySelector("#page-create-error");
var displaySelectModal = document.querySelector("#display-select-modal");
var displaySelectForm = document.querySelector("#display-select-form");
var displaySelectList = document.querySelector("#display-select-list");
var displaySelectCancel = document.querySelector("#display-select-cancel");
var renameModal = document.querySelector("#rename-modal");
var renameForm = document.querySelector("#rename-form");
var renameTitle = document.querySelector("#rename-title");
var renameInput = document.querySelector("#rename-input");
var renameSubmit = document.querySelector("#rename-submit");
var renameCancel = document.querySelector("#rename-cancel");
var renameError = document.querySelector("#rename-error");
var confirmModal = document.querySelector("#confirm-modal");
var confirmForm = document.querySelector("#confirm-form");
var confirmTitle = document.querySelector("#confirm-title");
var confirmMessage = document.querySelector("#confirm-message");
var confirmSubmit = document.querySelector("#confirm-submit");
var confirmCancel = document.querySelector("#confirm-cancel");
var canvasElement = document.querySelector("#artboard");
var fabricCanvas = new In(canvasElement, {
  backgroundColor: "#1f1f1f",
  selection: true,
  preserveObjectStacking: true
});
var originalToObject = na.prototype.toObject;
na.prototype.toObject = function toObjectWithMeta(propertiesToInclude) {
  const base = propertiesToInclude ? [...propertiesToInclude] : [];
  if (!base.includes("artboardMeta")) {
    base.push("artboardMeta");
  }
  const serialized = originalToObject.call(this, base);
  const meta = this.get("artboardMeta");
  if (meta) {
    serialized.artboardMeta = meta;
    const encodedPath = meta.relativePath.split("/").map((segment) => encodeURIComponent(segment)).join("/");
    serialized.src = `artboard://${encodeURIComponent(meta.workspace)}/${encodedPath}`;
    if (meta.absolutePath) {
      serialized.artboardMeta.absolutePath = meta.absolutePath;
    }
  } else {
    delete serialized.src;
  }
  return serialized;
};
var originalFromObject = na.fromObject.bind(na);
na.fromObject = function fromObjectWithMeta(object, options) {
  const meta = object.artboardMeta;
  const applyMeta = (img) => {
    if (img && meta) {
      img.set("artboardMeta", meta);
    }
    return img;
  };
  if (meta?.workspace && meta?.relativePath) {
    return window.workspaceAPI.readAsset(meta.workspace, meta.relativePath).then((dataUrl) => {
      console.debug("Hydrating asset", {
        workspace: meta.workspace,
        relativePath: meta.relativePath,
        preview: dataUrl.slice(0, 64),
        absolutePath: meta.absolutePath
      });
      const extendedObject = {
        ...object,
        src: dataUrl
      };
      return originalFromObject(extendedObject, options);
    }).then(applyMeta).catch((error) => {
      console.error("Failed to hydrate image asset", meta, error);
      return null;
    });
  }
  const result = originalFromObject(object, options);
  if (result && typeof result.then === "function") {
    return result.then(applyMeta);
  }
  return Promise.resolve(applyMeta(result));
};
var activeWorkspace = null;
var pendingSave = null;
var suppressSaves = false;
var currentWorkspaces = [];
var contextMenuVisible = false;
var contextSubmenuVisible = false;
var contextSubmenuMode = null;
var contextSubmenuActivator = null;
var captureFeedbackTimer = null;
var workspaceCreateInFlight = false;
var activeDropdown = null;
var dropProgressHideTimer = null;
var currentZoom = 1;
var spaceKeyPressed = false;
var isPanning = false;
var panStart = null;
var pendingAssetRefreshes = new Map;
var BROWSER_PLACEHOLDER_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=";
function slugifyWorkspaceName(name, existing) {
  const base = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const fallback = base || "workspace";
  let candidate = fallback;
  let counter = 2;
  while (existing.has(candidate)) {
    candidate = `${fallback}-${counter++}`;
  }
  return candidate;
}
function createInitialWorkspaceState(name) {
  const pageId = "page-1";
  const baseState = {
    version: "browser-preview",
    objects: [],
    background: "#1f1f1f"
  };
  return {
    ...baseState,
    pages: [
      {
        id: pageId,
        name: `${name} Page`,
        state: { ...baseState }
      }
    ],
    activePageId: pageId,
    nextPageNumber: 2
  };
}
function createBrowserWorkspaceAPI() {
  const workspaces = new Map;
  const ensureDefault = () => {
    if (workspaces.size === 0) {
      const slug = "default";
      workspaces.set(slug, {
        slug,
        name: "Default Workspace",
        state: createInitialWorkspaceState("Default Workspace")
      });
    }
  };
  return {
    async list() {
      ensureDefault();
      return Array.from(workspaces.keys());
    },
    async create(name) {
      const existing = new Set(workspaces.keys());
      const slug = slugifyWorkspaceName(name, existing);
      workspaces.set(slug, {
        slug,
        name,
        state: createInitialWorkspaceState(name)
      });
      return slug;
    },
    async load(workspace) {
      ensureDefault();
      return workspaces.get(workspace)?.state ?? null;
    },
    async save(workspace, state) {
      const document2 = { ...state };
      const entry = workspaces.get(workspace);
      if (entry) {
        entry.state = document2;
        return;
      }
      workspaces.set(workspace, {
        slug: workspace,
        name: workspace,
        state: document2
      });
    },
    async rename(current, nextName) {
      const entry = workspaces.get(current);
      if (!entry) {
        throw new Error(`Workspace "${current}" not found`);
      }
      const existing = new Set(workspaces.keys());
      existing.delete(current);
      const slug = slugifyWorkspaceName(nextName, existing);
      workspaces.delete(current);
      entry.slug = slug;
      entry.name = nextName;
      workspaces.set(slug, entry);
      return slug;
    },
    async remove(workspace) {
      return workspaces.delete(workspace);
    },
    async ingest() {
      console.info("workspaceAPI.ingest is unavailable in browser preview");
      return { assets: [], failures: [] };
    },
    async capture() {
      console.info("workspaceAPI.capture is unavailable in browser preview");
      return null;
    },
    async readAsset() {
      return BROWSER_PLACEHOLDER_IMAGE;
    },
    async getAssetDetail(workspace, relativePath) {
      console.info("workspaceAPI.getAssetDetail is unavailable in browser preview");
      return {
        workspace,
        filename: relativePath.split("/").pop() || "image",
        relativePath,
        fileUrl: BROWSER_PLACEHOLDER_IMAGE,
        path: relativePath,
        absolutePath: relativePath,
        sizeBytes: 0,
        format: "png"
      };
    },
    async openAssetViewer() {
      console.info("workspaceAPI.openAssetViewer is unavailable in browser preview");
    }
  };
}
if (!isElectronEnvironment) {
  if (!browserWindow.workspaceAPI) {
    browserWindow.workspaceAPI = createBrowserWorkspaceAPI();
  }
  if (!browserWindow.electronAPI) {
    browserWindow.electronAPI = {
      on: () => () => {
        return;
      },
      openExternal: () => false,
      inspectClipboard: async () => ({
        canPaste: false,
        hasImage: false,
        hasFile: false,
        hasUrl: false
      }),
      readClipboardAssets: async () => ({ files: [], urls: [], inlineFiles: [] })
    };
  }
}
var pages = [{ id: "page-1", name: "Page 1" }];
var pageStates = {};
var nextPageNumber = 2;
var activePageId = pages[0].id;
var PREFERENCES_KEY = "artboard:preferences";
var preferences = {
  activeWorkspace: null,
  activePageId,
  pages: pages.map((page) => ({ ...page })),
  nextPageNumber,
  zoom: currentZoom
};
loadPreferences();
function resizeCanvas() {
  const content = document.querySelector(".content");
  if (!content)
    return;
  const rect = content.getBoundingClientRect();
  const vpt = fabricCanvas.viewportTransform?.slice();
  console.log("resizeCanvas - BEFORE resize, vpt:", vpt);
  fabricCanvas.setWidth(rect.width);
  fabricCanvas.setHeight(rect.height);
  console.log("resizeCanvas - AFTER setWidth/Height, vpt is now:", fabricCanvas.viewportTransform);
  if (vpt) {
    fabricCanvas.setViewportTransform(vpt);
    console.log("resizeCanvas - RESTORED vpt to:", vpt);
  }
  fabricCanvas.renderAll();
  console.log("resizeCanvas - AFTER renderAll, final vpt:", fabricCanvas.viewportTransform);
}
function scheduleSave() {
  console.log("scheduleSave called", {
    activeWorkspace,
    suppressSaves
  });
  if (!activeWorkspace || suppressSaves)
    return;
  if (pendingSave) {
    window.clearTimeout(pendingSave);
  }
  console.log("scheduleSave queued", {
    activeWorkspace,
    suppressSaves
  });
  pendingSave = window.setTimeout(async () => {
    try {
      const state = persistActivePageState({ force: true }) ?? captureCanvasState();
      const serialized = serializeWorkspace(state);
      console.log("Saving workspace state", {
        workspace: activeWorkspace,
        objectCount: Array.isArray(state.objects) ? state.objects.length : 0,
        pageCount: pages.length,
        activePageId
      });
      await window.workspaceAPI.save(activeWorkspace, serialized);
    } catch (error) {
      console.error("Failed to save workspace state", error);
    } finally {
      pendingSave = null;
    }
  }, 500);
}
async function flushPendingSave() {
  if (!activeWorkspace) {
    if (pendingSave) {
      window.clearTimeout(pendingSave);
      pendingSave = null;
    }
    return;
  }
  if (!pendingSave) {
    return;
  }
  window.clearTimeout(pendingSave);
  pendingSave = null;
  try {
    const state = persistActivePageState({ force: true }) ?? captureCanvasState();
    const serialized = serializeWorkspace(state);
    console.log("Flushing workspace state", {
      workspace: activeWorkspace,
      objectCount: Array.isArray(state.objects) ? state.objects.length : 0,
      pageCount: pages.length,
      activePageId
    });
    await window.workspaceAPI.save(activeWorkspace, serialized);
  } catch (error) {
    console.error("Failed to flush workspace state", error);
  }
}
function updateActiveWorkspaceLabel() {
  if (activeWorkspace) {
    activeWorkspaceLabel.textContent = activeWorkspace;
  } else {
    activeWorkspaceLabel.textContent = "Workspace";
  }
}
function highlightActiveWorkspace() {
  const lists = [workspaceList, settingsWorkspaceList];
  lists.forEach((list) => {
    Array.from(list.children).forEach((node) => {
      const item = node;
      const isActive = item.dataset.workspace === activeWorkspace;
      item.classList.toggle("active", isActive);
      const badge = item.querySelector(".workspace-list__badge");
      const meta = item.querySelector(".workspace-list__meta");
      if (isActive) {
        if (!badge) {
          const newBadge = document.createElement("span");
          newBadge.className = "workspace-list__badge";
          newBadge.textContent = "Active";
          meta?.appendChild(newBadge);
        }
      } else if (badge) {
        badge.remove();
      }
    });
  });
  updateActiveWorkspaceLabel();
}
function normalizePages(value) {
  if (!Array.isArray(value)) {
    return [];
  }
  const seen = new Set;
  return value.map((entry) => {
    if (!entry || typeof entry !== "object") {
      return null;
    }
    const candidate = entry;
    const rawId = typeof candidate.id === "string" ? candidate.id.trim() : typeof candidate.id === "number" ? String(candidate.id) : "";
    if (!rawId || seen.has(rawId)) {
      return null;
    }
    seen.add(rawId);
    const rawName = typeof candidate.name === "string" ? candidate.name.trim() : "";
    return {
      id: rawId,
      name: rawName || rawId
    };
  }).filter((item) => Boolean(item));
}
function ensurePageDefaults() {
  if (pages.length === 0) {
    pages = [{ id: "page-1", name: "Page 1" }];
    nextPageNumber = Math.max(nextPageNumber, 2);
  }
  if (!pages.some((page) => page.id === activePageId)) {
    activePageId = pages[0]?.id ?? null;
  }
  if (!activePageId && pages.length > 0) {
    activePageId = pages[0].id;
  }
}
function loadPreferences() {
  let storedPreferences = null;
  try {
    const stored = localStorage.getItem(PREFERENCES_KEY);
    if (stored) {
      storedPreferences = JSON.parse(stored);
    }
  } catch (error) {
    console.warn("Failed to load preferences", error);
  }
  if (storedPreferences) {
    if (typeof storedPreferences.activeWorkspace === "string") {
      const trimmed = storedPreferences.activeWorkspace.trim();
      preferences.activeWorkspace = trimmed ? trimmed : null;
    } else if (storedPreferences.activeWorkspace === null) {
      preferences.activeWorkspace = null;
    }
    const parsedPages = normalizePages(storedPreferences.pages);
    if (parsedPages.length > 0) {
      pages = parsedPages;
    }
    if (storedPreferences.zoom && typeof storedPreferences.zoom === "number" && Number.isFinite(storedPreferences.zoom)) {
      const sanitized = Math.min(Math.max(storedPreferences.zoom, 0.1), 4);
      preferences.zoom = sanitized;
      currentZoom = sanitized;
    }
  }
  const storedNextPageNumber = storedPreferences && typeof storedPreferences.nextPageNumber === "number" && Number.isFinite(storedPreferences.nextPageNumber) ? Math.max(Math.floor(storedPreferences.nextPageNumber), 2) : null;
  let candidateActivePageId = storedPreferences && typeof storedPreferences.activePageId === "string" ? storedPreferences.activePageId : null;
  const derivedNext = pages.reduce((max, page) => {
    const match = /(\d+)$/.exec(page.id);
    if (!match) {
      return max;
    }
    const value = Number(match[1]);
    if (!Number.isFinite(value)) {
      return max;
    }
    return Math.max(max, value + 1);
  }, Math.max(pages.length + 1, 2));
  nextPageNumber = Math.max(derivedNext, storedNextPageNumber ?? 2, pages.length + 1, 2);
  if (candidateActivePageId && !pages.some((page) => page.id === candidateActivePageId)) {
    candidateActivePageId = null;
  }
  activePageId = candidateActivePageId ?? pages[0]?.id ?? null;
  ensurePageDefaults();
  syncPreferencesWithPages();
}
function syncPreferencesWithPages() {
  preferences.activeWorkspace = activeWorkspace;
  preferences.activePageId = activePageId;
  preferences.pages = pages.map((page) => ({ ...page }));
  preferences.nextPageNumber = Math.max(nextPageNumber, pages.length + 1, 2);
  preferences.zoom = currentZoom;
}
function savePreferences() {
  syncPreferencesWithPages();
  try {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.warn("Failed to save preferences", error);
  }
}
function isMouseLikeEvent(event) {
  return "button" in event && typeof event.button === "number";
}
function isMiddleButtonEvent(event) {
  if ("buttons" in event && typeof event.buttons === "number" && (event.buttons & 4) === 4) {
    return true;
  }
  if (isMouseLikeEvent(event)) {
    return event.button === 1 || event.button === 2 || event.button === 4;
  }
  if ("which" in event && typeof event.which === "number") {
    return event.which === 2;
  }
  return false;
}
function getPointerPosition(event) {
  if ("clientX" in event && "clientY" in event) {
    return { x: event.clientX, y: event.clientY };
  }
  if ("touches" in event && event.touches.length > 0) {
    const touch = event.touches[0];
    return { x: touch.clientX, y: touch.clientY };
  }
  if ("changedTouches" in event && event.changedTouches.length > 0) {
    const touch = event.changedTouches[0];
    return { x: touch.clientX, y: touch.clientY };
  }
  return null;
}
function preventPointerDefault(event) {
  if (typeof event.preventDefault === "function") {
    event.preventDefault();
  }
}
function getActiveCanvasObjects() {
  return fabricCanvas.getActiveObjects();
}
function reapplySelection(objects) {
  if (objects.length === 0) {
    fabricCanvas.discardActiveObject();
    return;
  }
  if (objects.length === 1) {
    fabricCanvas.setActiveObject(objects[0]);
    return;
  }
  const selection = new Jo(objects, { canvas: fabricCanvas });
  fabricCanvas.setActiveObject(selection);
}
function buildAssetCacheKey(workspace, relativePath) {
  return `${workspace}::${relativePath}`;
}
function clearCachedAssetState(workspace, relativePath) {
  Object.values(pageStates).forEach((state) => {
    if (!state || typeof state !== "object") {
      return;
    }
    const objects = Array.isArray(state.objects) ? state.objects : [];
    objects.forEach((object) => {
      if (!object || typeof object !== "object") {
        return;
      }
      const meta = object.artboardMeta;
      if (meta?.workspace === workspace && meta.relativePath === relativePath) {
        if ("src" in object) {
          delete object.src;
        }
      }
    });
  });
}
async function refreshCanvasAsset(relativePath) {
  if (!activeWorkspace) {
    return 0;
  }
  const candidates = fabricCanvas.getObjects().filter((object) => {
    if (object.type !== "image") {
      return false;
    }
    const meta = extractAssetMeta(object);
    return meta?.workspace === activeWorkspace && meta.relativePath === relativePath;
  });
  if (candidates.length === 0) {
    return 0;
  }
  const activeSelection = fabricCanvas.getActiveObjects();
  const dataUrl = await window.workspaceAPI.readAsset(activeWorkspace, relativePath);
  const crossOrigin = dataUrl.startsWith("data:") ? undefined : "anonymous";
  await Promise.all(candidates.map(async (image) => {
    const scaleX = image.scaleX ?? 1;
    const scaleY = image.scaleY ?? 1;
    await image.setSrc(dataUrl, crossOrigin ? { crossOrigin } : undefined);
    image.scaleX = scaleX;
    image.scaleY = scaleY;
    image.dirty = true;
    image.setCoords();
  }));
  if (activeSelection.length > 0) {
    fabricCanvas.discardActiveObject();
    reapplySelection(activeSelection);
  }
  fabricCanvas.renderAll();
  return candidates.length;
}
function handleWorkspaceAssetUpdated(event) {
  if (!event || typeof event !== "object") {
    return;
  }
  const payload = event;
  if (!payload.workspace || !payload.relativePath) {
    return;
  }
  if (payload.workspace !== activeWorkspace) {
    return;
  }
  const key = buildAssetCacheKey(payload.workspace, payload.relativePath);
  const existing = pendingAssetRefreshes.get(key);
  if (existing) {
    existing.finally(() => {
      handleWorkspaceAssetUpdated(payload);
    });
    return;
  }
  const task = (async () => {
    try {
      clearCachedAssetState(payload.workspace, payload.relativePath);
      const updatedCount = await refreshCanvasAsset(payload.relativePath);
      if (updatedCount > 0) {
        persistActivePageState({ force: true });
        scheduleSave();
        setCaptureFeedback("Canvas updated with latest asset", "info", 2000);
      }
    } catch (error) {
      console.error("Failed to refresh asset instances", payload, error);
    } finally {
      pendingAssetRefreshes.delete(key);
    }
  })();
  pendingAssetRefreshes.set(key, task);
}
function hideContextSubmenu() {
  if (!contextSubmenuVisible)
    return;
  contextSubmenu.style.visibility = "hidden";
  contextSubmenu.hidden = true;
  contextSubmenuVisible = false;
  if (contextSubmenuActivator) {
    contextSubmenuActivator.setAttribute("aria-expanded", "false");
    contextSubmenuActivator = null;
  }
  contextSubmenuMode = null;
  contextSubmenuList.replaceChildren();
  contextSubmenuList.hidden = false;
  contextSubmenuEmpty.hidden = true;
  contextSubmenu.style.left = "-9999px";
  contextSubmenu.style.top = "-9999px";
}
function renderPageSubmenuOptions(mode) {
  const candidates = pages.filter((page) => page.id !== activePageId);
  const items = candidates.map((page) => {
    const item = document.createElement("li");
    item.dataset.pageId = page.id;
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.pageId = page.id;
    button.dataset.mode = mode;
    button.setAttribute("role", "menuitem");
    button.textContent = page.name;
    item.appendChild(button);
    return item;
  });
  contextSubmenuList.replaceChildren(...items);
  const hasOptions = items.length > 0;
  contextSubmenuList.hidden = !hasOptions;
  contextSubmenuEmpty.hidden = hasOptions;
  return { hasOptions };
}
function positionContextSubmenu() {
  const rect = contextMenu.getBoundingClientRect();
  const margin = 8;
  contextSubmenu.style.visibility = "hidden";
  contextSubmenu.hidden = false;
  contextSubmenu.style.left = `${rect.right + margin}px`;
  contextSubmenu.style.top = `${rect.top}px`;
  const submenuRect = contextSubmenu.getBoundingClientRect();
  let left = rect.right + margin;
  let top = rect.top;
  if (left + submenuRect.width > window.innerWidth - margin) {
    left = rect.left - submenuRect.width - margin;
  }
  if (left < margin) {
    left = margin;
  }
  if (top + submenuRect.height > window.innerHeight - margin) {
    top = window.innerHeight - submenuRect.height - margin;
  }
  if (top < margin) {
    top = margin;
  }
  contextSubmenu.style.left = `${left}px`;
  contextSubmenu.style.top = `${top}px`;
  contextSubmenu.style.visibility = "";
}
function showMoveToPageSubmenu() {
  if (!contextMenuVisible)
    return;
  const selection = getActiveCanvasObjects();
  if (selection.length === 0) {
    hideContextSubmenu();
    return;
  }
  contextSubmenuMode = "move";
  contextSubmenuActivator = contextMenuMoveButton;
  contextMenuMoveButton.setAttribute("aria-expanded", "true");
  contextSubmenuTitle.textContent = "Move to Page";
  const { hasOptions } = renderPageSubmenuOptions("move");
  positionContextSubmenu();
  contextSubmenuVisible = true;
  if (!hasOptions) {
    contextSubmenu.focus({ preventScroll: true });
    return;
  }
  const firstButton = contextSubmenuList.querySelector("button");
  firstButton?.focus({ preventScroll: true });
}
function showNavigateToPageSubmenu() {
  if (!contextMenuVisible)
    return;
  if (pages.length <= 1) {
    hideContextSubmenu();
    return;
  }
  contextSubmenuMode = "navigate";
  contextSubmenuActivator = contextMenuNavigateButton;
  contextMenuNavigateButton.setAttribute("aria-expanded", "true");
  contextSubmenuTitle.textContent = "Go to Page";
  const { hasOptions } = renderPageSubmenuOptions("navigate");
  positionContextSubmenu();
  contextSubmenuVisible = true;
  if (!hasOptions) {
    contextSubmenu.focus({ preventScroll: true });
    return;
  }
  const firstButton = contextSubmenuList.querySelector("button");
  firstButton?.focus({ preventScroll: true });
}
function hideContextMenu() {
  if (!contextMenuVisible)
    return;
  hideContextSubmenu();
  contextMenu.style.visibility = "hidden";
  contextMenu.hidden = true;
  contextMenuVisible = false;
  contextMenuMoveButton.setAttribute("aria-expanded", "false");
  contextMenuNavigateButton.setAttribute("aria-expanded", "false");
}
function showContextMenu(x2, y2, options) {
  const hasSelection = options.selectionCount > 0;
  updateContextMenuVisibility(hasSelection, options.canPaste);
  if (hasSelection) {
    updateContextMenuMoveAvailability();
  } else {
    updateContextMenuNavigateAvailability();
  }
  contextMenu.hidden = false;
  contextMenu.style.visibility = "hidden";
  contextMenu.style.left = `${x2}px`;
  contextMenu.style.top = `${y2}px`;
  const rect = contextMenu.getBoundingClientRect();
  const margin = 8;
  let adjustedX = x2;
  let adjustedY = y2;
  if (rect.right > window.innerWidth - margin) {
    adjustedX = window.innerWidth - rect.width - margin;
  }
  if (rect.bottom > window.innerHeight - margin) {
    adjustedY = window.innerHeight - rect.height - margin;
  }
  if (adjustedX < margin) {
    adjustedX = margin;
  }
  if (adjustedY < margin) {
    adjustedY = margin;
  }
  contextMenu.style.left = `${adjustedX}px`;
  contextMenu.style.top = `${adjustedY}px`;
  contextMenu.style.visibility = "";
  contextMenuVisible = true;
  contextMenuMoveButton.setAttribute("aria-expanded", "false");
  contextMenuNavigateButton.setAttribute("aria-expanded", "false");
  hideContextSubmenu();
  requestAnimationFrame(() => {
    contextMenu.focus({ preventScroll: true });
  });
}
function setMenuItemVisibility(element, visible) {
  if (!(element instanceof HTMLElement)) {
    return;
  }
  element.hidden = !visible;
  element.setAttribute("aria-hidden", String(!visible));
  element.style.display = visible ? "" : "none";
}
function applyMenuButtonState(button, enabled) {
  button.disabled = !enabled;
  button.setAttribute("aria-disabled", String(!enabled));
}
function updateContextMenuVisibility(hasSelection, canPaste) {
  contextMenuSelectionItems.forEach((item) => {
    const show = hasSelection;
    setMenuItemVisibility(item, show);
    if (item instanceof HTMLButtonElement) {
      applyMenuButtonState(item, show);
      if (item === contextMenuBringFrontButton) {
        item.title = show ? "Bring selection to front" : "Select an object to adjust layering";
      } else if (item === contextMenuSendBackButton) {
        item.title = show ? "Send selection to back" : "Select an object to adjust layering";
      } else if (item === contextMenuDeleteButton) {
        item.title = show ? "Delete selection" : "Select an object to delete";
      }
    }
  });
  contextMenuEmptyItems.forEach((item) => {
    const show = !hasSelection;
    setMenuItemVisibility(item, show);
    if (item instanceof HTMLButtonElement) {
      if (item === contextMenuPasteButton) {
        applyMenuButtonState(item, canPaste);
        contextMenuPasteButton.title = canPaste ? "Paste image from clipboard" : "Clipboard does not contain an image";
      } else {
        applyMenuButtonState(item, show);
      }
    }
  });
}
async function handleContextMenuPaste() {
  if (!activeWorkspace) {
    setCaptureFeedback("Select a workspace before pasting.", "error", 2200);
    return;
  }
  if (!window.electronAPI?.readClipboardAssets) {
    document.execCommand("paste");
    return;
  }
  try {
    const clipboardPayload = await window.electronAPI.readClipboardAssets();
    const files = clipboardPayload?.files ?? [];
    const urls = clipboardPayload?.urls ?? [];
    const inlineFiles = (clipboardPayload?.inlineFiles ?? []).map((entry) => ({
      ...entry,
      data: entry.data instanceof Uint8Array ? entry.data : entry.data ? Uint8Array.from(entry.data) : new Uint8Array
    })).filter((entry) => entry.data.length > 0);
    const total = files.length + urls.length + inlineFiles.length;
    if (total === 0) {
      showDropProgress("Nothing to paste", "Clipboard did not contain an image.");
      hideDropProgress(1600);
      return;
    }
    showDropProgress(total > 1 ? "Importing assets…" : DROP_PROGRESS_DEFAULT_TITLE, total > 1 ? `Processing ${total} items…` : PASTE_PROGRESS_SUBTITLE);
    await ingestAndHandleAssets(activeWorkspace, { files, urls, inlineFiles }, {
      sourceLabel: "paste",
      failureTitle: "Paste failed",
      failureSubtitle: "We could not add this clipboard content. Check the logs for details.",
      emptyMessage: "Clipboard did not contain new assets."
    });
  } catch (error) {
    console.error("Failed to read clipboard contents", error);
    showDropProgress("Paste failed", "Unable to read clipboard contents.");
    hideDropProgress(2400);
  }
}
function captureCanvasState() {
  const state = fabricCanvas.toJSON(["artboardMeta"]);
  state.viewportTransform = fabricCanvas.viewportTransform?.slice();
  console.log("Capturing canvas state with viewportTransform:", state.viewportTransform, "zoom:", fabricCanvas.getZoom());
  return state;
}
function cloneCanvasState(state) {
  return JSON.parse(JSON.stringify(state));
}
function createBlankCanvasState() {
  const base = captureCanvasState();
  base.objects = [];
  return base;
}
function moveSelectionToPage(targetPageId) {
  if (!activePageId || activePageId === targetPageId) {
    return;
  }
  const selection = getActiveCanvasObjects();
  if (selection.length === 0) {
    return;
  }
  const serialized = selection.map((object) => object.toObject(["artboardMeta"]));
  selection.forEach((object) => {
    fabricCanvas.remove(object);
  });
  fabricCanvas.discardActiveObject();
  fabricCanvas.requestRenderAll();
  persistActivePageState({ force: true });
  const existingTargetState = pageStates[targetPageId];
  const baseState = existingTargetState ? cloneCanvasState(existingTargetState) : createBlankCanvasState();
  const targetObjects = Array.isArray(baseState.objects) ? baseState.objects.slice() : [];
  baseState.objects = targetObjects.concat(serialized);
  baseState.updatedAt = new Date().toISOString();
  pageStates[targetPageId] = baseState;
  const pageName = pages.find((page) => page.id === targetPageId)?.name ?? "page";
  setCaptureFeedback(`Moved selection to ${pageName}`, "success", 3000);
  scheduleSave();
  hideContextMenu();
}
function persistActivePageState(options) {
  if (!activePageId) {
    return null;
  }
  if (suppressSaves && !options?.force) {
    return pageStates[activePageId] ?? null;
  }
  const state = captureCanvasState();
  pageStates[activePageId] = state;
  return state;
}
async function filterPageStateForMissingAssets(state) {
  if (!state || !Array.isArray(state.objects)) {
    return state;
  }
  const filteredObjects = [];
  for (const obj of state.objects) {
    if (obj && typeof obj === "object" && "src" in obj && typeof obj.src === "string") {
      const src = obj.src;
      if (src.startsWith("artboard://")) {
        try {
          const url = new URL(src);
          const workspace = decodeURIComponent(url.hostname);
          const segments = url.pathname.split("/").filter(Boolean).map((segment) => decodeURIComponent(segment));
          const relativePath = segments.join("/");
          const exists = await window.workspaceAPI.assetExists(workspace, relativePath);
          if (exists) {
            filteredObjects.push(obj);
          } else {
            console.warn("Filtering out object with missing asset:", src);
          }
        } catch (error) {
          console.warn("Error checking asset existence for:", src, error);
        }
      } else {
        filteredObjects.push(obj);
      }
    } else {
      filteredObjects.push(obj);
    }
  }
  return {
    ...state,
    objects: filteredObjects
  };
}
async function loadPageState(pageId) {
  if (!pageId) {
    fabricCanvas.clear();
    fabricCanvas.discardActiveObject();
    fabricCanvas.renderAll();
    return;
  }
  suppressSaves = true;
  try {
    let stored = pageStates[pageId];
    console.log("Loading page state for", pageId, "viewportTransform in stored:", stored?.viewportTransform);
    if (stored && Array.isArray(stored.objects)) {
      stored = await filterPageStateForMissingAssets(stored);
      await fabricCanvas.loadFromJSON(stored);
    } else {
      fabricCanvas.clear();
    }
    fabricCanvas.discardActiveObject();
    fabricCanvas.renderAll();
    if (stored?.viewportTransform && Array.isArray(stored.viewportTransform)) {
      console.log("Restoring viewportTransform:", stored.viewportTransform);
      fabricCanvas.setViewportTransform(stored.viewportTransform);
      fabricCanvas.requestRenderAll();
    }
  } catch (error) {
    console.error("Failed to load page state", pageId, error);
    fabricCanvas.clear();
    fabricCanvas.discardActiveObject();
    fabricCanvas.renderAll();
  } finally {
    suppressSaves = false;
  }
}
function extractCanvasState(document2) {
  if (!document2 || typeof document2 !== "object") {
    return null;
  }
  const { pages: _pages, activePageId: _active, nextPageNumber: _next, ...rest } = document2;
  const candidate = rest;
  if (candidate && Array.isArray(candidate.objects)) {
    return candidate;
  }
  return null;
}
function parseWorkspaceDocument(document2) {
  const pageStatesMap = {};
  const pageItems = [];
  const storedPages = Array.isArray(document2?.pages) ? document2.pages : [];
  let sourcePages = storedPages;
  if (sourcePages.length === 0) {
    const fallbackState = extractCanvasState(document2);
    if (fallbackState) {
      sourcePages = [{ id: "page-1", name: "Page 1", state: fallbackState }];
    } else {
      sourcePages = [{ id: "page-1", name: "Page 1", state: null }];
    }
  }
  sourcePages.forEach((entry, index) => {
    const id = entry && typeof entry.id === "string" && entry.id.trim() ? entry.id.trim() : `page-${index + 1}`;
    const name = entry && typeof entry.name === "string" && entry.name.trim() ? entry.name.trim() : `Page ${index + 1}`;
    if (entry?.state && typeof entry.state === "object" && Array.isArray(entry.state.objects)) {
      pageStatesMap[id] = entry.state;
    }
    pageItems.push({ id, name });
  });
  const derivedNext = pageItems.reduce((max, page) => {
    const match = /(\d+)$/.exec(page.id);
    if (!match) {
      return max;
    }
    const value = Number(match[1]);
    if (!Number.isFinite(value)) {
      return max;
    }
    return Math.max(max, value + 1);
  }, Math.max(pageItems.length + 1, 2));
  const nextNumber = Math.max(document2?.nextPageNumber ?? 2, derivedNext);
  let activeId = document2?.activePageId ?? null;
  if (!activeId || !pageItems.some((page) => page.id === activeId)) {
    activeId = pageItems[0]?.id ?? null;
  }
  return {
    pages: pageItems,
    pageStates: pageStatesMap,
    activePageId: activeId,
    nextPageNumber: nextNumber
  };
}
function buildStoredPages() {
  return pages.map((page) => ({
    id: page.id,
    name: page.name,
    state: pageStates[page.id] ?? null
  }));
}
function serializeWorkspace(state) {
  return {
    ...state,
    pages: buildStoredPages(),
    activePageId,
    nextPageNumber
  };
}
function deleteSelectedObjects() {
  const objects = getActiveCanvasObjects();
  if (objects.length === 0) {
    return;
  }
  objects.forEach((object) => {
    fabricCanvas.remove(object);
  });
  fabricCanvas.discardActiveObject();
  fabricCanvas.requestRenderAll();
  scheduleSave();
  hideContextMenu();
}
function adjustSelectionStack(direction) {
  const objects = getActiveCanvasObjects();
  if (objects.length === 0) {
    return;
  }
  const uniqueObjects = Array.from(new Set(objects));
  const allObjects = fabricCanvas.getObjects();
  const byAscendingIndex = uniqueObjects.slice().sort((a2, b2) => allObjects.indexOf(a2) - allObjects.indexOf(b2));
  const byDescendingIndex = [...byAscendingIndex].reverse();
  if (direction === "front") {
    byAscendingIndex.forEach((object) => {
      fabricCanvas.bringObjectToFront(object);
    });
  } else if (direction === "back") {
    byDescendingIndex.forEach((object) => {
      fabricCanvas.sendObjectToBack(object);
    });
  } else {
    const sequence = direction === "forward" ? byDescendingIndex : byAscendingIndex;
    sequence.forEach((object) => {
      if (direction === "forward") {
        fabricCanvas.bringObjectForward(object);
      } else {
        fabricCanvas.sendObjectBackwards(object);
      }
    });
  }
  fabricCanvas.discardActiveObject();
  reapplySelection(uniqueObjects);
  fabricCanvas.requestRenderAll();
  scheduleSave();
  hideContextMenu();
}
function isEditableTarget(target) {
  if (!target || !(target instanceof HTMLElement)) {
    return false;
  }
  const editableTags = ["input", "textarea", "select"];
  if (editableTags.includes(target.tagName.toLowerCase())) {
    return true;
  }
  if (target.isContentEditable) {
    return true;
  }
  return false;
}
async function handleCanvasContextMenu(event) {
  const target = fabricCanvas.findTarget(event, false);
  if (target) {
    const active = getActiveCanvasObjects();
    if (!active.includes(target)) {
      fabricCanvas.setActiveObject(target);
    }
  } else {
    fabricCanvas.discardActiveObject();
    fabricCanvas.requestRenderAll();
  }
  event.preventDefault();
  const selectionCount = getActiveCanvasObjects().length;
  let canPaste = false;
  if (window.electronAPI?.inspectClipboard) {
    try {
      const inspection = await window.electronAPI.inspectClipboard();
      canPaste = Boolean(inspection?.canPaste || inspection?.hasImage || inspection?.hasFile || inspection?.hasUrl);
    } catch (error) {
      console.warn("Clipboard inspect failed", error);
    }
  }
  hideContextMenu();
  showContextMenu(event.clientX, event.clientY, { selectionCount, canPaste });
}
function extractAssetMeta(object) {
  if (!object || typeof object.get !== "function") {
    return null;
  }
  const meta = object.get("artboardMeta");
  if (!meta?.workspace || !meta.relativePath) {
    return null;
  }
  return meta;
}
var assetViewerOpening = false;
function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "—";
  }
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(value >= 100 ? 0 : value >= 10 ? 1 : 2)} ${units[unit]}`;
}
function initializeAssetViewerInModal(asset) {
  const viewerRoot = assetViewerModalBody.querySelector(".viewer");
  const imageElement = assetViewerModalBody.querySelector("#asset-image");
  const nameElement = assetViewerModalBody.querySelector("#asset-name");
  const pathElement = assetViewerModalBody.querySelector("#asset-path");
  const formatElement = assetViewerModalBody.querySelector("#meta-format");
  const dimensionElement = assetViewerModalBody.querySelector("#meta-dimensions");
  const sizeElement = assetViewerModalBody.querySelector("#meta-size");
  const workspaceElement = assetViewerModalBody.querySelector("#meta-workspace");
  const relativeElement = assetViewerModalBody.querySelector("#meta-relative");
  const updatedElement = assetViewerModalBody.querySelector("#meta-updated");
  const feedbackElement = assetViewerModalBody.querySelector("#action-feedback");
  const saveAsModal = assetViewerModalBody.querySelector("#save-as-modal");
  const resizeModal = assetViewerModalBody.querySelector("#resize-modal");
  const cropPanel = assetViewerModalBody.querySelector("#crop-panel");
  const convertForm = assetViewerModalBody.querySelector("#convert-form");
  const convertFormat = assetViewerModalBody.querySelector("#convert-format");
  const resizeForm = assetViewerModalBody.querySelector("#resize-form");
  const resizeWidth = assetViewerModalBody.querySelector("#resize-width");
  const resizeHeight = assetViewerModalBody.querySelector("#resize-height");
  const resizeLock = assetViewerModalBody.querySelector("#resize-lock-aspect");
  const cropForm = assetViewerModalBody.querySelector("#crop-form");
  const cropX = assetViewerModalBody.querySelector("#crop-x");
  const cropY = assetViewerModalBody.querySelector("#crop-y");
  const cropWidth = assetViewerModalBody.querySelector("#crop-width");
  const cropHeight = assetViewerModalBody.querySelector("#crop-height");
  const cropApplyButton = assetViewerModalBody.querySelector("#crop-apply");
  const cropOverlay = assetViewerModalBody.querySelector("#crop-overlay");
  const cropSelectionElement = assetViewerModalBody.querySelector("#crop-selection");
  const cropSelectionLabel = assetViewerModalBody.querySelector("#crop-selection-label");
  let cropModeActive = false;
  let activeSelection = null;
  let cropDragState = null;
  let cropPointerId = null;
  let imageRect = null;
  let overlayRect = null;
  const MIN_CROP_SIZE = 2;
  const assetData = asset;
  viewerRoot.dataset.loading = "false";
  nameElement.textContent = assetData.filename;
  pathElement.textContent = assetData.absolutePath;
  formatElement.textContent = assetData.format?.toUpperCase() || "—";
  sizeElement.textContent = formatBytes(assetData.sizeBytes || 0);
  workspaceElement.textContent = assetData.workspace;
  relativeElement.textContent = assetData.relativePath;
  updatedElement.textContent = assetData.updatedAt ? new Date(assetData.updatedAt).toLocaleString() : "—";
  const cacheToken = Date.now();
  imageElement.src = `${assetData.fileUrl}?v=${cacheToken}`;
  const copyButton = assetViewerModalBody.querySelector("#action-copy");
  const saveAsButton = assetViewerModalBody.querySelector("#action-save-as");
  const resizeButton = assetViewerModalBody.querySelector("#action-resize");
  const cropButton = assetViewerModalBody.querySelector("#action-crop");
  const setFeedback = (message, tone = "info") => {
    feedbackElement.dataset.tone = tone;
    feedbackElement.textContent = message;
    setTimeout(() => {
      feedbackElement.textContent = "";
    }, 3000);
  };
  copyButton.addEventListener("click", async () => {
    try {
      if (!imageElement.complete || !imageElement.naturalWidth) {
        setFeedback("Image not loaded", "error");
        return;
      }
      const canvas = document.createElement("canvas");
      canvas.width = imageElement.naturalWidth;
      canvas.height = imageElement.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setFeedback("Canvas not supported", "error");
        return;
      }
      ctx.drawImage(imageElement, 0, 0);
      canvas.toBlob(async (blob) => {
        if (!blob) {
          setFeedback("Failed to create image data", "error");
          return;
        }
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              [blob.type]: blob
            })
          ]);
          setFeedback("Copied to clipboard", "success");
        } catch (clipboardError) {
          console.error("Clipboard write failed", clipboardError);
          setFeedback("Copy failed - clipboard permission denied", "error");
        }
      }, "image/png");
    } catch (error) {
      console.error("Failed to copy asset", error);
      setFeedback("Copy failed", "error");
    }
  }, { once: false });
  saveAsButton.addEventListener("click", () => {
    if (!saveAsModal.open) {
      saveAsModal.showModal();
    }
    feedbackElement.textContent = "";
  }, { once: false });
  resizeButton.addEventListener("click", () => {
    if (imageElement.naturalWidth && imageElement.naturalHeight) {
      resizeWidth.value = String(imageElement.naturalWidth);
      resizeHeight.value = String(imageElement.naturalHeight);
    }
    if (!resizeModal.open) {
      resizeModal.showModal();
    }
    feedbackElement.textContent = "";
  }, { once: false });
  const refreshCropMetrics = () => {
    imageRect = imageElement.getBoundingClientRect();
    overlayRect = cropOverlay.getBoundingClientRect();
    return Boolean(imageRect && overlayRect && imageRect.width > 0 && imageRect.height > 0 && overlayRect.width > 0 && overlayRect.height > 0);
  };
  const naturalFromPointer = (event, allowOutside = false) => {
    if (!imageRect || imageRect.width === 0 || imageRect.height === 0) {
      return null;
    }
    if (!imageElement.naturalWidth || !imageElement.naturalHeight) {
      return null;
    }
    if (!allowOutside && (event.clientX < imageRect.left || event.clientX > imageRect.right || event.clientY < imageRect.top || event.clientY > imageRect.bottom)) {
      return null;
    }
    const displayX = Math.max(0, Math.min(event.clientX - imageRect.left, imageRect.width));
    const displayY = Math.max(0, Math.min(event.clientY - imageRect.top, imageRect.height));
    const naturalX = displayX / imageRect.width * imageElement.naturalWidth;
    const naturalY = displayY / imageRect.height * imageElement.naturalHeight;
    return {
      x: Math.max(0, Math.min(naturalX, imageElement.naturalWidth)),
      y: Math.max(0, Math.min(naturalY, imageElement.naturalHeight))
    };
  };
  const selectionToDisplay = (selection) => {
    if (!imageRect || !overlayRect || !imageElement.naturalWidth || !imageElement.naturalHeight) {
      return null;
    }
    const scaleX = imageRect.width / imageElement.naturalWidth;
    const scaleY = imageRect.height / imageElement.naturalHeight;
    const offsetX = imageRect.left - overlayRect.left;
    const offsetY = imageRect.top - overlayRect.top;
    return {
      left: offsetX + selection.x * scaleX,
      top: offsetY + selection.y * scaleY,
      width: Math.max(selection.width * scaleX, 1),
      height: Math.max(selection.height * scaleY, 1)
    };
  };
  const renderSelection = (selection) => {
    activeSelection = selection;
    if (!cropModeActive) {
      cropSelectionElement.hidden = true;
      cropOverlay.dataset.hasSelection = "false";
      return;
    }
    if (!selection) {
      cropSelectionElement.hidden = true;
      cropOverlay.dataset.hasSelection = "false";
      if (cropX && cropY && cropWidth && cropHeight) {
        cropX.value = "0";
        cropY.value = "0";
        cropWidth.value = imageElement.naturalWidth ? String(Math.round(imageElement.naturalWidth)) : "0";
        cropHeight.value = imageElement.naturalHeight ? String(Math.round(imageElement.naturalHeight)) : "0";
      }
      return;
    }
    if (!refreshCropMetrics()) {
      cropSelectionElement.hidden = true;
      cropOverlay.dataset.hasSelection = "false";
      return;
    }
    const display = selectionToDisplay(selection);
    if (!display) {
      cropSelectionElement.hidden = true;
      cropOverlay.dataset.hasSelection = "false";
      return;
    }
    cropSelectionElement.hidden = false;
    cropOverlay.dataset.hasSelection = "true";
    cropSelectionElement.style.transform = `translate(${display.left}px, ${display.top}px)`;
    cropSelectionElement.style.width = `${display.width}px`;
    cropSelectionElement.style.height = `${display.height}px`;
    cropSelectionLabel.textContent = `${Math.round(selection.width)} × ${Math.round(selection.height)} px`;
    if (cropX && cropY && cropWidth && cropHeight) {
      cropX.value = String(Math.round(selection.x));
      cropY.value = String(Math.round(selection.y));
      cropWidth.value = String(Math.round(selection.width));
      cropHeight.value = String(Math.round(selection.height));
    }
  };
  const selectionFromPoints = (a2, b2) => {
    const left = Math.min(a2.x, b2.x);
    const top = Math.min(a2.y, b2.y);
    const right = Math.max(a2.x, b2.x);
    const bottom = Math.max(a2.y, b2.y);
    const width = Math.max(right - left, MIN_CROP_SIZE);
    const height = Math.max(bottom - top, MIN_CROP_SIZE);
    return { x: left, y: top, width, height };
  };
  const enterCropMode = () => {
    if (!imageElement.naturalWidth || !imageElement.naturalHeight) {
      setFeedback("Image not ready for cropping", "error");
      return;
    }
    cropModeActive = true;
    cropButton.textContent = "End Crop";
    cropButton.classList.add("is-active");
    cropButton.dataset.tone = "alert";
    closeModal(saveAsModal);
    closeModal(resizeModal);
    cropOverlay.hidden = false;
    cropOverlay.dataset.active = "true";
    cropOverlay.setAttribute("aria-hidden", "false");
    cropSelectionElement.hidden = !activeSelection;
    cropPanel.classList.remove("hidden");
    setFeedback("Drag on the image to select the crop area", "info");
    requestAnimationFrame(() => {
      refreshCropMetrics();
      renderSelection(activeSelection);
    });
  };
  const exitCropMode = (options) => {
    if (options?.resetSelection) {
      activeSelection = null;
    }
    if (cropPointerId !== null && cropOverlay.hasPointerCapture(cropPointerId)) {
      cropOverlay.releasePointerCapture(cropPointerId);
    }
    cropPointerId = null;
    cropDragState = null;
    cropOverlay.classList.remove("is-dragging");
    cropModeActive = false;
    cropButton.textContent = "Crop Selection…";
    cropButton.classList.remove("is-active");
    cropButton.removeAttribute("data-tone");
    cropOverlay.dataset.active = "false";
    cropOverlay.dataset.hasSelection = "false";
    cropOverlay.hidden = true;
    cropOverlay.setAttribute("aria-hidden", "true");
    cropSelectionElement.hidden = true;
    cropPanel.classList.add("hidden");
    renderSelection(activeSelection);
  };
  const closeModal = (dialog) => {
    if (dialog.open) {
      dialog.close();
    }
  };
  cropButton.addEventListener("click", () => {
    if (cropModeActive) {
      applyCrop();
    } else {
      enterCropMode();
    }
  }, { once: false });
  cropOverlay.addEventListener("pointerdown", (event) => {
    if (!cropModeActive)
      return;
    if (!refreshCropMetrics())
      return;
    const pointer = naturalFromPointer(event);
    if (!pointer)
      return;
    event.preventDefault();
    cropPointerId = event.pointerId;
    cropOverlay.setPointerCapture(event.pointerId);
    cropOverlay.classList.add("is-dragging");
    cropDragState = {
      mode: "create",
      origin: pointer,
      pointerId: event.pointerId
    };
    renderSelection({ x: pointer.x, y: pointer.y, width: MIN_CROP_SIZE, height: MIN_CROP_SIZE });
  });
  cropOverlay.addEventListener("pointermove", (event) => {
    if (!cropModeActive || !cropDragState)
      return;
    const pointer = naturalFromPointer(event, true);
    if (!pointer)
      return;
    if (cropDragState.mode === "create") {
      renderSelection(selectionFromPoints(cropDragState.origin, pointer));
    }
  });
  cropOverlay.addEventListener("pointerup", (event) => {
    if (!cropModeActive)
      return;
    const pointer = naturalFromPointer(event, true);
    if (cropDragState && cropDragState.mode === "create" && pointer) {
      renderSelection(selectionFromPoints(cropDragState.origin, pointer));
    }
    if (cropPointerId !== null && cropOverlay.hasPointerCapture(cropPointerId)) {
      cropOverlay.releasePointerCapture(cropPointerId);
    }
    cropPointerId = null;
    cropOverlay.classList.remove("is-dragging");
    cropDragState = null;
  });
  cropOverlay.addEventListener("pointercancel", () => {
    if (cropPointerId !== null && cropOverlay.hasPointerCapture(cropPointerId)) {
      cropOverlay.releasePointerCapture(cropPointerId);
    }
    cropPointerId = null;
    cropOverlay.classList.remove("is-dragging");
    cropDragState = null;
  });
  const applyCrop = async () => {
    try {
      const x2 = Number(cropX.value);
      const y2 = Number(cropY.value);
      const width = Number(cropWidth.value);
      const height = Number(cropHeight.value);
      if (!width || !height || width < 1 || height < 1) {
        setFeedback("Invalid crop dimensions", "error");
        return;
      }
      if (!imageElement.complete || !imageElement.naturalWidth) {
        setFeedback("Image not loaded", "error");
        return;
      }
      if (x2 < 0 || y2 < 0 || x2 + width > imageElement.naturalWidth || y2 + height > imageElement.naturalHeight) {
        setFeedback("Crop area out of bounds", "error");
        return;
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setFeedback("Canvas not supported", "error");
        return;
      }
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(imageElement, x2, y2, width, height, 0, 0, width, height);
      const originalFormat = assetData.format?.toLowerCase() || "png";
      const mimeType = originalFormat === "jpg" || originalFormat === "jpeg" ? "image/jpeg" : originalFormat === "webp" ? "image/webp" : "image/png";
      const quality = mimeType === "image/png" ? undefined : 0.92;
      canvas.toBlob(async (blob) => {
        if (!blob) {
          setFeedback("Crop failed", "error");
          return;
        }
        try {
          const buffer = new Uint8Array(await blob.arrayBuffer());
          await window.workspaceAPI.updateAsset(assetData.workspace, assetData.relativePath, buffer);
          setFeedback("Image cropped successfully", "success");
          exitCropMode({ resetSelection: true });
          const cacheToken2 = Date.now();
          imageElement.src = `${assetData.fileUrl}?v=${cacheToken2}`;
        } catch (error) {
          console.error("Failed to update asset", error);
          setFeedback("Failed to save cropped image", "error");
        }
      }, mimeType, quality);
    } catch (error) {
      console.error("Crop failed", error);
      setFeedback("Crop failed", "error");
    }
  };
  cropApplyButton.addEventListener("click", () => {
    applyCrop();
  });
  cropForm.addEventListener("submit", (event) => {
    event.preventDefault();
    applyCrop();
  });
  assetViewerModalBody.querySelectorAll('[data-close-panel="crop"]').forEach((button) => {
    button.addEventListener("click", () => {
      cropPanel.classList.add("hidden");
      setFeedback("", "info");
    });
  });
  imageElement.addEventListener("load", () => {
    dimensionElement.textContent = imageElement.naturalWidth && imageElement.naturalHeight ? `${imageElement.naturalWidth} × ${imageElement.naturalHeight}` : "—";
  });
  convertForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const format = convertFormat.value;
    try {
      if (!imageElement.complete || !imageElement.naturalWidth) {
        setFeedback("Image not loaded", "error");
        return;
      }
      const canvas = document.createElement("canvas");
      canvas.width = imageElement.naturalWidth;
      canvas.height = imageElement.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setFeedback("Canvas not supported", "error");
        return;
      }
      ctx.drawImage(imageElement, 0, 0);
      const mimeType = format === "png" ? "image/png" : format === "jpeg" ? "image/jpeg" : "image/webp";
      const quality = format === "png" ? undefined : 0.92;
      canvas.toBlob((blob) => {
        if (!blob) {
          setFeedback("Conversion failed", "error");
          return;
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        const ext = format === "jpeg" ? "jpg" : format;
        const baseName = assetData.filename.replace(/\.[^/.]+$/, "");
        link.download = `${baseName}.${ext}`;
        link.click();
        URL.revokeObjectURL(url);
        setFeedback(`Saved as ${format.toUpperCase()}`, "success");
        saveAsModal.close();
      }, mimeType, quality);
    } catch (error) {
      console.error("Format conversion failed", error);
      setFeedback("Conversion failed", "error");
    }
  });
  resizeForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const width = Number(resizeWidth.value);
      const height = Number(resizeHeight.value);
      if (!width || !height || width < 1 || height < 1) {
        setFeedback("Invalid dimensions", "error");
        return;
      }
      if (!imageElement.complete || !imageElement.naturalWidth) {
        setFeedback("Image not loaded", "error");
        return;
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setFeedback("Canvas not supported", "error");
        return;
      }
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(imageElement, 0, 0, width, height);
      const originalFormat = assetData.format?.toLowerCase() || "png";
      const mimeType = originalFormat === "jpg" || originalFormat === "jpeg" ? "image/jpeg" : originalFormat === "webp" ? "image/webp" : "image/png";
      const quality = mimeType === "image/png" ? undefined : 0.92;
      canvas.toBlob(async (blob) => {
        if (!blob) {
          setFeedback("Resize failed", "error");
          return;
        }
        try {
          const buffer = new Uint8Array(await blob.arrayBuffer());
          await window.workspaceAPI.updateAsset(assetData.workspace, assetData.relativePath, buffer);
          setFeedback(`Resized to ${width}×${height}`, "success");
          resizeModal.close();
          const cacheToken2 = Date.now();
          imageElement.src = `${assetData.fileUrl}?v=${cacheToken2}`;
        } catch (error) {
          console.error("Failed to update asset", error);
          setFeedback("Failed to save resized image", "error");
        }
      }, mimeType, quality);
    } catch (error) {
      console.error("Resize failed", error);
      setFeedback("Resize failed", "error");
    }
  });
  resizeLock.addEventListener("change", () => {
    if (resizeLock.checked && imageElement.naturalWidth && imageElement.naturalHeight) {
      const width = Number(resizeWidth.value || imageElement.naturalWidth);
      const aspect = imageElement.naturalHeight / imageElement.naturalWidth;
      resizeHeight.value = String(Math.round(width * aspect));
    }
  });
  resizeWidth.addEventListener("input", () => {
    if (resizeLock.checked && imageElement.naturalWidth && imageElement.naturalHeight) {
      const width = Number(resizeWidth.value || imageElement.naturalWidth);
      const aspect = imageElement.naturalHeight / imageElement.naturalWidth;
      resizeHeight.value = String(Math.max(1, Math.round(width * aspect)));
    }
  });
  assetViewerModalBody.querySelectorAll("[data-close-modal]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.closeModal;
      if (target === "save-as") {
        saveAsModal.close();
      } else if (target === "resize") {
        resizeModal.close();
      }
      feedbackElement.textContent = "";
    });
  });
  saveAsModal.addEventListener("cancel", () => {
    feedbackElement.textContent = "";
  });
  resizeModal.addEventListener("cancel", () => {
    feedbackElement.textContent = "";
  });
}
function openAssetViewerModal(asset) {
  if (assetViewerModal.open) {
    console.warn("Asset viewer modal is already open");
    return;
  }
  assetViewerModalBody.innerHTML = "";
  const viewerElement = document.createElement("div");
  viewerElement.className = "viewer";
  viewerElement.innerHTML = `
    <main class="viewer__preview">
      <div class="viewer__image-frame">
        <img id="asset-image" alt="" />
        <div
          id="crop-overlay"
          class="crop-overlay"
          aria-hidden="true"
          hidden
        >
          <div
            id="crop-selection"
            class="crop-overlay__selection"
            hidden
          >
            <span
              id="crop-selection-label"
              class="crop-overlay__label"
            >
            </span>
            <div class="crop-overlay__handle crop-overlay__handle--nw" data-handle="nw"></div>
            <div class="crop-overlay__handle crop-overlay__handle--n" data-handle="n"></div>
            <div class="crop-overlay__handle crop-overlay__handle--ne" data-handle="ne"></div>
            <div class="crop-overlay__handle crop-overlay__handle--e" data-handle="e"></div>
            <div class="crop-overlay__handle crop-overlay__handle--se" data-handle="se"></div>
            <div class="crop-overlay__handle crop-overlay__handle--s" data-handle="s"></div>
            <div class="crop-overlay__handle crop-overlay__handle--sw" data-handle="sw"></div>
            <div class="crop-overlay__handle crop-overlay__handle--w" data-handle="w"></div>
          </div>
        </div>
      </div>
    </main>
    <aside class="viewer__details">
      <header class="viewer__header">
        <h1 id="asset-name">Asset</h1>
        <p id="asset-path" class="viewer__subheading"></p>
      </header>
      <section class="viewer__meta">
        <h2>Details</h2>
        <dl>
          <div>
            <dt>Format</dt>
            <dd id="meta-format">—</dd>
          </div>
          <div>
            <dt>Dimensions</dt>
            <dd id="meta-dimensions">—</dd>
          </div>
          <div>
            <dt>File Size</dt>
            <dd id="meta-size">—</dd>
          </div>
          <div>
            <dt>Workspace</dt>
            <dd id="meta-workspace">—</dd>
          </div>
          <div>
            <dt>Relative Path</dt>
            <dd id="meta-relative">—</dd>
          </div>
          <div>
            <dt>Updated</dt>
            <dd id="meta-updated">—</dd>
          </div>
        </dl>
      </section>
      <section class="viewer__actions">
        <button id="action-copy" type="button">Copy to Clipboard</button>
        <button id="action-save-as" type="button">Save As…</button>
        <button id="action-resize" type="button">Resize…</button>
        <button id="action-crop" type="button">Crop Selection…</button>
        <output id="action-feedback" role="status" aria-live="polite"></output>
      </section>
      <section id="crop-panel" class="viewer__panel hidden">
        <h3>Crop</h3>
        <p class="crop-panel__intro">
          Drag on the image to select the area to keep. Adjust using the handles, then apply the crop.
        </p>
        <div class="crop-panel__actions">
          <button id="crop-apply" type="button">Apply Crop</button>
          <button type="button" class="secondary" data-close-panel="crop">
            Cancel
          </button>
        </div>
        <details class="crop-panel__details">
          <summary>Precise input</summary>
          <form id="crop-form">
            <div class="fields">
              <label>
                X
                <input id="crop-x" type="number" min="0" value="0" required />
              </label>
              <label>
                Y
                <input id="crop-y" type="number" min="0" value="0" required />
              </label>
            </div>
            <div class="fields">
              <label>
                Width
                <input id="crop-width" type="number" min="1" required />
              </label>
              <label>
                Height
                <input id="crop-height" type="number" min="1" required />
              </label>
            </div>
            <button type="submit">Apply Precise Crop</button>
          </form>
        </details>
      </section>
    </aside>
    <dialog id="save-as-modal" class="viewer-modal">
      <form id="convert-form" class="viewer-modal__form viewer__panel" method="dialog">
        <h3>Save As</h3>
        <label>
          Target Format
          <select id="convert-format">
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
            <option value="webp">WebP</option>
          </select>
        </label>
        <div class="viewer-modal__actions">
          <button type="button" class="secondary" data-close-modal="save-as">
            Cancel
          </button>
          <button type="submit">Save</button>
        </div>
      </form>
    </dialog>
    <dialog id="resize-modal" class="viewer-modal">
      <form id="resize-form" class="viewer-modal__form viewer__panel" method="dialog">
        <h3>Resize</h3>
        <div class="fields">
          <label>
            Width (px)
            <input id="resize-width" type="number" min="1" required />
          </label>
          <label>
            Height (px)
            <input id="resize-height" type="number" min="1" required />
          </label>
        </div>
        <label class="checkbox">
          <input id="resize-lock-aspect" type="checkbox" checked />
          <span>Lock aspect ratio</span>
        </label>
        <div class="viewer-modal__actions">
          <button type="button" class="secondary" data-close-modal="resize">
            Cancel
          </button>
          <button type="submit">Resize &amp; Save</button>
        </div>
      </form>
    </dialog>
  `;
  assetViewerModalBody.appendChild(viewerElement);
  setTimeout(() => {
    initializeAssetViewerInModal(asset);
  }, 0);
  assetViewerModal.showModal();
}
function handleImageDoubleClick(event) {
  const meta = extractAssetMeta(event.target);
  if (!meta || assetViewerOpening) {
    return;
  }
  assetViewerOpening = true;
  window.workspaceAPI.getAssetDetail(meta.workspace, meta.relativePath).then((asset) => {
    openAssetViewerModal(asset);
  }).catch((error) => {
    console.error("Failed to get asset details", error);
  }).finally(() => {
    setTimeout(() => {
      assetViewerOpening = false;
    }, 500);
  });
}
function handleWorkspaceCreate() {
  openWorkspaceCreateModal();
}
function resetWorkspaceCreateModal() {
  workspaceCreateForm.reset();
  workspaceCreateError.textContent = "";
  workspaceCreateInput.disabled = false;
  workspaceCreateSubmit.disabled = false;
  workspaceCreateCancel.disabled = false;
}
function openWorkspaceCreateModal() {
  resetWorkspaceCreateModal();
  if (!workspaceCreateModal.open) {
    workspaceCreateModal.showModal();
  }
  requestAnimationFrame(() => {
    workspaceCreateInput.focus();
  });
}
function closeWorkspaceCreateModal() {
  if (workspaceCreateModal.open) {
    workspaceCreateModal.close();
  }
}
async function createWorkspaceWithName(name) {
  const trimmed = name.trim();
  if (!trimmed) {
    throw new Error("Workspace name is required");
  }
  const slug = await window.workspaceAPI.create(trimmed);
  await populateWorkspaces(slug);
  closeActiveDropdown();
}
async function populateWorkspaces(preferred) {
  let workspaces = await window.workspaceAPI.list();
  if (workspaces.length === 0) {
    const created = await window.workspaceAPI.create("default");
    workspaces = [created];
  }
  const fallbackCandidates = [
    preferred,
    preferences.activeWorkspace,
    activeWorkspace,
    workspaces[0]
  ].filter((value) => Boolean(value && workspaces.includes(value)));
  renderWorkspaceList(workspaces);
  const target = fallbackCandidates[0] ?? workspaces[0];
  if (target) {
    await loadWorkspace(target);
  } else {
    highlightActiveWorkspace();
  }
}
async function loadWorkspace(workspace) {
  await flushPendingSave();
  activeWorkspace = workspace;
  suppressSaves = true;
  const rawState = await window.workspaceAPI.load(workspace);
  const parsed = parseWorkspaceDocument(rawState);
  const filteredPageStates = {};
  for (const [pageId, state] of Object.entries(parsed.pageStates)) {
    filteredPageStates[pageId] = await filterPageStateForMissingAssets(state);
  }
  pages = parsed.pages;
  pageStates = filteredPageStates;
  nextPageNumber = parsed.nextPageNumber;
  activePageId = null;
  renderPages();
  updateActiveWorkspaceLabel();
  highlightActiveWorkspace();
  suppressSaves = false;
  const targetPageId = parsed.activePageId ?? pages[0]?.id ?? null;
  if (targetPageId) {
    await setActivePage(targetPageId, { persist: false, schedule: false });
  } else {
    fabricCanvas.clear();
    fabricCanvas.discardActiveObject();
    fabricCanvas.renderAll();
  }
  syncPreferencesWithPages();
  savePreferences();
}
function handleTabChange(targetTab) {
  tabButtons.forEach((button) => {
    const isActive = button.dataset.tab === targetTab;
    button.classList.toggle("tab-btn--active", isActive);
    button.setAttribute("aria-selected", isActive ? "true" : "false");
  });
  panels.forEach((panel) => {
    const isActive = panel.dataset.panel === targetTab;
    panel.classList.toggle("settings-panel--active", isActive);
  });
}
function renderWorkspaceList(workspaces) {
  currentWorkspaces = [...workspaces];
  workspaceList.replaceChildren(...workspaces.map((workspace) => {
    const item = document.createElement("li");
    item.dataset.workspace = workspace;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "menu-item";
    button.textContent = workspace;
    item.appendChild(button);
    if (workspace === activeWorkspace) {
      item.classList.add("active");
    }
    return item;
  }));
  renderSettingsWorkspaceList(workspaces);
  highlightActiveWorkspace();
}
function renderSettingsWorkspaceList(workspaces) {
  const disableDelete = workspaces.length <= 1;
  settingsWorkspaceList.replaceChildren(...workspaces.map((workspace) => {
    const item = document.createElement("div");
    item.className = "settings-list-item";
    item.dataset.workspace = workspace;
    const isActive = workspace === activeWorkspace;
    if (isActive) {
      item.classList.add("settings-list-item--active");
    }
    const info = document.createElement("div");
    info.className = "list-item-info";
    const icon = document.createElement("span");
    icon.className = "item-icon";
    icon.textContent = "✨";
    const details = document.createElement("div");
    details.className = "item-details";
    const name = document.createElement("span");
    name.className = "item-name";
    name.textContent = workspace;
    details.appendChild(name);
    info.append(icon, details);
    const actions = document.createElement("div");
    actions.className = "list-item-actions";
    const renameButton = document.createElement("button");
    renameButton.type = "button";
    renameButton.className = "icon-btn icon-btn--small";
    renameButton.dataset.action = "rename";
    renameButton.title = "Rename";
    renameButton.textContent = "✏️";
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "icon-btn icon-btn--small icon-btn--danger";
    deleteButton.dataset.action = "delete";
    deleteButton.title = "Delete";
    deleteButton.textContent = "\uD83D\uDDD1️";
    if (disableDelete) {
      deleteButton.disabled = true;
      deleteButton.title = "Keep at least one workspace";
    }
    actions.append(renameButton, deleteButton);
    item.append(info, actions);
    return item;
  }));
}
function updatePageIndicator() {
  const activePage = pages.find((page) => page.id === activePageId);
  pageIndicator.textContent = activePage ? activePage.name : "Pages";
  updatePageNavButtons();
}
function updatePageNavButtons() {
  const pageIndex = pages.findIndex((page) => page.id === activePageId);
  const hasPrev = pageIndex > 0;
  const hasNext = pageIndex >= 0 && pageIndex < pages.length - 1;
  pageNavBack.disabled = !hasPrev;
  pageNavForward.disabled = !hasNext;
}
var DROP_PROGRESS_DEFAULT_TITLE = "Importing asset…";
var DROP_PROGRESS_DEFAULT_SUBTITLE = "Hang tight while we place it on the canvas.";
var PASTE_PROGRESS_SUBTITLE = "Processing clipboard contents…";
function showDropProgress(title = DROP_PROGRESS_DEFAULT_TITLE, subtitle = DROP_PROGRESS_DEFAULT_SUBTITLE) {
  if (dropProgressHideTimer) {
    window.clearTimeout(dropProgressHideTimer);
    dropProgressHideTimer = null;
  }
  dropProgressTitle.textContent = title;
  dropProgressSubtitle.textContent = subtitle;
  dropProgress.classList.remove("is-hidden");
  dropProgress.setAttribute("aria-hidden", "false");
}
function updateDropProgress(subtitle) {
  dropProgressSubtitle.textContent = subtitle;
}
function hideDropProgress(delay = 0, reset = true) {
  const performHide = () => {
    dropProgress.classList.add("is-hidden");
    dropProgress.setAttribute("aria-hidden", "true");
    if (reset) {
      dropProgressTitle.textContent = DROP_PROGRESS_DEFAULT_TITLE;
      dropProgressSubtitle.textContent = DROP_PROGRESS_DEFAULT_SUBTITLE;
    }
    dropProgressHideTimer = null;
  };
  if (dropProgressHideTimer) {
    window.clearTimeout(dropProgressHideTimer);
    dropProgressHideTimer = null;
  }
  if (delay > 0) {
    dropProgressHideTimer = window.setTimeout(performHide, delay);
  } else {
    performHide();
  }
}
function clampZoom(value) {
  return Math.min(Math.max(value, 0.1), 4);
}
function formatZoom(value) {
  return `${Math.round(value * 100)}%`;
}
function updateZoomIndicator() {
  zoomIndicator.textContent = formatZoom(currentZoom);
}
function setCanvasZoom(value, options) {
  const next = clampZoom(value);
  currentZoom = next;
  if (options?.point) {
    const focusPoint = options.point instanceof ot ? options.point : new ot(options.point.x, options.point.y);
    fabricCanvas.zoomToPoint(focusPoint, next);
  } else {
    const vpt = fabricCanvas.viewportTransform?.slice();
    fabricCanvas.setZoom(next);
    if (options?.resetPan && vpt) {
      const transform = fabricCanvas.viewportTransform;
      if (transform) {
        transform[4] = 0;
        transform[5] = 0;
      }
    } else if (vpt) {
      const transform = fabricCanvas.viewportTransform;
      if (transform) {
        transform[0] = next;
        transform[3] = next;
        transform[4] = vpt[4];
        transform[5] = vpt[5];
      }
    }
  }
  fabricCanvas.renderAll();
  updateZoomIndicator();
  if (options?.persist ?? true) {
    savePreferences();
  }
  if (options?.announce) {
    setCaptureFeedback(`Zoom ${formatZoom(next)}`, "info", 1500);
  }
}
function resetZoom(options) {
  setCanvasZoom(1, { ...options, resetPan: true });
}
function fitToScreen(options) {
  const objects = fabricCanvas.getObjects();
  if (objects.length === 0) {
    resetZoom(options);
    return;
  }
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  objects.forEach((obj) => {
    const bounds = obj.getBoundingRect();
    minX = Math.min(minX, bounds.left);
    minY = Math.min(minY, bounds.top);
    maxX = Math.max(maxX, bounds.left + bounds.width);
    maxY = Math.max(maxY, bounds.top + bounds.height);
  });
  const objectsWidth = maxX - minX;
  const objectsHeight = maxY - minY;
  const objectsCenterX = minX + objectsWidth / 2;
  const objectsCenterY = minY + objectsHeight / 2;
  const canvasWidth = fabricCanvas.getWidth();
  const canvasHeight = fabricCanvas.getHeight();
  const padding = 0.1;
  const availableWidth = canvasWidth * (1 - padding * 2);
  const availableHeight = canvasHeight * (1 - padding * 2);
  const zoomX = availableWidth / objectsWidth;
  const zoomY = availableHeight / objectsHeight;
  const zoom = Math.min(zoomX, zoomY);
  const clampedZoom = clampZoom(zoom);
  const viewportCenterX = canvasWidth / 2;
  const viewportCenterY = canvasHeight / 2;
  const panX = viewportCenterX - objectsCenterX * clampedZoom;
  const panY = viewportCenterY - objectsCenterY * clampedZoom;
  currentZoom = clampedZoom;
  fabricCanvas.setZoom(clampedZoom);
  const transform = fabricCanvas.viewportTransform;
  if (transform) {
    transform[4] = panX;
    transform[5] = panY;
  }
  fabricCanvas.renderAll();
  updateZoomIndicator();
  if (options?.persist ?? true) {
    savePreferences();
  }
  if (options?.announce) {
    setCaptureFeedback(`Fit to screen (${formatZoom(clampedZoom)})`, "info", 1500);
  }
}
function closeActiveDropdown() {
  if (!activeDropdown)
    return;
  const trigger = activeDropdown.querySelector(".footer-trigger");
  trigger?.setAttribute("aria-expanded", "false");
  activeDropdown.classList.remove("is-open");
  activeDropdown = null;
}
function openDropdown(container) {
  if (activeDropdown === container) {
    closeActiveDropdown();
    return;
  }
  closeActiveDropdown();
  const trigger = container.querySelector(".footer-trigger");
  trigger?.setAttribute("aria-expanded", "true");
  container.classList.add("is-open");
  activeDropdown = container;
}
function setCaptureFeedback(message, tone = "info", timeoutMs) {
  if (captureFeedbackTimer) {
    window.clearTimeout(captureFeedbackTimer);
    captureFeedbackTimer = null;
  }
  const baseClass = "footer-status";
  if (!message) {
    captureFeedback.textContent = "";
    captureFeedback.className = `${baseClass} is-hidden`;
    return;
  }
  const toneClass = `${baseClass}--${tone}`;
  captureFeedback.textContent = message;
  captureFeedback.className = `${baseClass} ${toneClass}`;
  if (typeof timeoutMs === "number" && timeoutMs > 0) {
    captureFeedbackTimer = window.setTimeout(() => {
      setCaptureFeedback(null);
    }, timeoutMs);
  }
}
function updateContextMenuMoveAvailability() {
  const availableTargets = pages.filter((page) => page.id !== activePageId);
  const disabled = availableTargets.length === 0;
  applyMenuButtonState(contextMenuMoveButton, !disabled);
  contextMenuMoveButton.title = disabled ? "Create another page to move items" : "Move selection to another page";
  if (disabled) {
    hideContextSubmenu();
  }
}
function updateContextMenuNavigateAvailability() {
  const disabled = pages.length <= 1;
  applyMenuButtonState(contextMenuNavigateButton, !disabled);
  contextMenuNavigateButton.title = disabled ? "Create another page to navigate" : "Jump to another page";
  if (disabled && contextSubmenuMode === "navigate") {
    hideContextSubmenu();
  }
}
function renderPages() {
  pageList.replaceChildren(...pages.map((page) => {
    const item = document.createElement("li");
    item.dataset.page = page.id;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "menu-item";
    button.textContent = page.name;
    item.appendChild(button);
    if (page.id === activePageId) {
      item.classList.add("active");
    }
    return item;
  }));
  settingsPageList.replaceChildren(...pages.map((page) => {
    const item = document.createElement("div");
    item.className = "settings-list-item";
    item.dataset.page = page.id;
    const isActive = page.id === activePageId;
    if (isActive) {
      item.classList.add("settings-list-item--active");
    }
    const info = document.createElement("div");
    info.className = "list-item-info";
    const icon = document.createElement("span");
    icon.className = "item-icon";
    icon.textContent = "\uD83D\uDCC4";
    const details = document.createElement("div");
    details.className = "item-details";
    const name = document.createElement("span");
    name.className = "item-name";
    name.textContent = page.name;
    details.appendChild(name);
    info.append(icon, details);
    const actions = document.createElement("div");
    actions.className = "list-item-actions";
    const renameButton = document.createElement("button");
    renameButton.type = "button";
    renameButton.className = "icon-btn icon-btn--small";
    renameButton.dataset.action = "rename";
    renameButton.title = "Rename";
    renameButton.textContent = "✏️";
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "icon-btn icon-btn--small icon-btn--danger";
    deleteButton.dataset.action = "delete";
    deleteButton.title = "Delete";
    deleteButton.textContent = "\uD83D\uDDD1️";
    if (pages.length <= 1) {
      deleteButton.disabled = true;
      deleteButton.title = "Keep at least one page";
    }
    actions.append(renameButton, deleteButton);
    item.append(info, actions);
    return item;
  }));
  updatePageIndicator();
  updatePageNavButtons();
  updateContextMenuMoveAvailability();
  updateContextMenuNavigateAvailability();
}
function handlePageCreate() {
  openPageCreateModal();
}
function resetPageCreateModal() {
  pageCreateForm.reset();
  pageCreateError.textContent = "";
  pageCreateInput.disabled = false;
  pageCreateSubmit.disabled = false;
  pageCreateCancel.disabled = false;
  pageCreateInput.placeholder = `Page ${nextPageNumber}`;
}
function openPageCreateModal() {
  resetPageCreateModal();
  if (!pageCreateModal.open) {
    pageCreateModal.showModal();
  }
  requestAnimationFrame(() => {
    pageCreateInput.focus();
  });
}
function closePageCreateModal() {
  if (pageCreateModal.open) {
    pageCreateModal.close();
  }
  resetPageCreateModal();
}
async function createPageWithName(name) {
  persistActivePageState({ force: true });
  const pageNumber = nextPageNumber;
  nextPageNumber += 1;
  const page = {
    id: `page-${pageNumber}`,
    name: name || `Page ${pageNumber}`
  };
  pages.push(page);
  delete pageStates[page.id];
  if (contextSubmenuVisible && (contextSubmenuMode === "move" || contextSubmenuMode === "navigate")) {
    hideContextSubmenu();
  }
  await setActivePage(page.id, { persist: false, schedule: false });
  syncPreferencesWithPages();
  savePreferences();
  scheduleSave();
}
var currentRenameContext = null;
function resetRenameModal() {
  renameForm.reset();
  renameError.textContent = "";
  renameInput.disabled = false;
  renameSubmit.disabled = false;
  renameCancel.disabled = false;
  currentRenameContext = null;
}
function openRenameModal(context) {
  resetRenameModal();
  currentRenameContext = context;
  if (context.type === "workspace") {
    renameTitle.textContent = "Rename Workspace";
    renameInput.value = context.name;
  } else {
    renameTitle.textContent = "Rename Page";
    renameInput.value = context.name;
  }
  if (!renameModal.open) {
    renameModal.showModal();
  }
  requestAnimationFrame(() => {
    renameInput.select();
    renameInput.focus();
  });
}
function closeRenameModal() {
  if (renameModal.open) {
    renameModal.close();
  }
  resetRenameModal();
}
async function handleRenameSubmit() {
  if (!currentRenameContext)
    return;
  const trimmed = renameInput.value.trim();
  if (!trimmed) {
    renameError.textContent = "Name cannot be empty";
    return;
  }
  renameInput.disabled = true;
  renameSubmit.disabled = true;
  renameCancel.disabled = true;
  renameError.textContent = "";
  try {
    if (currentRenameContext.type === "workspace") {
      const slug = await window.workspaceAPI.rename(currentRenameContext.name, trimmed);
      await populateWorkspaces(slug);
      closeRenameModal();
    } else {
      renamePage(currentRenameContext.pageId, trimmed);
      closeRenameModal();
    }
  } catch (error) {
    console.error("Rename failed", error);
    renameError.textContent = error instanceof Error ? error.message : "Failed to rename";
    renameInput.disabled = false;
    renameSubmit.disabled = false;
    renameCancel.disabled = false;
  }
}
function showConfirmModal(options) {
  return new Promise((resolve) => {
    confirmTitle.textContent = options.title;
    confirmMessage.textContent = options.message;
    const handleSubmit = (event) => {
      event.preventDefault();
      cleanup();
      confirmModal.close();
      resolve(true);
    };
    const handleCancel = () => {
      cleanup();
      confirmModal.close();
      resolve(false);
    };
    const cleanup = () => {
      confirmForm.removeEventListener("submit", handleSubmit);
      confirmCancel.removeEventListener("click", handleCancel);
      confirmModal.removeEventListener("cancel", handleCancel);
    };
    confirmForm.addEventListener("submit", handleSubmit);
    confirmCancel.addEventListener("click", handleCancel);
    confirmModal.addEventListener("cancel", handleCancel);
    confirmModal.showModal();
  });
}
async function showDisplaySelectModal() {
  return new Promise((resolve) => {
    const handleSelection = (displayId) => {
      displaySelectModal.close();
      displaySelectList.replaceChildren();
      resolve(displayId);
    };
    const handleCancel = () => {
      displaySelectModal.close();
      displaySelectList.replaceChildren();
      resolve(null);
    };
    window.workspaceAPI.getDisplays().then((displays) => {
      if (displays.length === 1) {
        resolve(displays[0].id);
        return;
      }
      displaySelectList.replaceChildren(...displays.map((display) => {
        const item = document.createElement("li");
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = display.label;
        button.addEventListener("click", () => handleSelection(display.id));
        item.appendChild(button);
        return item;
      }));
      displaySelectCancel.onclick = handleCancel;
      displaySelectModal.oncancel = handleCancel;
      displaySelectModal.showModal();
    });
  });
}
async function setActivePage(pageId, options) {
  if (!pages.some((page) => page.id === pageId)) {
    return;
  }
  if (activePageId === pageId) {
    return;
  }
  const shouldPersist = options?.persist ?? true;
  const shouldSchedule = options?.schedule ?? true;
  if (shouldPersist) {
    persistActivePageState({ force: true });
  }
  activePageId = pageId;
  renderPages();
  await loadPageState(pageId);
  syncPreferencesWithPages();
  savePreferences();
  if (shouldSchedule) {
    scheduleSave();
  }
}
function renamePage(pageId, name) {
  const page = pages.find((p2) => p2.id === pageId);
  if (!page)
    return;
  page.name = name;
  if (contextSubmenuVisible && (contextSubmenuMode === "move" || contextSubmenuMode === "navigate")) {
    hideContextSubmenu();
  }
  renderPages();
  syncPreferencesWithPages();
  savePreferences();
  scheduleSave();
}
async function deletePage(pageId) {
  if (pages.length <= 1)
    return;
  persistActivePageState({ force: true });
  pages = pages.filter((page) => page.id !== pageId);
  delete pageStates[pageId];
  if (contextSubmenuVisible && (contextSubmenuMode === "move" || contextSubmenuMode === "navigate")) {
    hideContextSubmenu();
  }
  const wasActivePage = pageId === activePageId;
  const targetPageId = pages.some((page) => page.id === activePageId) ? activePageId : pages[0]?.id ?? null;
  if (targetPageId) {
    if (wasActivePage) {
      await setActivePage(targetPageId, { persist: false, schedule: false });
    } else {
      renderPages();
    }
  } else {
    activePageId = null;
    renderPages();
    fabricCanvas.clear();
    fabricCanvas.discardActiveObject();
    fabricCanvas.renderAll();
  }
  syncPreferencesWithPages();
  savePreferences();
  scheduleSave();
}
function activateNextPage() {
  if (!activePageId)
    return;
  const index = pages.findIndex((page) => page.id === activePageId);
  if (index === -1)
    return;
  const next = pages[index + 1];
  if (next) {
    setActivePage(next.id);
  }
}
function activatePreviousPage() {
  if (!activePageId)
    return;
  const index = pages.findIndex((page) => page.id === activePageId);
  if (index <= 0)
    return;
  const prev = pages[index - 1];
  if (prev) {
    setActivePage(prev.id);
  }
}
function refreshSettingsModal() {
  renderSettingsWorkspaceList(currentWorkspaces);
  renderPages();
}
function wireEvents() {
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  window.electronAPI.on("workspace:asset-updated", (payload) => {
    handleWorkspaceAssetUpdated(payload);
  });
  const dropdowns = [
    { trigger: workspaceMenuToggle, container: workspaceDropdown },
    { trigger: pageMenuToggle, container: pageDropdown },
    { trigger: zoomMenuToggle, container: zoomDropdown }
  ];
  dropdowns.forEach(({ trigger, container }) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openDropdown(container);
    });
  });
  workspaceCreatePanelButton.addEventListener("click", () => {
    closeActiveDropdown();
    handleWorkspaceCreate();
  });
  workspaceCreateForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (workspaceCreateInFlight)
      return;
    const value = workspaceCreateInput.value.trim();
    if (!value) {
      workspaceCreateError.textContent = "Enter a workspace name";
      workspaceCreateInput.focus();
      return;
    }
    workspaceCreateError.textContent = "";
    workspaceCreateInFlight = true;
    workspaceCreateInput.disabled = true;
    workspaceCreateSubmit.disabled = true;
    workspaceCreateCancel.disabled = true;
    try {
      await createWorkspaceWithName(value);
      closeWorkspaceCreateModal();
      setCaptureFeedback("Workspace created", "success", 2500);
    } catch (error) {
      console.error("Failed to create workspace", error);
      workspaceCreateError.textContent = error instanceof Error ? error.message : "Failed to create workspace";
      workspaceCreateInput.focus();
    } finally {
      workspaceCreateInFlight = false;
      workspaceCreateInput.disabled = false;
      workspaceCreateSubmit.disabled = false;
      workspaceCreateCancel.disabled = false;
    }
  });
  workspaceCreateCancel.addEventListener("click", (event) => {
    event.preventDefault();
    closeWorkspaceCreateModal();
  });
  pageCreateForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const value = pageCreateInput.value.trim();
    const pageName = value || `Page ${nextPageNumber}`;
    pageCreateError.textContent = "";
    pageCreateInput.disabled = true;
    pageCreateSubmit.disabled = true;
    pageCreateCancel.disabled = true;
    try {
      await createPageWithName(pageName);
      closePageCreateModal();
    } catch (error) {
      console.error("Failed to create page", error);
      pageCreateError.textContent = error instanceof Error ? error.message : "Failed to create page";
      pageCreateInput.focus();
    } finally {
      pageCreateInput.disabled = false;
      pageCreateSubmit.disabled = false;
      pageCreateCancel.disabled = false;
    }
  });
  pageCreateCancel.addEventListener("click", (event) => {
    event.preventDefault();
    closePageCreateModal();
  });
  renameForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await handleRenameSubmit();
  });
  renameCancel.addEventListener("click", (event) => {
    event.preventDefault();
    closeRenameModal();
  });
  renameModal.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeRenameModal();
  });
  renameModal.addEventListener("close", () => {
    resetRenameModal();
  });
  workspaceCreateModal.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeWorkspaceCreateModal();
  });
  pageCreateModal.addEventListener("cancel", (event) => {
    event.preventDefault();
    closePageCreateModal();
  });
  workspaceCreateModal.addEventListener("close", () => {
    workspaceCreateInFlight = false;
    resetWorkspaceCreateModal();
  });
  openSettingsFromPanelButton.addEventListener("click", () => {
    closeActiveDropdown();
    refreshSettingsModal();
    handleTabChange("workspaces");
    settingsModal.showModal();
  });
  openSettingsButton.addEventListener("click", () => {
    closeActiveDropdown();
    refreshSettingsModal();
    handleTabChange("workspaces");
    settingsModal.showModal();
  });
  settingsWorkspaceList.addEventListener("click", async (event) => {
    const target = event.target;
    const actionButton = target.matches("button[data-action]") ? target : target.closest("button[data-action]");
    if (actionButton) {
      event.stopPropagation();
      const item2 = actionButton.closest("[data-workspace]");
      if (!item2)
        return;
      const workspace2 = item2.dataset.workspace ?? "";
      if (!workspace2)
        return;
      const action = actionButton.dataset.action;
      if (action === "rename") {
        openRenameModal({ type: "workspace", name: workspace2 });
        return;
      }
      if (action === "delete") {
        if (currentWorkspaces.length <= 1) {
          return;
        }
        const confirmed = await showConfirmModal({
          title: "Delete Workspace",
          message: `Delete workspace "${workspace2}"? This will remove its saved images.`
        });
        if (!confirmed)
          return;
        actionButton.disabled = true;
        try {
          await window.workspaceAPI.remove(workspace2);
          await populateWorkspaces();
        } catch (error) {
          console.error("Failed to delete workspace", error);
        } finally {
          actionButton.disabled = false;
        }
        return;
      }
      return;
    }
    const item = target.closest("[data-workspace]");
    if (!item)
      return;
    const workspace = item.dataset.workspace ?? "";
    if (!workspace)
      return;
    if (workspace !== activeWorkspace) {
      await loadWorkspace(workspace);
    }
  });
  workspaceList.addEventListener("click", async (event) => {
    const item = event.target.closest("li[data-workspace]");
    if (!item)
      return;
    const workspace = item.dataset.workspace ?? "";
    if (!workspace)
      return;
    closeActiveDropdown();
    if (workspace !== activeWorkspace) {
      await loadWorkspace(workspace);
    }
  });
  pageList.addEventListener("click", (event) => {
    const target = event.target.closest("li[data-page]");
    if (!target)
      return;
    const pageId = target.dataset.page ?? "";
    if (!pageId)
      return;
    closeActiveDropdown();
    setActivePage(pageId);
  });
  pageNavBack.addEventListener("click", () => {
    activatePreviousPage();
  });
  pageNavForward.addEventListener("click", () => {
    activateNextPage();
  });
  pageCreateButton.addEventListener("click", () => {
    closeActiveDropdown();
    handlePageCreate();
  });
  settingsWorkspaceCreateButton.addEventListener("click", handleWorkspaceCreate);
  settingsPageCreateButton.addEventListener("click", () => {
    handlePageCreate();
  });
  settingsPageList.addEventListener("click", async (event) => {
    const target = event.target;
    const actionButton = target.matches("button[data-action]") ? target : target.closest("button[data-action]");
    if (actionButton) {
      event.stopPropagation();
      const item2 = actionButton.closest("[data-page]");
      if (!item2)
        return;
      const pageId2 = item2.dataset.page ?? "";
      if (!pageId2)
        return;
      const action = actionButton.dataset.action;
      if (action === "rename") {
        const page = pages.find((p2) => p2.id === pageId2);
        if (!page)
          return;
        openRenameModal({ type: "page", pageId: pageId2, name: page.name });
        return;
      }
      if (action === "delete") {
        if (pages.length <= 1)
          return;
        const page = pages.find((p2) => p2.id === pageId2);
        const confirmed = await showConfirmModal({
          title: "Delete Page",
          message: `Delete page "${page?.name ?? "this page"}"? This cannot be undone.`
        });
        if (!confirmed)
          return;
        deletePage(pageId2);
        return;
      }
      return;
    }
    const item = target.closest("[data-page]");
    if (!item)
      return;
    const pageId = item.dataset.page ?? "";
    if (!pageId)
      return;
    setActivePage(pageId);
  });
  zoomMenu.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-zoom]");
    if (!button)
      return;
    const value = button.dataset.zoom ?? "";
    if (value === "fit") {
      fitToScreen({ announce: true });
    } else if (value === "reset") {
      resetZoom({ announce: true });
    } else {
      const numeric = Number(value);
      if (Number.isFinite(numeric)) {
        setCanvasZoom(numeric, { announce: true });
      }
    }
    closeActiveDropdown();
  });
  contextMenu.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button)
      return;
    event.preventDefault();
    event.stopPropagation();
    const action = button.dataset.action;
    if (action === "paste") {
      hideContextMenu();
      handleContextMenuPaste();
      return;
    }
    if (action === "navigate") {
      if (!button.disabled) {
        showNavigateToPageSubmenu();
      }
      return;
    }
    if (action === "move") {
      if (!button.disabled) {
        showMoveToPageSubmenu();
      }
      return;
    }
    if (action === "front") {
      hideContextMenu();
      adjustSelectionStack("front");
      return;
    }
    if (action === "back") {
      hideContextMenu();
      adjustSelectionStack("back");
      return;
    }
    if (action === "delete") {
      hideContextMenu();
      deleteSelectedObjects();
    }
  });
  contextMenu.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
  contextMenu.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && contextMenuVisible) {
      event.preventDefault();
      hideContextMenu();
    }
  });
  contextSubmenuList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-page-id]");
    if (!button)
      return;
    event.preventDefault();
    event.stopPropagation();
    const pageId = button.dataset.pageId ?? "";
    if (!pageId)
      return;
    if (contextSubmenuMode === "navigate") {
      hideContextMenu();
      setActivePage(pageId);
      return;
    }
    moveSelectionToPage(pageId);
    hideContextMenu();
  });
  contextSubmenuList.addEventListener("keydown", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement)) {
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const buttons = Array.from(contextSubmenuList.querySelectorAll("button[data-page-id]"));
      const index = buttons.indexOf(target);
      if (index === -1)
        return;
      const delta = event.key === "ArrowDown" ? 1 : -1;
      const next = buttons[index + delta] ?? buttons[delta === 1 ? 0 : buttons.length - 1];
      next?.focus({ preventScroll: true });
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      hideContextMenu();
    }
  });
  const upperCanvas = fabricCanvas.upperCanvasEl;
  upperCanvas.addEventListener("contextmenu", handleCanvasContextMenu);
  canvasElement.addEventListener("contextmenu", handleCanvasContextMenu);
  const handleWheelZoom = (event) => {
    const target = event.target;
    const isCanvasTarget = target === canvasElement || target instanceof HTMLElement && canvasElement.contains(target) || target === upperCanvas || target instanceof HTMLElement && upperCanvas.contains(target);
    if (!isCanvasTarget) {
      return;
    }
    const baseFactor = event.ctrlKey || event.metaKey ? 1.04 : 1.08;
    const factor = event.deltaY < 0 ? baseFactor : 1 / baseFactor;
    const pointer = fabricCanvas.getPointer(event, true);
    setCanvasZoom(currentZoom * factor, { announce: false, point: pointer });
    event.preventDefault();
  };
  upperCanvas.addEventListener("wheel", handleWheelZoom, { passive: false });
  canvasElement.addEventListener("wheel", handleWheelZoom, { passive: false });
  document.addEventListener("pointerdown", (event) => {
    const target = event.target;
    if (activeDropdown && (!target || !activeDropdown.contains(target))) {
      closeActiveDropdown();
    }
    if (contextMenuVisible) {
      if (target && (contextMenu.contains(target) || contextSubmenu.contains(target))) {
        return;
      }
      hideContextMenu();
    }
  });
  document.addEventListener("scroll", () => {
    if (contextMenuVisible) {
      hideContextMenu();
    }
  }, true);
  window.addEventListener("resize", hideContextMenu);
  window.addEventListener("blur", hideContextMenu);
  captureButton.addEventListener("click", async () => {
    if (!activeWorkspace)
      return;
    captureButton.disabled = true;
    captureButton.classList.add("is-loading");
    setCaptureFeedback("Choose a display then drag to capture…", "info");
    try {
      const displayId = await showDisplaySelectModal();
      if (displayId === null) {
        setCaptureFeedback("Screenshot canceled", "info", 2000);
        return;
      }
      const asset = await window.workspaceAPI.capture(activeWorkspace, displayId);
      if (asset) {
        await addImageAsset(asset);
        setCaptureFeedback("Screenshot added to workspace", "success", 4000);
      } else {
        setCaptureFeedback("Screenshot canceled", "info", 2000);
      }
    } catch (error) {
      console.error("Failed to capture screenshot", error);
      setCaptureFeedback("Failed to capture screenshot", "error", 4000);
    } finally {
      captureButton.classList.remove("is-loading");
      captureButton.disabled = false;
    }
  });
  settingsClose.addEventListener("click", () => {
    settingsModal.close();
  });
  settingsCloseX.addEventListener("click", () => {
    settingsModal.close();
  });
  document.querySelectorAll(".about-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const href = link.getAttribute("href");
      if (href && window.electronAPI?.openExternal) {
        window.electronAPI.openExternal(href);
      }
    });
  });
  openReferenceButton.addEventListener("click", () => {
    closeActiveDropdown();
    referenceModal.showModal();
  });
  referenceClose.addEventListener("click", () => {
    referenceModal.close();
  });
  referenceModal.addEventListener("click", (event) => {
    if (event.target === referenceModal) {
      referenceModal.close();
    }
  });
  assetViewerModalClose.addEventListener("click", () => {
    closeAssetViewerModal();
  });
  assetViewerModal.addEventListener("click", (event) => {
    if (event.target === assetViewerModal) {
      closeAssetViewerModal();
    }
  });
  function closeAssetViewerModal() {
    assetViewerModal.close();
    assetViewerModalBody.innerHTML = "";
  }
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.dataset.tab ?? "workspaces";
      handleTabChange(tab);
    });
  });
  fabricCanvas.on("object:added", scheduleSave);
  fabricCanvas.on("object:removed", scheduleSave);
  fabricCanvas.on("object:modified", scheduleSave);
  fabricCanvas.on("selection:created", hideContextMenu);
  fabricCanvas.on("selection:updated", hideContextMenu);
  fabricCanvas.on("selection:cleared", hideContextMenu);
  fabricCanvas.on("mouse:dblclick", handleImageDoubleClick);
  const endPan = () => {
    if (!isPanning)
      return;
    isPanning = false;
    panStart = null;
    fabricCanvas.setCursor(spaceKeyPressed ? "grab" : "default");
    fabricCanvas.selection = true;
  };
  fabricCanvas.on("mouse:down", (event) => {
    const pointerEvent = event.e;
    if (!spaceKeyPressed && !isMiddleButtonEvent(pointerEvent)) {
      return;
    }
    const startPoint = getPointerPosition(pointerEvent);
    if (!startPoint) {
      return;
    }
    isPanning = true;
    panStart = startPoint;
    fabricCanvas.setCursor("grabbing");
    fabricCanvas.selection = false;
    preventPointerDefault(pointerEvent);
  });
  fabricCanvas.on("mouse:move", (event) => {
    if (!isPanning || !panStart) {
      return;
    }
    const pointerEvent = event.e;
    const pointerPosition = getPointerPosition(pointerEvent);
    if (!pointerPosition) {
      return;
    }
    const deltaX = pointerPosition.x - panStart.x;
    const deltaY = pointerPosition.y - panStart.y;
    if (deltaX === 0 && deltaY === 0) {
      return;
    }
    fabricCanvas.relativePan(new ot(deltaX, deltaY));
    panStart = pointerPosition;
    preventPointerDefault(pointerEvent);
  });
  fabricCanvas.on("mouse:up", () => {
    endPan();
  });
  fabricCanvas.on("mouse:out", () => {
    endPan();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (contextMenuVisible) {
        event.preventDefault();
        hideContextMenu();
        return;
      }
      if (activeDropdown) {
        event.preventDefault();
        closeActiveDropdown();
        return;
      }
    }
    const target = event.target;
    const isEditable = isEditableTarget(target);
    if (event.code === "Space" && !spaceKeyPressed && !isEditable) {
      spaceKeyPressed = true;
      fabricCanvas.setCursor(isPanning ? "grabbing" : "grab");
      event.preventDefault();
      return;
    }
    if (event.key === "PageUp" || event.key === "PageDown") {
      event.preventDefault();
      const factor = event.key === "PageUp" ? 1.15 : 1 / 1.15;
      setCanvasZoom(currentZoom * factor, { announce: true });
      return;
    }
    if ((event.key === "ArrowRight" || event.key === "ArrowLeft") && event.ctrlKey && pages.length > 0) {
      event.preventDefault();
      if (!activePageId) {
        setActivePage(pages[0].id);
        return;
      }
      const index = pages.findIndex((page) => page.id === activePageId);
      if (index === -1) {
        setActivePage(pages[0].id);
        return;
      }
      const delta = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (index + delta + pages.length) % pages.length;
      setActivePage(pages[nextIndex].id);
      return;
    }
    if (event.key === "Home" && !isEditable) {
      event.preventDefault();
      fitToScreen({ announce: true });
      return;
    }
    if ((event.key === "Delete" || event.key === "Backspace") && !isEditable) {
      if (getActiveCanvasObjects().length > 0) {
        event.preventDefault();
        deleteSelectedObjects();
      }
    }
  });
  document.addEventListener("keyup", (event) => {
    if (event.code === "Space") {
      spaceKeyPressed = false;
      if (!isPanning) {
        fabricCanvas.setCursor("default");
      }
    }
  });
  document.addEventListener("dragover", (event) => {
    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "copy";
    }
  });
  document.addEventListener("drop", async (event) => {
    event.preventDefault();
    if (!activeWorkspace)
      return;
    const { files, urls, inlineFiles } = await collectDataTransferPayload(event.dataTransfer, { label: "Drop" });
    console.debug("Drop payload", {
      files,
      urls,
      inlineFiles: inlineFiles.length
    });
    if (files.length === 0 && urls.length === 0 && inlineFiles.length === 0) {
      return;
    }
    const dropCount = files.length + urls.length + inlineFiles.length;
    showDropProgress(dropCount > 1 ? "Importing assets…" : DROP_PROGRESS_DEFAULT_TITLE, dropCount > 1 ? `Processing ${dropCount} items…` : DROP_PROGRESS_DEFAULT_SUBTITLE);
    await ingestAndHandleAssets(activeWorkspace, { files, urls, inlineFiles }, {
      sourceLabel: "drop",
      failureTitle: "Import failed",
      failureSubtitle: "We could not add these files. Check the logs for details.",
      emptyMessage: "Nothing new to add."
    });
  });
  document.addEventListener("paste", async (event) => {
    if (!activeWorkspace)
      return;
    const target = event.target;
    if (isEditableTarget(target)) {
      return;
    }
    const transfer = event.clipboardData;
    if (!transfer) {
      return;
    }
    const types = Array.from(transfer.types ?? []);
    const hasImageItem = Array.from(transfer.items ?? []).some((item) => item.kind === "file" && item.type.startsWith("image/"));
    const hasImageFile = Array.from(transfer.files ?? []).some((file) => file.type.startsWith("image/"));
    const hasFilesType = types.includes("Files");
    const hasImageType = types.some((type) => type.startsWith("image/"));
    if (!hasImageItem && !hasImageFile && !hasFilesType && !hasImageType) {
      return;
    }
    event.preventDefault();
    const { files, urls, inlineFiles } = await collectDataTransferPayload(transfer, {
      label: "Paste"
    });
    console.debug("Paste payload", {
      files,
      urls,
      inlineFiles: inlineFiles.length
    });
    const pasteCount = files.length + urls.length + inlineFiles.length;
    if (pasteCount === 0) {
      showDropProgress("Nothing to paste", "Clipboard did not contain an image.");
      hideDropProgress(1600);
      return;
    }
    showDropProgress(pasteCount > 1 ? "Importing assets…" : DROP_PROGRESS_DEFAULT_TITLE, pasteCount > 1 ? `Processing ${pasteCount} items…` : PASTE_PROGRESS_SUBTITLE);
    await ingestAndHandleAssets(activeWorkspace, { files, urls, inlineFiles }, {
      sourceLabel: "paste",
      failureTitle: "Paste failed",
      failureSubtitle: "We could not add this clipboard content. Check the logs for details.",
      emptyMessage: "Clipboard did not contain new assets."
    });
  });
}
async function bootstrap() {
  const versionShort = "1.3.0".split(".").slice(0, 2).join(".");
  appNameElement.textContent = `ArtBoard v${versionShort}`;
  const aboutVersionElement = document.getElementById("about-version");
  if (aboutVersionElement) {
    aboutVersionElement.textContent = `Version ${versionShort}`;
  }
  wireEvents();
  await populateWorkspaces();
  renderPages();
  updatePageIndicator();
  setCanvasZoom(currentZoom, { persist: false });
}
bootstrap();
async function ingestAndHandleAssets(workspace, payload, context) {
  const { sourceLabel, failureTitle, failureSubtitle, emptyMessage } = context;
  try {
    const ingestResult = await window.workspaceAPI.ingest(workspace, payload);
    const assets = Array.isArray(ingestResult) ? ingestResult : ingestResult?.assets ?? [];
    const failures = Array.isArray(ingestResult) ? [] : ingestResult?.failures ?? [];
    console.debug(`Ingested ${sourceLabel} assets`, { assets, failures });
    if (assets.length === 0 && failures.length === 0) {
      updateDropProgress(emptyMessage);
      hideDropProgress(900);
      return;
    }
    if (assets.length > 0) {
      updateDropProgress(assets.length > 1 ? `Placing ${assets.length} assets on the canvas…` : "Placing asset on the canvas…");
      for (const asset of assets) {
        try {
          await addImageAsset(asset);
        } catch (error) {
          console.error("Failed to add image asset", asset, error);
        }
      }
    }
    if (failures.length > 0) {
      handleIngestFailures(failures, assets.length);
      return;
    }
    dropProgressTitle.textContent = assets.length > 1 ? "Assets added!" : "Asset added!";
    updateDropProgress("All set.");
    hideDropProgress(900);
  } catch (error) {
    console.error(`Failed to ingest ${sourceLabel} assets`, error);
    dropProgressTitle.textContent = failureTitle;
    updateDropProgress(failureSubtitle);
    hideDropProgress(2400);
  }
}
function selectBestImageFromHtml(urls) {
  if (urls.length === 0) {
    return null;
  }
  const uniqueUrls = Array.from(new Set(urls));
  if (uniqueUrls.length === 1) {
    return uniqueUrls[0];
  }
  const scoredUrls = uniqueUrls.map((url) => ({
    url,
    score: calculateImageQualityScore(url)
  }));
  scoredUrls.sort((a2, b2) => b2.score - a2.score);
  return scoredUrls[0].url;
}
function calculateImageQualityScore(url) {
  let score = 0;
  if (url.includes("full") || url.includes("large") || url.includes("original")) {
    score += 10;
  }
  if (url.includes(".webp")) {
    score += 8;
  } else if (url.includes(".png")) {
    score += 6;
  } else if (url.includes(".jpg") || url.includes(".jpeg")) {
    score += 4;
  }
  const dimensionMatch = url.match(/(\d+)x(\d+)/);
  if (dimensionMatch) {
    const width = parseInt(dimensionMatch[1], 10);
    const height = parseInt(dimensionMatch[2], 10);
    if (width >= 800 || height >= 800) {
      score += 5;
    }
  }
  if (!url.includes("thumb") && !url.includes("small") && !url.includes("mini")) {
    score += 3;
  }
  if (url.includes("imgurl=")) {
    score += 7;
  }
  return score;
}
async function collectDataTransferPayload(transfer, context) {
  const { label } = context;
  const types = Array.from(transfer?.types ?? []);
  console.debug(`${label} types`, types);
  const filePaths = new Set;
  const inlineFiles = [];
  const inlineBlobCandidates = [];
  for (const file of Array.from(transfer?.files ?? [])) {
    const candidatePath = file.path;
    if (candidatePath && candidatePath.trim()) {
      filePaths.add(candidatePath);
      continue;
    }
    inlineBlobCandidates.push(file);
  }
  const uriList = transfer?.getData("text/uri-list") ?? "";
  const text = transfer?.getData("text/plain") ?? "";
  const html = transfer?.getData("text/html") ?? "";
  if (uriList || text || html) {
    console.debug(`${label} raw payload`, {
      uriList: uriList.slice(0, 512),
      text: text.slice(0, 512),
      html: html.slice(0, 512)
    });
  }
  const fileCandidates = new Set;
  const candidateUrls = new Set;
  const dataUrlCandidates = new Set;
  const htmlExtractedUrls = [];
  const collectDataUriCandidate = (value) => {
    if (!value || !value.startsWith("data:")) {
      return false;
    }
    dataUrlCandidates.add(value);
    return true;
  };
  const addUrlCandidate = (value, fromHtml = false) => {
    if (!value) {
      return;
    }
    if (collectDataUriCandidate(value)) {
      return;
    }
    if (fromHtml) {
      htmlExtractedUrls.push(value);
    } else {
      expandDropUrlCandidates(value).forEach((candidate) => {
        candidateUrls.add(candidate);
      });
    }
  };
  if (!html) {
    uriList.split(/\r?\n/).map((value) => value.trim()).filter(Boolean).forEach((value) => {
      if (value.startsWith("file://")) {
        fileCandidates.add(value);
        return;
      }
      addUrlCandidate(value, false);
    });
    const plain = text.trim();
    if (plain) {
      if (plain.startsWith("file://")) {
        fileCandidates.add(plain);
      } else {
        extractUrlsFromText(plain).forEach((candidate) => {
          addUrlCandidate(candidate, false);
        });
        addUrlCandidate(plain, false);
      }
    }
  }
  if (html) {
    try {
      const parser = new DOMParser;
      const doc = parser.parseFromString(html, "text/html");
      doc.querySelectorAll("img[src]").forEach((img) => {
        const src = img.getAttribute("src");
        if (!src)
          return;
        if (src.startsWith("file://")) {
          fileCandidates.add(src);
        } else if (!collectDataUriCandidate(src) && isHttpUrl(src)) {
          addUrlCandidate(src, true);
        }
      });
      doc.querySelectorAll("a[href]").forEach((anchor) => {
        const href = anchor.getAttribute("href");
        if (!href)
          return;
        if (href.startsWith("file://")) {
          fileCandidates.add(href);
        } else if (!collectDataUriCandidate(href) && isHttpUrl(href)) {
          addUrlCandidate(href, true);
        }
      });
      doc.querySelectorAll("img, source, [data-src], [data-url], [data-href], [data-large-src], [data-fullsize]").forEach((element) => {
        Array.from(element.attributes).filter((attr) => /src|href|url/i.test(attr.name)).map((attr) => attr.value).filter(Boolean).forEach((value) => {
          if (value.startsWith("file://")) {
            fileCandidates.add(value);
            return;
          }
          if (!collectDataUriCandidate(value) && isHttpUrl(value)) {
            addUrlCandidate(value, true);
          }
        });
      });
      doc.querySelectorAll("[srcset]").forEach((element) => {
        const srcset = element.getAttribute("srcset");
        if (!srcset)
          return;
        extractSrcsetUrls(srcset).forEach((candidate) => {
          if (candidate.startsWith("file://")) {
            fileCandidates.add(candidate);
          } else if (!collectDataUriCandidate(candidate) && isHttpUrl(candidate)) {
            addUrlCandidate(candidate, true);
          }
        });
      });
      doc.querySelectorAll('meta[itemprop="image"], meta[property="og:image"], meta[name="og:image"], meta[name="twitter:image"]').forEach((meta) => {
        const content = meta.getAttribute("content");
        if (!content)
          return;
        if (content.startsWith("file://")) {
          fileCandidates.add(content);
        } else if (!collectDataUriCandidate(content) && isHttpUrl(content)) {
          addUrlCandidate(content, true);
        }
      });
    } catch (error) {
      console.warn("Failed to parse dropped HTML", error);
    }
  }
  const normalizedFilePaths = Array.from(fileCandidates).map((value) => fileUrlToPath(value));
  for (const value of dataUrlCandidates) {
    const inline = await createInlineAssetFromDataUrl(value);
    if (inline) {
      inlineFiles.push(inline);
    }
  }
  console.debug("Candidate aggregator", {
    fileCandidates: Array.from(fileCandidates),
    httpCandidates: Array.from(candidateUrls)
  });
  const inlineBlobResults = await Promise.all(inlineBlobCandidates.map(async (file) => {
    try {
      if (file.size === 0) {
        console.debug("Skipped inline file with zero size", {
          name: file.name,
          type: file.type
        });
        return null;
      }
      const arrayBuffer = await file.arrayBuffer();
      if (arrayBuffer.byteLength === 0) {
        console.debug("Skipped inline file with empty buffer", {
          name: file.name,
          type: file.type
        });
        return null;
      }
      console.debug("Collected inline file from File", {
        name: file.name,
        type: file.type,
        size: arrayBuffer.byteLength
      });
      return {
        name: file.name || undefined,
        mimeType: file.type || undefined,
        data: new Uint8Array(arrayBuffer)
      };
    } catch (error) {
      console.warn("Failed to read dropped file blob", error);
      return null;
    }
  }));
  inlineBlobResults.filter((entry) => Boolean(entry)).forEach((entry) => {
    inlineFiles.push(entry);
  });
  if (htmlExtractedUrls.length > 0) {
    const bestUrl = selectBestImageFromHtml(htmlExtractedUrls);
    if (bestUrl) {
      candidateUrls.add(bestUrl);
    }
  }
  return {
    files: Array.from(new Set([...filePaths, ...normalizedFilePaths])),
    urls: Array.from(candidateUrls),
    inlineFiles
  };
}
function handleIngestFailures(failures, succeededCount) {
  if (failures.length === 0) {
    return;
  }
  const hasSuccesses = succeededCount > 0;
  const chatGptFailures = failures.filter((failure) => isChatGPTContentUrl(failure.source));
  if (chatGptFailures.length > 0) {
    dropProgressTitle.textContent = hasSuccesses ? "Some assets need attention" : "Sign-in required";
    updateDropProgress("ChatGPT requires an authenticated browser session. We opened the link in your browser—choose Download there, then drag the saved file into Artboard.");
    const link = chatGptFailures[0]?.source;
    if (link && window.electronAPI?.openExternal) {
      window.electronAPI.openExternal(link);
    }
    hideDropProgress(6400);
    return;
  }
  dropProgressTitle.textContent = hasSuccesses ? "Some assets skipped" : "Import incomplete";
  const summary = failures.map((failure) => failure.message || failure.source).slice(0, 2).join(`
`);
  updateDropProgress(summary || "One or more items could not be imported.");
  hideDropProgress(4800);
}
async function createInlineAssetFromDataUrl(value) {
  try {
    const response = await fetch(value);
    const arrayBuffer = await response.arrayBuffer();
    if (arrayBuffer.byteLength === 0) {
      return null;
    }
    const mimeTypeHeader = response.headers.get("content-type") ?? "";
    const mimeType = mimeTypeHeader || (() => {
      const match = /^data:([^;,]+)/i.exec(value);
      return match && match[1] ? match[1] : "";
    })();
    return {
      name: extractDataUrlFilename(value),
      mimeType: mimeType || undefined,
      data: new Uint8Array(arrayBuffer)
    };
  } catch (error) {
    console.warn("Failed to decode dropped data URL", error);
    return null;
  }
}
function extractDataUrlFilename(value) {
  const match = /;(?:name|filename)\*?=(?:UTF-8''|")?([^;",]+)"?/i.exec(value) ?? /;(?:name|filename)=([^;,]+)/i.exec(value);
  if (!match || !match[1]) {
    return;
  }
  const cleaned = match[1].trim().replace(/^"(.*)"$/, "$1");
  try {
    return decodeURIComponent(cleaned);
  } catch {
    return cleaned;
  }
}
function isChatGPTContentUrl(value) {
  try {
    const host = new URL(value).hostname.toLowerCase();
    return host.endsWith("chatgpt.com") || host.endsWith("chat.openai.com");
  } catch {
    return value.includes("chatgpt.com");
  }
}
function extractUrlsFromText(value) {
  if (!value) {
    return [];
  }
  const pattern = /\bhttps?:\/\/[^\s"'<>]+/gi;
  const results = new Set;
  let match;
  while ((match = pattern.exec(value)) !== null) {
    if (match[0]) {
      results.add(match[0]);
    }
  }
  return Array.from(results);
}
function extractSrcsetUrls(value) {
  if (!value) {
    return [];
  }
  return value.split(",").map((part) => part.trim().split(/\s+/)[0]).filter(Boolean);
}
function isHttpUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}
function expandDropUrlCandidates(raw) {
  const trimmed = raw?.trim();
  if (!trimmed) {
    return [];
  }
  if (!isHttpUrl(trimmed)) {
    return [];
  }
  const result = new Set;
  result.add(trimmed);
  try {
    const parsed = new URL(trimmed);
    extractGoogleImageTargets(parsed).forEach((candidate) => {
      if (isHttpUrl(candidate)) {
        result.add(candidate);
      }
    });
  } catch {}
  return Array.from(result);
}
function extractGoogleImageTargets(url) {
  const host = url.hostname.toLowerCase();
  if (!host.includes("google") || !url.pathname.includes("/imgres")) {
    return [];
  }
  const params = url.searchParams;
  const results = new Set;
  const primary = params.get("imgurl");
  if (primary) {
    results.add(primary);
  }
  const secondary = params.get("imgrefurl");
  if (secondary) {
    results.add(secondary);
  }
  const third = params.get("imgsrc");
  if (third) {
    results.add(third);
  }
  return Array.from(results);
}
function fileUrlToPath(value) {
  try {
    const url = new URL(value);
    let pathname = decodeURIComponent(url.pathname);
    if (/^\/[a-zA-Z]:/.test(pathname)) {
      pathname = pathname.slice(1);
    }
    return pathname;
  } catch {
    return value;
  }
}
async function addImageAsset(asset) {
  const dataUrl = await window.workspaceAPI.readAsset(asset.workspace, asset.relativePath);
  console.debug("Workspace asset read", {
    workspace: asset.workspace,
    relativePath: asset.relativePath,
    preview: dataUrl.slice(0, 64),
    absolutePath: asset.absolutePath ?? asset.path
  });
  const isDataUrl = dataUrl.startsWith("data:");
  console.debug("Loading asset into Fabric", {
    workspace: asset.workspace,
    relativePath: asset.relativePath,
    isDataUrl
  });
  const options = isDataUrl ? {} : { crossOrigin: "anonymous" };
  const img = await na.fromURL(dataUrl, options);
  if (!img) {
    throw new Error(`Fabric returned null image for ${asset.workspace}/${asset.relativePath}`);
  }
  const center = fabricCanvas.getCenter();
  img.set({
    left: center.left,
    top: center.top,
    originX: "center",
    originY: "center"
  });
  img.set("artboardMeta", {
    workspace: asset.workspace,
    relativePath: asset.relativePath,
    absolutePath: asset.absolutePath ?? asset.path
  });
  fabricCanvas.add(img);
  suppressSaves = false;
  console.debug("Canvas objects after add", fabricCanvas.getObjects().length);
  fabricCanvas.setActiveObject(img);
  fabricCanvas.renderAll();
  scheduleSave();
  console.debug("Asset added to Fabric", {
    id: img.id,
    width: img.getScaledWidth(),
    height: img.getScaledHeight()
  });
}
