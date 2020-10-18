/**
 * <========= Table of Contents: =========>
 *
 *  imagesLoaded PACKAGED
 *	Isotope PACKAGED v2.2.2
 *  jQuery appear plugin
 *  jQuery fancyBox
 *	Masonry PACKAGED
 *	Owl carousel
 *	jQuery Superfish Menu Plugin
 *	Simple JavaScript Inheritance
 *	jquery countdown
 *	jquery validate
 *  jquery easein
 *  WOW - v1.1.3
 *	jQuery magnific popup
 *	Bootstrap-select v1.12.2
 *	countup js
 *	jquery knob
 *	Chart.js
 *	slic slider
 *	jQuery animateNumber
 *	jquery-circle-progress
 *	The Final Countdown
 *
 * ========================================>
 **/


/*!
 * imagesLoaded PACKAGED v4.1.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

! function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
   }(this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
     if (t && e) {
      var i = this._events = this._events || {},
       n = i[t] = i[t] || [];
      return -1 == n.indexOf(e) && n.push(e), this
     }
    }, e.once = function(t, e) {
     if (t && e) {
      this.on(t, e);
      var i = this._onceEvents = this._onceEvents || {},
       n = i[t] = i[t] || [];
      return n[e] = !0, this
     }
    }, e.off = function(t, e) {
     var i = this._events && this._events[t];
     if (i && i.length) {
      var n = i.indexOf(e);
      return -1 != n && i.splice(n, 1), this
     }
    }, e.emitEvent = function(t, e) {
     var i = this._events && this._events[t];
     if (i && i.length) {
      var n = 0,
       o = i[n];
      e = e || [];
      for (var r = this._onceEvents && this._onceEvents[t]; o;) {
       var s = r && r[o];
       s && (this.off(t, o), delete r[o]), o.apply(this, e), n += s ? 0 : 1, o = i[n]
      }
      return this
     }
    }, t
   }),
   function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function(i) {
     return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t.imagesLoaded = e(t, t.EvEmitter)
   }(window, function(t, e) {
    function i(t, e) {
     for (var i in e) t[i] = e[i];
     return t
    }
   
    function n(t) {
     var e = [];
     if (Array.isArray(t)) e = t;
     else if ("number" == typeof t.length)
      for (var i = 0; i < t.length; i++) e.push(t[i]);
     else e.push(t);
     return e
    }
   
    function o(t, e, r) {
     return this instanceof o ? ("string" == typeof t && (t = document.querySelectorAll(t)), this.elements = n(t), this.options = i({}, this.options), "function" == typeof e ? r = e : i(this.options, e), r && this.on("always", r), this.getImages(), h && (this.jqDeferred = new h.Deferred), void setTimeout(function() {
      this.check()
     }.bind(this))) : new o(t, e, r)
    }
   
    function r(t) {
     this.img = t
    }
   
    function s(t, e) {
     this.url = t, this.element = e, this.img = new Image
    }
    var h = t.jQuery,
     a = t.console;
    o.prototype = Object.create(e.prototype), o.prototype.options = {}, o.prototype.getImages = function() {
     this.images = [], this.elements.forEach(this.addElementImages, this)
    }, o.prototype.addElementImages = function(t) {
     "IMG" == t.nodeName && this.addImage(t), this.options.background === !0 && this.addElementBackgroundImages(t);
     var e = t.nodeType;
     if (e && d[e]) {
      for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
       var o = i[n];
       this.addImage(o)
      }
      if ("string" == typeof this.options.background) {
       var r = t.querySelectorAll(this.options.background);
       for (n = 0; n < r.length; n++) {
        var s = r[n];
        this.addElementBackgroundImages(s)
       }
      }
     }
    };
    var d = {
     1: !0,
     9: !0,
     11: !0
    };
    return o.prototype.addElementBackgroundImages = function(t) {
     var e = getComputedStyle(t);
     if (e)
      for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
       var o = n && n[2];
       o && this.addBackground(o, t), n = i.exec(e.backgroundImage)
      }
    }, o.prototype.addImage = function(t) {
     var e = new r(t);
     this.images.push(e)
    }, o.prototype.addBackground = function(t, e) {
     var i = new s(t, e);
     this.images.push(i)
    }, o.prototype.check = function() {
     function t(t, i, n) {
      setTimeout(function() {
       e.progress(t, i, n)
      })
     }
     var e = this;
     return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function(e) {
      e.once("progress", t), e.check()
     }) : void this.complete()
    }, o.prototype.progress = function(t, e, i) {
     this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + i, t, e)
    }, o.prototype.complete = function() {
     var t = this.hasAnyBroken ? "fail" : "done";
     if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
      var e = this.hasAnyBroken ? "reject" : "resolve";
      this.jqDeferred[e](this)
     }
    }, r.prototype = Object.create(e.prototype), r.prototype.check = function() {
     var t = this.getIsImageComplete();
     return t ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
    }, r.prototype.getIsImageComplete = function() {
     return this.img.complete && void 0 !== this.img.naturalWidth
    }, r.prototype.confirm = function(t, e) {
     this.isLoaded = t, this.emitEvent("progress", [this, this.img, e])
    }, r.prototype.handleEvent = function(t) {
     var e = "on" + t.type;
     this[e] && this[e](t)
    }, r.prototype.onload = function() {
     this.confirm(!0, "onload"), this.unbindEvents()
    }, r.prototype.onerror = function() {
     this.confirm(!1, "onerror"), this.unbindEvents()
    }, r.prototype.unbindEvents = function() {
     this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, s.prototype = Object.create(r.prototype), s.prototype.check = function() {
     this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
     var t = this.getIsImageComplete();
     t && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
    }, s.prototype.unbindEvents = function() {
     this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, s.prototype.confirm = function(t, e) {
     this.isLoaded = t, this.emitEvent("progress", [this, this.element, e])
    }, o.makeJQueryPlugin = function(e) {
     e = e || t.jQuery, e && (h = e, h.fn.imagesLoaded = function(t, e) {
      var i = new o(this, t, e);
      return i.jqDeferred.promise(h(this))
     })
    }, o.makeJQueryPlugin(), o
   });
   
   
   /*!
    * Isotope PACKAGED v2.2.2
    *
    * http://isotope.metafizzy.co
    * Copyright 2015 Metafizzy
    */
   
   ! function(a) {
    function b() {}
   
    function c(a) {
     function c(b) {
      b.prototype.option || (b.prototype.option = function(b) {
       a.isPlainObject(b) && (this.options = a.extend(!0, this.options, b))
      })
     }
   
     function e(b, c) {
      a.fn[b] = function(e) {
       if ("string" == typeof e) {
        for (var g = d.call(arguments, 1), h = 0, i = this.length; i > h; h++) {
         var j = this[h],
          k = a.data(j, b);
         if (k)
          if (a.isFunction(k[e]) && "_" !== e.charAt(0)) {
           var l = k[e].apply(k, g);
           if (void 0 !== l) return l
          } else f("no such method '" + e + "' for " + b + " instance");
         else f("cannot call methods on " + b + " prior to initialization; attempted to call '" + e + "'")
        }
        return this
       }
       return this.each(function() {
        var d = a.data(this, b);
        d ? (d.option(e), d._init()) : (d = new c(this, e), a.data(this, b, d))
       })
      }
     }
     if (a) {
      var f = "undefined" == typeof console ? b : function(a) {
       console.error(a)
      };
      return a.bridget = function(a, b) {
       c(b), e(a, b)
      }, a.bridget
     }
    }
    var d = Array.prototype.slice;
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], c) : c("object" == typeof exports ? require("jquery") : a.jQuery)
   }(window),
   function(a) {
    function b(b) {
     var c = a.event;
     return c.target = c.target || c.srcElement || b, c
    }
    var c = document.documentElement,
     d = function() {};
    c.addEventListener ? d = function(a, b, c) {
     a.addEventListener(b, c, !1)
    } : c.attachEvent && (d = function(a, c, d) {
     a[c + d] = d.handleEvent ? function() {
      var c = b(a);
      d.handleEvent.call(d, c)
     } : function() {
      var c = b(a);
      d.call(a, c)
     }, a.attachEvent("on" + c, a[c + d])
    });
    var e = function() {};
    c.removeEventListener ? e = function(a, b, c) {
     a.removeEventListener(b, c, !1)
    } : c.detachEvent && (e = function(a, b, c) {
     a.detachEvent("on" + b, a[b + c]);
     try {
      delete a[b + c]
     } catch (d) {
      a[b + c] = void 0
     }
    });
    var f = {
     bind: d,
     unbind: e
    };
    "function" == typeof define && define.amd ? define("eventie/eventie", f) : "object" == typeof exports ? module.exports = f : a.eventie = f
   }(window),
   function() {
    "use strict";
   
    function a() {}
   
    function b(a, b) {
     for (var c = a.length; c--;)
      if (a[c].listener === b) return c;
     return -1
    }
   
    function c(a) {
     return function() {
      return this[a].apply(this, arguments)
     }
    }
    var d = a.prototype,
     e = this,
     f = e.EventEmitter;
    d.getListeners = function(a) {
     var b, c, d = this._getEvents();
     if (a instanceof RegExp) {
      b = {};
      for (c in d) d.hasOwnProperty(c) && a.test(c) && (b[c] = d[c])
     } else b = d[a] || (d[a] = []);
     return b
    }, d.flattenListeners = function(a) {
     var b, c = [];
     for (b = 0; b < a.length; b += 1) c.push(a[b].listener);
     return c
    }, d.getListenersAsObject = function(a) {
     var b, c = this.getListeners(a);
     return c instanceof Array && (b = {}, b[a] = c), b || c
    }, d.addListener = function(a, c) {
     var d, e = this.getListenersAsObject(a),
      f = "object" == typeof c;
     for (d in e) e.hasOwnProperty(d) && -1 === b(e[d], c) && e[d].push(f ? c : {
      listener: c,
      once: !1
     });
     return this
    }, d.on = c("addListener"), d.addOnceListener = function(a, b) {
     return this.addListener(a, {
      listener: b,
      once: !0
     })
    }, d.once = c("addOnceListener"), d.defineEvent = function(a) {
     return this.getListeners(a), this
    }, d.defineEvents = function(a) {
     for (var b = 0; b < a.length; b += 1) this.defineEvent(a[b]);
     return this
    }, d.removeListener = function(a, c) {
     var d, e, f = this.getListenersAsObject(a);
     for (e in f) f.hasOwnProperty(e) && (d = b(f[e], c), -1 !== d && f[e].splice(d, 1));
     return this
    }, d.off = c("removeListener"), d.addListeners = function(a, b) {
     return this.manipulateListeners(!1, a, b)
    }, d.removeListeners = function(a, b) {
     return this.manipulateListeners(!0, a, b)
    }, d.manipulateListeners = function(a, b, c) {
     var d, e, f = a ? this.removeListener : this.addListener,
      g = a ? this.removeListeners : this.addListeners;
     if ("object" != typeof b || b instanceof RegExp)
      for (d = c.length; d--;) f.call(this, b, c[d]);
     else
      for (d in b) b.hasOwnProperty(d) && (e = b[d]) && ("function" == typeof e ? f.call(this, d, e) : g.call(this, d, e));
     return this
    }, d.removeEvent = function(a) {
     var b, c = typeof a,
      d = this._getEvents();
     if ("string" === c) delete d[a];
     else if (a instanceof RegExp)
      for (b in d) d.hasOwnProperty(b) && a.test(b) && delete d[b];
     else delete this._events;
     return this
    }, d.removeAllListeners = c("removeEvent"), d.emitEvent = function(a, b) {
     var c, d, e, f, g = this.getListenersAsObject(a);
     for (e in g)
      if (g.hasOwnProperty(e))
       for (d = g[e].length; d--;) c = g[e][d], c.once === !0 && this.removeListener(a, c.listener), f = c.listener.apply(this, b || []), f === this._getOnceReturnValue() && this.removeListener(a, c.listener);
     return this
    }, d.trigger = c("emitEvent"), d.emit = function(a) {
     var b = Array.prototype.slice.call(arguments, 1);
     return this.emitEvent(a, b)
    }, d.setOnceReturnValue = function(a) {
     return this._onceReturnValue = a, this
    }, d._getOnceReturnValue = function() {
     return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }, d._getEvents = function() {
     return this._events || (this._events = {})
    }, a.noConflict = function() {
     return e.EventEmitter = f, a
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
     return a
    }) : "object" == typeof module && module.exports ? module.exports = a : e.EventEmitter = a
   }.call(this),
    function(a) {
     function b(a) {
      if (a) {
       if ("string" == typeof d[a]) return a;
       a = a.charAt(0).toUpperCase() + a.slice(1);
       for (var b, e = 0, f = c.length; f > e; e++)
        if (b = c[e] + a, "string" == typeof d[b]) return b
      }
     }
     var c = "Webkit Moz ms Ms O".split(" "),
      d = document.documentElement.style;
     "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function() {
      return b
     }) : "object" == typeof exports ? module.exports = b : a.getStyleProperty = b
    }(window),
    function(a, b) {
     function c(a) {
      var b = parseFloat(a),
       c = -1 === a.indexOf("%") && !isNaN(b);
      return c && b
     }
   
     function d() {}
   
     function e() {
      for (var a = {
        width: 0,
        height: 0,
        innerWidth: 0,
        innerHeight: 0,
        outerWidth: 0,
        outerHeight: 0
       }, b = 0, c = h.length; c > b; b++) {
       var d = h[b];
       a[d] = 0
      }
      return a
     }
   
     function f(b) {
      function d() {
       if (!m) {
        m = !0;
        var d = a.getComputedStyle;
        if (j = function() {
          var a = d ? function(a) {
           return d(a, null)
          } : function(a) {
           return a.currentStyle
          };
          return function(b) {
           var c = a(b);
           return c || g("Style returned " + c + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), c
          }
         }(), k = b("boxSizing")) {
         var e = document.createElement("div");
         e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style[k] = "border-box";
         var f = document.body || document.documentElement;
         f.appendChild(e);
         var h = j(e);
         l = 200 === c(h.width), f.removeChild(e)
        }
       }
      }
   
      function f(a) {
       if (d(), "string" == typeof a && (a = document.querySelector(a)), a && "object" == typeof a && a.nodeType) {
        var b = j(a);
        if ("none" === b.display) return e();
        var f = {};
        f.width = a.offsetWidth, f.height = a.offsetHeight;
        for (var g = f.isBorderBox = !(!k || !b[k] || "border-box" !== b[k]), m = 0, n = h.length; n > m; m++) {
         var o = h[m],
          p = b[o];
         p = i(a, p);
         var q = parseFloat(p);
         f[o] = isNaN(q) ? 0 : q
        }
        var r = f.paddingLeft + f.paddingRight,
         s = f.paddingTop + f.paddingBottom,
         t = f.marginLeft + f.marginRight,
         u = f.marginTop + f.marginBottom,
         v = f.borderLeftWidth + f.borderRightWidth,
         w = f.borderTopWidth + f.borderBottomWidth,
         x = g && l,
         y = c(b.width);
        y !== !1 && (f.width = y + (x ? 0 : r + v));
        var z = c(b.height);
        return z !== !1 && (f.height = z + (x ? 0 : s + w)), f.innerWidth = f.width - (r + v), f.innerHeight = f.height - (s + w), f.outerWidth = f.width + t, f.outerHeight = f.height + u, f
       }
      }
   
      function i(b, c) {
       if (a.getComputedStyle || -1 === c.indexOf("%")) return c;
       var d = b.style,
        e = d.left,
        f = b.runtimeStyle,
        g = f && f.left;
       return g && (f.left = b.currentStyle.left), d.left = c, c = d.pixelLeft, d.left = e, g && (f.left = g), c
      }
      var j, k, l, m = !1;
      return f
     }
     var g = "undefined" == typeof console ? d : function(a) {
       console.error(a)
      },
      h = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
     "function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], f) : "object" == typeof exports ? module.exports = f(require("desandro-get-style-property")) : a.getSize = f(a.getStyleProperty)
    }(window),
    function(a) {
     function b(a) {
      "function" == typeof a && (b.isReady ? a() : g.push(a))
     }
   
     function c(a) {
      var c = "readystatechange" === a.type && "complete" !== f.readyState;
      b.isReady || c || d()
     }
   
     function d() {
      b.isReady = !0;
      for (var a = 0, c = g.length; c > a; a++) {
       var d = g[a];
       d()
      }
     }
   
     function e(e) {
      return "complete" === f.readyState ? d() : (e.bind(f, "DOMContentLoaded", c), e.bind(f, "readystatechange", c), e.bind(a, "load", c)), b
     }
     var f = a.document,
      g = [];
     b.isReady = !1, "function" == typeof define && define.amd ? define("doc-ready/doc-ready", ["eventie/eventie"], e) : "object" == typeof exports ? module.exports = e(require("eventie")) : a.docReady = e(a.eventie)
    }(window),
    function(a) {
     "use strict";
   
     function b(a, b) {
      return a[g](b)
     }
   
     function c(a) {
      if (!a.parentNode) {
       var b = document.createDocumentFragment();
       b.appendChild(a)
      }
     }
   
     function d(a, b) {
      c(a);
      for (var d = a.parentNode.querySelectorAll(b), e = 0, f = d.length; f > e; e++)
       if (d[e] === a) return !0;
      return !1
     }
   
     function e(a, d) {
      return c(a), b(a, d)
     }
     var f, g = function() {
      if (a.matches) return "matches";
      if (a.matchesSelector) return "matchesSelector";
      for (var b = ["webkit", "moz", "ms", "o"], c = 0, d = b.length; d > c; c++) {
       var e = b[c],
        f = e + "MatchesSelector";
       if (a[f]) return f
      }
     }();
     if (g) {
      var h = document.createElement("div"),
       i = b(h, "div");
      f = i ? b : e
     } else f = d;
     "function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function() {
      return f
     }) : "object" == typeof exports ? module.exports = f : window.matchesSelector = f
    }(Element.prototype),
    function(a, b) {
     "use strict";
     "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["doc-ready/doc-ready", "matches-selector/matches-selector"], function(c, d) {
      return b(a, c, d)
     }) : "object" == typeof exports ? module.exports = b(a, require("doc-ready"), require("desandro-matches-selector")) : a.fizzyUIUtils = b(a, a.docReady, a.matchesSelector)
    }(window, function(a, b, c) {
     var d = {};
     d.extend = function(a, b) {
      for (var c in b) a[c] = b[c];
      return a
     }, d.modulo = function(a, b) {
      return (a % b + b) % b
     };
     var e = Object.prototype.toString;
     d.isArray = function(a) {
      return "[object Array]" == e.call(a)
     }, d.makeArray = function(a) {
      var b = [];
      if (d.isArray(a)) b = a;
      else if (a && "number" == typeof a.length)
       for (var c = 0, e = a.length; e > c; c++) b.push(a[c]);
      else b.push(a);
      return b
     }, d.indexOf = Array.prototype.indexOf ? function(a, b) {
      return a.indexOf(b)
     } : function(a, b) {
      for (var c = 0, d = a.length; d > c; c++)
       if (a[c] === b) return c;
      return -1
     }, d.removeFrom = function(a, b) {
      var c = d.indexOf(a, b); - 1 != c && a.splice(c, 1)
     }, d.isElement = "function" == typeof HTMLElement || "object" == typeof HTMLElement ? function(a) {
      return a instanceof HTMLElement
     } : function(a) {
      return a && "object" == typeof a && 1 == a.nodeType && "string" == typeof a.nodeName
     }, d.setText = function() {
      function a(a, c) {
       b = b || (void 0 !== document.documentElement.textContent ? "textContent" : "innerText"), a[b] = c
      }
      var b;
      return a
     }(), d.getParent = function(a, b) {
      for (; a != document.body;)
       if (a = a.parentNode, c(a, b)) return a
     }, d.getQueryElement = function(a) {
      return "string" == typeof a ? document.querySelector(a) : a
     }, d.handleEvent = function(a) {
      var b = "on" + a.type;
      this[b] && this[b](a)
     }, d.filterFindElements = function(a, b) {
      a = d.makeArray(a);
      for (var e = [], f = 0, g = a.length; g > f; f++) {
       var h = a[f];
       if (d.isElement(h))
        if (b) {
         c(h, b) && e.push(h);
         for (var i = h.querySelectorAll(b), j = 0, k = i.length; k > j; j++) e.push(i[j])
        } else e.push(h)
      }
      return e
     }, d.debounceMethod = function(a, b, c) {
      var d = a.prototype[b],
       e = b + "Timeout";
      a.prototype[b] = function() {
       var a = this[e];
       a && clearTimeout(a);
       var b = arguments,
        f = this;
       this[e] = setTimeout(function() {
        d.apply(f, b), delete f[e]
       }, c || 100)
      }
     }, d.toDashed = function(a) {
      return a.replace(/(.)([A-Z])/g, function(a, b, c) {
       return b + "-" + c
      }).toLowerCase()
     };
     var f = a.console;
     return d.htmlInit = function(c, e) {
      b(function() {
       for (var b = d.toDashed(e), g = document.querySelectorAll(".js-" + b), h = "data-" + b + "-options", i = 0, j = g.length; j > i; i++) {
        var k, l = g[i],
         m = l.getAttribute(h);
        try {
         k = m && JSON.parse(m)
        } catch (n) {
         f && f.error("Error parsing " + h + " on " + l.nodeName.toLowerCase() + (l.id ? "#" + l.id : "") + ": " + n);
         continue
        }
        var o = new c(l, k),
         p = a.jQuery;
        p && p.data(l, e, o)
       }
      })
     }, d
    }),
    function(a, b) {
     "use strict";
     "function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property", "fizzy-ui-utils/utils"], function(c, d, e, f) {
      return b(a, c, d, e, f)
     }) : "object" == typeof exports ? module.exports = b(a, require("wolfy87-eventemitter"), require("get-size"), require("desandro-get-style-property"), require("fizzy-ui-utils")) : (a.Outlayer = {}, a.Outlayer.Item = b(a, a.EventEmitter, a.getSize, a.getStyleProperty, a.fizzyUIUtils))
    }(window, function(a, b, c, d, e) {
     "use strict";
   
     function f(a) {
      for (var b in a) return !1;
      return b = null, !0
     }
   
     function g(a, b) {
      a && (this.element = a, this.layout = b, this.position = {
       x: 0,
       y: 0
      }, this._create())
     }
   
     function h(a) {
      return a.replace(/([A-Z])/g, function(a) {
       return "-" + a.toLowerCase()
      })
     }
     var i = a.getComputedStyle,
      j = i ? function(a) {
       return i(a, null)
      } : function(a) {
       return a.currentStyle
      },
      k = d("transition"),
      l = d("transform"),
      m = k && l,
      n = !!d("perspective"),
      o = {
       WebkitTransition: "webkitTransitionEnd",
       MozTransition: "transitionend",
       OTransition: "otransitionend",
       transition: "transitionend"
      } [k],
      p = ["transform", "transition", "transitionDuration", "transitionProperty"],
      q = function() {
       for (var a = {}, b = 0, c = p.length; c > b; b++) {
        var e = p[b],
         f = d(e);
        f && f !== e && (a[e] = f)
       }
       return a
      }();
     e.extend(g.prototype, b.prototype), g.prototype._create = function() {
      this._transn = {
       ingProperties: {},
       clean: {},
       onEnd: {}
      }, this.css({
       position: "absolute"
      })
     }, g.prototype.handleEvent = function(a) {
      var b = "on" + a.type;
      this[b] && this[b](a)
     }, g.prototype.getSize = function() {
      this.size = c(this.element)
     }, g.prototype.css = function(a) {
      var b = this.element.style;
      for (var c in a) {
       var d = q[c] || c;
       b[d] = a[c]
      }
     }, g.prototype.getPosition = function() {
      var a = j(this.element),
       b = this.layout.options,
       c = b.isOriginLeft,
       d = b.isOriginTop,
       e = a[c ? "left" : "right"],
       f = a[d ? "top" : "bottom"],
       g = this.layout.size,
       h = -1 != e.indexOf("%") ? parseFloat(e) / 100 * g.width : parseInt(e, 10),
       i = -1 != f.indexOf("%") ? parseFloat(f) / 100 * g.height : parseInt(f, 10);
      h = isNaN(h) ? 0 : h, i = isNaN(i) ? 0 : i, h -= c ? g.paddingLeft : g.paddingRight, i -= d ? g.paddingTop : g.paddingBottom, this.position.x = h, this.position.y = i
     }, g.prototype.layoutPosition = function() {
      var a = this.layout.size,
       b = this.layout.options,
       c = {},
       d = b.isOriginLeft ? "paddingLeft" : "paddingRight",
       e = b.isOriginLeft ? "left" : "right",
       f = b.isOriginLeft ? "right" : "left",
       g = this.position.x + a[d];
      c[e] = this.getXValue(g), c[f] = "";
      var h = b.isOriginTop ? "paddingTop" : "paddingBottom",
       i = b.isOriginTop ? "top" : "bottom",
       j = b.isOriginTop ? "bottom" : "top",
       k = this.position.y + a[h];
      c[i] = this.getYValue(k), c[j] = "", this.css(c), this.emitEvent("layout", [this])
     }, g.prototype.getXValue = function(a) {
      var b = this.layout.options;
      return b.percentPosition && !b.isHorizontal ? a / this.layout.size.width * 100 + "%" : a + "px"
     }, g.prototype.getYValue = function(a) {
      var b = this.layout.options;
      return b.percentPosition && b.isHorizontal ? a / this.layout.size.height * 100 + "%" : a + "px"
     }, g.prototype._transitionTo = function(a, b) {
      this.getPosition();
      var c = this.position.x,
       d = this.position.y,
       e = parseInt(a, 10),
       f = parseInt(b, 10),
       g = e === this.position.x && f === this.position.y;
      if (this.setPosition(a, b), g && !this.isTransitioning) return void this.layoutPosition();
      var h = a - c,
       i = b - d,
       j = {};
      j.transform = this.getTranslate(h, i), this.transition({
       to: j,
       onTransitionEnd: {
        transform: this.layoutPosition
       },
       isCleaning: !0
      })
     }, g.prototype.getTranslate = function(a, b) {
      var c = this.layout.options;
      return a = c.isOriginLeft ? a : -a, b = c.isOriginTop ? b : -b, n ? "translate3d(" + a + "px, " + b + "px, 0)" : "translate(" + a + "px, " + b + "px)"
     }, g.prototype.goTo = function(a, b) {
      this.setPosition(a, b), this.layoutPosition()
     }, g.prototype.moveTo = m ? g.prototype._transitionTo : g.prototype.goTo, g.prototype.setPosition = function(a, b) {
      this.position.x = parseInt(a, 10), this.position.y = parseInt(b, 10)
     }, g.prototype._nonTransition = function(a) {
      this.css(a.to), a.isCleaning && this._removeStyles(a.to);
      for (var b in a.onTransitionEnd) a.onTransitionEnd[b].call(this)
     }, g.prototype._transition = function(a) {
      if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(a);
      var b = this._transn;
      for (var c in a.onTransitionEnd) b.onEnd[c] = a.onTransitionEnd[c];
      for (c in a.to) b.ingProperties[c] = !0, a.isCleaning && (b.clean[c] = !0);
      if (a.from) {
       this.css(a.from);
       var d = this.element.offsetHeight;
       d = null
      }
      this.enableTransition(a.to), this.css(a.to), this.isTransitioning = !0
     };
     var r = "opacity," + h(q.transform || "transform");
     g.prototype.enableTransition = function() {
      this.isTransitioning || (this.css({
       transitionProperty: r,
       transitionDuration: this.layout.options.transitionDuration
      }), this.element.addEventListener(o, this, !1))
     }, g.prototype.transition = g.prototype[k ? "_transition" : "_nonTransition"], g.prototype.onwebkitTransitionEnd = function(a) {
      this.ontransitionend(a)
     }, g.prototype.onotransitionend = function(a) {
      this.ontransitionend(a)
     };
     var s = {
      "-webkit-transform": "transform",
      "-moz-transform": "transform",
      "-o-transform": "transform"
     };
     g.prototype.ontransitionend = function(a) {
      if (a.target === this.element) {
       var b = this._transn,
        c = s[a.propertyName] || a.propertyName;
       if (delete b.ingProperties[c], f(b.ingProperties) && this.disableTransition(), c in b.clean && (this.element.style[a.propertyName] = "", delete b.clean[c]), c in b.onEnd) {
        var d = b.onEnd[c];
        d.call(this), delete b.onEnd[c]
       }
       this.emitEvent("transitionEnd", [this])
      }
     }, g.prototype.disableTransition = function() {
      this.removeTransitionStyles(), this.element.removeEventListener(o, this, !1), this.isTransitioning = !1
     }, g.prototype._removeStyles = function(a) {
      var b = {};
      for (var c in a) b[c] = "";
      this.css(b)
     };
     var t = {
      transitionProperty: "",
      transitionDuration: ""
     };
     return g.prototype.removeTransitionStyles = function() {
      this.css(t)
     }, g.prototype.removeElem = function() {
      this.element.parentNode.removeChild(this.element), this.css({
       display: ""
      }), this.emitEvent("remove", [this])
     }, g.prototype.remove = function() {
      if (!k || !parseFloat(this.layout.options.transitionDuration)) return void this.removeElem();
      var a = this;
      this.once("transitionEnd", function() {
       a.removeElem()
      }), this.hide()
     }, g.prototype.reveal = function() {
      delete this.isHidden, this.css({
       display: ""
      });
      var a = this.layout.options,
       b = {},
       c = this.getHideRevealTransitionEndProperty("visibleStyle");
      b[c] = this.onRevealTransitionEnd, this.transition({
       from: a.hiddenStyle,
       to: a.visibleStyle,
       isCleaning: !0,
       onTransitionEnd: b
      })
     }, g.prototype.onRevealTransitionEnd = function() {
      this.isHidden || this.emitEvent("reveal")
     }, g.prototype.getHideRevealTransitionEndProperty = function(a) {
      var b = this.layout.options[a];
      if (b.opacity) return "opacity";
      for (var c in b) return c
     }, g.prototype.hide = function() {
      this.isHidden = !0, this.css({
       display: ""
      });
      var a = this.layout.options,
       b = {},
       c = this.getHideRevealTransitionEndProperty("hiddenStyle");
      b[c] = this.onHideTransitionEnd, this.transition({
       from: a.visibleStyle,
       to: a.hiddenStyle,
       isCleaning: !0,
       onTransitionEnd: b
      })
     }, g.prototype.onHideTransitionEnd = function() {
      this.isHidden && (this.css({
       display: "none"
      }), this.emitEvent("hide"))
     }, g.prototype.destroy = function() {
      this.css({
       position: "",
       left: "",
       right: "",
       top: "",
       bottom: "",
       transition: "",
       transform: ""
      })
     }, g
    }),
    function(a, b) {
     "use strict";
     "function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie", "eventEmitter/EventEmitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(c, d, e, f, g) {
      return b(a, c, d, e, f, g)
     }) : "object" == typeof exports ? module.exports = b(a, require("eventie"), require("wolfy87-eventemitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : a.Outlayer = b(a, a.eventie, a.EventEmitter, a.getSize, a.fizzyUIUtils, a.Outlayer.Item)
    }(window, function(a, b, c, d, e, f) {
     "use strict";
   
     function g(a, b) {
      var c = e.getQueryElement(a);
      if (!c) return void(h && h.error("Bad element for " + this.constructor.namespace + ": " + (c || a)));
      this.element = c, i && (this.$element = i(this.element)), this.options = e.extend({}, this.constructor.defaults), this.option(b);
      var d = ++k;
      this.element.outlayerGUID = d, l[d] = this, this._create(), this.options.isInitLayout && this.layout()
     }
     var h = a.console,
      i = a.jQuery,
      j = function() {},
      k = 0,
      l = {};
     return g.namespace = "outlayer", g.Item = f, g.defaults = {
      containerStyle: {
       position: "relative"
      },
      isInitLayout: !0,
      isOriginLeft: !0,
      isOriginTop: !0,
      isResizeBound: !0,
      isResizingContainer: !0,
      transitionDuration: "0.4s",
      hiddenStyle: {
       opacity: 0,
       transform: "scale(0.001)"
      },
      visibleStyle: {
       opacity: 1,
       transform: "scale(1)"
      }
     }, e.extend(g.prototype, c.prototype), g.prototype.option = function(a) {
      e.extend(this.options, a)
     }, g.prototype._create = function() {
      this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), e.extend(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize()
     }, g.prototype.reloadItems = function() {
      this.items = this._itemize(this.element.children)
     }, g.prototype._itemize = function(a) {
      for (var b = this._filterFindItemElements(a), c = this.constructor.Item, d = [], e = 0, f = b.length; f > e; e++) {
       var g = b[e],
        h = new c(g, this);
       d.push(h)
      }
      return d
     }, g.prototype._filterFindItemElements = function(a) {
      return e.filterFindElements(a, this.options.itemSelector)
     }, g.prototype.getItemElements = function() {
      for (var a = [], b = 0, c = this.items.length; c > b; b++) a.push(this.items[b].element);
      return a
     }, g.prototype.layout = function() {
      this._resetLayout(), this._manageStamps();
      var a = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
      this.layoutItems(this.items, a), this._isLayoutInited = !0
     }, g.prototype._init = g.prototype.layout, g.prototype._resetLayout = function() {
      this.getSize()
     }, g.prototype.getSize = function() {
      this.size = d(this.element)
     }, g.prototype._getMeasurement = function(a, b) {
      var c, f = this.options[a];
      f ? ("string" == typeof f ? c = this.element.querySelector(f) : e.isElement(f) && (c = f), this[a] = c ? d(c)[b] : f) : this[a] = 0
     }, g.prototype.layoutItems = function(a, b) {
      a = this._getItemsForLayout(a), this._layoutItems(a, b), this._postLayout()
     }, g.prototype._getItemsForLayout = function(a) {
      for (var b = [], c = 0, d = a.length; d > c; c++) {
       var e = a[c];
       e.isIgnored || b.push(e)
      }
      return b
     }, g.prototype._layoutItems = function(a, b) {
      if (this._emitCompleteOnItems("layout", a), a && a.length) {
       for (var c = [], d = 0, e = a.length; e > d; d++) {
        var f = a[d],
         g = this._getItemLayoutPosition(f);
        g.item = f, g.isInstant = b || f.isLayoutInstant, c.push(g)
       }
       this._processLayoutQueue(c)
      }
     }, g.prototype._getItemLayoutPosition = function() {
      return {
       x: 0,
       y: 0
      }
     }, g.prototype._processLayoutQueue = function(a) {
      for (var b = 0, c = a.length; c > b; b++) {
       var d = a[b];
       this._positionItem(d.item, d.x, d.y, d.isInstant)
      }
     }, g.prototype._positionItem = function(a, b, c, d) {
      d ? a.goTo(b, c) : a.moveTo(b, c)
     }, g.prototype._postLayout = function() {
      this.resizeContainer()
     }, g.prototype.resizeContainer = function() {
      if (this.options.isResizingContainer) {
       var a = this._getContainerSize();
       a && (this._setContainerMeasure(a.width, !0), this._setContainerMeasure(a.height, !1))
      }
     }, g.prototype._getContainerSize = j, g.prototype._setContainerMeasure = function(a, b) {
      if (void 0 !== a) {
       var c = this.size;
       c.isBorderBox && (a += b ? c.paddingLeft + c.paddingRight + c.borderLeftWidth + c.borderRightWidth : c.paddingBottom + c.paddingTop + c.borderTopWidth + c.borderBottomWidth), a = Math.max(a, 0), this.element.style[b ? "width" : "height"] = a + "px"
      }
     }, g.prototype._emitCompleteOnItems = function(a, b) {
      function c() {
       e.dispatchEvent(a + "Complete", null, [b])
      }
   
      function d() {
       g++, g === f && c()
      }
      var e = this,
       f = b.length;
      if (!b || !f) return void c();
      for (var g = 0, h = 0, i = b.length; i > h; h++) {
       var j = b[h];
       j.once(a, d)
      }
     }, g.prototype.dispatchEvent = function(a, b, c) {
      var d = b ? [b].concat(c) : c;
      if (this.emitEvent(a, d), i)
       if (this.$element = this.$element || i(this.element), b) {
        var e = i.Event(b);
        e.type = a, this.$element.trigger(e, c)
       } else this.$element.trigger(a, c)
     }, g.prototype.ignore = function(a) {
      var b = this.getItem(a);
      b && (b.isIgnored = !0)
     }, g.prototype.unignore = function(a) {
      var b = this.getItem(a);
      b && delete b.isIgnored
     }, g.prototype.stamp = function(a) {
      if (a = this._find(a)) {
       this.stamps = this.stamps.concat(a);
       for (var b = 0, c = a.length; c > b; b++) {
        var d = a[b];
        this.ignore(d)
       }
      }
     }, g.prototype.unstamp = function(a) {
      if (a = this._find(a))
       for (var b = 0, c = a.length; c > b; b++) {
        var d = a[b];
        e.removeFrom(this.stamps, d), this.unignore(d)
       }
     }, g.prototype._find = function(a) {
      return a ? ("string" == typeof a && (a = this.element.querySelectorAll(a)), a = e.makeArray(a)) : void 0
     }, g.prototype._manageStamps = function() {
      if (this.stamps && this.stamps.length) {
       this._getBoundingRect();
       for (var a = 0, b = this.stamps.length; b > a; a++) {
        var c = this.stamps[a];
        this._manageStamp(c)
       }
      }
     }, g.prototype._getBoundingRect = function() {
      var a = this.element.getBoundingClientRect(),
       b = this.size;
      this._boundingRect = {
       left: a.left + b.paddingLeft + b.borderLeftWidth,
       top: a.top + b.paddingTop + b.borderTopWidth,
       right: a.right - (b.paddingRight + b.borderRightWidth),
       bottom: a.bottom - (b.paddingBottom + b.borderBottomWidth)
      }
     }, g.prototype._manageStamp = j, g.prototype._getElementOffset = function(a) {
      var b = a.getBoundingClientRect(),
       c = this._boundingRect,
       e = d(a),
       f = {
        left: b.left - c.left - e.marginLeft,
        top: b.top - c.top - e.marginTop,
        right: c.right - b.right - e.marginRight,
        bottom: c.bottom - b.bottom - e.marginBottom
       };
      return f
     }, g.prototype.handleEvent = function(a) {
      var b = "on" + a.type;
      this[b] && this[b](a)
     }, g.prototype.bindResize = function() {
      this.isResizeBound || (b.bind(a, "resize", this), this.isResizeBound = !0)
     }, g.prototype.unbindResize = function() {
      this.isResizeBound && b.unbind(a, "resize", this), this.isResizeBound = !1
     }, g.prototype.onresize = function() {
      function a() {
       b.resize(), delete b.resizeTimeout
      }
      this.resizeTimeout && clearTimeout(this.resizeTimeout);
      var b = this;
      this.resizeTimeout = setTimeout(a, 100)
     }, g.prototype.resize = function() {
      this.isResizeBound && this.needsResizeLayout() && this.layout()
     }, g.prototype.needsResizeLayout = function() {
      var a = d(this.element),
       b = this.size && a;
      return b && a.innerWidth !== this.size.innerWidth
     }, g.prototype.addItems = function(a) {
      var b = this._itemize(a);
      return b.length && (this.items = this.items.concat(b)), b
     }, g.prototype.appended = function(a) {
      var b = this.addItems(a);
      b.length && (this.layoutItems(b, !0), this.reveal(b))
     }, g.prototype.prepended = function(a) {
      var b = this._itemize(a);
      if (b.length) {
       var c = this.items.slice(0);
       this.items = b.concat(c), this._resetLayout(), this._manageStamps(), this.layoutItems(b, !0), this.reveal(b), this.layoutItems(c)
      }
     }, g.prototype.reveal = function(a) {
      this._emitCompleteOnItems("reveal", a);
      for (var b = a && a.length, c = 0; b && b > c; c++) {
       var d = a[c];
       d.reveal()
      }
     }, g.prototype.hide = function(a) {
      this._emitCompleteOnItems("hide", a);
      for (var b = a && a.length, c = 0; b && b > c; c++) {
       var d = a[c];
       d.hide()
      }
     }, g.prototype.revealItemElements = function(a) {
      var b = this.getItems(a);
      this.reveal(b)
     }, g.prototype.hideItemElements = function(a) {
      var b = this.getItems(a);
      this.hide(b)
     }, g.prototype.getItem = function(a) {
      for (var b = 0, c = this.items.length; c > b; b++) {
       var d = this.items[b];
       if (d.element === a) return d
      }
     }, g.prototype.getItems = function(a) {
      a = e.makeArray(a);
      for (var b = [], c = 0, d = a.length; d > c; c++) {
       var f = a[c],
        g = this.getItem(f);
       g && b.push(g)
      }
      return b
     }, g.prototype.remove = function(a) {
      var b = this.getItems(a);
      if (this._emitCompleteOnItems("remove", b), b && b.length)
       for (var c = 0, d = b.length; d > c; c++) {
        var f = b[c];
        f.remove(), e.removeFrom(this.items, f)
       }
     }, g.prototype.destroy = function() {
      var a = this.element.style;
      a.height = "", a.position = "", a.width = "";
      for (var b = 0, c = this.items.length; c > b; b++) {
       var d = this.items[b];
       d.destroy()
      }
      this.unbindResize();
      var e = this.element.outlayerGUID;
      delete l[e], delete this.element.outlayerGUID, i && i.removeData(this.element, this.constructor.namespace)
     }, g.data = function(a) {
      a = e.getQueryElement(a);
      var b = a && a.outlayerGUID;
      return b && l[b]
     }, g.create = function(a, b) {
      function c() {
       g.apply(this, arguments)
      }
      return Object.create ? c.prototype = Object.create(g.prototype) : e.extend(c.prototype, g.prototype), c.prototype.constructor = c, c.defaults = e.extend({}, g.defaults), e.extend(c.defaults, b), c.prototype.settings = {}, c.namespace = a, c.data = g.data, c.Item = function() {
       f.apply(this, arguments)
      }, c.Item.prototype = new f, e.htmlInit(c, a), i && i.bridget && i.bridget(a, c), c
     }, g.Item = f, g
    }),
    function(a, b) {
     "use strict";
     "function" == typeof define && define.amd ? define("isotope/js/item", ["outlayer/outlayer"], b) : "object" == typeof exports ? module.exports = b(require("outlayer")) : (a.Isotope = a.Isotope || {}, a.Isotope.Item = b(a.Outlayer))
    }(window, function(a) {
     "use strict";
   
     function b() {
      a.Item.apply(this, arguments)
     }
     b.prototype = new a.Item, b.prototype._create = function() {
      this.id = this.layout.itemGUID++, a.Item.prototype._create.call(this), this.sortData = {}
     }, b.prototype.updateSortData = function() {
      if (!this.isIgnored) {
       this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
       var a = this.layout.options.getSortData,
        b = this.layout._sorters;
       for (var c in a) {
        var d = b[c];
        this.sortData[c] = d(this.element, this)
       }
      }
     };
     var c = b.prototype.destroy;
     return b.prototype.destroy = function() {
      c.apply(this, arguments), this.css({
       display: ""
      })
     }, b
    }),
    function(a, b) {
     "use strict";
     "function" == typeof define && define.amd ? define("isotope/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], b) : "object" == typeof exports ? module.exports = b(require("get-size"), require("outlayer")) : (a.Isotope = a.Isotope || {}, a.Isotope.LayoutMode = b(a.getSize, a.Outlayer))
    }(window, function(a, b) {
     "use strict";
   
     function c(a) {
      this.isotope = a, a && (this.options = a.options[this.namespace], this.element = a.element, this.items = a.filteredItems, this.size = a.size)
     }
     return function() {
      function a(a) {
       return function() {
        return b.prototype[a].apply(this.isotope, arguments)
       }
      }
      for (var d = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout"], e = 0, f = d.length; f > e; e++) {
       var g = d[e];
       c.prototype[g] = a(g)
      }
     }(), c.prototype.needsVerticalResizeLayout = function() {
      var b = a(this.isotope.element),
       c = this.isotope.size && b;
      return c && b.innerHeight != this.isotope.size.innerHeight
     }, c.prototype._getMeasurement = function() {
      this.isotope._getMeasurement.apply(this, arguments)
     }, c.prototype.getColumnWidth = function() {
      this.getSegmentSize("column", "Width")
     }, c.prototype.getRowHeight = function() {
      this.getSegmentSize("row", "Height")
     }, c.prototype.getSegmentSize = function(a, b) {
      var c = a + b,
       d = "outer" + b;
      if (this._getMeasurement(c, d), !this[c]) {
       var e = this.getFirstItemSize();
       this[c] = e && e[d] || this.isotope.size["inner" + b]
      }
     }, c.prototype.getFirstItemSize = function() {
      var b = this.isotope.filteredItems[0];
      return b && b.element && a(b.element)
     }, c.prototype.layout = function() {
      this.isotope.layout.apply(this.isotope, arguments)
     }, c.prototype.getSize = function() {
      this.isotope.getSize(), this.size = this.isotope.size
     }, c.modes = {}, c.create = function(a, b) {
      function d() {
       c.apply(this, arguments)
      }
      return d.prototype = new c, b && (d.options = b), d.prototype.namespace = a, c.modes[a] = d, d
     }, c
    }),
    function(a, b) {
     "use strict";
     "function" == typeof define && define.amd ? define("masonry/masonry", ["outlayer/outlayer", "get-size/get-size", "fizzy-ui-utils/utils"], b) : "object" == typeof exports ? module.exports = b(require("outlayer"), require("get-size"), require("fizzy-ui-utils")) : a.Masonry = b(a.Outlayer, a.getSize, a.fizzyUIUtils)
    }(window, function(a, b, c) {
     var d = a.create("masonry");
     return d.prototype._resetLayout = function() {
      this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
      var a = this.cols;
      for (this.colYs = []; a--;) this.colYs.push(0);
      this.maxY = 0
     }, d.prototype.measureColumns = function() {
      if (this.getContainerWidth(), !this.columnWidth) {
       var a = this.items[0],
        c = a && a.element;
       this.columnWidth = c && b(c).outerWidth || this.containerWidth
      }
      var d = this.columnWidth += this.gutter,
       e = this.containerWidth + this.gutter,
       f = e / d,
       g = d - e % d,
       h = g && 1 > g ? "round" : "floor";
      f = Math[h](f), this.cols = Math.max(f, 1)
     }, d.prototype.getContainerWidth = function() {
      var a = this.options.isFitWidth ? this.element.parentNode : this.element,
       c = b(a);
      this.containerWidth = c && c.innerWidth
     }, d.prototype._getItemLayoutPosition = function(a) {
      a.getSize();
      var b = a.size.outerWidth % this.columnWidth,
       d = b && 1 > b ? "round" : "ceil",
       e = Math[d](a.size.outerWidth / this.columnWidth);
      e = Math.min(e, this.cols);
      for (var f = this._getColGroup(e), g = Math.min.apply(Math, f), h = c.indexOf(f, g), i = {
        x: this.columnWidth * h,
        y: g
       }, j = g + a.size.outerHeight, k = this.cols + 1 - f.length, l = 0; k > l; l++) this.colYs[h + l] = j;
      return i
     }, d.prototype._getColGroup = function(a) {
      if (2 > a) return this.colYs;
      for (var b = [], c = this.cols + 1 - a, d = 0; c > d; d++) {
       var e = this.colYs.slice(d, d + a);
       b[d] = Math.max.apply(Math, e)
      }
      return b
     }, d.prototype._manageStamp = function(a) {
      var c = b(a),
       d = this._getElementOffset(a),
       e = this.options.isOriginLeft ? d.left : d.right,
       f = e + c.outerWidth,
       g = Math.floor(e / this.columnWidth);
      g = Math.max(0, g);
      var h = Math.floor(f / this.columnWidth);
      h -= f % this.columnWidth ? 0 : 1, h = Math.min(this.cols - 1, h);
      for (var i = (this.options.isOriginTop ? d.top : d.bottom) + c.outerHeight, j = g; h >= j; j++) this.colYs[j] = Math.max(i, this.colYs[j])
     }, d.prototype._getContainerSize = function() {
      this.maxY = Math.max.apply(Math, this.colYs);
      var a = {
       height: this.maxY
      };
      return this.options.isFitWidth && (a.width = this._getContainerFitWidth()), a
     }, d.prototype._getContainerFitWidth = function() {
      for (var a = 0, b = this.cols; --b && 0 === this.colYs[b];) a++;
      return (this.cols - a) * this.columnWidth - this.gutter
     }, d.prototype.needsResizeLayout = function() {
      var a = this.containerWidth;
      return this.getContainerWidth(), a !== this.containerWidth
     }, d
    }),
    function(a, b) {
     "use strict";
     "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", ["../layout-mode", "masonry/masonry"], b) : "object" == typeof exports ? module.exports = b(require("../layout-mode"), require("masonry-layout")) : b(a.Isotope.LayoutMode, a.Masonry)
    }(window, function(a, b) {
     "use strict";
   
     function c(a, b) {
      for (var c in b) a[c] = b[c];
      return a
     }
     var d = a.create("masonry"),
      e = d.prototype._getElementOffset,
      f = d.prototype.layout,
      g = d.prototype._getMeasurement;
     c(d.prototype, b.prototype), d.prototype._getElementOffset = e, d.prototype.layout = f, d.prototype._getMeasurement = g;
     var h = d.prototype.measureColumns;
     d.prototype.measureColumns = function() {
      this.items = this.isotope.filteredItems, h.call(this)
     };
     var i = d.prototype._manageStamp;
     return d.prototype._manageStamp = function() {
      this.options.isOriginLeft = this.isotope.options.isOriginLeft, this.options.isOriginTop = this.isotope.options.isOriginTop, i.apply(this, arguments)
     }, d
    }),
    function(a, b) {
     "use strict";
     "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", ["../layout-mode"], b) : "object" == typeof exports ? module.exports = b(require("../layout-mode")) : b(a.Isotope.LayoutMode)
    }(window, function(a) {
     "use strict";
     var b = a.create("fitRows");
     return b.prototype._resetLayout = function() {
      this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
     }, b.prototype._getItemLayoutPosition = function(a) {
      a.getSize();
      var b = a.size.outerWidth + this.gutter,
       c = this.isotope.size.innerWidth + this.gutter;
      0 !== this.x && b + this.x > c && (this.x = 0, this.y = this.maxY);
      var d = {
       x: this.x,
       y: this.y
      };
      return this.maxY = Math.max(this.maxY, this.y + a.size.outerHeight), this.x += b, d
     }, b.prototype._getContainerSize = function() {
      return {
       height: this.maxY
      }
     }, b
    }),
    function(a, b) {
     "use strict";
     "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", ["../layout-mode"], b) : "object" == typeof exports ? module.exports = b(require("../layout-mode")) : b(a.Isotope.LayoutMode)
    }(window, function(a) {
     "use strict";
     var b = a.create("vertical", {
      horizontalAlignment: 0
     });
     return b.prototype._resetLayout = function() {
      this.y = 0
     }, b.prototype._getItemLayoutPosition = function(a) {
      a.getSize();
      var b = (this.isotope.size.innerWidth - a.size.outerWidth) * this.options.horizontalAlignment,
       c = this.y;
      return this.y += a.size.outerHeight, {
       x: b,
       y: c
      }
     }, b.prototype._getContainerSize = function() {
      return {
       height: this.y
      }
     }, b
    }),
    function(a, b) {
     "use strict";
     "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical"], function(c, d, e, f, g, h) {
      return b(a, c, d, e, f, g, h)
     }) : "object" == typeof exports ? module.exports = b(a, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("./item"), require("./layout-mode"), require("./layout-modes/masonry"), require("./layout-modes/fit-rows"), require("./layout-modes/vertical")) : a.Isotope = b(a, a.Outlayer, a.getSize, a.matchesSelector, a.fizzyUIUtils, a.Isotope.Item, a.Isotope.LayoutMode)
    }(window, function(a, b, c, d, e, f, g) {
     function h(a, b) {
      return function(c, d) {
       for (var e = 0, f = a.length; f > e; e++) {
        var g = a[e],
         h = c.sortData[g],
         i = d.sortData[g];
        if (h > i || i > h) {
         var j = void 0 !== b[g] ? b[g] : b,
          k = j ? 1 : -1;
         return (h > i ? 1 : -1) * k
        }
       }
       return 0
      }
     }
     var i = a.jQuery,
      j = String.prototype.trim ? function(a) {
       return a.trim()
      } : function(a) {
       return a.replace(/^\s+|\s+$/g, "")
      },
      k = document.documentElement,
      l = k.textContent ? function(a) {
       return a.textContent
      } : function(a) {
       return a.innerText
      },
      m = b.create("isotope", {
       layoutMode: "masonry",
       isJQueryFiltering: !0,
       sortAscending: !0
      });
     m.Item = f, m.LayoutMode = g, m.prototype._create = function() {
      this.itemGUID = 0, this._sorters = {}, this._getSorters(), b.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
      for (var a in g.modes) this._initLayoutMode(a)
     }, m.prototype.reloadItems = function() {
      this.itemGUID = 0, b.prototype.reloadItems.call(this)
     }, m.prototype._itemize = function() {
      for (var a = b.prototype._itemize.apply(this, arguments), c = 0, d = a.length; d > c; c++) {
       var e = a[c];
       e.id = this.itemGUID++
      }
      return this._updateItemsSortData(a), a
     }, m.prototype._initLayoutMode = function(a) {
      var b = g.modes[a],
       c = this.options[a] || {};
      this.options[a] = b.options ? e.extend(b.options, c) : c, this.modes[a] = new b(this)
     }, m.prototype.layout = function() {
      return !this._isLayoutInited && this.options.isInitLayout ? void this.arrange() : void this._layout()
     }, m.prototype._layout = function() {
      var a = this._getIsInstant();
      this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, a), this._isLayoutInited = !0
     }, m.prototype.arrange = function(a) {
      function b() {
       d.reveal(c.needReveal), d.hide(c.needHide)
      }
      this.option(a), this._getIsInstant();
      var c = this._filter(this.items);
      this.filteredItems = c.matches;
      var d = this;
      this._bindArrangeComplete(), this._isInstant ? this._noTransition(b) : b(), this._sort(), this._layout()
     }, m.prototype._init = m.prototype.arrange, m.prototype._getIsInstant = function() {
      var a = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
      return this._isInstant = a, a
     }, m.prototype._bindArrangeComplete = function() {
      function a() {
       b && c && d && e.dispatchEvent("arrangeComplete", null, [e.filteredItems])
      }
      var b, c, d, e = this;
      this.once("layoutComplete", function() {
       b = !0, a()
      }), this.once("hideComplete", function() {
       c = !0, a()
      }), this.once("revealComplete", function() {
       d = !0, a()
      })
     }, m.prototype._filter = function(a) {
      var b = this.options.filter;
      b = b || "*";
      for (var c = [], d = [], e = [], f = this._getFilterTest(b), g = 0, h = a.length; h > g; g++) {
       var i = a[g];
       if (!i.isIgnored) {
        var j = f(i);
        j && c.push(i), j && i.isHidden ? d.push(i) : j || i.isHidden || e.push(i)
       }
      }
      return {
       matches: c,
       needReveal: d,
       needHide: e
      }
     }, m.prototype._getFilterTest = function(a) {
      return i && this.options.isJQueryFiltering ? function(b) {
       return i(b.element).is(a)
      } : "function" == typeof a ? function(b) {
       return a(b.element)
      } : function(b) {
       return d(b.element, a)
      }
     }, m.prototype.updateSortData = function(a) {
      var b;
      a ? (a = e.makeArray(a), b = this.getItems(a)) : b = this.items, this._getSorters(), this._updateItemsSortData(b)
     }, m.prototype._getSorters = function() {
      var a = this.options.getSortData;
      for (var b in a) {
       var c = a[b];
       this._sorters[b] = n(c)
      }
     }, m.prototype._updateItemsSortData = function(a) {
      for (var b = a && a.length, c = 0; b && b > c; c++) {
       var d = a[c];
       d.updateSortData()
      }
     };
     var n = function() {
      function a(a) {
       if ("string" != typeof a) return a;
       var c = j(a).split(" "),
        d = c[0],
        e = d.match(/^\[(.+)\]$/),
        f = e && e[1],
        g = b(f, d),
        h = m.sortDataParsers[c[1]];
       return a = h ? function(a) {
        return a && h(g(a))
       } : function(a) {
        return a && g(a)
       }
      }
   
      function b(a, b) {
       var c;
       return c = a ? function(b) {
        return b.getAttribute(a)
       } : function(a) {
        var c = a.querySelector(b);
        return c && l(c)
       }
      }
      return a
     }();
     m.sortDataParsers = {
      parseInt: function(a) {
       return parseInt(a, 10)
      },
      parseFloat: function(a) {
       return parseFloat(a)
      }
     }, m.prototype._sort = function() {
      var a = this.options.sortBy;
      if (a) {
       var b = [].concat.apply(a, this.sortHistory),
        c = h(b, this.options.sortAscending);
       this.filteredItems.sort(c), a != this.sortHistory[0] && this.sortHistory.unshift(a)
      }
     }, m.prototype._mode = function() {
      var a = this.options.layoutMode,
       b = this.modes[a];
      if (!b) throw new Error("No layout mode: " + a);
      return b.options = this.options[a], b
     }, m.prototype._resetLayout = function() {
      b.prototype._resetLayout.call(this), this._mode()._resetLayout()
     }, m.prototype._getItemLayoutPosition = function(a) {
      return this._mode()._getItemLayoutPosition(a)
     }, m.prototype._manageStamp = function(a) {
      this._mode()._manageStamp(a)
     }, m.prototype._getContainerSize = function() {
      return this._mode()._getContainerSize()
     }, m.prototype.needsResizeLayout = function() {
      return this._mode().needsResizeLayout()
     }, m.prototype.appended = function(a) {
      var b = this.addItems(a);
      if (b.length) {
       var c = this._filterRevealAdded(b);
       this.filteredItems = this.filteredItems.concat(c)
      }
     }, m.prototype.prepended = function(a) {
      var b = this._itemize(a);
      if (b.length) {
       this._resetLayout(), this._manageStamps();
       var c = this._filterRevealAdded(b);
       this.layoutItems(this.filteredItems), this.filteredItems = c.concat(this.filteredItems), this.items = b.concat(this.items)
      }
     }, m.prototype._filterRevealAdded = function(a) {
      var b = this._filter(a);
      return this.hide(b.needHide), this.reveal(b.matches), this.layoutItems(b.matches, !0), b.matches
     }, m.prototype.insert = function(a) {
      var b = this.addItems(a);
      if (b.length) {
       var c, d, e = b.length;
       for (c = 0; e > c; c++) d = b[c], this.element.appendChild(d.element);
       var f = this._filter(b).matches;
       for (c = 0; e > c; c++) b[c].isLayoutInstant = !0;
       for (this.arrange(), c = 0; e > c; c++) delete b[c].isLayoutInstant;
       this.reveal(f)
      }
     };
     var o = m.prototype.remove;
     return m.prototype.remove = function(a) {
      a = e.makeArray(a);
      var b = this.getItems(a);
      o.call(this, a);
      var c = b && b.length;
      if (c)
       for (var d = 0; c > d; d++) {
        var f = b[d];
        e.removeFrom(this.filteredItems, f)
       }
     }, m.prototype.shuffle = function() {
      for (var a = 0, b = this.items.length; b > a; a++) {
       var c = this.items[a];
       c.sortData.random = Math.random()
      }
      this.options.sortBy = "random", this._sort(), this._layout()
     }, m.prototype._noTransition = function(a) {
      var b = this.options.transitionDuration;
      this.options.transitionDuration = 0;
      var c = a.call(this);
      return this.options.transitionDuration = b, c
     }, m.prototype.getFilteredItemElements = function() {
      for (var a = [], b = 0, c = this.filteredItems.length; c > b; b++) a.push(this.filteredItems[b].element);
      return a
     }, m
    });
   ! function(a) {
    function h(b) {
     return a(b).filter(function() {
      return a(this).is(":appeared")
     })
    }
   
    function i() {
     d = !1;
     for (var a = 0, c = b.length; a < c; a++) {
      var e = h(b[a]);
      if (e.trigger("appear", [e]), g[a]) {
       var f = g[a].not(e);
       f.trigger("disappear", [f])
      }
      g[a] = e
     }
    }
   
    function j(a) {
     b.push(a), g.push()
    }
    var b = [],
     c = !1,
     d = !1,
     e = {
      interval: 250,
      force_process: !1
     },
     f = a(window),
     g = [];
    a.expr[":"].appeared = function(b) {
     var c = a(b);
     if (!c.is(":visible")) return !1;
     var d = f.scrollLeft(),
      e = f.scrollTop(),
      g = c.offset(),
      h = g.left,
      i = g.top;
     return i + c.height() >= e && i - (c.data("appear-top-offset") || 0) <= e + f.height() && h + c.width() >= d && h - (c.data("appear-left-offset") || 0) <= d + f.width()
    }, a.fn.extend({
     appear: function(b) {
      var f = a.extend({}, e, b || {}),
       g = this.selector || this;
      if (!c) {
       var h = function() {
        d || (d = !0, setTimeout(i, f.interval))
       };
       a(window).scroll(h).resize(h), c = !0
      }
      return f.force_process && setTimeout(i, f.interval), j(g), a(g)
     }
    }), a.extend({
     force_appear: function() {
      return !!c && (i(), !0)
     }
    })
   }(function() {
    return "undefined" != typeof module ? require("jquery") : jQuery
   }());
   
   
   
   /*
    * jQuery appear plugin
    *
    * Copyright (c) 2012 Andrey Sidorov
    * licensed under MIT license.
    *
    * https://github.com/morr/jquery.appear/
    *
    * Version: 0.3.6
    */
   ! function(a) {
    function h(b) {
     return a(b).filter(function() {
      return a(this).is(":appeared")
     })
    }
   
    function i() {
     d = !1;
     for (var a = 0, c = b.length; a < c; a++) {
      var e = h(b[a]);
      if (e.trigger("appear", [e]), g[a]) {
       var f = g[a].not(e);
       f.trigger("disappear", [f])
      }
      g[a] = e
     }
    }
   
    function j(a) {
     b.push(a), g.push()
    }
    var b = [],
     c = !1,
     d = !1,
     e = {
      interval: 250,
      force_process: !1
     },
     f = a(window),
     g = [];
    a.expr[":"].appeared = function(b) {
     var c = a(b);
     if (!c.is(":visible")) return !1;
     var d = f.scrollLeft(),
      e = f.scrollTop(),
      g = c.offset(),
      h = g.left,
      i = g.top;
     return i + c.height() >= e && i - (c.data("appear-top-offset") || 0) <= e + f.height() && h + c.width() >= d && h - (c.data("appear-left-offset") || 0) <= d + f.width()
    }, a.fn.extend({
     appear: function(b) {
      var f = a.extend({}, e, b || {}),
       g = this.selector || this;
      if (!c) {
       var h = function() {
        d || (d = !0, setTimeout(i, f.interval))
       };
       a(window).scroll(h).resize(h), c = !0
      }
      return f.force_process && setTimeout(i, f.interval), j(g), a(g)
     }
    }), a.extend({
     force_appear: function() {
      return !!c && (i(), !0)
     }
    })
   }(function() {
    return "undefined" != typeof module ? require("jquery") : jQuery
   }());
   
   
   /*
    * ! fancyBox v2.1.5 fancyapps.com |
    *fancyapps.com/fancybox/#license
    */
   (function(r, G, f, v) {
    var J = f("html"),
     n = f(r),
     p = f(G),
     b = f.fancybox = function() {
      b.open.apply(this, arguments)
     },
     I = navigator.userAgent.match(/msie/i),
     B = null,
     s = G.createTouch !== v,
     t = function(a) {
      return a && a.hasOwnProperty && a instanceof f
     },
     q = function(a) {
      return a && "string" === f.type(a)
     },
     E = function(a) {
      return q(a) && 0 < a.indexOf("%")
     },
     l = function(a, d) {
      var e = parseInt(a, 10) || 0;
      d && E(a) && (e *= b.getViewport()[d] / 100);
      return Math.ceil(e)
     },
     w = function(a, b) {
      return l(a, b) + "px"
     };
    f.extend(b, {
     version: "2.1.5",
     defaults: {
      padding: 15,
      margin: 20,
      width: 800,
      height: 600,
      minWidth: 100,
      minHeight: 100,
      maxWidth: 9999,
      maxHeight: 9999,
      pixelRatio: 1,
      autoSize: !0,
      autoHeight: !1,
      autoWidth: !1,
      autoResize: !0,
      autoCenter: !s,
      fitToView: !0,
      aspectRatio: !1,
      topRatio: 0.5,
      leftRatio: 0.5,
      scrolling: "auto",
      wrapCSS: "",
      arrows: !0,
      closeBtn: !0,
      closeClick: !1,
      nextClick: !1,
      mouseWheel: !0,
      autoPlay: !1,
      playSpeed: 3E3,
      preload: 3,
      modal: !1,
      loop: !0,
      ajax: {
       dataType: "html",
       headers: {
        "X-fancyBox": !0
       }
      },
      iframe: {
       scrolling: "auto",
       preload: !0
      },
      swf: {
       wmode: "transparent",
       allowfullscreen: "true",
       allowscriptaccess: "always"
      },
      keys: {
       next: {
        13: "left",
        34: "up",
        39: "left",
        40: "up"
       },
       prev: {
        8: "right",
        33: "down",
        37: "right",
        38: "down"
       },
       close: [27],
       play: [32],
       toggle: [70]
      },
      direction: {
       next: "left",
       prev: "right"
      },
      scrollOutside: !0,
      index: 0,
      type: null,
      href: null,
      content: null,
      title: null,
      tpl: {
       wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
       image: '<img class="fancybox-image" src="{href}" alt="" />',
       iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' +
        (I ? ' allowtransparency="true"' : "") + "></iframe>",
       error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
       closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
       next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
       prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
      },
      openEffect: "fade",
      openSpeed: 250,
      openEasing: "swing",
      openOpacity: !0,
      openMethod: "zoomIn",
      closeEffect: "fade",
      closeSpeed: 250,
      closeEasing: "swing",
      closeOpacity: !0,
      closeMethod: "zoomOut",
      nextEffect: "elastic",
      nextSpeed: 250,
      nextEasing: "swing",
      nextMethod: "changeIn",
      prevEffect: "elastic",
      prevSpeed: 250,
      prevEasing: "swing",
      prevMethod: "changeOut",
      helpers: {
       overlay: !0,
       title: !0
      },
      onCancel: f.noop,
      beforeLoad: f.noop,
      afterLoad: f.noop,
      beforeShow: f.noop,
      afterShow: f.noop,
      beforeChange: f.noop,
      beforeClose: f.noop,
      afterClose: f.noop
     },
     group: {},
     opts: {},
     previous: null,
     coming: null,
     current: null,
     isActive: !1,
     isOpen: !1,
     isOpened: !1,
     wrap: null,
     skin: null,
     outer: null,
     inner: null,
     player: {
      timer: null,
      isActive: !1
     },
     ajaxLoad: null,
     imgPreload: null,
     transitions: {},
     helpers: {},
     open: function(a, d) {
      if (a && (f.isPlainObject(d) || (d = {}), !1 !== b.close(!0))) return f.isArray(a) || (a = t(a) ? f(a).get() : [a]), f.each(a, function(e, c) {
       var k = {},
        g, h, j, m, l;
       "object" === f.type(c) && (c.nodeType && (c = f(c)), t(c) ? (k = {
        href: c.data("fancybox-href") || c.attr("href"),
        title: c.data("fancybox-title") || c.attr("title"),
        isDom: !0,
        element: c
       }, f.metadata && f.extend(!0, k,
        c.metadata())) : k = c);
       g = d.href || k.href || (q(c) ? c : null);
       h = d.title !== v ? d.title : k.title || "";
       m = (j = d.content || k.content) ? "html" : d.type || k.type;
       !m && k.isDom && (m = c.data("fancybox-type"), m || (m = (m = c.prop("class").match(/fancybox\.(\w+)/)) ? m[1] : null));
       q(g) && (m || (b.isImage(g) ? m = "image" : b.isSWF(g) ? m = "swf" : "#" === g.charAt(0) ? m = "inline" : q(c) && (m = "html", j = c)), "ajax" === m && (l = g.split(/\s+/, 2), g = l.shift(), l = l.shift()));
       j || ("inline" === m ? g ? j = f(q(g) ? g.replace(/.*(?=#[^\s]+$)/, "") : g) : k.isDom && (j = c) : "html" === m ? j = g : !m && (!g &&
        k.isDom) && (m = "inline", j = c));
       f.extend(k, {
        href: g,
        type: m,
        content: j,
        title: h,
        selector: l
       });
       a[e] = k
      }), b.opts = f.extend(!0, {}, b.defaults, d), d.keys !== v && (b.opts.keys = d.keys ? f.extend({}, b.defaults.keys, d.keys) : !1), b.group = a, b._start(b.opts.index)
     },
     cancel: function() {
      var a = b.coming;
      a && !1 !== b.trigger("onCancel") && (b.hideLoading(), b.ajaxLoad && b.ajaxLoad.abort(), b.ajaxLoad = null, b.imgPreload && (b.imgPreload.onload = b.imgPreload.onerror = null), a.wrap && a.wrap.stop(!0, !0).trigger("onReset").remove(), b.coming = null, b.current ||
       b._afterZoomOut(a))
     },
     close: function(a) {
      b.cancel();
      !1 !== b.trigger("beforeClose") && (b.unbindEvents(), b.isActive && (!b.isOpen || !0 === a ? (f(".fancybox-wrap").stop(!0).trigger("onReset").remove(), b._afterZoomOut()) : (b.isOpen = b.isOpened = !1, b.isClosing = !0, f(".fancybox-item, .fancybox-nav").remove(), b.wrap.stop(!0, !0).removeClass("fancybox-opened"), b.transitions[b.current.closeMethod]())))
     },
     play: function(a) {
      var d = function() {
        clearTimeout(b.player.timer)
       },
       e = function() {
        d();
        b.current && b.player.isActive && (b.player.timer =
         setTimeout(b.next, b.current.playSpeed))
       },
       c = function() {
        d();
        p.unbind(".player");
        b.player.isActive = !1;
        b.trigger("onPlayEnd")
       };
      if (!0 === a || !b.player.isActive && !1 !== a) {
       if (b.current && (b.current.loop || b.current.index < b.group.length - 1)) b.player.isActive = !0, p.bind({
        "onCancel.player beforeClose.player": c,
        "onUpdate.player": e,
        "beforeLoad.player": d
       }), e(), b.trigger("onPlayStart")
      } else c()
     },
     next: function(a) {
      var d = b.current;
      d && (q(a) || (a = d.direction.next), b.jumpto(d.index + 1, a, "next"))
     },
     prev: function(a) {
      var d = b.current;
      d && (q(a) || (a = d.direction.prev), b.jumpto(d.index - 1, a, "prev"))
     },
     jumpto: function(a, d, e) {
      var c = b.current;
      c && (a = l(a), b.direction = d || c.direction[a >= c.index ? "next" : "prev"], b.router = e || "jumpto", c.loop && (0 > a && (a = c.group.length + a % c.group.length), a %= c.group.length), c.group[a] !== v && (b.cancel(), b._start(a)))
     },
     reposition: function(a, d) {
      var e = b.current,
       c = e ? e.wrap : null,
       k;
      c && (k = b._getPosition(d), a && "scroll" === a.type ? (delete k.position, c.stop(!0, !0).animate(k, 200)) : (c.css(k), e.pos = f.extend({}, e.dim, k)))
     },
     update: function(a) {
      var d =
       a && a.type,
       e = !d || "orientationchange" === d;
      e && (clearTimeout(B), B = null);
      b.isOpen && !B && (B = setTimeout(function() {
       var c = b.current;
       c && !b.isClosing && (b.wrap.removeClass("fancybox-tmp"), (e || "load" === d || "resize" === d && c.autoResize) && b._setDimension(), "scroll" === d && c.canShrink || b.reposition(a), b.trigger("onUpdate"), B = null)
      }, e && !s ? 0 : 300))
     },
     toggle: function(a) {
      b.isOpen && (b.current.fitToView = "boolean" === f.type(a) ? a : !b.current.fitToView, s && (b.wrap.removeAttr("style").addClass("fancybox-tmp"), b.trigger("onUpdate")),
       b.update())
     },
     hideLoading: function() {
      p.unbind(".loading");
      f("#fancybox-loading").remove()
     },
     showLoading: function() {
      var a, d;
      b.hideLoading();
      a = f('<div id="fancybox-loading"><div></div></div>').click(b.cancel).appendTo("body");
      p.bind("keydown.loading", function(a) {
       if (27 === (a.which || a.keyCode)) a.preventDefault(), b.cancel()
      });
      b.defaults.fixed || (d = b.getViewport(), a.css({
       position: "absolute",
       top: 0.5 * d.h + d.y,
       left: 0.5 * d.w + d.x
      }))
     },
     getViewport: function() {
      var a = b.current && b.current.locked || !1,
       d = {
        x: n.scrollLeft(),
        y: n.scrollTop()
       };
      a ? (d.w = a[0].clientWidth, d.h = a[0].clientHeight) : (d.w = s && r.innerWidth ? r.innerWidth : n.width(), d.h = s && r.innerHeight ? r.innerHeight : n.height());
      return d
     },
     unbindEvents: function() {
      b.wrap && t(b.wrap) && b.wrap.unbind(".fb");
      p.unbind(".fb");
      n.unbind(".fb")
     },
     bindEvents: function() {
      var a = b.current,
       d;
      a && (n.bind("orientationchange.fb" + (s ? "" : " resize.fb") + (a.autoCenter && !a.locked ? " scroll.fb" : ""), b.update), (d = a.keys) && p.bind("keydown.fb", function(e) {
       var c = e.which || e.keyCode,
        k = e.target || e.srcElement;
       if (27 === c && b.coming) return !1;
       !e.ctrlKey && (!e.altKey && !e.shiftKey && !e.metaKey && (!k || !k.type && !f(k).is("[contenteditable]"))) && f.each(d, function(d, k) {
        if (1 < a.group.length && k[c] !== v) return b[d](k[c]), e.preventDefault(), !1;
        if (-1 < f.inArray(c, k)) return b[d](), e.preventDefault(), !1
       })
      }), f.fn.mousewheel && a.mouseWheel && b.wrap.bind("mousewheel.fb", function(d, c, k, g) {
       for (var h = f(d.target || null), j = !1; h.length && !j && !h.is(".fancybox-skin") && !h.is(".fancybox-wrap");) j = h[0] && !(h[0].style.overflow && "hidden" === h[0].style.overflow) &&
        (h[0].clientWidth && h[0].scrollWidth > h[0].clientWidth || h[0].clientHeight && h[0].scrollHeight > h[0].clientHeight), h = f(h).parent();
       if (0 !== c && !j && 1 < b.group.length && !a.canShrink) {
        if (0 < g || 0 < k) b.prev(0 < g ? "down" : "left");
        else if (0 > g || 0 > k) b.next(0 > g ? "up" : "right");
        d.preventDefault()
       }
      }))
     },
     trigger: function(a, d) {
      var e, c = d || b.coming || b.current;
      if (c) {
       f.isFunction(c[a]) && (e = c[a].apply(c, Array.prototype.slice.call(arguments, 1)));
       if (!1 === e) return !1;
       c.helpers && f.each(c.helpers, function(d, e) {
        if (e && b.helpers[d] && f.isFunction(b.helpers[d][a])) b.helpers[d][a](f.extend(!0, {}, b.helpers[d].defaults, e), c)
       });
       p.trigger(a)
      }
     },
     isImage: function(a) {
      return q(a) && a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)
     },
     isSWF: function(a) {
      return q(a) && a.match(/\.(swf)((\?|#).*)?$/i)
     },
     _start: function(a) {
      var d = {},
       e, c;
      a = l(a);
      e = b.group[a] || null;
      if (!e) return !1;
      d = f.extend(!0, {}, b.opts, e);
      e = d.margin;
      c = d.padding;
      "number" === f.type(e) && (d.margin = [e, e, e, e]);
      "number" === f.type(c) && (d.padding = [c, c, c, c]);
      d.modal && f.extend(!0, d, {
       closeBtn: !1,
       closeClick: !1,
       nextClick: !1,
       arrows: !1,
       mouseWheel: !1,
       keys: null,
       helpers: {
        overlay: {
         closeClick: !1
        }
       }
      });
      d.autoSize && (d.autoWidth = d.autoHeight = !0);
      "auto" === d.width && (d.autoWidth = !0);
      "auto" === d.height && (d.autoHeight = !0);
      d.group = b.group;
      d.index = a;
      b.coming = d;
      if (!1 === b.trigger("beforeLoad")) b.coming = null;
      else {
       c = d.type;
       e = d.href;
       if (!c) return b.coming = null, b.current && b.router && "jumpto" !== b.router ? (b.current.index = a, b[b.router](b.direction)) : !1;
       b.isActive = !0;
       if ("image" === c || "swf" === c) d.autoHeight = d.autoWidth = !1, d.scrolling = "visible";
       "image" === c && (d.aspectRatio = !0);
       "iframe" === c && s && (d.scrolling = "scroll");
       d.wrap = f(d.tpl.wrap).addClass("fancybox-" + (s ? "mobile" : "desktop") + " fancybox-type-" + c + " fancybox-tmp " + d.wrapCSS).appendTo(d.parent || "body");
       f.extend(d, {
        skin: f(".fancybox-skin", d.wrap),
        outer: f(".fancybox-outer", d.wrap),
        inner: f(".fancybox-inner", d.wrap)
       });
       f.each(["Top", "Right", "Bottom", "Left"], function(a, b) {
        d.skin.css("padding" + b, w(d.padding[a]))
       });
       b.trigger("onReady");
       if ("inline" === c || "html" === c) {
        if (!d.content || !d.content.length) return b._error("content")
       } else if (!e) return b._error("href");
       "image" === c ? b._loadImage() : "ajax" === c ? b._loadAjax() : "iframe" === c ? b._loadIframe() : b._afterLoad()
      }
     },
     _error: function(a) {
      f.extend(b.coming, {
       type: "html",
       autoWidth: !0,
       autoHeight: !0,
       minWidth: 0,
       minHeight: 0,
       scrolling: "no",
       hasError: a,
       content: b.coming.tpl.error
      });
      b._afterLoad()
     },
     _loadImage: function() {
      var a = b.imgPreload = new Image;
      a.onload = function() {
       this.onload = this.onerror = null;
       b.coming.width = this.width / b.opts.pixelRatio;
       b.coming.height = this.height / b.opts.pixelRatio;
       b._afterLoad()
      };
      a.onerror = function() {
       this.onload =
        this.onerror = null;
       b._error("image")
      };
      a.src = b.coming.href;
      !0 !== a.complete && b.showLoading()
     },
     _loadAjax: function() {
      var a = b.coming;
      b.showLoading();
      b.ajaxLoad = f.ajax(f.extend({}, a.ajax, {
       url: a.href,
       error: function(a, e) {
        b.coming && "abort" !== e ? b._error("ajax", a) : b.hideLoading()
       },
       success: function(d, e) {
        "success" === e && (a.content = d, b._afterLoad())
       }
      }))
     },
     _loadIframe: function() {
      var a = b.coming,
       d = f(a.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", s ? "auto" : a.iframe.scrolling).attr("src", a.href);
      f(a.wrap).bind("onReset", function() {
       try {
        f(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
       } catch (a) {}
      });
      a.iframe.preload && (b.showLoading(), d.one("load", function() {
       f(this).data("ready", 1);
       s || f(this).bind("load.fb", b.update);
       f(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();
       b._afterLoad()
      }));
      a.content = d.appendTo(a.inner);
      a.iframe.preload || b._afterLoad()
     },
     _preloadImages: function() {
      var a = b.group,
       d = b.current,
       e = a.length,
       c = d.preload ? Math.min(d.preload,
        e - 1) : 0,
       f, g;
      for (g = 1; g <= c; g += 1) f = a[(d.index + g) % e], "image" === f.type && f.href && ((new Image).src = f.href)
     },
     _afterLoad: function() {
      var a = b.coming,
       d = b.current,
       e, c, k, g, h;
      b.hideLoading();
      if (a && !1 !== b.isActive)
       if (!1 === b.trigger("afterLoad", a, d)) a.wrap.stop(!0).trigger("onReset").remove(), b.coming = null;
       else {
        d && (b.trigger("beforeChange", d), d.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove());
        b.unbindEvents();
        e = a.content;
        c = a.type;
        k = a.scrolling;
        f.extend(b, {
         wrap: a.wrap,
         skin: a.skin,
         outer: a.outer,
         inner: a.inner,
         current: a,
         previous: d
        });
        g = a.href;
        switch (c) {
         case "inline":
         case "ajax":
         case "html":
          a.selector ? e = f("<div>").html(e).find(a.selector) : t(e) && (e.data("fancybox-placeholder") || e.data("fancybox-placeholder", f('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()), e = e.show().detach(), a.wrap.bind("onReset", function() {
           f(this).find(e).length && e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder", !1)
          }));
          break;
         case "image":
          e = a.tpl.image.replace("{href}",
           g);
          break;
         case "swf":
          e = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + g + '"></param>', h = "", f.each(a.swf, function(a, b) {
           e += '<param name="' + a + '" value="' + b + '"></param>';
           h += " " + a + '="' + b + '"'
          }), e += '<embed src="' + g + '" type="application/x-shockwave-flash" width="100%" height="100%"' + h + "></embed></object>"
        }(!t(e) || !e.parent().is(a.inner)) && a.inner.append(e);
        b.trigger("beforeShow");
        a.inner.css("overflow", "yes" === k ? "scroll" :
         "no" === k ? "hidden" : k);
        b._setDimension();
        b.reposition();
        b.isOpen = !1;
        b.coming = null;
        b.bindEvents();
        if (b.isOpened) {
         if (d.prevMethod) b.transitions[d.prevMethod]()
        } else f(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove();
        b.transitions[b.isOpened ? a.nextMethod : a.openMethod]();
        b._preloadImages()
       }
     },
     _setDimension: function() {
      var a = b.getViewport(),
       d = 0,
       e = !1,
       c = !1,
       e = b.wrap,
       k = b.skin,
       g = b.inner,
       h = b.current,
       c = h.width,
       j = h.height,
       m = h.minWidth,
       u = h.minHeight,
       n = h.maxWidth,
       p = h.maxHeight,
       s = h.scrolling,
       q = h.scrollOutside ?
       h.scrollbarWidth : 0,
       x = h.margin,
       y = l(x[1] + x[3]),
       r = l(x[0] + x[2]),
       v, z, t, C, A, F, B, D, H;
      e.add(k).add(g).width("auto").height("auto").removeClass("fancybox-tmp");
      x = l(k.outerWidth(!0) - k.width());
      v = l(k.outerHeight(!0) - k.height());
      z = y + x;
      t = r + v;
      C = E(c) ? (a.w - z) * l(c) / 100 : c;
      A = E(j) ? (a.h - t) * l(j) / 100 : j;
      if ("iframe" === h.type) {
       if (H = h.content, h.autoHeight && 1 === H.data("ready")) try {
        H[0].contentWindow.document.location && (g.width(C).height(9999), F = H.contents().find("body"), q && F.css("overflow-x", "hidden"), A = F.outerHeight(!0))
       } catch (G) {}
      } else if (h.autoWidth ||
       h.autoHeight) g.addClass("fancybox-tmp"), h.autoWidth || g.width(C), h.autoHeight || g.height(A), h.autoWidth && (C = g.width()), h.autoHeight && (A = g.height()), g.removeClass("fancybox-tmp");
      c = l(C);
      j = l(A);
      D = C / A;
      m = l(E(m) ? l(m, "w") - z : m);
      n = l(E(n) ? l(n, "w") - z : n);
      u = l(E(u) ? l(u, "h") - t : u);
      p = l(E(p) ? l(p, "h") - t : p);
      F = n;
      B = p;
      h.fitToView && (n = Math.min(a.w - z, n), p = Math.min(a.h - t, p));
      z = a.w - y;
      r = a.h - r;
      h.aspectRatio ? (c > n && (c = n, j = l(c / D)), j > p && (j = p, c = l(j * D)), c < m && (c = m, j = l(c / D)), j < u && (j = u, c = l(j * D))) : (c = Math.max(m, Math.min(c, n)), h.autoHeight &&
       "iframe" !== h.type && (g.width(c), j = g.height()), j = Math.max(u, Math.min(j, p)));
      if (h.fitToView)
       if (g.width(c).height(j), e.width(c + x), a = e.width(), y = e.height(), h.aspectRatio)
        for (;
         (a > z || y > r) && (c > m && j > u) && !(19 < d++);) j = Math.max(u, Math.min(p, j - 10)), c = l(j * D), c < m && (c = m, j = l(c / D)), c > n && (c = n, j = l(c / D)), g.width(c).height(j), e.width(c + x), a = e.width(), y = e.height();
       else c = Math.max(m, Math.min(c, c - (a - z))), j = Math.max(u, Math.min(j, j - (y - r)));
      q && ("auto" === s && j < A && c + x + q < z) && (c += q);
      g.width(c).height(j);
      e.width(c + x);
      a = e.width();
      y = e.height();
      e = (a > z || y > r) && c > m && j > u;
      c = h.aspectRatio ? c < F && j < B && c < C && j < A : (c < F || j < B) && (c < C || j < A);
      f.extend(h, {
       dim: {
        width: w(a),
        height: w(y)
       },
       origWidth: C,
       origHeight: A,
       canShrink: e,
       canExpand: c,
       wPadding: x,
       hPadding: v,
       wrapSpace: y - k.outerHeight(!0),
       skinSpace: k.height() - j
      });
      !H && (h.autoHeight && j > u && j < p && !c) && g.height("auto")
     },
     _getPosition: function(a) {
      var d = b.current,
       e = b.getViewport(),
       c = d.margin,
       f = b.wrap.width() + c[1] + c[3],
       g = b.wrap.height() + c[0] + c[2],
       c = {
        position: "absolute",
        top: c[0],
        left: c[3]
       };
      d.autoCenter && d.fixed &&
       !a && g <= e.h && f <= e.w ? c.position = "fixed" : d.locked || (c.top += e.y, c.left += e.x);
      c.top = w(Math.max(c.top, c.top + (e.h - g) * d.topRatio));
      c.left = w(Math.max(c.left, c.left + (e.w - f) * d.leftRatio));
      return c
     },
     _afterZoomIn: function() {
      var a = b.current;
      a && (b.isOpen = b.isOpened = !0, b.wrap.css("overflow", "visible").addClass("fancybox-opened"), b.update(), (a.closeClick || a.nextClick && 1 < b.group.length) && b.inner.css("cursor", "pointer").bind("click.fb", function(d) {
       !f(d.target).is("a") && !f(d.target).parent().is("a") && (d.preventDefault(),
        b[a.closeClick ? "close" : "next"]())
      }), a.closeBtn && f(a.tpl.closeBtn).appendTo(b.skin).bind("click.fb", function(a) {
       a.preventDefault();
       b.close()
      }), a.arrows && 1 < b.group.length && ((a.loop || 0 < a.index) && f(a.tpl.prev).appendTo(b.outer).bind("click.fb", b.prev), (a.loop || a.index < b.group.length - 1) && f(a.tpl.next).appendTo(b.outer).bind("click.fb", b.next)), b.trigger("afterShow"), !a.loop && a.index === a.group.length - 1 ? b.play(!1) : b.opts.autoPlay && !b.player.isActive && (b.opts.autoPlay = !1, b.play()))
     },
     _afterZoomOut: function(a) {
      a =
       a || b.current;
      f(".fancybox-wrap").trigger("onReset").remove();
      f.extend(b, {
       group: {},
       opts: {},
       router: !1,
       current: null,
       isActive: !1,
       isOpened: !1,
       isOpen: !1,
       isClosing: !1,
       wrap: null,
       skin: null,
       outer: null,
       inner: null
      });
      b.trigger("afterClose", a)
     }
    });
    b.transitions = {
     getOrigPosition: function() {
      var a = b.current,
       d = a.element,
       e = a.orig,
       c = {},
       f = 50,
       g = 50,
       h = a.hPadding,
       j = a.wPadding,
       m = b.getViewport();
      !e && (a.isDom && d.is(":visible")) && (e = d.find("img:first"), e.length || (e = d));
      t(e) ? (c = e.offset(), e.is("img") && (f = e.outerWidth(), g = e.outerHeight())) :
       (c.top = m.y + (m.h - g) * a.topRatio, c.left = m.x + (m.w - f) * a.leftRatio);
      if ("fixed" === b.wrap.css("position") || a.locked) c.top -= m.y, c.left -= m.x;
      return c = {
       top: w(c.top - h * a.topRatio),
       left: w(c.left - j * a.leftRatio),
       width: w(f + j),
       height: w(g + h)
      }
     },
     step: function(a, d) {
      var e, c, f = d.prop;
      c = b.current;
      var g = c.wrapSpace,
       h = c.skinSpace;
      if ("width" === f || "height" === f) e = d.end === d.start ? 1 : (a - d.start) / (d.end - d.start), b.isClosing && (e = 1 - e), c = "width" === f ? c.wPadding : c.hPadding, c = a - c, b.skin[f](l("width" === f ? c : c - g * e)), b.inner[f](l("width" ===
       f ? c : c - g * e - h * e))
     },
     zoomIn: function() {
      var a = b.current,
       d = a.pos,
       e = a.openEffect,
       c = "elastic" === e,
       k = f.extend({
        opacity: 1
       }, d);
      delete k.position;
      c ? (d = this.getOrigPosition(), a.openOpacity && (d.opacity = 0.1)) : "fade" === e && (d.opacity = 0.1);
      b.wrap.css(d).animate(k, {
       duration: "none" === e ? 0 : a.openSpeed,
       easing: a.openEasing,
       step: c ? this.step : null,
       complete: b._afterZoomIn
      })
     },
     zoomOut: function() {
      var a = b.current,
       d = a.closeEffect,
       e = "elastic" === d,
       c = {
        opacity: 0.1
       };
      e && (c = this.getOrigPosition(), a.closeOpacity && (c.opacity = 0.1));
      b.wrap.animate(c, {
       duration: "none" === d ? 0 : a.closeSpeed,
       easing: a.closeEasing,
       step: e ? this.step : null,
       complete: b._afterZoomOut
      })
     },
     changeIn: function() {
      var a = b.current,
       d = a.nextEffect,
       e = a.pos,
       c = {
        opacity: 1
       },
       f = b.direction,
       g;
      e.opacity = 0.1;
      "elastic" === d && (g = "down" === f || "up" === f ? "top" : "left", "down" === f || "right" === f ? (e[g] = w(l(e[g]) - 200), c[g] = "+=200px") : (e[g] = w(l(e[g]) + 200), c[g] = "-=200px"));
      "none" === d ? b._afterZoomIn() : b.wrap.css(e).animate(c, {
       duration: a.nextSpeed,
       easing: a.nextEasing,
       complete: b._afterZoomIn
      })
     },
     changeOut: function() {
      var a =
       b.previous,
       d = a.prevEffect,
       e = {
        opacity: 0.1
       },
       c = b.direction;
      "elastic" === d && (e["down" === c || "up" === c ? "top" : "left"] = ("up" === c || "left" === c ? "-" : "+") + "=200px");
      a.wrap.animate(e, {
       duration: "none" === d ? 0 : a.prevSpeed,
       easing: a.prevEasing,
       complete: function() {
        f(this).trigger("onReset").remove()
       }
      })
     }
    };
    b.helpers.overlay = {
     defaults: {
      closeClick: !0,
      speedOut: 200,
      showEarly: !0,
      css: {},
      locked: !s,
      fixed: !0
     },
     overlay: null,
     fixed: !1,
     el: f("html"),
     create: function(a) {
      a = f.extend({}, this.defaults, a);
      this.overlay && this.close();
      this.overlay =
       f('<div class="fancybox-overlay"></div>').appendTo(b.coming ? b.coming.parent : a.parent);
      this.fixed = !1;
      a.fixed && b.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), this.fixed = !0)
     },
     open: function(a) {
      var d = this;
      a = f.extend({}, this.defaults, a);
      this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(a);
      this.fixed || (n.bind("resize.overlay", f.proxy(this.update, this)), this.update());
      a.closeClick && this.overlay.bind("click.overlay", function(a) {
       if (f(a.target).hasClass("fancybox-overlay")) return b.isActive ?
        b.close() : d.close(), !1
      });
      this.overlay.css(a.css).show()
     },
     close: function() {
      var a, b;
      n.unbind("resize.overlay");
      this.el.hasClass("fancybox-lock") && (f(".fancybox-margin").removeClass("fancybox-margin"), a = n.scrollTop(), b = n.scrollLeft(), this.el.removeClass("fancybox-lock"), n.scrollTop(a).scrollLeft(b));
      f(".fancybox-overlay").remove().hide();
      f.extend(this, {
       overlay: null,
       fixed: !1
      })
     },
     update: function() {
      var a = "100%",
       b;
      this.overlay.width(a).height("100%");
      I ? (b = Math.max(G.documentElement.offsetWidth, G.body.offsetWidth),
       p.width() > b && (a = p.width())) : p.width() > n.width() && (a = p.width());
      this.overlay.width(a).height(p.height())
     },
     onReady: function(a, b) {
      var e = this.overlay;
      f(".fancybox-overlay").stop(!0, !0);
      e || this.create(a);
      a.locked && (this.fixed && b.fixed) && (e || (this.margin = p.height() > n.height() ? f("html").css("margin-right").replace("px", "") : !1), b.locked = this.overlay.append(b.wrap), b.fixed = !1);
      !0 === a.showEarly && this.beforeShow.apply(this, arguments)
     },
     beforeShow: function(a, b) {
      var e, c;
      b.locked && (!1 !== this.margin && (f("*").filter(function() {
       return "fixed" ===
        f(this).css("position") && !f(this).hasClass("fancybox-overlay") && !f(this).hasClass("fancybox-wrap")
      }).addClass("fancybox-margin"), this.el.addClass("fancybox-margin")), e = n.scrollTop(), c = n.scrollLeft(), this.el.addClass("fancybox-lock"), n.scrollTop(e).scrollLeft(c));
      this.open(a)
     },
     onUpdate: function() {
      this.fixed || this.update()
     },
     afterClose: function(a) {
      this.overlay && !b.coming && this.overlay.fadeOut(a.speedOut, f.proxy(this.close, this))
     }
    };
    b.helpers.title = {
     defaults: {
      type: "float",
      position: "bottom"
     },
     beforeShow: function(a) {
      var d =
       b.current,
       e = d.title,
       c = a.type;
      f.isFunction(e) && (e = e.call(d.element, d));
      if (q(e) && "" !== f.trim(e)) {
       d = f('<div class="fancybox-title fancybox-title-' + c + '-wrap">' + e + "</div>");
       switch (c) {
        case "inside":
         c = b.skin;
         break;
        case "outside":
         c = b.wrap;
         break;
        case "over":
         c = b.inner;
         break;
        default:
         c = b.skin, d.appendTo("body"), I && d.width(d.width()), d.wrapInner('<span class="child"></span>'), b.current.margin[2] += Math.abs(l(d.css("margin-bottom")))
       }
       d["top" === a.position ? "prependTo" : "appendTo"](c)
      }
     }
    };
    f.fn.fancybox = function(a) {
     var d,
      e = f(this),
      c = this.selector || "",
      k = function(g) {
       var h = f(this).blur(),
        j = d,
        k, l;
       !g.ctrlKey && (!g.altKey && !g.shiftKey && !g.metaKey) && !h.is(".fancybox-wrap") && (k = a.groupAttr || "data-fancybox-group", l = h.attr(k), l || (k = "rel", l = h.get(0)[k]), l && ("" !== l && "nofollow" !== l) && (h = c.length ? f(c) : e, h = h.filter("[" + k + '="' + l + '"]'), j = h.index(this)), a.index = j, !1 !== b.open(h, a) && g.preventDefault())
      };
     a = a || {};
     d = a.index || 0;
     !c || !1 === a.live ? e.unbind("click.fb-start").bind("click.fb-start", k) : p.undelegate(c, "click.fb-start").delegate(c +
      ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", k);
     this.filter("[data-fancybox-start=1]").trigger("click");
     return this
    };
    p.ready(function() {
     var a, d;
     f.scrollbarWidth === v && (f.scrollbarWidth = function() {
      var a = f('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
       b = a.children(),
       b = b.innerWidth() - b.height(99).innerWidth();
      a.remove();
      return b
     });
     if (f.support.fixedPosition === v) {
      a = f.support;
      d = f('<div style="position:fixed;top:20px;"></div>').appendTo("body");
      var e = 20 ===
       d[0].offsetTop || 15 === d[0].offsetTop;
      d.remove();
      a.fixedPosition = e
     }
     f.extend(b.defaults, {
      scrollbarWidth: f.scrollbarWidth(),
      fixed: f.support.fixedPosition,
      parent: f("body")
     });
     a = f(r).width();
     J.addClass("fancybox-lock-test");
     d = f(r).width();
     J.removeClass("fancybox-lock-test");
     f("<style type='text/css'>.fancybox-margin{margin-right:" + (d - a) + "px;}</style>").appendTo("head")
    })
   })(window, document, jQuery);
   
   
   
   /*!
    * Masonry PACKAGED v4.1.0
    * Cascading grid layout library
    * http://masonry.desandro.com
    * MIT License
    * by David DeSandro
    */
   
   ! function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(i) {
     e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
   }(window, function(t, e) {
    "use strict";
   
    function i(i, r, a) {
     function h(t, e, n) {
      var o, r = "$()." + i + '("' + e + '")';
      return t.each(function(t, h) {
       var u = a.data(h, i);
       if (!u) return void s(i + " not initialized. Cannot call methods, i.e. " + r);
       var d = u[e];
       if (!d || "_" == e.charAt(0)) return void s(r + " is not a valid method");
       var l = d.apply(u, n);
       o = void 0 === o ? l : o
      }), void 0 !== o ? o : t
     }
   
     function u(t, e) {
      t.each(function(t, n) {
       var o = a.data(n, i);
       o ? (o.option(e), o._init()) : (o = new r(n, e), a.data(n, i, o))
      })
     }
     a = a || e || t.jQuery, a && (r.prototype.option || (r.prototype.option = function(t) {
      a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
     }), a.fn[i] = function(t) {
      if ("string" == typeof t) {
       var e = o.call(arguments, 1);
       return h(this, t, e)
      }
      return u(this, t), this
     }, n(a))
    }
   
    function n(t) {
     !t || t && t.bridget || (t.bridget = i)
    }
    var o = Array.prototype.slice,
     r = t.console,
     s = "undefined" == typeof r ? function() {} : function(t) {
      r.error(t)
     };
    return n(e || t.jQuery), i
   }),
   function(t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
   }(this, function() {
    function t() {}
    var e = t.prototype;
    return e.on = function(t, e) {
     if (t && e) {
      var i = this._events = this._events || {},
       n = i[t] = i[t] || [];
      return -1 == n.indexOf(e) && n.push(e), this
     }
    }, e.once = function(t, e) {
     if (t && e) {
      this.on(t, e);
      var i = this._onceEvents = this._onceEvents || {},
       n = i[t] = i[t] || {};
      return n[e] = !0, this
     }
    }, e.off = function(t, e) {
     var i = this._events && this._events[t];
     if (i && i.length) {
      var n = i.indexOf(e);
      return -1 != n && i.splice(n, 1), this
     }
    }, e.emitEvent = function(t, e) {
     var i = this._events && this._events[t];
     if (i && i.length) {
      var n = 0,
       o = i[n];
      e = e || [];
      for (var r = this._onceEvents && this._onceEvents[t]; o;) {
       var s = r && r[o];
       s && (this.off(t, o), delete r[o]), o.apply(this, e), n += s ? 0 : 1, o = i[n]
      }
      return this
     }
    }, t
   }),
   function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("get-size/get-size", [], function() {
     return e()
    }) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
   }(window, function() {
    "use strict";
   
    function t(t) {
     var e = parseFloat(t),
      i = -1 == t.indexOf("%") && !isNaN(e);
     return i && e
    }
   
    function e() {}
   
    function i() {
     for (var t = {
       width: 0,
       height: 0,
       innerWidth: 0,
       innerHeight: 0,
       outerWidth: 0,
       outerHeight: 0
      }, e = 0; u > e; e++) {
      var i = h[e];
      t[i] = 0
     }
     return t
    }
   
    function n(t) {
     var e = getComputedStyle(t);
     return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), e
    }
   
    function o() {
     if (!d) {
      d = !0;
      var e = document.createElement("div");
      e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
      var i = document.body || document.documentElement;
      i.appendChild(e);
      var o = n(e);
      r.isBoxSizeOuter = s = 200 == t(o.width), i.removeChild(e)
     }
    }
   
    function r(e) {
     if (o(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
      var r = n(e);
      if ("none" == r.display) return i();
      var a = {};
      a.width = e.offsetWidth, a.height = e.offsetHeight;
      for (var d = a.isBorderBox = "border-box" == r.boxSizing, l = 0; u > l; l++) {
       var c = h[l],
        f = r[c],
        m = parseFloat(f);
       a[c] = isNaN(m) ? 0 : m
      }
      var p = a.paddingLeft + a.paddingRight,
       g = a.paddingTop + a.paddingBottom,
       y = a.marginLeft + a.marginRight,
       v = a.marginTop + a.marginBottom,
       _ = a.borderLeftWidth + a.borderRightWidth,
       E = a.borderTopWidth + a.borderBottomWidth,
       z = d && s,
       b = t(r.width);
      b !== !1 && (a.width = b + (z ? 0 : p + _));
      var x = t(r.height);
      return x !== !1 && (a.height = x + (z ? 0 : g + E)), a.innerWidth = a.width - (p + _), a.innerHeight = a.height - (g + E), a.outerWidth = a.width + y, a.outerHeight = a.height + v, a
     }
    }
    var s, a = "undefined" == typeof console ? e : function(t) {
      console.error(t)
     },
     h = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
     u = h.length,
     d = !1;
    return r
   }),
   function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
   }(window, function() {
    "use strict";
    var t = function() {
     var t = Element.prototype;
     if (t.matches) return "matches";
     if (t.matchesSelector) return "matchesSelector";
     for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
      var n = e[i],
       o = n + "MatchesSelector";
      if (t[o]) return o
     }
    }();
    return function(e, i) {
     return e[t](i)
    }
   }),
   function(t, e) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(i) {
     return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
   }(window, function(t, e) {
    var i = {};
    i.extend = function(t, e) {
     for (var i in e) t[i] = e[i];
     return t
    }, i.modulo = function(t, e) {
     return (t % e + e) % e
    }, i.makeArray = function(t) {
     var e = [];
     if (Array.isArray(t)) e = t;
     else if (t && "number" == typeof t.length)
      for (var i = 0; i < t.length; i++) e.push(t[i]);
     else e.push(t);
     return e
    }, i.removeFrom = function(t, e) {
     var i = t.indexOf(e); - 1 != i && t.splice(i, 1)
    }, i.getParent = function(t, i) {
     for (; t != document.body;)
      if (t = t.parentNode, e(t, i)) return t
    }, i.getQueryElement = function(t) {
     return "string" == typeof t ? document.querySelector(t) : t
    }, i.handleEvent = function(t) {
     var e = "on" + t.type;
     this[e] && this[e](t)
    }, i.filterFindElements = function(t, n) {
     t = i.makeArray(t);
     var o = [];
     return t.forEach(function(t) {
      if (t instanceof HTMLElement) {
       if (!n) return void o.push(t);
       e(t, n) && o.push(t);
       for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++) o.push(i[r])
      }
     }), o
    }, i.debounceMethod = function(t, e, i) {
     var n = t.prototype[e],
      o = e + "Timeout";
     t.prototype[e] = function() {
      var t = this[o];
      t && clearTimeout(t);
      var e = arguments,
       r = this;
      this[o] = setTimeout(function() {
       n.apply(r, e), delete r[o]
      }, i || 100)
     }
    }, i.docReady = function(t) {
     "complete" == document.readyState ? t() : document.addEventListener("DOMContentLoaded", t)
    }, i.toDashed = function(t) {
     return t.replace(/(.)([A-Z])/g, function(t, e, i) {
      return e + "-" + i
     }).toLowerCase()
    };
    var n = t.console;
    return i.htmlInit = function(e, o) {
     i.docReady(function() {
      var r = i.toDashed(o),
       s = "data-" + r,
       a = document.querySelectorAll("[" + s + "]"),
       h = document.querySelectorAll(".js-" + r),
       u = i.makeArray(a).concat(i.makeArray(h)),
       d = s + "-options",
       l = t.jQuery;
      u.forEach(function(t) {
       var i, r = t.getAttribute(s) || t.getAttribute(d);
       try {
        i = r && JSON.parse(r)
       } catch (a) {
        return void(n && n.error("Error parsing " + s + " on " + t.className + ": " + a))
       }
       var h = new e(t, i);
       l && l.data(t, o, h)
      })
     })
    }, i
   }),
   function(t, e) {
    "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize))
   }(window, function(t, e) {
    "use strict";
   
    function i(t) {
     for (var e in t) return !1;
     return e = null, !0
    }
   
    function n(t, e) {
     t && (this.element = t, this.layout = e, this.position = {
      x: 0,
      y: 0
     }, this._create())
    }
   
    function o(t) {
     return t.replace(/([A-Z])/g, function(t) {
      return "-" + t.toLowerCase()
     })
    }
    var r = document.documentElement.style,
     s = "string" == typeof r.transition ? "transition" : "WebkitTransition",
     a = "string" == typeof r.transform ? "transform" : "WebkitTransform",
     h = {
      WebkitTransition: "webkitTransitionEnd",
      transition: "transitionend"
     } [s],
     u = {
      transform: a,
      transition: s,
      transitionDuration: s + "Duration",
      transitionProperty: s + "Property",
      transitionDelay: s + "Delay"
     },
     d = n.prototype = Object.create(t.prototype);
    d.constructor = n, d._create = function() {
     this._transn = {
      ingProperties: {},
      clean: {},
      onEnd: {}
     }, this.css({
      position: "absolute"
     })
    }, d.handleEvent = function(t) {
     var e = "on" + t.type;
     this[e] && this[e](t)
    }, d.getSize = function() {
     this.size = e(this.element)
    }, d.css = function(t) {
     var e = this.element.style;
     for (var i in t) {
      var n = u[i] || i;
      e[n] = t[i]
     }
    }, d.getPosition = function() {
     var t = getComputedStyle(this.element),
      e = this.layout._getOption("originLeft"),
      i = this.layout._getOption("originTop"),
      n = t[e ? "left" : "right"],
      o = t[i ? "top" : "bottom"],
      r = this.layout.size,
      s = -1 != n.indexOf("%") ? parseFloat(n) / 100 * r.width : parseInt(n, 10),
      a = -1 != o.indexOf("%") ? parseFloat(o) / 100 * r.height : parseInt(o, 10);
     s = isNaN(s) ? 0 : s, a = isNaN(a) ? 0 : a, s -= e ? r.paddingLeft : r.paddingRight, a -= i ? r.paddingTop : r.paddingBottom, this.position.x = s, this.position.y = a
    }, d.layoutPosition = function() {
     var t = this.layout.size,
      e = {},
      i = this.layout._getOption("originLeft"),
      n = this.layout._getOption("originTop"),
      o = i ? "paddingLeft" : "paddingRight",
      r = i ? "left" : "right",
      s = i ? "right" : "left",
      a = this.position.x + t[o];
     e[r] = this.getXValue(a), e[s] = "";
     var h = n ? "paddingTop" : "paddingBottom",
      u = n ? "top" : "bottom",
      d = n ? "bottom" : "top",
      l = this.position.y + t[h];
     e[u] = this.getYValue(l), e[d] = "", this.css(e), this.emitEvent("layout", [this])
    }, d.getXValue = function(t) {
     var e = this.layout._getOption("horizontal");
     return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px"
    }, d.getYValue = function(t) {
     var e = this.layout._getOption("horizontal");
     return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px"
    }, d._transitionTo = function(t, e) {
     this.getPosition();
     var i = this.position.x,
      n = this.position.y,
      o = parseInt(t, 10),
      r = parseInt(e, 10),
      s = o === this.position.x && r === this.position.y;
     if (this.setPosition(t, e), s && !this.isTransitioning) return void this.layoutPosition();
     var a = t - i,
      h = e - n,
      u = {};
     u.transform = this.getTranslate(a, h), this.transition({
      to: u,
      onTransitionEnd: {
       transform: this.layoutPosition
      },
      isCleaning: !0
     })
    }, d.getTranslate = function(t, e) {
     var i = this.layout._getOption("originLeft"),
      n = this.layout._getOption("originTop");
     return t = i ? t : -t, e = n ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)"
    }, d.goTo = function(t, e) {
     this.setPosition(t, e), this.layoutPosition()
    }, d.moveTo = d._transitionTo, d.setPosition = function(t, e) {
     this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
    }, d._nonTransition = function(t) {
     this.css(t.to), t.isCleaning && this._removeStyles(t.to);
     for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
    }, d.transition = function(t) {
     if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
     var e = this._transn;
     for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
     for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
     if (t.from) {
      this.css(t.from);
      var n = this.element.offsetHeight;
      n = null
     }
     this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
    };
    var l = "opacity," + o(a);
    d.enableTransition = function() {
     if (!this.isTransitioning) {
      var t = this.layout.options.transitionDuration;
      t = "number" == typeof t ? t + "ms" : t, this.css({
       transitionProperty: l,
       transitionDuration: t,
       transitionDelay: this.staggerDelay || 0
      }), this.element.addEventListener(h, this, !1)
     }
    }, d.onwebkitTransitionEnd = function(t) {
     this.ontransitionend(t)
    }, d.onotransitionend = function(t) {
     this.ontransitionend(t)
    };
    var c = {
     "-webkit-transform": "transform"
    };
    d.ontransitionend = function(t) {
     if (t.target === this.element) {
      var e = this._transn,
       n = c[t.propertyName] || t.propertyName;
      if (delete e.ingProperties[n], i(e.ingProperties) && this.disableTransition(), n in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[n]), n in e.onEnd) {
       var o = e.onEnd[n];
       o.call(this), delete e.onEnd[n]
      }
      this.emitEvent("transitionEnd", [this])
     }
    }, d.disableTransition = function() {
     this.removeTransitionStyles(), this.element.removeEventListener(h, this, !1), this.isTransitioning = !1
    }, d._removeStyles = function(t) {
     var e = {};
     for (var i in t) e[i] = "";
     this.css(e)
    };
    var f = {
     transitionProperty: "",
     transitionDuration: "",
     transitionDelay: ""
    };
    return d.removeTransitionStyles = function() {
     this.css(f)
    }, d.stagger = function(t) {
     t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms"
    }, d.removeElem = function() {
     this.element.parentNode.removeChild(this.element), this.css({
      display: ""
     }), this.emitEvent("remove", [this])
    }, d.remove = function() {
     return s && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function() {
      this.removeElem()
     }), void this.hide()) : void this.removeElem()
    }, d.reveal = function() {
     delete this.isHidden, this.css({
      display: ""
     });
     var t = this.layout.options,
      e = {},
      i = this.getHideRevealTransitionEndProperty("visibleStyle");
     e[i] = this.onRevealTransitionEnd, this.transition({
      from: t.hiddenStyle,
      to: t.visibleStyle,
      isCleaning: !0,
      onTransitionEnd: e
     })
    }, d.onRevealTransitionEnd = function() {
     this.isHidden || this.emitEvent("reveal")
    }, d.getHideRevealTransitionEndProperty = function(t) {
     var e = this.layout.options[t];
     if (e.opacity) return "opacity";
     for (var i in e) return i
    }, d.hide = function() {
     this.isHidden = !0, this.css({
      display: ""
     });
     var t = this.layout.options,
      e = {},
      i = this.getHideRevealTransitionEndProperty("hiddenStyle");
     e[i] = this.onHideTransitionEnd, this.transition({
      from: t.visibleStyle,
      to: t.hiddenStyle,
      isCleaning: !0,
      onTransitionEnd: e
     })
    }, d.onHideTransitionEnd = function() {
     this.isHidden && (this.css({
      display: "none"
     }), this.emitEvent("hide"))
    }, d.destroy = function() {
     this.css({
      position: "",
      left: "",
      right: "",
      top: "",
      bottom: "",
      transition: "",
      transform: ""
     })
    }, n
   }),
   function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(i, n, o, r) {
     return e(t, i, n, o, r)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
   }(window, function(t, e, i, n, o) {
    "use strict";
   
    function r(t, e) {
     var i = n.getQueryElement(t);
     if (!i) return void(h && h.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
     this.element = i, u && (this.$element = u(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(e);
     var o = ++l;
     this.element.outlayerGUID = o, c[o] = this, this._create();
     var r = this._getOption("initLayout");
     r && this.layout()
    }
   
    function s(t) {
     function e() {
      t.apply(this, arguments)
     }
     return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e
    }
   
    function a(t) {
     if ("number" == typeof t) return t;
     var e = t.match(/(^\d*\.?\d*)(\w*)/),
      i = e && e[1],
      n = e && e[2];
     if (!i.length) return 0;
     i = parseFloat(i);
     var o = m[n] || 1;
     return i * o
    }
    var h = t.console,
     u = t.jQuery,
     d = function() {},
     l = 0,
     c = {};
    r.namespace = "outlayer", r.Item = o, r.defaults = {
     containerStyle: {
      position: "relative"
     },
     initLayout: !0,
     originLeft: !0,
     originTop: !0,
     resize: !0,
     resizeContainer: !0,
     transitionDuration: "0.4s",
     hiddenStyle: {
      opacity: 0,
      transform: "scale(0.001)"
     },
     visibleStyle: {
      opacity: 1,
      transform: "scale(1)"
     }
    };
    var f = r.prototype;
    n.extend(f, e.prototype), f.option = function(t) {
     n.extend(this.options, t)
    }, f._getOption = function(t) {
     var e = this.constructor.compatOptions[t];
     return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
    }, r.compatOptions = {
     initLayout: "isInitLayout",
     horizontal: "isHorizontal",
     layoutInstant: "isLayoutInstant",
     originLeft: "isOriginLeft",
     originTop: "isOriginTop",
     resize: "isResizeBound",
     resizeContainer: "isResizingContainer"
    }, f._create = function() {
     this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), n.extend(this.element.style, this.options.containerStyle);
     var t = this._getOption("resize");
     t && this.bindResize()
    }, f.reloadItems = function() {
     this.items = this._itemize(this.element.children)
    }, f._itemize = function(t) {
     for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0; o < e.length; o++) {
      var r = e[o],
       s = new i(r, this);
      n.push(s)
     }
     return n
    }, f._filterFindItemElements = function(t) {
     return n.filterFindElements(t, this.options.itemSelector)
    }, f.getItemElements = function() {
     return this.items.map(function(t) {
      return t.element
     })
    }, f.layout = function() {
     this._resetLayout(), this._manageStamps();
     var t = this._getOption("layoutInstant"),
      e = void 0 !== t ? t : !this._isLayoutInited;
     this.layoutItems(this.items, e), this._isLayoutInited = !0
    }, f._init = f.layout, f._resetLayout = function() {
     this.getSize()
    }, f.getSize = function() {
     this.size = i(this.element)
    }, f._getMeasurement = function(t, e) {
     var n, o = this.options[t];
     o ? ("string" == typeof o ? n = this.element.querySelector(o) : o instanceof HTMLElement && (n = o), this[t] = n ? i(n)[e] : o) : this[t] = 0
    }, f.layoutItems = function(t, e) {
     t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
    }, f._getItemsForLayout = function(t) {
     return t.filter(function(t) {
      return !t.isIgnored
     })
    }, f._layoutItems = function(t, e) {
     if (this._emitCompleteOnItems("layout", t), t && t.length) {
      var i = [];
      t.forEach(function(t) {
       var n = this._getItemLayoutPosition(t);
       n.item = t, n.isInstant = e || t.isLayoutInstant, i.push(n)
      }, this), this._processLayoutQueue(i)
     }
    }, f._getItemLayoutPosition = function() {
     return {
      x: 0,
      y: 0
     }
    }, f._processLayoutQueue = function(t) {
     this.updateStagger(), t.forEach(function(t, e) {
      this._positionItem(t.item, t.x, t.y, t.isInstant, e)
     }, this)
    }, f.updateStagger = function() {
     var t = this.options.stagger;
     return null === t || void 0 === t ? void(this.stagger = 0) : (this.stagger = a(t), this.stagger)
    }, f._positionItem = function(t, e, i, n, o) {
     n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i))
    }, f._postLayout = function() {
     this.resizeContainer()
    }, f.resizeContainer = function() {
     var t = this._getOption("resizeContainer");
     if (t) {
      var e = this._getContainerSize();
      e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
     }
    }, f._getContainerSize = d, f._setContainerMeasure = function(t, e) {
     if (void 0 !== t) {
      var i = this.size;
      i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
     }
    }, f._emitCompleteOnItems = function(t, e) {
     function i() {
      o.dispatchEvent(t + "Complete", null, [e])
     }
   
     function n() {
      s++, s == r && i()
     }
     var o = this,
      r = e.length;
     if (!e || !r) return void i();
     var s = 0;
     e.forEach(function(e) {
      e.once(t, n)
     })
    }, f.dispatchEvent = function(t, e, i) {
     var n = e ? [e].concat(i) : i;
     if (this.emitEvent(t, n), u)
      if (this.$element = this.$element || u(this.element), e) {
       var o = u.Event(e);
       o.type = t, this.$element.trigger(o, i)
      } else this.$element.trigger(t, i)
    }, f.ignore = function(t) {
     var e = this.getItem(t);
     e && (e.isIgnored = !0)
    }, f.unignore = function(t) {
     var e = this.getItem(t);
     e && delete e.isIgnored
    }, f.stamp = function(t) {
     t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this))
    }, f.unstamp = function(t) {
     t = this._find(t), t && t.forEach(function(t) {
      n.removeFrom(this.stamps, t), this.unignore(t)
     }, this)
    }, f._find = function(t) {
     return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = n.makeArray(t)) : void 0
    }, f._manageStamps = function() {
     this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
    }, f._getBoundingRect = function() {
     var t = this.element.getBoundingClientRect(),
      e = this.size;
     this._boundingRect = {
      left: t.left + e.paddingLeft + e.borderLeftWidth,
      top: t.top + e.paddingTop + e.borderTopWidth,
      right: t.right - (e.paddingRight + e.borderRightWidth),
      bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
     }
    }, f._manageStamp = d, f._getElementOffset = function(t) {
     var e = t.getBoundingClientRect(),
      n = this._boundingRect,
      o = i(t),
      r = {
       left: e.left - n.left - o.marginLeft,
       top: e.top - n.top - o.marginTop,
       right: n.right - e.right - o.marginRight,
       bottom: n.bottom - e.bottom - o.marginBottom
      };
     return r
    }, f.handleEvent = n.handleEvent, f.bindResize = function() {
     t.addEventListener("resize", this), this.isResizeBound = !0
    }, f.unbindResize = function() {
     t.removeEventListener("resize", this), this.isResizeBound = !1
    }, f.onresize = function() {
     this.resize()
    }, n.debounceMethod(r, "onresize", 100), f.resize = function() {
     this.isResizeBound && this.needsResizeLayout() && this.layout()
    }, f.needsResizeLayout = function() {
     var t = i(this.element),
      e = this.size && t;
     return e && t.innerWidth !== this.size.innerWidth
    }, f.addItems = function(t) {
     var e = this._itemize(t);
     return e.length && (this.items = this.items.concat(e)), e
    }, f.appended = function(t) {
     var e = this.addItems(t);
     e.length && (this.layoutItems(e, !0), this.reveal(e))
    }, f.prepended = function(t) {
     var e = this._itemize(t);
     if (e.length) {
      var i = this.items.slice(0);
      this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
     }
    }, f.reveal = function(t) {
     if (this._emitCompleteOnItems("reveal", t), t && t.length) {
      var e = this.updateStagger();
      t.forEach(function(t, i) {
       t.stagger(i * e), t.reveal()
      })
     }
    }, f.hide = function(t) {
     if (this._emitCompleteOnItems("hide", t), t && t.length) {
      var e = this.updateStagger();
      t.forEach(function(t, i) {
       t.stagger(i * e), t.hide()
      })
     }
    }, f.revealItemElements = function(t) {
     var e = this.getItems(t);
     this.reveal(e)
    }, f.hideItemElements = function(t) {
     var e = this.getItems(t);
     this.hide(e)
    }, f.getItem = function(t) {
     for (var e = 0; e < this.items.length; e++) {
      var i = this.items[e];
      if (i.element == t) return i
     }
    }, f.getItems = function(t) {
     t = n.makeArray(t);
     var e = [];
     return t.forEach(function(t) {
      var i = this.getItem(t);
      i && e.push(i)
     }, this), e
    }, f.remove = function(t) {
     var e = this.getItems(t);
     this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function(t) {
      t.remove(), n.removeFrom(this.items, t)
     }, this)
    }, f.destroy = function() {
     var t = this.element.style;
     t.height = "", t.position = "", t.width = "", this.items.forEach(function(t) {
      t.destroy()
     }), this.unbindResize();
     var e = this.element.outlayerGUID;
     delete c[e], delete this.element.outlayerGUID, u && u.removeData(this.element, this.constructor.namespace)
    }, r.data = function(t) {
     t = n.getQueryElement(t);
     var e = t && t.outlayerGUID;
     return e && c[e]
    }, r.create = function(t, e) {
     var i = s(r);
     return i.defaults = n.extend({}, r.defaults), n.extend(i.defaults, e), i.compatOptions = n.extend({}, r.compatOptions), i.namespace = t, i.data = r.data, i.Item = s(o), n.htmlInit(i, t), u && u.bridget && u.bridget(t, i), i
    };
    var m = {
     ms: 1,
     s: 1e3
    };
    return r.Item = o, r
   }),
   function(t, e) {
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
   }(window, function(t, e) {
    var i = t.create("masonry");
    return i.compatOptions.fitWidth = "isFitWidth", i.prototype._resetLayout = function() {
     this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
     for (var t = 0; t < this.cols; t++) this.colYs.push(0);
     this.maxY = 0
    }, i.prototype.measureColumns = function() {
     if (this.getContainerWidth(), !this.columnWidth) {
      var t = this.items[0],
       i = t && t.element;
      this.columnWidth = i && e(i).outerWidth || this.containerWidth
     }
     var n = this.columnWidth += this.gutter,
      o = this.containerWidth + this.gutter,
      r = o / n,
      s = n - o % n,
      a = s && 1 > s ? "round" : "floor";
     r = Math[a](r), this.cols = Math.max(r, 1)
    }, i.prototype.getContainerWidth = function() {
     var t = this._getOption("fitWidth"),
      i = t ? this.element.parentNode : this.element,
      n = e(i);
     this.containerWidth = n && n.innerWidth
    }, i.prototype._getItemLayoutPosition = function(t) {
     t.getSize();
     var e = t.size.outerWidth % this.columnWidth,
      i = e && 1 > e ? "round" : "ceil",
      n = Math[i](t.size.outerWidth / this.columnWidth);
     n = Math.min(n, this.cols);
     for (var o = this._getColGroup(n), r = Math.min.apply(Math, o), s = o.indexOf(r), a = {
       x: this.columnWidth * s,
       y: r
      }, h = r + t.size.outerHeight, u = this.cols + 1 - o.length, d = 0; u > d; d++) this.colYs[s + d] = h;
     return a
    }, i.prototype._getColGroup = function(t) {
     if (2 > t) return this.colYs;
     for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) {
      var o = this.colYs.slice(n, n + t);
      e[n] = Math.max.apply(Math, o)
     }
     return e
    }, i.prototype._manageStamp = function(t) {
     var i = e(t),
      n = this._getElementOffset(t),
      o = this._getOption("originLeft"),
      r = o ? n.left : n.right,
      s = r + i.outerWidth,
      a = Math.floor(r / this.columnWidth);
     a = Math.max(0, a);
     var h = Math.floor(s / this.columnWidth);
     h -= s % this.columnWidth ? 0 : 1, h = Math.min(this.cols - 1, h);
     for (var u = this._getOption("originTop"), d = (u ? n.top : n.bottom) + i.outerHeight, l = a; h >= l; l++) this.colYs[l] = Math.max(d, this.colYs[l])
    }, i.prototype._getContainerSize = function() {
     this.maxY = Math.max.apply(Math, this.colYs);
     var t = {
      height: this.maxY
     };
     return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t
    }, i.prototype._getContainerFitWidth = function() {
     for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
     return (this.cols - t) * this.columnWidth - this.gutter
    }, i.prototype.needsResizeLayout = function() {
     var t = this.containerWidth;
     return this.getContainerWidth(), t != this.containerWidth
    }, i
   });
   
   
   
   /**
    * Owl carousel
    * @version 2.0.0
    * @author Bartosz Wojciechowski
    * @license The MIT License (MIT)
    * @todo Lazy Load Icon
    * @todo prevent animationend bubling
    * @todo itemsScaleUp
    * @todo Test Zepto
    * @todo stagePadding calculate wrong active classes
    */
   ! function(a, b, c, d) {
    function e(b, c) {
     this.settings = null, this.options = a.extend({}, e.Defaults, c), this.$element = a(b), this.drag = a.extend({}, m), this.state = a.extend({}, n), this.e = a.extend({}, o), this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._invalidated = {}, this._pipe = [], a.each(e.Plugins, a.proxy(function(a, b) {
      this._plugins[a[0].toLowerCase() + a.slice(1)] = new b(this)
     }, this)), a.each(e.Pipe, a.proxy(function(b, c) {
      this._pipe.push({
       filter: c.filter,
       run: a.proxy(c.run, this)
      })
     }, this)), this.setup(), this.initialize()
    }
   
    function f(a) {
     if (a.touches !== d) return {
      x: a.touches[0].pageX,
      y: a.touches[0].pageY
     };
     if (a.touches === d) {
      if (a.pageX !== d) return {
       x: a.pageX,
       y: a.pageY
      };
      if (a.pageX === d) return {
       x: a.clientX,
       y: a.clientY
      }
     }
    }
   
    function g(a) {
     var b, d, e = c.createElement("div"),
      f = a;
     for (b in f)
      if (d = f[b], "undefined" != typeof e.style[d]) return e = null, [d, b];
     return [!1]
    }
   
    function h() {
     return g(["transition", "WebkitTransition", "MozTransition", "OTransition"])[1]
    }
   
    function i() {
     return g(["transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform"])[0]
    }
   
    function j() {
     return g(["perspective", "webkitPerspective", "MozPerspective", "OPerspective", "MsPerspective"])[0]
    }
   
    function k() {
     return "ontouchstart" in b || !!navigator.msMaxTouchPoints
    }
   
    function l() {
     return b.navigator.msPointerEnabled
    }
    var m, n, o;
    m = {
     start: 0,
     startX: 0,
     startY: 0,
     current: 0,
     currentX: 0,
     currentY: 0,
     offsetX: 0,
     offsetY: 0,
     distance: null,
     startTime: 0,
     endTime: 0,
     updatedX: 0,
     targetEl: null
    }, n = {
     isTouch: !1,
     isScrolling: !1,
     isSwiping: !1,
     direction: !1,
     inMotion: !1
    }, o = {
     _onDragStart: null,
     _onDragMove: null,
     _onDragEnd: null,
     _transitionEnd: null,
     _resizer: null,
     _responsiveCall: null,
     _goToLoop: null,
     _checkVisibile: null
    }, e.Defaults = {
     items: 3,
     loop: !1,
     center: !1,
     mouseDrag: !0,
     touchDrag: !0,
     pullDrag: !0,
     freeDrag: !1,
     margin: 0,
     stagePadding: 0,
     merge: !1,
     mergeFit: !0,
     autoWidth: !1,
     startPosition: 0,
     rtl: !1,
     smartSpeed: 250,
     fluidSpeed: !1,
     dragEndSpeed: !1,
     responsive: {},
     responsiveRefreshRate: 200,
     responsiveBaseElement: b,
     responsiveClass: !1,
     fallbackEasing: "swing",
     info: !1,
     nestedItemSelector: !1,
     itemElement: "div",
     stageElement: "div",
     themeClass: "owl-theme",
     baseClass: "owl-carousel",
     itemClass: "owl-item",
     centerClass: "center",
     activeClass: "active"
    }, e.Width = {
     Default: "default",
     Inner: "inner",
     Outer: "outer"
    }, e.Plugins = {}, e.Pipe = [{
     filter: ["width", "items", "settings"],
     run: function(a) {
      a.current = this._items && this._items[this.relative(this._current)]
     }
    }, {
     filter: ["items", "settings"],
     run: function() {
      var a = this._clones,
       b = this.$stage.children(".cloned");
      (b.length !== a.length || !this.settings.loop && a.length > 0) && (this.$stage.children(".cloned").remove(), this._clones = [])
     }
    }, {
     filter: ["items", "settings"],
     run: function() {
      var a, b, c = this._clones,
       d = this._items,
       e = this.settings.loop ? c.length - Math.max(2 * this.settings.items, 4) : 0;
      for (a = 0, b = Math.abs(e / 2); b > a; a++) e > 0 ? (this.$stage.children().eq(d.length + c.length - 1).remove(), c.pop(), this.$stage.children().eq(0).remove(), c.pop()) : (c.push(c.length / 2), this.$stage.append(d[c[c.length - 1]].clone().addClass("cloned")), c.push(d.length - 1 - (c.length - 1) / 2), this.$stage.prepend(d[c[c.length - 1]].clone().addClass("cloned")))
     }
    }, {
     filter: ["width", "items", "settings"],
     run: function() {
      var a, b, c, d = this.settings.rtl ? 1 : -1,
       e = (this.width() / this.settings.items).toFixed(3),
       f = 0;
      for (this._coordinates = [], b = 0, c = this._clones.length + this._items.length; c > b; b++) a = this._mergers[this.relative(b)], a = this.settings.mergeFit && Math.min(a, this.settings.items) || a, f += (this.settings.autoWidth ? this._items[this.relative(b)].width() + this.settings.margin : e * a) * d, this._coordinates.push(f)
     }
    }, {
     filter: ["width", "items", "settings"],
     run: function() {
      var b, c, d = (this.width() / this.settings.items).toFixed(3),
       e = {
        width: Math.abs(this._coordinates[this._coordinates.length - 1]) + 2 * this.settings.stagePadding,
        "padding-left": this.settings.stagePadding || "",
        "padding-right": this.settings.stagePadding || ""
       };
      if (this.$stage.css(e), e = {
        width: this.settings.autoWidth ? "auto" : d - this.settings.margin
       }, e[this.settings.rtl ? "margin-left" : "margin-right"] = this.settings.margin, !this.settings.autoWidth && a.grep(this._mergers, function(a) {
        return a > 1
       }).length > 0)
       for (b = 0, c = this._coordinates.length; c > b; b++) e.width = Math.abs(this._coordinates[b]) - Math.abs(this._coordinates[b - 1] || 0) - this.settings.margin, this.$stage.children().eq(b).css(e);
      else this.$stage.children().css(e)
     }
    }, {
     filter: ["width", "items", "settings"],
     run: function(a) {
      a.current && this.reset(this.$stage.children().index(a.current))
     }
    }, {
     filter: ["position"],
     run: function() {
      this.animate(this.coordinates(this._current))
     }
    }, {
     filter: ["width", "position", "items", "settings"],
     run: function() {
      var a, b, c, d, e = this.settings.rtl ? 1 : -1,
       f = 2 * this.settings.stagePadding,
       g = this.coordinates(this.current()) + f,
       h = g + this.width() * e,
       i = [];
      for (c = 0, d = this._coordinates.length; d > c; c++) a = this._coordinates[c - 1] || 0, b = Math.abs(this._coordinates[c]) + f * e, (this.op(a, "<=", g) && this.op(a, ">", h) || this.op(b, "<", g) && this.op(b, ">", h)) && i.push(c);
      this.$stage.children("." + this.settings.activeClass).removeClass(this.settings.activeClass), this.$stage.children(":eq(" + i.join("), :eq(") + ")").addClass(this.settings.activeClass), this.settings.center && (this.$stage.children("." + this.settings.centerClass).removeClass(this.settings.centerClass), this.$stage.children().eq(this.current()).addClass(this.settings.centerClass))
     }
    }], e.prototype.initialize = function() {
     if (this.trigger("initialize"), this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("owl-rtl", this.settings.rtl), this.browserSupport(), this.settings.autoWidth && this.state.imagesLoaded !== !0) {
      var b, c, e;
      if (b = this.$element.find("img"), c = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : d, e = this.$element.children(c).width(), b.length && 0 >= e) return this.preloadAutoWidthImages(b), !1
     }
     this.$element.addClass("owl-loading"), this.$stage = a("<" + this.settings.stageElement + ' class="owl-stage"/>').wrap('<div class="owl-stage-outer">'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this._width = this.$element.width(), this.refresh(), this.$element.removeClass("owl-loading").addClass("owl-loaded"), this.eventsCall(), this.internalEvents(), this.addTriggerableEvents(), this.trigger("initialized")
    }, e.prototype.setup = function() {
     var b = this.viewport(),
      c = this.options.responsive,
      d = -1,
      e = null;
     c ? (a.each(c, function(a) {
      b >= a && a > d && (d = Number(a))
     }), e = a.extend({}, this.options, c[d]), delete e.responsive, e.responsiveClass && this.$element.attr("class", function(a, b) {
      return b.replace(/\b owl-responsive-\S+/g, "")
     }).addClass("owl-responsive-" + d)) : e = a.extend({}, this.options), (null === this.settings || this._breakpoint !== d) && (this.trigger("change", {
      property: {
       name: "settings",
       value: e
      }
     }), this._breakpoint = d, this.settings = e, this.invalidate("settings"), this.trigger("changed", {
      property: {
       name: "settings",
       value: this.settings
      }
     }))
    }, e.prototype.optionsLogic = function() {
     this.$element.toggleClass("owl-center", this.settings.center), this.settings.loop && this._items.length < this.settings.items && (this.settings.loop = !1), this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
    }, e.prototype.prepare = function(b) {
     var c = this.trigger("prepare", {
      content: b
     });
     return c.data || (c.data = a("<" + this.settings.itemElement + "/>").addClass(this.settings.itemClass).append(b)), this.trigger("prepared", {
      content: c.data
     }), c.data
    }, e.prototype.update = function() {
     for (var b = 0, c = this._pipe.length, d = a.proxy(function(a) {
       return this[a]
      }, this._invalidated), e = {}; c > b;)(this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) && this._pipe[b].run(e), b++;
     this._invalidated = {}
    }, e.prototype.width = function(a) {
     switch (a = a || e.Width.Default) {
      case e.Width.Inner:
      case e.Width.Outer:
       return this._width;
      default:
       return this._width - 2 * this.settings.stagePadding + this.settings.margin
     }
    }, e.prototype.refresh = function() {
     if (0 === this._items.length) return !1;
     (new Date).getTime();
     this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$stage.addClass("owl-refresh"), this.update(), this.$stage.removeClass("owl-refresh"), this.state.orientation = b.orientation, this.watchVisibility(), this.trigger("refreshed")
    }, e.prototype.eventsCall = function() {
     this.e._onDragStart = a.proxy(function(a) {
      this.onDragStart(a)
     }, this), this.e._onDragMove = a.proxy(function(a) {
      this.onDragMove(a)
     }, this), this.e._onDragEnd = a.proxy(function(a) {
      this.onDragEnd(a)
     }, this), this.e._onResize = a.proxy(function(a) {
      this.onResize(a)
     }, this), this.e._transitionEnd = a.proxy(function(a) {
      this.transitionEnd(a)
     }, this), this.e._preventClick = a.proxy(function(a) {
      this.preventClick(a)
     }, this)
    }, e.prototype.onThrottledResize = function() {
     b.clearTimeout(this.resizeTimer), this.resizeTimer = b.setTimeout(this.e._onResize, this.settings.responsiveRefreshRate)
    }, e.prototype.onResize = function() {
     return this._items.length ? this._width === this.$element.width() ? !1 : this.trigger("resize").isDefaultPrevented() ? !1 : (this._width = this.$element.width(), this.invalidate("width"), this.refresh(), void this.trigger("resized")) : !1
    }, e.prototype.eventsRouter = function(a) {
     var b = a.type;
     "mousedown" === b || "touchstart" === b ? this.onDragStart(a) : "mousemove" === b || "touchmove" === b ? this.onDragMove(a) : "mouseup" === b || "touchend" === b ? this.onDragEnd(a) : "touchcancel" === b && this.onDragEnd(a)
    }, e.prototype.internalEvents = function() {
     var c = (k(), l());
     this.settings.mouseDrag ? (this.$stage.on("mousedown", a.proxy(function(a) {
      this.eventsRouter(a)
     }, this)), this.$stage.on("dragstart", function() {
      return !1
     }), this.$stage.get(0).onselectstart = function() {
      return !1
     }) : this.$element.addClass("owl-text-select-on"), this.settings.touchDrag && !c && this.$stage.on("touchstart touchcancel", a.proxy(function(a) {
      this.eventsRouter(a)
     }, this)), this.transitionEndVendor && this.on(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd, !1), this.settings.responsive !== !1 && this.on(b, "resize", a.proxy(this.onThrottledResize, this))
    }, e.prototype.onDragStart = function(d) {
     var e, g, h, i;
     if (e = d.originalEvent || d || b.event, 3 === e.which || this.state.isTouch) return !1;
     if ("mousedown" === e.type && this.$stage.addClass("owl-grab"), this.trigger("drag"), this.drag.startTime = (new Date).getTime(), this.speed(0), this.state.isTouch = !0, this.state.isScrolling = !1, this.state.isSwiping = !1, this.drag.distance = 0, g = f(e).x, h = f(e).y, this.drag.offsetX = this.$stage.position().left, this.drag.offsetY = this.$stage.position().top, this.settings.rtl && (this.drag.offsetX = this.$stage.position().left + this.$stage.width() - this.width() + this.settings.margin), this.state.inMotion && this.support3d) i = this.getTransformProperty(), this.drag.offsetX = i, this.animate(i), this.state.inMotion = !0;
     else if (this.state.inMotion && !this.support3d) return this.state.inMotion = !1, !1;
     this.drag.startX = g - this.drag.offsetX, this.drag.startY = h - this.drag.offsetY, this.drag.start = g - this.drag.startX, this.drag.targetEl = e.target || e.srcElement, this.drag.updatedX = this.drag.start, ("IMG" === this.drag.targetEl.tagName || "A" === this.drag.targetEl.tagName) && (this.drag.targetEl.draggable = !1), a(c).on("mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents", a.proxy(function(a) {
      this.eventsRouter(a)
     }, this))
    }, e.prototype.onDragMove = function(a) {
     var c, e, g, h, i, j;
     this.state.isTouch && (this.state.isScrolling || (c = a.originalEvent || a || b.event, e = f(c).x, g = f(c).y, this.drag.currentX = e - this.drag.startX, this.drag.currentY = g - this.drag.startY, this.drag.distance = this.drag.currentX - this.drag.offsetX, this.drag.distance < 0 ? this.state.direction = this.settings.rtl ? "right" : "left" : this.drag.distance > 0 && (this.state.direction = this.settings.rtl ? "left" : "right"), this.settings.loop ? this.op(this.drag.currentX, ">", this.coordinates(this.minimum())) && "right" === this.state.direction ? this.drag.currentX -= (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length) : this.op(this.drag.currentX, "<", this.coordinates(this.maximum())) && "left" === this.state.direction && (this.drag.currentX += (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length)) : (h = this.coordinates(this.settings.rtl ? this.maximum() : this.minimum()), i = this.coordinates(this.settings.rtl ? this.minimum() : this.maximum()), j = this.settings.pullDrag ? this.drag.distance / 5 : 0, this.drag.currentX = Math.max(Math.min(this.drag.currentX, h + j), i + j)), (this.drag.distance > 8 || this.drag.distance < -8) && (c.preventDefault !== d ? c.preventDefault() : c.returnValue = !1, this.state.isSwiping = !0), this.drag.updatedX = this.drag.currentX, (this.drag.currentY > 16 || this.drag.currentY < -16) && this.state.isSwiping === !1 && (this.state.isScrolling = !0, this.drag.updatedX = this.drag.start), this.animate(this.drag.updatedX)))
    }, e.prototype.onDragEnd = function(b) {
     var d, e, f;
     if (this.state.isTouch) {
      if ("mouseup" === b.type && this.$stage.removeClass("owl-grab"), this.trigger("dragged"), this.drag.targetEl.removeAttribute("draggable"), this.state.isTouch = !1, this.state.isScrolling = !1, this.state.isSwiping = !1, 0 === this.drag.distance && this.state.inMotion !== !0) return this.state.inMotion = !1, !1;
      this.drag.endTime = (new Date).getTime(), d = this.drag.endTime - this.drag.startTime, e = Math.abs(this.drag.distance), (e > 3 || d > 300) && this.removeClick(this.drag.targetEl), f = this.closest(this.drag.updatedX), this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(f), this.invalidate("position"), this.update(), this.settings.pullDrag || this.drag.updatedX !== this.coordinates(f) || this.transitionEnd(), this.drag.distance = 0, a(c).off(".owl.dragEvents")
     }
    }, e.prototype.removeClick = function(c) {
     this.drag.targetEl = c, a(c).on("click.preventClick", this.e._preventClick), b.setTimeout(function() {
      a(c).off("click.preventClick")
     }, 300)
    }, e.prototype.preventClick = function(b) {
     b.preventDefault ? b.preventDefault() : b.returnValue = !1, b.stopPropagation && b.stopPropagation(), a(b.target).off("click.preventClick")
    }, e.prototype.getTransformProperty = function() {
     var a, c;
     return a = b.getComputedStyle(this.$stage.get(0), null).getPropertyValue(this.vendorName + "transform"), a = a.replace(/matrix(3d)?\(|\)/g, "").split(","), c = 16 === a.length, c !== !0 ? a[4] : a[12]
    }, e.prototype.closest = function(b) {
     var c = -1,
      d = 30,
      e = this.width(),
      f = this.coordinates();
     return this.settings.freeDrag || a.each(f, a.proxy(function(a, g) {
      return b > g - d && g + d > b ? c = a : this.op(b, "<", g) && this.op(b, ">", f[a + 1] || g - e) && (c = "left" === this.state.direction ? a + 1 : a), -1 === c
     }, this)), this.settings.loop || (this.op(b, ">", f[this.minimum()]) ? c = b = this.minimum() : this.op(b, "<", f[this.maximum()]) && (c = b = this.maximum())), c
    }, e.prototype.animate = function(b) {
     this.trigger("translate"), this.state.inMotion = this.speed() > 0, this.support3d ? this.$stage.css({
      transform: "translate3d(" + b + "px,0px, 0px)",
      transition: this.speed() / 1e3 + "s"
     }) : this.state.isTouch ? this.$stage.css({
      left: b + "px"
     }) : this.$stage.animate({
      left: b
     }, this.speed() / 1e3, this.settings.fallbackEasing, a.proxy(function() {
      this.state.inMotion && this.transitionEnd()
     }, this))
    }, e.prototype.current = function(a) {
     if (a === d) return this._current;
     if (0 === this._items.length) return d;
     if (a = this.normalize(a), this._current !== a) {
      var b = this.trigger("change", {
       property: {
        name: "position",
        value: a
       }
      });
      b.data !== d && (a = this.normalize(b.data)), this._current = a, this.invalidate("position"), this.trigger("changed", {
       property: {
        name: "position",
        value: this._current
       }
      })
     }
     return this._current
    }, e.prototype.invalidate = function(a) {
     this._invalidated[a] = !0
    }, e.prototype.reset = function(a) {
     a = this.normalize(a), a !== d && (this._speed = 0, this._current = a, this.suppress(["translate", "translated"]), this.animate(this.coordinates(a)), this.release(["translate", "translated"]))
    }, e.prototype.normalize = function(b, c) {
     var e = c ? this._items.length : this._items.length + this._clones.length;
     return !a.isNumeric(b) || 1 > e ? d : b = this._clones.length ? (b % e + e) % e : Math.max(this.minimum(c), Math.min(this.maximum(c), b))
    }, e.prototype.relative = function(a) {
     return a = this.normalize(a), a -= this._clones.length / 2, this.normalize(a, !0)
    }, e.prototype.maximum = function(a) {
     var b, c, d, e = 0,
      f = this.settings;
     if (a) return this._items.length - 1;
     if (!f.loop && f.center) b = this._items.length - 1;
     else if (f.loop || f.center)
      if (f.loop || f.center) b = this._items.length + f.items;
      else {
       if (!f.autoWidth && !f.merge) throw "Can not detect maximum absolute position.";
       for (revert = f.rtl ? 1 : -1, c = this.$stage.width() - this.$element.width();
        (d = this.coordinates(e)) && !(d * revert >= c);) b = ++e
      }
     else b = this._items.length - f.items;
     return b
    }, e.prototype.minimum = function(a) {
     return a ? 0 : this._clones.length / 2
    }, e.prototype.items = function(a) {
     return a === d ? this._items.slice() : (a = this.normalize(a, !0), this._items[a])
    }, e.prototype.mergers = function(a) {
     return a === d ? this._mergers.slice() : (a = this.normalize(a, !0), this._mergers[a])
    }, e.prototype.clones = function(b) {
     var c = this._clones.length / 2,
      e = c + this._items.length,
      f = function(a) {
       return a % 2 === 0 ? e + a / 2 : c - (a + 1) / 2
      };
     return b === d ? a.map(this._clones, function(a, b) {
      return f(b)
     }) : a.map(this._clones, function(a, c) {
      return a === b ? f(c) : null
     })
    }, e.prototype.speed = function(a) {
     return a !== d && (this._speed = a), this._speed
    }, e.prototype.coordinates = function(b) {
     var c = null;
     return b === d ? a.map(this._coordinates, a.proxy(function(a, b) {
      return this.coordinates(b)
     }, this)) : (this.settings.center ? (c = this._coordinates[b], c += (this.width() - c + (this._coordinates[b - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1)) : c = this._coordinates[b - 1] || 0, c)
    }, e.prototype.duration = function(a, b, c) {
     return Math.min(Math.max(Math.abs(b - a), 1), 6) * Math.abs(c || this.settings.smartSpeed)
    }, e.prototype.to = function(c, d) {
     if (this.settings.loop) {
      var e = c - this.relative(this.current()),
       f = this.current(),
       g = this.current(),
       h = this.current() + e,
       i = 0 > g - h ? !0 : !1,
       j = this._clones.length + this._items.length;
      h < this.settings.items && i === !1 ? (f = g + this._items.length, this.reset(f)) : h >= j - this.settings.items && i === !0 && (f = g - this._items.length, this.reset(f)), b.clearTimeout(this.e._goToLoop), this.e._goToLoop = b.setTimeout(a.proxy(function() {
       this.speed(this.duration(this.current(), f + e, d)), this.current(f + e), this.update()
      }, this), 30)
     } else this.speed(this.duration(this.current(), c, d)), this.current(c), this.update()
    }, e.prototype.next = function(a) {
     a = a || !1, this.to(this.relative(this.current()) + 1, a)
    }, e.prototype.prev = function(a) {
     a = a || !1, this.to(this.relative(this.current()) - 1, a)
    }, e.prototype.transitionEnd = function(a) {
     return a !== d && (a.stopPropagation(), (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0)) ? !1 : (this.state.inMotion = !1, void this.trigger("translated"))
    }, e.prototype.viewport = function() {
     var d;
     if (this.options.responsiveBaseElement !== b) d = a(this.options.responsiveBaseElement).width();
     else if (b.innerWidth) d = b.innerWidth;
     else {
      if (!c.documentElement || !c.documentElement.clientWidth) throw "Can not detect viewport width.";
      d = c.documentElement.clientWidth
     }
     return d
    }, e.prototype.replace = function(b) {
     this.$stage.empty(), this._items = [], b && (b = b instanceof jQuery ? b : a(b)), this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector)), b.filter(function() {
      return 1 === this.nodeType
     }).each(a.proxy(function(a, b) {
      b = this.prepare(b), this.$stage.append(b), this._items.push(b), this._mergers.push(1 * b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)
     }, this)), this.reset(a.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
    }, e.prototype.add = function(a, b) {
     b = b === d ? this._items.length : this.normalize(b, !0), this.trigger("add", {
      content: a,
      position: b
     }), 0 === this._items.length || b === this._items.length ? (this.$stage.append(a), this._items.push(a), this._mergers.push(1 * a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)) : (this._items[b].before(a), this._items.splice(b, 0, a), this._mergers.splice(b, 0, 1 * a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)), this.invalidate("items"), this.trigger("added", {
      content: a,
      position: b
     })
    }, e.prototype.remove = function(a) {
     a = this.normalize(a, !0), a !== d && (this.trigger("remove", {
      content: this._items[a],
      position: a
     }), this._items[a].remove(), this._items.splice(a, 1), this._mergers.splice(a, 1), this.invalidate("items"), this.trigger("removed", {
      content: null,
      position: a
     }))
    }, e.prototype.addTriggerableEvents = function() {
     var b = a.proxy(function(b, c) {
      return a.proxy(function(a) {
       a.relatedTarget !== this && (this.suppress([c]), b.apply(this, [].slice.call(arguments, 1)), this.release([c]))
      }, this)
     }, this);
     a.each({
      next: this.next,
      prev: this.prev,
      to: this.to,
      destroy: this.destroy,
      refresh: this.refresh,
      replace: this.replace,
      add: this.add,
      remove: this.remove
     }, a.proxy(function(a, c) {
      this.$element.on(a + ".owl.carousel", b(c, a + ".owl.carousel"))
     }, this))
    }, e.prototype.watchVisibility = function() {
     function c(a) {
      return a.offsetWidth > 0 && a.offsetHeight > 0
     }
   
     function d() {
      c(this.$element.get(0)) && (this.$element.removeClass("owl-hidden"), this.refresh(), b.clearInterval(this.e._checkVisibile))
     }
     c(this.$element.get(0)) || (this.$element.addClass("owl-hidden"), b.clearInterval(this.e._checkVisibile), this.e._checkVisibile = b.setInterval(a.proxy(d, this), 500))
    }, e.prototype.preloadAutoWidthImages = function(b) {
     var c, d, e, f;
     c = 0, d = this, b.each(function(g, h) {
      e = a(h), f = new Image, f.onload = function() {
       c++, e.attr("src", f.src), e.css("opacity", 1), c >= b.length && (d.state.imagesLoaded = !0, d.initialize())
      }, f.src = e.attr("src") || e.attr("data-src") || e.attr("data-src-retina")
     })
    }, e.prototype.destroy = function() {
     this.$element.hasClass(this.settings.themeClass) && this.$element.removeClass(this.settings.themeClass), this.settings.responsive !== !1 && a(b).off("resize.owl.carousel"), this.transitionEndVendor && this.off(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd);
     for (var d in this._plugins) this._plugins[d].destroy();
     (this.settings.mouseDrag || this.settings.touchDrag) && (this.$stage.off("mousedown touchstart touchcancel"), a(c).off(".owl.dragEvents"), this.$stage.get(0).onselectstart = function() {}, this.$stage.off("dragstart", function() {
      return !1
     })), this.$element.off(".owl"), this.$stage.children(".cloned").remove(), this.e = null, this.$element.removeData("owlCarousel"), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$stage.unwrap()
    }, e.prototype.op = function(a, b, c) {
     var d = this.settings.rtl;
     switch (b) {
      case "<":
       return d ? a > c : c > a;
      case ">":
       return d ? c > a : a > c;
      case ">=":
       return d ? c >= a : a >= c;
      case "<=":
       return d ? a >= c : c >= a
     }
    }, e.prototype.on = function(a, b, c, d) {
     a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent && a.attachEvent("on" + b, c)
    }, e.prototype.off = function(a, b, c, d) {
     a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent && a.detachEvent("on" + b, c)
    }, e.prototype.trigger = function(b, c, d) {
     var e = {
       item: {
        count: this._items.length,
        index: this.current()
       }
      },
      f = a.camelCase(a.grep(["on", b, d], function(a) {
       return a
      }).join("-").toLowerCase()),
      g = a.Event([b, "owl", d || "carousel"].join(".").toLowerCase(), a.extend({
       relatedTarget: this
      }, e, c));
     return this._supress[b] || (a.each(this._plugins, function(a, b) {
      b.onTrigger && b.onTrigger(g)
     }), this.$element.trigger(g), this.settings && "function" == typeof this.settings[f] && this.settings[f].apply(this, g)), g
    }, e.prototype.suppress = function(b) {
     a.each(b, a.proxy(function(a, b) {
      this._supress[b] = !0
     }, this))
    }, e.prototype.release = function(b) {
     a.each(b, a.proxy(function(a, b) {
      delete this._supress[b]
     }, this))
    }, e.prototype.browserSupport = function() {
     if (this.support3d = j(), this.support3d) {
      this.transformVendor = i();
      var a = ["transitionend", "webkitTransitionEnd", "transitionend", "oTransitionEnd"];
      this.transitionEndVendor = a[h()], this.vendorName = this.transformVendor.replace(/Transform/i, ""), this.vendorName = "" !== this.vendorName ? "-" + this.vendorName.toLowerCase() + "-" : ""
     }
     this.state.orientation = b.orientation
    }, a.fn.owlCarousel = function(b) {
     return this.each(function() {
      a(this).data("owlCarousel") || a(this).data("owlCarousel", new e(this, b))
     })
    }, a.fn.owlCarousel.Constructor = e
   }(window.Zepto || window.jQuery, window, document),
   function(a, b) {
    var c = function(b) {
     this._core = b, this._loaded = [], this._handlers = {
      "initialized.owl.carousel change.owl.carousel": a.proxy(function(b) {
       if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type))
        for (var c = this._core.settings, d = c.center && Math.ceil(c.items / 2) || c.items, e = c.center && -1 * d || 0, f = (b.property && b.property.value || this._core.current()) + e, g = this._core.clones().length, h = a.proxy(function(a, b) {
          this.load(b)
         }, this); e++ < d;) this.load(g / 2 + this._core.relative(f)), g && a.each(this._core.clones(this._core.relative(f++)), h)
      }, this)
     }, this._core.options = a.extend({}, c.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    c.Defaults = {
     lazyLoad: !1
    }, c.prototype.load = function(c) {
     var d = this._core.$stage.children().eq(c),
      e = d && d.find(".owl-lazy");
     !e || a.inArray(d.get(0), this._loaded) > -1 || (e.each(a.proxy(function(c, d) {
      var e, f = a(d),
       g = b.devicePixelRatio > 1 && f.attr("data-src-retina") || f.attr("data-src");
      this._core.trigger("load", {
       element: f,
       url: g
      }, "lazy"), f.is("img") ? f.one("load.owl.lazy", a.proxy(function() {
       f.css("opacity", 1), this._core.trigger("loaded", {
        element: f,
        url: g
       }, "lazy")
      }, this)).attr("src", g) : (e = new Image, e.onload = a.proxy(function() {
       f.css({
        "background-image": "url(" + g + ")",
        opacity: "1"
       }), this._core.trigger("loaded", {
        element: f,
        url: g
       }, "lazy")
      }, this), e.src = g)
     }, this)), this._loaded.push(d.get(0)))
    }, c.prototype.destroy = function() {
     var a, b;
     for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
     for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Lazy = c
   }(window.Zepto || window.jQuery, window, document),
   function(a) {
    var b = function(c) {
     this._core = c, this._handlers = {
      "initialized.owl.carousel": a.proxy(function() {
       this._core.settings.autoHeight && this.update()
      }, this),
      "changed.owl.carousel": a.proxy(function(a) {
       this._core.settings.autoHeight && "position" == a.property.name && this.update()
      }, this),
      "loaded.owl.lazy": a.proxy(function(a) {
       this._core.settings.autoHeight && a.element.closest("." + this._core.settings.itemClass) === this._core.$stage.children().eq(this._core.current()) && this.update()
      }, this)
     }, this._core.options = a.extend({}, b.Defaults, this._core.options), this._core.$element.on(this._handlers)
    };
    b.Defaults = {
     autoHeight: !1,
     autoHeightClass: "owl-height"
    }, b.prototype.update = function() {
     this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass)
    }, b.prototype.destroy = function() {
     var a, b;
     for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
     for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.AutoHeight = b
   }(window.Zepto || window.jQuery, window, document),
   function(a, b, c) {
    var d = function(b) {
     this._core = b, this._videos = {}, this._playing = null, this._fullscreen = !1, this._handlers = {
      "resize.owl.carousel": a.proxy(function(a) {
       this._core.settings.video && !this.isInFullScreen() && a.preventDefault()
      }, this),
      "refresh.owl.carousel changed.owl.carousel": a.proxy(function() {
       this._playing && this.stop()
      }, this),
      "prepared.owl.carousel": a.proxy(function(b) {
       var c = a(b.content).find(".owl-video");
       c.length && (c.css("display", "none"), this.fetch(c, a(b.content)))
      }, this)
     }, this._core.options = a.extend({}, d.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", a.proxy(function(a) {
      this.play(a)
     }, this))
    };
    d.Defaults = {
     video: !1,
     videoHeight: !1,
     videoWidth: !1
    }, d.prototype.fetch = function(a, b) {
     var c = a.attr("data-vimeo-id") ? "vimeo" : "youtube",
      d = a.attr("data-vimeo-id") || a.attr("data-youtube-id"),
      e = a.attr("data-width") || this._core.settings.videoWidth,
      f = a.attr("data-height") || this._core.settings.videoHeight,
      g = a.attr("href");
     if (!g) throw new Error("Missing video URL.");
     if (d = g.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), d[3].indexOf("youtu") > -1) c = "youtube";
     else {
      if (!(d[3].indexOf("vimeo") > -1)) throw new Error("Video URL not supported.");
      c = "vimeo"
     }
     d = d[6], this._videos[g] = {
      type: c,
      id: d,
      width: e,
      height: f
     }, b.attr("data-video", g), this.thumbnail(a, this._videos[g])
    }, d.prototype.thumbnail = function(b, c) {
     var d, e, f, g = c.width && c.height ? 'style="width:' + c.width + "px;height:" + c.height + 'px;"' : "",
      h = b.find("img"),
      i = "src",
      j = "",
      k = this._core.settings,
      l = function(a) {
       e = '<div class="owl-video-play-icon"></div>', d = k.lazyLoad ? '<div class="owl-video-tn ' + j + '" ' + i + '="' + a + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + a + ')"></div>', b.after(d), b.after(e)
      };
     return b.wrap('<div class="owl-video-wrapper"' + g + "></div>"), this._core.settings.lazyLoad && (i = "data-src", j = "owl-lazy"), h.length ? (l(h.attr(i)), h.remove(), !1) : void("youtube" === c.type ? (f = "http://img.youtube.com/vi/" + c.id + "/hqdefault.jpg", l(f)) : "vimeo" === c.type && a.ajax({
      type: "GET",
      url: "http://vimeo.com/api/v2/video/" + c.id + ".json",
      jsonp: "callback",
      dataType: "jsonp",
      success: function(a) {
       f = a[0].thumbnail_large, l(f)
      }
     }))
    }, d.prototype.stop = function() {
     this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null
    }, d.prototype.play = function(b) {
     this._core.trigger("play", null, "video"), this._playing && this.stop();
     var c, d, e = a(b.target || b.srcElement),
      f = e.closest("." + this._core.settings.itemClass),
      g = this._videos[f.attr("data-video")],
      h = g.width || "100%",
      i = g.height || this._core.$stage.height();
     "youtube" === g.type ? c = '<iframe width="' + h + '" height="' + i + '" src="http://www.youtube.com/embed/' + g.id + "?autoplay=1&v=" + g.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === g.type && (c = '<iframe src="http://player.vimeo.com/video/' + g.id + '?autoplay=1" width="' + h + '" height="' + i + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'), f.addClass("owl-video-playing"), this._playing = f, d = a('<div style="height:' + i + "px; width:" + h + 'px" class="owl-video-frame">' + c + "</div>"), e.after(d)
    }, d.prototype.isInFullScreen = function() {
     var d = c.fullscreenElement || c.mozFullScreenElement || c.webkitFullscreenElement;
     return d && a(d).parent().hasClass("owl-video-frame") && (this._core.speed(0), this._fullscreen = !0), d && this._fullscreen && this._playing ? !1 : this._fullscreen ? (this._fullscreen = !1, !1) : this._playing && this._core.state.orientation !== b.orientation ? (this._core.state.orientation = b.orientation, !1) : !0
    }, d.prototype.destroy = function() {
     var a, b;
     this._core.$element.off("click.owl.video");
     for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
     for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Video = d
   }(window.Zepto || window.jQuery, window, document),
   function(a, b, c, d) {
    var e = function(b) {
     this.core = b, this.core.options = a.extend({}, e.Defaults, this.core.options), this.swapping = !0, this.previous = d, this.next = d, this.handlers = {
      "change.owl.carousel": a.proxy(function(a) {
       "position" == a.property.name && (this.previous = this.core.current(), this.next = a.property.value)
      }, this),
      "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": a.proxy(function(a) {
       this.swapping = "translated" == a.type
      }, this),
      "translate.owl.carousel": a.proxy(function() {
       this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
      }, this)
     }, this.core.$element.on(this.handlers)
    };
    e.Defaults = {
     animateOut: !1,
     animateIn: !1
    }, e.prototype.swap = function() {
     if (1 === this.core.settings.items && this.core.support3d) {
      this.core.speed(0);
      var b, c = a.proxy(this.clear, this),
       d = this.core.$stage.children().eq(this.previous),
       e = this.core.$stage.children().eq(this.next),
       f = this.core.settings.animateIn,
       g = this.core.settings.animateOut;
      this.core.current() !== this.previous && (g && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next), d.css({
       left: b + "px"
      }).addClass("animated owl-animated-out").addClass(g).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", c)), f && e.addClass("animated owl-animated-in").addClass(f).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", c))
     }
    }, e.prototype.clear = function(b) {
     a(b.target).css({
      left: ""
     }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.transitionEnd()
    }, e.prototype.destroy = function() {
     var a, b;
     for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
     for (b in Object.getOwnPropertyNames(this)) "function" != typeof this[b] && (this[b] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Animate = e
   }(window.Zepto || window.jQuery, window, document),
   function(a, b, c) {
    var d = function(b) {
     this.core = b, this.core.options = a.extend({}, d.Defaults, this.core.options), this.handlers = {
      "translated.owl.carousel refreshed.owl.carousel": a.proxy(function() {
       this.autoplay()
      }, this),
      "play.owl.autoplay": a.proxy(function(a, b, c) {
       this.play(b, c)
      }, this),
      "stop.owl.autoplay": a.proxy(function() {
       this.stop()
      }, this),
      "mouseover.owl.autoplay": a.proxy(function() {
       this.core.settings.autoplayHoverPause && this.pause()
      }, this),
      "mouseleave.owl.autoplay": a.proxy(function() {
       this.core.settings.autoplayHoverPause && this.autoplay()
      }, this)
     }, this.core.$element.on(this.handlers)
    };
    d.Defaults = {
     autoplay: !1,
     autoplayTimeout: 5e3,
     autoplayHoverPause: !1,
     autoplaySpeed: !1
    }, d.prototype.autoplay = function() {
     this.core.settings.autoplay && !this.core.state.videoPlay ? (b.clearInterval(this.interval), this.interval = b.setInterval(a.proxy(function() {
      this.play()
     }, this), this.core.settings.autoplayTimeout)) : b.clearInterval(this.interval)
    }, d.prototype.play = function() {
     return c.hidden === !0 || this.core.state.isTouch || this.core.state.isScrolling || this.core.state.isSwiping || this.core.state.inMotion ? void 0 : this.core.settings.autoplay === !1 ? void b.clearInterval(this.interval) : void this.core.next(this.core.settings.autoplaySpeed)
    }, d.prototype.stop = function() {
     b.clearInterval(this.interval)
    }, d.prototype.pause = function() {
     b.clearInterval(this.interval)
    }, d.prototype.destroy = function() {
     var a, c;
     b.clearInterval(this.interval);
     for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
     for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.autoplay = d
   }(window.Zepto || window.jQuery, window, document),
   function(a) {
    "use strict";
    var b = function(c) {
     this._core = c, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
      next: this._core.next,
      prev: this._core.prev,
      to: this._core.to
     }, this._handlers = {
      "prepared.owl.carousel": a.proxy(function(b) {
       this._core.settings.dotsData && this._templates.push(a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
      }, this),
      "add.owl.carousel": a.proxy(function(b) {
       this._core.settings.dotsData && this._templates.splice(b.position, 0, a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
      }, this),
      "remove.owl.carousel prepared.owl.carousel": a.proxy(function(a) {
       this._core.settings.dotsData && this._templates.splice(a.position, 1)
      }, this),
      "change.owl.carousel": a.proxy(function(a) {
       if ("position" == a.property.name && !this._core.state.revert && !this._core.settings.loop && this._core.settings.navRewind) {
        var b = this._core.current(),
         c = this._core.maximum(),
         d = this._core.minimum();
        a.data = a.property.value > c ? b >= c ? d : c : a.property.value < d ? c : a.property.value
       }
      }, this),
      "changed.owl.carousel": a.proxy(function(a) {
       "position" == a.property.name && this.draw()
      }, this),
      "refreshed.owl.carousel": a.proxy(function() {
       this._initialized || (this.initialize(), this._initialized = !0), this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation")
      }, this)
     }, this._core.options = a.extend({}, b.Defaults, this._core.options), this.$element.on(this._handlers)
    };
    b.Defaults = {
     nav: !1,
     navRewind: !0,
     navText: ["prev", "next"],
     navSpeed: !1,
     navElement: "div",
     navContainer: !1,
     navContainerClass: "owl-nav",
     navClass: ["owl-prev", "owl-next"],
     slideBy: 1,
     dotClass: "owl-dot",
     dotsClass: "owl-dots",
     dots: !0,
     dotsEach: !1,
     dotData: !1,
     dotsSpeed: !1,
     dotsContainer: !1,
     controlsClass: "owl-controls"
    }, b.prototype.initialize = function() {
     var b, c, d = this._core.settings;
     d.dotsData || (this._templates = [a("<div>").addClass(d.dotClass).append(a("<span>")).prop("outerHTML")]), d.navContainer && d.dotsContainer || (this._controls.$container = a("<div>").addClass(d.controlsClass).appendTo(this.$element)), this._controls.$indicators = d.dotsContainer ? a(d.dotsContainer) : a("<div>").hide().addClass(d.dotsClass).appendTo(this._controls.$container), this._controls.$indicators.on("click", "div", a.proxy(function(b) {
      var c = a(b.target).parent().is(this._controls.$indicators) ? a(b.target).index() : a(b.target).parent().index();
      b.preventDefault(), this.to(c, d.dotsSpeed)
     }, this)), b = d.navContainer ? a(d.navContainer) : a("<div>").addClass(d.navContainerClass).prependTo(this._controls.$container), this._controls.$next = a("<" + d.navElement + ">"), this._controls.$previous = this._controls.$next.clone(), this._controls.$previous.addClass(d.navClass[0]).html(d.navText[0]).hide().prependTo(b).on("click", a.proxy(function() {
      this.prev(d.navSpeed)
     }, this)), this._controls.$next.addClass(d.navClass[1]).html(d.navText[1]).hide().appendTo(b).on("click", a.proxy(function() {
      this.next(d.navSpeed)
     }, this));
     for (c in this._overrides) this._core[c] = a.proxy(this[c], this)
    }, b.prototype.destroy = function() {
     var a, b, c, d;
     for (a in this._handlers) this.$element.off(a, this._handlers[a]);
     for (b in this._controls) this._controls[b].remove();
     for (d in this.overides) this._core[d] = this._overrides[d];
     for (c in Object.getOwnPropertyNames(this)) "function" != typeof this[c] && (this[c] = null)
    }, b.prototype.update = function() {
     var a, b, c, d = this._core.settings,
      e = this._core.clones().length / 2,
      f = e + this._core.items().length,
      g = d.center || d.autoWidth || d.dotData ? 1 : d.dotsEach || d.items;
     if ("page" !== d.slideBy && (d.slideBy = Math.min(d.slideBy, d.items)), d.dots || "page" == d.slideBy)
      for (this._pages = [], a = e, b = 0, c = 0; f > a; a++)(b >= g || 0 === b) && (this._pages.push({
       start: a - e,
       end: a - e + g - 1
      }), b = 0, ++c), b += this._core.mergers(this._core.relative(a))
    }, b.prototype.draw = function() {
     var b, c, d = "",
      e = this._core.settings,
      f = (this._core.$stage.children(), this._core.relative(this._core.current()));
     if (!e.nav || e.loop || e.navRewind || (this._controls.$previous.toggleClass("disabled", 0 >= f), this._controls.$next.toggleClass("disabled", f >= this._core.maximum())), this._controls.$previous.toggle(e.nav), this._controls.$next.toggle(e.nav), e.dots) {
      if (b = this._pages.length - this._controls.$indicators.children().length, e.dotData && 0 !== b) {
       for (c = 0; c < this._controls.$indicators.children().length; c++) d += this._templates[this._core.relative(c)];
       this._controls.$indicators.html(d)
      } else b > 0 ? (d = new Array(b + 1).join(this._templates[0]), this._controls.$indicators.append(d)) : 0 > b && this._controls.$indicators.children().slice(b).remove();
      this._controls.$indicators.find(".active").removeClass("active"), this._controls.$indicators.children().eq(a.inArray(this.current(), this._pages)).addClass("active")
     }
     this._controls.$indicators.toggle(e.dots)
    }, b.prototype.onTrigger = function(b) {
     var c = this._core.settings;
     b.page = {
      index: a.inArray(this.current(), this._pages),
      count: this._pages.length,
      size: c && (c.center || c.autoWidth || c.dotData ? 1 : c.dotsEach || c.items)
     }
    }, b.prototype.current = function() {
     var b = this._core.relative(this._core.current());
     return a.grep(this._pages, function(a) {
      return a.start <= b && a.end >= b
     }).pop()
    }, b.prototype.getPosition = function(b) {
     var c, d, e = this._core.settings;
     return "page" == e.slideBy ? (c = a.inArray(this.current(), this._pages), d = this._pages.length, b ? ++c : --c, c = this._pages[(c % d + d) % d].start) : (c = this._core.relative(this._core.current()), d = this._core.items().length, b ? c += e.slideBy : c -= e.slideBy), c
    }, b.prototype.next = function(b) {
     a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b)
    }, b.prototype.prev = function(b) {
     a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b)
    }, b.prototype.to = function(b, c, d) {
     var e;
     d ? a.proxy(this._overrides.to, this._core)(b, c) : (e = this._pages.length, a.proxy(this._overrides.to, this._core)(this._pages[(b % e + e) % e].start, c))
    }, a.fn.owlCarousel.Constructor.Plugins.Navigation = b
   }(window.Zepto || window.jQuery, window, document),
   function(a, b) {
    "use strict";
    var c = function(d) {
     this._core = d, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
      "initialized.owl.carousel": a.proxy(function() {
       "URLHash" == this._core.settings.startPosition && a(b).trigger("hashchange.owl.navigation")
      }, this),
      "prepared.owl.carousel": a.proxy(function(b) {
       var c = a(b.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");
       this._hashes[c] = b.content
      }, this)
     }, this._core.options = a.extend({}, c.Defaults, this._core.options), this.$element.on(this._handlers), a(b).on("hashchange.owl.navigation", a.proxy(function() {
      var a = b.location.hash.substring(1),
       c = this._core.$stage.children(),
       d = this._hashes[a] && c.index(this._hashes[a]) || 0;
      return a ? void this._core.to(d, !1, !0) : !1
     }, this))
    };
    c.Defaults = {
     URLhashListener: !1
    }, c.prototype.destroy = function() {
     var c, d;
     a(b).off("hashchange.owl.navigation");
     for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
     for (d in Object.getOwnPropertyNames(this)) "function" != typeof this[d] && (this[d] = null)
    }, a.fn.owlCarousel.Constructor.Plugins.Hash = c
   }(window.Zepto || window.jQuery, window, document);
   
   
   /*
    * jQuery Superfish Menu Plugin - v1.7.9
    * Copyright (c) 2016 Joel Birch
    *
    * Dual licensed under the MIT and GPL licenses:
    *	http://www.opensource.org/licenses/mit-license.php
    *	http://www.gnu.org/licenses/gpl.html
    */
   
   ;
   ! function(a, b) {
    "use strict";
    var c = function() {
     var c = {
       bcClass: "sf-breadcrumb",
       menuClass: "sf-js-enabled",
       anchorClass: "sf-with-ul",
       menuArrowClass: "sf-arrows"
      },
      d = function() {
       var b = /^(?![\w\W]*Windows Phone)[\w\W]*(iPhone|iPad|iPod)/i.test(navigator.userAgent);
       return b && a("html").css("cursor", "pointer").on("click", a.noop), b
      }(),
      e = function() {
       var a = document.documentElement.style;
       return "behavior" in a && "fill" in a && /iemobile/i.test(navigator.userAgent)
      }(),
      f = function() {
       return !!b.PointerEvent
      }(),
      g = function(a, b, d) {
       var e, f = c.menuClass;
       b.cssArrows && (f += " " + c.menuArrowClass), e = d ? "addClass" : "removeClass", a[e](f)
      },
      h = function(b, d) {
       return b.find("li." + d.pathClass).slice(0, d.pathLevels).addClass(d.hoverClass + " " + c.bcClass).filter(function() {
        return a(this).children(d.popUpSelector).hide().show().length
       }).removeClass(d.pathClass)
      },
      i = function(a, b) {
       var d = b ? "addClass" : "removeClass";
       a.children("a")[d](c.anchorClass)
      },
      j = function(a) {
       var b = a.css("ms-touch-action"),
        c = a.css("touch-action");
       c = c || b, c = "pan-y" === c ? "auto" : "pan-y", a.css({
        "ms-touch-action": c,
        "touch-action": c
       })
      },
      k = function(a) {
       return a.closest("." + c.menuClass)
      },
      l = function(a) {
       return k(a).data("sfOptions")
      },
      m = function() {
       var b = a(this),
        c = l(b);
       clearTimeout(c.sfTimer), b.siblings().superfish("hide").end().superfish("show")
      },
      n = function(b) {
       b.retainPath = a.inArray(this[0], b.$path) > -1, this.superfish("hide"), this.parents("." + b.hoverClass).length || (b.onIdle.call(k(this)), b.$path.length && a.proxy(m, b.$path)())
      },
      o = function() {
       var b = a(this),
        c = l(b);
       d ? a.proxy(n, b, c)() : (clearTimeout(c.sfTimer), c.sfTimer = setTimeout(a.proxy(n, b, c), c.delay))
      },
      p = function(b) {
       var c = a(this),
        d = l(c),
        e = c.siblings(b.data.popUpSelector);
       return d.onHandleTouch.call(e) === !1 ? this : void(e.length > 0 && e.is(":hidden") && (c.one("click.superfish", !1), "MSPointerDown" === b.type || "pointerdown" === b.type ? c.trigger("focus") : a.proxy(m, c.parent("li"))()))
      },
      q = function(b, c) {
       var g = "li:has(" + c.popUpSelector + ")";
       a.fn.hoverIntent && !c.disableHI ? b.hoverIntent(m, o, g) : b.on("mouseenter.superfish", g, m).on("mouseleave.superfish", g, o);
       var h = "MSPointerDown.superfish";
       f && (h = "pointerdown.superfish"), d || (h += " touchend.superfish"), e && (h += " mousedown.superfish"), b.on("focusin.superfish", "li", m).on("focusout.superfish", "li", o).on(h, "a", c, p)
      };
     return {
      hide: function(b) {
       if (this.length) {
        var c = this,
         d = l(c);
        if (!d) return this;
        var e = d.retainPath === !0 ? d.$path : "",
         f = c.find("li." + d.hoverClass).add(this).not(e).removeClass(d.hoverClass).children(d.popUpSelector),
         g = d.speedOut;
        if (b && (f.show(), g = 0), d.retainPath = !1, d.onBeforeHide.call(f) === !1) return this;
        f.stop(!0, !0).animate(d.animationOut, g, function() {
         var b = a(this);
         d.onHide.call(b)
        })
       }
       return this
      },
      show: function() {
       var a = l(this);
       if (!a) return this;
       var b = this.addClass(a.hoverClass),
        c = b.children(a.popUpSelector);
       return a.onBeforeShow.call(c) === !1 ? this : (c.stop(!0, !0).animate(a.animation, a.speed, function() {
        a.onShow.call(c)
       }), this)
      },
      destroy: function() {
       return this.each(function() {
        var b, d = a(this),
         e = d.data("sfOptions");
        return e ? (b = d.find(e.popUpSelector).parent("li"), clearTimeout(e.sfTimer), g(d, e), i(b), j(d), d.off(".superfish").off(".hoverIntent"), b.children(e.popUpSelector).attr("style", function(a, b) {
         return b.replace(/display[^;]+;?/g, "")
        }), e.$path.removeClass(e.hoverClass + " " + c.bcClass).addClass(e.pathClass), d.find("." + e.hoverClass).removeClass(e.hoverClass), e.onDestroy.call(d), void d.removeData("sfOptions")) : !1
       })
      },
      init: function(b) {
       return this.each(function() {
        var d = a(this);
        if (d.data("sfOptions")) return !1;
        var e = a.extend({}, a.fn.superfish.defaults, b),
         f = d.find(e.popUpSelector).parent("li");
        e.$path = h(d, e), d.data("sfOptions", e), g(d, e, !0), i(f, !0), j(d), q(d, e), f.not("." + c.bcClass).superfish("hide", !0), e.onInit.call(this)
       })
      }
     }
    }();
    a.fn.superfish = function(b, d) {
     return c[b] ? c[b].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof b && b ? a.error("Method " + b + " does not exist on jQuery.fn.superfish") : c.init.apply(this, arguments)
    }, a.fn.superfish.defaults = {
     popUpSelector: "ul,.sf-mega",
     hoverClass: "sfHover",
     pathClass: "overrideThisToUse",
     pathLevels: 1,
     delay: 800,
     animation: {
      opacity: "show"
     },
     animationOut: {
      opacity: "hide"
     },
     speed: "normal",
     speedOut: "fast",
     cssArrows: !0,
     disableHI: !1,
     onInit: a.noop,
     onBeforeShow: a.noop,
     onShow: a.noop,
     onBeforeHide: a.noop,
     onHide: a.noop,
     onIdle: a.noop,
     onDestroy: a.noop,
     onHandleTouch: a.noop
    }
   }(jQuery, window);
   
   
   /* Simple JavaScript Inheritance
    * By John Resig http://ejohn.org/
    * MIT Licensed.
    */
   ! function() {
    var t = !1;
    window.JQClass = function() {}, JQClass.classes = {}, JQClass.extend = function e(n) {
     function a() {
      !t && this._init && this._init.apply(this, arguments)
     }
     var s = this.prototype;
     t = !0;
     var i = new this;
     t = !1;
     for (var r in n) i[r] = "function" == typeof n[r] && "function" == typeof s[r] ? function(t, e) {
      return function() {
       var n = this._super;
       this._super = function(e) {
        return s[t].apply(this, e || [])
       };
       var a = e.apply(this, arguments);
       return this._super = n, a
      }
     }(r, n[r]) : n[r];
     return a.prototype = i, a.prototype.constructor = a, a.extend = e, a
    }
   }(),
   function($) {
    function camelCase(t) {
     return t.replace(/-([a-z])/g, function(t, e) {
      return e.toUpperCase()
     })
    }
    JQClass.classes.JQPlugin = JQClass.extend({
     name: "plugin",
     defaultOptions: {},
     regionalOptions: {},
     _getters: [],
     _getMarker: function() {
      return "is-" + this.name
     },
     _init: function() {
      $.extend(this.defaultOptions, this.regionalOptions && this.regionalOptions[""] || {});
      var t = camelCase(this.name);
      $[t] = this, $.fn[t] = function(e) {
       var n = Array.prototype.slice.call(arguments, 1);
       return $[t]._isNotChained(e, n) ? $[t][e].apply($[t], [this[0]].concat(n)) : this.each(function() {
        if ("string" == typeof e) {
         if ("_" === e[0] || !$[t][e]) throw "Unknown method: " + e;
         $[t][e].apply($[t], [this].concat(n))
        } else $[t]._attach(this, e)
       })
      }
     },
     setDefaults: function(t) {
      $.extend(this.defaultOptions, t || {})
     },
     _isNotChained: function(t, e) {
      return "option" === t && (0 === e.length || 1 === e.length && "string" == typeof e[0]) ? !0 : $.inArray(t, this._getters) > -1
     },
     _attach: function(t, e) {
      if (t = $(t), !t.hasClass(this._getMarker())) {
       t.addClass(this._getMarker()), e = $.extend({}, this.defaultOptions, this._getMetadata(t), e || {});
       var n = $.extend({
        name: this.name,
        elem: t,
        options: e
       }, this._instSettings(t, e));
       t.data(this.name, n), this._postAttach(t, n), this.option(t, e)
      }
     },
     _instSettings: function(t, e) {
      return {}
     },
     _postAttach: function(t, e) {},
     _getMetadata: function(elem) {
      try {
       var data = elem.data(this.name.toLowerCase()) || "";
       data = data.replace(/'/g, '"'), data = data.replace(/([a-zA-Z0-9]+):/g, function(t, e, n) {
        var a = data.substring(0, n).match(/"/g);
        return a && a.length % 2 !== 0 ? e + ":" : '"' + e + '":'
       }), data = $.parseJSON("{" + data + "}");
       for (var name in data) {
        var value = data[name];
        "string" == typeof value && value.match(/^new Date\((.*)\)$/) && (data[name] = eval(value))
       }
       return data
      } catch (e) {
       return {}
      }
     },
     _getInst: function(t) {
      return $(t).data(this.name) || {}
     },
     option: function(t, e, n) {
      t = $(t);
      var a = t.data(this.name);
      if (!e || "string" == typeof e && null == n) {
       var s = (a || {}).options;
       return s && e ? s[e] : s
      }
      if (t.hasClass(this._getMarker())) {
       var s = e || {};
       "string" == typeof e && (s = {}, s[e] = n), this._optionsChanged(t, a, s), $.extend(a.options, s)
      }
     },
     _optionsChanged: function(t, e, n) {},
     destroy: function(t) {
      t = $(t), t.hasClass(this._getMarker()) && (this._preDestroy(t, this._getInst(t)), t.removeData(this.name).removeClass(this._getMarker()))
     },
     _preDestroy: function(t, e) {}
    }), $.JQPlugin = {
     createPlugin: function(t, e) {
      "object" == typeof t && (e = t, t = "JQPlugin"), t = camelCase(t);
      var n = camelCase(e.name);
      JQClass.classes[n] = JQClass.classes[t].extend(e), new JQClass.classes[n]
     }
    }
   }(jQuery);
   
   
   
   /* http://keith-wood.name/countdown.html
    * Countdown for jQuery v2.0.2.
    * Written by Keith Wood (kbwood{at}iinet.com.au) January 2008.
    * Available under the MIT (http://keith-wood.name/licence.html) license.
    */
   (function($) {
    var w = 'countdown';
    var Y = 0;
    var O = 1;
    var W = 2;
    var D = 3;
    var H = 4;
    var M = 5;
    var S = 6;
    $.JQPlugin.createPlugin({
     name: w,
     defaultOptions: {
      until: null,
      since: null,
      timezone: null,
      serverSync: null,
      format: 'dHMS',
      layout: '',
      compact: false,
      padZeroes: false,
      significant: 0,
      description: '',
      expiryUrl: '',
      expiryText: '',
      alwaysExpire: false,
      onExpiry: null,
      onTick: null,
      tickInterval: 1
     },
     regionalOptions: {
      '': {
       labels: ['Years', 'Months', 'Weeks', 'Days', 'Hours', 'Minutes', 'Seconds'],
       labels1: ['Year', 'Month', 'Week', 'Day', 'Hour', 'Minute', 'Second'],
       compactLabels: ['y', 'm', 'w', 'd'],
       whichLabels: null,
       digits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
       timeSeparator: ':',
       isRTL: false
      }
     },
     _getters: ['getTimes'],
     _rtlClass: w + '-rtl',
     _sectionClass: w + '-section',
     _amountClass: w + '-amount',
     _periodClass: w + '-period',
     _rowClass: w + '-row',
     _holdingClass: w + '-holding',
     _showClass: w + '-show',
     _descrClass: w + '-descr',
     _timerElems: [],
     _init: function() {
      var c = this;
      this._super();
      this._serverSyncs = [];
      var d = (typeof Date.now == 'function' ? Date.now : function() {
       return new Date().getTime()
      });
      var e = (window.performance && typeof window.performance.now == 'function');
   
      function timerCallBack(a) {
       var b = (a < 1e12 ? (e ? (performance.now() + performance.timing.navigationStart) : d()) : a || d());
       if (b - g >= 1000) {
        c._updateElems();
        g = b
       }
       f(timerCallBack)
      }
      var f = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || null;
      var g = 0;
      if (!f || $.noRequestAnimationFrame) {
       $.noRequestAnimationFrame = null;
       setInterval(function() {
        c._updateElems()
       }, 980)
      } else {
       g = window.animationStartTime || window.webkitAnimationStartTime || window.mozAnimationStartTime || window.oAnimationStartTime || window.msAnimationStartTime || d();
       f(timerCallBack)
      }
     },
     UTCDate: function(a, b, c, e, f, g, h, i) {
      if (typeof b == 'object' && b.constructor == Date) {
       i = b.getMilliseconds();
       h = b.getSeconds();
       g = b.getMinutes();
       f = b.getHours();
       e = b.getDate();
       c = b.getMonth();
       b = b.getFullYear()
      }
      var d = new Date();
      d.setUTCFullYear(b);
      d.setUTCDate(1);
      d.setUTCMonth(c || 0);
      d.setUTCDate(e || 1);
      d.setUTCHours(f || 0);
      d.setUTCMinutes((g || 0) - (Math.abs(a) < 30 ? a * 60 : a));
      d.setUTCSeconds(h || 0);
      d.setUTCMilliseconds(i || 0);
      return d
     },
     periodsToSeconds: function(a) {
      return a[0] * 31557600 + a[1] * 2629800 + a[2] * 604800 + a[3] * 86400 + a[4] * 3600 + a[5] * 60 + a[6]
     },
     resync: function() {
      var d = this;
      $('.' + this._getMarker()).each(function() {
       var a = $.data(this, d.name);
       if (a.options.serverSync) {
        var b = null;
        for (var i = 0; i < d._serverSyncs.length; i++) {
         if (d._serverSyncs[i][0] == a.options.serverSync) {
          b = d._serverSyncs[i];
          break
         }
        }
        if (b[2] == null) {
         var c = ($.isFunction(a.options.serverSync) ? a.options.serverSync.apply(this, []) : null);
         b[2] = (c ? new Date().getTime() - c.getTime() : 0) - b[1]
        }
        if (a._since) {
         a._since.setMilliseconds(a._since.getMilliseconds() + b[2])
        }
        a._until.setMilliseconds(a._until.getMilliseconds() + b[2])
       }
      });
      for (var i = 0; i < d._serverSyncs.length; i++) {
       if (d._serverSyncs[i][2] != null) {
        d._serverSyncs[i][1] += d._serverSyncs[i][2];
        delete d._serverSyncs[i][2]
       }
      }
     },
     _instSettings: function(a, b) {
      return {
       _periods: [0, 0, 0, 0, 0, 0, 0]
      }
     },
     _addElem: function(a) {
      if (!this._hasElem(a)) {
       this._timerElems.push(a)
      }
     },
     _hasElem: function(a) {
      return ($.inArray(a, this._timerElems) > -1)
     },
     _removeElem: function(b) {
      this._timerElems = $.map(this._timerElems, function(a) {
       return (a == b ? null : a)
      })
     },
     _updateElems: function() {
      for (var i = this._timerElems.length - 1; i >= 0; i--) {
       this._updateCountdown(this._timerElems[i])
      }
     },
     _optionsChanged: function(a, b, c) {
      if (c.layout) {
       c.layout = c.layout.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      }
      this._resetExtraLabels(b.options, c);
      var d = (b.options.timezone != c.timezone);
      $.extend(b.options, c);
      this._adjustSettings(a, b, c.until != null || c.since != null || d);
      var e = new Date();
      if ((b._since && b._since < e) || (b._until && b._until > e)) {
       this._addElem(a[0])
      }
      this._updateCountdown(a, b)
     },
     _updateCountdown: function(a, b) {
      a = a.jquery ? a : $(a);
      b = b || this._getInst(a);
      if (!b) {
       return
      }
      a.html(this._generateHTML(b)).toggleClass(this._rtlClass, b.options.isRTL);
      if ($.isFunction(b.options.onTick)) {
       var c = b._hold != 'lap' ? b._periods : this._calculatePeriods(b, b._show, b.options.significant, new Date());
       if (b.options.tickInterval == 1 || this.periodsToSeconds(c) % b.options.tickInterval == 0) {
        b.options.onTick.apply(a[0], [c])
       }
      }
      var d = b._hold != 'pause' && (b._since ? b._now.getTime() < b._since.getTime() : b._now.getTime() >= b._until.getTime());
      if (d && !b._expiring) {
       b._expiring = true;
       if (this._hasElem(a[0]) || b.options.alwaysExpire) {
        this._removeElem(a[0]);
        if ($.isFunction(b.options.onExpiry)) {
         b.options.onExpiry.apply(a[0], [])
        }
        if (b.options.expiryText) {
         var e = b.options.layout;
         b.options.layout = b.options.expiryText;
         this._updateCountdown(a[0], b);
         b.options.layout = e
        }
        if (b.options.expiryUrl) {
         window.location = b.options.expiryUrl
        }
       }
       b._expiring = false
      } else if (b._hold == 'pause') {
       this._removeElem(a[0])
      }
     },
     _resetExtraLabels: function(a, b) {
      for (var n in b) {
       if (n.match(/[Ll]abels[02-9]|compactLabels1/)) {
        a[n] = b[n]
       }
      }
      for (var n in a) {
       if (n.match(/[Ll]abels[02-9]|compactLabels1/) && typeof b[n] === 'undefined') {
        a[n] = null
       }
      }
     },
     _adjustSettings: function(a, b, c) {
      var d = null;
      for (var i = 0; i < this._serverSyncs.length; i++) {
       if (this._serverSyncs[i][0] == b.options.serverSync) {
        d = this._serverSyncs[i][1];
        break
       }
      }
      if (d != null) {
       var e = (b.options.serverSync ? d : 0);
       var f = new Date()
      } else {
       var g = ($.isFunction(b.options.serverSync) ? b.options.serverSync.apply(a[0], []) : null);
       var f = new Date();
       var e = (g ? f.getTime() - g.getTime() : 0);
       this._serverSyncs.push([b.options.serverSync, e])
      }
      var h = b.options.timezone;
      h = (h == null ? -f.getTimezoneOffset() : h);
      if (c || (!c && b._until == null && b._since == null)) {
       b._since = b.options.since;
       if (b._since != null) {
        b._since = this.UTCDate(h, this._determineTime(b._since, null));
        if (b._since && e) {
         b._since.setMilliseconds(b._since.getMilliseconds() + e)
        }
       }
       b._until = this.UTCDate(h, this._determineTime(b.options.until, f));
       if (e) {
        b._until.setMilliseconds(b._until.getMilliseconds() + e)
       }
      }
      b._show = this._determineShow(b)
     },
     _preDestroy: function(a, b) {
      this._removeElem(a[0]);
      a.empty()
     },
     pause: function(a) {
      this._hold(a, 'pause')
     },
     lap: function(a) {
      this._hold(a, 'lap')
     },
     resume: function(a) {
      this._hold(a, null)
     },
     toggle: function(a) {
      var b = $.data(a, this.name) || {};
      this[!b._hold ? 'pause' : 'resume'](a)
     },
     toggleLap: function(a) {
      var b = $.data(a, this.name) || {};
      this[!b._hold ? 'lap' : 'resume'](a)
     },
     _hold: function(a, b) {
      var c = $.data(a, this.name);
      if (c) {
       if (c._hold == 'pause' && !b) {
        c._periods = c._savePeriods;
        var d = (c._since ? '-' : '+');
        c[c._since ? '_since' : '_until'] = this._determineTime(d + c._periods[0] + 'y' + d + c._periods[1] + 'o' + d + c._periods[2] + 'w' + d + c._periods[3] + 'd' + d + c._periods[4] + 'h' + d + c._periods[5] + 'm' + d + c._periods[6] + 's');
        this._addElem(a)
       }
       c._hold = b;
       c._savePeriods = (b == 'pause' ? c._periods : null);
       $.data(a, this.name, c);
       this._updateCountdown(a, c)
      }
     },
     getTimes: function(a) {
      var b = $.data(a, this.name);
      return (!b ? null : (b._hold == 'pause' ? b._savePeriods : (!b._hold ? b._periods : this._calculatePeriods(b, b._show, b.options.significant, new Date()))))
     },
     _determineTime: function(k, l) {
      var m = this;
      var n = function(a) {
       var b = new Date();
       b.setTime(b.getTime() + a * 1000);
       return b
      };
      var o = function(a) {
       a = a.toLowerCase();
       var b = new Date();
       var c = b.getFullYear();
       var d = b.getMonth();
       var e = b.getDate();
       var f = b.getHours();
       var g = b.getMinutes();
       var h = b.getSeconds();
       var i = /([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g;
       var j = i.exec(a);
       while (j) {
        switch (j[2] || 's') {
         case 's':
          h += parseInt(j[1], 10);
          break;
         case 'm':
          g += parseInt(j[1], 10);
          break;
         case 'h':
          f += parseInt(j[1], 10);
          break;
         case 'd':
          e += parseInt(j[1], 10);
          break;
         case 'w':
          e += parseInt(j[1], 10) * 7;
          break;
         case 'o':
          d += parseInt(j[1], 10);
          e = Math.min(e, m._getDaysInMonth(c, d));
          break;
         case 'y':
          c += parseInt(j[1], 10);
          e = Math.min(e, m._getDaysInMonth(c, d));
          break
        }
        j = i.exec(a)
       }
       return new Date(c, d, e, f, g, h, 0)
      };
      var p = (k == null ? l : (typeof k == 'string' ? o(k) : (typeof k == 'number' ? n(k) : k)));
      if (p) p.setMilliseconds(0);
      return p
     },
     _getDaysInMonth: function(a, b) {
      return 32 - new Date(a, b, 32).getDate()
     },
     _normalLabels: function(a) {
      return a
     },
     _generateHTML: function(c) {
      var d = this;
      c._periods = (c._hold ? c._periods : this._calculatePeriods(c, c._show, c.options.significant, new Date()));
      var e = false;
      var f = 0;
      var g = c.options.significant;
      var h = $.extend({}, c._show);
      for (var i = Y; i <= S; i++) {
       e |= (c._show[i] == '?' && c._periods[i] > 0);
       h[i] = (c._show[i] == '?' && !e ? null : c._show[i]);
       f += (h[i] ? 1 : 0);
       g -= (c._periods[i] > 0 ? 1 : 0)
      }
      var j = [false, false, false, false, false, false, false];
      for (var i = S; i >= Y; i--) {
       if (c._show[i]) {
        if (c._periods[i]) {
         j[i] = true
        } else {
         j[i] = g > 0;
         g--
        }
       }
      }
      var k = (c.options.compact ? c.options.compactLabels : c.options.labels);
      var l = c.options.whichLabels || this._normalLabels;
      var m = function(a) {
       var b = c.options['compactLabels' + l(c._periods[a])];
       return (h[a] ? d._translateDigits(c, c._periods[a]) + (b ? b[a] : k[a]) + ' ' : '')
      };
      var n = (c.options.padZeroes ? 2 : 1);
      var o = function(a) {
       var b = c.options['labels' + l(c._periods[a])];
       return ((!c.options.significant && h[a]) || (c.options.significant && j[a]) ? '<span class="' + d._sectionClass + '">' + '<span class="' + d._amountClass + '">' + d._minDigits(c, c._periods[a], n) + '</span>' + '<span class="' + d._periodClass + '">' + (b ? b[a] : k[a]) + '</span></span>' : '')
      };
      return (c.options.layout ? this._buildLayout(c, h, c.options.layout, c.options.compact, c.options.significant, j) : ((c.options.compact ? '<span class="' + this._rowClass + ' ' + this._amountClass + (c._hold ? ' ' + this._holdingClass : '') + '">' + m(Y) + m(O) + m(W) + m(D) + (h[H] ? this._minDigits(c, c._periods[H], 2) : '') + (h[M] ? (h[H] ? c.options.timeSeparator : '') + this._minDigits(c, c._periods[M], 2) : '') + (h[S] ? (h[H] || h[M] ? c.options.timeSeparator : '') + this._minDigits(c, c._periods[S], 2) : '') : '<span class="' + this._rowClass + ' ' + this._showClass + (c.options.significant || f) + (c._hold ? ' ' + this._holdingClass : '') + '">' + o(Y) + o(O) + o(W) + o(D) + o(H) + o(M) + o(S)) + '</span>' + (c.options.description ? '<span class="' + this._rowClass + ' ' + this._descrClass + '">' + c.options.description + '</span>' : '')))
     },
     _buildLayout: function(c, d, e, f, g, h) {
      var j = c.options[f ? 'compactLabels' : 'labels'];
      var k = c.options.whichLabels || this._normalLabels;
      var l = function(a) {
       return (c.options[(f ? 'compactLabels' : 'labels') + k(c._periods[a])] || j)[a]
      };
      var m = function(a, b) {
       return c.options.digits[Math.floor(a / b) % 10]
      };
      var o = {
       desc: c.options.description,
       sep: c.options.timeSeparator,
       yl: l(Y),
       yn: this._minDigits(c, c._periods[Y], 1),
       ynn: this._minDigits(c, c._periods[Y], 2),
       ynnn: this._minDigits(c, c._periods[Y], 3),
       y1: m(c._periods[Y], 1),
       y10: m(c._periods[Y], 10),
       y100: m(c._periods[Y], 100),
       y1000: m(c._periods[Y], 1000),
       ol: l(O),
       on: this._minDigits(c, c._periods[O], 1),
       onn: this._minDigits(c, c._periods[O], 2),
       onnn: this._minDigits(c, c._periods[O], 3),
       o1: m(c._periods[O], 1),
       o10: m(c._periods[O], 10),
       o100: m(c._periods[O], 100),
       o1000: m(c._periods[O], 1000),
       wl: l(W),
       wn: this._minDigits(c, c._periods[W], 1),
       wnn: this._minDigits(c, c._periods[W], 2),
       wnnn: this._minDigits(c, c._periods[W], 3),
       w1: m(c._periods[W], 1),
       w10: m(c._periods[W], 10),
       w100: m(c._periods[W], 100),
       w1000: m(c._periods[W], 1000),
       dl: l(D),
       dn: this._minDigits(c, c._periods[D], 1),
       dnn: this._minDigits(c, c._periods[D], 2),
       dnnn: this._minDigits(c, c._periods[D], 3),
       d1: m(c._periods[D], 1),
       d10: m(c._periods[D], 10),
       d100: m(c._periods[D], 100),
       d1000: m(c._periods[D], 1000),
       hl: l(H),
       hn: this._minDigits(c, c._periods[H], 1),
       hnn: this._minDigits(c, c._periods[H], 2),
       hnnn: this._minDigits(c, c._periods[H], 3),
       h1: m(c._periods[H], 1),
       h10: m(c._periods[H], 10),
       h100: m(c._periods[H], 100),
       h1000: m(c._periods[H], 1000),
       ml: l(M),
       mn: this._minDigits(c, c._periods[M], 1),
       mnn: this._minDigits(c, c._periods[M], 2),
       mnnn: this._minDigits(c, c._periods[M], 3),
       m1: m(c._periods[M], 1),
       m10: m(c._periods[M], 10),
       m100: m(c._periods[M], 100),
       m1000: m(c._periods[M], 1000),
       sl: l(S),
       sn: this._minDigits(c, c._periods[S], 1),
       snn: this._minDigits(c, c._periods[S], 2),
       snnn: this._minDigits(c, c._periods[S], 3),
       s1: m(c._periods[S], 1),
       s10: m(c._periods[S], 10),
       s100: m(c._periods[S], 100),
       s1000: m(c._periods[S], 1000)
      };
      var p = e;
      for (var i = Y; i <= S; i++) {
       var q = 'yowdhms'.charAt(i);
       var r = new RegExp('\\{' + q + '<\\}([\\s\\S]*)\\{' + q + '>\\}', 'g');
       p = p.replace(r, ((!g && d[i]) || (g && h[i]) ? '$1' : ''))
      }
      $.each(o, function(n, v) {
       var a = new RegExp('\\{' + n + '\\}', 'g');
       p = p.replace(a, v)
      });
      return p
     },
     _minDigits: function(a, b, c) {
      b = '' + b;
      if (b.length >= c) {
       return this._translateDigits(a, b)
      }
      b = '0000000000' + b;
      return this._translateDigits(a, b.substr(b.length - c))
     },
     _translateDigits: function(b, c) {
      return ('' + c).replace(/[0-9]/g, function(a) {
       return b.options.digits[a]
      })
     },
     _determineShow: function(a) {
      var b = a.options.format;
      var c = [];
      c[Y] = (b.match('y') ? '?' : (b.match('Y') ? '!' : null));
      c[O] = (b.match('o') ? '?' : (b.match('O') ? '!' : null));
      c[W] = (b.match('w') ? '?' : (b.match('W') ? '!' : null));
      c[D] = (b.match('d') ? '?' : (b.match('D') ? '!' : null));
      c[H] = (b.match('h') ? '?' : (b.match('H') ? '!' : null));
      c[M] = (b.match('m') ? '?' : (b.match('M') ? '!' : null));
      c[S] = (b.match('s') ? '?' : (b.match('S') ? '!' : null));
      return c
     },
     _calculatePeriods: function(c, d, e, f) {
      c._now = f;
      c._now.setMilliseconds(0);
      var g = new Date(c._now.getTime());
      if (c._since) {
       if (f.getTime() < c._since.getTime()) {
        c._now = f = g
       } else {
        f = c._since
       }
      } else {
       g.setTime(c._until.getTime());
       if (f.getTime() > c._until.getTime()) {
        c._now = f = g
       }
      }
      var h = [0, 0, 0, 0, 0, 0, 0];
      if (d[Y] || d[O]) {
       var i = this._getDaysInMonth(f.getFullYear(), f.getMonth());
       var j = this._getDaysInMonth(g.getFullYear(), g.getMonth());
       var k = (g.getDate() == f.getDate() || (g.getDate() >= Math.min(i, j) && f.getDate() >= Math.min(i, j)));
       var l = function(a) {
        return (a.getHours() * 60 + a.getMinutes()) * 60 + a.getSeconds()
       };
       var m = Math.max(0, (g.getFullYear() - f.getFullYear()) * 12 + g.getMonth() - f.getMonth() + ((g.getDate() < f.getDate() && !k) || (k && l(g) < l(f)) ? -1 : 0));
       h[Y] = (d[Y] ? Math.floor(m / 12) : 0);
       h[O] = (d[O] ? m - h[Y] * 12 : 0);
       f = new Date(f.getTime());
       var n = (f.getDate() == i);
       var o = this._getDaysInMonth(f.getFullYear() + h[Y], f.getMonth() + h[O]);
       if (f.getDate() > o) {
        f.setDate(o)
       }
       f.setFullYear(f.getFullYear() + h[Y]);
       f.setMonth(f.getMonth() + h[O]);
       if (n) {
        f.setDate(o)
       }
      }
      var p = Math.floor((g.getTime() - f.getTime()) / 1000);
      var q = function(a, b) {
       h[a] = (d[a] ? Math.floor(p / b) : 0);
       p -= h[a] * b
      };
      q(W, 604800);
      q(D, 86400);
      q(H, 3600);
      q(M, 60);
      q(S, 1);
      if (p > 0 && !c._since) {
       var r = [1, 12, 4.3482, 7, 24, 60, 60];
       var s = S;
       var t = 1;
       for (var u = S; u >= Y; u--) {
        if (d[u]) {
         if (h[s] >= t) {
          h[s] = 0;
          p = 1
         }
         if (p > 0) {
          h[u]++;
          p = 0;
          s = u;
          t = 1
         }
        }
        t *= r[u]
       }
      }
      if (e) {
       for (var u = Y; u <= S; u++) {
        if (e && h[u]) {
         e--
        } else if (!e) {
         h[u] = 0
        }
       }
      }
      return h
     }
    })
   })(jQuery);
   
   
   /*! jQuery Validation Plugin - v1.15.0 - 2/24/2016
    * http://jqueryvalidation.org/
    * Copyright (c) 2016 Jörn Zaefferer; Licensed MIT */
   ! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof module && module.exports ? module.exports = a(require("jquery")) : a(jQuery)
   }(function(a) {
    a.extend(a.fn, {
     validate: function(b) {
      if (!this.length) return void(b && b.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
      var c = a.data(this[0], "validator");
      return c ? c : (this.attr("novalidate", "novalidate"), c = new a.validator(b, this[0]), a.data(this[0], "validator", c), c.settings.onsubmit && (this.on("click.validate", ":submit", function(b) {
       c.settings.submitHandler && (c.submitButton = b.target), a(this).hasClass("cancel") && (c.cancelSubmit = !0), void 0 !== a(this).attr("formnovalidate") && (c.cancelSubmit = !0)
      }), this.on("submit.validate", function(b) {
       function d() {
        var d, e;
        return c.settings.submitHandler ? (c.submitButton && (d = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)), e = c.settings.submitHandler.call(c, c.currentForm, b), c.submitButton && d.remove(), void 0 !== e ? e : !1) : !0
       }
       return c.settings.debug && b.preventDefault(), c.cancelSubmit ? (c.cancelSubmit = !1, d()) : c.form() ? c.pendingRequest ? (c.formSubmitted = !0, !1) : d() : (c.focusInvalid(), !1)
      })), c)
     },
     valid: function() {
      var b, c, d;
      return a(this[0]).is("form") ? b = this.validate().form() : (d = [], b = !0, c = a(this[0].form).validate(), this.each(function() {
       b = c.element(this) && b, b || (d = d.concat(c.errorList))
      }), c.errorList = d), b
     },
     rules: function(b, c) {
      if (this.length) {
       var d, e, f, g, h, i, j = this[0];
       if (b) switch (d = a.data(j.form, "validator").settings, e = d.rules, f = a.validator.staticRules(j), b) {
        case "add":
         a.extend(f, a.validator.normalizeRule(c)), delete f.messages, e[j.name] = f, c.messages && (d.messages[j.name] = a.extend(d.messages[j.name], c.messages));
         break;
        case "remove":
         return c ? (i = {}, a.each(c.split(/\s/), function(b, c) {
          i[c] = f[c], delete f[c], "required" === c && a(j).removeAttr("aria-required")
         }), i) : (delete e[j.name], f)
       }
       return g = a.validator.normalizeRules(a.extend({}, a.validator.classRules(j), a.validator.attributeRules(j), a.validator.dataRules(j), a.validator.staticRules(j)), j), g.required && (h = g.required, delete g.required, g = a.extend({
        required: h
       }, g), a(j).attr("aria-required", "true")), g.remote && (h = g.remote, delete g.remote, g = a.extend(g, {
        remote: h
       })), g
      }
     }
    }), a.extend(a.expr[":"], {
     blank: function(b) {
      return !a.trim("" + a(b).val())
     },
     filled: function(b) {
      var c = a(b).val();
      return null !== c && !!a.trim("" + c)
     },
     unchecked: function(b) {
      return !a(b).prop("checked")
     }
    }), a.validator = function(b, c) {
     this.settings = a.extend(!0, {}, a.validator.defaults, b), this.currentForm = c, this.init()
    }, a.validator.format = function(b, c) {
     return 1 === arguments.length ? function() {
      var c = a.makeArray(arguments);
      return c.unshift(b), a.validator.format.apply(this, c)
     } : void 0 === c ? b : (arguments.length > 2 && c.constructor !== Array && (c = a.makeArray(arguments).slice(1)), c.constructor !== Array && (c = [c]), a.each(c, function(a, c) {
      b = b.replace(new RegExp("\\{" + a + "\\}", "g"), function() {
       return c
      })
     }), b)
    }, a.extend(a.validator, {
     defaults: {
      messages: {},
      groups: {},
      rules: {},
      errorClass: "error",
      pendingClass: "pending",
      validClass: "valid",
      errorElement: "label",
      focusCleanup: !1,
      focusInvalid: !0,
      errorContainer: a([]),
      errorLabelContainer: a([]),
      onsubmit: !0,
      ignore: ":hidden",
      ignoreTitle: !1,
      onfocusin: function(a) {
       this.lastActive = a, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(a)))
      },
      onfocusout: function(a) {
       this.checkable(a) || !(a.name in this.submitted) && this.optional(a) || this.element(a)
      },
      onkeyup: function(b, c) {
       var d = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
       9 === c.which && "" === this.elementValue(b) || -1 !== a.inArray(c.keyCode, d) || (b.name in this.submitted || b.name in this.invalid) && this.element(b)
      },
      onclick: function(a) {
       a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode)
      },
      highlight: function(b, c, d) {
       "radio" === b.type ? this.findByName(b.name).addClass(c).removeClass(d) : a(b).addClass(c).removeClass(d)
      },
      unhighlight: function(b, c, d) {
       "radio" === b.type ? this.findByName(b.name).removeClass(c).addClass(d) : a(b).removeClass(c).addClass(d)
      }
     },
     setDefaults: function(b) {
      a.extend(a.validator.defaults, b)
     },
     messages: {
      required: "This field is required.",
      remote: "Please fix this field.",
      email: "Please enter a valid email address.",
      url: "Please enter a valid URL.",
      date: "Please enter a valid date.",
      dateISO: "Please enter a valid date ( ISO ).",
      number: "Please enter a valid number.",
      digits: "Please enter only digits.",
      equalTo: "Please enter the same value again.",
      maxlength: a.validator.format("Please enter no more than {0} characters."),
      minlength: a.validator.format("Please enter at least {0} characters."),
      rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."),
      range: a.validator.format("Please enter a value between {0} and {1}."),
      max: a.validator.format("Please enter a value less than or equal to {0}."),
      min: a.validator.format("Please enter a value greater than or equal to {0}."),
      step: a.validator.format("Please enter a multiple of {0}.")
     },
     autoCreateRanges: !1,
     prototype: {
      init: function() {
       function b(b) {
        var c = a.data(this.form, "validator"),
         d = "on" + b.type.replace(/^validate/, ""),
         e = c.settings;
        e[d] && !a(this).is(e.ignore) && e[d].call(c, this, b)
       }
       this.labelContainer = a(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm), this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
       var c, d = this.groups = {};
       a.each(this.settings.groups, function(b, c) {
        "string" == typeof c && (c = c.split(/\s/)), a.each(c, function(a, c) {
         d[c] = b
        })
       }), c = this.settings.rules, a.each(c, function(b, d) {
        c[b] = a.validator.normalizeRule(d)
       }), a(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable]", b).on("click.validate", "select, option, [type='radio'], [type='checkbox']", b), this.settings.invalidHandler && a(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler), a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
      },
      form: function() {
       return this.checkForm(), a.extend(this.submitted, this.errorMap), this.invalid = a.extend({}, this.errorMap), this.valid() || a(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
      },
      checkForm: function() {
       this.prepareForm();
       for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++) this.check(b[a]);
       return this.valid()
      },
      element: function(b) {
       var c, d, e = this.clean(b),
        f = this.validationTargetFor(e),
        g = this,
        h = !0;
       return void 0 === f ? delete this.invalid[e.name] : (this.prepareElement(f), this.currentElements = a(f), d = this.groups[f.name], d && a.each(this.groups, function(a, b) {
        b === d && a !== f.name && (e = g.validationTargetFor(g.clean(g.findByName(a))), e && e.name in g.invalid && (g.currentElements.push(e), h = h && g.check(e)))
       }), c = this.check(f) !== !1, h = h && c, c ? this.invalid[f.name] = !1 : this.invalid[f.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), a(b).attr("aria-invalid", !c)), h
      },
      showErrors: function(b) {
       if (b) {
        var c = this;
        a.extend(this.errorMap, b), this.errorList = a.map(this.errorMap, function(a, b) {
         return {
          message: a,
          element: c.findByName(b)[0]
         }
        }), this.successList = a.grep(this.successList, function(a) {
         return !(a.name in b)
        })
       }
       this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
      },
      resetForm: function() {
       a.fn.resetForm && a(this.currentForm).resetForm(), this.invalid = {}, this.submitted = {}, this.prepareForm(), this.hideErrors();
       var b = this.elements().removeData("previousValue").removeAttr("aria-invalid");
       this.resetElements(b)
      },
      resetElements: function(a) {
       var b;
       if (this.settings.unhighlight)
        for (b = 0; a[b]; b++) this.settings.unhighlight.call(this, a[b], this.settings.errorClass, ""), this.findByName(a[b].name).removeClass(this.settings.validClass);
       else a.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)
      },
      numberOfInvalids: function() {
       return this.objectLength(this.invalid)
      },
      objectLength: function(a) {
       var b, c = 0;
       for (b in a) a[b] && c++;
       return c
      },
      hideErrors: function() {
       this.hideThese(this.toHide)
      },
      hideThese: function(a) {
       a.not(this.containers).text(""), this.addWrapper(a).hide()
      },
      valid: function() {
       return 0 === this.size()
      },
      size: function() {
       return this.errorList.length
      },
      focusInvalid: function() {
       if (this.settings.focusInvalid) try {
        a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
       } catch (b) {}
      },
      findLastActive: function() {
       var b = this.lastActive;
       return b && 1 === a.grep(this.errorList, function(a) {
        return a.element.name === b.name
       }).length && b
      },
      elements: function() {
       var b = this,
        c = {};
       return a(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function() {
        var d = this.name || a(this).attr("name");
        return !d && b.settings.debug && window.console && console.error("%o has no name assigned", this), this.hasAttribute("contenteditable") && (this.form = a(this).closest("form")[0]), d in c || !b.objectLength(a(this).rules()) ? !1 : (c[d] = !0, !0)
       })
      },
      clean: function(b) {
       return a(b)[0]
      },
      errors: function() {
       var b = this.settings.errorClass.split(" ").join(".");
       return a(this.settings.errorElement + "." + b, this.errorContext)
      },
      resetInternals: function() {
       this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = a([]), this.toHide = a([])
      },
      reset: function() {
       this.resetInternals(), this.currentElements = a([])
      },
      prepareForm: function() {
       this.reset(), this.toHide = this.errors().add(this.containers)
      },
      prepareElement: function(a) {
       this.reset(), this.toHide = this.errorsFor(a)
      },
      elementValue: function(b) {
       var c, d, e = a(b),
        f = b.type;
       return "radio" === f || "checkbox" === f ? this.findByName(b.name).filter(":checked").val() : "number" === f && "undefined" != typeof b.validity ? b.validity.badInput ? "NaN" : e.val() : (c = b.hasAttribute("contenteditable") ? e.text() : e.val(), "file" === f ? "C:\\fakepath\\" === c.substr(0, 12) ? c.substr(12) : (d = c.lastIndexOf("/"), d >= 0 ? c.substr(d + 1) : (d = c.lastIndexOf("\\"), d >= 0 ? c.substr(d + 1) : c)) : "string" == typeof c ? c.replace(/\r/g, "") : c)
      },
      check: function(b) {
       b = this.validationTargetFor(this.clean(b));
       var c, d, e, f = a(b).rules(),
        g = a.map(f, function(a, b) {
         return b
        }).length,
        h = !1,
        i = this.elementValue(b);
       if ("function" == typeof f.normalizer) {
        if (i = f.normalizer.call(b, i), "string" != typeof i) throw new TypeError("The normalizer should return a string value.");
        delete f.normalizer
       }
       for (d in f) {
        e = {
         method: d,
         parameters: f[d]
        };
        try {
         if (c = a.validator.methods[d].call(this, i, b, e.parameters), "dependency-mismatch" === c && 1 === g) {
          h = !0;
          continue
         }
         if (h = !1, "pending" === c) return void(this.toHide = this.toHide.not(this.errorsFor(b)));
         if (!c) return this.formatAndAdd(b, e), !1
        } catch (j) {
         throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method.", j), j instanceof TypeError && (j.message += ".  Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method."), j
        }
       }
       if (!h) return this.objectLength(f) && this.successList.push(b), !0
      },
      customDataMessage: function(b, c) {
       return a(b).data("msg" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()) || a(b).data("msg")
      },
      customMessage: function(a, b) {
       var c = this.settings.messages[a];
       return c && (c.constructor === String ? c : c[b])
      },
      findDefined: function() {
       for (var a = 0; a < arguments.length; a++)
        if (void 0 !== arguments[a]) return arguments[a]
      },
      defaultMessage: function(b, c) {
       var d = this.findDefined(this.customMessage(b.name, c.method), this.customDataMessage(b, c.method), !this.settings.ignoreTitle && b.title || void 0, a.validator.messages[c.method], "<strong>Warning: No message defined for " + b.name + "</strong>"),
        e = /\$?\{(\d+)\}/g;
       return "function" == typeof d ? d = d.call(this, c.parameters, b) : e.test(d) && (d = a.validator.format(d.replace(e, "{$1}"), c.parameters)), d
      },
      formatAndAdd: function(a, b) {
       var c = this.defaultMessage(a, b);
       this.errorList.push({
        message: c,
        element: a,
        method: b.method
       }), this.errorMap[a.name] = c, this.submitted[a.name] = c
      },
      addWrapper: function(a) {
       return this.settings.wrapper && (a = a.add(a.parent(this.settings.wrapper))), a
      },
      defaultShowErrors: function() {
       var a, b, c;
       for (a = 0; this.errorList[a]; a++) c = this.errorList[a], this.settings.highlight && this.settings.highlight.call(this, c.element, this.settings.errorClass, this.settings.validClass), this.showLabel(c.element, c.message);
       if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
        for (a = 0; this.successList[a]; a++) this.showLabel(this.successList[a]);
       if (this.settings.unhighlight)
        for (a = 0, b = this.validElements(); b[a]; a++) this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass);
       this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
      },
      validElements: function() {
       return this.currentElements.not(this.invalidElements())
      },
      invalidElements: function() {
       return a(this.errorList).map(function() {
        return this.element
       })
      },
      showLabel: function(b, c) {
       var d, e, f, g, h = this.errorsFor(b),
        i = this.idOrName(b),
        j = a(b).attr("aria-describedby");
       h.length ? (h.removeClass(this.settings.validClass).addClass(this.settings.errorClass), h.html(c)) : (h = a("<" + this.settings.errorElement + ">").attr("id", i + "-error").addClass(this.settings.errorClass).html(c || ""), d = h, this.settings.wrapper && (d = h.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(d) : this.settings.errorPlacement ? this.settings.errorPlacement(d, a(b)) : d.insertAfter(b), h.is("label") ? h.attr("for", i) : 0 === h.parents("label[for='" + this.escapeCssMeta(i) + "']").length && (f = h.attr("id"), j ? j.match(new RegExp("\\b" + this.escapeCssMeta(f) + "\\b")) || (j += " " + f) : j = f, a(b).attr("aria-describedby", j), e = this.groups[b.name], e && (g = this, a.each(g.groups, function(b, c) {
        c === e && a("[name='" + g.escapeCssMeta(b) + "']", g.currentForm).attr("aria-describedby", h.attr("id"))
       })))), !c && this.settings.success && (h.text(""), "string" == typeof this.settings.success ? h.addClass(this.settings.success) : this.settings.success(h, b)), this.toShow = this.toShow.add(h)
      },
      errorsFor: function(b) {
       var c = this.escapeCssMeta(this.idOrName(b)),
        d = a(b).attr("aria-describedby"),
        e = "label[for='" + c + "'], label[for='" + c + "'] *";
       return d && (e = e + ", #" + this.escapeCssMeta(d).replace(/\s+/g, ", #")), this.errors().filter(e)
      },
      escapeCssMeta: function(a) {
       return a.replace(/([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g, "\\$1")
      },
      idOrName: function(a) {
       return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name)
      },
      validationTargetFor: function(b) {
       return this.checkable(b) && (b = this.findByName(b.name)), a(b).not(this.settings.ignore)[0]
      },
      checkable: function(a) {
       return /radio|checkbox/i.test(a.type)
      },
      findByName: function(b) {
       return a(this.currentForm).find("[name='" + this.escapeCssMeta(b) + "']")
      },
      getLength: function(b, c) {
       switch (c.nodeName.toLowerCase()) {
        case "select":
         return a("option:selected", c).length;
        case "input":
         if (this.checkable(c)) return this.findByName(c.name).filter(":checked").length
       }
       return b.length
      },
      depend: function(a, b) {
       return this.dependTypes[typeof a] ? this.dependTypes[typeof a](a, b) : !0
      },
      dependTypes: {
       "boolean": function(a) {
        return a
       },
       string: function(b, c) {
        return !!a(b, c.form).length
       },
       "function": function(a, b) {
        return a(b)
       }
      },
      optional: function(b) {
       var c = this.elementValue(b);
       return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch"
      },
      startRequest: function(b) {
       this.pending[b.name] || (this.pendingRequest++, a(b).addClass(this.settings.pendingClass), this.pending[b.name] = !0)
      },
      stopRequest: function(b, c) {
       this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[b.name], a(b).removeClass(this.settings.pendingClass), c && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (a(this.currentForm).submit(), this.formSubmitted = !1) : !c && 0 === this.pendingRequest && this.formSubmitted && (a(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
      },
      previousValue: function(b, c) {
       return a.data(b, "previousValue") || a.data(b, "previousValue", {
        old: null,
        valid: !0,
        message: this.defaultMessage(b, {
         method: c
        })
       })
      },
      destroy: function() {
       this.resetForm(), a(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur")
      }
     },
     classRuleSettings: {
      required: {
       required: !0
      },
      email: {
       email: !0
      },
      url: {
       url: !0
      },
      date: {
       date: !0
      },
      dateISO: {
       dateISO: !0
      },
      number: {
       number: !0
      },
      digits: {
       digits: !0
      },
      creditcard: {
       creditcard: !0
      }
     },
     addClassRules: function(b, c) {
      b.constructor === String ? this.classRuleSettings[b] = c : a.extend(this.classRuleSettings, b)
     },
     classRules: function(b) {
      var c = {},
       d = a(b).attr("class");
      return d && a.each(d.split(" "), function() {
       this in a.validator.classRuleSettings && a.extend(c, a.validator.classRuleSettings[this])
      }), c
     },
     normalizeAttributeRule: function(a, b, c, d) {
      /min|max|step/.test(c) && (null === b || /number|range|text/.test(b)) && (d = Number(d), isNaN(d) && (d = void 0)), d || 0 === d ? a[c] = d : b === c && "range" !== b && (a[c] = !0)
     },
     attributeRules: function(b) {
      var c, d, e = {},
       f = a(b),
       g = b.getAttribute("type");
      for (c in a.validator.methods) "required" === c ? (d = b.getAttribute(c), "" === d && (d = !0), d = !!d) : d = f.attr(c), this.normalizeAttributeRule(e, g, c, d);
      return e.maxlength && /-1|2147483647|524288/.test(e.maxlength) && delete e.maxlength, e
     },
     dataRules: function(b) {
      var c, d, e = {},
       f = a(b),
       g = b.getAttribute("type");
      for (c in a.validator.methods) d = f.data("rule" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()), this.normalizeAttributeRule(e, g, c, d);
      return e
     },
     staticRules: function(b) {
      var c = {},
       d = a.data(b.form, "validator");
      return d.settings.rules && (c = a.validator.normalizeRule(d.settings.rules[b.name]) || {}), c
     },
     normalizeRules: function(b, c) {
      return a.each(b, function(d, e) {
       if (e === !1) return void delete b[d];
       if (e.param || e.depends) {
        var f = !0;
        switch (typeof e.depends) {
         case "string":
          f = !!a(e.depends, c.form).length;
          break;
         case "function":
          f = e.depends.call(c, c)
        }
        f ? b[d] = void 0 !== e.param ? e.param : !0 : (a.data(c.form, "validator").resetElements(a(c)), delete b[d])
       }
      }), a.each(b, function(d, e) {
       b[d] = a.isFunction(e) && "normalizer" !== d ? e(c) : e
      }), a.each(["minlength", "maxlength"], function() {
       b[this] && (b[this] = Number(b[this]))
      }), a.each(["rangelength", "range"], function() {
       var c;
       b[this] && (a.isArray(b[this]) ? b[this] = [Number(b[this][0]), Number(b[this][1])] : "string" == typeof b[this] && (c = b[this].replace(/[\[\]]/g, "").split(/[\s,]+/), b[this] = [Number(c[0]), Number(c[1])]))
      }), a.validator.autoCreateRanges && (null != b.min && null != b.max && (b.range = [b.min, b.max], delete b.min, delete b.max), null != b.minlength && null != b.maxlength && (b.rangelength = [b.minlength, b.maxlength], delete b.minlength, delete b.maxlength)), b
     },
     normalizeRule: function(b) {
      if ("string" == typeof b) {
       var c = {};
       a.each(b.split(/\s/), function() {
        c[this] = !0
       }), b = c
      }
      return b
     },
     addMethod: function(b, c, d) {
      a.validator.methods[b] = c, a.validator.messages[b] = void 0 !== d ? d : a.validator.messages[b], c.length < 3 && a.validator.addClassRules(b, a.validator.normalizeRule(b))
     },
     methods: {
      required: function(b, c, d) {
       if (!this.depend(d, c)) return "dependency-mismatch";
       if ("select" === c.nodeName.toLowerCase()) {
        var e = a(c).val();
        return e && e.length > 0
       }
       return this.checkable(c) ? this.getLength(b, c) > 0 : b.length > 0
      },
      email: function(a, b) {
       return this.optional(b) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)
      },
      url: function(a, b) {
       return this.optional(b) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(a)
      },
      date: function(a, b) {
       return this.optional(b) || !/Invalid|NaN/.test(new Date(a).toString())
      },
      dateISO: function(a, b) {
       return this.optional(b) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)
      },
      number: function(a, b) {
       return this.optional(b) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)
      },
      digits: function(a, b) {
       return this.optional(b) || /^\d+$/.test(a)
      },
      minlength: function(b, c, d) {
       var e = a.isArray(b) ? b.length : this.getLength(b, c);
       return this.optional(c) || e >= d
      },
      maxlength: function(b, c, d) {
       var e = a.isArray(b) ? b.length : this.getLength(b, c);
       return this.optional(c) || d >= e
      },
      rangelength: function(b, c, d) {
       var e = a.isArray(b) ? b.length : this.getLength(b, c);
       return this.optional(c) || e >= d[0] && e <= d[1]
      },
      min: function(a, b, c) {
       return this.optional(b) || a >= c
      },
      max: function(a, b, c) {
       return this.optional(b) || c >= a
      },
      range: function(a, b, c) {
       return this.optional(b) || a >= c[0] && a <= c[1]
      },
      step: function(b, c, d) {
       var e = a(c).attr("type"),
        f = "Step attribute on input type " + e + " is not supported.",
        g = ["text", "number", "range"],
        h = new RegExp("\\b" + e + "\\b"),
        i = e && !h.test(g.join());
       if (i) throw new Error(f);
       return this.optional(c) || b % d === 0
      },
      equalTo: function(b, c, d) {
       var e = a(d);
       return this.settings.onfocusout && e.not(".validate-equalTo-blur").length && e.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function() {
        a(c).valid()
       }), b === e.val()
      },
      remote: function(b, c, d, e) {
       if (this.optional(c)) return "dependency-mismatch";
       e = "string" == typeof e && e || "remote";
       var f, g, h, i = this.previousValue(c, e);
       return this.settings.messages[c.name] || (this.settings.messages[c.name] = {}), i.originalMessage = i.originalMessage || this.settings.messages[c.name][e], this.settings.messages[c.name][e] = i.message, d = "string" == typeof d && {
        url: d
       } || d, h = a.param(a.extend({
        data: b
       }, d.data)), i.old === h ? i.valid : (i.old = h, f = this, this.startRequest(c), g = {}, g[c.name] = b, a.ajax(a.extend(!0, {
        mode: "abort",
        port: "validate" + c.name,
        dataType: "json",
        data: g,
        context: f.currentForm,
        success: function(a) {
         var d, g, h, j = a === !0 || "true" === a;
         f.settings.messages[c.name][e] = i.originalMessage, j ? (h = f.formSubmitted, f.resetInternals(), f.toHide = f.errorsFor(c), f.formSubmitted = h, f.successList.push(c), f.invalid[c.name] = !1, f.showErrors()) : (d = {}, g = a || f.defaultMessage(c, {
          method: e,
          parameters: b
         }), d[c.name] = i.message = g, f.invalid[c.name] = !0, f.showErrors(d)), i.valid = j, f.stopRequest(c, j)
        }
       }, d)), "pending")
      }
     }
    });
    var b, c = {};
    a.ajaxPrefilter ? a.ajaxPrefilter(function(a, b, d) {
     var e = a.port;
     "abort" === a.mode && (c[e] && c[e].abort(), c[e] = d)
    }) : (b = a.ajax, a.ajax = function(d) {
     var e = ("mode" in d ? d : a.ajaxSettings).mode,
      f = ("port" in d ? d : a.ajaxSettings).port;
     return "abort" === e ? (c[f] && c[f].abort(), c[f] = b.apply(this, arguments), c[f]) : b.apply(this, arguments)
    })
   });
   
   
   /*
    * jQuery Easing v1.4.0 - http://gsgd.co.uk/sandbox/jquery/easing/
    * Open source under the BSD License.
    * Copyright © 2008 George McGinley Smith
    * All rights reserved.
    * https://raw.github.com/gdsmith/jquery-easing/master/LICENSE
    */
   (function(factory) {
    if (typeof define === "function" && define.amd) {
     define(["jquery"], function($) {
      return factory($)
     })
    } else if (typeof module === "object" && typeof module.exports === "object") {
     exports = factory(require("jquery"))
    } else {
     factory(jQuery)
    }
   })(function($) {
    $.easing["jswing"] = $.easing["swing"];
    var pow = Math.pow,
     sqrt = Math.sqrt,
     sin = Math.sin,
     cos = Math.cos,
     PI = Math.PI,
     c1 = 1.70158,
     c2 = c1 * 1.525,
     c3 = c1 + 1,
     c4 = 2 * PI / 3,
     c5 = 2 * PI / 4.5;
   
    function bounceOut(x) {
     var n1 = 7.5625,
      d1 = 2.75;
     if (x < 1 / d1) {
      return n1 * x * x
     } else if (x < 2 / d1) {
      return n1 * (x -= 1.5 / d1) * x + .75
     } else if (x < 2.5 / d1) {
      return n1 * (x -= 2.25 / d1) * x + .9375
     } else {
      return n1 * (x -= 2.625 / d1) * x + .984375
     }
    }
    $.extend($.easing, {
     def: "easeOutQuad",
     swing: function(x) {
      return $.easing[$.easing.def](x)
     },
     easeInQuad: function(x) {
      return x * x
     },
     easeOutQuad: function(x) {
      return 1 - (1 - x) * (1 - x)
     },
     easeInOutQuad: function(x) {
      return x < .5 ? 2 * x * x : 1 - pow(-2 * x + 2, 2) / 2
     },
     easeInCubic: function(x) {
      return x * x * x
     },
     easeOutCubic: function(x) {
      return 1 - pow(1 - x, 3)
     },
     easeInOutCubic: function(x) {
      return x < .5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2
     },
     easeInQuart: function(x) {
      return x * x * x * x
     },
     easeOutQuart: function(x) {
      return 1 - pow(1 - x, 4)
     },
     easeInOutQuart: function(x) {
      return x < .5 ? 8 * x * x * x * x : 1 - pow(-2 * x + 2, 4) / 2
     },
     easeInQuint: function(x) {
      return x * x * x * x * x
     },
     easeOutQuint: function(x) {
      return 1 - pow(1 - x, 5)
     },
     easeInOutQuint: function(x) {
      return x < .5 ? 16 * x * x * x * x * x : 1 - pow(-2 * x + 2, 5) / 2
     },
     easeInSine: function(x) {
      return 1 - cos(x * PI / 2)
     },
     easeOutSine: function(x) {
      return sin(x * PI / 2)
     },
     easeInOutSine: function(x) {
      return -(cos(PI * x) - 1) / 2
     },
     easeInExpo: function(x) {
      return x === 0 ? 0 : pow(2, 10 * x - 10)
     },
     easeOutExpo: function(x) {
      return x === 1 ? 1 : 1 - pow(2, -10 * x)
     },
     easeInOutExpo: function(x) {
      return x === 0 ? 0 : x === 1 ? 1 : x < .5 ? pow(2, 20 * x - 10) / 2 : (2 - pow(2, -20 * x + 10)) / 2
     },
     easeInCirc: function(x) {
      return 1 - sqrt(1 - pow(x, 2))
     },
     easeOutCirc: function(x) {
      return sqrt(1 - pow(x - 1, 2))
     },
     easeInOutCirc: function(x) {
      return x < .5 ? (1 - sqrt(1 - pow(2 * x, 2))) / 2 : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2
     },
     easeInElastic: function(x) {
      return x === 0 ? 0 : x === 1 ? 1 : -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4)
     },
     easeOutElastic: function(x) {
      return x === 0 ? 0 : x === 1 ? 1 : pow(2, -10 * x) * sin((x * 10 - .75) * c4) + 1
     },
     easeInOutElastic: function(x) {
      return x === 0 ? 0 : x === 1 ? 1 : x < .5 ? -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2 : pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5) / 2 + 1
     },
     easeInBack: function(x) {
      return c3 * x * x * x - c1 * x * x
     },
     easeOutBack: function(x) {
      return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2)
     },
     easeInOutBack: function(x) {
      return x < .5 ? pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2) / 2 : (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2
     },
     easeInBounce: function(x) {
      return 1 - bounceOut(1 - x)
     },
     easeOutBounce: bounceOut,
     easeInOutBounce: function(x) {
      return x < .5 ? (1 - bounceOut(1 - 2 * x)) / 2 : (1 + bounceOut(2 * x - 1)) / 2
     }
    })
   });
   
   
   /*! WOW - v1.1.3 - 2016-05-06
    * Copyright (c) 2016 Matthieu Aussaguel;*/
   (function() {
    var a, b, c, d, e, f = function(a, b) {
      return function() {
       return a.apply(b, arguments)
      }
     },
     g = [].indexOf || function(a) {
      for (var b = 0, c = this.length; c > b; b++)
       if (b in this && this[b] === a) return b;
      return -1
     };
    b = function() {
     function a() {}
     return a.prototype.extend = function(a, b) {
      var c, d;
      for (c in b) d = b[c], null == a[c] && (a[c] = d);
      return a
     }, a.prototype.isMobile = function(a) {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)
     }, a.prototype.createEvent = function(a, b, c, d) {
      var e;
      return null == b && (b = !1), null == c && (c = !1), null == d && (d = null), null != document.createEvent ? (e = document.createEvent("CustomEvent"), e.initCustomEvent(a, b, c, d)) : null != document.createEventObject ? (e = document.createEventObject(), e.eventType = a) : e.eventName = a, e
     }, a.prototype.emitEvent = function(a, b) {
      return null != a.dispatchEvent ? a.dispatchEvent(b) : b in (null != a) ? a[b]() : "on" + b in (null != a) ? a["on" + b]() : void 0
     }, a.prototype.addEvent = function(a, b, c) {
      return null != a.addEventListener ? a.addEventListener(b, c, !1) : null != a.attachEvent ? a.attachEvent("on" + b, c) : a[b] = c
     }, a.prototype.removeEvent = function(a, b, c) {
      return null != a.removeEventListener ? a.removeEventListener(b, c, !1) : null != a.detachEvent ? a.detachEvent("on" + b, c) : delete a[b]
     }, a.prototype.innerHeight = function() {
      return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
     }, a
    }(), c = this.WeakMap || this.MozWeakMap || (c = function() {
     function a() {
      this.keys = [], this.values = []
     }
     return a.prototype.get = function(a) {
      var b, c, d, e, f;
      for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d)
       if (c = f[b], c === a) return this.values[b]
     }, a.prototype.set = function(a, b) {
      var c, d, e, f, g;
      for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e)
       if (d = g[c], d === a) return void(this.values[c] = b);
      return this.keys.push(a), this.values.push(b)
     }, a
    }()), a = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (a = function() {
     function a() {
      "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
     }
     return a.notSupported = !0, a.prototype.observe = function() {}, a
    }()), d = this.getComputedStyle || function(a, b) {
     return this.getPropertyValue = function(b) {
      var c;
      return "float" === b && (b = "styleFloat"), e.test(b) && b.replace(e, function(a, b) {
       return b.toUpperCase()
      }), (null != (c = a.currentStyle) ? c[b] : void 0) || null
     }, this
    }, e = /(\-([a-z]){1})/g, this.WOW = function() {
     function e(a) {
      null == a && (a = {}), this.scrollCallback = f(this.scrollCallback, this), this.scrollHandler = f(this.scrollHandler, this), this.resetAnimation = f(this.resetAnimation, this), this.start = f(this.start, this), this.scrolled = !0, this.config = this.util().extend(a, this.defaults), null != a.scrollContainer && (this.config.scrollContainer = document.querySelector(a.scrollContainer)), this.animationNameCache = new c, this.wowEvent = this.util().createEvent(this.config.boxClass)
     }
     return e.prototype.defaults = {
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: !0,
      live: !0,
      callback: null,
      scrollContainer: null
     }, e.prototype.init = function() {
      var a;
      return this.element = window.document.documentElement, "interactive" === (a = document.readyState) || "complete" === a ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
     }, e.prototype.start = function() {
      var b, c, d, e;
      if (this.stopped = !1, this.boxes = function() {
        var a, c, d, e;
        for (d = this.element.querySelectorAll("." + this.config.boxClass), e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
        return e
       }.call(this), this.all = function() {
        var a, c, d, e;
        for (d = this.boxes, e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
        return e
       }.call(this), this.boxes.length)
       if (this.disabled()) this.resetStyle();
       else
        for (e = this.boxes, c = 0, d = e.length; d > c; c++) b = e[c], this.applyStyle(b, !0);
      return this.disabled() || (this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new a(function(a) {
       return function(b) {
        var c, d, e, f, g;
        for (g = [], c = 0, d = b.length; d > c; c++) f = b[c], g.push(function() {
         var a, b, c, d;
         for (c = f.addedNodes || [], d = [], a = 0, b = c.length; b > a; a++) e = c[a], d.push(this.doSync(e));
         return d
        }.call(a));
        return g
       }
      }(this)).observe(document.body, {
       childList: !0,
       subtree: !0
      }) : void 0
     }, e.prototype.stop = function() {
      return this.stopped = !0, this.util().removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0
     }, e.prototype.sync = function(b) {
      return a.notSupported ? this.doSync(this.element) : void 0
     }, e.prototype.doSync = function(a) {
      var b, c, d, e, f;
      if (null == a && (a = this.element), 1 === a.nodeType) {
       for (a = a.parentNode || a, e = a.querySelectorAll("." + this.config.boxClass), f = [], c = 0, d = e.length; d > c; c++) b = e[c], g.call(this.all, b) < 0 ? (this.boxes.push(b), this.all.push(b), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(b, !0), f.push(this.scrolled = !0)) : f.push(void 0);
       return f
      }
     }, e.prototype.show = function(a) {
      return this.applyStyle(a), a.className = a.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(a), this.util().emitEvent(a, this.wowEvent), this.util().addEvent(a, "animationend", this.resetAnimation), this.util().addEvent(a, "oanimationend", this.resetAnimation), this.util().addEvent(a, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(a, "MSAnimationEnd", this.resetAnimation), a
     }, e.prototype.applyStyle = function(a, b) {
      var c, d, e;
      return d = a.getAttribute("data-wow-duration"), c = a.getAttribute("data-wow-delay"), e = a.getAttribute("data-wow-iteration"), this.animate(function(f) {
       return function() {
        return f.customStyle(a, b, d, c, e)
       }
      }(this))
     }, e.prototype.animate = function() {
      return "requestAnimationFrame" in window ? function(a) {
       return window.requestAnimationFrame(a)
      } : function(a) {
       return a()
      }
     }(), e.prototype.resetStyle = function() {
      var a, b, c, d, e;
      for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], e.push(a.style.visibility = "visible");
      return e
     }, e.prototype.resetAnimation = function(a) {
      var b;
      return a.type.toLowerCase().indexOf("animationend") >= 0 ? (b = a.target || a.srcElement, b.className = b.className.replace(this.config.animateClass, "").trim()) : void 0
     }, e.prototype.customStyle = function(a, b, c, d, e) {
      return b && this.cacheAnimationName(a), a.style.visibility = b ? "hidden" : "visible", c && this.vendorSet(a.style, {
       animationDuration: c
      }), d && this.vendorSet(a.style, {
       animationDelay: d
      }), e && this.vendorSet(a.style, {
       animationIterationCount: e
      }), this.vendorSet(a.style, {
       animationName: b ? "none" : this.cachedAnimationName(a)
      }), a
     }, e.prototype.vendors = ["moz", "webkit"], e.prototype.vendorSet = function(a, b) {
      var c, d, e, f;
      d = [];
      for (c in b) e = b[c], a["" + c] = e, d.push(function() {
       var b, d, g, h;
       for (g = this.vendors, h = [], b = 0, d = g.length; d > b; b++) f = g[b], h.push(a["" + f + c.charAt(0).toUpperCase() + c.substr(1)] = e);
       return h
      }.call(this));
      return d
     }, e.prototype.vendorCSS = function(a, b) {
      var c, e, f, g, h, i;
      for (h = d(a), g = h.getPropertyCSSValue(b), f = this.vendors, c = 0, e = f.length; e > c; c++) i = f[c], g = g || h.getPropertyCSSValue("-" + i + "-" + b);
      return g
     }, e.prototype.animationName = function(a) {
      var b;
      try {
       b = this.vendorCSS(a, "animation-name").cssText
      } catch (c) {
       b = d(a).getPropertyValue("animation-name")
      }
      return "none" === b ? "" : b
     }, e.prototype.cacheAnimationName = function(a) {
      return this.animationNameCache.set(a, this.animationName(a))
     }, e.prototype.cachedAnimationName = function(a) {
      return this.animationNameCache.get(a)
     }, e.prototype.scrollHandler = function() {
      return this.scrolled = !0
     }, e.prototype.scrollCallback = function() {
      var a;
      return !this.scrolled || (this.scrolled = !1, this.boxes = function() {
       var b, c, d, e;
       for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], a && (this.isVisible(a) ? this.show(a) : e.push(a));
       return e
      }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
     }, e.prototype.offsetTop = function(a) {
      for (var b; void 0 === a.offsetTop;) a = a.parentNode;
      for (b = a.offsetTop; a = a.offsetParent;) b += a.offsetTop;
      return b
     }, e.prototype.isVisible = function(a) {
      var b, c, d, e, f;
      return c = a.getAttribute("data-wow-offset") || this.config.offset, f = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset, e = f + Math.min(this.element.clientHeight, this.util().innerHeight()) - c, d = this.offsetTop(a), b = d + a.clientHeight, e >= d && b >= f
     }, e.prototype.util = function() {
      return null != this._util ? this._util : this._util = new b
     }, e.prototype.disabled = function() {
      return !this.config.mobile && this.util().isMobile(navigator.userAgent)
     }, e
    }()
   }).call(this);
   
   
   
   /*! Magnific Popup - v1.1.0 - 2016-02-20
    * http://dimsemenov.com/plugins/magnific-popup/
    * Copyright (c) 2016 Dmitry Semenov; */
   ! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
   }(function(a) {
    var b, c, d, e, f, g, h = "Close",
     i = "BeforeClose",
     j = "AfterClose",
     k = "BeforeAppend",
     l = "MarkupParse",
     m = "Open",
     n = "Change",
     o = "mfp",
     p = "." + o,
     q = "mfp-ready",
     r = "mfp-removing",
     s = "mfp-prevent-close",
     t = function() {},
     u = !!window.jQuery,
     v = a(window),
     w = function(a, c) {
      b.ev.on(o + a + p, c)
     },
     x = function(b, c, d, e) {
      var f = document.createElement("div");
      return f.className = "mfp-" + b, d && (f.innerHTML = d), e ? c && c.appendChild(f) : (f = a(f), c && f.appendTo(c)), f
     },
     y = function(c, d) {
      b.ev.triggerHandler(o + c, d), b.st.callbacks && (c = c.charAt(0).toLowerCase() + c.slice(1), b.st.callbacks[c] && b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]))
     },
     z = function(c) {
      return c === g && b.currTemplate.closeBtn || (b.currTemplate.closeBtn = a(b.st.closeMarkup.replace("%title%", b.st.tClose)), g = c), b.currTemplate.closeBtn
     },
     A = function() {
      a.magnificPopup.instance || (b = new t, b.init(), a.magnificPopup.instance = b)
     },
     B = function() {
      var a = document.createElement("p").style,
       b = ["ms", "O", "Moz", "Webkit"];
      if (void 0 !== a.transition) return !0;
      for (; b.length;)
       if (b.pop() + "Transition" in a) return !0;
      return !1
     };
    t.prototype = {
     constructor: t,
     init: function() {
      var c = navigator.appVersion;
      b.isLowIE = b.isIE8 = document.all && !document.addEventListener, b.isAndroid = /android/gi.test(c), b.isIOS = /iphone|ipad|ipod/gi.test(c), b.supportsTransition = B(), b.probablyMobile = b.isAndroid || b.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), d = a(document), b.popupsCache = {}
     },
     open: function(c) {
      var e;
      if (c.isObj === !1) {
       b.items = c.items.toArray(), b.index = 0;
       var g, h = c.items;
       for (e = 0; e < h.length; e++)
        if (g = h[e], g.parsed && (g = g.el[0]), g === c.el[0]) {
         b.index = e;
         break
        }
      } else b.items = a.isArray(c.items) ? c.items : [c.items], b.index = c.index || 0;
      if (b.isOpen) return void b.updateItemHTML();
      b.types = [], f = "", c.mainEl && c.mainEl.length ? b.ev = c.mainEl.eq(0) : b.ev = d, c.key ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}), b.currTemplate = b.popupsCache[c.key]) : b.currTemplate = {}, b.st = a.extend(!0, {}, a.magnificPopup.defaults, c), b.fixedContentPos = "auto" === b.st.fixedContentPos ? !b.probablyMobile : b.st.fixedContentPos, b.st.modal && (b.st.closeOnContentClick = !1, b.st.closeOnBgClick = !1, b.st.showCloseBtn = !1, b.st.enableEscapeKey = !1), b.bgOverlay || (b.bgOverlay = x("bg").on("click" + p, function() {
       b.close()
      }), b.wrap = x("wrap").attr("tabindex", -1).on("click" + p, function(a) {
       b._checkIfClose(a.target) && b.close()
      }), b.container = x("container", b.wrap)), b.contentContainer = x("content"), b.st.preloader && (b.preloader = x("preloader", b.container, b.st.tLoading));
      var i = a.magnificPopup.modules;
      for (e = 0; e < i.length; e++) {
       var j = i[e];
       j = j.charAt(0).toUpperCase() + j.slice(1), b["init" + j].call(b)
      }
      y("BeforeOpen"), b.st.showCloseBtn && (b.st.closeBtnInside ? (w(l, function(a, b, c, d) {
       c.close_replaceWith = z(d.type)
      }), f += " mfp-close-btn-in") : b.wrap.append(z())), b.st.alignTop && (f += " mfp-align-top"), b.fixedContentPos ? b.wrap.css({
       overflow: b.st.overflowY,
       overflowX: "hidden",
       overflowY: b.st.overflowY
      }) : b.wrap.css({
       top: v.scrollTop(),
       position: "absolute"
      }), (b.st.fixedBgPos === !1 || "auto" === b.st.fixedBgPos && !b.fixedContentPos) && b.bgOverlay.css({
       height: d.height(),
       position: "absolute"
      }), b.st.enableEscapeKey && d.on("keyup" + p, function(a) {
       27 === a.keyCode && b.close()
      }), v.on("resize" + p, function() {
       b.updateSize()
      }), b.st.closeOnContentClick || (f += " mfp-auto-cursor"), f && b.wrap.addClass(f);
      var k = b.wH = v.height(),
       n = {};
      if (b.fixedContentPos && b._hasScrollBar(k)) {
       var o = b._getScrollbarSize();
       o && (n.marginRight = o)
      }
      b.fixedContentPos && (b.isIE7 ? a("body, html").css("overflow", "hidden") : n.overflow = "hidden");
      var r = b.st.mainClass;
      return b.isIE7 && (r += " mfp-ie7"), r && b._addClassToMFP(r), b.updateItemHTML(), y("BuildControls"), a("html").css(n), b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || a(document.body)), b._lastFocusedEl = document.activeElement, setTimeout(function() {
       b.content ? (b._addClassToMFP(q), b._setFocus()) : b.bgOverlay.addClass(q), d.on("focusin" + p, b._onFocusIn)
      }, 16), b.isOpen = !0, b.updateSize(k), y(m), c
     },
     close: function() {
      b.isOpen && (y(i), b.isOpen = !1, b.st.removalDelay && !b.isLowIE && b.supportsTransition ? (b._addClassToMFP(r), setTimeout(function() {
       b._close()
      }, b.st.removalDelay)) : b._close())
     },
     _close: function() {
      y(h);
      var c = r + " " + q + " ";
      if (b.bgOverlay.detach(), b.wrap.detach(), b.container.empty(), b.st.mainClass && (c += b.st.mainClass + " "), b._removeClassFromMFP(c), b.fixedContentPos) {
       var e = {
        marginRight: ""
       };
       b.isIE7 ? a("body, html").css("overflow", "") : e.overflow = "", a("html").css(e)
      }
      d.off("keyup" + p + " focusin" + p), b.ev.off(p), b.wrap.attr("class", "mfp-wrap").removeAttr("style"), b.bgOverlay.attr("class", "mfp-bg"), b.container.attr("class", "mfp-container"), !b.st.showCloseBtn || b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0 || b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach(), b.st.autoFocusLast && b._lastFocusedEl && a(b._lastFocusedEl).focus(), b.currItem = null, b.content = null, b.currTemplate = null, b.prevHeight = 0, y(j)
     },
     updateSize: function(a) {
      if (b.isIOS) {
       var c = document.documentElement.clientWidth / window.innerWidth,
        d = window.innerHeight * c;
       b.wrap.css("height", d), b.wH = d
      } else b.wH = a || v.height();
      b.fixedContentPos || b.wrap.css("height", b.wH), y("Resize")
     },
     updateItemHTML: function() {
      var c = b.items[b.index];
      b.contentContainer.detach(), b.content && b.content.detach(), c.parsed || (c = b.parseEl(b.index));
      var d = c.type;
      if (y("BeforeChange", [b.currItem ? b.currItem.type : "", d]), b.currItem = c, !b.currTemplate[d]) {
       var f = b.st[d] ? b.st[d].markup : !1;
       y("FirstMarkupParse", f), f ? b.currTemplate[d] = a(f) : b.currTemplate[d] = !0
      }
      e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder");
      var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](c, b.currTemplate[d]);
      b.appendContent(g, d), c.preloaded = !0, y(n, c), e = c.type, b.container.prepend(b.contentContainer), y("AfterChange")
     },
     appendContent: function(a, c) {
      b.content = a, a ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0 ? b.content.find(".mfp-close").length || b.content.append(z()) : b.content = a : b.content = "", y(k), b.container.addClass("mfp-" + c + "-holder"), b.contentContainer.append(b.content)
     },
     parseEl: function(c) {
      var d, e = b.items[c];
      if (e.tagName ? e = {
        el: a(e)
       } : (d = e.type, e = {
        data: e,
        src: e.src
       }), e.el) {
       for (var f = b.types, g = 0; g < f.length; g++)
        if (e.el.hasClass("mfp-" + f[g])) {
         d = f[g];
         break
        } e.src = e.el.attr("data-mfp-src"), e.src || (e.src = e.el.attr("href"))
      }
      return e.type = d || b.st.type || "inline", e.index = c, e.parsed = !0, b.items[c] = e, y("ElementParse", e), b.items[c]
     },
     addGroup: function(a, c) {
      var d = function(d) {
       d.mfpEl = this, b._openClick(d, a, c)
      };
      c || (c = {});
      var e = "click.magnificPopup";
      c.mainEl = a, c.items ? (c.isObj = !0, a.off(e).on(e, d)) : (c.isObj = !1, c.delegate ? a.off(e).on(e, c.delegate, d) : (c.items = a, a.off(e).on(e, d)))
     },
     _openClick: function(c, d, e) {
      var f = void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;
      if (f || !(2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey)) {
       var g = void 0 !== e.disableOn ? e.disableOn : a.magnificPopup.defaults.disableOn;
       if (g)
        if (a.isFunction(g)) {
         if (!g.call(b)) return !0
        } else if (v.width() < g) return !0;
       c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()), e.el = a(c.mfpEl), e.delegate && (e.items = d.find(e.delegate)), b.open(e)
      }
     },
     updateStatus: function(a, d) {
      if (b.preloader) {
       c !== a && b.container.removeClass("mfp-s-" + c), d || "loading" !== a || (d = b.st.tLoading);
       var e = {
        status: a,
        text: d
       };
       y("UpdateStatus", e), a = e.status, d = e.text, b.preloader.html(d), b.preloader.find("a").on("click", function(a) {
        a.stopImmediatePropagation()
       }), b.container.addClass("mfp-s-" + a), c = a
      }
     },
     _checkIfClose: function(c) {
      if (!a(c).hasClass(s)) {
       var d = b.st.closeOnContentClick,
        e = b.st.closeOnBgClick;
       if (d && e) return !0;
       if (!b.content || a(c).hasClass("mfp-close") || b.preloader && c === b.preloader[0]) return !0;
       if (c === b.content[0] || a.contains(b.content[0], c)) {
        if (d) return !0
       } else if (e && a.contains(document, c)) return !0;
       return !1
      }
     },
     _addClassToMFP: function(a) {
      b.bgOverlay.addClass(a), b.wrap.addClass(a)
     },
     _removeClassFromMFP: function(a) {
      this.bgOverlay.removeClass(a), b.wrap.removeClass(a)
     },
     _hasScrollBar: function(a) {
      return (b.isIE7 ? d.height() : document.body.scrollHeight) > (a || v.height())
     },
     _setFocus: function() {
      (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus()
     },
     _onFocusIn: function(c) {
      return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target) ? void 0 : (b._setFocus(), !1)
     },
     _parseMarkup: function(b, c, d) {
      var e;
      d.data && (c = a.extend(d.data, c)), y(l, [b, c, d]), a.each(c, function(c, d) {
       if (void 0 === d || d === !1) return !0;
       if (e = c.split("_"), e.length > 1) {
        var f = b.find(p + "-" + e[0]);
        if (f.length > 0) {
         var g = e[1];
         "replaceWith" === g ? f[0] !== d[0] && f.replaceWith(d) : "img" === g ? f.is("img") ? f.attr("src", d) : f.replaceWith(a("<img>").attr("src", d).attr("class", f.attr("class"))) : f.attr(e[1], d)
        }
       } else b.find(p + "-" + c).html(d)
      })
     },
     _getScrollbarSize: function() {
      if (void 0 === b.scrollbarSize) {
       var a = document.createElement("div");
       a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(a), b.scrollbarSize = a.offsetWidth - a.clientWidth, document.body.removeChild(a)
      }
      return b.scrollbarSize
     }
    }, a.magnificPopup = {
     instance: null,
     proto: t.prototype,
     modules: [],
     open: function(b, c) {
      return A(), b = b ? a.extend(!0, {}, b) : {}, b.isObj = !0, b.index = c || 0, this.instance.open(b)
     },
     close: function() {
      return a.magnificPopup.instance && a.magnificPopup.instance.close()
     },
     registerModule: function(b, c) {
      c.options && (a.magnificPopup.defaults[b] = c.options), a.extend(this.proto, c.proto), this.modules.push(b)
     },
     defaults: {
      disableOn: 0,
      key: null,
      midClick: !1,
      mainClass: "",
      preloader: !0,
      focus: "",
      closeOnContentClick: !1,
      closeOnBgClick: !0,
      closeBtnInside: !0,
      showCloseBtn: !0,
      enableEscapeKey: !0,
      modal: !1,
      alignTop: !1,
      removalDelay: 0,
      prependTo: null,
      fixedContentPos: "auto",
      fixedBgPos: "auto",
      overflowY: "auto",
      closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
      tClose: "Close (Esc)",
      tLoading: "Loading...",
      autoFocusLast: !0
     }
    }, a.fn.magnificPopup = function(c) {
     A();
     var d = a(this);
     if ("string" == typeof c)
      if ("open" === c) {
       var e, f = u ? d.data("magnificPopup") : d[0].magnificPopup,
        g = parseInt(arguments[1], 10) || 0;
       f.items ? e = f.items[g] : (e = d, f.delegate && (e = e.find(f.delegate)), e = e.eq(g)), b._openClick({
        mfpEl: e
       }, d, f)
      } else b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
     else c = a.extend(!0, {}, c), u ? d.data("magnificPopup", c) : d[0].magnificPopup = c, b.addGroup(d, c);
     return d
    };
    var C, D, E, F = "inline",
     G = function() {
      E && (D.after(E.addClass(C)).detach(), E = null)
     };
    a.magnificPopup.registerModule(F, {
     options: {
      hiddenClass: "hide",
      markup: "",
      tNotFound: "Content not found"
     },
     proto: {
      initInline: function() {
       b.types.push(F), w(h + "." + F, function() {
        G()
       })
      },
      getInline: function(c, d) {
       if (G(), c.src) {
        var e = b.st.inline,
         f = a(c.src);
        if (f.length) {
         var g = f[0].parentNode;
         g && g.tagName && (D || (C = e.hiddenClass, D = x(C), C = "mfp-" + C), E = f.after(D).detach().removeClass(C)), b.updateStatus("ready")
        } else b.updateStatus("error", e.tNotFound), f = a("<div>");
        return c.inlineElement = f, f
       }
       return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d
      }
     }
    });
    var H, I = "ajax",
     J = function() {
      H && a(document.body).removeClass(H)
     },
     K = function() {
      J(), b.req && b.req.abort()
     };
    a.magnificPopup.registerModule(I, {
     options: {
      settings: null,
      cursor: "mfp-ajax-cur",
      tError: '<a href="%url%">The content</a> could not be loaded.'
     },
     proto: {
      initAjax: function() {
       b.types.push(I), H = b.st.ajax.cursor, w(h + "." + I, K), w("BeforeChange." + I, K)
      },
      getAjax: function(c) {
       H && a(document.body).addClass(H), b.updateStatus("loading");
       var d = a.extend({
        url: c.src,
        success: function(d, e, f) {
         var g = {
          data: d,
          xhr: f
         };
         y("ParseAjax", g), b.appendContent(a(g.data), I), c.finished = !0, J(), b._setFocus(), setTimeout(function() {
          b.wrap.addClass(q)
         }, 16), b.updateStatus("ready"), y("AjaxContentAdded")
        },
        error: function() {
         J(), c.finished = c.loadError = !0, b.updateStatus("error", b.st.ajax.tError.replace("%url%", c.src))
        }
       }, b.st.ajax.settings);
       return b.req = a.ajax(d), ""
      }
     }
    });
    var L, M = function(c) {
     if (c.data && void 0 !== c.data.title) return c.data.title;
     var d = b.st.image.titleSrc;
     if (d) {
      if (a.isFunction(d)) return d.call(b, c);
      if (c.el) return c.el.attr(d) || ""
     }
     return ""
    };
    a.magnificPopup.registerModule("image", {
     options: {
      markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
      cursor: "mfp-zoom-out-cur",
      titleSrc: "title",
      verticalFit: !0,
      tError: '<a href="%url%">The image</a> could not be loaded.'
     },
     proto: {
      initImage: function() {
       var c = b.st.image,
        d = ".image";
       b.types.push("image"), w(m + d, function() {
        "image" === b.currItem.type && c.cursor && a(document.body).addClass(c.cursor)
       }), w(h + d, function() {
        c.cursor && a(document.body).removeClass(c.cursor), v.off("resize" + p)
       }), w("Resize" + d, b.resizeImage), b.isLowIE && w("AfterChange", b.resizeImage)
      },
      resizeImage: function() {
       var a = b.currItem;
       if (a && a.img && b.st.image.verticalFit) {
        var c = 0;
        b.isLowIE && (c = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)), a.img.css("max-height", b.wH - c)
       }
      },
      _onImageHasSize: function(a) {
       a.img && (a.hasSize = !0, L && clearInterval(L), a.isCheckingImgSize = !1, y("ImageHasSize", a), a.imgHidden && (b.content && b.content.removeClass("mfp-loading"), a.imgHidden = !1))
      },
      findImageSize: function(a) {
       var c = 0,
        d = a.img[0],
        e = function(f) {
         L && clearInterval(L), L = setInterval(function() {
          return d.naturalWidth > 0 ? void b._onImageHasSize(a) : (c > 200 && clearInterval(L), c++, void(3 === c ? e(10) : 40 === c ? e(50) : 100 === c && e(500)))
         }, f)
        };
       e(1)
      },
      getImage: function(c, d) {
       var e = 0,
        f = function() {
         c && (c.img[0].complete ? (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("ready")), c.hasSize = !0, c.loaded = !0, y("ImageLoadComplete")) : (e++, 200 > e ? setTimeout(f, 100) : g()))
        },
        g = function() {
         c && (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("error", h.tError.replace("%url%", c.src))), c.hasSize = !0, c.loaded = !0, c.loadError = !0)
        },
        h = b.st.image,
        i = d.find(".mfp-img");
       if (i.length) {
        var j = document.createElement("img");
        j.className = "mfp-img", c.el && c.el.find("img").length && (j.alt = c.el.find("img").attr("alt")), c.img = a(j).on("load.mfploader", f).on("error.mfploader", g), j.src = c.src, i.is("img") && (c.img = c.img.clone()), j = c.img[0], j.naturalWidth > 0 ? c.hasSize = !0 : j.width || (c.hasSize = !1)
       }
       return b._parseMarkup(d, {
        title: M(c),
        img_replaceWith: c.img
       }, c), b.resizeImage(), c.hasSize ? (L && clearInterval(L), c.loadError ? (d.addClass("mfp-loading"), b.updateStatus("error", h.tError.replace("%url%", c.src))) : (d.removeClass("mfp-loading"), b.updateStatus("ready")), d) : (b.updateStatus("loading"), c.loading = !0, c.hasSize || (c.imgHidden = !0, d.addClass("mfp-loading"), b.findImageSize(c)), d)
      }
     }
    });
    var N, O = function() {
     return void 0 === N && (N = void 0 !== document.createElement("p").style.MozTransform), N
    };
    a.magnificPopup.registerModule("zoom", {
     options: {
      enabled: !1,
      easing: "ease-in-out",
      duration: 300,
      opener: function(a) {
       return a.is("img") ? a : a.find("img")
      }
     },
     proto: {
      initZoom: function() {
       var a, c = b.st.zoom,
        d = ".zoom";
       if (c.enabled && b.supportsTransition) {
        var e, f, g = c.duration,
         j = function(a) {
          var b = a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
           d = "all " + c.duration / 1e3 + "s " + c.easing,
           e = {
            position: "fixed",
            zIndex: 9999,
            left: 0,
            top: 0,
            "-webkit-backface-visibility": "hidden"
           },
           f = "transition";
          return e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d, b.css(e), b
         },
         k = function() {
          b.content.css("visibility", "visible")
         };
        w("BuildControls" + d, function() {
         if (b._allowZoom()) {
          if (clearTimeout(e), b.content.css("visibility", "hidden"), a = b._getItemToZoom(), !a) return void k();
          f = j(a), f.css(b._getOffset()), b.wrap.append(f), e = setTimeout(function() {
           f.css(b._getOffset(!0)), e = setTimeout(function() {
            k(), setTimeout(function() {
             f.remove(), a = f = null, y("ZoomAnimationEnded")
            }, 16)
           }, g)
          }, 16)
         }
        }), w(i + d, function() {
         if (b._allowZoom()) {
          if (clearTimeout(e), b.st.removalDelay = g, !a) {
           if (a = b._getItemToZoom(), !a) return;
           f = j(a)
          }
          f.css(b._getOffset(!0)), b.wrap.append(f), b.content.css("visibility", "hidden"), setTimeout(function() {
           f.css(b._getOffset())
          }, 16)
         }
        }), w(h + d, function() {
         b._allowZoom() && (k(), f && f.remove(), a = null)
        })
       }
      },
      _allowZoom: function() {
       return "image" === b.currItem.type
      },
      _getItemToZoom: function() {
       return b.currItem.hasSize ? b.currItem.img : !1
      },
      _getOffset: function(c) {
       var d;
       d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
       var e = d.offset(),
        f = parseInt(d.css("padding-top"), 10),
        g = parseInt(d.css("padding-bottom"), 10);
       e.top -= a(window).scrollTop() - f;
       var h = {
        width: d.width(),
        height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f
       };
       return O() ? h["-moz-transform"] = h.transform = "translate(" + e.left + "px," + e.top + "px)" : (h.left = e.left, h.top = e.top), h
      }
     }
    });
    var P = "iframe",
     Q = "//about:blank",
     R = function(a) {
      if (b.currTemplate[P]) {
       var c = b.currTemplate[P].find("iframe");
       c.length && (a || (c[0].src = Q), b.isIE8 && c.css("display", a ? "block" : "none"))
      }
     };
    a.magnificPopup.registerModule(P, {
     options: {
      markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
      srcAction: "iframe_src",
      patterns: {
       youtube: {
        index: "youtube.com",
        id: "v=",
        src: "//www.youtube.com/embed/%id%?autoplay=1"
       },
       vimeo: {
        index: "vimeo.com/",
        id: "/",
        src: "//player.vimeo.com/video/%id%?autoplay=1"
       },
       gmaps: {
        index: "//maps.google.",
        src: "%id%&output=embed"
       }
      }
     },
     proto: {
      initIframe: function() {
       b.types.push(P), w("BeforeChange", function(a, b, c) {
        b !== c && (b === P ? R() : c === P && R(!0))
       }), w(h + "." + P, function() {
        R()
       })
      },
      getIframe: function(c, d) {
       var e = c.src,
        f = b.st.iframe;
       a.each(f.patterns, function() {
        return e.indexOf(this.index) > -1 ? (this.id && (e = "string" == typeof this.id ? e.substr(e.lastIndexOf(this.id) + this.id.length, e.length) : this.id.call(this, e)), e = this.src.replace("%id%", e), !1) : void 0
       });
       var g = {};
       return f.srcAction && (g[f.srcAction] = e), b._parseMarkup(d, g, c), b.updateStatus("ready"), d
      }
     }
    });
    var S = function(a) {
      var c = b.items.length;
      return a > c - 1 ? a - c : 0 > a ? c + a : a
     },
     T = function(a, b, c) {
      return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c)
     };
    a.magnificPopup.registerModule("gallery", {
     options: {
      enabled: !1,
      arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: !0,
      arrows: !0,
      tPrev: "Previous (Left arrow key)",
      tNext: "Next (Right arrow key)",
      tCounter: "%curr% of %total%"
     },
     proto: {
      initGallery: function() {
       var c = b.st.gallery,
        e = ".mfp-gallery";
       return b.direction = !0, c && c.enabled ? (f += " mfp-gallery", w(m + e, function() {
        c.navigateByImgClick && b.wrap.on("click" + e, ".mfp-img", function() {
         return b.items.length > 1 ? (b.next(), !1) : void 0
        }), d.on("keydown" + e, function(a) {
         37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next()
        })
       }), w("UpdateStatus" + e, function(a, c) {
        c.text && (c.text = T(c.text, b.currItem.index, b.items.length))
       }), w(l + e, function(a, d, e, f) {
        var g = b.items.length;
        e.counter = g > 1 ? T(c.tCounter, f.index, g) : ""
       }), w("BuildControls" + e, function() {
        if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
         var d = c.arrowMarkup,
          e = b.arrowLeft = a(d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")).addClass(s),
          f = b.arrowRight = a(d.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, "right")).addClass(s);
         e.click(function() {
          b.prev()
         }), f.click(function() {
          b.next()
         }), b.container.append(e.add(f))
        }
       }), w(n + e, function() {
        b._preloadTimeout && clearTimeout(b._preloadTimeout), b._preloadTimeout = setTimeout(function() {
         b.preloadNearbyImages(), b._preloadTimeout = null
        }, 16)
       }), void w(h + e, function() {
        d.off(e), b.wrap.off("click" + e), b.arrowRight = b.arrowLeft = null
       })) : !1
      },
      next: function() {
       b.direction = !0, b.index = S(b.index + 1), b.updateItemHTML()
      },
      prev: function() {
       b.direction = !1, b.index = S(b.index - 1), b.updateItemHTML()
      },
      goTo: function(a) {
       b.direction = a >= b.index, b.index = a, b.updateItemHTML()
      },
      preloadNearbyImages: function() {
       var a, c = b.st.gallery.preload,
        d = Math.min(c[0], b.items.length),
        e = Math.min(c[1], b.items.length);
       for (a = 1; a <= (b.direction ? e : d); a++) b._preloadItem(b.index + a);
       for (a = 1; a <= (b.direction ? d : e); a++) b._preloadItem(b.index - a)
      },
      _preloadItem: function(c) {
       if (c = S(c), !b.items[c].preloaded) {
        var d = b.items[c];
        d.parsed || (d = b.parseEl(c)), y("LazyLoad", d), "image" === d.type && (d.img = a('<img class="mfp-img" />').on("load.mfploader", function() {
         d.hasSize = !0
        }).on("error.mfploader", function() {
         d.hasSize = !0, d.loadError = !0, y("LazyLoadError", d)
        }).attr("src", d.src)), d.preloaded = !0
       }
      }
     }
    });
    var U = "retina";
    a.magnificPopup.registerModule(U, {
     options: {
      replaceSrc: function(a) {
       return a.src.replace(/\.\w+$/, function(a) {
        return "@2x" + a
       })
      },
      ratio: 1
     },
     proto: {
      initRetina: function() {
       if (window.devicePixelRatio > 1) {
        var a = b.st.retina,
         c = a.ratio;
        c = isNaN(c) ? c() : c, c > 1 && (w("ImageHasSize." + U, function(a, b) {
         b.img.css({
          "max-width": b.img[0].naturalWidth / c,
          width: "100%"
         })
        }), w("ElementParse." + U, function(b, d) {
         d.src = a.replaceSrc(d, c)
        }))
       }
      }
     }
    }), A()
   });
   
   
   /*!
    * Bootstrap-select v1.12.2
    * Licensed under MIT (https://github.com/silviomoreto/bootstrap-select/blob/master/LICENSE)
    */
   ! function(a, b) {
    "function" == typeof define && define.amd ? define(["jquery"], function(a) {
     return b(a)
    }) : "object" == typeof module && module.exports ? module.exports = b(require("jquery")) : b(a.jQuery)
   }(this, function(a) {
    ! function(a) {
     "use strict";
   
     function b(b) {
      var c = [{
       re: /[\xC0-\xC6]/g,
       ch: "A"
      }, {
       re: /[\xE0-\xE6]/g,
       ch: "a"
      }, {
       re: /[\xC8-\xCB]/g,
       ch: "E"
      }, {
       re: /[\xE8-\xEB]/g,
       ch: "e"
      }, {
       re: /[\xCC-\xCF]/g,
       ch: "I"
      }, {
       re: /[\xEC-\xEF]/g,
       ch: "i"
      }, {
       re: /[\xD2-\xD6]/g,
       ch: "O"
      }, {
       re: /[\xF2-\xF6]/g,
       ch: "o"
      }, {
       re: /[\xD9-\xDC]/g,
       ch: "U"
      }, {
       re: /[\xF9-\xFC]/g,
       ch: "u"
      }, {
       re: /[\xC7-\xE7]/g,
       ch: "c"
      }, {
       re: /[\xD1]/g,
       ch: "N"
      }, {
       re: /[\xF1]/g,
       ch: "n"
      }];
      return a.each(c, function() {
       b = b ? b.replace(this.re, this.ch) : ""
      }), b
     }
   
     function c(b) {
      var c = arguments,
       d = b;
      [].shift.apply(c);
      var e, f = this.each(function() {
       var b = a(this);
       if (b.is("select")) {
        var f = b.data("selectpicker"),
         g = "object" == typeof d && d;
        if (f) {
         if (g)
          for (var h in g) g.hasOwnProperty(h) && (f.options[h] = g[h])
        } else {
         var i = a.extend({}, k.DEFAULTS, a.fn.selectpicker.defaults || {}, b.data(), g);
         i.template = a.extend({}, k.DEFAULTS.template, a.fn.selectpicker.defaults ? a.fn.selectpicker.defaults.template : {}, b.data().template, g.template), b.data("selectpicker", f = new k(this, i))
        }
        "string" == typeof d && (e = f[d] instanceof Function ? f[d].apply(f, c) : f.options[d])
       }
      });
      return "undefined" != typeof e ? e : f
     }
     String.prototype.includes || ! function() {
      var a = {}.toString,
       b = function() {
        try {
         var a = {},
          b = Object.defineProperty,
          c = b(a, a, a) && b
        } catch (a) {}
        return c
       }(),
       c = "".indexOf,
       d = function(b) {
        if (null == this) throw new TypeError;
        var d = String(this);
        if (b && "[object RegExp]" == a.call(b)) throw new TypeError;
        var e = d.length,
         f = String(b),
         g = f.length,
         h = arguments.length > 1 ? arguments[1] : void 0,
         i = h ? Number(h) : 0;
        i != i && (i = 0);
        var j = Math.min(Math.max(i, 0), e);
        return !(g + j > e) && c.call(d, f, i) != -1
       };
      b ? b(String.prototype, "includes", {
       value: d,
       configurable: !0,
       writable: !0
      }) : String.prototype.includes = d
     }(), String.prototype.startsWith || ! function() {
      var a = function() {
        try {
         var a = {},
          b = Object.defineProperty,
          c = b(a, a, a) && b
        } catch (a) {}
        return c
       }(),
       b = {}.toString,
       c = function(a) {
        if (null == this) throw new TypeError;
        var c = String(this);
        if (a && "[object RegExp]" == b.call(a)) throw new TypeError;
        var d = c.length,
         e = String(a),
         f = e.length,
         g = arguments.length > 1 ? arguments[1] : void 0,
         h = g ? Number(g) : 0;
        h != h && (h = 0);
        var i = Math.min(Math.max(h, 0), d);
        if (f + i > d) return !1;
        for (var j = -1; ++j < f;)
         if (c.charCodeAt(i + j) != e.charCodeAt(j)) return !1;
        return !0
       };
      a ? a(String.prototype, "startsWith", {
       value: c,
       configurable: !0,
       writable: !0
      }) : String.prototype.startsWith = c
     }(), Object.keys || (Object.keys = function(a, b, c) {
      c = [];
      for (b in a) c.hasOwnProperty.call(a, b) && c.push(b);
      return c
     });
     var d = {
      useDefault: !1,
      _set: a.valHooks.select.set
     };
     a.valHooks.select.set = function(b, c) {
      return c && !d.useDefault && a(b).data("selected", !0), d._set.apply(this, arguments)
     };
     var e = null;
     a.fn.triggerNative = function(a) {
      var b, c = this[0];
      c.dispatchEvent ? ("function" == typeof Event ? b = new Event(a, {
       bubbles: !0
      }) : (b = document.createEvent("Event"), b.initEvent(a, !0, !1)), c.dispatchEvent(b)) : c.fireEvent ? (b = document.createEventObject(), b.eventType = a, c.fireEvent("on" + a, b)) : this.trigger(a)
     }, a.expr.pseudos.icontains = function(b, c, d) {
      var e = a(b),
       f = (e.data("tokens") || e.text()).toString().toUpperCase();
      return f.includes(d[3].toUpperCase())
     }, a.expr.pseudos.ibegins = function(b, c, d) {
      var e = a(b),
       f = (e.data("tokens") || e.text()).toString().toUpperCase();
      return f.startsWith(d[3].toUpperCase())
     }, a.expr.pseudos.aicontains = function(b, c, d) {
      var e = a(b),
       f = (e.data("tokens") || e.data("normalizedText") || e.text()).toString().toUpperCase();
      return f.includes(d[3].toUpperCase())
     }, a.expr.pseudos.aibegins = function(b, c, d) {
      var e = a(b),
       f = (e.data("tokens") || e.data("normalizedText") || e.text()).toString().toUpperCase();
      return f.startsWith(d[3].toUpperCase())
     };
     var f = {
       "&": "&amp;",
       "<": "&lt;",
       ">": "&gt;",
       '"': "&quot;",
       "'": "&#x27;",
       "`": "&#x60;"
      },
      g = {
       "&amp;": "&",
       "&lt;": "<",
       "&gt;": ">",
       "&quot;": '"',
       "&#x27;": "'",
       "&#x60;": "`"
      },
      h = function(a) {
       var b = function(b) {
         return a[b]
        },
        c = "(?:" + Object.keys(a).join("|") + ")",
        d = RegExp(c),
        e = RegExp(c, "g");
       return function(a) {
        return a = null == a ? "" : "" + a, d.test(a) ? a.replace(e, b) : a
       }
      },
      i = h(f),
      j = h(g),
      k = function(b, c) {
       d.useDefault || (a.valHooks.select.set = d._set, d.useDefault = !0), this.$element = a(b), this.$newElement = null, this.$button = null, this.$menu = null, this.$lis = null, this.options = c, null === this.options.title && (this.options.title = this.$element.attr("title"));
       var e = this.options.windowPadding;
       "number" == typeof e && (this.options.windowPadding = [e, e, e, e]), this.val = k.prototype.val, this.render = k.prototype.render, this.refresh = k.prototype.refresh, this.setStyle = k.prototype.setStyle, this.selectAll = k.prototype.selectAll, this.deselectAll = k.prototype.deselectAll, this.destroy = k.prototype.destroy, this.remove = k.prototype.remove, this.show = k.prototype.show, this.hide = k.prototype.hide, this.init()
      };
     k.VERSION = "1.12.2", k.DEFAULTS = {
      noneSelectedText: "Nothing selected",
      noneResultsText: "No results matched {0}",
      countSelectedText: function(a, b) {
       return 1 == a ? "{0} item selected" : "{0} items selected"
      },
      maxOptionsText: function(a, b) {
       return [1 == a ? "Limit reached ({n} item max)" : "Limit reached ({n} items max)", 1 == b ? "Group limit reached ({n} item max)" : "Group limit reached ({n} items max)"]
      },
      selectAllText: "Select All",
      deselectAllText: "Deselect All",
      doneButton: !1,
      doneButtonText: "Close",
      multipleSeparator: ", ",
      styleBase: "btn",
      style: "btn-default",
      size: "auto",
      title: null,
      selectedTextFormat: "values",
      width: !1,
      container: !1,
      hideDisabled: !1,
      showSubtext: !1,
      showIcon: !0,
      showContent: !0,
      dropupAuto: !0,
      header: !1,
      liveSearch: !1,
      liveSearchPlaceholder: null,
      liveSearchNormalize: !1,
      liveSearchStyle: "contains",
      actionsBox: !1,
      iconBase: "glyphicon",
      tickIcon: "glyphicon-ok",
      showTick: !1,
      template: {
       caret: '<span class="caret"></span>'
      },
      maxOptions: !1,
      mobile: !1,
      selectOnTab: !1,
      dropdownAlignRight: !1,
      windowPadding: 0
     }, k.prototype = {
      constructor: k,
      init: function() {
       var b = this,
        c = this.$element.attr("id");
       this.$element.addClass("bs-select-hidden"), this.liObj = {}, this.multiple = this.$element.prop("multiple"), this.autofocus = this.$element.prop("autofocus"), this.$newElement = this.createView(), this.$element.after(this.$newElement).appendTo(this.$newElement), this.$button = this.$newElement.children("button"), this.$menu = this.$newElement.children(".dropdown-menu"), this.$menuInner = this.$menu.children(".inner"), this.$searchbox = this.$menu.find("input"), this.$element.removeClass("bs-select-hidden"), this.options.dropdownAlignRight === !0 && this.$menu.addClass("dropdown-menu-right"), "undefined" != typeof c && (this.$button.attr("data-id", c), a('label[for="' + c + '"]').click(function(a) {
        a.preventDefault(), b.$button.focus()
       })), this.checkDisabled(), this.clickListener(), this.options.liveSearch && this.liveSearchListener(), this.render(), this.setStyle(), this.setWidth(), this.options.container && this.selectPosition(), this.$menu.data("this", this), this.$newElement.data("this", this), this.options.mobile && this.mobile(), this.$newElement.on({
        "hide.bs.dropdown": function(a) {
         b.$menuInner.attr("aria-expanded", !1), b.$element.trigger("hide.bs.select", a)
        },
        "hidden.bs.dropdown": function(a) {
         b.$element.trigger("hidden.bs.select", a)
        },
        "show.bs.dropdown": function(a) {
         b.$menuInner.attr("aria-expanded", !0), b.$element.trigger("show.bs.select", a)
        },
        "shown.bs.dropdown": function(a) {
         b.$element.trigger("shown.bs.select", a)
        }
       }), b.$element[0].hasAttribute("required") && this.$element.on("invalid", function() {
        b.$button.addClass("bs-invalid").focus(), b.$element.on({
         "focus.bs.select": function() {
          b.$button.focus(), b.$element.off("focus.bs.select")
         },
         "shown.bs.select": function() {
          b.$element.val(b.$element.val()).off("shown.bs.select")
         },
         "rendered.bs.select": function() {
          this.validity.valid && b.$button.removeClass("bs-invalid"), b.$element.off("rendered.bs.select")
         }
        })
       }), setTimeout(function() {
        b.$element.trigger("loaded.bs.select")
       })
      },
      createDropdown: function() {
       var b = this.multiple || this.options.showTick ? " show-tick" : "",
        c = this.$element.parent().hasClass("input-group") ? " input-group-btn" : "",
        d = this.autofocus ? " autofocus" : "",
        e = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + "</div>" : "",
        f = this.options.liveSearch ? '<div class="bs-searchbox"><input type="text" class="form-control" autocomplete="off"' + (null === this.options.liveSearchPlaceholder ? "" : ' placeholder="' + i(this.options.liveSearchPlaceholder) + '"') + ' role="textbox" aria-label="Search"></div>' : "",
        g = this.multiple && this.options.actionsBox ? '<div class="bs-actionsbox"><div class="btn-group btn-group-sm btn-block"><button type="button" class="actions-btn bs-select-all btn btn-default">' + this.options.selectAllText + '</button><button type="button" class="actions-btn bs-deselect-all btn btn-default">' + this.options.deselectAllText + "</button></div></div>" : "",
        h = this.multiple && this.options.doneButton ? '<div class="bs-donebutton"><div class="btn-group btn-block"><button type="button" class="btn btn-sm btn-default">' + this.options.doneButtonText + "</button></div></div>" : "",
        j = '<div class="btn-group bootstrap-select' + b + c + '"><button type="button" class="' + this.options.styleBase + ' dropdown-toggle" data-toggle="dropdown"' + d + ' role="button"><span class="filter-option pull-left"></span>&nbsp;<span class="bs-caret">' + this.options.template.caret + '</span></button><div class="dropdown-menu open" role="combobox">' + e + f + g + '<ul class="dropdown-menu inner" role="listbox" aria-expanded="false"></ul>' + h + "</div></div>";
       return a(j)
      },
      createView: function() {
       var a = this.createDropdown(),
        b = this.createLi();
       return a.find("ul")[0].innerHTML = b, a
      },
      reloadLi: function() {
       var a = this.createLi();
       this.$menuInner[0].innerHTML = a
      },
      createLi: function() {
       var c = this,
        d = [],
        e = 0,
        f = document.createElement("option"),
        g = -1,
        h = function(a, b, c, d) {
         return "<li" + ("undefined" != typeof c & "" !== c ? ' class="' + c + '"' : "") + ("undefined" != typeof b & null !== b ? ' data-original-index="' + b + '"' : "") + ("undefined" != typeof d & null !== d ? 'data-optgroup="' + d + '"' : "") + ">" + a + "</li>"
        },
        j = function(d, e, f, g) {
         return '<a tabindex="0"' + ("undefined" != typeof e ? ' class="' + e + '"' : "") + (f ? ' style="' + f + '"' : "") + (c.options.liveSearchNormalize ? ' data-normalized-text="' + b(i(a(d).html())) + '"' : "") + ("undefined" != typeof g || null !== g ? ' data-tokens="' + g + '"' : "") + ' role="option">' + d + '<span class="' + c.options.iconBase + " " + c.options.tickIcon + ' check-mark"></span></a>'
        };
       if (this.options.title && !this.multiple && (g--, !this.$element.find(".bs-title-option").length)) {
        var k = this.$element[0];
        f.className = "bs-title-option", f.innerHTML = this.options.title, f.value = "", k.insertBefore(f, k.firstChild);
        var l = a(k.options[k.selectedIndex]);
        void 0 === l.attr("selected") && void 0 === this.$element.data("selected") && (f.selected = !0)
       }
       return this.$element.find("option").each(function(b) {
        var f = a(this);
        if (g++, !f.hasClass("bs-title-option")) {
         var k = this.className || "",
          l = this.style.cssText,
          m = f.data("content") ? f.data("content") : f.html(),
          n = f.data("tokens") ? f.data("tokens") : null,
          o = "undefined" != typeof f.data("subtext") ? '<small class="text-muted">' + f.data("subtext") + "</small>" : "",
          p = "undefined" != typeof f.data("icon") ? '<span class="' + c.options.iconBase + " " + f.data("icon") + '"></span> ' : "",
          q = f.parent(),
          r = "OPTGROUP" === q[0].tagName,
          s = r && q[0].disabled,
          t = this.disabled || s;
         if ("" !== p && t && (p = "<span>" + p + "</span>"), c.options.hideDisabled && (t && !r || s)) return void g--;
         if (f.data("content") || (m = p + '<span class="text">' + m + o + "</span>"), r && f.data("divider") !== !0) {
          if (c.options.hideDisabled && t) {
           if (void 0 === q.data("allOptionsDisabled")) {
            var u = q.children();
            q.data("allOptionsDisabled", u.filter(":disabled").length === u.length)
           }
           if (q.data("allOptionsDisabled")) return void g--
          }
          var v = " " + q[0].className || "";
          if (0 === f.index()) {
           e += 1;
           var w = q[0].label,
            x = "undefined" != typeof q.data("subtext") ? '<small class="text-muted">' + q.data("subtext") + "</small>" : "",
            y = q.data("icon") ? '<span class="' + c.options.iconBase + " " + q.data("icon") + '"></span> ' : "";
           w = y + '<span class="text">' + i(w) + x + "</span>", 0 !== b && d.length > 0 && (g++, d.push(h("", null, "divider", e + "div"))), g++, d.push(h(w, null, "dropdown-header" + v, e))
          }
          if (c.options.hideDisabled && t) return void g--;
          d.push(h(j(m, "opt " + k + v, l, n), b, "", e))
         } else if (f.data("divider") === !0) d.push(h("", b, "divider"));
         else if (f.data("hidden") === !0) d.push(h(j(m, k, l, n), b, "hidden is-hidden"));
         else {
          var z = this.previousElementSibling && "OPTGROUP" === this.previousElementSibling.tagName;
          if (!z && c.options.hideDisabled)
           for (var A = a(this).prevAll(), B = 0; B < A.length; B++)
            if ("OPTGROUP" === A[B].tagName) {
             for (var C = 0, D = 0; D < B; D++) {
              var E = A[D];
              (E.disabled || a(E).data("hidden") === !0) && C++
             }
             C === B && (z = !0);
             break
            } z && (g++, d.push(h("", null, "divider", e + "div"))), d.push(h(j(m, k, l, n), b))
         }
         c.liObj[b] = g
        }
       }), this.multiple || 0 !== this.$element.find("option:selected").length || this.options.title || this.$element.find("option").eq(0).prop("selected", !0).attr("selected", "selected"), d.join("")
      },
      findLis: function() {
       return null == this.$lis && (this.$lis = this.$menu.find("li")), this.$lis
      },
      render: function(b) {
       var c, d = this;
       b !== !1 && this.$element.find("option").each(function(a) {
        var b = d.findLis().eq(d.liObj[a]);
        d.setDisabled(a, this.disabled || "OPTGROUP" === this.parentNode.tagName && this.parentNode.disabled, b), d.setSelected(a, this.selected, b)
       }), this.togglePlaceholder(), this.tabIndex();
       var e = this.$element.find("option").map(function() {
         if (this.selected) {
          if (d.options.hideDisabled && (this.disabled || "OPTGROUP" === this.parentNode.tagName && this.parentNode.disabled)) return;
          var b, c = a(this),
           e = c.data("icon") && d.options.showIcon ? '<i class="' + d.options.iconBase + " " + c.data("icon") + '"></i> ' : "";
          return b = d.options.showSubtext && c.data("subtext") && !d.multiple ? ' <small class="text-muted">' + c.data("subtext") + "</small>" : "", "undefined" != typeof c.attr("title") ? c.attr("title") : c.data("content") && d.options.showContent ? c.data("content").toString() : e + c.html() + b
         }
        }).toArray(),
        f = this.multiple ? e.join(this.options.multipleSeparator) : e[0];
       if (this.multiple && this.options.selectedTextFormat.indexOf("count") > -1) {
        var g = this.options.selectedTextFormat.split(">");
        if (g.length > 1 && e.length > g[1] || 1 == g.length && e.length >= 2) {
         c = this.options.hideDisabled ? ", [disabled]" : "";
         var h = this.$element.find("option").not('[data-divider="true"], [data-hidden="true"]' + c).length,
          i = "function" == typeof this.options.countSelectedText ? this.options.countSelectedText(e.length, h) : this.options.countSelectedText;
         f = i.replace("{0}", e.length.toString()).replace("{1}", h.toString())
        }
       }
       void 0 == this.options.title && (this.options.title = this.$element.attr("title")), "static" == this.options.selectedTextFormat && (f = this.options.title), f || (f = "undefined" != typeof this.options.title ? this.options.title : this.options.noneSelectedText), this.$button.attr("title", j(a.trim(f.replace(/<[^>]*>?/g, "")))), this.$button.children(".filter-option").html(f), this.$element.trigger("rendered.bs.select")
      },
      setStyle: function(a, b) {
       this.$element.attr("class") && this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, ""));
       var c = a ? a : this.options.style;
       "add" == b ? this.$button.addClass(c) : "remove" == b ? this.$button.removeClass(c) : (this.$button.removeClass(this.options.style), this.$button.addClass(c))
      },
      liHeight: function(b) {
       if (b || this.options.size !== !1 && !this.sizeInfo) {
        var c = document.createElement("div"),
         d = document.createElement("div"),
         e = document.createElement("ul"),
         f = document.createElement("li"),
         g = document.createElement("li"),
         h = document.createElement("a"),
         i = document.createElement("span"),
         j = this.options.header && this.$menu.find(".popover-title").length > 0 ? this.$menu.find(".popover-title")[0].cloneNode(!0) : null,
         k = this.options.liveSearch ? document.createElement("div") : null,
         l = this.options.actionsBox && this.multiple && this.$menu.find(".bs-actionsbox").length > 0 ? this.$menu.find(".bs-actionsbox")[0].cloneNode(!0) : null,
         m = this.options.doneButton && this.multiple && this.$menu.find(".bs-donebutton").length > 0 ? this.$menu.find(".bs-donebutton")[0].cloneNode(!0) : null;
        if (i.className = "text", c.className = this.$menu[0].parentNode.className + " open", d.className = "dropdown-menu open", e.className = "dropdown-menu inner", f.className = "divider", i.appendChild(document.createTextNode("Inner text")), h.appendChild(i), g.appendChild(h), e.appendChild(g), e.appendChild(f), j && d.appendChild(j), k) {
         var n = document.createElement("input");
         k.className = "bs-searchbox", n.className = "form-control", k.appendChild(n), d.appendChild(k)
        }
        l && d.appendChild(l), d.appendChild(e), m && d.appendChild(m), c.appendChild(d), document.body.appendChild(c);
        var o = h.offsetHeight,
         p = j ? j.offsetHeight : 0,
         q = k ? k.offsetHeight : 0,
         r = l ? l.offsetHeight : 0,
         s = m ? m.offsetHeight : 0,
         t = a(f).outerHeight(!0),
         u = "function" == typeof getComputedStyle && getComputedStyle(d),
         v = u ? null : a(d),
         w = {
          vert: parseInt(u ? u.paddingTop : v.css("paddingTop")) + parseInt(u ? u.paddingBottom : v.css("paddingBottom")) + parseInt(u ? u.borderTopWidth : v.css("borderTopWidth")) + parseInt(u ? u.borderBottomWidth : v.css("borderBottomWidth")),
          horiz: parseInt(u ? u.paddingLeft : v.css("paddingLeft")) + parseInt(u ? u.paddingRight : v.css("paddingRight")) + parseInt(u ? u.borderLeftWidth : v.css("borderLeftWidth")) + parseInt(u ? u.borderRightWidth : v.css("borderRightWidth"))
         },
         x = {
          vert: w.vert + parseInt(u ? u.marginTop : v.css("marginTop")) + parseInt(u ? u.marginBottom : v.css("marginBottom")) + 2,
          horiz: w.horiz + parseInt(u ? u.marginLeft : v.css("marginLeft")) + parseInt(u ? u.marginRight : v.css("marginRight")) + 2
         };
        document.body.removeChild(c), this.sizeInfo = {
         liHeight: o,
         headerHeight: p,
         searchHeight: q,
         actionsHeight: r,
         doneButtonHeight: s,
         dividerHeight: t,
         menuPadding: w,
         menuExtras: x
        }
       }
      },
      setSize: function() {
       if (this.findLis(), this.liHeight(), this.options.header && this.$menu.css("padding-top", 0), this.options.size !== !1) {
        var b, c, d, e, f, g, h, i, j = this,
         k = this.$menu,
         l = this.$menuInner,
         m = a(window),
         n = this.$newElement[0].offsetHeight,
         o = this.$newElement[0].offsetWidth,
         p = this.sizeInfo.liHeight,
         q = this.sizeInfo.headerHeight,
         r = this.sizeInfo.searchHeight,
         s = this.sizeInfo.actionsHeight,
         t = this.sizeInfo.doneButtonHeight,
         u = this.sizeInfo.dividerHeight,
         v = this.sizeInfo.menuPadding,
         w = this.sizeInfo.menuExtras,
         x = this.options.hideDisabled ? ".disabled" : "",
         y = function() {
          var b, c = j.$newElement.offset(),
           d = a(j.options.container);
          j.options.container && !d.is("body") ? (b = d.offset(), b.top += parseInt(d.css("borderTopWidth")), b.left += parseInt(d.css("borderLeftWidth"))) : b = {
           top: 0,
           left: 0
          };
          var e = j.options.windowPadding;
          f = c.top - b.top - m.scrollTop(), g = m.height() - f - n - b.top - e[2], h = c.left - b.left - m.scrollLeft(), i = m.width() - h - o - b.left - e[1], f -= e[0], h -= e[3]
         };
        if (y(), "auto" === this.options.size) {
         var z = function() {
          var m, n = function(b, c) {
            return function(d) {
             return c ? d.classList ? d.classList.contains(b) : a(d).hasClass(b) : !(d.classList ? d.classList.contains(b) : a(d).hasClass(b))
            }
           },
           u = j.$menuInner[0].getElementsByTagName("li"),
           x = Array.prototype.filter ? Array.prototype.filter.call(u, n("hidden", !1)) : j.$lis.not(".hidden"),
           z = Array.prototype.filter ? Array.prototype.filter.call(x, n("dropdown-header", !0)) : x.filter(".dropdown-header");
          y(), b = g - w.vert, c = i - w.horiz, j.options.container ? (k.data("height") || k.data("height", k.height()), d = k.data("height"), k.data("width") || k.data("width", k.width()), e = k.data("width")) : (d = k.height(), e = k.width()), j.options.dropupAuto && j.$newElement.toggleClass("dropup", f > g && b - w.vert < d), j.$newElement.hasClass("dropup") && (b = f - w.vert), "auto" === j.options.dropdownAlignRight && k.toggleClass("dropdown-menu-right", h > i && c - w.horiz < e - o), m = x.length + z.length > 3 ? 3 * p + w.vert - 2 : 0, k.css({
           "max-height": b + "px",
           overflow: "hidden",
           "min-height": m + q + r + s + t + "px"
          }), l.css({
           "max-height": b - q - r - s - t - v.vert + "px",
           "overflow-y": "auto",
           "min-height": Math.max(m - v.vert, 0) + "px"
          })
         };
         z(), this.$searchbox.off("input.getSize propertychange.getSize").on("input.getSize propertychange.getSize", z), m.off("resize.getSize scroll.getSize").on("resize.getSize scroll.getSize", z)
        } else if (this.options.size && "auto" != this.options.size && this.$lis.not(x).length > this.options.size) {
         var A = this.$lis.not(".divider").not(x).children().slice(0, this.options.size).last().parent().index(),
          B = this.$lis.slice(0, A + 1).filter(".divider").length;
         b = p * this.options.size + B * u + v.vert, j.options.container ? (k.data("height") || k.data("height", k.height()), d = k.data("height")) : d = k.height(), j.options.dropupAuto && this.$newElement.toggleClass("dropup", f > g && b - w.vert < d), k.css({
          "max-height": b + q + r + s + t + "px",
          overflow: "hidden",
          "min-height": ""
         }), l.css({
          "max-height": b - v.vert + "px",
          "overflow-y": "auto",
          "min-height": ""
         })
        }
       }
      },
      setWidth: function() {
       if ("auto" === this.options.width) {
        this.$menu.css("min-width", "0");
        var a = this.$menu.parent().clone().appendTo("body"),
         b = this.options.container ? this.$newElement.clone().appendTo("body") : a,
         c = a.children(".dropdown-menu").outerWidth(),
         d = b.css("width", "auto").children("button").outerWidth();
        a.remove(), b.remove(), this.$newElement.css("width", Math.max(c, d) + "px")
       } else "fit" === this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", "").addClass("fit-width")) : this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", this.options.width)) : (this.$menu.css("min-width", ""), this.$newElement.css("width", ""));
       this.$newElement.hasClass("fit-width") && "fit" !== this.options.width && this.$newElement.removeClass("fit-width")
      },
      selectPosition: function() {
       this.$bsContainer = a('<div class="bs-container" />');
       var b, c, d, e = this,
        f = a(this.options.container),
        g = function(a) {
         e.$bsContainer.addClass(a.attr("class").replace(/form-control|fit-width/gi, "")).toggleClass("dropup", a.hasClass("dropup")), b = a.offset(), f.is("body") ? c = {
          top: 0,
          left: 0
         } : (c = f.offset(), c.top += parseInt(f.css("borderTopWidth")) - f.scrollTop(), c.left += parseInt(f.css("borderLeftWidth")) - f.scrollLeft()), d = a.hasClass("dropup") ? 0 : a[0].offsetHeight, e.$bsContainer.css({
          top: b.top - c.top + d,
          left: b.left - c.left,
          width: a[0].offsetWidth
         })
        };
       this.$button.on("click", function() {
        var b = a(this);
        e.isDisabled() || (g(e.$newElement), e.$bsContainer.appendTo(e.options.container).toggleClass("open", !b.hasClass("open")).append(e.$menu))
       }), a(window).on("resize scroll", function() {
        g(e.$newElement)
       }), this.$element.on("hide.bs.select", function() {
        e.$menu.data("height", e.$menu.height()), e.$bsContainer.detach()
       })
      },
      setSelected: function(a, b, c) {
       c || (this.togglePlaceholder(), c = this.findLis().eq(this.liObj[a])), c.toggleClass("selected", b).find("a").attr("aria-selected", b)
      },
      setDisabled: function(a, b, c) {
       c || (c = this.findLis().eq(this.liObj[a])), b ? c.addClass("disabled").children("a").attr("href", "#").attr("tabindex", -1).attr("aria-disabled", !0) : c.removeClass("disabled").children("a").removeAttr("href").attr("tabindex", 0).attr("aria-disabled", !1)
      },
      isDisabled: function() {
       return this.$element[0].disabled
      },
      checkDisabled: function() {
       var a = this;
       this.isDisabled() ? (this.$newElement.addClass("disabled"), this.$button.addClass("disabled").attr("tabindex", -1).attr("aria-disabled", !0)) : (this.$button.hasClass("disabled") && (this.$newElement.removeClass("disabled"), this.$button.removeClass("disabled").attr("aria-disabled", !1)), this.$button.attr("tabindex") != -1 || this.$element.data("tabindex") || this.$button.removeAttr("tabindex")), this.$button.click(function() {
        return !a.isDisabled()
       })
      },
      togglePlaceholder: function() {
       var a = this.$element.val();
       this.$button.toggleClass("bs-placeholder", null === a || "" === a || a.constructor === Array && 0 === a.length)
      },
      tabIndex: function() {
       this.$element.data("tabindex") !== this.$element.attr("tabindex") && this.$element.attr("tabindex") !== -98 && "-98" !== this.$element.attr("tabindex") && (this.$element.data("tabindex", this.$element.attr("tabindex")), this.$button.attr("tabindex", this.$element.data("tabindex"))), this.$element.attr("tabindex", -98)
      },
      clickListener: function() {
       var b = this,
        c = a(document);
       c.data("spaceSelect", !1), this.$button.on("keyup", function(a) {
        /(32)/.test(a.keyCode.toString(10)) && c.data("spaceSelect") && (a.preventDefault(), c.data("spaceSelect", !1))
       }), this.$button.on("click", function() {
        b.setSize()
       }), this.$element.on("shown.bs.select", function() {
        if (b.options.liveSearch || b.multiple) {
         if (!b.multiple) {
          var a = b.liObj[b.$element[0].selectedIndex];
          if ("number" != typeof a || b.options.size === !1) return;
          var c = b.$lis.eq(a)[0].offsetTop - b.$menuInner[0].offsetTop;
          c = c - b.$menuInner[0].offsetHeight / 2 + b.sizeInfo.liHeight / 2, b.$menuInner[0].scrollTop = c
         }
        } else b.$menuInner.find(".selected a").focus()
       }), this.$menuInner.on("click", "li a", function(c) {
        var d = a(this),
         f = d.parent().data("originalIndex"),
         g = b.$element.val(),
         h = b.$element.prop("selectedIndex"),
         i = !0;
        if (b.multiple && 1 !== b.options.maxOptions && c.stopPropagation(), c.preventDefault(), !b.isDisabled() && !d.parent().hasClass("disabled")) {
         var j = b.$element.find("option"),
          k = j.eq(f),
          l = k.prop("selected"),
          m = k.parent("optgroup"),
          n = b.options.maxOptions,
          o = m.data("maxOptions") || !1;
         if (b.multiple) {
          if (k.prop("selected", !l), b.setSelected(f, !l), d.blur(), n !== !1 || o !== !1) {
           var p = n < j.filter(":selected").length,
            q = o < m.find("option:selected").length;
           if (n && p || o && q)
            if (n && 1 == n) j.prop("selected", !1), k.prop("selected", !0), b.$menuInner.find(".selected").removeClass("selected"), b.setSelected(f, !0);
            else if (o && 1 == o) {
            m.find("option:selected").prop("selected", !1), k.prop("selected", !0);
            var r = d.parent().data("optgroup");
            b.$menuInner.find('[data-optgroup="' + r + '"]').removeClass("selected"), b.setSelected(f, !0)
           } else {
            var s = "string" == typeof b.options.maxOptionsText ? [b.options.maxOptionsText, b.options.maxOptionsText] : b.options.maxOptionsText,
             t = "function" == typeof s ? s(n, o) : s,
             u = t[0].replace("{n}", n),
             v = t[1].replace("{n}", o),
             w = a('<div class="notify"></div>');
            t[2] && (u = u.replace("{var}", t[2][n > 1 ? 0 : 1]), v = v.replace("{var}", t[2][o > 1 ? 0 : 1])), k.prop("selected", !1), b.$menu.append(w), n && p && (w.append(a("<div>" + u + "</div>")), i = !1, b.$element.trigger("maxReached.bs.select")), o && q && (w.append(a("<div>" + v + "</div>")), i = !1, b.$element.trigger("maxReachedGrp.bs.select")), setTimeout(function() {
             b.setSelected(f, !1)
            }, 10), w.delay(750).fadeOut(300, function() {
             a(this).remove()
            })
           }
          }
         } else j.prop("selected", !1), k.prop("selected", !0), b.$menuInner.find(".selected").removeClass("selected").find("a").attr("aria-selected", !1), b.setSelected(f, !0);
         !b.multiple || b.multiple && 1 === b.options.maxOptions ? b.$button.focus() : b.options.liveSearch && b.$searchbox.focus(), i && (g != b.$element.val() && b.multiple || h != b.$element.prop("selectedIndex") && !b.multiple) && (e = [f, k.prop("selected"), l], b.$element.triggerNative("change"))
        }
       }), this.$menu.on("click", "li.disabled a, .popover-title, .popover-title :not(.close)", function(c) {
        c.currentTarget == this && (c.preventDefault(), c.stopPropagation(), b.options.liveSearch && !a(c.target).hasClass("close") ? b.$searchbox.focus() : b.$button.focus())
       }), this.$menuInner.on("click", ".divider, .dropdown-header", function(a) {
        a.preventDefault(), a.stopPropagation(), b.options.liveSearch ? b.$searchbox.focus() : b.$button.focus()
       }), this.$menu.on("click", ".popover-title .close", function() {
        b.$button.click()
       }), this.$searchbox.on("click", function(a) {
        a.stopPropagation()
       }), this.$menu.on("click", ".actions-btn", function(c) {
        b.options.liveSearch ? b.$searchbox.focus() : b.$button.focus(), c.preventDefault(), c.stopPropagation(), a(this).hasClass("bs-select-all") ? b.selectAll() : b.deselectAll()
       }), this.$element.change(function() {
        b.render(!1), b.$element.trigger("changed.bs.select", e), e = null
       })
      },
      liveSearchListener: function() {
       var c = this,
        d = a('<li class="no-results"></li>');
       this.$button.on("click.dropdown.data-api", function() {
        c.$menuInner.find(".active").removeClass("active"), c.$searchbox.val() && (c.$searchbox.val(""), c.$lis.not(".is-hidden").removeClass("hidden"), d.parent().length && d.remove()), c.multiple || c.$menuInner.find(".selected").addClass("active"), setTimeout(function() {
         c.$searchbox.focus()
        }, 10)
       }), this.$searchbox.on("click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api", function(a) {
        a.stopPropagation()
       }), this.$searchbox.on("input propertychange", function() {
        if (c.$lis.not(".is-hidden").removeClass("hidden"), c.$lis.filter(".active").removeClass("active"), d.remove(), c.$searchbox.val()) {
         var e, f = c.$lis.not(".is-hidden, .divider, .dropdown-header");
         if (e = c.options.liveSearchNormalize ? f.find("a").not(":a" + c._searchStyle() + '("' + b(c.$searchbox.val()) + '")') : f.find("a").not(":" + c._searchStyle() + '("' + c.$searchbox.val() + '")'), e.length === f.length) d.html(c.options.noneResultsText.replace("{0}", '"' + i(c.$searchbox.val()) + '"')), c.$menuInner.append(d), c.$lis.addClass("hidden");
         else {
          e.parent().addClass("hidden");
          var g, h = c.$lis.not(".hidden");
          h.each(function(b) {
           var c = a(this);
           c.hasClass("divider") ? void 0 === g ? c.addClass("hidden") : (g && g.addClass("hidden"), g = c) : c.hasClass("dropdown-header") && h.eq(b + 1).data("optgroup") !== c.data("optgroup") ? c.addClass("hidden") : g = null
          }), g && g.addClass("hidden"), f.not(".hidden").first().addClass("active")
         }
        }
       })
      },
      _searchStyle: function() {
       var a = {
        begins: "ibegins",
        startsWith: "ibegins"
       };
       return a[this.options.liveSearchStyle] || "icontains"
      },
      val: function(a) {
       return "undefined" != typeof a ? (this.$element.val(a), this.render(), this.$element) : this.$element.val()
      },
      changeAll: function(b) {
       if (this.multiple) {
        "undefined" == typeof b && (b = !0), this.findLis();
        var c = this.$element.find("option"),
         d = this.$lis.not(".divider, .dropdown-header, .disabled, .hidden"),
         e = d.length,
         f = [];
        if (b) {
         if (d.filter(".selected").length === d.length) return
        } else if (0 === d.filter(".selected").length) return;
        d.toggleClass("selected", b);
        for (var g = 0; g < e; g++) {
         var h = d[g].getAttribute("data-original-index");
         f[f.length] = c.eq(h)[0]
        }
        a(f).prop("selected", b), this.render(!1), this.togglePlaceholder(), this.$element.triggerNative("change")
       }
      },
      selectAll: function() {
       return this.changeAll(!0)
      },
      deselectAll: function() {
       return this.changeAll(!1)
      },
      toggle: function(a) {
       a = a || window.event, a && a.stopPropagation(), this.$button.trigger("click")
      },
      keydown: function(c) {
       var d, e, f, g, h, i, j, k, l, m = a(this),
        n = m.is("input") ? m.parent().parent() : m.parent(),
        o = n.data("this"),
        p = ":not(.disabled, .hidden, .dropdown-header, .divider)",
        q = {
         32: " ",
         48: "0",
         49: "1",
         50: "2",
         51: "3",
         52: "4",
         53: "5",
         54: "6",
         55: "7",
         56: "8",
         57: "9",
         59: ";",
         65: "a",
         66: "b",
         67: "c",
         68: "d",
         69: "e",
         70: "f",
         71: "g",
         72: "h",
         73: "i",
         74: "j",
         75: "k",
         76: "l",
         77: "m",
         78: "n",
         79: "o",
         80: "p",
         81: "q",
         82: "r",
         83: "s",
         84: "t",
         85: "u",
         86: "v",
         87: "w",
         88: "x",
         89: "y",
         90: "z",
         96: "0",
         97: "1",
         98: "2",
         99: "3",
         100: "4",
         101: "5",
         102: "6",
         103: "7",
         104: "8",
         105: "9"
        };
       if (o.options.liveSearch && (n = m.parent().parent()), o.options.container && (n = o.$menu), d = a('[role="listbox"] li', n), l = o.$newElement.hasClass("open"), !l && (c.keyCode >= 48 && c.keyCode <= 57 || c.keyCode >= 96 && c.keyCode <= 105 || c.keyCode >= 65 && c.keyCode <= 90)) return o.options.container ? o.$button.trigger("click") : (o.setSize(), o.$menu.parent().addClass("open"), l = !0), void o.$searchbox.focus();
       if (o.options.liveSearch && (/(^9$|27)/.test(c.keyCode.toString(10)) && l && (c.preventDefault(), c.stopPropagation(), o.$menuInner.click(), o.$button.focus()), d = a('[role="listbox"] li' + p, n), m.val() || /(38|40)/.test(c.keyCode.toString(10)) || 0 === d.filter(".active").length && (d = o.$menuInner.find("li"), d = o.options.liveSearchNormalize ? d.filter(":a" + o._searchStyle() + "(" + b(q[c.keyCode]) + ")") : d.filter(":" + o._searchStyle() + "(" + q[c.keyCode] + ")"))), d.length) {
        if (/(38|40)/.test(c.keyCode.toString(10))) e = d.index(d.find("a").filter(":focus").parent()), g = d.filter(p).first().index(), h = d.filter(p).last().index(), f = d.eq(e).nextAll(p).eq(0).index(), i = d.eq(e).prevAll(p).eq(0).index(), j = d.eq(f).prevAll(p).eq(0).index(), o.options.liveSearch && (d.each(function(b) {
         a(this).hasClass("disabled") || a(this).data("index", b)
        }), e = d.index(d.filter(".active")), g = d.first().data("index"), h = d.last().data("index"), f = d.eq(e).nextAll().eq(0).data("index"), i = d.eq(e).prevAll().eq(0).data("index"), j = d.eq(f).prevAll().eq(0).data("index")), k = m.data("prevIndex"), 38 == c.keyCode ? (o.options.liveSearch && e--, e != j && e > i && (e = i), e < g && (e = g), e == k && (e = h)) : 40 == c.keyCode && (o.options.liveSearch && e++, e == -1 && (e = 0), e != j && e < f && (e = f), e > h && (e = h), e == k && (e = g)), m.data("prevIndex", e), o.options.liveSearch ? (c.preventDefault(), m.hasClass("dropdown-toggle") || (d.removeClass("active").eq(e).addClass("active").children("a").focus(), m.focus())) : d.eq(e).children("a").focus();
        else if (!m.is("input")) {
         var r, s, t = [];
         d.each(function() {
          a(this).hasClass("disabled") || a.trim(a(this).children("a").text().toLowerCase()).substring(0, 1) == q[c.keyCode] && t.push(a(this).index())
         }), r = a(document).data("keycount"), r++, a(document).data("keycount", r), s = a.trim(a(":focus").text().toLowerCase()).substring(0, 1), s != q[c.keyCode] ? (r = 1, a(document).data("keycount", r)) : r >= t.length && (a(document).data("keycount", 0), r > t.length && (r = 1)), d.eq(t[r - 1]).children("a").focus()
        }
        if ((/(13|32)/.test(c.keyCode.toString(10)) || /(^9$)/.test(c.keyCode.toString(10)) && o.options.selectOnTab) && l) {
         if (/(32)/.test(c.keyCode.toString(10)) || c.preventDefault(), o.options.liveSearch) /(32)/.test(c.keyCode.toString(10)) || (o.$menuInner.find(".active a").click(),
          m.focus());
         else {
          var u = a(":focus");
          u.click(), u.focus(), c.preventDefault(), a(document).data("spaceSelect", !0)
         }
         a(document).data("keycount", 0)
        }(/(^9$|27)/.test(c.keyCode.toString(10)) && l && (o.multiple || o.options.liveSearch) || /(27)/.test(c.keyCode.toString(10)) && !l) && (o.$menu.parent().removeClass("open"), o.options.container && o.$newElement.removeClass("open"), o.$button.focus())
       }
      },
      mobile: function() {
       this.$element.addClass("mobile-device")
      },
      refresh: function() {
       this.$lis = null, this.liObj = {}, this.reloadLi(), this.render(), this.checkDisabled(), this.liHeight(!0), this.setStyle(), this.setWidth(), this.$lis && this.$searchbox.trigger("propertychange"), this.$element.trigger("refreshed.bs.select")
      },
      hide: function() {
       this.$newElement.hide()
      },
      show: function() {
       this.$newElement.show()
      },
      remove: function() {
       this.$newElement.remove(), this.$element.remove()
      },
      destroy: function() {
       this.$newElement.before(this.$element).remove(), this.$bsContainer ? this.$bsContainer.remove() : this.$menu.remove(), this.$element.off(".bs.select").removeData("selectpicker").removeClass("bs-select-hidden selectpicker")
      }
     };
     var l = a.fn.selectpicker;
     a.fn.selectpicker = c, a.fn.selectpicker.Constructor = k, a.fn.selectpicker.noConflict = function() {
      return a.fn.selectpicker = l, this
     }, a(document).data("keycount", 0).on("keydown.bs.select", '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="listbox"], .bs-searchbox input', k.prototype.keydown).on("focusin.modal", '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="listbox"], .bs-searchbox input', function(a) {
      a.stopPropagation()
     }), a(window).on("load.bs.select.data-api", function() {
      a(".selectpicker").each(function() {
       var b = a(this);
       c.call(b, b.data())
      })
     })
    }(a)
   });
   //# sourceMappingURL=bootstrap-select.js.map
   
   
   /*
    * countup js
    */
   ! function(a, t) {
    "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t(require, exports, module) : a.CountUp = t()
   }(this, function(a, t, n) {
    var e = function(a, t, n, e, i, r) {
     for (var o = 0, s = ["webkit", "moz", "ms", "o"], m = 0; m < s.length && !window.requestAnimationFrame; ++m) window.requestAnimationFrame = window[s[m] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[s[m] + "CancelAnimationFrame"] || window[s[m] + "CancelRequestAnimationFrame"];
     window.requestAnimationFrame || (window.requestAnimationFrame = function(a, t) {
      var n = (new Date).getTime(),
       e = Math.max(0, 16 - (n - o)),
       i = window.setTimeout(function() {
        a(n + e)
       }, e);
      return o = n + e, i
     }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) {
      clearTimeout(a)
     });
     var u = this;
     u.options = {
      useEasing: !0,
      useGrouping: !0,
      separator: ",",
      decimal: ".",
      easingFn: null,
      formattingFn: null
     };
     for (var l in r) r.hasOwnProperty(l) && (u.options[l] = r[l]);
     "" === u.options.separator && (u.options.useGrouping = !1), u.options.prefix || (u.options.prefix = ""), u.options.suffix || (u.options.suffix = ""), u.d = "string" == typeof a ? document.getElementById(a) : a, u.startVal = Number(t), u.endVal = Number(n), u.countDown = u.startVal > u.endVal, u.frameVal = u.startVal, u.decimals = Math.max(0, e || 0), u.dec = Math.pow(10, u.decimals), u.duration = 1e3 * Number(i) || 2e3, u.formatNumber = function(a) {
      a = a.toFixed(u.decimals), a += "";
      var t, n, e, i;
      if (t = a.split("."), n = t[0], e = t.length > 1 ? u.options.decimal + t[1] : "", i = /(\d+)(\d{3})/, u.options.useGrouping)
       for (; i.test(n);) n = n.replace(i, "$1" + u.options.separator + "$2");
      return u.options.prefix + n + e + u.options.suffix
     }, u.easeOutExpo = function(a, t, n, e) {
      return n * (-Math.pow(2, -10 * a / e) + 1) * 1024 / 1023 + t
     }, u.easingFn = u.options.easingFn ? u.options.easingFn : u.easeOutExpo, u.formattingFn = u.options.formattingFn ? u.options.formattingFn : u.formatNumber, u.version = function() {
      return "1.7.1"
     }, u.printValue = function(a) {
      var t = u.formattingFn(a);
      "INPUT" === u.d.tagName ? this.d.value = t : "text" === u.d.tagName || "tspan" === u.d.tagName ? this.d.textContent = t : this.d.innerHTML = t
     }, u.count = function(a) {
      u.startTime || (u.startTime = a), u.timestamp = a;
      var t = a - u.startTime;
      u.remaining = u.duration - t, u.options.useEasing ? u.countDown ? u.frameVal = u.startVal - u.easingFn(t, 0, u.startVal - u.endVal, u.duration) : u.frameVal = u.easingFn(t, u.startVal, u.endVal - u.startVal, u.duration) : u.countDown ? u.frameVal = u.startVal - (u.startVal - u.endVal) * (t / u.duration) : u.frameVal = u.startVal + (u.endVal - u.startVal) * (t / u.duration), u.countDown ? u.frameVal = u.frameVal < u.endVal ? u.endVal : u.frameVal : u.frameVal = u.frameVal > u.endVal ? u.endVal : u.frameVal, u.frameVal = Math.round(u.frameVal * u.dec) / u.dec, u.printValue(u.frameVal), t < u.duration ? u.rAF = requestAnimationFrame(u.count) : u.callback && u.callback()
     }, u.start = function(a) {
      return u.callback = a, u.rAF = requestAnimationFrame(u.count), !1
     }, u.pauseResume = function() {
      u.paused ? (u.paused = !1, delete u.startTime, u.duration = u.remaining, u.startVal = u.frameVal, requestAnimationFrame(u.count)) : (u.paused = !0, cancelAnimationFrame(u.rAF))
     }, u.reset = function() {
      u.paused = !1, delete u.startTime, u.startVal = t, cancelAnimationFrame(u.rAF), u.printValue(u.startVal)
     }, u.update = function(a) {
      cancelAnimationFrame(u.rAF), u.paused = !1, delete u.startTime, u.startVal = u.frameVal, u.endVal = Number(a), u.countDown = u.startVal > u.endVal, u.rAF = requestAnimationFrame(u.count)
     }, u.printValue(u.startVal)
    };
    return e
   });
   
   
   /**
    * jquery knob
    * Version: 1.2.11
    * Requires: jQuery v1.7+
    *
    */
   (function(e) {
    if (typeof define === "function" && define.amd) {
     define(["jquery"], e)
    } else {
     e(jQuery)
    }
   })(function(e) {
    "use strict";
    var t = {},
     n = Math.max,
     r = Math.min;
    t.c = {};
    t.c.d = e(document);
    t.c.t = function(e) {
     return e.originalEvent.touches.length - 1
    };
    t.o = function() {
     var n = this;
     this.o = null;
     this.$ = null;
     this.i = null;
     this.g = null;
     this.v = null;
     this.cv = null;
     this.x = 0;
     this.y = 0;
     this.w = 0;
     this.h = 0;
     this.$c = null;
     this.c = null;
     this.t = 0;
     this.isInit = false;
     this.fgColor = null;
     this.pColor = null;
     this.dH = null;
     this.cH = null;
     this.eH = null;
     this.rH = null;
     this.scale = 1;
     this.relative = false;
     this.relativeWidth = false;
     this.relativeHeight = false;
     this.$div = null;
     this.run = function() {
      var t = function(e, t) {
       var r;
       for (r in t) {
        n.o[r] = t[r]
       }
       n._carve().init();
       n._configure()._draw()
      };
      if (this.$.data("kontroled")) return;
      this.$.data("kontroled", true);
      this.extend();
      this.o = e.extend({
       min: this.$.data("min") !== undefined ? this.$.data("min") : 0,
       max: this.$.data("max") !== undefined ? this.$.data("max") : 100,
       stopper: true,
       readOnly: this.$.data("readonly") || this.$.attr("readonly") === "readonly",
       cursor: this.$.data("cursor") === true && 30 || this.$.data("cursor") || 0,
       thickness: this.$.data("thickness") && Math.max(Math.min(this.$.data("thickness"), 1), .01) || .35,
       lineCap: this.$.data("linecap") || "butt",
       width: this.$.data("width") || 200,
       height: this.$.data("height") || 200,
       displayInput: this.$.data("displayinput") == null || this.$.data("displayinput"),
       displayPrevious: this.$.data("displayprevious"),
       fgColor: this.$.data("fgcolor") || "#87CEEB",
       inputColor: this.$.data("inputcolor"),
       font: this.$.data("font") || "Arial",
       fontWeight: this.$.data("font-weight") || "bold",
       inline: false,
       step: this.$.data("step") || 1,
       rotation: this.$.data("rotation"),
       draw: null,
       change: null,
       cancel: null,
       release: null,
       format: function(e) {
        return e
       },
       parse: function(e) {
        return parseFloat(e)
       }
      }, this.o);
      this.o.flip = this.o.rotation === "anticlockwise" || this.o.rotation === "acw";
      if (!this.o.inputColor) {
       this.o.inputColor = this.o.fgColor
      }
      if (this.$.is("fieldset")) {
       this.v = {};
       this.i = this.$.find("input");
       this.i.each(function(t) {
        var r = e(this);
        n.i[t] = r;
        n.v[t] = n.o.parse(r.val());
        r.bind("change blur", function() {
         var e = {};
         e[t] = r.val();
         n.val(n._validate(e))
        })
       });
       this.$.find("legend").remove()
      } else {
       this.i = this.$;
       this.v = this.o.parse(this.$.val());
       this.v === "" && (this.v = this.o.min);
       this.$.bind("change blur", function() {
        n.val(n._validate(n.o.parse(n.$.val())))
       })
      }!this.o.displayInput && this.$.hide();
      this.$c = e(document.createElement("canvas")).attr({
       width: this.o.width,
       height: this.o.height
      });
      this.$div = e('<div style="' + (this.o.inline ? "display:inline;" : "") + "width:" + this.o.width + "px;height:" + this.o.height + "px;" + '"></div>');
      this.$.wrap(this.$div).before(this.$c);
      this.$div = this.$.parent();
      if (typeof G_vmlCanvasManager !== "undefined") {
       G_vmlCanvasManager.initElement(this.$c[0])
      }
      this.c = this.$c[0].getContext ? this.$c[0].getContext("2d") : null;
      if (!this.c) {
       throw {
        name: "CanvasNotSupportedException",
        message: "Canvas not supported. Please use excanvas on IE8.0.",
        toString: function() {
         return this.name + ": " + this.message
        }
       }
      }
      this.scale = (window.devicePixelRatio || 1) / (this.c.webkitBackingStorePixelRatio || this.c.mozBackingStorePixelRatio || this.c.msBackingStorePixelRatio || this.c.oBackingStorePixelRatio || this.c.backingStorePixelRatio || 1);
      this.relativeWidth = this.o.width % 1 !== 0 && this.o.width.indexOf("%");
      this.relativeHeight = this.o.height % 1 !== 0 && this.o.height.indexOf("%");
      this.relative = this.relativeWidth || this.relativeHeight;
      this._carve();
      if (this.v instanceof Object) {
       this.cv = {};
       this.copy(this.v, this.cv)
      } else {
       this.cv = this.v
      }
      this.$.bind("configure", t).parent().bind("configure", t);
      this._listen()._configure()._xy().init();
      this.isInit = true;
      this.$.val(this.o.format(this.v));
      this._draw();
      return this
     };
     this._carve = function() {
      if (this.relative) {
       var e = this.relativeWidth ? this.$div.parent().width() * parseInt(this.o.width) / 100 : this.$div.parent().width(),
        t = this.relativeHeight ? this.$div.parent().height() * parseInt(this.o.height) / 100 : this.$div.parent().height();
       this.w = this.h = Math.min(e, t)
      } else {
       this.w = this.o.width;
       this.h = this.o.height
      }
      this.$div.css({
       width: this.w + "px",
       height: this.h + "px"
      });
      this.$c.attr({
       width: this.w,
       height: this.h
      });
      if (this.scale !== 1) {
       this.$c[0].width = this.$c[0].width * this.scale;
       this.$c[0].height = this.$c[0].height * this.scale;
       this.$c.width(this.w);
       this.$c.height(this.h)
      }
      return this
     };
     this._draw = function() {
      var e = true;
      n.g = n.c;
      n.clear();
      n.dH && (e = n.dH());
      e !== false && n.draw()
     };
     this._touch = function(e) {
      var r = function(e) {
       var t = n.xy2val(e.originalEvent.touches[n.t].pageX, e.originalEvent.touches[n.t].pageY);
       if (t == n.cv) return;
       if (n.cH && n.cH(t) === false) return;
       n.change(n._validate(t));
       n._draw()
      };
      this.t = t.c.t(e);
      r(e);
      t.c.d.bind("touchmove.k", r).bind("touchend.k", function() {
       t.c.d.unbind("touchmove.k touchend.k");
       n.val(n.cv)
      });
      return this
     };
     this._mouse = function(e) {
      var r = function(e) {
       var t = n.xy2val(e.pageX, e.pageY);
       if (t == n.cv) return;
       if (n.cH && n.cH(t) === false) return;
       n.change(n._validate(t));
       n._draw()
      };
      r(e);
      t.c.d.bind("mousemove.k", r).bind("keyup.k", function(e) {
       if (e.keyCode === 27) {
        t.c.d.unbind("mouseup.k mousemove.k keyup.k");
        if (n.eH && n.eH() === false) return;
        n.cancel()
       }
      }).bind("mouseup.k", function(e) {
       t.c.d.unbind("mousemove.k mouseup.k keyup.k");
       n.val(n.cv)
      });
      return this
     };
     this._xy = function() {
      var e = this.$c.offset();
      this.x = e.left;
      this.y = e.top;
      return this
     };
     this._listen = function() {
      if (!this.o.readOnly) {
       this.$c.bind("mousedown", function(e) {
        e.preventDefault();
        n._xy()._mouse(e)
       }).bind("touchstart", function(e) {
        e.preventDefault();
        n._xy()._touch(e)
       });
       this.listen()
      } else {
       this.$.attr("readonly", "readonly")
      }
      if (this.relative) {
       e(window).resize(function() {
        n._carve().init();
        n._draw()
       })
      }
      return this
     };
     this._configure = function() {
      if (this.o.draw) this.dH = this.o.draw;
      if (this.o.change) this.cH = this.o.change;
      if (this.o.cancel) this.eH = this.o.cancel;
      if (this.o.release) this.rH = this.o.release;
      if (this.o.displayPrevious) {
       this.pColor = this.h2rgba(this.o.fgColor, "0.4");
       this.fgColor = this.h2rgba(this.o.fgColor, "0.6")
      } else {
       this.fgColor = this.o.fgColor
      }
      return this
     };
     this._clear = function() {
      this.$c[0].width = this.$c[0].width
     };
     this._validate = function(e) {
      var t = ~~((e < 0 ? -.5 : .5) + e / this.o.step) * this.o.step;
      return Math.round(t * 100) / 100
     };
     this.listen = function() {};
     this.extend = function() {};
     this.init = function() {};
     this.change = function(e) {};
     this.val = function(e) {};
     this.xy2val = function(e, t) {};
     this.draw = function() {};
     this.clear = function() {
      this._clear()
     };
     this.h2rgba = function(e, t) {
      var n;
      e = e.substring(1, 7);
      n = [parseInt(e.substring(0, 2), 16), parseInt(e.substring(2, 4), 16), parseInt(e.substring(4, 6), 16)];
      return "rgba(" + n[0] + "," + n[1] + "," + n[2] + "," + t + ")"
     };
     this.copy = function(e, t) {
      for (var n in e) {
       t[n] = e[n]
      }
     }
    };
    t.Dial = function() {
     t.o.call(this);
     this.startAngle = null;
     this.xy = null;
     this.radius = null;
     this.lineWidth = null;
     this.cursorExt = null;
     this.w2 = null;
     this.PI2 = 2 * Math.PI;
     this.extend = function() {
      this.o = e.extend({
       bgColor: this.$.data("bgcolor") || "#EEEEEE",
       angleOffset: this.$.data("angleoffset") || 0,
       angleArc: this.$.data("anglearc") || 360,
       inline: true
      }, this.o)
     };
     this.val = function(e, t) {
      if (null != e) {
       e = this.o.parse(e);
       if (t !== false && e != this.v && this.rH && this.rH(e) === false) {
        return
       }
       this.cv = this.o.stopper ? n(r(e, this.o.max), this.o.min) : e;
       this.v = this.cv;
       this.$.val(this.o.format(this.v));
       this._draw()
      } else {
       return this.v
      }
     };
     this.xy2val = function(e, t) {
      var i, s;
      i = Math.atan2(e - (this.x + this.w2), -(t - this.y - this.w2)) - this.angleOffset;
      if (this.o.flip) {
       i = this.angleArc - i - this.PI2
      }
      if (this.angleArc != this.PI2 && i < 0 && i > -.5) {
       i = 0
      } else if (i < 0) {
       i += this.PI2
      }
      s = i * (this.o.max - this.o.min) / this.angleArc + this.o.min;
      this.o.stopper && (s = n(r(s, this.o.max), this.o.min));
      return s
     };
     this.listen = function() {
      var t = this,
       i, s, o = function(e) {
        e.preventDefault();
        var o = e.originalEvent,
         u = o.detail || o.wheelDeltaX,
         a = o.detail || o.wheelDeltaY,
         f = t._validate(t.o.parse(t.$.val())) + (u > 0 || a > 0 ? t.o.step : u < 0 || a < 0 ? -t.o.step : 0);
        f = n(r(f, t.o.max), t.o.min);
        t.val(f, false);
        if (t.rH) {
         clearTimeout(i);
         i = setTimeout(function() {
          t.rH(f);
          i = null
         }, 100);
         if (!s) {
          s = setTimeout(function() {
           if (i) t.rH(f);
           s = null
          }, 200)
         }
        }
       },
       u, a, f = 1,
       l = {
        37: -t.o.step,
        38: t.o.step,
        39: t.o.step,
        40: -t.o.step
       };
      this.$.bind("keydown", function(i) {
       var s = i.keyCode;
       if (s >= 96 && s <= 105) {
        s = i.keyCode = s - 48
       }
       u = parseInt(String.fromCharCode(s));
       if (isNaN(u)) {
        s !== 13 && s !== 8 && s !== 9 && s !== 189 && (s !== 190 || t.$.val().match(/\./)) && i.preventDefault();
        if (e.inArray(s, [37, 38, 39, 40]) > -1) {
         i.preventDefault();
         var o = t.o.parse(t.$.val()) + l[s] * f;
         t.o.stopper && (o = n(r(o, t.o.max), t.o.min));
         t.change(t._validate(o));
         t._draw();
         a = window.setTimeout(function() {
          f *= 2
         }, 30)
        }
       }
      }).bind("keyup", function(e) {
       if (isNaN(u)) {
        if (a) {
         window.clearTimeout(a);
         a = null;
         f = 1;
         t.val(t.$.val())
        }
       } else {
        t.$.val() > t.o.max && t.$.val(t.o.max) || t.$.val() < t.o.min && t.$.val(t.o.min)
       }
      });
      this.$c.bind("mousewheel DOMMouseScroll", o);
      this.$.bind("mousewheel DOMMouseScroll", o)
     };
     this.init = function() {
      if (this.v < this.o.min || this.v > this.o.max) {
       this.v = this.o.min
      }
      this.$.val(this.v);
      this.w2 = this.w / 2;
      this.cursorExt = this.o.cursor / 100;
      this.xy = this.w2 * this.scale;
      this.lineWidth = this.xy * this.o.thickness;
      this.lineCap = this.o.lineCap;
      this.radius = this.xy - this.lineWidth / 2;
      this.o.angleOffset && (this.o.angleOffset = isNaN(this.o.angleOffset) ? 0 : this.o.angleOffset);
      this.o.angleArc && (this.o.angleArc = isNaN(this.o.angleArc) ? this.PI2 : this.o.angleArc);
      this.angleOffset = this.o.angleOffset * Math.PI / 180;
      this.angleArc = this.o.angleArc * Math.PI / 180;
      this.startAngle = 1.5 * Math.PI + this.angleOffset;
      this.endAngle = 1.5 * Math.PI + this.angleOffset + this.angleArc;
      var e = n(String(Math.abs(this.o.max)).length, String(Math.abs(this.o.min)).length, 2) + 2;
      this.o.displayInput && this.i.css({
       width: (this.w / 2 + 4 >> 0) + "px",
       height: (this.w / 3 >> 0) + "px",
       position: "absolute",
       "vertical-align": "middle",
       "margin-top": (this.w / 3 >> 0) + "px",
       "margin-left": "-" + (this.w * 3 / 4 + 2 >> 0) + "px",
       border: 0,
       background: "none",
       font: this.o.fontWeight + " " + (this.w / e >> 0) + "px " + this.o.font,
       "text-align": "center",
       color: this.o.inputColor || this.o.fgColor,
       padding: "0px",
       "-webkit-appearance": "none"
      }) || this.i.css({
       width: "0px",
       visibility: "hidden"
      })
     };
     this.change = function(e) {
      this.cv = e;
      this.$.val(this.o.format(e))
     };
     this.angle = function(e) {
      return (e - this.o.min) * this.angleArc / (this.o.max - this.o.min)
     };
     this.arc = function(e) {
      var t, n;
      e = this.angle(e);
      if (this.o.flip) {
       t = this.endAngle + 1e-5;
       n = t - e - 1e-5
      } else {
       t = this.startAngle - 1e-5;
       n = t + e + 1e-5
      }
      this.o.cursor && (t = n - this.cursorExt) && (n = n + this.cursorExt);
      return {
       s: t,
       e: n,
       d: this.o.flip && !this.o.cursor
      }
     };
     this.draw = function() {
      var e = this.g,
       t = this.arc(this.cv),
       n, r = 1;
      e.lineWidth = this.lineWidth;
      e.lineCap = this.lineCap;
      if (this.o.bgColor !== "none") {
       e.beginPath();
       e.strokeStyle = this.o.bgColor;
       e.arc(this.xy, this.xy, this.radius, this.endAngle - 1e-5, this.startAngle + 1e-5, true);
       e.stroke()
      }
      if (this.o.displayPrevious) {
       n = this.arc(this.v);
       e.beginPath();
       e.strokeStyle = this.pColor;
       e.arc(this.xy, this.xy, this.radius, n.s, n.e, n.d);
       e.stroke();
       r = this.cv == this.v
      }
      e.beginPath();
      e.strokeStyle = r ? this.o.fgColor : this.fgColor;
      e.arc(this.xy, this.xy, this.radius, t.s, t.e, t.d);
      e.stroke()
     };
     this.cancel = function() {
      this.val(this.v)
     }
    };
    e.fn.dial = e.fn.knob = function(n) {
     return this.each(function() {
      var r = new t.Dial;
      r.o = n;
      r.$ = e(this);
      r.run()
     }).parent()
    }
   });
   
   
   /*!
    * Chart.js
    * Version: 2.4.0
    * Released under the MIT license
    * https://github.com/chartjs/Chart.js/blob/master/LICENSE.md
    */
   ! function(t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
     var e;
     e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.Chart = t()
    }
   }(function() {
    return function t(e, a, i) {
     function n(r, l) {
      if (!a[r]) {
       if (!e[r]) {
        var s = "function" == typeof require && require;
        if (!l && s) return s(r, !0);
        if (o) return o(r, !0);
        var d = new Error("Cannot find module '" + r + "'");
        throw d.code = "MODULE_NOT_FOUND", d
       }
       var u = a[r] = {
        exports: {}
       };
       e[r][0].call(u.exports, function(t) {
        var a = e[r][1][t];
        return n(a ? a : t)
       }, u, u.exports, t, e, a, i)
      }
      return a[r].exports
     }
     for (var o = "function" == typeof require && require, r = 0; r < i.length; r++) n(i[r]);
     return n
    }({
     1: [function(t, e, a) {}, {}],
     2: [function(t, e, a) {
      function i(t) {
       if (t) {
        var e = /^#([a-fA-F0-9]{3})$/,
         a = /^#([a-fA-F0-9]{6})$/,
         i = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
         n = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
         o = /(\w+)/,
         r = [0, 0, 0],
         l = 1,
         s = t.match(e);
        if (s) {
         s = s[1];
         for (var d = 0; d < r.length; d++) r[d] = parseInt(s[d] + s[d], 16)
        } else if (s = t.match(a)) {
         s = s[1];
         for (var d = 0; d < r.length; d++) r[d] = parseInt(s.slice(2 * d, 2 * d + 2), 16)
        } else if (s = t.match(i)) {
         for (var d = 0; d < r.length; d++) r[d] = parseInt(s[d + 1]);
         l = parseFloat(s[4])
        } else if (s = t.match(n)) {
         for (var d = 0; d < r.length; d++) r[d] = Math.round(2.55 * parseFloat(s[d + 1]));
         l = parseFloat(s[4])
        } else if (s = t.match(o)) {
         if ("transparent" == s[1]) return [0, 0, 0, 0];
         if (r = y[s[1]], !r) return
        }
        for (var d = 0; d < r.length; d++) r[d] = v(r[d], 0, 255);
        return l = l || 0 == l ? v(l, 0, 1) : 1, r[3] = l, r
       }
      }
   
      function n(t) {
       if (t) {
        var e = /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,
         a = t.match(e);
        if (a) {
         var i = parseFloat(a[4]),
          n = v(parseInt(a[1]), 0, 360),
          o = v(parseFloat(a[2]), 0, 100),
          r = v(parseFloat(a[3]), 0, 100),
          l = v(isNaN(i) ? 1 : i, 0, 1);
         return [n, o, r, l]
        }
       }
      }
   
      function o(t) {
       if (t) {
        var e = /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/,
         a = t.match(e);
        if (a) {
         var i = parseFloat(a[4]),
          n = v(parseInt(a[1]), 0, 360),
          o = v(parseFloat(a[2]), 0, 100),
          r = v(parseFloat(a[3]), 0, 100),
          l = v(isNaN(i) ? 1 : i, 0, 1);
         return [n, o, r, l]
        }
       }
      }
   
      function r(t) {
       var e = i(t);
       return e && e.slice(0, 3)
      }
   
      function l(t) {
       var e = n(t);
       return e && e.slice(0, 3)
      }
   
      function s(t) {
       var e = i(t);
       return e ? e[3] : (e = n(t)) ? e[3] : (e = o(t)) ? e[3] : void 0
      }
   
      function d(t) {
       return "#" + x(t[0]) + x(t[1]) + x(t[2])
      }
   
      function u(t, e) {
       return 1 > e || t[3] && t[3] < 1 ? c(t, e) : "rgb(" + t[0] + ", " + t[1] + ", " + t[2] + ")"
      }
   
      function c(t, e) {
       return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "rgba(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + e + ")"
      }
   
      function h(t, e) {
       if (1 > e || t[3] && t[3] < 1) return f(t, e);
       var a = Math.round(t[0] / 255 * 100),
        i = Math.round(t[1] / 255 * 100),
        n = Math.round(t[2] / 255 * 100);
       return "rgb(" + a + "%, " + i + "%, " + n + "%)"
      }
   
      function f(t, e) {
       var a = Math.round(t[0] / 255 * 100),
        i = Math.round(t[1] / 255 * 100),
        n = Math.round(t[2] / 255 * 100);
       return "rgba(" + a + "%, " + i + "%, " + n + "%, " + (e || t[3] || 1) + ")"
      }
   
      function g(t, e) {
       return 1 > e || t[3] && t[3] < 1 ? p(t, e) : "hsl(" + t[0] + ", " + t[1] + "%, " + t[2] + "%)"
      }
   
      function p(t, e) {
       return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "hsla(" + t[0] + ", " + t[1] + "%, " + t[2] + "%, " + e + ")"
      }
   
      function m(t, e) {
       return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "hwb(" + t[0] + ", " + t[1] + "%, " + t[2] + "%" + (void 0 !== e && 1 !== e ? ", " + e : "") + ")"
      }
   
      function b(t) {
       return k[t.slice(0, 3)]
      }
   
      function v(t, e, a) {
       return Math.min(Math.max(e, t), a)
      }
   
      function x(t) {
       var e = t.toString(16).toUpperCase();
       return e.length < 2 ? "0" + e : e
      }
      var y = t(6);
      e.exports = {
       getRgba: i,
       getHsla: n,
       getRgb: r,
       getHsl: l,
       getHwb: o,
       getAlpha: s,
       hexString: d,
       rgbString: u,
       rgbaString: c,
       percentString: h,
       percentaString: f,
       hslString: g,
       hslaString: p,
       hwbString: m,
       keyword: b
      };
      var k = {};
      for (var S in y) k[y[S]] = S
     }, {
      6: 6
     }],
     3: [function(t, e, a) {
      var i = t(5),
       n = t(2),
       o = function(t) {
        if (t instanceof o) return t;
        if (!(this instanceof o)) return new o(t);
        this.values = {
         rgb: [0, 0, 0],
         hsl: [0, 0, 0],
         hsv: [0, 0, 0],
         hwb: [0, 0, 0],
         cmyk: [0, 0, 0, 0],
         alpha: 1
        };
        var e;
        if ("string" == typeof t)
         if (e = n.getRgba(t)) this.setValues("rgb", e);
         else if (e = n.getHsla(t)) this.setValues("hsl", e);
        else {
         if (!(e = n.getHwb(t))) throw new Error('Unable to parse color from string "' + t + '"');
         this.setValues("hwb", e)
        } else if ("object" == typeof t)
         if (e = t, void 0 !== e.r || void 0 !== e.red) this.setValues("rgb", e);
         else if (void 0 !== e.l || void 0 !== e.lightness) this.setValues("hsl", e);
        else if (void 0 !== e.v || void 0 !== e.value) this.setValues("hsv", e);
        else if (void 0 !== e.w || void 0 !== e.whiteness) this.setValues("hwb", e);
        else {
         if (void 0 === e.c && void 0 === e.cyan) throw new Error("Unable to parse color from object " + JSON.stringify(t));
         this.setValues("cmyk", e)
        }
       };
      o.prototype = {
       rgb: function() {
        return this.setSpace("rgb", arguments)
       },
       hsl: function() {
        return this.setSpace("hsl", arguments)
       },
       hsv: function() {
        return this.setSpace("hsv", arguments)
       },
       hwb: function() {
        return this.setSpace("hwb", arguments)
       },
       cmyk: function() {
        return this.setSpace("cmyk", arguments)
       },
       rgbArray: function() {
        return this.values.rgb
       },
       hslArray: function() {
        return this.values.hsl
       },
       hsvArray: function() {
        return this.values.hsv
       },
       hwbArray: function() {
        var t = this.values;
        return 1 !== t.alpha ? t.hwb.concat([t.alpha]) : t.hwb
       },
       cmykArray: function() {
        return this.values.cmyk
       },
       rgbaArray: function() {
        var t = this.values;
        return t.rgb.concat([t.alpha])
       },
       hslaArray: function() {
        var t = this.values;
        return t.hsl.concat([t.alpha])
       },
       alpha: function(t) {
        return void 0 === t ? this.values.alpha : (this.setValues("alpha", t), this)
       },
       red: function(t) {
        return this.setChannel("rgb", 0, t)
       },
       green: function(t) {
        return this.setChannel("rgb", 1, t)
       },
       blue: function(t) {
        return this.setChannel("rgb", 2, t)
       },
       hue: function(t) {
        return t && (t %= 360, t = 0 > t ? 360 + t : t), this.setChannel("hsl", 0, t)
       },
       saturation: function(t) {
        return this.setChannel("hsl", 1, t)
       },
       lightness: function(t) {
        return this.setChannel("hsl", 2, t)
       },
       saturationv: function(t) {
        return this.setChannel("hsv", 1, t)
       },
       whiteness: function(t) {
        return this.setChannel("hwb", 1, t)
       },
       blackness: function(t) {
        return this.setChannel("hwb", 2, t)
       },
       value: function(t) {
        return this.setChannel("hsv", 2, t)
       },
       cyan: function(t) {
        return this.setChannel("cmyk", 0, t)
       },
       magenta: function(t) {
        return this.setChannel("cmyk", 1, t)
       },
       yellow: function(t) {
        return this.setChannel("cmyk", 2, t)
       },
       black: function(t) {
        return this.setChannel("cmyk", 3, t)
       },
       hexString: function() {
        return n.hexString(this.values.rgb)
       },
       rgbString: function() {
        return n.rgbString(this.values.rgb, this.values.alpha)
       },
       rgbaString: function() {
        return n.rgbaString(this.values.rgb, this.values.alpha)
       },
       percentString: function() {
        return n.percentString(this.values.rgb, this.values.alpha)
       },
       hslString: function() {
        return n.hslString(this.values.hsl, this.values.alpha)
       },
       hslaString: function() {
        return n.hslaString(this.values.hsl, this.values.alpha)
       },
       hwbString: function() {
        return n.hwbString(this.values.hwb, this.values.alpha)
       },
       keyword: function() {
        return n.keyword(this.values.rgb, this.values.alpha)
       },
       rgbNumber: function() {
        var t = this.values.rgb;
        return t[0] << 16 | t[1] << 8 | t[2]
       },
       luminosity: function() {
        for (var t = this.values.rgb, e = [], a = 0; a < t.length; a++) {
         var i = t[a] / 255;
         e[a] = .03928 >= i ? i / 12.92 : Math.pow((i + .055) / 1.055, 2.4)
        }
        return .2126 * e[0] + .7152 * e[1] + .0722 * e[2]
       },
       contrast: function(t) {
        var e = this.luminosity(),
         a = t.luminosity();
        return e > a ? (e + .05) / (a + .05) : (a + .05) / (e + .05)
       },
       level: function(t) {
        var e = this.contrast(t);
        return e >= 7.1 ? "AAA" : e >= 4.5 ? "AA" : ""
       },
       dark: function() {
        var t = this.values.rgb,
         e = (299 * t[0] + 587 * t[1] + 114 * t[2]) / 1e3;
        return 128 > e
       },
       light: function() {
        return !this.dark()
       },
       negate: function() {
        for (var t = [], e = 0; 3 > e; e++) t[e] = 255 - this.values.rgb[e];
        return this.setValues("rgb", t), this
       },
       lighten: function(t) {
        var e = this.values.hsl;
        return e[2] += e[2] * t, this.setValues("hsl", e), this
       },
       darken: function(t) {
        var e = this.values.hsl;
        return e[2] -= e[2] * t, this.setValues("hsl", e), this
       },
       saturate: function(t) {
        var e = this.values.hsl;
        return e[1] += e[1] * t, this.setValues("hsl", e), this
       },
       desaturate: function(t) {
        var e = this.values.hsl;
        return e[1] -= e[1] * t, this.setValues("hsl", e), this
       },
       whiten: function(t) {
        var e = this.values.hwb;
        return e[1] += e[1] * t, this.setValues("hwb", e), this
       },
       blacken: function(t) {
        var e = this.values.hwb;
        return e[2] += e[2] * t, this.setValues("hwb", e), this
       },
       greyscale: function() {
        var t = this.values.rgb,
         e = .3 * t[0] + .59 * t[1] + .11 * t[2];
        return this.setValues("rgb", [e, e, e]), this
       },
       clearer: function(t) {
        var e = this.values.alpha;
        return this.setValues("alpha", e - e * t), this
       },
       opaquer: function(t) {
        var e = this.values.alpha;
        return this.setValues("alpha", e + e * t), this
       },
       rotate: function(t) {
        var e = this.values.hsl,
         a = (e[0] + t) % 360;
        return e[0] = 0 > a ? 360 + a : a, this.setValues("hsl", e), this
       },
       mix: function(t, e) {
        var a = this,
         i = t,
         n = void 0 === e ? .5 : e,
         o = 2 * n - 1,
         r = a.alpha() - i.alpha(),
         l = ((o * r === -1 ? o : (o + r) / (1 + o * r)) + 1) / 2,
         s = 1 - l;
        return this.rgb(l * a.red() + s * i.red(), l * a.green() + s * i.green(), l * a.blue() + s * i.blue()).alpha(a.alpha() * n + i.alpha() * (1 - n))
       },
       toJSON: function() {
        return this.rgb()
       },
       clone: function() {
        var t, e, a = new o,
         i = this.values,
         n = a.values;
        for (var r in i) i.hasOwnProperty(r) && (t = i[r], e = {}.toString.call(t), "[object Array]" === e ? n[r] = t.slice(0) : "[object Number]" === e ? n[r] = t : console.error("unexpected color value:", t));
        return a
       }
      }, o.prototype.spaces = {
       rgb: ["red", "green", "blue"],
       hsl: ["hue", "saturation", "lightness"],
       hsv: ["hue", "saturation", "value"],
       hwb: ["hue", "whiteness", "blackness"],
       cmyk: ["cyan", "magenta", "yellow", "black"]
      }, o.prototype.maxes = {
       rgb: [255, 255, 255],
       hsl: [360, 100, 100],
       hsv: [360, 100, 100],
       hwb: [360, 100, 100],
       cmyk: [100, 100, 100, 100]
      }, o.prototype.getValues = function(t) {
       for (var e = this.values, a = {}, i = 0; i < t.length; i++) a[t.charAt(i)] = e[t][i];
       return 1 !== e.alpha && (a.a = e.alpha), a
      }, o.prototype.setValues = function(t, e) {
       var a, n = this.values,
        o = this.spaces,
        r = this.maxes,
        l = 1;
       if ("alpha" === t) l = e;
       else if (e.length) n[t] = e.slice(0, t.length), l = e[t.length];
       else if (void 0 !== e[t.charAt(0)]) {
        for (a = 0; a < t.length; a++) n[t][a] = e[t.charAt(a)];
        l = e.a
       } else if (void 0 !== e[o[t][0]]) {
        var s = o[t];
        for (a = 0; a < t.length; a++) n[t][a] = e[s[a]];
        l = e.alpha
       }
       if (n.alpha = Math.max(0, Math.min(1, void 0 === l ? n.alpha : l)), "alpha" === t) return !1;
       var d;
       for (a = 0; a < t.length; a++) d = Math.max(0, Math.min(r[t][a], n[t][a])), n[t][a] = Math.round(d);
       for (var u in o) u !== t && (n[u] = i[t][u](n[t]));
       return !0
      }, o.prototype.setSpace = function(t, e) {
       var a = e[0];
       return void 0 === a ? this.getValues(t) : ("number" == typeof a && (a = Array.prototype.slice.call(e)), this.setValues(t, a), this)
      }, o.prototype.setChannel = function(t, e, a) {
       var i = this.values[t];
       return void 0 === a ? i[e] : a === i[e] ? this : (i[e] = a, this.setValues(t, i), this)
      }, "undefined" != typeof window && (window.Color = o), e.exports = o
     }, {
      2: 2,
      5: 5
     }],
     4: [function(t, e, a) {
      function i(t) {
       var e, a, i, n = t[0] / 255,
        o = t[1] / 255,
        r = t[2] / 255,
        l = Math.min(n, o, r),
        s = Math.max(n, o, r),
        d = s - l;
       return s == l ? e = 0 : n == s ? e = (o - r) / d : o == s ? e = 2 + (r - n) / d : r == s && (e = 4 + (n - o) / d), e = Math.min(60 * e, 360), 0 > e && (e += 360), i = (l + s) / 2, a = s == l ? 0 : .5 >= i ? d / (s + l) : d / (2 - s - l), [e, 100 * a, 100 * i]
      }
   
      function n(t) {
       var e, a, i, n = t[0],
        o = t[1],
        r = t[2],
        l = Math.min(n, o, r),
        s = Math.max(n, o, r),
        d = s - l;
       return a = 0 == s ? 0 : d / s * 1e3 / 10, s == l ? e = 0 : n == s ? e = (o - r) / d : o == s ? e = 2 + (r - n) / d : r == s && (e = 4 + (n - o) / d), e = Math.min(60 * e, 360), 0 > e && (e += 360), i = s / 255 * 1e3 / 10, [e, a, i]
      }
   
      function o(t) {
       var e = t[0],
        a = t[1],
        n = t[2],
        o = i(t)[0],
        r = 1 / 255 * Math.min(e, Math.min(a, n)),
        n = 1 - 1 / 255 * Math.max(e, Math.max(a, n));
       return [o, 100 * r, 100 * n]
      }
   
      function l(t) {
       var e, a, i, n, o = t[0] / 255,
        r = t[1] / 255,
        l = t[2] / 255;
       return n = Math.min(1 - o, 1 - r, 1 - l), e = (1 - o - n) / (1 - n) || 0, a = (1 - r - n) / (1 - n) || 0, i = (1 - l - n) / (1 - n) || 0, [100 * e, 100 * a, 100 * i, 100 * n]
      }
   
      function s(t) {
       return G[JSON.stringify(t)]
      }
   
      function d(t) {
       var e = t[0] / 255,
        a = t[1] / 255,
        i = t[2] / 255;
       e = e > .04045 ? Math.pow((e + .055) / 1.055, 2.4) : e / 12.92, a = a > .04045 ? Math.pow((a + .055) / 1.055, 2.4) : a / 12.92, i = i > .04045 ? Math.pow((i + .055) / 1.055, 2.4) : i / 12.92;
       var n = .4124 * e + .3576 * a + .1805 * i,
        o = .2126 * e + .7152 * a + .0722 * i,
        r = .0193 * e + .1192 * a + .9505 * i;
       return [100 * n, 100 * o, 100 * r]
      }
   
      function u(t) {
       var e, a, i, n = d(t),
        o = n[0],
        r = n[1],
        l = n[2];
       return o /= 95.047, r /= 100, l /= 108.883, o = o > .008856 ? Math.pow(o, 1 / 3) : 7.787 * o + 16 / 116, r = r > .008856 ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116, l = l > .008856 ? Math.pow(l, 1 / 3) : 7.787 * l + 16 / 116, e = 116 * r - 16, a = 500 * (o - r), i = 200 * (r - l), [e, a, i]
      }
   
      function c(t) {
       return W(u(t))
      }
   
      function h(t) {
       var e, a, i, n, o, r = t[0] / 360,
        l = t[1] / 100,
        s = t[2] / 100;
       if (0 == l) return o = 255 * s, [o, o, o];
       a = .5 > s ? s * (1 + l) : s + l - s * l, e = 2 * s - a, n = [0, 0, 0];
       for (var d = 0; 3 > d; d++) i = r + 1 / 3 * -(d - 1), 0 > i && i++, i > 1 && i--, o = 1 > 6 * i ? e + 6 * (a - e) * i : 1 > 2 * i ? a : 2 > 3 * i ? e + (a - e) * (2 / 3 - i) * 6 : e, n[d] = 255 * o;
       return n
      }
   
      function f(t) {
       var e, a, i = t[0],
        n = t[1] / 100,
        o = t[2] / 100;
       return 0 === o ? [0, 0, 0] : (o *= 2, n *= 1 >= o ? o : 2 - o, a = (o + n) / 2, e = 2 * n / (o + n), [i, 100 * e, 100 * a])
      }
   
      function p(t) {
       return o(h(t))
      }
   
      function m(t) {
       return l(h(t))
      }
   
      function v(t) {
       return s(h(t))
      }
   
      function x(t) {
       var e = t[0] / 60,
        a = t[1] / 100,
        i = t[2] / 100,
        n = Math.floor(e) % 6,
        o = e - Math.floor(e),
        r = 255 * i * (1 - a),
        l = 255 * i * (1 - a * o),
        s = 255 * i * (1 - a * (1 - o)),
        i = 255 * i;
       switch (n) {
        case 0:
         return [i, s, r];
        case 1:
         return [l, i, r];
        case 2:
         return [r, i, s];
        case 3:
         return [r, l, i];
        case 4:
         return [s, r, i];
        case 5:
         return [i, r, l]
       }
      }
   
      function y(t) {
       var e, a, i = t[0],
        n = t[1] / 100,
        o = t[2] / 100;
       return a = (2 - n) * o, e = n * o, e /= 1 >= a ? a : 2 - a, e = e || 0, a /= 2, [i, 100 * e, 100 * a]
      }
   
      function k(t) {
       return o(x(t))
      }
   
      function S(t) {
       return l(x(t))
      }
   
      function w(t) {
       return s(x(t))
      }
   
      function M(t) {
       var e, a, i, n, o = t[0] / 360,
        l = t[1] / 100,
        s = t[2] / 100,
        d = l + s;
       switch (d > 1 && (l /= d, s /= d), e = Math.floor(6 * o), a = 1 - s, i = 6 * o - e, 0 != (1 & e) && (i = 1 - i), n = l + i * (a - l), e) {
        default:
        case 6:
        case 0:
         r = a, g = n, b = l;
         break;
        case 1:
         r = n, g = a, b = l;
         break;
        case 2:
         r = l, g = a, b = n;
         break;
        case 3:
         r = l, g = n, b = a;
         break;
        case 4:
         r = n, g = l, b = a;
         break;
        case 5:
         r = a, g = l, b = n
       }
       return [255 * r, 255 * g, 255 * b]
      }
   
      function C(t) {
       return i(M(t))
      }
   
      function D(t) {
       return n(M(t))
      }
   
      function I(t) {
       return l(M(t))
      }
   
      function A(t) {
       return s(M(t))
      }
   
      function T(t) {
       var e, a, i, n = t[0] / 100,
        o = t[1] / 100,
        r = t[2] / 100,
        l = t[3] / 100;
       return e = 1 - Math.min(1, n * (1 - l) + l), a = 1 - Math.min(1, o * (1 - l) + l), i = 1 - Math.min(1, r * (1 - l) + l), [255 * e, 255 * a, 255 * i]
      }
   
      function P(t) {
       return i(T(t))
      }
   
      function F(t) {
       return n(T(t))
      }
   
      function _(t) {
       return o(T(t))
      }
   
      function R(t) {
       return s(T(t))
      }
   
      function V(t) {
       var e, a, i, n = t[0] / 100,
        o = t[1] / 100,
        r = t[2] / 100;
       return e = 3.2406 * n + -1.5372 * o + r * -.4986, a = n * -.9689 + 1.8758 * o + .0415 * r, i = .0557 * n + o * -.204 + 1.057 * r, e = e > .0031308 ? 1.055 * Math.pow(e, 1 / 2.4) - .055 : e = 12.92 * e, a = a > .0031308 ? 1.055 * Math.pow(a, 1 / 2.4) - .055 : a = 12.92 * a, i = i > .0031308 ? 1.055 * Math.pow(i, 1 / 2.4) - .055 : i = 12.92 * i, e = Math.min(Math.max(0, e), 1), a = Math.min(Math.max(0, a), 1), i = Math.min(Math.max(0, i), 1), [255 * e, 255 * a, 255 * i]
      }
   
      function L(t) {
       var e, a, i, n = t[0],
        o = t[1],
        r = t[2];
       return n /= 95.047, o /= 100, r /= 108.883, n = n > .008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116, o = o > .008856 ? Math.pow(o, 1 / 3) : 7.787 * o + 16 / 116, r = r > .008856 ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116, e = 116 * o - 16, a = 500 * (n - o), i = 200 * (o - r), [e, a, i]
      }
   
      function O(t) {
       return W(L(t))
      }
   
      function B(t) {
       var e, a, i, n, o = t[0],
        r = t[1],
        l = t[2];
       return 8 >= o ? (a = 100 * o / 903.3, n = 7.787 * (a / 100) + 16 / 116) : (a = 100 * Math.pow((o + 16) / 116, 3), n = Math.pow(a / 100, 1 / 3)), e = .008856 >= e / 95.047 ? e = 95.047 * (r / 500 + n - 16 / 116) / 7.787 : 95.047 * Math.pow(r / 500 + n, 3), i = .008859 >= i / 108.883 ? i = 108.883 * (n - l / 200 - 16 / 116) / 7.787 : 108.883 * Math.pow(n - l / 200, 3), [e, a, i]
      }
   
      function W(t) {
       var e, a, i, n = t[0],
        o = t[1],
        r = t[2];
       return e = Math.atan2(r, o), a = 360 * e / 2 / Math.PI, 0 > a && (a += 360), i = Math.sqrt(o * o + r * r), [n, i, a]
      }
   
      function z(t) {
       return V(B(t))
      }
   
      function N(t) {
       var e, a, i, n = t[0],
        o = t[1],
        r = t[2];
       return i = r / 360 * 2 * Math.PI, e = o * Math.cos(i), a = o * Math.sin(i), [n, e, a]
      }
   
      function E(t) {
       return B(N(t))
      }
   
      function H(t) {
       return z(N(t))
      }
   
      function U(t) {
       return Z[t]
      }
   
      function j(t) {
       return i(U(t))
      }
   
      function q(t) {
       return n(U(t))
      }
   
      function Y(t) {
       return o(U(t))
      }
   
      function X(t) {
       return l(U(t))
      }
   
      function K(t) {
       return u(U(t))
      }
   
      function J(t) {
       return d(U(t))
      }
      e.exports = {
       rgb2hsl: i,
       rgb2hsv: n,
       rgb2hwb: o,
       rgb2cmyk: l,
       rgb2keyword: s,
       rgb2xyz: d,
       rgb2lab: u,
       rgb2lch: c,
       hsl2rgb: h,
       hsl2hsv: f,
       hsl2hwb: p,
       hsl2cmyk: m,
       hsl2keyword: v,
       hsv2rgb: x,
       hsv2hsl: y,
       hsv2hwb: k,
       hsv2cmyk: S,
       hsv2keyword: w,
       hwb2rgb: M,
       hwb2hsl: C,
       hwb2hsv: D,
       hwb2cmyk: I,
       hwb2keyword: A,
       cmyk2rgb: T,
       cmyk2hsl: P,
       cmyk2hsv: F,
       cmyk2hwb: _,
       cmyk2keyword: R,
       keyword2rgb: U,
       keyword2hsl: j,
       keyword2hsv: q,
       keyword2hwb: Y,
       keyword2cmyk: X,
       keyword2lab: K,
       keyword2xyz: J,
       xyz2rgb: V,
       xyz2lab: L,
       xyz2lch: O,
       lab2xyz: B,
       lab2rgb: z,
       lab2lch: W,
       lch2lab: N,
       lch2xyz: E,
       lch2rgb: H
      };
      var Z = {
        aliceblue: [240, 248, 255],
        antiquewhite: [250, 235, 215],
        aqua: [0, 255, 255],
        aquamarine: [127, 255, 212],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        bisque: [255, 228, 196],
        black: [0, 0, 0],
        blanchedalmond: [255, 235, 205],
        blue: [0, 0, 255],
        blueviolet: [138, 43, 226],
        brown: [165, 42, 42],
        burlywood: [222, 184, 135],
        cadetblue: [95, 158, 160],
        chartreuse: [127, 255, 0],
        chocolate: [210, 105, 30],
        coral: [255, 127, 80],
        cornflowerblue: [100, 149, 237],
        cornsilk: [255, 248, 220],
        crimson: [220, 20, 60],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgoldenrod: [184, 134, 11],
        darkgray: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkgrey: [169, 169, 169],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkseagreen: [143, 188, 143],
        darkslateblue: [72, 61, 139],
        darkslategray: [47, 79, 79],
        darkslategrey: [47, 79, 79],
        darkturquoise: [0, 206, 209],
        darkviolet: [148, 0, 211],
        deeppink: [255, 20, 147],
        deepskyblue: [0, 191, 255],
        dimgray: [105, 105, 105],
        dimgrey: [105, 105, 105],
        dodgerblue: [30, 144, 255],
        firebrick: [178, 34, 34],
        floralwhite: [255, 250, 240],
        forestgreen: [34, 139, 34],
        fuchsia: [255, 0, 255],
        gainsboro: [220, 220, 220],
        ghostwhite: [248, 248, 255],
        gold: [255, 215, 0],
        goldenrod: [218, 165, 32],
        gray: [128, 128, 128],
        green: [0, 128, 0],
        greenyellow: [173, 255, 47],
        grey: [128, 128, 128],
        honeydew: [240, 255, 240],
        hotpink: [255, 105, 180],
        indianred: [205, 92, 92],
        indigo: [75, 0, 130],
        ivory: [255, 255, 240],
        khaki: [240, 230, 140],
        lavender: [230, 230, 250],
        lavenderblush: [255, 240, 245],
        lawngreen: [124, 252, 0],
        lemonchiffon: [255, 250, 205],
        lightblue: [173, 216, 230],
        lightcoral: [240, 128, 128],
        lightcyan: [224, 255, 255],
        lightgoldenrodyellow: [250, 250, 210],
        lightgray: [211, 211, 211],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightsalmon: [255, 160, 122],
        lightseagreen: [32, 178, 170],
        lightskyblue: [135, 206, 250],
        lightslategray: [119, 136, 153],
        lightslategrey: [119, 136, 153],
        lightsteelblue: [176, 196, 222],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        limegreen: [50, 205, 50],
        linen: [250, 240, 230],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        mediumaquamarine: [102, 205, 170],
        mediumblue: [0, 0, 205],
        mediumorchid: [186, 85, 211],
        mediumpurple: [147, 112, 219],
        mediumseagreen: [60, 179, 113],
        mediumslateblue: [123, 104, 238],
        mediumspringgreen: [0, 250, 154],
        mediumturquoise: [72, 209, 204],
        mediumvioletred: [199, 21, 133],
        midnightblue: [25, 25, 112],
        mintcream: [245, 255, 250],
        mistyrose: [255, 228, 225],
        moccasin: [255, 228, 181],
        navajowhite: [255, 222, 173],
        navy: [0, 0, 128],
        oldlace: [253, 245, 230],
        olive: [128, 128, 0],
        olivedrab: [107, 142, 35],
        orange: [255, 165, 0],
        orangered: [255, 69, 0],
        orchid: [218, 112, 214],
        palegoldenrod: [238, 232, 170],
        palegreen: [152, 251, 152],
        paleturquoise: [175, 238, 238],
        palevioletred: [219, 112, 147],
        papayawhip: [255, 239, 213],
        peachpuff: [255, 218, 185],
        peru: [205, 133, 63],
        pink: [255, 192, 203],
        plum: [221, 160, 221],
        powderblue: [176, 224, 230],
        purple: [128, 0, 128],
        rebeccapurple: [102, 51, 153],
        red: [255, 0, 0],
        rosybrown: [188, 143, 143],
        royalblue: [65, 105, 225],
        saddlebrown: [139, 69, 19],
        salmon: [250, 128, 114],
        sandybrown: [244, 164, 96],
        seagreen: [46, 139, 87],
        seashell: [255, 245, 238],
        sienna: [160, 82, 45],
        silver: [192, 192, 192],
        skyblue: [135, 206, 235],
        slateblue: [106, 90, 205],
        slategray: [112, 128, 144],
        slategrey: [112, 128, 144],
        snow: [255, 250, 250],
        springgreen: [0, 255, 127],
        steelblue: [70, 130, 180],
        tan: [210, 180, 140],
        teal: [0, 128, 128],
        thistle: [216, 191, 216],
        tomato: [255, 99, 71],
        turquoise: [64, 224, 208],
        violet: [238, 130, 238],
        wheat: [245, 222, 179],
        white: [255, 255, 255],
        whitesmoke: [245, 245, 245],
        yellow: [255, 255, 0],
        yellowgreen: [154, 205, 50]
       },
       G = {};
      for (var Q in Z) G[JSON.stringify(Z[Q])] = Q
     }, {}],
     5: [function(t, e, a) {
      var i = t(4),
       n = function() {
        return new d
       };
      for (var o in i) {
       n[o + "Raw"] = function(t) {
        return function(e) {
         return "number" == typeof e && (e = Array.prototype.slice.call(arguments)), i[t](e)
        }
       }(o);
       var r = /(\w+)2(\w+)/.exec(o),
        l = r[1],
        s = r[2];
       n[l] = n[l] || {}, n[l][s] = n[o] = function(t) {
        return function(e) {
         "number" == typeof e && (e = Array.prototype.slice.call(arguments));
         var a = i[t](e);
         if ("string" == typeof a || void 0 === a) return a;
         for (var n = 0; n < a.length; n++) a[n] = Math.round(a[n]);
         return a
        }
       }(o)
      }
      var d = function() {
       this.convs = {}
      };
      d.prototype.routeSpace = function(t, e) {
       var a = e[0];
       return void 0 === a ? this.getValues(t) : ("number" == typeof a && (a = Array.prototype.slice.call(e)), this.setValues(t, a))
      }, d.prototype.setValues = function(t, e) {
       return this.space = t, this.convs = {}, this.convs[t] = e, this
      }, d.prototype.getValues = function(t) {
       var e = this.convs[t];
       if (!e) {
        var a = this.space,
         i = this.convs[a];
        e = n[a][t](i), this.convs[t] = e
       }
       return e
      }, ["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach(function(t) {
       d.prototype[t] = function(e) {
        return this.routeSpace(t, arguments)
       }
      }), e.exports = n
     }, {
      4: 4
     }],
     6: [function(t, e, a) {
      e.exports = {
       aliceblue: [240, 248, 255],
       antiquewhite: [250, 235, 215],
       aqua: [0, 255, 255],
       aquamarine: [127, 255, 212],
       azure: [240, 255, 255],
       beige: [245, 245, 220],
       bisque: [255, 228, 196],
       black: [0, 0, 0],
       blanchedalmond: [255, 235, 205],
       blue: [0, 0, 255],
       blueviolet: [138, 43, 226],
       brown: [165, 42, 42],
       burlywood: [222, 184, 135],
       cadetblue: [95, 158, 160],
       chartreuse: [127, 255, 0],
       chocolate: [210, 105, 30],
       coral: [255, 127, 80],
       cornflowerblue: [100, 149, 237],
       cornsilk: [255, 248, 220],
       crimson: [220, 20, 60],
       cyan: [0, 255, 255],
       darkblue: [0, 0, 139],
       darkcyan: [0, 139, 139],
       darkgoldenrod: [184, 134, 11],
       darkgray: [169, 169, 169],
       darkgreen: [0, 100, 0],
       darkgrey: [169, 169, 169],
       darkkhaki: [189, 183, 107],
       darkmagenta: [139, 0, 139],
       darkolivegreen: [85, 107, 47],
       darkorange: [255, 140, 0],
       darkorchid: [153, 50, 204],
       darkred: [139, 0, 0],
       darksalmon: [233, 150, 122],
       darkseagreen: [143, 188, 143],
       darkslateblue: [72, 61, 139],
       darkslategray: [47, 79, 79],
       darkslategrey: [47, 79, 79],
       darkturquoise: [0, 206, 209],
       darkviolet: [148, 0, 211],
       deeppink: [255, 20, 147],
       deepskyblue: [0, 191, 255],
       dimgray: [105, 105, 105],
       dimgrey: [105, 105, 105],
       dodgerblue: [30, 144, 255],
       firebrick: [178, 34, 34],
       floralwhite: [255, 250, 240],
       forestgreen: [34, 139, 34],
       fuchsia: [255, 0, 255],
       gainsboro: [220, 220, 220],
       ghostwhite: [248, 248, 255],
       gold: [255, 215, 0],
       goldenrod: [218, 165, 32],
       gray: [128, 128, 128],
       green: [0, 128, 0],
       greenyellow: [173, 255, 47],
       grey: [128, 128, 128],
       honeydew: [240, 255, 240],
       hotpink: [255, 105, 180],
       indianred: [205, 92, 92],
       indigo: [75, 0, 130],
       ivory: [255, 255, 240],
       khaki: [240, 230, 140],
       lavender: [230, 230, 250],
       lavenderblush: [255, 240, 245],
       lawngreen: [124, 252, 0],
       lemonchiffon: [255, 250, 205],
       lightblue: [173, 216, 230],
       lightcoral: [240, 128, 128],
       lightcyan: [224, 255, 255],
       lightgoldenrodyellow: [250, 250, 210],
       lightgray: [211, 211, 211],
       lightgreen: [144, 238, 144],
       lightgrey: [211, 211, 211],
       lightpink: [255, 182, 193],
       lightsalmon: [255, 160, 122],
       lightseagreen: [32, 178, 170],
       lightskyblue: [135, 206, 250],
       lightslategray: [119, 136, 153],
       lightslategrey: [119, 136, 153],
       lightsteelblue: [176, 196, 222],
       lightyellow: [255, 255, 224],
       lime: [0, 255, 0],
       limegreen: [50, 205, 50],
       linen: [250, 240, 230],
       magenta: [255, 0, 255],
       maroon: [128, 0, 0],
       mediumaquamarine: [102, 205, 170],
       mediumblue: [0, 0, 205],
       mediumorchid: [186, 85, 211],
       mediumpurple: [147, 112, 219],
       mediumseagreen: [60, 179, 113],
       mediumslateblue: [123, 104, 238],
       mediumspringgreen: [0, 250, 154],
       mediumturquoise: [72, 209, 204],
       mediumvioletred: [199, 21, 133],
       midnightblue: [25, 25, 112],
       mintcream: [245, 255, 250],
       mistyrose: [255, 228, 225],
       moccasin: [255, 228, 181],
       navajowhite: [255, 222, 173],
       navy: [0, 0, 128],
       oldlace: [253, 245, 230],
       olive: [128, 128, 0],
       olivedrab: [107, 142, 35],
       orange: [255, 165, 0],
       orangered: [255, 69, 0],
       orchid: [218, 112, 214],
       palegoldenrod: [238, 232, 170],
       palegreen: [152, 251, 152],
       paleturquoise: [175, 238, 238],
       palevioletred: [219, 112, 147],
       papayawhip: [255, 239, 213],
       peachpuff: [255, 218, 185],
       peru: [205, 133, 63],
       pink: [255, 192, 203],
       plum: [221, 160, 221],
       powderblue: [176, 224, 230],
       purple: [128, 0, 128],
       rebeccapurple: [102, 51, 153],
       red: [255, 0, 0],
       rosybrown: [188, 143, 143],
       royalblue: [65, 105, 225],
       saddlebrown: [139, 69, 19],
       salmon: [250, 128, 114],
       sandybrown: [244, 164, 96],
       seagreen: [46, 139, 87],
       seashell: [255, 245, 238],
       sienna: [160, 82, 45],
       silver: [192, 192, 192],
       skyblue: [135, 206, 235],
       slateblue: [106, 90, 205],
       slategray: [112, 128, 144],
       slategrey: [112, 128, 144],
       snow: [255, 250, 250],
       springgreen: [0, 255, 127],
       steelblue: [70, 130, 180],
       tan: [210, 180, 140],
       teal: [0, 128, 128],
       thistle: [216, 191, 216],
       tomato: [255, 99, 71],
       turquoise: [64, 224, 208],
       violet: [238, 130, 238],
       wheat: [245, 222, 179],
       white: [255, 255, 255],
       whitesmoke: [245, 245, 245],
       yellow: [255, 255, 0],
       yellowgreen: [154, 205, 50]
      }
     }, {}],
     7: [function(t, e, a) {
      var i = t(28)();
      t(26)(i), t(22)(i), t(25)(i), t(21)(i), t(23)(i), t(24)(i), t(29)(i), t(33)(i), t(31)(i), t(34)(i), t(32)(i), t(35)(i), t(30)(i), t(27)(i), t(36)(i), t(37)(i), t(38)(i), t(39)(i), t(40)(i), t(43)(i), t(41)(i), t(42)(i), t(44)(i), t(45)(i), t(46)(i), t(15)(i), t(16)(i), t(17)(i), t(18)(i), t(19)(i), t(20)(i), t(8)(i), t(9)(i), t(10)(i), t(11)(i), t(12)(i), t(13)(i), t(14)(i), window.Chart = e.exports = i
     }, {
      10: 10,
      11: 11,
      12: 12,
      13: 13,
      14: 14,
      15: 15,
      16: 16,
      17: 17,
      18: 18,
      19: 19,
      20: 20,
      21: 21,
      22: 22,
      23: 23,
      24: 24,
      25: 25,
      26: 26,
      27: 27,
      28: 28,
      29: 29,
      30: 30,
      31: 31,
      32: 32,
      33: 33,
      34: 34,
      35: 35,
      36: 36,
      37: 37,
      38: 38,
      39: 39,
      40: 40,
      41: 41,
      42: 42,
      43: 43,
      44: 44,
      45: 45,
      46: 46,
      8: 8,
      9: 9
     }],
     8: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       t.Bar = function(e, a) {
        return a.type = "bar", new t(e, a)
       }
      }
     }, {}],
     9: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       t.Bubble = function(e, a) {
        return a.type = "bubble", new t(e, a)
       }
      }
     }, {}],
     10: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       t.Doughnut = function(e, a) {
        return a.type = "doughnut", new t(e, a)
       }
      }
     }, {}],
     11: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       t.Line = function(e, a) {
        return a.type = "line", new t(e, a)
       }
      }
     }, {}],
     12: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       t.PolarArea = function(e, a) {
        return a.type = "polarArea", new t(e, a)
       }
      }
     }, {}],
     13: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       t.Radar = function(e, a) {
        return a.type = "radar", new t(e, a)
       }
      }
     }, {}],
     14: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       var e = {
        hover: {
         mode: "single"
        },
        scales: {
         xAxes: [{
          type: "linear",
          position: "bottom",
          id: "x-axis-1"
         }],
         yAxes: [{
          type: "linear",
          position: "left",
          id: "y-axis-1"
         }]
        },
        tooltips: {
         callbacks: {
          title: function() {
           return ""
          },
          label: function(t) {
           return "(" + t.xLabel + ", " + t.yLabel + ")"
          }
         }
        }
       };
       t.defaults.scatter = e, t.controllers.scatter = t.controllers.line, t.Scatter = function(e, a) {
        return a.type = "scatter", new t(e, a)
       }
      }
     }, {}],
     15: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       var e = t.helpers;
       t.defaults.bar = {
        hover: {
         mode: "label"
        },
        scales: {
         xAxes: [{
          type: "category",
          categoryPercentage: .8,
          barPercentage: .9,
          gridLines: {
           offsetGridLines: !0
          }
         }],
         yAxes: [{
          type: "linear"
         }]
        }
       }, t.controllers.bar = t.DatasetController.extend({
        dataElementType: t.elements.Rectangle,
        initialize: function(e, a) {
         t.DatasetController.prototype.initialize.call(this, e, a), this.getMeta().bar = !0
        },
        getBarCount: function() {
         var t = this,
          a = 0;
         return e.each(t.chart.data.datasets, function(e, i) {
          var n = t.chart.getDatasetMeta(i);
          n.bar && t.chart.isDatasetVisible(i) && ++a
         }, t), a
        },
        update: function(t) {
         var a = this;
         e.each(a.getMeta().data, function(e, i) {
          a.updateElement(e, i, t)
         }, a)
        },
        updateElement: function(t, a, i) {
         var n = this,
          o = n.getMeta(),
          r = n.getScaleForId(o.xAxisID),
          l = n.getScaleForId(o.yAxisID),
          s = l.getBasePixel(),
          d = n.chart.options.elements.rectangle,
          u = t.custom || {},
          c = n.getDataset();
         t._xScale = r, t._yScale = l, t._datasetIndex = n.index, t._index = a;
         var h = n.getRuler(a);
         t._model = {
          x: n.calculateBarX(a, n.index, h),
          y: i ? s : n.calculateBarY(a, n.index),
          label: n.chart.data.labels[a],
          datasetLabel: c.label,
          base: i ? s : n.calculateBarBase(n.index, a),
          width: n.calculateBarWidth(h),
          backgroundColor: u.backgroundColor ? u.backgroundColor : e.getValueAtIndexOrDefault(c.backgroundColor, a, d.backgroundColor),
          borderSkipped: u.borderSkipped ? u.borderSkipped : d.borderSkipped,
          borderColor: u.borderColor ? u.borderColor : e.getValueAtIndexOrDefault(c.borderColor, a, d.borderColor),
          borderWidth: u.borderWidth ? u.borderWidth : e.getValueAtIndexOrDefault(c.borderWidth, a, d.borderWidth)
         }, t.pivot()
        },
        calculateBarBase: function(t, e) {
         var a = this,
          i = a.getMeta(),
          n = a.getScaleForId(i.yAxisID),
          o = 0;
         if (n.options.stacked) {
          for (var r = a.chart, l = r.data.datasets, s = Number(l[t].data[e]), d = 0; t > d; d++) {
           var u = l[d],
            c = r.getDatasetMeta(d);
           if (c.bar && c.yAxisID === n.id && r.isDatasetVisible(d)) {
            var h = Number(u.data[e]);
            o += 0 > s ? Math.min(h, 0) : Math.max(h, 0)
           }
          }
          return n.getPixelForValue(o)
         }
         return n.getBasePixel()
        },
        getRuler: function(t) {
         var e, a = this,
          i = a.getMeta(),
          n = a.getScaleForId(i.xAxisID),
          o = a.getBarCount();
         e = "category" === n.options.type ? n.getPixelForTick(t + 1) - n.getPixelForTick(t) : n.width / n.ticks.length;
         var r = e * n.options.categoryPercentage,
          l = (e - e * n.options.categoryPercentage) / 2,
          s = r / o;
         if (n.ticks.length !== a.chart.data.labels.length) {
          var d = n.ticks.length / a.chart.data.labels.length;
          s *= d
         }
         var u = s * n.options.barPercentage,
          c = s - s * n.options.barPercentage;
         return {
          datasetCount: o,
          tickWidth: e,
          categoryWidth: r,
          categorySpacing: l,
          fullBarWidth: s,
          barWidth: u,
          barSpacing: c
         }
        },
        calculateBarWidth: function(t) {
         var e = this.getScaleForId(this.getMeta().xAxisID);
         return e.options.barThickness ? e.options.barThickness : e.options.stacked ? t.categoryWidth : t.barWidth
        },
        getBarIndex: function(t) {
         var e, a, i = 0;
         for (a = 0; t > a; ++a) e = this.chart.getDatasetMeta(a), e.bar && this.chart.isDatasetVisible(a) && ++i;
         return i
        },
        calculateBarX: function(t, e, a) {
         var i = this,
          n = i.getMeta(),
          o = i.getScaleForId(n.xAxisID),
          r = i.getBarIndex(e),
          l = o.getPixelForValue(null, t, e, i.chart.isCombo);
         return l -= i.chart.isCombo ? a.tickWidth / 2 : 0, o.options.stacked ? l + a.categoryWidth / 2 + a.categorySpacing : l + a.barWidth / 2 + a.categorySpacing + a.barWidth * r + a.barSpacing / 2 + a.barSpacing * r
        },
        calculateBarY: function(t, e) {
         var a = this,
          i = a.getMeta(),
          n = a.getScaleForId(i.yAxisID),
          o = Number(a.getDataset().data[t]);
         if (n.options.stacked) {
          for (var r = 0, l = 0, s = 0; e > s; s++) {
           var d = a.chart.data.datasets[s],
            u = a.chart.getDatasetMeta(s);
           if (u.bar && u.yAxisID === n.id && a.chart.isDatasetVisible(s)) {
            var c = Number(d.data[t]);
            0 > c ? l += c || 0 : r += c || 0
           }
          }
          return 0 > o ? n.getPixelForValue(l + o) : n.getPixelForValue(r + o)
         }
         return n.getPixelForValue(o)
        },
        draw: function(t) {
         var e, a, i = this,
          n = t || 1,
          o = i.getMeta().data,
          r = i.getDataset();
         for (e = 0, a = o.length; a > e; ++e) {
          var l = r.data[e];
          null === l || void 0 === l || isNaN(l) || o[e].transition(n).draw()
         }
        },
        setHoverStyle: function(t) {
         var a = this.chart.data.datasets[t._datasetIndex],
          i = t._index,
          n = t.custom || {},
          o = t._model;
         o.backgroundColor = n.hoverBackgroundColor ? n.hoverBackgroundColor : e.getValueAtIndexOrDefault(a.hoverBackgroundColor, i, e.getHoverColor(o.backgroundColor)), o.borderColor = n.hoverBorderColor ? n.hoverBorderColor : e.getValueAtIndexOrDefault(a.hoverBorderColor, i, e.getHoverColor(o.borderColor)), o.borderWidth = n.hoverBorderWidth ? n.hoverBorderWidth : e.getValueAtIndexOrDefault(a.hoverBorderWidth, i, o.borderWidth)
        },
        removeHoverStyle: function(t) {
         var a = this.chart.data.datasets[t._datasetIndex],
          i = t._index,
          n = t.custom || {},
          o = t._model,
          r = this.chart.options.elements.rectangle;
         o.backgroundColor = n.backgroundColor ? n.backgroundColor : e.getValueAtIndexOrDefault(a.backgroundColor, i, r.backgroundColor), o.borderColor = n.borderColor ? n.borderColor : e.getValueAtIndexOrDefault(a.borderColor, i, r.borderColor), o.borderWidth = n.borderWidth ? n.borderWidth : e.getValueAtIndexOrDefault(a.borderWidth, i, r.borderWidth)
        }
       }), t.defaults.horizontalBar = {
        hover: {
         mode: "label"
        },
        scales: {
         xAxes: [{
          type: "linear",
          position: "bottom"
         }],
         yAxes: [{
          position: "left",
          type: "category",
          categoryPercentage: .8,
          barPercentage: .9,
          gridLines: {
           offsetGridLines: !0
          }
         }]
        },
        elements: {
         rectangle: {
          borderSkipped: "left"
         }
        },
        tooltips: {
         callbacks: {
          title: function(t, e) {
           var a = "";
           return t.length > 0 && (t[0].yLabel ? a = t[0].yLabel : e.labels.length > 0 && t[0].index < e.labels.length && (a = e.labels[t[0].index])), a
          },
          label: function(t, e) {
           var a = e.datasets[t.datasetIndex].label || "";
           return a + ": " + t.xLabel
          }
         }
        }
       }, t.controllers.horizontalBar = t.controllers.bar.extend({
        updateElement: function(t, a, i) {
         var n = this,
          o = n.getMeta(),
          r = n.getScaleForId(o.xAxisID),
          l = n.getScaleForId(o.yAxisID),
          s = r.getBasePixel(),
          d = t.custom || {},
          u = n.getDataset(),
          c = n.chart.options.elements.rectangle;
         t._xScale = r, t._yScale = l, t._datasetIndex = n.index, t._index = a;
         var h = n.getRuler(a);
         t._model = {
          x: i ? s : n.calculateBarX(a, n.index),
          y: n.calculateBarY(a, n.index, h),
          label: n.chart.data.labels[a],
          datasetLabel: u.label,
          base: i ? s : n.calculateBarBase(n.index, a),
          height: n.calculateBarHeight(h),
          backgroundColor: d.backgroundColor ? d.backgroundColor : e.getValueAtIndexOrDefault(u.backgroundColor, a, c.backgroundColor),
          borderSkipped: d.borderSkipped ? d.borderSkipped : c.borderSkipped,
          borderColor: d.borderColor ? d.borderColor : e.getValueAtIndexOrDefault(u.borderColor, a, c.borderColor),
          borderWidth: d.borderWidth ? d.borderWidth : e.getValueAtIndexOrDefault(u.borderWidth, a, c.borderWidth)
         }, t.draw = function() {
          function t(t) {
           return s[(u + t) % 4]
          }
          var e = this._chart.ctx,
           a = this._view,
           i = a.height / 2,
           n = a.y - i,
           o = a.y + i,
           r = a.base - (a.base - a.x),
           l = a.borderWidth / 2;
          a.borderWidth && (n += l, o -= l, r += l), e.beginPath(), e.fillStyle = a.backgroundColor, e.strokeStyle = a.borderColor, e.lineWidth = a.borderWidth;
          var s = [
            [a.base, o],
            [a.base, n],
            [r, n],
            [r, o]
           ],
           d = ["bottom", "left", "top", "right"],
           u = d.indexOf(a.borderSkipped, 0); - 1 === u && (u = 0), e.moveTo.apply(e, t(0));
          for (var c = 1; 4 > c; c++) e.lineTo.apply(e, t(c));
          e.fill(), a.borderWidth && e.stroke()
         }, t.pivot()
        },
        calculateBarBase: function(t, e) {
         var a = this,
          i = a.getMeta(),
          n = a.getScaleForId(i.xAxisID),
          o = 0;
         if (n.options.stacked) {
          for (var r = a.chart, l = r.data.datasets, s = Number(l[t].data[e]), d = 0; t > d; d++) {
           var u = l[d],
            c = r.getDatasetMeta(d);
           if (c.bar && c.xAxisID === n.id && r.isDatasetVisible(d)) {
            var h = Number(u.data[e]);
            o += 0 > s ? Math.min(h, 0) : Math.max(h, 0)
           }
          }
          return n.getPixelForValue(o)
         }
         return n.getBasePixel()
        },
        getRuler: function(t) {
         var e, a = this,
          i = a.getMeta(),
          n = a.getScaleForId(i.yAxisID),
          o = a.getBarCount();
         e = "category" === n.options.type ? n.getPixelForTick(t + 1) - n.getPixelForTick(t) : n.width / n.ticks.length;
         var r = e * n.options.categoryPercentage,
          l = (e - e * n.options.categoryPercentage) / 2,
          s = r / o;
         if (n.ticks.length !== a.chart.data.labels.length) {
          var d = n.ticks.length / a.chart.data.labels.length;
          s *= d
         }
         var u = s * n.options.barPercentage,
          c = s - s * n.options.barPercentage;
         return {
          datasetCount: o,
          tickHeight: e,
          categoryHeight: r,
          categorySpacing: l,
          fullBarHeight: s,
          barHeight: u,
          barSpacing: c
         }
        },
        calculateBarHeight: function(t) {
         var e = this,
          a = e.getScaleForId(e.getMeta().yAxisID);
         return a.options.barThickness ? a.options.barThickness : a.options.stacked ? t.categoryHeight : t.barHeight
        },
        calculateBarX: function(t, e) {
         var a = this,
          i = a.getMeta(),
          n = a.getScaleForId(i.xAxisID),
          o = Number(a.getDataset().data[t]);
         if (n.options.stacked) {
          for (var r = 0, l = 0, s = 0; e > s; s++) {
           var d = a.chart.data.datasets[s],
            u = a.chart.getDatasetMeta(s);
           if (u.bar && u.xAxisID === n.id && a.chart.isDatasetVisible(s)) {
            var c = Number(d.data[t]);
            0 > c ? l += c || 0 : r += c || 0
           }
          }
          return 0 > o ? n.getPixelForValue(l + o) : n.getPixelForValue(r + o)
         }
         return n.getPixelForValue(o)
        },
        calculateBarY: function(t, e, a) {
         var i = this,
          n = i.getMeta(),
          o = i.getScaleForId(n.yAxisID),
          r = i.getBarIndex(e),
          l = o.getPixelForValue(null, t, e, i.chart.isCombo);
         return l -= i.chart.isCombo ? a.tickHeight / 2 : 0, o.options.stacked ? l + a.categoryHeight / 2 + a.categorySpacing : l + a.barHeight / 2 + a.categorySpacing + a.barHeight * r + a.barSpacing / 2 + a.barSpacing * r
        }
       })
      }
     }, {}],
     16: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       var e = t.helpers;
       t.defaults.bubble = {
        hover: {
         mode: "single"
        },
        scales: {
         xAxes: [{
          type: "linear",
          position: "bottom",
          id: "x-axis-0"
         }],
         yAxes: [{
          type: "linear",
          position: "left",
          id: "y-axis-0"
         }]
        },
        tooltips: {
         callbacks: {
          title: function() {
           return ""
          },
          label: function(t, e) {
           var a = e.datasets[t.datasetIndex].label || "",
            i = e.datasets[t.datasetIndex].data[t.index];
           return a + ": (" + t.xLabel + ", " + t.yLabel + ", " + i.r + ")"
          }
         }
        }
       }, t.controllers.bubble = t.DatasetController.extend({
        dataElementType: t.elements.Point,
        update: function(t) {
         var a = this,
          i = a.getMeta(),
          n = i.data;
         e.each(n, function(e, i) {
          a.updateElement(e, i, t)
         })
        },
        updateElement: function(a, i, n) {
         var o = this,
          r = o.getMeta(),
          l = o.getScaleForId(r.xAxisID),
          s = o.getScaleForId(r.yAxisID),
          d = a.custom || {},
          u = o.getDataset(),
          c = u.data[i],
          h = o.chart.options.elements.point,
          f = o.index;
         e.extend(a, {
          _xScale: l,
          _yScale: s,
          _datasetIndex: f,
          _index: i,
          _model: {
           x: n ? l.getPixelForDecimal(.5) : l.getPixelForValue("object" == typeof c ? c : NaN, i, f, o.chart.isCombo),
           y: n ? s.getBasePixel() : s.getPixelForValue(c, i, f),
           radius: n ? 0 : d.radius ? d.radius : o.getRadius(c),
           hitRadius: d.hitRadius ? d.hitRadius : e.getValueAtIndexOrDefault(u.hitRadius, i, h.hitRadius)
          }
         }), t.DatasetController.prototype.removeHoverStyle.call(o, a, h);
         var g = a._model;
         g.skip = d.skip ? d.skip : isNaN(g.x) || isNaN(g.y), a.pivot()
        },
        getRadius: function(t) {
         return t.r || this.chart.options.elements.point.radius
        },
        setHoverStyle: function(a) {
         var i = this;
         t.DatasetController.prototype.setHoverStyle.call(i, a);
         var n = i.chart.data.datasets[a._datasetIndex],
          o = a._index,
          r = a.custom || {},
          l = a._model;
         l.radius = r.hoverRadius ? r.hoverRadius : e.getValueAtIndexOrDefault(n.hoverRadius, o, i.chart.options.elements.point.hoverRadius) + i.getRadius(n.data[o])
        },
        removeHoverStyle: function(e) {
         var a = this;
         t.DatasetController.prototype.removeHoverStyle.call(a, e, a.chart.options.elements.point);
         var i = a.chart.data.datasets[e._datasetIndex].data[e._index],
          n = e.custom || {},
          o = e._model;
         o.radius = n.radius ? n.radius : a.getRadius(i)
        }
       })
      }
     }, {}],
     17: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       var e = t.helpers,
        a = t.defaults;
       a.doughnut = {
        animation: {
         animateRotate: !0,
         animateScale: !1
        },
        aspectRatio: 1,
        hover: {
         mode: "single"
        },
        legendCallback: function(t) {
         var e = [];
         e.push('<ul class="' + t.id + '-legend">');
         var a = t.data,
          i = a.datasets,
          n = a.labels;
         if (i.length)
          for (var o = 0; o < i[0].data.length; ++o) e.push('<li><span style="background-color:' + i[0].backgroundColor[o] + '"></span>'), n[o] && e.push(n[o]), e.push("</li>");
         return e.push("</ul>"), e.join("")
        },
        legend: {
         labels: {
          generateLabels: function(t) {
           var a = t.data;
           return a.labels.length && a.datasets.length ? a.labels.map(function(i, n) {
            var o = t.getDatasetMeta(0),
             r = a.datasets[0],
             l = o.data[n],
             s = l && l.custom || {},
             d = e.getValueAtIndexOrDefault,
             u = t.options.elements.arc,
             c = s.backgroundColor ? s.backgroundColor : d(r.backgroundColor, n, u.backgroundColor),
             h = s.borderColor ? s.borderColor : d(r.borderColor, n, u.borderColor),
             f = s.borderWidth ? s.borderWidth : d(r.borderWidth, n, u.borderWidth);
            return {
             text: i,
             fillStyle: c,
             strokeStyle: h,
             lineWidth: f,
             hidden: isNaN(r.data[n]) || o.data[n].hidden,
             index: n
            }
           }) : []
          }
         },
         onClick: function(t, e) {
          var a, i, n, o = e.index,
           r = this.chart;
          for (a = 0, i = (r.data.datasets || []).length; i > a; ++a) n = r.getDatasetMeta(a), n.data[o] && (n.data[o].hidden = !n.data[o].hidden);
          r.update()
         }
        },
        cutoutPercentage: 50,
        rotation: Math.PI * -.5,
        circumference: 2 * Math.PI,
        tooltips: {
         callbacks: {
          title: function() {
           return ""
          },
          label: function(t, a) {
           var i = a.labels[t.index],
            n = ": " + a.datasets[t.datasetIndex].data[t.index];
           return e.isArray(i) ? (i = i.slice(), i[0] += n) : i += n, i
          }
         }
        }
       }, a.pie = e.clone(a.doughnut), e.extend(a.pie, {
        cutoutPercentage: 0
       }), t.controllers.doughnut = t.controllers.pie = t.DatasetController.extend({
        dataElementType: t.elements.Arc,
        linkScales: e.noop,
        getRingIndex: function(t) {
         for (var e = 0, a = 0; t > a; ++a) this.chart.isDatasetVisible(a) && ++e;
         return e
        },
        update: function(t) {
         var a = this,
          i = a.chart,
          n = i.chartArea,
          o = i.options,
          r = o.elements.arc,
          l = n.right - n.left - r.borderWidth,
          s = n.bottom - n.top - r.borderWidth,
          d = Math.min(l, s),
          u = {
           x: 0,
           y: 0
          },
          c = a.getMeta(),
          h = o.cutoutPercentage,
          f = o.circumference;
         if (f < 2 * Math.PI) {
          var g = o.rotation % (2 * Math.PI);
          g += 2 * Math.PI * (g >= Math.PI ? -1 : g < -Math.PI ? 1 : 0);
          var p = g + f,
           m = {
            x: Math.cos(g),
            y: Math.sin(g)
           },
           b = {
            x: Math.cos(p),
            y: Math.sin(p)
           },
           v = 0 >= g && p >= 0 || g <= 2 * Math.PI && 2 * Math.PI <= p,
           x = g <= .5 * Math.PI && .5 * Math.PI <= p || g <= 2.5 * Math.PI && 2.5 * Math.PI <= p,
           y = g <= -Math.PI && -Math.PI <= p || g <= Math.PI && Math.PI <= p,
           k = g <= .5 * -Math.PI && .5 * -Math.PI <= p || g <= 1.5 * Math.PI && 1.5 * Math.PI <= p,
           S = h / 100,
           w = {
            x: y ? -1 : Math.min(m.x * (m.x < 0 ? 1 : S), b.x * (b.x < 0 ? 1 : S)),
            y: k ? -1 : Math.min(m.y * (m.y < 0 ? 1 : S), b.y * (b.y < 0 ? 1 : S))
           },
           M = {
            x: v ? 1 : Math.max(m.x * (m.x > 0 ? 1 : S), b.x * (b.x > 0 ? 1 : S)),
            y: x ? 1 : Math.max(m.y * (m.y > 0 ? 1 : S), b.y * (b.y > 0 ? 1 : S))
           },
           C = {
            width: .5 * (M.x - w.x),
            height: .5 * (M.y - w.y)
           };
          d = Math.min(l / C.width, s / C.height), u = {
           x: (M.x + w.x) * -.5,
           y: (M.y + w.y) * -.5
          }
         }
         i.borderWidth = a.getMaxBorderWidth(c.data), i.outerRadius = Math.max((d - i.borderWidth) / 2, 0), i.innerRadius = Math.max(h ? i.outerRadius / 100 * h : 1, 0), i.radiusLength = (i.outerRadius - i.innerRadius) / i.getVisibleDatasetCount(), i.offsetX = u.x * i.outerRadius, i.offsetY = u.y * i.outerRadius, c.total = a.calculateTotal(), a.outerRadius = i.outerRadius - i.radiusLength * a.getRingIndex(a.index), a.innerRadius = a.outerRadius - i.radiusLength, e.each(c.data, function(e, i) {
          a.updateElement(e, i, t)
         })
        },
        updateElement: function(t, a, i) {
         var n = this,
          o = n.chart,
          r = o.chartArea,
          l = o.options,
          s = l.animation,
          d = (r.left + r.right) / 2,
          u = (r.top + r.bottom) / 2,
          c = l.rotation,
          h = l.rotation,
          f = n.getDataset(),
          g = i && s.animateRotate ? 0 : t.hidden ? 0 : n.calculateCircumference(f.data[a]) * (l.circumference / (2 * Math.PI)),
          p = i && s.animateScale ? 0 : n.innerRadius,
          m = i && s.animateScale ? 0 : n.outerRadius,
          b = e.getValueAtIndexOrDefault;
         e.extend(t, {
          _datasetIndex: n.index,
          _index: a,
          _model: {
           x: d + o.offsetX,
           y: u + o.offsetY,
           startAngle: c,
           endAngle: h,
           circumference: g,
           outerRadius: m,
           innerRadius: p,
           label: b(f.label, a, o.data.labels[a])
          }
         });
         var v = t._model;
         this.removeHoverStyle(t), i && s.animateRotate || (0 === a ? v.startAngle = l.rotation : v.startAngle = n.getMeta().data[a - 1]._model.endAngle, v.endAngle = v.startAngle + v.circumference), t.pivot()
        },
        removeHoverStyle: function(e) {
         t.DatasetController.prototype.removeHoverStyle.call(this, e, this.chart.options.elements.arc)
        },
        calculateTotal: function() {
         var t, a = this.getDataset(),
          i = this.getMeta(),
          n = 0;
         return e.each(i.data, function(e, i) {
          t = a.data[i], isNaN(t) || e.hidden || (n += Math.abs(t))
         }), n
        },
        calculateCircumference: function(t) {
         var e = this.getMeta().total;
         return e > 0 && !isNaN(t) ? 2 * Math.PI * (t / e) : 0
        },
        getMaxBorderWidth: function(t) {
         for (var e, a, i = 0, n = this.index, o = t.length, r = 0; o > r; r++) e = t[r]._model ? t[r]._model.borderWidth : 0, a = t[r]._chart ? t[r]._chart.config.data.datasets[n].hoverBorderWidth : 0, i = e > i ? e : i, i = a > i ? a : i;
         return i
        }
       })
      }
     }, {}],
     18: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       function e(t, e) {
        return a.getValueOrDefault(t.showLine, e.showLines)
       }
       var a = t.helpers;
       t.defaults.line = {
        showLines: !0,
        spanGaps: !1,
        hover: {
         mode: "label"
        },
        scales: {
         xAxes: [{
          type: "category",
          id: "x-axis-0"
         }],
         yAxes: [{
          type: "linear",
          id: "y-axis-0"
         }]
        }
       }, t.controllers.line = t.DatasetController.extend({
        datasetElementType: t.elements.Line,
        dataElementType: t.elements.Point,
        update: function(t) {
         var i, n, o, r = this,
          l = r.getMeta(),
          s = l.dataset,
          d = l.data || [],
          u = r.chart.options,
          c = u.elements.line,
          h = r.getScaleForId(l.yAxisID),
          f = r.getDataset(),
          g = e(f, u);
         for (g && (o = s.custom || {}, void 0 !== f.tension && void 0 === f.lineTension && (f.lineTension = f.tension), s._scale = h, s._datasetIndex = r.index, s._children = d, s._model = {
           spanGaps: f.spanGaps ? f.spanGaps : u.spanGaps,
           tension: o.tension ? o.tension : a.getValueOrDefault(f.lineTension, c.tension),
           backgroundColor: o.backgroundColor ? o.backgroundColor : f.backgroundColor || c.backgroundColor,
           borderWidth: o.borderWidth ? o.borderWidth : f.borderWidth || c.borderWidth,
           borderColor: o.borderColor ? o.borderColor : f.borderColor || c.borderColor,
           borderCapStyle: o.borderCapStyle ? o.borderCapStyle : f.borderCapStyle || c.borderCapStyle,
           borderDash: o.borderDash ? o.borderDash : f.borderDash || c.borderDash,
           borderDashOffset: o.borderDashOffset ? o.borderDashOffset : f.borderDashOffset || c.borderDashOffset,
           borderJoinStyle: o.borderJoinStyle ? o.borderJoinStyle : f.borderJoinStyle || c.borderJoinStyle,
           fill: o.fill ? o.fill : void 0 !== f.fill ? f.fill : c.fill,
           steppedLine: o.steppedLine ? o.steppedLine : a.getValueOrDefault(f.steppedLine, c.stepped),
           cubicInterpolationMode: o.cubicInterpolationMode ? o.cubicInterpolationMode : a.getValueOrDefault(f.cubicInterpolationMode, c.cubicInterpolationMode),
           scaleTop: h.top,
           scaleBottom: h.bottom,
           scaleZero: h.getBasePixel()
          }, s.pivot()), i = 0, n = d.length; n > i; ++i) r.updateElement(d[i], i, t);
         for (g && 0 !== s._model.tension && r.updateBezierControlPoints(), i = 0, n = d.length; n > i; ++i) d[i].pivot()
        },
        getPointBackgroundColor: function(t, e) {
         var i = this.chart.options.elements.point.backgroundColor,
          n = this.getDataset(),
          o = t.custom || {};
         return o.backgroundColor ? i = o.backgroundColor : n.pointBackgroundColor ? i = a.getValueAtIndexOrDefault(n.pointBackgroundColor, e, i) : n.backgroundColor && (i = n.backgroundColor), i
        },
        getPointBorderColor: function(t, e) {
         var i = this.chart.options.elements.point.borderColor,
          n = this.getDataset(),
          o = t.custom || {};
         return o.borderColor ? i = o.borderColor : n.pointBorderColor ? i = a.getValueAtIndexOrDefault(n.pointBorderColor, e, i) : n.borderColor && (i = n.borderColor), i
        },
        getPointBorderWidth: function(t, e) {
         var i = this.chart.options.elements.point.borderWidth,
          n = this.getDataset(),
          o = t.custom || {};
         return o.borderWidth ? i = o.borderWidth : n.pointBorderWidth ? i = a.getValueAtIndexOrDefault(n.pointBorderWidth, e, i) : n.borderWidth && (i = n.borderWidth), i
        },
        updateElement: function(t, e, i) {
         var n, o, r = this,
          l = r.getMeta(),
          s = t.custom || {},
          d = r.getDataset(),
          u = r.index,
          c = d.data[e],
          h = r.getScaleForId(l.yAxisID),
          f = r.getScaleForId(l.xAxisID),
          g = r.chart.options.elements.point,
          p = r.chart.data.labels || [],
          m = 1 === p.length || 1 === d.data.length || r.chart.isCombo;
         void 0 !== d.radius && void 0 === d.pointRadius && (d.pointRadius = d.radius), void 0 !== d.hitRadius && void 0 === d.pointHitRadius && (d.pointHitRadius = d.hitRadius), n = f.getPixelForValue("object" == typeof c ? c : NaN, e, u, m), o = i ? h.getBasePixel() : r.calculatePointY(c, e, u), t._xScale = f, t._yScale = h, t._datasetIndex = u, t._index = e, t._model = {
          x: n,
          y: o,
          skip: s.skip || isNaN(n) || isNaN(o),
          radius: s.radius || a.getValueAtIndexOrDefault(d.pointRadius, e, g.radius),
          pointStyle: s.pointStyle || a.getValueAtIndexOrDefault(d.pointStyle, e, g.pointStyle),
          backgroundColor: r.getPointBackgroundColor(t, e),
          borderColor: r.getPointBorderColor(t, e),
          borderWidth: r.getPointBorderWidth(t, e),
          tension: l.dataset._model ? l.dataset._model.tension : 0,
          steppedLine: l.dataset._model ? l.dataset._model.steppedLine : !1,
          hitRadius: s.hitRadius || a.getValueAtIndexOrDefault(d.pointHitRadius, e, g.hitRadius)
         }
        },
        calculatePointY: function(t, e, a) {
         var i, n, o, r = this,
          l = r.chart,
          s = r.getMeta(),
          d = r.getScaleForId(s.yAxisID),
          u = 0,
          c = 0;
         if (d.options.stacked) {
          for (i = 0; a > i; i++)
           if (n = l.data.datasets[i], o = l.getDatasetMeta(i), "line" === o.type && o.yAxisID === d.id && l.isDatasetVisible(i)) {
            var h = Number(d.getRightValue(n.data[e]));
            0 > h ? c += h || 0 : u += h || 0
           } var f = Number(d.getRightValue(t));
          return 0 > f ? d.getPixelForValue(c + f) : d.getPixelForValue(u + f)
         }
         return d.getPixelForValue(t)
        },
        updateBezierControlPoints: function() {
         function t(t, e, a) {
          return Math.max(Math.min(t, a), e)
         }
         var e, i, n, o, r, l = this,
          s = l.getMeta(),
          d = l.chart.chartArea,
          u = s.data || [];
         if (s.dataset._model.spanGaps && (u = u.filter(function(t) {
           return !t._model.skip
          })), "monotone" === s.dataset._model.cubicInterpolationMode) a.splineCurveMonotone(u);
         else
          for (e = 0, i = u.length; i > e; ++e) n = u[e], o = n._model, r = a.splineCurve(a.previousItem(u, e)._model, o, a.nextItem(u, e)._model, s.dataset._model.tension), o.controlPointPreviousX = r.previous.x, o.controlPointPreviousY = r.previous.y, o.controlPointNextX = r.next.x, o.controlPointNextY = r.next.y;
         if (l.chart.options.elements.line.capBezierPoints)
          for (e = 0, i = u.length; i > e; ++e) o = u[e]._model, o.controlPointPreviousX = t(o.controlPointPreviousX, d.left, d.right), o.controlPointPreviousY = t(o.controlPointPreviousY, d.top, d.bottom), o.controlPointNextX = t(o.controlPointNextX, d.left, d.right), o.controlPointNextY = t(o.controlPointNextY, d.top, d.bottom)
        },
        draw: function(t) {
         var a, i, n = this,
          o = n.getMeta(),
          r = o.data || [],
          l = t || 1;
         for (a = 0, i = r.length; i > a; ++a) r[a].transition(l);
         for (e(n.getDataset(), n.chart.options) && o.dataset.transition(l).draw(), a = 0, i = r.length; i > a; ++a) r[a].draw()
        },
        setHoverStyle: function(t) {
         var e = this.chart.data.datasets[t._datasetIndex],
          i = t._index,
          n = t.custom || {},
          o = t._model;
         o.radius = n.hoverRadius || a.getValueAtIndexOrDefault(e.pointHoverRadius, i, this.chart.options.elements.point.hoverRadius), o.backgroundColor = n.hoverBackgroundColor || a.getValueAtIndexOrDefault(e.pointHoverBackgroundColor, i, a.getHoverColor(o.backgroundColor)), o.borderColor = n.hoverBorderColor || a.getValueAtIndexOrDefault(e.pointHoverBorderColor, i, a.getHoverColor(o.borderColor)), o.borderWidth = n.hoverBorderWidth || a.getValueAtIndexOrDefault(e.pointHoverBorderWidth, i, o.borderWidth)
        },
        removeHoverStyle: function(t) {
         var e = this,
          i = e.chart.data.datasets[t._datasetIndex],
          n = t._index,
          o = t.custom || {},
          r = t._model;
         void 0 !== i.radius && void 0 === i.pointRadius && (i.pointRadius = i.radius), r.radius = o.radius || a.getValueAtIndexOrDefault(i.pointRadius, n, e.chart.options.elements.point.radius), r.backgroundColor = e.getPointBackgroundColor(t, n), r.borderColor = e.getPointBorderColor(t, n), r.borderWidth = e.getPointBorderWidth(t, n)
        }
       })
      }
     }, {}],
     19: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       var e = t.helpers;
       t.defaults.polarArea = {
        scale: {
         type: "radialLinear",
         lineArc: !0,
         ticks: {
          beginAtZero: !0
         }
        },
        animation: {
         animateRotate: !0,
         animateScale: !0
        },
        startAngle: -.5 * Math.PI,
        aspectRatio: 1,
        legendCallback: function(t) {
         var e = [];
         e.push('<ul class="' + t.id + '-legend">');
         var a = t.data,
          i = a.datasets,
          n = a.labels;
         if (i.length)
          for (var o = 0; o < i[0].data.length; ++o) e.push('<li><span style="background-color:' + i[0].backgroundColor[o] + '"></span>'), n[o] && e.push(n[o]), e.push("</li>");
         return e.push("</ul>"), e.join("")
        },
        legend: {
         labels: {
          generateLabels: function(t) {
           var a = t.data;
           return a.labels.length && a.datasets.length ? a.labels.map(function(i, n) {
            var o = t.getDatasetMeta(0),
             r = a.datasets[0],
             l = o.data[n],
             s = l.custom || {},
             d = e.getValueAtIndexOrDefault,
             u = t.options.elements.arc,
             c = s.backgroundColor ? s.backgroundColor : d(r.backgroundColor, n, u.backgroundColor),
             h = s.borderColor ? s.borderColor : d(r.borderColor, n, u.borderColor),
             f = s.borderWidth ? s.borderWidth : d(r.borderWidth, n, u.borderWidth);
            return {
             text: i,
             fillStyle: c,
             strokeStyle: h,
             lineWidth: f,
             hidden: isNaN(r.data[n]) || o.data[n].hidden,
             index: n
            }
           }) : []
          }
         },
         onClick: function(t, e) {
          var a, i, n, o = e.index,
           r = this.chart;
          for (a = 0, i = (r.data.datasets || []).length; i > a; ++a) n = r.getDatasetMeta(a), n.data[o].hidden = !n.data[o].hidden;
          r.update()
         }
        },
        tooltips: {
         callbacks: {
          title: function() {
           return ""
          },
          label: function(t, e) {
           return e.labels[t.index] + ": " + t.yLabel
          }
         }
        }
       }, t.controllers.polarArea = t.DatasetController.extend({
        dataElementType: t.elements.Arc,
        linkScales: e.noop,
        update: function(t) {
         var a = this,
          i = a.chart,
          n = i.chartArea,
          o = a.getMeta(),
          r = i.options,
          l = r.elements.arc,
          s = Math.min(n.right - n.left, n.bottom - n.top);
         i.outerRadius = Math.max((s - l.borderWidth / 2) / 2, 0), i.innerRadius = Math.max(r.cutoutPercentage ? i.outerRadius / 100 * r.cutoutPercentage : 1, 0), i.radiusLength = (i.outerRadius - i.innerRadius) / i.getVisibleDatasetCount(), a.outerRadius = i.outerRadius - i.radiusLength * a.index, a.innerRadius = a.outerRadius - i.radiusLength, o.count = a.countVisibleElements(), e.each(o.data, function(e, i) {
          a.updateElement(e, i, t)
         })
        },
        updateElement: function(t, a, i) {
         for (var n = this, o = n.chart, r = n.getDataset(), l = o.options, s = l.animation, d = o.scale, u = e.getValueAtIndexOrDefault, c = o.data.labels, h = n.calculateCircumference(r.data[a]), f = d.xCenter, g = d.yCenter, p = 0, m = n.getMeta(), b = 0; a > b; ++b) isNaN(r.data[b]) || m.data[b].hidden || ++p;
         var v = l.startAngle,
          x = t.hidden ? 0 : d.getDistanceFromCenterForValue(r.data[a]),
          y = v + h * p,
          k = y + (t.hidden ? 0 : h),
          S = s.animateScale ? 0 : d.getDistanceFromCenterForValue(r.data[a]);
         e.extend(t, {
          _datasetIndex: n.index,
          _index: a,
          _scale: d,
          _model: {
           x: f,
           y: g,
           innerRadius: 0,
           outerRadius: i ? S : x,
           startAngle: i && s.animateRotate ? v : y,
           endAngle: i && s.animateRotate ? v : k,
           label: u(c, a, c[a])
          }
         }), n.removeHoverStyle(t), t.pivot()
        },
        removeHoverStyle: function(e) {
         t.DatasetController.prototype.removeHoverStyle.call(this, e, this.chart.options.elements.arc)
        },
        countVisibleElements: function() {
         var t = this.getDataset(),
          a = this.getMeta(),
          i = 0;
         return e.each(a.data, function(e, a) {
          isNaN(t.data[a]) || e.hidden || i++
         }), i
        },
        calculateCircumference: function(t) {
         var e = this.getMeta().count;
         return e > 0 && !isNaN(t) ? 2 * Math.PI / e : 0
        }
       })
      }
     }, {}],
     20: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       var e = t.helpers;
       t.defaults.radar = {
        aspectRatio: 1,
        scale: {
         type: "radialLinear"
        },
        elements: {
         line: {
          tension: 0
         }
        }
       }, t.controllers.radar = t.DatasetController.extend({
        datasetElementType: t.elements.Line,
        dataElementType: t.elements.Point,
        linkScales: e.noop,
        update: function(t) {
         var a = this,
          i = a.getMeta(),
          n = i.dataset,
          o = i.data,
          r = n.custom || {},
          l = a.getDataset(),
          s = a.chart.options.elements.line,
          d = a.chart.scale;
         void 0 !== l.tension && void 0 === l.lineTension && (l.lineTension = l.tension), e.extend(i.dataset, {
          _datasetIndex: a.index,
          _children: o,
          _loop: !0,
          _model: {
           tension: r.tension ? r.tension : e.getValueOrDefault(l.lineTension, s.tension),
           backgroundColor: r.backgroundColor ? r.backgroundColor : l.backgroundColor || s.backgroundColor,
           borderWidth: r.borderWidth ? r.borderWidth : l.borderWidth || s.borderWidth,
           borderColor: r.borderColor ? r.borderColor : l.borderColor || s.borderColor,
           fill: r.fill ? r.fill : void 0 !== l.fill ? l.fill : s.fill,
           borderCapStyle: r.borderCapStyle ? r.borderCapStyle : l.borderCapStyle || s.borderCapStyle,
           borderDash: r.borderDash ? r.borderDash : l.borderDash || s.borderDash,
           borderDashOffset: r.borderDashOffset ? r.borderDashOffset : l.borderDashOffset || s.borderDashOffset,
           borderJoinStyle: r.borderJoinStyle ? r.borderJoinStyle : l.borderJoinStyle || s.borderJoinStyle,
           scaleTop: d.top,
           scaleBottom: d.bottom,
           scaleZero: d.getBasePosition()
          }
         }), i.dataset.pivot(), e.each(o, function(e, i) {
          a.updateElement(e, i, t)
         }, a), a.updateBezierControlPoints()
        },
        updateElement: function(t, a, i) {
         var n = this,
          o = t.custom || {},
          r = n.getDataset(),
          l = n.chart.scale,
          s = n.chart.options.elements.point,
          d = l.getPointPositionForValue(a, r.data[a]);
         e.extend(t, {
          _datasetIndex: n.index,
          _index: a,
          _scale: l,
          _model: {
           x: i ? l.xCenter : d.x,
           y: i ? l.yCenter : d.y,
           tension: o.tension ? o.tension : e.getValueOrDefault(r.tension, n.chart.options.elements.line.tension),
           radius: o.radius ? o.radius : e.getValueAtIndexOrDefault(r.pointRadius, a, s.radius),
           backgroundColor: o.backgroundColor ? o.backgroundColor : e.getValueAtIndexOrDefault(r.pointBackgroundColor, a, s.backgroundColor),
           borderColor: o.borderColor ? o.borderColor : e.getValueAtIndexOrDefault(r.pointBorderColor, a, s.borderColor),
           borderWidth: o.borderWidth ? o.borderWidth : e.getValueAtIndexOrDefault(r.pointBorderWidth, a, s.borderWidth),
           pointStyle: o.pointStyle ? o.pointStyle : e.getValueAtIndexOrDefault(r.pointStyle, a, s.pointStyle),
           hitRadius: o.hitRadius ? o.hitRadius : e.getValueAtIndexOrDefault(r.hitRadius, a, s.hitRadius)
          }
         }), t._model.skip = o.skip ? o.skip : isNaN(t._model.x) || isNaN(t._model.y)
        },
        updateBezierControlPoints: function() {
         var t = this.chart.chartArea,
          a = this.getMeta();
         e.each(a.data, function(i, n) {
          var o = i._model,
           r = e.splineCurve(e.previousItem(a.data, n, !0)._model, o, e.nextItem(a.data, n, !0)._model, o.tension);
          o.controlPointPreviousX = Math.max(Math.min(r.previous.x, t.right), t.left), o.controlPointPreviousY = Math.max(Math.min(r.previous.y, t.bottom), t.top), o.controlPointNextX = Math.max(Math.min(r.next.x, t.right), t.left), o.controlPointNextY = Math.max(Math.min(r.next.y, t.bottom), t.top), i.pivot()
         })
        },
        draw: function(t) {
         var a = this.getMeta(),
          i = t || 1;
         e.each(a.data, function(t) {
          t.transition(i)
         }), a.dataset.transition(i).draw(), e.each(a.data, function(t) {
          t.draw()
         })
        },
        setHoverStyle: function(t) {
         var a = this.chart.data.datasets[t._datasetIndex],
          i = t.custom || {},
          n = t._index,
          o = t._model;
         o.radius = i.hoverRadius ? i.hoverRadius : e.getValueAtIndexOrDefault(a.pointHoverRadius, n, this.chart.options.elements.point.hoverRadius), o.backgroundColor = i.hoverBackgroundColor ? i.hoverBackgroundColor : e.getValueAtIndexOrDefault(a.pointHoverBackgroundColor, n, e.getHoverColor(o.backgroundColor)), o.borderColor = i.hoverBorderColor ? i.hoverBorderColor : e.getValueAtIndexOrDefault(a.pointHoverBorderColor, n, e.getHoverColor(o.borderColor)), o.borderWidth = i.hoverBorderWidth ? i.hoverBorderWidth : e.getValueAtIndexOrDefault(a.pointHoverBorderWidth, n, o.borderWidth)
        },
        removeHoverStyle: function(t) {
         var a = this.chart.data.datasets[t._datasetIndex],
          i = t.custom || {},
          n = t._index,
          o = t._model,
          r = this.chart.options.elements.point;
         o.radius = i.radius ? i.radius : e.getValueAtIndexOrDefault(a.radius, n, r.radius), o.backgroundColor = i.backgroundColor ? i.backgroundColor : e.getValueAtIndexOrDefault(a.pointBackgroundColor, n, r.backgroundColor), o.borderColor = i.borderColor ? i.borderColor : e.getValueAtIndexOrDefault(a.pointBorderColor, n, r.borderColor), o.borderWidth = i.borderWidth ? i.borderWidth : e.getValueAtIndexOrDefault(a.pointBorderWidth, n, r.borderWidth)
        }
       })
      }
     }, {}],
     21: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       var e = t.helpers;
       t.defaults.global.animation = {
        duration: 1e3,
        easing: "easeOutQuart",
        onProgress: e.noop,
        onComplete: e.noop
       }, t.Animation = t.Element.extend({
        currentStep: null,
        numSteps: 60,
        easing: "",
        render: null,
        onAnimationProgress: null,
        onAnimationComplete: null
       }), t.animationService = {
        frameDuration: 17,
        animations: [],
        dropFrames: 0,
        request: null,
        addAnimation: function(t, e, a, i) {
         var n = this;
         i || (t.animating = !0);
         for (var o = 0; o < n.animations.length; ++o)
          if (n.animations[o].chartInstance === t) return void(n.animations[o].animationObject = e);
         n.animations.push({
          chartInstance: t,
          animationObject: e
         }), 1 === n.animations.length && n.requestAnimationFrame()
        },
        cancelAnimation: function(t) {
         var a = e.findIndex(this.animations, function(e) {
          return e.chartInstance === t
         }); - 1 !== a && (this.animations.splice(a, 1), t.animating = !1)
        },
        requestAnimationFrame: function() {
         var t = this;
         null === t.request && (t.request = e.requestAnimFrame.call(window, function() {
          t.request = null, t.startDigest()
         }))
        },
        startDigest: function() {
         var t = this,
          e = Date.now(),
          a = 0;
         t.dropFrames > 1 && (a = Math.floor(t.dropFrames), t.dropFrames = t.dropFrames % 1);
         for (var i = 0; i < t.animations.length;) null === t.animations[i].animationObject.currentStep && (t.animations[i].animationObject.currentStep = 0), t.animations[i].animationObject.currentStep += 1 + a, t.animations[i].animationObject.currentStep > t.animations[i].animationObject.numSteps && (t.animations[i].animationObject.currentStep = t.animations[i].animationObject.numSteps), t.animations[i].animationObject.render(t.animations[i].chartInstance, t.animations[i].animationObject), t.animations[i].animationObject.onAnimationProgress && t.animations[i].animationObject.onAnimationProgress.call && t.animations[i].animationObject.onAnimationProgress.call(t.animations[i].chartInstance, t.animations[i]), t.animations[i].animationObject.currentStep === t.animations[i].animationObject.numSteps ? (t.animations[i].animationObject.onAnimationComplete && t.animations[i].animationObject.onAnimationComplete.call && t.animations[i].animationObject.onAnimationComplete.call(t.animations[i].chartInstance, t.animations[i]), t.animations[i].chartInstance.animating = !1, t.animations.splice(i, 1)) : ++i;
         var n = Date.now(),
          o = (n - e) / t.frameDuration;
         t.dropFrames += o, t.animations.length > 0 && t.requestAnimationFrame()
        }
       }
      }
     }, {}],
     22: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       var e = t.canvasHelpers = {};
       e.drawPoint = function(t, e, a, i, n) {
        var o, r, l, s, d, u;
        if ("object" == typeof e && (o = e.toString(), "[object HTMLImageElement]" === o || "[object HTMLCanvasElement]" === o)) return void t.drawImage(e, i - e.width / 2, n - e.height / 2);
        if (!(isNaN(a) || 0 >= a)) {
         switch (e) {
          default:
           t.beginPath(), t.arc(i, n, a, 0, 2 * Math.PI), t.closePath(), t.fill();
           break;
          case "triangle":
           t.beginPath(), r = 3 * a / Math.sqrt(3), d = r * Math.sqrt(3) / 2, t.moveTo(i - r / 2, n + d / 3), t.lineTo(i + r / 2, n + d / 3), t.lineTo(i, n - 2 * d / 3), t.closePath(), t.fill();
           break;
          case "rect":
           u = 1 / Math.SQRT2 * a, t.beginPath(), t.fillRect(i - u, n - u, 2 * u, 2 * u), t.strokeRect(i - u, n - u, 2 * u, 2 * u);
           break;
          case "rectRot":
           u = 1 / Math.SQRT2 * a, t.beginPath(), t.moveTo(i - u, n), t.lineTo(i, n + u), t.lineTo(i + u, n), t.lineTo(i, n - u), t.closePath(), t.fill();
           break;
          case "cross":
           t.beginPath(), t.moveTo(i, n + a), t.lineTo(i, n - a), t.moveTo(i - a, n), t.lineTo(i + a, n), t.closePath();
           break;
          case "crossRot":
           t.beginPath(), l = Math.cos(Math.PI / 4) * a, s = Math.sin(Math.PI / 4) * a, t.moveTo(i - l, n - s), t.lineTo(i + l, n + s), t.moveTo(i - l, n + s), t.lineTo(i + l, n - s), t.closePath();
           break;
          case "star":
           t.beginPath(), t.moveTo(i, n + a), t.lineTo(i, n - a), t.moveTo(i - a, n), t.lineTo(i + a, n), l = Math.cos(Math.PI / 4) * a, s = Math.sin(Math.PI / 4) * a, t.moveTo(i - l, n - s), t.lineTo(i + l, n + s), t.moveTo(i - l, n + s), t.lineTo(i + l, n - s), t.closePath();
           break;
          case "line":
           t.beginPath(), t.moveTo(i - a, n), t.lineTo(i + a, n), t.closePath();
           break;
          case "dash":
           t.beginPath(), t.moveTo(i, n), t.lineTo(i + a, n), t.closePath()
         }
         t.stroke()
        }
       }
      }
     }, {}],
     23: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       function e(t, e) {
        var a = r.getStyle(t, e),
         i = a && a.match(/(\d+)px/);
        return i ? Number(i[1]) : void 0
       }
   
       function a(t, a) {
        var i = t.style,
         n = t.getAttribute("height"),
         o = t.getAttribute("width");
        if (t._chartjs = {
          initial: {
           height: n,
           width: o,
           style: {
            display: i.display,
            height: i.height,
            width: i.width
           }
          }
         }, i.display = i.display || "block", null === o || "" === o) {
         var r = e(t, "width");
         void 0 !== r && (t.width = r)
        }
        if (null === n || "" === n)
         if ("" === t.style.height) t.height = t.width / (a.options.aspectRatio || 2);
         else {
          var l = e(t, "height");
          void 0 !== r && (t.height = l)
         } return t
       }
   
       function i(t) {
        if (t._chartjs) {
         var e = t._chartjs.initial;
         ["height", "width"].forEach(function(a) {
          var i = e[a];
          void 0 === i || null === i ? t.removeAttribute(a) : t.setAttribute(a, i)
         }), r.each(e.style || {}, function(e, a) {
          t.style[a] = e
         }), t.width = t.width, delete t._chartjs
        }
       }
   
       function n(t, e) {
        if ("string" == typeof t ? t = document.getElementById(t) : t.length && (t = t[0]), t && t.canvas && (t = t.canvas), t instanceof HTMLCanvasElement) {
         var i = t.getContext && t.getContext("2d");
         if (i instanceof CanvasRenderingContext2D) return a(t, e), i
        }
        return null
       }
   
       function o(e) {
        e = e || {};
        var a = e.data = e.data || {};
        return a.datasets = a.datasets || [], a.labels = a.labels || [], e.options = r.configMerge(t.defaults.global, t.defaults[e.type], e.options || {}), e
       }
       var r = t.helpers;
       t.types = {}, t.instances = {}, t.controllers = {}, t.Controller = function(e, a, i) {
        var l = this;
        a = o(a);
        var s = n(e, a),
         d = s && s.canvas,
         u = d && d.height,
         c = d && d.width;
        return i.ctx = s, i.canvas = d, i.config = a, i.width = c, i.height = u, i.aspectRatio = u ? c / u : null, l.id = r.uid(), l.chart = i, l.config = a, l.options = a.options, l._bufferedRender = !1, t.instances[l.id] = l, Object.defineProperty(l, "data", {
         get: function() {
          return l.config.data
         }
        }), s && d ? (r.retinaScale(i), l.options.responsive && (r.addResizeListener(d.parentNode, function() {
         l.resize()
        }), l.resize(!0)), l.initialize(), l) : (console.error("Failed to create chart: can't acquire context from the given item"), l)
       }, r.extend(t.Controller.prototype, {
        initialize: function() {
         var e = this;
         return t.plugins.notify("beforeInit", [e]), e.bindEvents(), e.ensureScalesHaveIDs(), e.buildOrUpdateControllers(), e.buildScales(), e.updateLayout(), e.resetElements(), e.initToolTip(), e.update(), t.plugins.notify("afterInit", [e]), e
        },
        clear: function() {
         return r.clear(this.chart), this
        },
        stop: function() {
         return t.animationService.cancelAnimation(this), this
        },
        resize: function(e) {
         var a = this,
          i = a.chart,
          n = a.options,
          o = i.canvas,
          l = n.maintainAspectRatio && i.aspectRatio || null,
          s = Math.floor(r.getMaximumWidth(o)),
          d = Math.floor(l ? s / l : r.getMaximumHeight(o));
         if (i.width !== s || i.height !== d) {
          o.width = i.width = s, o.height = i.height = d, o.style.width = s + "px", o.style.height = d + "px", r.retinaScale(i);
          var u = {
           width: s,
           height: d
          };
          t.plugins.notify("resize", [a, u]), a.options.onResize && a.options.onResize(a, u), e || (a.stop(), a.update(a.options.responsiveAnimationDuration))
         }
        },
        ensureScalesHaveIDs: function() {
         var t = this.options,
          e = t.scales || {},
          a = t.scale;
         r.each(e.xAxes, function(t, e) {
          t.id = t.id || "x-axis-" + e
         }), r.each(e.yAxes, function(t, e) {
          t.id = t.id || "y-axis-" + e
         }), a && (a.id = a.id || "scale")
        },
        buildScales: function() {
         var e = this,
          a = e.options,
          i = e.scales = {},
          n = [];
         a.scales && (n = n.concat((a.scales.xAxes || []).map(function(t) {
          return {
           options: t,
           dtype: "category"
          }
         }), (a.scales.yAxes || []).map(function(t) {
          return {
           options: t,
           dtype: "linear"
          }
         }))), a.scale && n.push({
          options: a.scale,
          dtype: "radialLinear",
          isDefault: !0
         }), r.each(n, function(a) {
          var n = a.options,
           o = r.getValueOrDefault(n.type, a.dtype),
           l = t.scaleService.getScaleConstructor(o);
          if (l) {
           var s = new l({
            id: n.id,
            options: n,
            ctx: e.chart.ctx,
            chart: e
           });
           i[s.id] = s, a.isDefault && (e.scale = s)
          }
         }), t.scaleService.addScalesToLayout(this)
        },
        updateLayout: function() {
         t.layoutService.update(this, this.chart.width, this.chart.height)
        },
        buildOrUpdateControllers: function() {
         var e = this,
          a = [],
          i = [];
         if (r.each(e.data.datasets, function(n, o) {
           var r = e.getDatasetMeta(o);
           r.type || (r.type = n.type || e.config.type), a.push(r.type), r.controller ? r.controller.updateIndex(o) : (r.controller = new t.controllers[r.type](e, o), i.push(r.controller))
          }, e), a.length > 1)
          for (var n = 1; n < a.length; n++)
           if (a[n] !== a[n - 1]) {
            e.isCombo = !0;
            break
           } return i
        },
        resetElements: function() {
         var t = this;
         r.each(t.data.datasets, function(e, a) {
          t.getDatasetMeta(a).controller.reset()
         }, t)
        },
        reset: function() {
         this.resetElements(), this.tooltip.initialize()
        },
        update: function(e, a) {
         var i = this;
         t.plugins.notify("beforeUpdate", [i]), i.tooltip._data = i.data;
         var n = i.buildOrUpdateControllers();
         r.each(i.data.datasets, function(t, e) {
          i.getDatasetMeta(e).controller.buildOrUpdateElements()
         }, i), t.layoutService.update(i, i.chart.width, i.chart.height), t.plugins.notify("afterScaleUpdate", [i]), r.each(n, function(t) {
          t.reset()
         }), i.updateDatasets(), t.plugins.notify("afterUpdate", [i]), i._bufferedRender ? i._bufferedRequest = {
          lazy: a,
          duration: e
         } : i.render(e, a)
        },
        updateDatasets: function() {
         var e, a, i = this;
         if (t.plugins.notify("beforeDatasetsUpdate", [i])) {
          for (e = 0, a = i.data.datasets.length; a > e; ++e) i.getDatasetMeta(e).controller.update();
          t.plugins.notify("afterDatasetsUpdate", [i])
         }
        },
        render: function(e, a) {
         var i = this;
         t.plugins.notify("beforeRender", [i]);
         var n = i.options.animation;
         if (n && ("undefined" != typeof e && 0 !== e || "undefined" == typeof e && 0 !== n.duration)) {
          var o = new t.Animation;
          o.numSteps = (e || n.duration) / 16.66, o.easing = n.easing, o.render = function(t, e) {
           var a = r.easingEffects[e.easing],
            i = e.currentStep / e.numSteps,
            n = a(i);
           t.draw(n, i, e.currentStep)
          }, o.onAnimationProgress = n.onProgress, o.onAnimationComplete = n.onComplete, t.animationService.addAnimation(i, o, e, a)
         } else i.draw(), n && n.onComplete && n.onComplete.call && n.onComplete.call(i);
         return i
        },
        draw: function(e) {
         var a = this,
          i = e || 1;
         a.clear(), t.plugins.notify("beforeDraw", [a, i]), r.each(a.boxes, function(t) {
          t.draw(a.chartArea)
         }, a), a.scale && a.scale.draw(), t.plugins.notify("beforeDatasetsDraw", [a, i]), r.each(a.data.datasets, function(t, i) {
          a.isDatasetVisible(i) && a.getDatasetMeta(i).controller.draw(e)
         }, a, !0), t.plugins.notify("afterDatasetsDraw", [a, i]), a.tooltip.transition(i).draw(), t.plugins.notify("afterDraw", [a, i])
        },
        getElementAtEvent: function(e) {
         return t.Interaction.modes.single(this, e)
        },
        getElementsAtEvent: function(e) {
         return t.Interaction.modes.label(this, e, {
          intersect: !0
         })
        },
        getElementsAtXAxis: function(e) {
         return t.Interaction.modes["x-axis"](this, e, {
          intersect: !0
         })
        },
        getElementsAtEventForMode: function(e, a, i) {
         var n = t.Interaction.modes[a];
         return "function" == typeof n ? n(this, e, i) : []
        },
        getDatasetAtEvent: function(e) {
         return t.Interaction.modes.dataset(this, e)
        },
        getDatasetMeta: function(t) {
         var e = this,
          a = e.data.datasets[t];
         a._meta || (a._meta = {});
         var i = a._meta[e.id];
         return i || (i = a._meta[e.id] = {
          type: null,
          data: [],
          dataset: null,
          controller: null,
          hidden: null,
          xAxisID: null,
          yAxisID: null
         }), i
        },
        getVisibleDatasetCount: function() {
         for (var t = 0, e = 0, a = this.data.datasets.length; a > e; ++e) this.isDatasetVisible(e) && t++;
         return t
        },
        isDatasetVisible: function(t) {
         var e = this.getDatasetMeta(t);
         return "boolean" == typeof e.hidden ? !e.hidden : !this.data.datasets[t].hidden
        },
        generateLegend: function() {
         return this.options.legendCallback(this)
        },
        destroy: function() {
         var e, a, n, o = this,
          l = o.chart.canvas;
         for (o.stop(), a = 0, n = o.data.datasets.length; n > a; ++a) e = o.getDatasetMeta(a), e.controller && (e.controller.destroy(), e.controller = null);
         l && (r.unbindEvents(o, o.events), r.removeResizeListener(l.parentNode), r.clear(o.chart), i(l), o.chart.canvas = null, o.chart.ctx = null), t.plugins.notify("destroy", [o]), delete t.instances[o.id]
        },
        toBase64Image: function() {
         return this.chart.canvas.toDataURL.apply(this.chart.canvas, arguments)
        },
        initToolTip: function() {
         var e = this;
         e.tooltip = new t.Tooltip({
          _chart: e.chart,
          _chartInstance: e,
          _data: e.data,
          _options: e.options.tooltips
         }, e), e.tooltip.initialize()
        },
        bindEvents: function() {
         var t = this;
         r.bindEvents(t, t.options.events, function(e) {
          t.eventHandler(e)
         })
        },
        updateHoverStyle: function(t, e, a) {
         var i, n, o, r = a ? "setHoverStyle" : "removeHoverStyle";
         for (n = 0, o = t.length; o > n; ++n) i = t[n], i && this.getDatasetMeta(i._datasetIndex).controller[r](i)
        },
        eventHandler: function(t) {
         var e = this,
          a = e.legend,
          i = e.tooltip,
          n = e.options.hover;
         e._bufferedRender = !0, e._bufferedRequest = null;
         var o = e.handleEvent(t);
         o |= a && a.handleEvent(t), o |= i && i.handleEvent(t);
         var r = e._bufferedRequest;
         return r ? e.render(r.duration, r.lazy) : o && !e.animating && (e.stop(), e.render(n.animationDuration, !0)), e._bufferedRender = !1, e._bufferedRequest = null, e
        },
        handleEvent: function(t) {
         var e = this,
          a = e.options || {},
          i = a.hover,
          n = !1;
         return e.lastActive = e.lastActive || [], "mouseout" === t.type ? e.active = [] : e.active = e.getElementsAtEventForMode(t, i.mode, i), i.onHover && i.onHover.call(e, e.active), ("mouseup" === t.type || "click" === t.type) && a.onClick && a.onClick.call(e, t, e.active), e.lastActive.length && e.updateHoverStyle(e.lastActive, i.mode, !1), e.active.length && i.mode && e.updateHoverStyle(e.active, i.mode, !0), n = !r.arrayEquals(e.active, e.lastActive), e.lastActive = e.active, n
        }
       })
      }
     }, {}],
     24: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       function e(t, e) {
        return t._chartjs ? void t._chartjs.listeners.push(e) : (Object.defineProperty(t, "_chartjs", {
         configurable: !0,
         enumerable: !1,
         value: {
          listeners: [e]
         }
        }), void n.forEach(function(e) {
         var a = "onData" + e.charAt(0).toUpperCase() + e.slice(1),
          n = t[e];
         Object.defineProperty(t, e, {
          configurable: !0,
          enumerable: !1,
          value: function() {
           var e = Array.prototype.slice.call(arguments),
            o = n.apply(this, e);
           return i.each(t._chartjs.listeners, function(t) {
            "function" == typeof t[a] && t[a].apply(t, e)
           }), o
          }
         })
        }))
       }
   
       function a(t, e) {
        var a = t._chartjs;
        if (a) {
         var i = a.listeners,
          o = i.indexOf(e); - 1 !== o && i.splice(o, 1), i.length > 0 || (n.forEach(function(e) {
          delete t[e]
         }), delete t._chartjs)
        }
       }
       var i = t.helpers,
        n = ["push", "pop", "shift", "splice", "unshift"];
       t.DatasetController = function(t, e) {
        this.initialize(t, e)
       }, i.extend(t.DatasetController.prototype, {
        datasetElementType: null,
        dataElementType: null,
        initialize: function(t, e) {
         var a = this;
         a.chart = t, a.index = e, a.linkScales(), a.addElements()
        },
        updateIndex: function(t) {
         this.index = t
        },
        linkScales: function() {
         var t = this,
          e = t.getMeta(),
          a = t.getDataset();
         null === e.xAxisID && (e.xAxisID = a.xAxisID || t.chart.options.scales.xAxes[0].id), null === e.yAxisID && (e.yAxisID = a.yAxisID || t.chart.options.scales.yAxes[0].id)
        },
        getDataset: function() {
         return this.chart.data.datasets[this.index]
        },
        getMeta: function() {
         return this.chart.getDatasetMeta(this.index)
        },
        getScaleForId: function(t) {
         return this.chart.scales[t]
        },
        reset: function() {
         this.update(!0)
        },
        destroy: function() {
         this._data && a(this._data, this)
        },
        createMetaDataset: function() {
         var t = this,
          e = t.datasetElementType;
         return e && new e({
          _chart: t.chart.chart,
          _datasetIndex: t.index
         })
        },
        createMetaData: function(t) {
         var e = this,
          a = e.dataElementType;
         return a && new a({
          _chart: e.chart.chart,
          _datasetIndex: e.index,
          _index: t
         })
        },
        addElements: function() {
         var t, e, a = this,
          i = a.getMeta(),
          n = a.getDataset().data || [],
          o = i.data;
         for (t = 0, e = n.length; e > t; ++t) o[t] = o[t] || a.createMetaData(t);
         i.dataset = i.dataset || a.createMetaDataset()
        },
        addElementAndReset: function(t) {
         var e = this.createMetaData(t);
         this.getMeta().data.splice(t, 0, e), this.updateElement(e, t, !0)
        },
        buildOrUpdateElements: function() {
         var t = this,
          i = t.getDataset(),
          n = i.data || (i.data = []);
         t._data !== n && (t._data && a(t._data, t), e(n, t), t._data = n), t.resyncElements()
        },
        update: i.noop,
        draw: function(t) {
         var e, a, i = t || 1,
          n = this.getMeta().data;
         for (e = 0, a = n.length; a > e; ++e) n[e].transition(i).draw()
        },
        removeHoverStyle: function(t, e) {
         var a = this.chart.data.datasets[t._datasetIndex],
          n = t._index,
          o = t.custom || {},
          r = i.getValueAtIndexOrDefault,
          l = t._model;
         l.backgroundColor = o.backgroundColor ? o.backgroundColor : r(a.backgroundColor, n, e.backgroundColor), l.borderColor = o.borderColor ? o.borderColor : r(a.borderColor, n, e.borderColor), l.borderWidth = o.borderWidth ? o.borderWidth : r(a.borderWidth, n, e.borderWidth)
        },
        setHoverStyle: function(t) {
         var e = this.chart.data.datasets[t._datasetIndex],
          a = t._index,
          n = t.custom || {},
          o = i.getValueAtIndexOrDefault,
          r = i.getHoverColor,
          l = t._model;
         l.backgroundColor = n.hoverBackgroundColor ? n.hoverBackgroundColor : o(e.hoverBackgroundColor, a, r(l.backgroundColor)), l.borderColor = n.hoverBorderColor ? n.hoverBorderColor : o(e.hoverBorderColor, a, r(l.borderColor)), l.borderWidth = n.hoverBorderWidth ? n.hoverBorderWidth : o(e.hoverBorderWidth, a, l.borderWidth)
        },
        resyncElements: function() {
         var t = this,
          e = t.getMeta(),
          a = t.getDataset().data,
          i = e.data.length,
          n = a.length;
         i > n ? e.data.splice(n, i - n) : n > i && t.insertElements(i, n - i)
        },
        insertElements: function(t, e) {
         for (var a = 0; e > a; ++a) this.addElementAndReset(t + a)
        },
        onDataPush: function() {
         this.insertElements(this.getDataset().data.length - 1, arguments.length)
        },
        onDataPop: function() {
         this.getMeta().data.pop()
        },
        onDataShift: function() {
         this.getMeta().data.shift()
        },
        onDataSplice: function(t, e) {
         this.getMeta().data.splice(t, e), this.insertElements(t, arguments.length - 2)
        },
        onDataUnshift: function() {
         this.insertElements(0, arguments.length)
        }
       }), t.DatasetController.extend = i.inherits
      }
     }, {}],
     25: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       var e = t.helpers;
       t.elements = {}, t.Element = function(t) {
        e.extend(this, t), this.initialize.apply(this, arguments)
       }, e.extend(t.Element.prototype, {
        initialize: function() {
         this.hidden = !1
        },
        pivot: function() {
         var t = this;
         return t._view || (t._view = e.clone(t._model)), t._start = e.clone(t._view), t
        },
        transition: function(t) {
         var a = this;
         return a._view || (a._view = e.clone(a._model)), 1 === t ? (a._view = a._model, a._start = null, a) : (a._start || a.pivot(), e.each(a._model, function(i, n) {
          if ("_" === n[0]);
          else if (a._view.hasOwnProperty(n))
           if (i === a._view[n]);
           else if ("string" == typeof i) try {
           var o = e.color(a._model[n]).mix(e.color(a._start[n]), t);
           a._view[n] = o.rgbString()
          } catch (r) {
           a._view[n] = i
          } else if ("number" == typeof i) {
           var l = void 0 !== a._start[n] && isNaN(a._start[n]) === !1 ? a._start[n] : 0;
           a._view[n] = (a._model[n] - l) * t + l
          } else a._view[n] = i;
          else "number" != typeof i || isNaN(a._view[n]) ? a._view[n] = i : a._view[n] = i * t
         }, a), a)
        },
        tooltipPosition: function() {
         return {
          x: this._model.x,
          y: this._model.y
         }
        },
        hasValue: function() {
         return e.isNumber(this._model.x) && e.isNumber(this._model.y)
        }
       }), t.Element.extend = e.inherits
      }
     }, {}],
     26: [function(t, e, a) {
      "use strict";
      var i = t(3);
      e.exports = function(t) {
       function e(t, e, a) {
        var i;
        return "string" == typeof t ? (i = parseInt(t, 10), -1 !== t.indexOf("%") && (i = i / 100 * e.parentNode[a])) : i = t, i
       }
   
       function a(t) {
        return void 0 !== t && null !== t && "none" !== t
       }
   
       function n(t, i, n) {
        var o = document.defaultView,
         r = t.parentNode,
         l = o.getComputedStyle(t)[i],
         s = o.getComputedStyle(r)[i],
         d = a(l),
         u = a(s),
         c = Number.POSITIVE_INFINITY;
        return d || u ? Math.min(d ? e(l, t, n) : c, u ? e(s, r, n) : c) : "none"
       }
       var o = t.helpers = {};
       o.each = function(t, e, a, i) {
        var n, r;
        if (o.isArray(t))
         if (r = t.length, i)
          for (n = r - 1; n >= 0; n--) e.call(a, t[n], n);
         else
          for (n = 0; r > n; n++) e.call(a, t[n], n);
        else if ("object" == typeof t) {
         var l = Object.keys(t);
         for (r = l.length, n = 0; r > n; n++) e.call(a, t[l[n]], l[n])
        }
       }, o.clone = function(t) {
        var e = {};
        return o.each(t, function(t, a) {
         o.isArray(t) ? e[a] = t.slice(0) : "object" == typeof t && null !== t ? e[a] = o.clone(t) : e[a] = t
        }), e
       }, o.extend = function(t) {
        for (var e = function(e, a) {
          t[a] = e
         }, a = 1, i = arguments.length; i > a; a++) o.each(arguments[a], e);
        return t
       }, o.configMerge = function(e) {
        var a = o.clone(e);
        return o.each(Array.prototype.slice.call(arguments, 1), function(e) {
         o.each(e, function(e, i) {
          var n = a.hasOwnProperty(i),
           r = n ? a[i] : {};
          "scales" === i ? a[i] = o.scaleMerge(r, e) : "scale" === i ? a[i] = o.configMerge(r, t.scaleService.getScaleDefaults(e.type), e) : !n || "object" != typeof r || o.isArray(r) || null === r || "object" != typeof e || o.isArray(e) ? a[i] = e : a[i] = o.configMerge(r, e)
         })
        }), a
       }, o.scaleMerge = function(e, a) {
        var i = o.clone(e);
        return o.each(a, function(e, a) {
         "xAxes" === a || "yAxes" === a ? i.hasOwnProperty(a) ? o.each(e, function(e, n) {
          var r = o.getValueOrDefault(e.type, "xAxes" === a ? "category" : "linear"),
           l = t.scaleService.getScaleDefaults(r);
          n >= i[a].length || !i[a][n].type ? i[a].push(o.configMerge(l, e)) : e.type && e.type !== i[a][n].type ? i[a][n] = o.configMerge(i[a][n], l, e) : i[a][n] = o.configMerge(i[a][n], e)
         }) : (i[a] = [], o.each(e, function(e) {
          var n = o.getValueOrDefault(e.type, "xAxes" === a ? "category" : "linear");
          i[a].push(o.configMerge(t.scaleService.getScaleDefaults(n), e))
         })) : i.hasOwnProperty(a) && "object" == typeof i[a] && null !== i[a] && "object" == typeof e ? i[a] = o.configMerge(i[a], e) : i[a] = e
        }), i
       }, o.getValueAtIndexOrDefault = function(t, e, a) {
        return void 0 === t || null === t ? a : o.isArray(t) ? e < t.length ? t[e] : a : t
       }, o.getValueOrDefault = function(t, e) {
        return void 0 === t ? e : t
       }, o.indexOf = Array.prototype.indexOf ? function(t, e) {
        return t.indexOf(e)
       } : function(t, e) {
        for (var a = 0, i = t.length; i > a; ++a)
         if (t[a] === e) return a;
        return -1
       }, o.where = function(t, e) {
        if (o.isArray(t) && Array.prototype.filter) return t.filter(e);
        var a = [];
        return o.each(t, function(t) {
         e(t) && a.push(t)
        }), a
       }, o.findIndex = Array.prototype.findIndex ? function(t, e, a) {
        return t.findIndex(e, a)
       } : function(t, e, a) {
        a = void 0 === a ? t : a;
        for (var i = 0, n = t.length; n > i; ++i)
         if (e.call(a, t[i], i, t)) return i;
        return -1
       }, o.findNextWhere = function(t, e, a) {
        (void 0 === a || null === a) && (a = -1);
        for (var i = a + 1; i < t.length; i++) {
         var n = t[i];
         if (e(n)) return n
        }
       }, o.findPreviousWhere = function(t, e, a) {
        (void 0 === a || null === a) && (a = t.length);
        for (var i = a - 1; i >= 0; i--) {
         var n = t[i];
         if (e(n)) return n
        }
       }, o.inherits = function(t) {
        var e = this,
         a = t && t.hasOwnProperty("constructor") ? t.constructor : function() {
          return e.apply(this, arguments)
         },
         i = function() {
          this.constructor = a
         };
        return i.prototype = e.prototype, a.prototype = new i, a.extend = o.inherits, t && o.extend(a.prototype, t), a.__super__ = e.prototype, a
       }, o.noop = function() {}, o.uid = function() {
        var t = 0;
        return function() {
         return t++
        }
       }(), o.isNumber = function(t) {
        return !isNaN(parseFloat(t)) && isFinite(t)
       }, o.almostEquals = function(t, e, a) {
        return Math.abs(t - e) < a
       }, o.max = function(t) {
        return t.reduce(function(t, e) {
         return isNaN(e) ? t : Math.max(t, e)
        }, Number.NEGATIVE_INFINITY)
       }, o.min = function(t) {
        return t.reduce(function(t, e) {
         return isNaN(e) ? t : Math.min(t, e)
        }, Number.POSITIVE_INFINITY)
       }, o.sign = Math.sign ? function(t) {
        return Math.sign(t)
       } : function(t) {
        return t = +t, 0 === t || isNaN(t) ? t : t > 0 ? 1 : -1
       }, o.log10 = Math.log10 ? function(t) {
        return Math.log10(t)
       } : function(t) {
        return Math.log(t) / Math.LN10
       }, o.toRadians = function(t) {
        return t * (Math.PI / 180)
       }, o.toDegrees = function(t) {
        return t * (180 / Math.PI)
       }, o.getAngleFromPoint = function(t, e) {
        var a = e.x - t.x,
         i = e.y - t.y,
         n = Math.sqrt(a * a + i * i),
         o = Math.atan2(i, a);
        return o < -.5 * Math.PI && (o += 2 * Math.PI), {
         angle: o,
         distance: n
        }
       }, o.distanceBetweenPoints = function(t, e) {
        return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2))
       }, o.aliasPixel = function(t) {
        return t % 2 === 0 ? 0 : .5
       }, o.splineCurve = function(t, e, a, i) {
        var n = t.skip ? e : t,
         o = e,
         r = a.skip ? e : a,
         l = Math.sqrt(Math.pow(o.x - n.x, 2) + Math.pow(o.y - n.y, 2)),
         s = Math.sqrt(Math.pow(r.x - o.x, 2) + Math.pow(r.y - o.y, 2)),
         d = l / (l + s),
         u = s / (l + s);
        d = isNaN(d) ? 0 : d, u = isNaN(u) ? 0 : u;
        var c = i * d,
         h = i * u;
        return {
         previous: {
          x: o.x - c * (r.x - n.x),
          y: o.y - c * (r.y - n.y)
         },
         next: {
          x: o.x + h * (r.x - n.x),
          y: o.y + h * (r.y - n.y)
         }
        }
       }, o.EPSILON = Number.EPSILON || 1e-14, o.splineCurveMonotone = function(t) {
        var e, a, i, n, r = (t || []).map(function(t) {
          return {
           model: t._model,
           deltaK: 0,
           mK: 0
          }
         }),
         l = r.length;
        for (e = 0; l > e; ++e) i = r[e], i.model.skip || (a = e > 0 ? r[e - 1] : null, n = l - 1 > e ? r[e + 1] : null, n && !n.model.skip && (i.deltaK = (n.model.y - i.model.y) / (n.model.x - i.model.x)), !a || a.model.skip ? i.mK = i.deltaK : !n || n.model.skip ? i.mK = a.deltaK : this.sign(a.deltaK) !== this.sign(i.deltaK) ? i.mK = 0 : i.mK = (a.deltaK + i.deltaK) / 2);
        var s, d, u, c;
        for (e = 0; l - 1 > e; ++e) i = r[e], n = r[e + 1], i.model.skip || n.model.skip || (o.almostEquals(i.deltaK, 0, this.EPSILON) ? i.mK = n.mK = 0 : (s = i.mK / i.deltaK, d = n.mK / i.deltaK, c = Math.pow(s, 2) + Math.pow(d, 2), 9 >= c || (u = 3 / Math.sqrt(c), i.mK = s * u * i.deltaK, n.mK = d * u * i.deltaK)));
        var h;
        for (e = 0; l > e; ++e) i = r[e], i.model.skip || (a = e > 0 ? r[e - 1] : null, n = l - 1 > e ? r[e + 1] : null, a && !a.model.skip && (h = (i.model.x - a.model.x) / 3, i.model.controlPointPreviousX = i.model.x - h, i.model.controlPointPreviousY = i.model.y - h * i.mK), n && !n.model.skip && (h = (n.model.x - i.model.x) / 3, i.model.controlPointNextX = i.model.x + h, i.model.controlPointNextY = i.model.y + h * i.mK))
       }, o.nextItem = function(t, e, a) {
        return a ? e >= t.length - 1 ? t[0] : t[e + 1] : e >= t.length - 1 ? t[t.length - 1] : t[e + 1]
       }, o.previousItem = function(t, e, a) {
        return a ? 0 >= e ? t[t.length - 1] : t[e - 1] : 0 >= e ? t[0] : t[e - 1]
       }, o.niceNum = function(t, e) {
        var a, i = Math.floor(o.log10(t)),
         n = t / Math.pow(10, i);
        return a = e ? 1.5 > n ? 1 : 3 > n ? 2 : 7 > n ? 5 : 10 : 1 >= n ? 1 : 2 >= n ? 2 : 5 >= n ? 5 : 10, a * Math.pow(10, i)
       };
       var r = o.easingEffects = {
        linear: function(t) {
         return t
        },
        easeInQuad: function(t) {
         return t * t
        },
        easeOutQuad: function(t) {
         return -1 * t * (t - 2)
        },
        easeInOutQuad: function(t) {
         return (t /= .5) < 1 ? .5 * t * t : -0.5 * (--t * (t - 2) - 1)
        },
        easeInCubic: function(t) {
         return t * t * t
        },
        easeOutCubic: function(t) {
         return 1 * ((t = t / 1 - 1) * t * t + 1)
        },
        easeInOutCubic: function(t) {
         return (t /= .5) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2)
        },
        easeInQuart: function(t) {
         return t * t * t * t
        },
        easeOutQuart: function(t) {
         return -1 * ((t = t / 1 - 1) * t * t * t - 1)
        },
        easeInOutQuart: function(t) {
         return (t /= .5) < 1 ? .5 * t * t * t * t : -0.5 * ((t -= 2) * t * t * t - 2)
        },
        easeInQuint: function(t) {
         return 1 * (t /= 1) * t * t * t * t
        },
        easeOutQuint: function(t) {
         return 1 * ((t = t / 1 - 1) * t * t * t * t + 1)
        },
        easeInOutQuint: function(t) {
         return (t /= .5) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2)
        },
        easeInSine: function(t) {
         return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1
        },
        easeOutSine: function(t) {
         return 1 * Math.sin(t / 1 * (Math.PI / 2))
        },
        easeInOutSine: function(t) {
         return -0.5 * (Math.cos(Math.PI * t / 1) - 1)
        },
        easeInExpo: function(t) {
         return 0 === t ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1))
        },
        easeOutExpo: function(t) {
         return 1 === t ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1)
        },
        easeInOutExpo: function(t) {
         return 0 === t ? 0 : 1 === t ? 1 : (t /= .5) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (-Math.pow(2, -10 * --t) + 2)
        },
        easeInCirc: function(t) {
         return t >= 1 ? t : -1 * (Math.sqrt(1 - (t /= 1) * t) - 1)
        },
        easeOutCirc: function(t) {
         return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t)
        },
        easeInOutCirc: function(t) {
         return (t /= .5) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
        },
        easeInElastic: function(t) {
         var e = 1.70158,
          a = 0,
          i = 1;
         return 0 === t ? 0 : 1 === (t /= 1) ? 1 : (a || (a = .3), i < Math.abs(1) ? (i = 1, e = a / 4) : e = a / (2 * Math.PI) * Math.asin(1 / i), -(i * Math.pow(2, 10 * (t -= 1)) * Math.sin((1 * t - e) * (2 * Math.PI) / a)))
        },
        easeOutElastic: function(t) {
         var e = 1.70158,
          a = 0,
          i = 1;
         return 0 === t ? 0 : 1 === (t /= 1) ? 1 : (a || (a = .3), i < Math.abs(1) ? (i = 1, e = a / 4) : e = a / (2 * Math.PI) * Math.asin(1 / i), i * Math.pow(2, -10 * t) * Math.sin((1 * t - e) * (2 * Math.PI) / a) + 1)
        },
        easeInOutElastic: function(t) {
         var e = 1.70158,
          a = 0,
          i = 1;
         return 0 === t ? 0 : 2 === (t /= .5) ? 1 : (a || (a = 1 * (.3 * 1.5)), i < Math.abs(1) ? (i = 1, e = a / 4) : e = a / (2 * Math.PI) * Math.asin(1 / i), 1 > t ? -.5 * (i * Math.pow(2, 10 * (t -= 1)) * Math.sin((1 * t - e) * (2 * Math.PI) / a)) : i * Math.pow(2, -10 * (t -= 1)) * Math.sin((1 * t - e) * (2 * Math.PI) / a) * .5 + 1)
        },
        easeInBack: function(t) {
         var e = 1.70158;
         return 1 * (t /= 1) * t * ((e + 1) * t - e)
        },
        easeOutBack: function(t) {
         var e = 1.70158;
         return 1 * ((t = t / 1 - 1) * t * ((e + 1) * t + e) + 1)
        },
        easeInOutBack: function(t) {
         var e = 1.70158;
         return (t /= .5) < 1 ? .5 * (t * t * (((e *= 1.525) + 1) * t - e)) : .5 * ((t -= 2) * t * (((e *= 1.525) + 1) * t + e) + 2)
        },
        easeInBounce: function(t) {
         return 1 - r.easeOutBounce(1 - t)
        },
        easeOutBounce: function(t) {
         return (t /= 1) < 1 / 2.75 ? 1 * (7.5625 * t * t) : 2 / 2.75 > t ? 1 * (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 * (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
        },
        easeInOutBounce: function(t) {
         return .5 > t ? .5 * r.easeInBounce(2 * t) : .5 * r.easeOutBounce(2 * t - 1) + .5
        }
       };
       o.requestAnimFrame = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t) {
         return window.setTimeout(t, 1e3 / 60)
        }
       }(), o.cancelAnimFrame = function() {
        return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || function(t) {
         return window.clearTimeout(t, 1e3 / 60)
        }
       }(), o.getRelativePosition = function(t, e) {
        var a, i, n = t.originalEvent || t,
         r = t.currentTarget || t.srcElement,
         l = r.getBoundingClientRect(),
         s = n.touches;
        s && s.length > 0 ? (a = s[0].clientX, i = s[0].clientY) : (a = n.clientX, i = n.clientY);
        var d = parseFloat(o.getStyle(r, "padding-left")),
         u = parseFloat(o.getStyle(r, "padding-top")),
         c = parseFloat(o.getStyle(r, "padding-right")),
         h = parseFloat(o.getStyle(r, "padding-bottom")),
         f = l.right - l.left - d - c,
         g = l.bottom - l.top - u - h;
        return a = Math.round((a - l.left - d) / f * r.width / e.currentDevicePixelRatio), i = Math.round((i - l.top - u) / g * r.height / e.currentDevicePixelRatio), {
         x: a,
         y: i
        }
       }, o.addEvent = function(t, e, a) {
        t.addEventListener ? t.addEventListener(e, a) : t.attachEvent ? t.attachEvent("on" + e, a) : t["on" + e] = a
       }, o.removeEvent = function(t, e, a) {
        t.removeEventListener ? t.removeEventListener(e, a, !1) : t.detachEvent ? t.detachEvent("on" + e, a) : t["on" + e] = o.noop
       }, o.bindEvents = function(t, e, a) {
        var i = t.events = t.events || {};
        o.each(e, function(e) {
         i[e] = function() {
          a.apply(t, arguments)
         }, o.addEvent(t.chart.canvas, e, i[e])
        })
       }, o.unbindEvents = function(t, e) {
        var a = t.chart.canvas;
        o.each(e, function(t, e) {
         o.removeEvent(a, e, t)
        })
       }, o.getConstraintWidth = function(t) {
        return n(t, "max-width", "clientWidth")
       }, o.getConstraintHeight = function(t) {
        return n(t, "max-height", "clientHeight")
       }, o.getMaximumWidth = function(t) {
        var e = t.parentNode,
         a = parseInt(o.getStyle(e, "padding-left"), 10),
         i = parseInt(o.getStyle(e, "padding-right"), 10),
         n = e.clientWidth - a - i,
         r = o.getConstraintWidth(t);
        return isNaN(r) ? n : Math.min(n, r)
       }, o.getMaximumHeight = function(t) {
        var e = t.parentNode,
         a = parseInt(o.getStyle(e, "padding-top"), 10),
         i = parseInt(o.getStyle(e, "padding-bottom"), 10),
         n = e.clientHeight - a - i,
         r = o.getConstraintHeight(t);
        return isNaN(r) ? n : Math.min(n, r)
       }, o.getStyle = function(t, e) {
        return t.currentStyle ? t.currentStyle[e] : document.defaultView.getComputedStyle(t, null).getPropertyValue(e)
       }, o.retinaScale = function(t) {
        var e = t.currentDevicePixelRatio = window.devicePixelRatio || 1;
        if (1 !== e) {
         var a = t.canvas,
          i = t.height,
          n = t.width;
         a.height = i * e, a.width = n * e, t.ctx.scale(e, e), a.style.height = i + "px", a.style.width = n + "px"
        }
       }, o.clear = function(t) {
        t.ctx.clearRect(0, 0, t.width, t.height)
       }, o.fontString = function(t, e, a) {
        return e + " " + t + "px " + a
       }, o.longestText = function(t, e, a, i) {
        i = i || {};
        var n = i.data = i.data || {},
         r = i.garbageCollect = i.garbageCollect || [];
        i.font !== e && (n = i.data = {}, r = i.garbageCollect = [], i.font = e), t.font = e;
        var l = 0;
        o.each(a, function(e) {
         void 0 !== e && null !== e && o.isArray(e) !== !0 ? l = o.measureText(t, n, r, l, e) : o.isArray(e) && o.each(e, function(e) {
          void 0 === e || null === e || o.isArray(e) || (l = o.measureText(t, n, r, l, e))
         })
        });
        var s = r.length / 2;
        if (s > a.length) {
         for (var d = 0; s > d; d++) delete n[r[d]];
         r.splice(0, s)
        }
        return l
       }, o.measureText = function(t, e, a, i, n) {
        var o = e[n];
        return o || (o = e[n] = t.measureText(n).width, a.push(n)), o > i && (i = o), i
       }, o.numberOfLabelLines = function(t) {
        var e = 1;
        return o.each(t, function(t) {
         o.isArray(t) && t.length > e && (e = t.length)
        }), e
       }, o.drawRoundedRectangle = function(t, e, a, i, n, o) {
        t.beginPath(), t.moveTo(e + o, a), t.lineTo(e + i - o, a), t.quadraticCurveTo(e + i, a, e + i, a + o), t.lineTo(e + i, a + n - o), t.quadraticCurveTo(e + i, a + n, e + i - o, a + n), t.lineTo(e + o, a + n), t.quadraticCurveTo(e, a + n, e, a + n - o), t.lineTo(e, a + o), t.quadraticCurveTo(e, a, e + o, a), t.closePath()
       }, o.color = function(e) {
        return i ? i(e instanceof CanvasGradient ? t.defaults.global.defaultColor : e) : (console.error("Color.js not found!"), e)
       }, o.addResizeListener = function(t, e) {
        var a = document.createElement("iframe");
        a.className = "chartjs-hidden-iframe", a.style.cssText = "display:block;overflow:hidden;border:0;margin:0;top:0;left:0;bottom:0;right:0;height:100%;width:100%;position:absolute;pointer-events:none;z-index:-1;", a.tabIndex = -1;
        var i = t._chartjs = {
          resizer: a,
          ticking: !1
         },
         n = function() {
          i.ticking || (i.ticking = !0, o.requestAnimFrame.call(window, function() {
           return i.resizer ? (i.ticking = !1, e()) : void 0
          }))
         };
        o.addEvent(a, "load", function() {
         o.addEvent(a.contentWindow || a, "resize", n), n()
        }), t.insertBefore(a, t.firstChild)
       }, o.removeResizeListener = function(t) {
        if (t && t._chartjs) {
         var e = t._chartjs.resizer;
         e && (e.parentNode.removeChild(e), t._chartjs.resizer = null), delete t._chartjs
        }
       }, o.isArray = Array.isArray ? function(t) {
        return Array.isArray(t)
       } : function(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
       }, o.arrayEquals = function(t, e) {
        var a, i, n, r;
        if (!t || !e || t.length !== e.length) return !1;
        for (a = 0, i = t.length; i > a; ++a)
         if (n = t[a], r = e[a], n instanceof Array && r instanceof Array) {
          if (!o.arrayEquals(n, r)) return !1
         } else if (n !== r) return !1;
        return !0
       }, o.callCallback = function(t, e, a) {
        t && "function" == typeof t.call && t.apply(a, e)
       }, o.getHoverColor = function(t) {
        return t instanceof CanvasPattern ? t : o.color(t).saturate(.5).darken(.1).rgbString()
       }
      }
     }, {
      3: 3
     }],
     27: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       function e(t, e) {
        var a, i, n, o, r, l = t.data.datasets;
        for (i = 0, o = l.length; o > i; ++i)
         if (t.isDatasetVisible(i))
          for (a = t.getDatasetMeta(i), n = 0, r = a.data.length; r > n; ++n) {
           var s = a.data[n];
           s._view.skip || e(s)
          }
       }
   
       function a(t, a) {
        var i = [];
        return e(t, function(t) {
         t.inRange(a.x, a.y) && i.push(t)
        }), i
       }
   
       function i(t, a, i, n) {
        var r = Number.POSITIVE_INFINITY,
         l = [];
        return n || (n = o.distanceBetweenPoints), e(t, function(t) {
         if (!i || t.inRange(a.x, a.y)) {
          var e = t.getCenterPoint(),
           o = n(a, e);
          r > o ? (l = [t], r = o) : o === r && l.push(t)
         }
        }), l
       }
   
       function n(t, e, n) {
        var r = o.getRelativePosition(e, t.chart),
         l = function(t, e) {
          return Math.abs(t.x - e.x)
         },
         s = n.intersect ? a(t, r) : i(t, r, !1, l),
         d = [];
        return s.length ? (t.data.datasets.forEach(function(e, a) {
         if (t.isDatasetVisible(a)) {
          var i = t.getDatasetMeta(a),
           n = i.data[s[0]._index];
          n && !n._view.skip && d.push(n)
         }
        }), d) : []
       }
       var o = t.helpers;
       t.Interaction = {
        modes: {
         single: function(t, a) {
          var i = o.getRelativePosition(a, t.chart),
           n = [];
          return e(t, function(t) {
           return t.inRange(i.x, i.y) ? (n.push(t), n) : void 0
          }), n.slice(0, 1)
         },
         label: n,
         index: n,
         dataset: function(t, e, n) {
          var r = o.getRelativePosition(e, t.chart),
           l = n.intersect ? a(t, r) : i(t, r, !1);
          return l.length > 0 && (l = t.getDatasetMeta(l[0]._datasetIndex).data), l
         },
         "x-axis": function(t, e) {
          return n(t, e, !0)
         },
         point: function(t, e) {
          var i = o.getRelativePosition(e, t.chart);
          return a(t, i)
         },
         nearest: function(t, e, a) {
          var n = o.getRelativePosition(e, t.chart),
           r = i(t, n, a.intersect);
          return r.length > 1 && r.sort(function(t, e) {
           var a = t.getArea(),
            i = e.getArea(),
            n = a - i;
           return 0 === n && (n = t._datasetIndex - e._datasetIndex), n
          }), r.slice(0, 1)
         },
         x: function(t, a, i) {
          var n = o.getRelativePosition(a, t.chart),
           r = [],
           l = !1;
          return e(t, function(t) {
           t.inXRange(n.x) && r.push(t), t.inRange(n.x, n.y) && (l = !0)
          }), i.intersect && !l && (r = []), r
         },
         y: function(t, a, i) {
          var n = o.getRelativePosition(a, t.chart),
           r = [],
           l = !1;
          return e(t, function(t) {
           t.inYRange(n.y) && r.push(t), t.inRange(n.x, n.y) && (l = !0)
          }), i.intersect && !l && (r = []), r
         }
        }
       }
      }
     }, {}],
     28: [function(t, e, a) {
      "use strict";
      e.exports = function() {
       var t = function(e, a) {
        return this.controller = new t.Controller(e, a, this), this.controller
       };
       return t.defaults = {
        global: {
         responsive: !0,
         responsiveAnimationDuration: 0,
         maintainAspectRatio: !0,
         events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
         hover: {
          onHover: null,
          mode: "nearest",
          intersect: !0,
          animationDuration: 400
         },
         onClick: null,
         defaultColor: "rgba(0,0,0,0.1)",
         defaultFontColor: "#666",
         defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
         defaultFontSize: 12,
         defaultFontStyle: "normal",
         showLines: !0,
         elements: {},
         legendCallback: function(t) {
          var e = [];
          e.push('<ul class="' + t.id + '-legend">');
          for (var a = 0; a < t.data.datasets.length; a++) e.push('<li><span style="background-color:' + t.data.datasets[a].backgroundColor + '"></span>'), t.data.datasets[a].label && e.push(t.data.datasets[a].label), e.push("</li>");
          return e.push("</ul>"), e.join("")
         }
        }
       }, t.Chart = t, t
      }
     }, {}],
     29: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       var e = t.helpers;
       t.layoutService = {
        defaults: {},
        addBox: function(t, e) {
         t.boxes || (t.boxes = []), t.boxes.push(e)
        },
        removeBox: function(t, e) {
         t.boxes && t.boxes.splice(t.boxes.indexOf(e), 1)
        },
        update: function(t, a, i) {
         function n(t) {
          var e, a = t.isHorizontal();
          a ? (e = t.update(t.options.fullWidth ? x : C, M), D -= e.height) : (e = t.update(w, S), C -= e.width), I.push({
           horizontal: a,
           minSize: e,
           box: t
          })
         }
   
         function o(t) {
          var a = e.findNextWhere(I, function(e) {
           return e.box === t
          });
          if (a)
           if (t.isHorizontal()) {
            var i = {
             left: A,
             right: T,
             top: 0,
             bottom: 0
            };
            t.update(t.options.fullWidth ? x : C, y / 2, i)
           } else t.update(a.minSize.width, D)
         }
   
         function r(t) {
          var a = e.findNextWhere(I, function(e) {
            return e.box === t
           }),
           i = {
            left: 0,
            right: 0,
            top: P,
            bottom: F
           };
          a && t.update(a.minSize.width, D, i)
         }
   
         function l(t) {
          t.isHorizontal() ? (t.left = t.options.fullWidth ? u : A, t.right = t.options.fullWidth ? a - c : A + C, t.top = L, t.bottom = L + t.height, L = t.bottom) : (t.left = V, t.right = V + t.width, t.top = P, t.bottom = P + D, V = t.right)
         }
         if (t) {
          var s = t.options.layout,
           d = s ? s.padding : null,
           u = 0,
           c = 0,
           h = 0,
           f = 0;
          isNaN(d) ? (u = d.left || 0, c = d.right || 0, h = d.top || 0, f = d.bottom || 0) : (u = d, c = d, h = d, f = d);
          var g = e.where(t.boxes, function(t) {
            return "left" === t.options.position
           }),
           p = e.where(t.boxes, function(t) {
            return "right" === t.options.position
           }),
           m = e.where(t.boxes, function(t) {
            return "top" === t.options.position
           }),
           b = e.where(t.boxes, function(t) {
            return "bottom" === t.options.position
           }),
           v = e.where(t.boxes, function(t) {
            return "chartArea" === t.options.position
           });
          m.sort(function(t, e) {
           return (e.options.fullWidth ? 1 : 0) - (t.options.fullWidth ? 1 : 0)
          }), b.sort(function(t, e) {
           return (t.options.fullWidth ? 1 : 0) - (e.options.fullWidth ? 1 : 0)
          });
          var x = a - u - c,
           y = i - h - f,
           k = x / 2,
           S = y / 2,
           w = (a - k) / (g.length + p.length),
           M = (i - S) / (m.length + b.length),
           C = x,
           D = y,
           I = [];
          e.each(g.concat(p, m, b), n);
          var A = u,
           T = c,
           P = h,
           F = f;
          e.each(g.concat(p), o), e.each(g, function(t) {
           A += t.width
          }), e.each(p, function(t) {
           T += t.width
          }), e.each(m.concat(b), o), e.each(m, function(t) {
           P += t.height
          }), e.each(b, function(t) {
           F += t.height
          }), e.each(g.concat(p), r), A = u, T = c, P = h, F = f, e.each(g, function(t) {
           A += t.width
          }), e.each(p, function(t) {
           T += t.width
          }), e.each(m, function(t) {
           P += t.height
          }), e.each(b, function(t) {
           F += t.height
          });
          var _ = i - P - F,
           R = a - A - T;
          (R !== C || _ !== D) && (e.each(g, function(t) {
           t.height = _
          }), e.each(p, function(t) {
           t.height = _
          }), e.each(m, function(t) {
           t.options.fullWidth || (t.width = R)
          }), e.each(b, function(t) {
           t.options.fullWidth || (t.width = R)
          }), D = _, C = R);
          var V = u,
           L = h;
          e.each(g.concat(m), l), V += C, L += D, e.each(p, l), e.each(b, l), t.chartArea = {
           left: A,
           top: P,
           right: A + C,
           bottom: P + D
          }, e.each(v, function(e) {
           e.left = t.chartArea.left, e.top = t.chartArea.top, e.right = t.chartArea.right, e.bottom = t.chartArea.bottom, e.update(C, D)
          })
         }
        }
       }
      }
     }, {}],
     30: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       function e(t, e) {
        return t.usePointStyle ? e * Math.SQRT2 : t.boxWidth
       }
       var a = t.helpers,
        i = a.noop;
       t.defaults.global.legend = {
        display: !0,
        position: "top",
        fullWidth: !0,
        reverse: !1,
        onClick: function(t, e) {
         var a = e.datasetIndex,
          i = this.chart,
          n = i.getDatasetMeta(a);
         n.hidden = null === n.hidden ? !i.data.datasets[a].hidden : null, i.update()
        },
        onHover: null,
        labels: {
         boxWidth: 40,
         padding: 10,
         generateLabels: function(t) {
          var e = t.data;
          return a.isArray(e.datasets) ? e.datasets.map(function(e, i) {
           return {
            text: e.label,
            fillStyle: a.isArray(e.backgroundColor) ? e.backgroundColor[0] : e.backgroundColor,
            hidden: !t.isDatasetVisible(i),
            lineCap: e.borderCapStyle,
            lineDash: e.borderDash,
            lineDashOffset: e.borderDashOffset,
            lineJoin: e.borderJoinStyle,
            lineWidth: e.borderWidth,
            strokeStyle: e.borderColor,
            pointStyle: e.pointStyle,
            datasetIndex: i
           }
          }, this) : []
         }
        }
       }, t.Legend = t.Element.extend({
        initialize: function(t) {
         a.extend(this, t), this.legendHitBoxes = [], this.doughnutMode = !1
        },
        beforeUpdate: i,
        update: function(t, e, a) {
         var i = this;
         return i.beforeUpdate(), i.maxWidth = t, i.maxHeight = e, i.margins = a, i.beforeSetDimensions(), i.setDimensions(), i.afterSetDimensions(), i.beforeBuildLabels(), i.buildLabels(), i.afterBuildLabels(), i.beforeFit(), i.fit(), i.afterFit(), i.afterUpdate(), i.minSize
        },
        afterUpdate: i,
        beforeSetDimensions: i,
        setDimensions: function() {
         var t = this;
         t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, t.paddingBottom = 0, t.minSize = {
          width: 0,
          height: 0
         }
        },
        afterSetDimensions: i,
        beforeBuildLabels: i,
        buildLabels: function() {
         var t = this;
         t.legendItems = t.options.labels.generateLabels.call(t, t.chart), t.options.reverse && t.legendItems.reverse()
        },
        afterBuildLabels: i,
        beforeFit: i,
        fit: function() {
         var i = this,
          n = i.options,
          o = n.labels,
          r = n.display,
          l = i.ctx,
          s = t.defaults.global,
          d = a.getValueOrDefault,
          u = d(o.fontSize, s.defaultFontSize),
          c = d(o.fontStyle, s.defaultFontStyle),
          h = d(o.fontFamily, s.defaultFontFamily),
          f = a.fontString(u, c, h),
          g = i.legendHitBoxes = [],
          p = i.minSize,
          m = i.isHorizontal();
         if (m ? (p.width = i.maxWidth, p.height = r ? 10 : 0) : (p.width = r ? 10 : 0, p.height = i.maxHeight), r)
          if (l.font = f, m) {
           var b = i.lineWidths = [0],
            v = i.legendItems.length ? u + o.padding : 0;
           l.textAlign = "left", l.textBaseline = "top", a.each(i.legendItems, function(t, a) {
            var n = e(o, u),
             r = n + u / 2 + l.measureText(t.text).width;
            b[b.length - 1] + r + o.padding >= i.width && (v += u + o.padding, b[b.length] = i.left), g[a] = {
             left: 0,
             top: 0,
             width: r,
             height: u
            }, b[b.length - 1] += r + o.padding
           }), p.height += v
          } else {
           var x = o.padding,
            y = i.columnWidths = [],
            k = o.padding,
            S = 0,
            w = 0,
            M = u + x;
           a.each(i.legendItems, function(t, a) {
            var i = e(o, u),
             n = i + u / 2 + l.measureText(t.text).width;
            w + M > p.height && (k += S + o.padding, y.push(S), S = 0, w = 0), S = Math.max(S, n), w += M, g[a] = {
             left: 0,
             top: 0,
             width: n,
             height: u
            }
           }), k += S, y.push(S), p.width += k
          } i.width = p.width, i.height = p.height
        },
        afterFit: i,
        isHorizontal: function() {
         return "top" === this.options.position || "bottom" === this.options.position
        },
        draw: function() {
         var i = this,
          n = i.options,
          o = n.labels,
          r = t.defaults.global,
          l = r.elements.line,
          s = i.width,
          d = i.lineWidths;
         if (n.display) {
          var u, c = i.ctx,
           h = a.getValueOrDefault,
           f = h(o.fontColor, r.defaultFontColor),
           g = h(o.fontSize, r.defaultFontSize),
           p = h(o.fontStyle, r.defaultFontStyle),
           m = h(o.fontFamily, r.defaultFontFamily),
           b = a.fontString(g, p, m);
          c.textAlign = "left", c.textBaseline = "top", c.lineWidth = .5, c.strokeStyle = f, c.fillStyle = f, c.font = b;
          var v = e(o, g),
           x = i.legendHitBoxes,
           y = function(e, a, i) {
            if (!(isNaN(v) || 0 >= v)) {
             c.save(), c.fillStyle = h(i.fillStyle, r.defaultColor), c.lineCap = h(i.lineCap, l.borderCapStyle), c.lineDashOffset = h(i.lineDashOffset, l.borderDashOffset), c.lineJoin = h(i.lineJoin, l.borderJoinStyle), c.lineWidth = h(i.lineWidth, l.borderWidth), c.strokeStyle = h(i.strokeStyle, r.defaultColor);
             var o = 0 === h(i.lineWidth, l.borderWidth);
             if (c.setLineDash && c.setLineDash(h(i.lineDash, l.borderDash)), n.labels && n.labels.usePointStyle) {
              var s = g * Math.SQRT2 / 2,
               d = s / Math.SQRT2,
               u = e + d,
               f = a + d;
              t.canvasHelpers.drawPoint(c, i.pointStyle, s, u, f)
             } else o || c.strokeRect(e, a, v, g), c.fillRect(e, a, v, g);
             c.restore()
            }
           },
           k = function(t, e, a, i) {
            c.fillText(a.text, v + g / 2 + t, e), a.hidden && (c.beginPath(), c.lineWidth = 2, c.moveTo(v + g / 2 + t, e + g / 2), c.lineTo(v + g / 2 + t + i, e + g / 2), c.stroke())
           },
           S = i.isHorizontal();
          u = S ? {
           x: i.left + (s - d[0]) / 2,
           y: i.top + o.padding,
           line: 0
          } : {
           x: i.left + o.padding,
           y: i.top + o.padding,
           line: 0
          };
          var w = g + o.padding;
          a.each(i.legendItems, function(t, e) {
           var a = c.measureText(t.text).width,
            n = v + g / 2 + a,
            r = u.x,
            l = u.y;
           S ? r + n >= s && (l = u.y += w, u.line++, r = u.x = i.left + (s - d[u.line]) / 2) : l + w > i.bottom && (r = u.x = r + i.columnWidths[u.line] + o.padding, l = u.y = i.top, u.line++), y(r, l, t), x[e].left = r, x[e].top = l, k(r, l, t, a), S ? u.x += n + o.padding : u.y += w
          })
         }
        },
        handleEvent: function(t) {
         var e = this,
          i = e.options,
          n = "mouseup" === t.type ? "click" : t.type,
          o = !1;
         if ("mousemove" === n) {
          if (!i.onHover) return
         } else {
          if ("click" !== n) return;
          if (!i.onClick) return
         }
         var r = a.getRelativePosition(t, e.chart.chart),
          l = r.x,
          s = r.y;
         if (l >= e.left && l <= e.right && s >= e.top && s <= e.bottom)
          for (var d = e.legendHitBoxes, u = 0; u < d.length; ++u) {
           var c = d[u];
           if (l >= c.left && l <= c.left + c.width && s >= c.top && s <= c.top + c.height) {
            if ("click" === n) {
             i.onClick.call(e, t, e.legendItems[u]), o = !0;
             break
            }
            if ("mousemove" === n) {
             i.onHover.call(e, t, e.legendItems[u]), o = !0;
             break
            }
           }
          }
         return o
        }
       }), t.plugins.register({
        beforeInit: function(e) {
         var a = e.options,
          i = a.legend;
         i && (e.legend = new t.Legend({
          ctx: e.chart.ctx,
          options: i,
          chart: e
         }), t.layoutService.addBox(e, e.legend))
        }
       })
      }
     }, {}],
     31: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       var e = t.helpers.noop;
       t.plugins = {
        _plugins: [],
        register: function(t) {
         var e = this._plugins;
         [].concat(t).forEach(function(t) {
          -1 === e.indexOf(t) && e.push(t)
         })
        },
        unregister: function(t) {
         var e = this._plugins;
         [].concat(t).forEach(function(t) {
          var a = e.indexOf(t); - 1 !== a && e.splice(a, 1)
         })
        },
        clear: function() {
         this._plugins = []
        },
        count: function() {
         return this._plugins.length
        },
        getAll: function() {
         return this._plugins
        },
        notify: function(t, e) {
         var a, i, n = this._plugins,
          o = n.length;
         for (a = 0; o > a; ++a)
          if (i = n[a], "function" == typeof i[t] && i[t].apply(i, e || []) === !1) return !1;
         return !0
        }
       }, t.PluginBase = t.Element.extend({
        beforeInit: e,
        afterInit: e,
        beforeUpdate: e,
        afterUpdate: e,
        beforeDraw: e,
        afterDraw: e,
        destroy: e
       }), t.pluginService = t.plugins
      }
     }, {}],
     32: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       var e = t.helpers;
       t.defaults.scale = {
        display: !0,
        position: "left",
        gridLines: {
         display: !0,
         color: "rgba(0, 0, 0, 0.1)",
         lineWidth: 1,
         drawBorder: !0,
         drawOnChartArea: !0,
         drawTicks: !0,
         tickMarkLength: 10,
         zeroLineWidth: 1,
         zeroLineColor: "rgba(0,0,0,0.25)",
         offsetGridLines: !1,
         borderDash: [],
         borderDashOffset: 0
        },
        scaleLabel: {
         labelString: "",
         display: !1
        },
        ticks: {
         beginAtZero: !1,
         minRotation: 0,
         maxRotation: 50,
         mirror: !1,
         padding: 10,
         reverse: !1,
         display: !0,
         autoSkip: !0,
         autoSkipPadding: 0,
         labelOffset: 0,
         callback: t.Ticks.formatters.values
        }
       }, t.Scale = t.Element.extend({
        beforeUpdate: function() {
         e.callCallback(this.options.beforeUpdate, [this])
        },
        update: function(t, a, i) {
         var n = this;
         return n.beforeUpdate(), n.maxWidth = t, n.maxHeight = a, n.margins = e.extend({
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
         }, i), n.beforeSetDimensions(), n.setDimensions(), n.afterSetDimensions(), n.beforeDataLimits(), n.determineDataLimits(), n.afterDataLimits(), n.beforeBuildTicks(), n.buildTicks(), n.afterBuildTicks(), n.beforeTickToLabelConversion(), n.convertTicksToLabels(), n.afterTickToLabelConversion(), n.beforeCalculateTickRotation(), n.calculateTickRotation(), n.afterCalculateTickRotation(), n.beforeFit(), n.fit(), n.afterFit(), n.afterUpdate(), n.minSize
        },
        afterUpdate: function() {
         e.callCallback(this.options.afterUpdate, [this])
        },
        beforeSetDimensions: function() {
         e.callCallback(this.options.beforeSetDimensions, [this])
        },
        setDimensions: function() {
         var t = this;
         t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, t.paddingBottom = 0
        },
        afterSetDimensions: function() {
         e.callCallback(this.options.afterSetDimensions, [this])
        },
        beforeDataLimits: function() {
         e.callCallback(this.options.beforeDataLimits, [this])
        },
        determineDataLimits: e.noop,
        afterDataLimits: function() {
         e.callCallback(this.options.afterDataLimits, [this])
        },
        beforeBuildTicks: function() {
         e.callCallback(this.options.beforeBuildTicks, [this])
        },
        buildTicks: e.noop,
        afterBuildTicks: function() {
         e.callCallback(this.options.afterBuildTicks, [this])
        },
        beforeTickToLabelConversion: function() {
         e.callCallback(this.options.beforeTickToLabelConversion, [this])
        },
        convertTicksToLabels: function() {
         var t = this,
          e = t.options.ticks;
         t.ticks = t.ticks.map(e.userCallback || e.callback)
        },
        afterTickToLabelConversion: function() {
         e.callCallback(this.options.afterTickToLabelConversion, [this])
        },
        beforeCalculateTickRotation: function() {
         e.callCallback(this.options.beforeCalculateTickRotation, [this])
        },
        calculateTickRotation: function() {
         var a = this,
          i = a.ctx,
          n = t.defaults.global,
          o = a.options.ticks,
          r = e.getValueOrDefault(o.fontSize, n.defaultFontSize),
          l = e.getValueOrDefault(o.fontStyle, n.defaultFontStyle),
          s = e.getValueOrDefault(o.fontFamily, n.defaultFontFamily),
          d = e.fontString(r, l, s);
         i.font = d;
         var u, c = i.measureText(a.ticks[0]).width,
          h = i.measureText(a.ticks[a.ticks.length - 1]).width;
         if (a.labelRotation = o.minRotation || 0, a.paddingRight = 0, a.paddingLeft = 0, a.options.display && a.isHorizontal()) {
          a.paddingRight = h / 2 + 3, a.paddingLeft = c / 2 + 3, a.longestTextCache || (a.longestTextCache = {});
          for (var f, g, p = e.longestText(i, d, a.ticks, a.longestTextCache), m = p, b = a.getPixelForTick(1) - a.getPixelForTick(0) - 6; m > b && a.labelRotation < o.maxRotation;) {
           if (f = Math.cos(e.toRadians(a.labelRotation)), g = Math.sin(e.toRadians(a.labelRotation)), u = f * c, u + r / 2 > a.yLabelWidth && (a.paddingLeft = u + r / 2), a.paddingRight = r / 2, g * p > a.maxHeight) {
            a.labelRotation--;
            break
           }
           a.labelRotation++, m = f * p
          }
         }
         a.margins && (a.paddingLeft = Math.max(a.paddingLeft - a.margins.left, 0), a.paddingRight = Math.max(a.paddingRight - a.margins.right, 0))
        },
        afterCalculateTickRotation: function() {
         e.callCallback(this.options.afterCalculateTickRotation, [this])
        },
        beforeFit: function() {
         e.callCallback(this.options.beforeFit, [this])
        },
        fit: function() {
         var a = this,
          i = a.minSize = {
           width: 0,
           height: 0
          },
          n = a.options,
          o = t.defaults.global,
          r = n.ticks,
          l = n.scaleLabel,
          s = n.gridLines,
          d = n.display,
          u = a.isHorizontal(),
          c = e.getValueOrDefault(r.fontSize, o.defaultFontSize),
          h = e.getValueOrDefault(r.fontStyle, o.defaultFontStyle),
          f = e.getValueOrDefault(r.fontFamily, o.defaultFontFamily),
          g = e.fontString(c, h, f),
          p = e.getValueOrDefault(l.fontSize, o.defaultFontSize),
          m = n.gridLines.tickMarkLength;
         if (u ? i.width = a.isFullWidth() ? a.maxWidth - a.margins.left - a.margins.right : a.maxWidth : i.width = d && s.drawTicks ? m : 0, u ? i.height = d && s.drawTicks ? m : 0 : i.height = a.maxHeight, l.display && d && (u ? i.height += 1.5 * p : i.width += 1.5 * p), r.display && d) {
          a.longestTextCache || (a.longestTextCache = {});
          var b = e.longestText(a.ctx, g, a.ticks, a.longestTextCache),
           v = e.numberOfLabelLines(a.ticks),
           x = .5 * c;
          if (u) {
           a.longestLabelWidth = b;
           var y = Math.sin(e.toRadians(a.labelRotation)) * a.longestLabelWidth + c * v + x * v;
           i.height = Math.min(a.maxHeight, i.height + y), a.ctx.font = g;
           var k = a.ctx.measureText(a.ticks[0]).width,
            S = a.ctx.measureText(a.ticks[a.ticks.length - 1]).width,
            w = Math.cos(e.toRadians(a.labelRotation)),
            M = Math.sin(e.toRadians(a.labelRotation));
           a.paddingLeft = 0 !== a.labelRotation ? w * k + 3 : k / 2 + 3, a.paddingRight = 0 !== a.labelRotation ? M * (c / 2) + 3 : S / 2 + 3
          } else {
           var C = a.maxWidth - i.width,
            D = r.mirror;
           D ? b = 0 : b += a.options.ticks.padding, C > b ? i.width += b : i.width = a.maxWidth, a.paddingTop = c / 2, a.paddingBottom = c / 2
          }
         }
         a.margins && (a.paddingLeft = Math.max(a.paddingLeft - a.margins.left, 0), a.paddingTop = Math.max(a.paddingTop - a.margins.top, 0), a.paddingRight = Math.max(a.paddingRight - a.margins.right, 0), a.paddingBottom = Math.max(a.paddingBottom - a.margins.bottom, 0)), a.width = i.width, a.height = i.height
        },
        afterFit: function() {
         e.callCallback(this.options.afterFit, [this])
        },
        isHorizontal: function() {
         return "top" === this.options.position || "bottom" === this.options.position
        },
        isFullWidth: function() {
         return this.options.fullWidth
        },
        getRightValue: function(t) {
         return null === t || "undefined" == typeof t ? NaN : "number" != typeof t || isFinite(t) ? "object" == typeof t ? t instanceof Date || t.isValid ? t : this.getRightValue(this.isHorizontal() ? t.x : t.y) : t : NaN
        },
        getLabelForIndex: e.noop,
        getPixelForValue: e.noop,
        getValueForPixel: e.noop,
        getPixelForTick: function(t, e) {
         var a = this;
         if (a.isHorizontal()) {
          var i = a.width - (a.paddingLeft + a.paddingRight),
           n = i / Math.max(a.ticks.length - (a.options.gridLines.offsetGridLines ? 0 : 1), 1),
           o = n * t + a.paddingLeft;
          e && (o += n / 2);
          var r = a.left + Math.round(o);
          return r += a.isFullWidth() ? a.margins.left : 0
         }
         var l = a.height - (a.paddingTop + a.paddingBottom);
         return a.top + t * (l / (a.ticks.length - 1))
        },
        getPixelForDecimal: function(t) {
         var e = this;
         if (e.isHorizontal()) {
          var a = e.width - (e.paddingLeft + e.paddingRight),
           i = a * t + e.paddingLeft,
           n = e.left + Math.round(i);
          return n += e.isFullWidth() ? e.margins.left : 0
         }
         return e.top + t * e.height
        },
        getBasePixel: function() {
         var t = this,
          e = t.min,
          a = t.max;
         return t.getPixelForValue(t.beginAtZero ? 0 : 0 > e && 0 > a ? a : e > 0 && a > 0 ? e : 0)
        },
        draw: function(a) {
         var i = this,
          n = i.options;
         if (n.display) {
          var o, r, l = i.ctx,
           s = t.defaults.global,
           d = n.ticks,
           u = n.gridLines,
           c = n.scaleLabel,
           h = 0 !== i.labelRotation,
           f = d.autoSkip,
           g = i.isHorizontal();
          d.maxTicksLimit && (r = d.maxTicksLimit);
          var p = e.getValueOrDefault(d.fontColor, s.defaultFontColor),
           m = e.getValueOrDefault(d.fontSize, s.defaultFontSize),
           b = e.getValueOrDefault(d.fontStyle, s.defaultFontStyle),
           v = e.getValueOrDefault(d.fontFamily, s.defaultFontFamily),
           x = e.fontString(m, b, v),
           y = u.tickMarkLength,
           k = e.getValueOrDefault(u.borderDash, s.borderDash),
           S = e.getValueOrDefault(u.borderDashOffset, s.borderDashOffset),
           w = e.getValueOrDefault(c.fontColor, s.defaultFontColor),
           M = e.getValueOrDefault(c.fontSize, s.defaultFontSize),
           C = e.getValueOrDefault(c.fontStyle, s.defaultFontStyle),
           D = e.getValueOrDefault(c.fontFamily, s.defaultFontFamily),
           I = e.fontString(M, C, D),
           A = e.toRadians(i.labelRotation),
           T = Math.cos(A),
           P = i.longestLabelWidth * T;
          l.fillStyle = p;
          var F = [];
          if (g) {
           if (o = !1, h && (P /= 2), (P + d.autoSkipPadding) * i.ticks.length > i.width - (i.paddingLeft + i.paddingRight) && (o = 1 + Math.floor((P + d.autoSkipPadding) * i.ticks.length / (i.width - (i.paddingLeft + i.paddingRight)))), r && i.ticks.length > r)
            for (; !o || i.ticks.length / (o || 1) > r;) o || (o = 1), o += 1;
           f || (o = !1)
          }
          var _ = "right" === n.position ? i.left : i.right - y,
           R = "right" === n.position ? i.left + y : i.right,
           V = "bottom" === n.position ? i.top : i.bottom - y,
           L = "bottom" === n.position ? i.top + y : i.bottom;
          if (e.each(i.ticks, function(t, r) {
            if (void 0 !== t && null !== t) {
             var l = i.ticks.length === r + 1,
              s = o > 1 && r % o > 0 || r % o === 0 && r + o >= i.ticks.length;
             if ((!s || l) && void 0 !== t && null !== t) {
              var c, f;
              r === ("undefined" != typeof i.zeroLineIndex ? i.zeroLineIndex : 0) ? (c = u.zeroLineWidth, f = u.zeroLineColor) : (c = e.getValueAtIndexOrDefault(u.lineWidth, r), f = e.getValueAtIndexOrDefault(u.color, r));
              var p, m, b, v, x, w, M, C, D, I, T = "middle",
               P = "middle";
              if (g) {
               h || (P = "top" === n.position ? "bottom" : "top"), T = h ? "right" : "center";
               var O = i.getPixelForTick(r) + e.aliasPixel(c);
               D = i.getPixelForTick(r, u.offsetGridLines) + d.labelOffset, I = h ? i.top + 12 : "top" === n.position ? i.bottom - y : i.top + y, p = b = x = M = O, m = V, v = L, w = a.top, C = a.bottom
              } else {
               "left" === n.position ? d.mirror ? (D = i.right + d.padding, T = "left") : (D = i.right - d.padding, T = "right") : d.mirror ? (D = i.left - d.padding, T = "right") : (D = i.left + d.padding, T = "left");
               var B = i.getPixelForTick(r);
               B += e.aliasPixel(c), I = i.getPixelForTick(r, u.offsetGridLines), p = _, b = R, x = a.left, M = a.right, m = v = w = C = B
              }
              F.push({
               tx1: p,
               ty1: m,
               tx2: b,
               ty2: v,
               x1: x,
               y1: w,
               x2: M,
               y2: C,
               labelX: D,
               labelY: I,
               glWidth: c,
               glColor: f,
               glBorderDash: k,
               glBorderDashOffset: S,
               rotation: -1 * A,
               label: t,
               textBaseline: P,
               textAlign: T
              })
             }
            }
           }), e.each(F, function(t) {
            if (u.display && (l.save(), l.lineWidth = t.glWidth, l.strokeStyle = t.glColor, l.setLineDash && (l.setLineDash(t.glBorderDash), l.lineDashOffset = t.glBorderDashOffset), l.beginPath(), u.drawTicks && (l.moveTo(t.tx1, t.ty1), l.lineTo(t.tx2, t.ty2)), u.drawOnChartArea && (l.moveTo(t.x1, t.y1), l.lineTo(t.x2, t.y2)), l.stroke(), l.restore()), d.display) {
             l.save(), l.translate(t.labelX, t.labelY), l.rotate(t.rotation), l.font = x, l.textBaseline = t.textBaseline, l.textAlign = t.textAlign;
             var a = t.label;
             if (e.isArray(a))
              for (var i = 0, n = -(a.length - 1) * m * .75; i < a.length; ++i) l.fillText("" + a[i], 0, n), n += 1.5 * m;
             else l.fillText(a, 0, 0);
             l.restore()
            }
           }), c.display) {
           var O, B, W = 0;
           if (g) O = i.left + (i.right - i.left) / 2, B = "bottom" === n.position ? i.bottom - M / 2 : i.top + M / 2;
           else {
            var z = "left" === n.position;
            O = z ? i.left + M / 2 : i.right - M / 2, B = i.top + (i.bottom - i.top) / 2, W = z ? -.5 * Math.PI : .5 * Math.PI
           }
           l.save(), l.translate(O, B), l.rotate(W), l.textAlign = "center", l.textBaseline = "middle", l.fillStyle = w, l.font = I, l.fillText(c.labelString, 0, 0), l.restore()
          }
          if (u.drawBorder) {
           l.lineWidth = e.getValueAtIndexOrDefault(u.lineWidth, 0), l.strokeStyle = e.getValueAtIndexOrDefault(u.color, 0);
           var N = i.left,
            E = i.right,
            H = i.top,
            U = i.bottom,
            j = e.aliasPixel(l.lineWidth);
           g ? (H = U = "top" === n.position ? i.bottom : i.top, H += j, U += j) : (N = E = "left" === n.position ? i.right : i.left, N += j, E += j), l.beginPath(), l.moveTo(N, H), l.lineTo(E, U), l.stroke()
          }
         }
        }
       })
      }
     }, {}],
     33: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       var e = t.helpers;
       t.scaleService = {
        constructors: {},
        defaults: {},
        registerScaleType: function(t, a, i) {
         this.constructors[t] = a, this.defaults[t] = e.clone(i)
        },
        getScaleConstructor: function(t) {
         return this.constructors.hasOwnProperty(t) ? this.constructors[t] : void 0
        },
        getScaleDefaults: function(a) {
         return this.defaults.hasOwnProperty(a) ? e.scaleMerge(t.defaults.scale, this.defaults[a]) : {}
        },
        updateScaleDefaults: function(t, a) {
         var i = this.defaults;
         i.hasOwnProperty(t) && (i[t] = e.extend(i[t], a))
        },
        addScalesToLayout: function(a) {
         e.each(a.scales, function(e) {
          t.layoutService.addBox(a, e)
         })
        }
       }
      }
     }, {}],
     34: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       var e = t.helpers;
       t.Ticks = {
        generators: {
         linear: function(t, a) {
          var i, n = [];
          if (t.stepSize && t.stepSize > 0) i = t.stepSize;
          else {
           var o = e.niceNum(a.max - a.min, !1);
           i = e.niceNum(o / (t.maxTicks - 1), !0)
          }
          var r = Math.floor(a.min / i) * i,
           l = Math.ceil(a.max / i) * i;
          if (t.min && t.max && t.stepSize) {
           var s = (t.max - t.min) % t.stepSize === 0;
           s && (r = t.min, l = t.max)
          }
          var d = (l - r) / i;
          d = e.almostEquals(d, Math.round(d), i / 1e3) ? Math.round(d) : Math.ceil(d), n.push(void 0 !== t.min ? t.min : r);
          for (var u = 1; d > u; ++u) n.push(r + u * i);
          return n.push(void 0 !== t.max ? t.max : l), n
         },
         logarithmic: function(t, a) {
          for (var i = [], n = e.getValueOrDefault, o = n(t.min, Math.pow(10, Math.floor(e.log10(a.min)))); o < a.max;) {
           i.push(o);
           var r, l;
           0 === o ? (r = Math.floor(e.log10(a.minNotZero)), l = Math.round(a.minNotZero / Math.pow(10, r))) : (r = Math.floor(e.log10(o)), l = Math.floor(o / Math.pow(10, r)) + 1), 10 === l && (l = 1, ++r), o = l * Math.pow(10, r)
          }
          var s = n(t.max, o);
          return i.push(s), i
         }
        },
        formatters: {
         values: function(t) {
          return e.isArray(t) ? t : "" + t
         },
         linear: function(t, a, i) {
          var n = i.length > 3 ? i[2] - i[1] : i[1] - i[0];
          Math.abs(n) > 1 && t !== Math.floor(t) && (n = t - Math.floor(t));
          var o = e.log10(Math.abs(n)),
           r = "";
          if (0 !== t) {
           var l = -1 * Math.floor(o);
           l = Math.max(Math.min(l, 20), 0), r = t.toFixed(l)
          } else r = "0";
          return r
         },
         logarithmic: function(t, a, i) {
          var n = t / Math.pow(10, Math.floor(e.log10(t)));
          return 0 === t ? "0" : 1 === n || 2 === n || 5 === n || 0 === a || a === i.length - 1 ? t.toExponential() : ""
         }
        }
       }
      }
     }, {}],
     35: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       var e = t.helpers;
       t.defaults.global.title = {
        display: !1,
        position: "top",
        fullWidth: !0,
        fontStyle: "bold",
        padding: 10,
        text: ""
       };
       var a = e.noop;
       t.Title = t.Element.extend({
        initialize: function(a) {
         var i = this;
         e.extend(i, a), i.options = e.configMerge(t.defaults.global.title, a.options), i.legendHitBoxes = []
        },
        beforeUpdate: function() {
         var a = this.chart.options;
         a && a.title && (this.options = e.configMerge(t.defaults.global.title, a.title))
        },
        update: function(t, e, a) {
         var i = this;
         return i.beforeUpdate(), i.maxWidth = t, i.maxHeight = e, i.margins = a, i.beforeSetDimensions(), i.setDimensions(), i.afterSetDimensions(), i.beforeBuildLabels(), i.buildLabels(), i.afterBuildLabels(), i.beforeFit(), i.fit(), i.afterFit(), i.afterUpdate(), i.minSize
        },
        afterUpdate: a,
        beforeSetDimensions: a,
        setDimensions: function() {
         var t = this;
         t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, t.paddingBottom = 0, t.minSize = {
          width: 0,
          height: 0
         }
        },
        afterSetDimensions: a,
        beforeBuildLabels: a,
        buildLabels: a,
        afterBuildLabels: a,
        beforeFit: a,
        fit: function() {
         var a = this,
          i = e.getValueOrDefault,
          n = a.options,
          o = t.defaults.global,
          r = n.display,
          l = i(n.fontSize, o.defaultFontSize),
          s = a.minSize;
         a.isHorizontal() ? (s.width = a.maxWidth, s.height = r ? l + 2 * n.padding : 0) : (s.width = r ? l + 2 * n.padding : 0, s.height = a.maxHeight), a.width = s.width, a.height = s.height
        },
        afterFit: a,
        isHorizontal: function() {
         var t = this.options.position;
         return "top" === t || "bottom" === t
        },
        draw: function() {
         var a = this,
          i = a.ctx,
          n = e.getValueOrDefault,
          o = a.options,
          r = t.defaults.global;
         if (o.display) {
          var l, s, d, u = n(o.fontSize, r.defaultFontSize),
           c = n(o.fontStyle, r.defaultFontStyle),
           h = n(o.fontFamily, r.defaultFontFamily),
           f = e.fontString(u, c, h),
           g = 0,
           p = a.top,
           m = a.left,
           b = a.bottom,
           v = a.right;
          i.fillStyle = n(o.fontColor, r.defaultFontColor), i.font = f, a.isHorizontal() ? (l = m + (v - m) / 2, s = p + (b - p) / 2, d = v - m) : (l = "left" === o.position ? m + u / 2 : v - u / 2, s = p + (b - p) / 2, d = b - p, g = Math.PI * ("left" === o.position ? -.5 : .5)), i.save(), i.translate(l, s), i.rotate(g), i.textAlign = "center", i.textBaseline = "middle", i.fillText(o.text, 0, 0, d), i.restore()
         }
        }
       }), t.plugins.register({
        beforeInit: function(e) {
         var a = e.options,
          i = a.title;
         i && (e.titleBlock = new t.Title({
          ctx: e.chart.ctx,
          options: i,
          chart: e
         }), t.layoutService.addBox(e, e.titleBlock))
        }
       })
      }
     }, {}],
     36: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       function e(t, e) {
        var a = s.color(t);
        return a.alpha(e * a.alpha()).rgbaString()
       }
   
       function a(t, e) {
        return e && (s.isArray(e) ? Array.prototype.push.apply(t, e) : t.push(e)), t
       }
   
       function i(t) {
        var e = t._xScale,
         a = t._yScale || t._scale,
         i = t._index,
         n = t._datasetIndex;
        return {
         xLabel: e ? e.getLabelForIndex(i, n) : "",
         yLabel: a ? a.getLabelForIndex(i, n) : "",
         index: i,
         datasetIndex: n,
         x: t._model.x,
         y: t._model.y
        }
       }
   
       function n(e) {
        var a = t.defaults.global,
         i = s.getValueOrDefault;
        return {
         xPadding: e.xPadding,
         yPadding: e.yPadding,
         xAlign: e.xAlign,
         yAlign: e.yAlign,
         bodyFontColor: e.bodyFontColor,
         _bodyFontFamily: i(e.bodyFontFamily, a.defaultFontFamily),
         _bodyFontStyle: i(e.bodyFontStyle, a.defaultFontStyle),
         _bodyAlign: e.bodyAlign,
         bodyFontSize: i(e.bodyFontSize, a.defaultFontSize),
         bodySpacing: e.bodySpacing,
         titleFontColor: e.titleFontColor,
         _titleFontFamily: i(e.titleFontFamily, a.defaultFontFamily),
         _titleFontStyle: i(e.titleFontStyle, a.defaultFontStyle),
         titleFontSize: i(e.titleFontSize, a.defaultFontSize),
         _titleAlign: e.titleAlign,
         titleSpacing: e.titleSpacing,
         titleMarginBottom: e.titleMarginBottom,
         footerFontColor: e.footerFontColor,
         _footerFontFamily: i(e.footerFontFamily, a.defaultFontFamily),
         _footerFontStyle: i(e.footerFontStyle, a.defaultFontStyle),
         footerFontSize: i(e.footerFontSize, a.defaultFontSize),
         _footerAlign: e.footerAlign,
         footerSpacing: e.footerSpacing,
         footerMarginTop: e.footerMarginTop,
         caretSize: e.caretSize,
         cornerRadius: e.cornerRadius,
         backgroundColor: e.backgroundColor,
         opacity: 0,
         legendColorBackground: e.multiKeyBackground,
         displayColors: e.displayColors
        }
       }
   
       function o(t, e) {
        var a = t._chart.ctx,
         i = 2 * e.yPadding,
         n = 0,
         o = e.body,
         r = o.reduce(function(t, e) {
          return t + e.before.length + e.lines.length + e.after.length
         }, 0);
        r += e.beforeBody.length + e.afterBody.length;
        var l = e.title.length,
         d = e.footer.length,
         u = e.titleFontSize,
         c = e.bodyFontSize,
         h = e.footerFontSize;
        i += l * u, i += l ? (l - 1) * e.titleSpacing : 0, i += l ? e.titleMarginBottom : 0, i += r * c, i += r ? (r - 1) * e.bodySpacing : 0, i += d ? e.footerMarginTop : 0, i += d * h, i += d ? (d - 1) * e.footerSpacing : 0;
        var f = 0,
         g = function(t) {
          n = Math.max(n, a.measureText(t).width + f)
         };
        return a.font = s.fontString(u, e._titleFontStyle, e._titleFontFamily), s.each(e.title, g), a.font = s.fontString(c, e._bodyFontStyle, e._bodyFontFamily), s.each(e.beforeBody.concat(e.afterBody), g), f = e.displayColors ? c + 2 : 0, s.each(o, function(t) {
         s.each(t.before, g), s.each(t.lines, g), s.each(t.after, g)
        }), f = 0, a.font = s.fontString(h, e._footerFontStyle, e._footerFontFamily), s.each(e.footer, g), n += 2 * e.xPadding, {
         width: n,
         height: i
        }
       }
   
       function r(t, e) {
        var a = t._model,
         i = t._chart,
         n = t._chartInstance.chartArea,
         o = "center",
         r = "center";
        a.y < e.height ? r = "top" : a.y > i.height - e.height && (r = "bottom");
        var l, s, d, u, c, h = (n.left + n.right) / 2,
         f = (n.top + n.bottom) / 2;
        "center" === r ? (l = function(t) {
         return h >= t
        }, s = function(t) {
         return t > h
        }) : (l = function(t) {
         return t <= e.width / 2
        }, s = function(t) {
         return t >= i.width - e.width / 2
        }), d = function(t) {
         return t + e.width > i.width
        }, u = function(t) {
         return t - e.width < 0
        }, c = function(t) {
         return f >= t ? "top" : "bottom"
        }, l(a.x) ? (o = "left", d(a.x) && (o = "center", r = c(a.y))) : s(a.x) && (o = "right", u(a.x) && (o = "center", r = c(a.y)));
        var g = t._options;
        return {
         xAlign: g.xAlign ? g.xAlign : o,
         yAlign: g.yAlign ? g.yAlign : r
        }
       }
   
       function l(t, e, a) {
        var i = t.x,
         n = t.y,
         o = t.caretSize,
         r = t.caretPadding,
         l = t.cornerRadius,
         s = a.xAlign,
         d = a.yAlign,
         u = o + r,
         c = l + r;
        return "right" === s ? i -= e.width : "center" === s && (i -= e.width / 2), "top" === d ? n += u : n -= "bottom" === d ? e.height + u : e.height / 2, "center" === d ? "left" === s ? i += u : "right" === s && (i -= u) : "left" === s ? i -= c : "right" === s && (i += c), {
         x: i,
         y: n
        }
       }
       var s = t.helpers;
       t.defaults.global.tooltips = {
        enabled: !0,
        custom: null,
        mode: "nearest",
        position: "average",
        intersect: !0,
        backgroundColor: "rgba(0,0,0,0.8)",
        titleFontStyle: "bold",
        titleSpacing: 2,
        titleMarginBottom: 6,
        titleFontColor: "#fff",
        titleAlign: "left",
        bodySpacing: 2,
        bodyFontColor: "#fff",
        bodyAlign: "left",
        footerFontStyle: "bold",
        footerSpacing: 2,
        footerMarginTop: 6,
        footerFontColor: "#fff",
        footerAlign: "left",
        yPadding: 6,
        xPadding: 6,
        caretSize: 5,
        cornerRadius: 6,
        multiKeyBackground: "#fff",
        displayColors: !0,
        callbacks: {
         beforeTitle: s.noop,
         title: function(t, e) {
          var a = "",
           i = e.labels,
           n = i ? i.length : 0;
          if (t.length > 0) {
           var o = t[0];
           o.xLabel ? a = o.xLabel : n > 0 && o.index < n && (a = i[o.index])
          }
          return a
         },
         afterTitle: s.noop,
         beforeBody: s.noop,
         beforeLabel: s.noop,
         label: function(t, e) {
          var a = e.datasets[t.datasetIndex].label || "";
          return a + ": " + t.yLabel
         },
         labelColor: function(t, e) {
          var a = e.getDatasetMeta(t.datasetIndex),
           i = a.data[t.index],
           n = i._view;
          return {
           borderColor: n.borderColor,
           backgroundColor: n.backgroundColor
          }
         },
         afterLabel: s.noop,
         afterBody: s.noop,
         beforeFooter: s.noop,
         footer: s.noop,
         afterFooter: s.noop
        }
       }, t.Tooltip = t.Element.extend({
        initialize: function() {
         this._model = n(this._options)
        },
        getTitle: function() {
         var t = this,
          e = t._options,
          i = e.callbacks,
          n = i.beforeTitle.apply(t, arguments),
          o = i.title.apply(t, arguments),
          r = i.afterTitle.apply(t, arguments),
          l = [];
         return l = a(l, n), l = a(l, o), l = a(l, r)
        },
        getBeforeBody: function() {
         var t = this._options.callbacks.beforeBody.apply(this, arguments);
         return s.isArray(t) ? t : void 0 !== t ? [t] : []
        },
        getBody: function(t, e) {
         var i = this,
          n = i._options.callbacks,
          o = [];
         return s.each(t, function(t) {
          var r = {
           before: [],
           lines: [],
           after: []
          };
          a(r.before, n.beforeLabel.call(i, t, e)), a(r.lines, n.label.call(i, t, e)), a(r.after, n.afterLabel.call(i, t, e)), o.push(r)
         }), o
        },
        getAfterBody: function() {
         var t = this._options.callbacks.afterBody.apply(this, arguments);
         return s.isArray(t) ? t : void 0 !== t ? [t] : []
        },
        getFooter: function() {
         var t = this,
          e = t._options.callbacks,
          i = e.beforeFooter.apply(t, arguments),
          n = e.footer.apply(t, arguments),
          o = e.afterFooter.apply(t, arguments),
          r = [];
         return r = a(r, i), r = a(r, n), r = a(r, o)
        },
        update: function(e) {
         var a, d, u = this,
          c = u._options,
          h = u._model,
          f = u._model = n(c),
          g = u._active,
          p = u._data,
          m = u._chartInstance,
          b = {
           xAlign: h.xAlign,
           yAlign: h.yAlign
          },
          v = {
           x: h.x,
           y: h.y
          },
          x = {
           width: h.width,
           height: h.height
          },
          y = {
           x: h.caretX,
           y: h.caretY
          };
         if (g.length) {
          f.opacity = 1;
          var k = [];
          y = t.Tooltip.positioners[c.position](g, u._eventPosition);
          var S = [];
          for (a = 0, d = g.length; d > a; ++a) S.push(i(g[a]));
          c.filter && (S = S.filter(function(t) {
           return c.filter(t, p)
          })), c.itemSort && (S = S.sort(function(t, e) {
           return c.itemSort(t, e, p)
          })), s.each(S, function(t) {
           k.push(c.callbacks.labelColor.call(u, t, m))
          }), f.title = u.getTitle(S, p), f.beforeBody = u.getBeforeBody(S, p), f.body = u.getBody(S, p), f.afterBody = u.getAfterBody(S, p), f.footer = u.getFooter(S, p), f.x = Math.round(y.x), f.y = Math.round(y.y), f.caretPadding = s.getValueOrDefault(y.padding, 2), f.labelColors = k, f.dataPoints = S, x = o(this, f), b = r(this, x), v = l(f, x, b)
         } else f.opacity = 0;
         return f.xAlign = b.xAlign, f.yAlign = b.yAlign, f.x = v.x, f.y = v.y, f.width = x.width, f.height = x.height, f.caretX = y.x, f.caretY = y.y, u._model = f, e && c.custom && c.custom.call(u, f), u
        },
        drawCaret: function(t, a, i) {
         var n, o, r, l, s, d, u = this._view,
          c = this._chart.ctx,
          h = u.caretSize,
          f = u.cornerRadius,
          g = u.xAlign,
          p = u.yAlign,
          m = t.x,
          b = t.y,
          v = a.width,
          x = a.height;
         "center" === p ? ("left" === g ? (n = m, o = n - h, r = n) : (n = m + v, o = n + h, r = n), s = b + x / 2, l = s - h, d = s + h) : ("left" === g ? (n = m + f, o = n + h, r = o + h) : "right" === g ? (n = m + v - f, o = n - h, r = o - h) : (o = m + v / 2, n = o - h, r = o + h), "top" === p ? (l = b, s = l - h, d = l) : (l = b + x, s = l + h, d = l)), c.fillStyle = e(u.backgroundColor, i), c.beginPath(), c.moveTo(n, l), c.lineTo(o, s), c.lineTo(r, d), c.closePath(), c.fill()
        },
        drawTitle: function(t, a, i, n) {
         var o = a.title;
         if (o.length) {
          i.textAlign = a._titleAlign, i.textBaseline = "top";
          var r = a.titleFontSize,
           l = a.titleSpacing;
          i.fillStyle = e(a.titleFontColor, n), i.font = s.fontString(r, a._titleFontStyle, a._titleFontFamily);
          var d, u;
          for (d = 0, u = o.length; u > d; ++d) i.fillText(o[d], t.x, t.y), t.y += r + l, d + 1 === o.length && (t.y += a.titleMarginBottom - l)
         }
        },
        drawBody: function(t, a, i, n) {
         var o = a.bodyFontSize,
          r = a.bodySpacing,
          l = a.body;
         i.textAlign = a._bodyAlign, i.textBaseline = "top";
         var d = e(a.bodyFontColor, n);
         i.fillStyle = d, i.font = s.fontString(o, a._bodyFontStyle, a._bodyFontFamily);
         var u = 0,
          c = function(e) {
           i.fillText(e, t.x + u, t.y), t.y += o + r
          };
         s.each(a.beforeBody, c);
         var h = a.displayColors;
         u = h ? o + 2 : 0, s.each(l, function(r, l) {
          s.each(r.before, c), s.each(r.lines, function(r) {
           h && (i.fillStyle = e(a.legendColorBackground, n), i.fillRect(t.x, t.y, o, o), i.strokeStyle = e(a.labelColors[l].borderColor, n), i.strokeRect(t.x, t.y, o, o), i.fillStyle = e(a.labelColors[l].backgroundColor, n), i.fillRect(t.x + 1, t.y + 1, o - 2, o - 2), i.fillStyle = d), c(r)
          }), s.each(r.after, c)
         }), u = 0, s.each(a.afterBody, c), t.y -= r
        },
        drawFooter: function(t, a, i, n) {
         var o = a.footer;
         o.length && (t.y += a.footerMarginTop, i.textAlign = a._footerAlign, i.textBaseline = "top", i.fillStyle = e(a.footerFontColor, n), i.font = s.fontString(a.footerFontSize, a._footerFontStyle, a._footerFontFamily), s.each(o, function(e) {
          i.fillText(e, t.x, t.y), t.y += a.footerFontSize + a.footerSpacing
         }))
        },
        drawBackground: function(t, a, i, n, o) {
         i.fillStyle = e(a.backgroundColor, o), s.drawRoundedRectangle(i, t.x, t.y, n.width, n.height, a.cornerRadius), i.fill()
        },
        draw: function() {
         var t = this._chart.ctx,
          e = this._view;
         if (0 !== e.opacity) {
          var a = {
            width: e.width,
            height: e.height
           },
           i = {
            x: e.x,
            y: e.y
           },
           n = Math.abs(e.opacity < .001) ? 0 : e.opacity;
          this._options.enabled && (this.drawBackground(i, e, t, a, n), this.drawCaret(i, a, n), i.x += e.xPadding, i.y += e.yPadding, this.drawTitle(i, e, t, n), this.drawBody(i, e, t, n), this.drawFooter(i, e, t, n))
         }
        },
        handleEvent: function(t) {
         var e = this,
          a = e._options,
          i = !1;
         if (e._lastActive = e._lastActive || [], "mouseout" === t.type ? e._active = [] : e._active = e._chartInstance.getElementsAtEventForMode(t, a.mode, a), i = !s.arrayEquals(e._active, e._lastActive), e._lastActive = e._active, a.enabled || a.custom) {
          e._eventPosition = s.getRelativePosition(t, e._chart);
          var n = e._model;
          e.update(!0), e.pivot(), i |= n.x !== e._model.x || n.y !== e._model.y
         }
         return i
        }
       }), t.Tooltip.positioners = {
        average: function(t) {
         if (!t.length) return !1;
         var e, a, i = 0,
          n = 0,
          o = 0;
         for (e = 0, a = t.length; a > e; ++e) {
          var r = t[e];
          if (r && r.hasValue()) {
           var l = r.tooltipPosition();
           i += l.x, n += l.y, ++o
          }
         }
         return {
          x: Math.round(i / o),
          y: Math.round(n / o)
         }
        },
        nearest: function(t, e) {
         var a, i, n, o = e.x,
          r = e.y,
          l = Number.POSITIVE_INFINITY;
         for (i = 0, n = t.length; n > i; ++i) {
          var d = t[i];
          if (d && d.hasValue()) {
           var u = d.getCenterPoint(),
            c = s.distanceBetweenPoints(e, u);
           l > c && (l = c, a = d)
          }
         }
         if (a) {
          var h = a.tooltipPosition();
          o = h.x, r = h.y
         }
         return {
          x: o,
          y: r
         }
        }
       }
      }
     }, {}],
     37: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       var e = t.helpers,
        a = t.defaults.global;
       a.elements.arc = {
        backgroundColor: a.defaultColor,
        borderColor: "#fff",
        borderWidth: 2
       }, t.elements.Arc = t.Element.extend({
        inLabelRange: function(t) {
         var e = this._view;
         return e ? Math.pow(t - e.x, 2) < Math.pow(e.radius + e.hoverRadius, 2) : !1
        },
        inRange: function(t, a) {
         var i = this._view;
         if (i) {
          for (var n = e.getAngleFromPoint(i, {
            x: t,
            y: a
           }), o = n.angle, r = n.distance, l = i.startAngle, s = i.endAngle; l > s;) s += 2 * Math.PI;
          for (; o > s;) o -= 2 * Math.PI;
          for (; l > o;) o += 2 * Math.PI;
          var d = o >= l && s >= o,
           u = r >= i.innerRadius && r <= i.outerRadius;
          return d && u
         }
         return !1
        },
        getCenterPoint: function() {
         var t = this._view,
          e = (t.startAngle + t.endAngle) / 2,
          a = (t.innerRadius + t.outerRadius) / 2;
         return {
          x: t.x + Math.cos(e) * a,
          y: t.y + Math.sin(e) * a
         }
        },
        getArea: function() {
         var t = this._view;
         return Math.PI * ((t.endAngle - t.startAngle) / (2 * Math.PI)) * (Math.pow(t.outerRadius, 2) - Math.pow(t.innerRadius, 2))
        },
        tooltipPosition: function() {
         var t = this._view,
          e = t.startAngle + (t.endAngle - t.startAngle) / 2,
          a = (t.outerRadius - t.innerRadius) / 2 + t.innerRadius;
         return {
          x: t.x + Math.cos(e) * a,
          y: t.y + Math.sin(e) * a
         }
        },
        draw: function() {
         var t = this._chart.ctx,
          e = this._view,
          a = e.startAngle,
          i = e.endAngle;
         t.beginPath(), t.arc(e.x, e.y, e.outerRadius, a, i), t.arc(e.x, e.y, e.innerRadius, i, a, !0), t.closePath(), t.strokeStyle = e.borderColor, t.lineWidth = e.borderWidth, t.fillStyle = e.backgroundColor, t.fill(), t.lineJoin = "bevel", e.borderWidth && t.stroke()
        }
       })
      }
     }, {}],
     38: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       var e = t.helpers,
        a = t.defaults.global;
       t.defaults.global.elements.line = {
        tension: .4,
        backgroundColor: a.defaultColor,
        borderWidth: 3,
        borderColor: a.defaultColor,
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0,
        borderJoinStyle: "miter",
        capBezierPoints: !0,
        fill: !0
       }, t.elements.Line = t.Element.extend({
        draw: function() {
         function t(t, e) {
          var a = e._view;
          e._view.steppedLine === !0 ? (s.lineTo(a.x, t._view.y), s.lineTo(a.x, a.y)) : 0 === e._view.tension ? s.lineTo(a.x, a.y) : s.bezierCurveTo(t._view.controlPointNextX, t._view.controlPointNextY, a.controlPointPreviousX, a.controlPointPreviousY, a.x, a.y)
         }
         var i = this,
          n = i._view,
          o = n.spanGaps,
          r = n.scaleZero,
          l = i._loop;
         l || ("top" === n.fill ? r = n.scaleTop : "bottom" === n.fill && (r = n.scaleBottom));
         var s = i._chart.ctx;
         s.save();
         var d = i._children.slice(),
          u = -1;
         l && d.length && d.push(d[0]);
         var c, h, f, g;
         if (d.length && n.fill) {
          for (s.beginPath(), c = 0; c < d.length; ++c) h = d[c], f = e.previousItem(d, c), g = h._view, 0 === c ? (l ? s.moveTo(r.x, r.y) : s.moveTo(g.x, r), g.skip || (u = c, s.lineTo(g.x, g.y))) : (f = -1 === u ? f : d[u], g.skip ? o || u !== c - 1 || (l ? s.lineTo(r.x, r.y) : s.lineTo(f._view.x, r)) : (u !== c - 1 ? o && -1 !== u ? t(f, h) : l ? s.lineTo(g.x, g.y) : (s.lineTo(g.x, r), s.lineTo(g.x, g.y)) : t(f, h), u = c));
          l || -1 === u || s.lineTo(d[u]._view.x, r), s.fillStyle = n.backgroundColor || a.defaultColor, s.closePath(), s.fill()
         }
         var p = a.elements.line;
         for (s.lineCap = n.borderCapStyle || p.borderCapStyle, s.setLineDash && s.setLineDash(n.borderDash || p.borderDash), s.lineDashOffset = n.borderDashOffset || p.borderDashOffset, s.lineJoin = n.borderJoinStyle || p.borderJoinStyle, s.lineWidth = n.borderWidth || p.borderWidth, s.strokeStyle = n.borderColor || a.defaultColor, s.beginPath(), u = -1, c = 0; c < d.length; ++c) h = d[c], f = e.previousItem(d, c), g = h._view, 0 === c ? g.skip || (s.moveTo(g.x, g.y), u = c) : (f = -1 === u ? f : d[u], g.skip || (u !== c - 1 && !o || -1 === u ? s.moveTo(g.x, g.y) : t(f, h), u = c));
         s.stroke(), s.restore()
        }
       })
      }
     }, {}],
     39: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       function e(t) {
        var e = this._view;
        return e ? Math.pow(t - e.x, 2) < Math.pow(e.radius + e.hitRadius, 2) : !1
       }
   
       function a(t) {
        var e = this._view;
        return e ? Math.pow(t - e.y, 2) < Math.pow(e.radius + e.hitRadius, 2) : !1
       }
       var i = t.helpers,
        n = t.defaults.global,
        o = n.defaultColor;
       n.elements.point = {
        radius: 3,
        pointStyle: "circle",
        backgroundColor: o,
        borderWidth: 1,
        borderColor: o,
        hitRadius: 1,
        hoverRadius: 4,
        hoverBorderWidth: 1
       }, t.elements.Point = t.Element.extend({
        inRange: function(t, e) {
         var a = this._view;
         return a ? Math.pow(t - a.x, 2) + Math.pow(e - a.y, 2) < Math.pow(a.hitRadius + a.radius, 2) : !1
        },
        inLabelRange: e,
        inXRange: e,
        inYRange: a,
        getCenterPoint: function() {
         var t = this._view;
         return {
          x: t.x,
          y: t.y
         }
        },
        getArea: function() {
         return Math.PI * Math.pow(this._view.radius, 2)
        },
        tooltipPosition: function() {
         var t = this._view;
         return {
          x: t.x,
          y: t.y,
          padding: t.radius + t.borderWidth
         }
        },
        draw: function() {
         var e = this._view,
          a = this._chart.ctx,
          r = e.pointStyle,
          l = e.radius,
          s = e.x,
          d = e.y;
         e.skip || (a.strokeStyle = e.borderColor || o, a.lineWidth = i.getValueOrDefault(e.borderWidth, n.elements.point.borderWidth), a.fillStyle = e.backgroundColor || o, t.canvasHelpers.drawPoint(a, r, l, s, d))
        }
       })
      }
     }, {}],
     40: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       function e(t) {
        return void 0 !== t._view.width
       }
   
       function a(t) {
        var a, i, n, o, r = t._view;
        if (e(t)) {
         var l = r.width / 2;
         a = r.x - l, i = r.x + l, n = Math.min(r.y, r.base), o = Math.max(r.y, r.base)
        } else {
         var s = r.height / 2;
         a = Math.min(r.x, r.base), i = Math.max(r.x, r.base), n = r.y - s, o = r.y + s
        }
        return {
         left: a,
         top: n,
         right: i,
         bottom: o
        }
       }
       var i = t.defaults.global;
       i.elements.rectangle = {
        backgroundColor: i.defaultColor,
        borderWidth: 0,
        borderColor: i.defaultColor,
        borderSkipped: "bottom"
       }, t.elements.Rectangle = t.Element.extend({
        draw: function() {
         function t(t) {
          return s[(u + t) % 4]
         }
         var e = this._chart.ctx,
          a = this._view,
          i = a.width / 2,
          n = a.x - i,
          o = a.x + i,
          r = a.base - (a.base - a.y),
          l = a.borderWidth / 2;
         a.borderWidth && (n += l, o -= l, r += l), e.beginPath(), e.fillStyle = a.backgroundColor, e.strokeStyle = a.borderColor, e.lineWidth = a.borderWidth;
         var s = [
           [n, a.base],
           [n, r],
           [o, r],
           [o, a.base]
          ],
          d = ["bottom", "left", "top", "right"],
          u = d.indexOf(a.borderSkipped, 0); - 1 === u && (u = 0);
         var c = t(0);
         e.moveTo(c[0], c[1]);
         for (var h = 1; 4 > h; h++) c = t(h), e.lineTo(c[0], c[1]);
         e.fill(), a.borderWidth && e.stroke()
        },
        height: function() {
         var t = this._view;
         return t.base - t.y
        },
        inRange: function(t, e) {
         var i = !1;
         if (this._view) {
          var n = a(this);
          i = t >= n.left && t <= n.right && e >= n.top && e <= n.bottom
         }
         return i
        },
        inLabelRange: function(t, i) {
         var n = this;
         if (!n._view) return !1;
         var o = !1,
          r = a(n);
         return o = e(n) ? t >= r.left && t <= r.right : i >= r.top && i <= r.bottom
        },
        inXRange: function(t) {
         var e = a(this);
         return t >= e.left && t <= e.right
        },
        inYRange: function(t) {
         var e = a(this);
         return t >= e.top && t <= e.bottom
        },
        getCenterPoint: function() {
         var t, a, i = this._view;
         return e(this) ? (t = i.x, a = (i.y + i.base) / 2) : (t = (i.x + i.base) / 2, a = i.y), {
          x: t,
          y: a
         }
        },
        getArea: function() {
         var t = this._view;
         return t.width * Math.abs(t.y - t.base)
        },
        tooltipPosition: function() {
         var t = this._view;
         return {
          x: t.x,
          y: t.y
         }
        }
       })
      }
     }, {}],
     41: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       var e = t.helpers,
        a = {
         position: "bottom"
        },
        i = t.Scale.extend({
         getLabels: function() {
          var t = this.chart.data;
          return (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels
         },
         determineDataLimits: function() {
          var t = this,
           a = t.getLabels();
          t.minIndex = 0, t.maxIndex = a.length - 1;
          var i;
          void 0 !== t.options.ticks.min && (i = e.indexOf(a, t.options.ticks.min), t.minIndex = -1 !== i ? i : t.minIndex), void 0 !== t.options.ticks.max && (i = e.indexOf(a, t.options.ticks.max), t.maxIndex = -1 !== i ? i : t.maxIndex), t.min = a[t.minIndex], t.max = a[t.maxIndex]
         },
         buildTicks: function() {
          var t = this,
           e = t.getLabels();
          t.ticks = 0 === t.minIndex && t.maxIndex === e.length - 1 ? e : e.slice(t.minIndex, t.maxIndex + 1)
         },
         getLabelForIndex: function(t, e) {
          var a = this,
           i = a.chart.data,
           n = a.isHorizontal();
          return i.xLabels && n || i.yLabels && !n ? a.getRightValue(i.datasets[e].data[t]) : a.ticks[t]
         },
         getPixelForValue: function(t, e, a, i) {
          var n = this,
           o = Math.max(n.maxIndex + 1 - n.minIndex - (n.options.gridLines.offsetGridLines ? 0 : 1), 1);
          if (void 0 !== t && isNaN(e)) {
           var r = n.getLabels(),
            l = r.indexOf(t);
           e = -1 !== l ? l : e
          }
          if (n.isHorizontal()) {
           var s = n.width - (n.paddingLeft + n.paddingRight),
            d = s / o,
            u = d * (e - n.minIndex) + n.paddingLeft;
           return (n.options.gridLines.offsetGridLines && i || n.maxIndex === n.minIndex && i) && (u += d / 2),
            n.left + Math.round(u)
          }
          var c = n.height - (n.paddingTop + n.paddingBottom),
           h = c / o,
           f = h * (e - n.minIndex) + n.paddingTop;
          return n.options.gridLines.offsetGridLines && i && (f += h / 2), n.top + Math.round(f)
         },
         getPixelForTick: function(t, e) {
          return this.getPixelForValue(this.ticks[t], t + this.minIndex, null, e)
         },
         getValueForPixel: function(t) {
          var e, a = this,
           i = Math.max(a.ticks.length - (a.options.gridLines.offsetGridLines ? 0 : 1), 1),
           n = a.isHorizontal(),
           o = n ? a.width - (a.paddingLeft + a.paddingRight) : a.height - (a.paddingTop + a.paddingBottom),
           r = o / i;
          return t -= n ? a.left : a.top, a.options.gridLines.offsetGridLines && (t -= r / 2), t -= n ? a.paddingLeft : a.paddingTop, e = 0 >= t ? 0 : Math.round(t / r)
         },
         getBasePixel: function() {
          return this.bottom
         }
        });
       t.scaleService.registerScaleType("category", i, a)
      }
     }, {}],
     42: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       var e = t.helpers,
        a = {
         position: "left",
         ticks: {
          callback: t.Ticks.formatters.linear
         }
        },
        i = t.LinearScaleBase.extend({
         determineDataLimits: function() {
          function t(t) {
           return l ? t.xAxisID === a.id : t.yAxisID === a.id
          }
          var a = this,
           i = a.options,
           n = a.chart,
           o = n.data,
           r = o.datasets,
           l = a.isHorizontal();
          if (a.min = null, a.max = null, i.stacked) {
           var s = {};
           e.each(r, function(o, r) {
            var l = n.getDatasetMeta(r);
            void 0 === s[l.type] && (s[l.type] = {
             positiveValues: [],
             negativeValues: []
            });
            var d = s[l.type].positiveValues,
             u = s[l.type].negativeValues;
            n.isDatasetVisible(r) && t(l) && e.each(o.data, function(t, e) {
             var n = +a.getRightValue(t);
             isNaN(n) || l.data[e].hidden || (d[e] = d[e] || 0, u[e] = u[e] || 0, i.relativePoints ? d[e] = 100 : 0 > n ? u[e] += n : d[e] += n)
            })
           }), e.each(s, function(t) {
            var i = t.positiveValues.concat(t.negativeValues),
             n = e.min(i),
             o = e.max(i);
            a.min = null === a.min ? n : Math.min(a.min, n), a.max = null === a.max ? o : Math.max(a.max, o)
           })
          } else e.each(r, function(i, o) {
           var r = n.getDatasetMeta(o);
           n.isDatasetVisible(o) && t(r) && e.each(i.data, function(t, e) {
            var i = +a.getRightValue(t);
            isNaN(i) || r.data[e].hidden || (null === a.min ? a.min = i : i < a.min && (a.min = i), null === a.max ? a.max = i : i > a.max && (a.max = i))
           })
          });
          this.handleTickRangeOptions()
         },
         getTickLimit: function() {
          var a, i = this,
           n = i.options.ticks;
          if (i.isHorizontal()) a = Math.min(n.maxTicksLimit ? n.maxTicksLimit : 11, Math.ceil(i.width / 50));
          else {
           var o = e.getValueOrDefault(n.fontSize, t.defaults.global.defaultFontSize);
           a = Math.min(n.maxTicksLimit ? n.maxTicksLimit : 11, Math.ceil(i.height / (2 * o)))
          }
          return a
         },
         handleDirectionalChanges: function() {
          this.isHorizontal() || this.ticks.reverse()
         },
         getLabelForIndex: function(t, e) {
          return +this.getRightValue(this.chart.data.datasets[e].data[t])
         },
         getPixelForValue: function(t) {
          var e, a, i = this,
           n = i.paddingLeft,
           o = i.paddingBottom,
           r = i.start,
           l = +i.getRightValue(t),
           s = i.end - r;
          return i.isHorizontal() ? (a = i.width - (n + i.paddingRight), e = i.left + a / s * (l - r), Math.round(e + n)) : (a = i.height - (i.paddingTop + o), e = i.bottom - o - a / s * (l - r), Math.round(e))
         },
         getValueForPixel: function(t) {
          var e = this,
           a = e.isHorizontal(),
           i = e.paddingLeft,
           n = e.paddingBottom,
           o = a ? e.width - (i + e.paddingRight) : e.height - (e.paddingTop + n),
           r = (a ? t - e.left - i : e.bottom - n - t) / o;
          return e.start + (e.end - e.start) * r
         },
         getPixelForTick: function(t) {
          return this.getPixelForValue(this.ticksAsNumbers[t])
         }
        });
       t.scaleService.registerScaleType("linear", i, a)
      }
     }, {}],
     43: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       var e = t.helpers,
        a = e.noop;
       t.LinearScaleBase = t.Scale.extend({
        handleTickRangeOptions: function() {
         var t = this,
          a = t.options,
          i = a.ticks;
         if (i.beginAtZero) {
          var n = e.sign(t.min),
           o = e.sign(t.max);
          0 > n && 0 > o ? t.max = 0 : n > 0 && o > 0 && (t.min = 0)
         }
         void 0 !== i.min ? t.min = i.min : void 0 !== i.suggestedMin && (t.min = Math.min(t.min, i.suggestedMin)), void 0 !== i.max ? t.max = i.max : void 0 !== i.suggestedMax && (t.max = Math.max(t.max, i.suggestedMax)), t.min === t.max && (t.max++, i.beginAtZero || t.min--)
        },
        getTickLimit: a,
        handleDirectionalChanges: a,
        buildTicks: function() {
         var a = this,
          i = a.options,
          n = i.ticks,
          o = a.getTickLimit();
         o = Math.max(2, o);
         var r = {
           maxTicks: o,
           min: n.min,
           max: n.max,
           stepSize: e.getValueOrDefault(n.fixedStepSize, n.stepSize)
          },
          l = a.ticks = t.Ticks.generators.linear(r, a);
         a.handleDirectionalChanges(), a.max = e.max(l), a.min = e.min(l), n.reverse ? (l.reverse(), a.start = a.max, a.end = a.min) : (a.start = a.min, a.end = a.max)
        },
        convertTicksToLabels: function() {
         var e = this;
         e.ticksAsNumbers = e.ticks.slice(), e.zeroLineIndex = e.ticks.indexOf(0), t.Scale.prototype.convertTicksToLabels.call(e)
        }
       })
      }
     }, {}],
     44: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       var e = t.helpers,
        a = {
         position: "left",
         ticks: {
          callback: t.Ticks.formatters.logarithmic
         }
        },
        i = t.Scale.extend({
         determineDataLimits: function() {
          function t(t) {
           return d ? t.xAxisID === a.id : t.yAxisID === a.id
          }
          var a = this,
           i = a.options,
           n = i.ticks,
           o = a.chart,
           r = o.data,
           l = r.datasets,
           s = e.getValueOrDefault,
           d = a.isHorizontal();
          if (a.min = null, a.max = null, a.minNotZero = null, i.stacked) {
           var u = {};
           e.each(l, function(n, r) {
            var l = o.getDatasetMeta(r);
            o.isDatasetVisible(r) && t(l) && (void 0 === u[l.type] && (u[l.type] = []), e.each(n.data, function(t, e) {
             var n = u[l.type],
              o = +a.getRightValue(t);
             isNaN(o) || l.data[e].hidden || (n[e] = n[e] || 0, i.relativePoints ? n[e] = 100 : n[e] += o)
            }))
           }), e.each(u, function(t) {
            var i = e.min(t),
             n = e.max(t);
            a.min = null === a.min ? i : Math.min(a.min, i), a.max = null === a.max ? n : Math.max(a.max, n)
           })
          } else e.each(l, function(i, n) {
           var r = o.getDatasetMeta(n);
           o.isDatasetVisible(n) && t(r) && e.each(i.data, function(t, e) {
            var i = +a.getRightValue(t);
            isNaN(i) || r.data[e].hidden || (null === a.min ? a.min = i : i < a.min && (a.min = i), null === a.max ? a.max = i : i > a.max && (a.max = i), 0 !== i && (null === a.minNotZero || i < a.minNotZero) && (a.minNotZero = i))
           })
          });
          a.min = s(n.min, a.min), a.max = s(n.max, a.max), a.min === a.max && (0 !== a.min && null !== a.min ? (a.min = Math.pow(10, Math.floor(e.log10(a.min)) - 1), a.max = Math.pow(10, Math.floor(e.log10(a.max)) + 1)) : (a.min = 1, a.max = 10))
         },
         buildTicks: function() {
          var a = this,
           i = a.options,
           n = i.ticks,
           o = {
            min: n.min,
            max: n.max
           },
           r = a.ticks = t.Ticks.generators.logarithmic(o, a);
          a.isHorizontal() || r.reverse(), a.max = e.max(r), a.min = e.min(r), n.reverse ? (r.reverse(), a.start = a.max, a.end = a.min) : (a.start = a.min, a.end = a.max)
         },
         convertTicksToLabels: function() {
          this.tickValues = this.ticks.slice(), t.Scale.prototype.convertTicksToLabels.call(this)
         },
         getLabelForIndex: function(t, e) {
          return +this.getRightValue(this.chart.data.datasets[e].data[t])
         },
         getPixelForTick: function(t) {
          return this.getPixelForValue(this.tickValues[t])
         },
         getPixelForValue: function(t) {
          var a, i, n, o = this,
           r = o.start,
           l = +o.getRightValue(t),
           s = o.paddingTop,
           d = o.paddingBottom,
           u = o.paddingLeft,
           c = o.options,
           h = c.ticks;
          return o.isHorizontal() ? (n = e.log10(o.end) - e.log10(r), 0 === l ? i = o.left + u : (a = o.width - (u + o.paddingRight), i = o.left + a / n * (e.log10(l) - e.log10(r)), i += u)) : (a = o.height - (s + d), 0 !== r || h.reverse ? 0 === o.end && h.reverse ? (n = e.log10(o.start) - e.log10(o.minNotZero), i = l === o.end ? o.top + s : l === o.minNotZero ? o.top + s + .02 * a : o.top + s + .02 * a + .98 * a / n * (e.log10(l) - e.log10(o.minNotZero))) : (n = e.log10(o.end) - e.log10(r), a = o.height - (s + d), i = o.bottom - d - a / n * (e.log10(l) - e.log10(r))) : (n = e.log10(o.end) - e.log10(o.minNotZero), i = l === r ? o.bottom - d : l === o.minNotZero ? o.bottom - d - .02 * a : o.bottom - d - .02 * a - .98 * a / n * (e.log10(l) - e.log10(o.minNotZero)))), i
         },
         getValueForPixel: function(t) {
          var a, i, n = this,
           o = e.log10(n.end) - e.log10(n.start);
          return n.isHorizontal() ? (i = n.width - (n.paddingLeft + n.paddingRight), a = n.start * Math.pow(10, (t - n.left - n.paddingLeft) * o / i)) : (i = n.height - (n.paddingTop + n.paddingBottom), a = Math.pow(10, (n.bottom - n.paddingBottom - t) * o / i) / n.start), a
         }
        });
       t.scaleService.registerScaleType("logarithmic", i, a)
      }
     }, {}],
     45: [function(t, e, a) {
      "use strict";
      e.exports = function(t) {
       var e = t.helpers,
        a = t.defaults.global,
        i = {
         display: !0,
         animate: !0,
         lineArc: !1,
         position: "chartArea",
         angleLines: {
          display: !0,
          color: "rgba(0, 0, 0, 0.1)",
          lineWidth: 1
         },
         ticks: {
          showLabelBackdrop: !0,
          backdropColor: "rgba(255,255,255,0.75)",
          backdropPaddingY: 2,
          backdropPaddingX: 2,
          callback: t.Ticks.formatters.linear
         },
         pointLabels: {
          fontSize: 10,
          callback: function(t) {
           return t
          }
         }
        },
        n = t.LinearScaleBase.extend({
         getValueCount: function() {
          return this.chart.data.labels.length
         },
         setDimensions: function() {
          var t = this,
           i = t.options,
           n = i.ticks;
          t.width = t.maxWidth, t.height = t.maxHeight, t.xCenter = Math.round(t.width / 2), t.yCenter = Math.round(t.height / 2);
          var o = e.min([t.height, t.width]),
           r = e.getValueOrDefault(n.fontSize, a.defaultFontSize);
          t.drawingArea = i.display ? o / 2 - (r / 2 + n.backdropPaddingY) : o / 2
         },
         determineDataLimits: function() {
          var t = this,
           a = t.chart;
          t.min = null, t.max = null, e.each(a.data.datasets, function(i, n) {
           if (a.isDatasetVisible(n)) {
            var o = a.getDatasetMeta(n);
            e.each(i.data, function(e, a) {
             var i = +t.getRightValue(e);
             isNaN(i) || o.data[a].hidden || (null === t.min ? t.min = i : i < t.min && (t.min = i), null === t.max ? t.max = i : i > t.max && (t.max = i))
            })
           }
          }), t.handleTickRangeOptions()
         },
         getTickLimit: function() {
          var t = this.options.ticks,
           i = e.getValueOrDefault(t.fontSize, a.defaultFontSize);
          return Math.min(t.maxTicksLimit ? t.maxTicksLimit : 11, Math.ceil(this.drawingArea / (1.5 * i)))
         },
         convertTicksToLabels: function() {
          var e = this;
          t.LinearScaleBase.prototype.convertTicksToLabels.call(e), e.pointLabels = e.chart.data.labels.map(e.options.pointLabels.callback, e)
         },
         getLabelForIndex: function(t, e) {
          return +this.getRightValue(this.chart.data.datasets[e].data[t])
         },
         fit: function() {
          var t, i, n, o, r, l, s, d, u, c, h, f, g = this.options.pointLabels,
           p = e.getValueOrDefault(g.fontSize, a.defaultFontSize),
           m = e.getValueOrDefault(g.fontStyle, a.defaultFontStyle),
           b = e.getValueOrDefault(g.fontFamily, a.defaultFontFamily),
           v = e.fontString(p, m, b),
           x = e.min([this.height / 2 - p - 5, this.width / 2]),
           y = this.width,
           k = 0;
          for (this.ctx.font = v, i = 0; i < this.getValueCount(); i++) {
           t = this.getPointPosition(i, x), n = this.ctx.measureText(this.pointLabels[i] ? this.pointLabels[i] : "").width + 5;
           var S = this.getIndexAngle(i) + Math.PI / 2,
            w = 360 * S / (2 * Math.PI) % 360;
           0 === w || 180 === w ? (o = n / 2, t.x + o > y && (y = t.x + o, r = i), t.x - o < k && (k = t.x - o, s = i)) : 180 > w ? t.x + n > y && (y = t.x + n, r = i) : t.x - n < k && (k = t.x - n, s = i)
          }
          u = k, c = Math.ceil(y - this.width), l = this.getIndexAngle(r), d = this.getIndexAngle(s), h = c / Math.sin(l + Math.PI / 2), f = u / Math.sin(d + Math.PI / 2), h = e.isNumber(h) ? h : 0, f = e.isNumber(f) ? f : 0, this.drawingArea = Math.round(x - (f + h) / 2), this.setCenterPoint(f, h)
         },
         setCenterPoint: function(t, e) {
          var a = this,
           i = a.width - e - a.drawingArea,
           n = t + a.drawingArea;
          a.xCenter = Math.round((n + i) / 2 + a.left), a.yCenter = Math.round(a.height / 2 + a.top)
         },
         getIndexAngle: function(t) {
          var e = 2 * Math.PI / this.getValueCount(),
           a = this.chart.options && this.chart.options.startAngle ? this.chart.options.startAngle : 0,
           i = a * Math.PI * 2 / 360;
          return t * e - Math.PI / 2 + i
         },
         getDistanceFromCenterForValue: function(t) {
          var e = this;
          if (null === t) return 0;
          var a = e.drawingArea / (e.max - e.min);
          return e.options.reverse ? (e.max - t) * a : (t - e.min) * a
         },
         getPointPosition: function(t, e) {
          var a = this,
           i = a.getIndexAngle(t);
          return {
           x: Math.round(Math.cos(i) * e) + a.xCenter,
           y: Math.round(Math.sin(i) * e) + a.yCenter
          }
         },
         getPointPositionForValue: function(t, e) {
          return this.getPointPosition(t, this.getDistanceFromCenterForValue(e))
         },
         getBasePosition: function() {
          var t = this,
           e = t.min,
           a = t.max;
          return t.getPointPositionForValue(0, t.beginAtZero ? 0 : 0 > e && 0 > a ? a : e > 0 && a > 0 ? e : 0)
         },
         draw: function() {
          var t = this,
           i = t.options,
           n = i.gridLines,
           o = i.ticks,
           r = i.angleLines,
           l = i.pointLabels,
           s = e.getValueOrDefault;
          if (i.display) {
           var d = t.ctx,
            u = s(o.fontSize, a.defaultFontSize),
            c = s(o.fontStyle, a.defaultFontStyle),
            h = s(o.fontFamily, a.defaultFontFamily),
            f = e.fontString(u, c, h);
           if (e.each(t.ticks, function(r, l) {
             if (l > 0 || i.reverse) {
              var c = t.getDistanceFromCenterForValue(t.ticksAsNumbers[l]),
               h = t.yCenter - c;
              if (n.display && 0 !== l)
               if (d.strokeStyle = e.getValueAtIndexOrDefault(n.color, l - 1), d.lineWidth = e.getValueAtIndexOrDefault(n.lineWidth, l - 1), i.lineArc) d.beginPath(), d.arc(t.xCenter, t.yCenter, c, 0, 2 * Math.PI), d.closePath(), d.stroke();
               else {
                d.beginPath();
                for (var g = 0; g < t.getValueCount(); g++) {
                 var p = t.getPointPosition(g, c);
                 0 === g ? d.moveTo(p.x, p.y) : d.lineTo(p.x, p.y)
                }
                d.closePath(), d.stroke()
               } if (o.display) {
               var m = s(o.fontColor, a.defaultFontColor);
               if (d.font = f, o.showLabelBackdrop) {
                var b = d.measureText(r).width;
                d.fillStyle = o.backdropColor, d.fillRect(t.xCenter - b / 2 - o.backdropPaddingX, h - u / 2 - o.backdropPaddingY, b + 2 * o.backdropPaddingX, u + 2 * o.backdropPaddingY)
               }
               d.textAlign = "center", d.textBaseline = "middle", d.fillStyle = m, d.fillText(r, t.xCenter, h)
              }
             }
            }), !i.lineArc) {
            d.lineWidth = r.lineWidth, d.strokeStyle = r.color;
            for (var g = t.getDistanceFromCenterForValue(i.reverse ? t.min : t.max), p = s(l.fontSize, a.defaultFontSize), m = s(l.fontStyle, a.defaultFontStyle), b = s(l.fontFamily, a.defaultFontFamily), v = e.fontString(p, m, b), x = t.getValueCount() - 1; x >= 0; x--) {
             if (r.display) {
              var y = t.getPointPosition(x, g);
              d.beginPath(), d.moveTo(t.xCenter, t.yCenter), d.lineTo(y.x, y.y), d.stroke(), d.closePath()
             }
             var k = t.getPointPosition(x, g + 5),
              S = s(l.fontColor, a.defaultFontColor);
             d.font = v, d.fillStyle = S;
             var w = t.pointLabels,
              M = this.getIndexAngle(x) + Math.PI / 2,
              C = 360 * M / (2 * Math.PI) % 360;
             0 === C || 180 === C ? d.textAlign = "center" : 180 > C ? d.textAlign = "left" : d.textAlign = "right", 90 === C || 270 === C ? d.textBaseline = "middle" : C > 270 || 90 > C ? d.textBaseline = "bottom" : d.textBaseline = "top", d.fillText(w[x] ? w[x] : "", k.x, k.y)
            }
           }
          }
         }
        });
       t.scaleService.registerScaleType("radialLinear", n, i)
      }
     }, {}],
     46: [function(t, e, a) {
      "use strict";
      var i = t(1);
      i = "function" == typeof i ? i : window.moment, e.exports = function(t) {
       var e = t.helpers,
        a = {
         units: [{
          name: "millisecond",
          steps: [1, 2, 5, 10, 20, 50, 100, 250, 500]
         }, {
          name: "second",
          steps: [1, 2, 5, 10, 30]
         }, {
          name: "minute",
          steps: [1, 2, 5, 10, 30]
         }, {
          name: "hour",
          steps: [1, 2, 3, 6, 12]
         }, {
          name: "day",
          steps: [1, 2, 5]
         }, {
          name: "week",
          maxStep: 4
         }, {
          name: "month",
          maxStep: 3
         }, {
          name: "quarter",
          maxStep: 4
         }, {
          name: "year",
          maxStep: !1
         }]
        },
        n = {
         position: "bottom",
         time: {
          parser: !1,
          format: !1,
          unit: !1,
          round: !1,
          displayFormat: !1,
          isoWeekday: !1,
          minUnit: "millisecond",
          displayFormats: {
           millisecond: "h:mm:ss.SSS a",
           second: "h:mm:ss a",
           minute: "h:mm:ss a",
           hour: "MMM D, hA",
           day: "ll",
           week: "ll",
           month: "MMM YYYY",
           quarter: "[Q]Q - YYYY",
           year: "YYYY"
          }
         },
         ticks: {
          autoSkip: !1
         }
        },
        o = t.Scale.extend({
         initialize: function() {
          if (!i) throw new Error("Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com");
          t.Scale.prototype.initialize.call(this)
         },
         getLabelMoment: function(t, e) {
          return null === t || null === e ? null : "undefined" != typeof this.labelMoments[t] ? this.labelMoments[t][e] : null
         },
         getLabelDiff: function(t, e) {
          var a = this;
          return null === t || null === e ? null : (void 0 === a.labelDiffs && a.buildLabelDiffs(), "undefined" != typeof a.labelDiffs[t] ? a.labelDiffs[t][e] : null)
         },
         getMomentStartOf: function(t) {
          var e = this;
          return "week" === e.options.time.unit && e.options.time.isoWeekday !== !1 ? t.clone().startOf("isoWeek").isoWeekday(e.options.time.isoWeekday) : t.clone().startOf(e.tickUnit)
         },
         determineDataLimits: function() {
          var t = this;
          t.labelMoments = [];
          var a = [];
          t.chart.data.labels && t.chart.data.labels.length > 0 ? (e.each(t.chart.data.labels, function(e) {
           var i = t.parseTime(e);
           i.isValid() && (t.options.time.round && i.startOf(t.options.time.round), a.push(i))
          }, t), t.firstTick = i.min.call(t, a), t.lastTick = i.max.call(t, a)) : (t.firstTick = null, t.lastTick = null), e.each(t.chart.data.datasets, function(n, o) {
           var r = [],
            l = t.chart.isDatasetVisible(o);
           "object" == typeof n.data[0] && null !== n.data[0] ? e.each(n.data, function(e) {
            var a = t.parseTime(t.getRightValue(e));
            a.isValid() && (t.options.time.round && a.startOf(t.options.time.round), r.push(a), l && (t.firstTick = null !== t.firstTick ? i.min(t.firstTick, a) : a, t.lastTick = null !== t.lastTick ? i.max(t.lastTick, a) : a))
           }, t) : r = a, t.labelMoments.push(r)
          }, t), t.options.time.min && (t.firstTick = t.parseTime(t.options.time.min)), t.options.time.max && (t.lastTick = t.parseTime(t.options.time.max)), t.firstTick = (t.firstTick || i()).clone(), t.lastTick = (t.lastTick || i()).clone()
         },
         buildLabelDiffs: function() {
          var t = this;
          t.labelDiffs = [];
          var a = [];
          t.chart.data.labels && t.chart.data.labels.length > 0 && e.each(t.chart.data.labels, function(e) {
           var i = t.parseTime(e);
           i.isValid() && (t.options.time.round && i.startOf(t.options.time.round), a.push(i.diff(t.firstTick, t.tickUnit, !0)))
          }, t), e.each(t.chart.data.datasets, function(i) {
           var n = [];
           "object" == typeof i.data[0] && null !== i.data[0] ? e.each(i.data, function(e) {
            var a = t.parseTime(t.getRightValue(e));
            a.isValid() && (t.options.time.round && a.startOf(t.options.time.round), n.push(a.diff(t.firstTick, t.tickUnit, !0)))
           }, t) : n = a, t.labelDiffs.push(n)
          }, t)
         },
         buildTicks: function() {
          var i = this;
          i.ctx.save();
          var n = e.getValueOrDefault(i.options.ticks.fontSize, t.defaults.global.defaultFontSize),
           o = e.getValueOrDefault(i.options.ticks.fontStyle, t.defaults.global.defaultFontStyle),
           r = e.getValueOrDefault(i.options.ticks.fontFamily, t.defaults.global.defaultFontFamily),
           l = e.fontString(n, o, r);
          if (i.ctx.font = l, i.ticks = [], i.unitScale = 1, i.scaleSizeInUnits = 0, i.options.time.unit) i.tickUnit = i.options.time.unit || "day", i.displayFormat = i.options.time.displayFormats[i.tickUnit], i.scaleSizeInUnits = i.lastTick.diff(i.firstTick, i.tickUnit, !0), i.unitScale = e.getValueOrDefault(i.options.time.unitStepSize, 1);
          else {
           var s = i.isHorizontal() ? i.width - (i.paddingLeft + i.paddingRight) : i.height - (i.paddingTop + i.paddingBottom),
            d = i.tickFormatFunction(i.firstTick, 0, []),
            u = i.ctx.measureText(d).width,
            c = Math.cos(e.toRadians(i.options.ticks.maxRotation)),
            h = Math.sin(e.toRadians(i.options.ticks.maxRotation));
           u = u * c + n * h;
           var f = s / u;
           i.tickUnit = i.options.time.minUnit, i.scaleSizeInUnits = i.lastTick.diff(i.firstTick, i.tickUnit, !0), i.displayFormat = i.options.time.displayFormats[i.tickUnit];
           for (var g = 0, p = a.units[g]; g < a.units.length;) {
            if (i.unitScale = 1, e.isArray(p.steps) && Math.ceil(i.scaleSizeInUnits / f) < e.max(p.steps)) {
             for (var m = 0; m < p.steps.length; ++m)
              if (p.steps[m] >= Math.ceil(i.scaleSizeInUnits / f)) {
               i.unitScale = e.getValueOrDefault(i.options.time.unitStepSize, p.steps[m]);
               break
              } break
            }
            if (p.maxStep === !1 || Math.ceil(i.scaleSizeInUnits / f) < p.maxStep) {
             i.unitScale = e.getValueOrDefault(i.options.time.unitStepSize, Math.ceil(i.scaleSizeInUnits / f));
             break
            }++g, p = a.units[g], i.tickUnit = p.name;
            var b = i.firstTick.diff(i.getMomentStartOf(i.firstTick), i.tickUnit, !0),
             v = i.getMomentStartOf(i.lastTick.clone().add(1, i.tickUnit)).diff(i.lastTick, i.tickUnit, !0);
            i.scaleSizeInUnits = i.lastTick.diff(i.firstTick, i.tickUnit, !0) + b + v, i.displayFormat = i.options.time.displayFormats[p.name]
           }
          }
          var x;
          if (i.options.time.min ? x = i.getMomentStartOf(i.firstTick) : (i.firstTick = i.getMomentStartOf(i.firstTick), x = i.firstTick), !i.options.time.max) {
           var y = i.getMomentStartOf(i.lastTick),
            k = y.diff(i.lastTick, i.tickUnit, !0);
           0 > k ? i.lastTick = i.getMomentStartOf(i.lastTick.add(1, i.tickUnit)) : k >= 0 && (i.lastTick = y), i.scaleSizeInUnits = i.lastTick.diff(i.firstTick, i.tickUnit, !0)
          }
          i.options.time.displayFormat && (i.displayFormat = i.options.time.displayFormat), i.ticks.push(i.firstTick.clone());
          for (var S = 1; S <= i.scaleSizeInUnits; ++S) {
           var w = x.clone().add(S, i.tickUnit);
           if (i.options.time.max && w.diff(i.lastTick, i.tickUnit, !0) >= 0) break;
           S % i.unitScale === 0 && i.ticks.push(w)
          }
          var M = i.ticks[i.ticks.length - 1].diff(i.lastTick, i.tickUnit);
          (0 !== M || 0 === i.scaleSizeInUnits) && (i.options.time.max ? (i.ticks.push(i.lastTick.clone()), i.scaleSizeInUnits = i.lastTick.diff(i.ticks[0], i.tickUnit, !0)) : (i.ticks.push(i.lastTick.clone()), i.scaleSizeInUnits = i.lastTick.diff(i.firstTick, i.tickUnit, !0))), i.ctx.restore(), i.labelDiffs = void 0
         },
         getLabelForIndex: function(t, e) {
          var a = this,
           i = a.chart.data.labels && t < a.chart.data.labels.length ? a.chart.data.labels[t] : "";
          return "object" == typeof a.chart.data.datasets[e].data[0] && (i = a.getRightValue(a.chart.data.datasets[e].data[t])), a.options.time.tooltipFormat && (i = a.parseTime(i).format(a.options.time.tooltipFormat)), i
         },
         tickFormatFunction: function(t, a, i) {
          var n = t.format(this.displayFormat),
           o = this.options.ticks,
           r = e.getValueOrDefault(o.callback, o.userCallback);
          return r ? r(n, a, i) : n
         },
         convertTicksToLabels: function() {
          var t = this;
          t.tickMoments = t.ticks, t.ticks = t.ticks.map(t.tickFormatFunction, t)
         },
         getPixelForValue: function(t, e, a) {
          var i = this,
           n = null;
          if (void 0 !== e && void 0 !== a && (n = i.getLabelDiff(a, e)), null === n && (t && t.isValid || (t = i.parseTime(i.getRightValue(t))), t && t.isValid && t.isValid() && (n = t.diff(i.firstTick, i.tickUnit, !0))), null !== n) {
           var o = 0 !== n ? n / i.scaleSizeInUnits : n;
           if (i.isHorizontal()) {
            var r = i.width - (i.paddingLeft + i.paddingRight),
             l = r * o + i.paddingLeft;
            return i.left + Math.round(l)
           }
           var s = i.height - (i.paddingTop + i.paddingBottom),
            d = s * o + i.paddingTop;
           return i.top + Math.round(d)
          }
         },
         getPixelForTick: function(t) {
          return this.getPixelForValue(this.tickMoments[t], null, null)
         },
         getValueForPixel: function(t) {
          var e = this,
           a = e.isHorizontal() ? e.width - (e.paddingLeft + e.paddingRight) : e.height - (e.paddingTop + e.paddingBottom),
           n = (t - (e.isHorizontal() ? e.left + e.paddingLeft : e.top + e.paddingTop)) / a;
          return n *= e.scaleSizeInUnits, e.firstTick.clone().add(i.duration(n, e.tickUnit).asSeconds(), "seconds")
         },
         parseTime: function(t) {
          var e = this;
          return "string" == typeof e.options.time.parser ? i(t, e.options.time.parser) : "function" == typeof e.options.time.parser ? e.options.time.parser(t) : "function" == typeof t.getMonth || "number" == typeof t ? i(t) : t.isValid && t.isValid() ? t : "string" != typeof e.options.time.format && e.options.time.format.call ? (console.warn("options.time.format is deprecated and replaced by options.time.parser. See http://nnnick.github.io/Chart.js/docs-v2/#scales-time-scale"), e.options.time.format(t)) : i(t, e.options.time.format)
         }
        });
       t.scaleService.registerScaleType("time", o, n)
      }
     }, {
      1: 1
     }]
    }, {}, [7])(7)
   });
   
   
   /*
    * Slick slider	
    * Version: 1.6.0
    * Author: Ken Wheeler
    * Website: http://kenwheeler.github.io
    * Docs: http://kenwheeler.github.io/slick
    * Repo: http://github.com/kenwheeler/slick
    * Issues: http://github.com/kenwheeler/slick/issues
    */
   ! function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
   }(function(a) {
    "use strict";
    var b = window.Slick || {};
    b = function() {
     function c(c, d) {
      var f, e = this;
      e.defaults = {
       accessibility: !0,
       adaptiveHeight: !1,
       appendArrows: a(c),
       appendDots: a(c),
       arrows: !0,
       asNavFor: null,
       prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
       nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
       autoplay: !1,
       autoplaySpeed: 3e3,
       centerMode: !1,
       centerPadding: "50px",
       cssEase: "ease",
       customPaging: function(b, c) {
        return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c + 1)
       },
       dots: !1,
       dotsClass: "slick-dots",
       draggable: !0,
       easing: "linear",
       edgeFriction: .35,
       fade: !1,
       focusOnSelect: !1,
       infinite: !0,
       initialSlide: 0,
       lazyLoad: "ondemand",
       mobileFirst: !1,
       pauseOnHover: !0,
       pauseOnFocus: !0,
       pauseOnDotsHover: !1,
       respondTo: "window",
       responsive: null,
       rows: 1,
       rtl: !1,
       slide: "",
       slidesPerRow: 1,
       slidesToShow: 1,
       slidesToScroll: 1,
       speed: 500,
       swipe: !0,
       swipeToSlide: !1,
       touchMove: !0,
       touchThreshold: 5,
       useCSS: !0,
       useTransform: !0,
       variableWidth: !1,
       vertical: !1,
       verticalSwiping: !1,
       waitForAnimate: !0,
       zIndex: 1e3
      }, e.initials = {
       animating: !1,
       dragging: !1,
       autoPlayTimer: null,
       currentDirection: 0,
       currentLeft: null,
       currentSlide: 0,
       direction: 1,
       $dots: null,
       listWidth: null,
       listHeight: null,
       loadIndex: 0,
       $nextArrow: null,
       $prevArrow: null,
       slideCount: null,
       slideWidth: null,
       $slideTrack: null,
       $slides: null,
       sliding: !1,
       slideOffset: 0,
       swipeLeft: null,
       $list: null,
       touchObject: {},
       transformsEnabled: !1,
       unslicked: !1
      }, a.extend(e, e.initials), e.activeBreakpoint = null, e.animType = null, e.animProp = null, e.breakpoints = [], e.breakpointSettings = [], e.cssTransitions = !1, e.focussed = !1, e.interrupted = !1, e.hidden = "hidden", e.paused = !0, e.positionProp = null, e.respondTo = null, e.rowCount = 1, e.shouldClick = !0, e.$slider = a(c), e.$slidesCache = null, e.transformType = null, e.transitionType = null, e.visibilityChange = "visibilitychange", e.windowWidth = 0, e.windowTimer = null, f = a(c).data("slick") || {}, e.options = a.extend({}, e.defaults, d, f), e.currentSlide = e.options.initialSlide, e.originalSettings = e.options, "undefined" != typeof document.mozHidden ? (e.hidden = "mozHidden", e.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (e.hidden = "webkitHidden", e.visibilityChange = "webkitvisibilitychange"), e.autoPlay = a.proxy(e.autoPlay, e), e.autoPlayClear = a.proxy(e.autoPlayClear, e), e.autoPlayIterator = a.proxy(e.autoPlayIterator, e), e.changeSlide = a.proxy(e.changeSlide, e), e.clickHandler = a.proxy(e.clickHandler, e), e.selectHandler = a.proxy(e.selectHandler, e), e.setPosition = a.proxy(e.setPosition, e), e.swipeHandler = a.proxy(e.swipeHandler, e), e.dragHandler = a.proxy(e.dragHandler, e), e.keyHandler = a.proxy(e.keyHandler, e), e.instanceUid = b++, e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, e.registerBreakpoints(), e.init(!0)
     }
     var b = 0;
     return c
    }(), b.prototype.activateADA = function() {
     var a = this;
     a.$slideTrack.find(".slick-active").attr({
      "aria-hidden": "false"
     }).find("a, input, button, select").attr({
      tabindex: "0"
     })
    }, b.prototype.addSlide = b.prototype.slickAdd = function(b, c, d) {
     var e = this;
     if ("boolean" == typeof c) d = c, c = null;
     else if (0 > c || c >= e.slideCount) return !1;
     e.unload(), "number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : d === !0 ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack), e.$slides = e.$slideTrack.children(this.options.slide), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.append(e.$slides), e.$slides.each(function(b, c) {
      a(c).attr("data-slick-index", b)
     }), e.$slidesCache = e.$slides, e.reinit()
    }, b.prototype.animateHeight = function() {
     var a = this;
     if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
      var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
      a.$list.animate({
       height: b
      }, a.options.speed)
     }
    }, b.prototype.animateSlide = function(b, c) {
     var d = {},
      e = this;
     e.animateHeight(), e.options.rtl === !0 && e.options.vertical === !1 && (b = -b), e.transformsEnabled === !1 ? e.options.vertical === !1 ? e.$slideTrack.animate({
      left: b
     }, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({
      top: b
     }, e.options.speed, e.options.easing, c) : e.cssTransitions === !1 ? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft), a({
      animStart: e.currentLeft
     }).animate({
      animStart: b
     }, {
      duration: e.options.speed,
      easing: e.options.easing,
      step: function(a) {
       a = Math.ceil(a), e.options.vertical === !1 ? (d[e.animType] = "translate(" + a + "px, 0px)", e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)", e.$slideTrack.css(d))
      },
      complete: function() {
       c && c.call()
      }
     })) : (e.applyTransition(), b = Math.ceil(b), e.options.vertical === !1 ? d[e.animType] = "translate3d(" + b + "px, 0px, 0px)" : d[e.animType] = "translate3d(0px," + b + "px, 0px)", e.$slideTrack.css(d), c && setTimeout(function() {
      e.disableTransition(), c.call()
     }, e.options.speed))
    }, b.prototype.getNavTarget = function() {
     var b = this,
      c = b.options.asNavFor;
     return c && null !== c && (c = a(c).not(b.$slider)), c
    }, b.prototype.asNavFor = function(b) {
     var c = this,
      d = c.getNavTarget();
     null !== d && "object" == typeof d && d.each(function() {
      var c = a(this).slick("getSlick");
      c.unslicked || c.slideHandler(b, !0)
     })
    }, b.prototype.applyTransition = function(a) {
     var b = this,
      c = {};
     b.options.fade === !1 ? c[b.transitionType] = b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : c[b.transitionType] = "opacity " + b.options.speed + "ms " + b.options.cssEase, b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
    }, b.prototype.autoPlay = function() {
     var a = this;
     a.autoPlayClear(), a.slideCount > a.options.slidesToShow && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed))
    }, b.prototype.autoPlayClear = function() {
     var a = this;
     a.autoPlayTimer && clearInterval(a.autoPlayTimer)
    }, b.prototype.autoPlayIterator = function() {
     var a = this,
      b = a.currentSlide + a.options.slidesToScroll;
     a.paused || a.interrupted || a.focussed || (a.options.infinite === !1 && (1 === a.direction && a.currentSlide + 1 === a.slideCount - 1 ? a.direction = 0 : 0 === a.direction && (b = a.currentSlide - a.options.slidesToScroll, a.currentSlide - 1 === 0 && (a.direction = 1))), a.slideHandler(b))
    }, b.prototype.buildArrows = function() {
     var b = this;
     b.options.arrows === !0 && (b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow"), b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow"), b.slideCount > b.options.slidesToShow ? (b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.prependTo(b.options.appendArrows), b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows), b.options.infinite !== !0 && b.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({
      "aria-disabled": "true",
      tabindex: "-1"
     }))
    }, b.prototype.buildDots = function() {
     var c, d, b = this;
     if (b.options.dots === !0 && b.slideCount > b.options.slidesToShow) {
      for (b.$slider.addClass("slick-dotted"), d = a("<ul />").addClass(b.options.dotsClass), c = 0; c <= b.getDotCount(); c += 1) d.append(a("<li />").append(b.options.customPaging.call(this, b, c)));
      b.$dots = d.appendTo(b.options.appendDots), b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
     }
    }, b.prototype.buildOut = function() {
     var b = this;
     b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), b.slideCount = b.$slides.length, b.$slides.each(function(b, c) {
      a(c).attr("data-slick-index", b).data("originalStyling", a(c).attr("style") || "")
     }), b.$slider.addClass("slick-slider"), b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(), b.$list = b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), b.$slideTrack.css("opacity", 0), (b.options.centerMode === !0 || b.options.swipeToSlide === !0) && (b.options.slidesToScroll = 1), a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"), b.setupInfinite(), b.buildArrows(), b.buildDots(), b.updateDots(), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.options.draggable === !0 && b.$list.addClass("draggable")
    }, b.prototype.buildRows = function() {
     var b, c, d, e, f, g, h, a = this;
     if (e = document.createDocumentFragment(), g = a.$slider.children(), a.options.rows > 1) {
      for (h = a.options.slidesPerRow * a.options.rows, f = Math.ceil(g.length / h), b = 0; f > b; b++) {
       var i = document.createElement("div");
       for (c = 0; c < a.options.rows; c++) {
        var j = document.createElement("div");
        for (d = 0; d < a.options.slidesPerRow; d++) {
         var k = b * h + (c * a.options.slidesPerRow + d);
         g.get(k) && j.appendChild(g.get(k))
        }
        i.appendChild(j)
       }
       e.appendChild(i)
      }
      a.$slider.empty().append(e), a.$slider.children().children().children().css({
       width: 100 / a.options.slidesPerRow + "%",
       display: "inline-block"
      })
     }
    }, b.prototype.checkResponsive = function(b, c) {
     var e, f, g, d = this,
      h = !1,
      i = d.$slider.width(),
      j = window.innerWidth || a(window).width();
     if ("window" === d.respondTo ? g = j : "slider" === d.respondTo ? g = i : "min" === d.respondTo && (g = Math.min(j, i)), d.options.responsive && d.options.responsive.length && null !== d.options.responsive) {
      f = null;
      for (e in d.breakpoints) d.breakpoints.hasOwnProperty(e) && (d.originalSettings.mobileFirst === !1 ? g < d.breakpoints[e] && (f = d.breakpoints[e]) : g > d.breakpoints[e] && (f = d.breakpoints[e]));
      null !== f ? null !== d.activeBreakpoint ? (f !== d.activeBreakpoint || c) && (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : null !== d.activeBreakpoint && (d.activeBreakpoint = null, d.options = d.originalSettings, b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b), h = f), b || h === !1 || d.$slider.trigger("breakpoint", [d, h])
     }
    }, b.prototype.changeSlide = function(b, c) {
     var f, g, h, d = this,
      e = a(b.currentTarget);
     switch (e.is("a") && b.preventDefault(), e.is("li") || (e = e.closest("li")), h = d.slideCount % d.options.slidesToScroll !== 0, f = h ? 0 : (d.slideCount - d.currentSlide) % d.options.slidesToScroll, b.data.message) {
      case "previous":
       g = 0 === f ? d.options.slidesToScroll : d.options.slidesToShow - f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide - g, !1, c);
       break;
      case "next":
       g = 0 === f ? d.options.slidesToScroll : f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide + g, !1, c);
       break;
      case "index":
       var i = 0 === b.data.index ? 0 : b.data.index || e.index() * d.options.slidesToScroll;
       d.slideHandler(d.checkNavigable(i), !1, c), e.children().trigger("focus");
       break;
      default:
       return
     }
    }, b.prototype.checkNavigable = function(a) {
     var c, d, b = this;
     if (c = b.getNavigableIndexes(), d = 0, a > c[c.length - 1]) a = c[c.length - 1];
     else
      for (var e in c) {
       if (a < c[e]) {
        a = d;
        break
       }
       d = c[e]
      }
     return a
    }, b.prototype.cleanUpEvents = function() {
     var b = this;
     b.options.dots && null !== b.$dots && a("li", b.$dots).off("click.slick", b.changeSlide).off("mouseenter.slick", a.proxy(b.interrupt, b, !0)).off("mouseleave.slick", a.proxy(b.interrupt, b, !1)), b.$slider.off("focus.slick blur.slick"), b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide), b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)), b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler), b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler), b.$list.off("touchend.slick mouseup.slick", b.swipeHandler), b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler), b.$list.off("click.slick", b.clickHandler), a(document).off(b.visibilityChange, b.visibility), b.cleanUpSlideEvents(), b.options.accessibility === !0 && b.$list.off("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().off("click.slick", b.selectHandler), a(window).off("orientationchange.slick.slick-" + b.instanceUid, b.orientationChange), a(window).off("resize.slick.slick-" + b.instanceUid, b.resize), a("[draggable!=true]", b.$slideTrack).off("dragstart", b.preventDefault), a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition)
    }, b.prototype.cleanUpSlideEvents = function() {
     var b = this;
     b.$list.off("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.off("mouseleave.slick", a.proxy(b.interrupt, b, !1))
    }, b.prototype.cleanUpRows = function() {
     var b, a = this;
     a.options.rows > 1 && (b = a.$slides.children().children(), b.removeAttr("style"), a.$slider.empty().append(b))
    }, b.prototype.clickHandler = function(a) {
     var b = this;
     b.shouldClick === !1 && (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault())
    }, b.prototype.destroy = function(b) {
     var c = this;
     c.autoPlayClear(), c.touchObject = {}, c.cleanUpEvents(), a(".slick-cloned", c.$slider).detach(), c.$dots && c.$dots.remove(), c.$prevArrow && c.$prevArrow.length && (c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()), c.$nextArrow && c.$nextArrow.length && (c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()), c.$slides && (c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
      a(this).attr("style", a(this).data("originalStyling"))
     }), c.$slideTrack.children(this.options.slide).detach(), c.$slideTrack.detach(), c.$list.detach(), c.$slider.append(c.$slides)), c.cleanUpRows(), c.$slider.removeClass("slick-slider"), c.$slider.removeClass("slick-initialized"), c.$slider.removeClass("slick-dotted"), c.unslicked = !0, b || c.$slider.trigger("destroy", [c])
    }, b.prototype.disableTransition = function(a) {
     var b = this,
      c = {};
     c[b.transitionType] = "", b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
    }, b.prototype.fadeSlide = function(a, b) {
     var c = this;
     c.cssTransitions === !1 ? (c.$slides.eq(a).css({
      zIndex: c.options.zIndex
     }), c.$slides.eq(a).animate({
      opacity: 1
     }, c.options.speed, c.options.easing, b)) : (c.applyTransition(a), c.$slides.eq(a).css({
      opacity: 1,
      zIndex: c.options.zIndex
     }), b && setTimeout(function() {
      c.disableTransition(a), b.call()
     }, c.options.speed))
    }, b.prototype.fadeSlideOut = function(a) {
     var b = this;
     b.cssTransitions === !1 ? b.$slides.eq(a).animate({
      opacity: 0,
      zIndex: b.options.zIndex - 2
     }, b.options.speed, b.options.easing) : (b.applyTransition(a), b.$slides.eq(a).css({
      opacity: 0,
      zIndex: b.options.zIndex - 2
     }))
    }, b.prototype.filterSlides = b.prototype.slickFilter = function(a) {
     var b = this;
     null !== a && (b.$slidesCache = b.$slides, b.unload(), b.$slideTrack.children(this.options.slide).detach(), b.$slidesCache.filter(a).appendTo(b.$slideTrack), b.reinit())
    }, b.prototype.focusHandler = function() {
     var b = this;
     b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function(c) {
      c.stopImmediatePropagation();
      var d = a(this);
      setTimeout(function() {
       b.options.pauseOnFocus && (b.focussed = d.is(":focus"), b.autoPlay())
      }, 0)
     })
    }, b.prototype.getCurrent = b.prototype.slickCurrentSlide = function() {
     var a = this;
     return a.currentSlide
    }, b.prototype.getDotCount = function() {
     var a = this,
      b = 0,
      c = 0,
      d = 0;
     if (a.options.infinite === !0)
      for (; b < a.slideCount;) ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
     else if (a.options.centerMode === !0) d = a.slideCount;
     else if (a.options.asNavFor)
      for (; b < a.slideCount;) ++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
     else d = 1 + Math.ceil((a.slideCount - a.options.slidesToShow) / a.options.slidesToScroll);
     return d - 1
    }, b.prototype.getLeft = function(a) {
     var c, d, f, b = this,
      e = 0;
     return b.slideOffset = 0, d = b.$slides.first().outerHeight(!0), b.options.infinite === !0 ? (b.slideCount > b.options.slidesToShow && (b.slideOffset = b.slideWidth * b.options.slidesToShow * -1, e = d * b.options.slidesToShow * -1), b.slideCount % b.options.slidesToScroll !== 0 && a + b.options.slidesToScroll > b.slideCount && b.slideCount > b.options.slidesToShow && (a > b.slideCount ? (b.slideOffset = (b.options.slidesToShow - (a - b.slideCount)) * b.slideWidth * -1, e = (b.options.slidesToShow - (a - b.slideCount)) * d * -1) : (b.slideOffset = b.slideCount % b.options.slidesToScroll * b.slideWidth * -1, e = b.slideCount % b.options.slidesToScroll * d * -1))) : a + b.options.slidesToShow > b.slideCount && (b.slideOffset = (a + b.options.slidesToShow - b.slideCount) * b.slideWidth, e = (a + b.options.slidesToShow - b.slideCount) * d), b.slideCount <= b.options.slidesToShow && (b.slideOffset = 0, e = 0), b.options.centerMode === !0 && b.options.infinite === !0 ? b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2) - b.slideWidth : b.options.centerMode === !0 && (b.slideOffset = 0, b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2)), c = b.options.vertical === !1 ? a * b.slideWidth * -1 + b.slideOffset : a * d * -1 + e, b.options.variableWidth === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, b.options.centerMode === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow + 1), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, c += (b.$list.width() - f.outerWidth()) / 2)), c
    }, b.prototype.getOption = b.prototype.slickGetOption = function(a) {
     var b = this;
     return b.options[a]
    }, b.prototype.getNavigableIndexes = function() {
     var e, a = this,
      b = 0,
      c = 0,
      d = [];
     for (a.options.infinite === !1 ? e = a.slideCount : (b = -1 * a.options.slidesToScroll, c = -1 * a.options.slidesToScroll, e = 2 * a.slideCount); e > b;) d.push(b), b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
     return d
    }, b.prototype.getSlick = function() {
     return this
    }, b.prototype.getSlideCount = function() {
     var c, d, e, b = this;
     return e = b.options.centerMode === !0 ? b.slideWidth * Math.floor(b.options.slidesToShow / 2) : 0, b.options.swipeToSlide === !0 ? (b.$slideTrack.find(".slick-slide").each(function(c, f) {
      return f.offsetLeft - e + a(f).outerWidth() / 2 > -1 * b.swipeLeft ? (d = f, !1) : void 0
     }), c = Math.abs(a(d).attr("data-slick-index") - b.currentSlide) || 1) : b.options.slidesToScroll
    }, b.prototype.goTo = b.prototype.slickGoTo = function(a, b) {
     var c = this;
     c.changeSlide({
      data: {
       message: "index",
       index: parseInt(a)
      }
     }, b)
    }, b.prototype.init = function(b) {
     var c = this;
     a(c.$slider).hasClass("slick-initialized") || (a(c.$slider).addClass("slick-initialized"), c.buildRows(), c.buildOut(), c.setProps(), c.startLoad(), c.loadSlider(), c.initializeEvents(), c.updateArrows(), c.updateDots(), c.checkResponsive(!0), c.focusHandler()), b && c.$slider.trigger("init", [c]), c.options.accessibility === !0 && c.initADA(), c.options.autoplay && (c.paused = !1, c.autoPlay())
    }, b.prototype.initADA = function() {
     var b = this;
     b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({
      "aria-hidden": "true",
      tabindex: "-1"
     }).find("a, input, button, select").attr({
      tabindex: "-1"
     }), b.$slideTrack.attr("role", "listbox"), b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c) {
      a(this).attr({
       role: "option",
       "aria-describedby": "slick-slide" + b.instanceUid + c
      })
     }), null !== b.$dots && b.$dots.attr("role", "tablist").find("li").each(function(c) {
      a(this).attr({
       role: "presentation",
       "aria-selected": "false",
       "aria-controls": "navigation" + b.instanceUid + c,
       id: "slick-slide" + b.instanceUid + c
      })
     }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), b.activateADA()
    }, b.prototype.initArrowEvents = function() {
     var a = this;
     a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.off("click.slick").on("click.slick", {
      message: "previous"
     }, a.changeSlide), a.$nextArrow.off("click.slick").on("click.slick", {
      message: "next"
     }, a.changeSlide))
    }, b.prototype.initDotEvents = function() {
     var b = this;
     b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", {
      message: "index"
     }, b.changeSlide), b.options.dots === !0 && b.options.pauseOnDotsHover === !0 && a("li", b.$dots).on("mouseenter.slick", a.proxy(b.interrupt, b, !0)).on("mouseleave.slick", a.proxy(b.interrupt, b, !1))
    }, b.prototype.initSlideEvents = function() {
     var b = this;
     b.options.pauseOnHover && (b.$list.on("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.on("mouseleave.slick", a.proxy(b.interrupt, b, !1)))
    }, b.prototype.initializeEvents = function() {
     var b = this;
     b.initArrowEvents(), b.initDotEvents(), b.initSlideEvents(), b.$list.on("touchstart.slick mousedown.slick", {
      action: "start"
     }, b.swipeHandler), b.$list.on("touchmove.slick mousemove.slick", {
      action: "move"
     }, b.swipeHandler), b.$list.on("touchend.slick mouseup.slick", {
      action: "end"
     }, b.swipeHandler), b.$list.on("touchcancel.slick mouseleave.slick", {
      action: "end"
     }, b.swipeHandler), b.$list.on("click.slick", b.clickHandler), a(document).on(b.visibilityChange, a.proxy(b.visibility, b)), b.options.accessibility === !0 && b.$list.on("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), a(window).on("orientationchange.slick.slick-" + b.instanceUid, a.proxy(b.orientationChange, b)), a(window).on("resize.slick.slick-" + b.instanceUid, a.proxy(b.resize, b)), a("[draggable!=true]", b.$slideTrack).on("dragstart", b.preventDefault), a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition)
    }, b.prototype.initUI = function() {
     var a = this;
     a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(), a.$nextArrow.show()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show()
    }, b.prototype.keyHandler = function(a) {
     var b = this;
     a.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === a.keyCode && b.options.accessibility === !0 ? b.changeSlide({
      data: {
       message: b.options.rtl === !0 ? "next" : "previous"
      }
     }) : 39 === a.keyCode && b.options.accessibility === !0 && b.changeSlide({
      data: {
       message: b.options.rtl === !0 ? "previous" : "next"
      }
     }))
    }, b.prototype.lazyLoad = function() {
     function g(c) {
      a("img[data-lazy]", c).each(function() {
       var c = a(this),
        d = a(this).attr("data-lazy"),
        e = document.createElement("img");
       e.onload = function() {
        c.animate({
         opacity: 0
        }, 100, function() {
         c.attr("src", d).animate({
          opacity: 1
         }, 200, function() {
          c.removeAttr("data-lazy").removeClass("slick-loading")
         }), b.$slider.trigger("lazyLoaded", [b, c, d])
        })
       }, e.onerror = function() {
        c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), b.$slider.trigger("lazyLoadError", [b, c, d])
       }, e.src = d
      })
     }
     var c, d, e, f, b = this;
     b.options.centerMode === !0 ? b.options.infinite === !0 ? (e = b.currentSlide + (b.options.slidesToShow / 2 + 1), f = e + b.options.slidesToShow + 2) : (e = Math.max(0, b.currentSlide - (b.options.slidesToShow / 2 + 1)), f = 2 + (b.options.slidesToShow / 2 + 1) + b.currentSlide) : (e = b.options.infinite ? b.options.slidesToShow + b.currentSlide : b.currentSlide, f = Math.ceil(e + b.options.slidesToShow), b.options.fade === !0 && (e > 0 && e--, f <= b.slideCount && f++)), c = b.$slider.find(".slick-slide").slice(e, f), g(c), b.slideCount <= b.options.slidesToShow ? (d = b.$slider.find(".slick-slide"), g(d)) : b.currentSlide >= b.slideCount - b.options.slidesToShow ? (d = b.$slider.find(".slick-cloned").slice(0, b.options.slidesToShow), g(d)) : 0 === b.currentSlide && (d = b.$slider.find(".slick-cloned").slice(-1 * b.options.slidesToShow), g(d))
    }, b.prototype.loadSlider = function() {
     var a = this;
     a.setPosition(), a.$slideTrack.css({
      opacity: 1
     }), a.$slider.removeClass("slick-loading"), a.initUI(), "progressive" === a.options.lazyLoad && a.progressiveLazyLoad()
    }, b.prototype.next = b.prototype.slickNext = function() {
     var a = this;
     a.changeSlide({
      data: {
       message: "next"
      }
     })
    }, b.prototype.orientationChange = function() {
     var a = this;
     a.checkResponsive(), a.setPosition()
    }, b.prototype.pause = b.prototype.slickPause = function() {
     var a = this;
     a.autoPlayClear(), a.paused = !0
    }, b.prototype.play = b.prototype.slickPlay = function() {
     var a = this;
     a.autoPlay(), a.options.autoplay = !0, a.paused = !1, a.focussed = !1, a.interrupted = !1
    }, b.prototype.postSlide = function(a) {
     var b = this;
     b.unslicked || (b.$slider.trigger("afterChange", [b, a]), b.animating = !1, b.setPosition(), b.swipeLeft = null, b.options.autoplay && b.autoPlay(), b.options.accessibility === !0 && b.initADA())
    }, b.prototype.prev = b.prototype.slickPrev = function() {
     var a = this;
     a.changeSlide({
      data: {
       message: "previous"
      }
     })
    }, b.prototype.preventDefault = function(a) {
     a.preventDefault()
    }, b.prototype.progressiveLazyLoad = function(b) {
     b = b || 1;
     var e, f, g, c = this,
      d = a("img[data-lazy]", c.$slider);
     d.length ? (e = d.first(), f = e.attr("data-lazy"), g = document.createElement("img"), g.onload = function() {
      e.attr("src", f).removeAttr("data-lazy").removeClass("slick-loading"), c.options.adaptiveHeight === !0 && c.setPosition(), c.$slider.trigger("lazyLoaded", [c, e, f]), c.progressiveLazyLoad()
     }, g.onerror = function() {
      3 > b ? setTimeout(function() {
       c.progressiveLazyLoad(b + 1)
      }, 500) : (e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), c.$slider.trigger("lazyLoadError", [c, e, f]), c.progressiveLazyLoad())
     }, g.src = f) : c.$slider.trigger("allImagesLoaded", [c])
    }, b.prototype.refresh = function(b) {
     var d, e, c = this;
     e = c.slideCount - c.options.slidesToShow, !c.options.infinite && c.currentSlide > e && (c.currentSlide = e), c.slideCount <= c.options.slidesToShow && (c.currentSlide = 0), d = c.currentSlide, c.destroy(!0), a.extend(c, c.initials, {
      currentSlide: d
     }), c.init(), b || c.changeSlide({
      data: {
       message: "index",
       index: d
      }
     }, !1)
    }, b.prototype.registerBreakpoints = function() {
     var c, d, e, b = this,
      f = b.options.responsive || null;
     if ("array" === a.type(f) && f.length) {
      b.respondTo = b.options.respondTo || "window";
      for (c in f)
       if (e = b.breakpoints.length - 1, d = f[c].breakpoint, f.hasOwnProperty(c)) {
        for (; e >= 0;) b.breakpoints[e] && b.breakpoints[e] === d && b.breakpoints.splice(e, 1), e--;
        b.breakpoints.push(d), b.breakpointSettings[d] = f[c].settings
       } b.breakpoints.sort(function(a, c) {
       return b.options.mobileFirst ? a - c : c - a
      })
     }
    }, b.prototype.reinit = function() {
     var b = this;
     b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide"), b.slideCount = b.$slides.length, b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll), b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0), b.registerBreakpoints(), b.setProps(), b.setupInfinite(), b.buildArrows(), b.updateArrows(), b.initArrowEvents(), b.buildDots(), b.updateDots(), b.initDotEvents(), b.cleanUpSlideEvents(), b.initSlideEvents(), b.checkResponsive(!1, !0), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.setPosition(), b.focusHandler(), b.paused = !b.options.autoplay, b.autoPlay(), b.$slider.trigger("reInit", [b])
    }, b.prototype.resize = function() {
     var b = this;
     a(window).width() !== b.windowWidth && (clearTimeout(b.windowDelay), b.windowDelay = window.setTimeout(function() {
      b.windowWidth = a(window).width(), b.checkResponsive(), b.unslicked || b.setPosition()
     }, 50))
    }, b.prototype.removeSlide = b.prototype.slickRemove = function(a, b, c) {
     var d = this;
     return "boolean" == typeof a ? (b = a, a = b === !0 ? 0 : d.slideCount - 1) : a = b === !0 ? --a : a, d.slideCount < 1 || 0 > a || a > d.slideCount - 1 ? !1 : (d.unload(), c === !0 ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(), d.$slides = d.$slideTrack.children(this.options.slide), d.$slideTrack.children(this.options.slide).detach(), d.$slideTrack.append(d.$slides), d.$slidesCache = d.$slides, void d.reinit())
    }, b.prototype.setCSS = function(a) {
     var d, e, b = this,
      c = {};
     b.options.rtl === !0 && (a = -a), d = "left" == b.positionProp ? Math.ceil(a) + "px" : "0px", e = "top" == b.positionProp ? Math.ceil(a) + "px" : "0px", c[b.positionProp] = a, b.transformsEnabled === !1 ? b.$slideTrack.css(c) : (c = {}, b.cssTransitions === !1 ? (c[b.animType] = "translate(" + d + ", " + e + ")", b.$slideTrack.css(c)) : (c[b.animType] = "translate3d(" + d + ", " + e + ", 0px)", b.$slideTrack.css(c)))
    }, b.prototype.setDimensions = function() {
     var a = this;
     a.options.vertical === !1 ? a.options.centerMode === !0 && a.$list.css({
      padding: "0px " + a.options.centerPadding
     }) : (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow), a.options.centerMode === !0 && a.$list.css({
      padding: a.options.centerPadding + " 0px"
     })), a.listWidth = a.$list.width(), a.listHeight = a.$list.height(), a.options.vertical === !1 && a.options.variableWidth === !1 ? (a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow), a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length))) : a.options.variableWidth === !0 ? a.$slideTrack.width(5e3 * a.slideCount) : (a.slideWidth = Math.ceil(a.listWidth), a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children(".slick-slide").length)));
     var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width();
     a.options.variableWidth === !1 && a.$slideTrack.children(".slick-slide").width(a.slideWidth - b)
    }, b.prototype.setFade = function() {
     var c, b = this;
     b.$slides.each(function(d, e) {
      c = b.slideWidth * d * -1, b.options.rtl === !0 ? a(e).css({
       position: "relative",
       right: c,
       top: 0,
       zIndex: b.options.zIndex - 2,
       opacity: 0
      }) : a(e).css({
       position: "relative",
       left: c,
       top: 0,
       zIndex: b.options.zIndex - 2,
       opacity: 0
      })
     }), b.$slides.eq(b.currentSlide).css({
      zIndex: b.options.zIndex - 1,
      opacity: 1
     })
    }, b.prototype.setHeight = function() {
     var a = this;
     if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
      var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
      a.$list.css("height", b)
     }
    }, b.prototype.setOption = b.prototype.slickSetOption = function() {
     var c, d, e, f, h, b = this,
      g = !1;
     if ("object" === a.type(arguments[0]) ? (e = arguments[0], g = arguments[1], h = "multiple") : "string" === a.type(arguments[0]) && (e = arguments[0], f = arguments[1], g = arguments[2], "responsive" === arguments[0] && "array" === a.type(arguments[1]) ? h = "responsive" : "undefined" != typeof arguments[1] && (h = "single")), "single" === h) b.options[e] = f;
     else if ("multiple" === h) a.each(e, function(a, c) {
      b.options[a] = c
     });
     else if ("responsive" === h)
      for (d in f)
       if ("array" !== a.type(b.options.responsive)) b.options.responsive = [f[d]];
       else {
        for (c = b.options.responsive.length - 1; c >= 0;) b.options.responsive[c].breakpoint === f[d].breakpoint && b.options.responsive.splice(c, 1), c--;
        b.options.responsive.push(f[d])
       } g && (b.unload(), b.reinit())
    }, b.prototype.setPosition = function() {
     var a = this;
     a.setDimensions(), a.setHeight(), a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(), a.$slider.trigger("setPosition", [a])
    }, b.prototype.setProps = function() {
     var a = this,
      b = document.body.style;
     a.positionProp = a.options.vertical === !0 ? "top" : "left", "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"), (void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.msTransition) && a.options.useCSS === !0 && (a.cssTransitions = !0), a.options.fade && ("number" == typeof a.options.zIndex ? a.options.zIndex < 3 && (a.options.zIndex = 3) : a.options.zIndex = a.defaults.zIndex), void 0 !== b.OTransform && (a.animType = "OTransform", a.transformType = "-o-transform", a.transitionType = "OTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.MozTransform && (a.animType = "MozTransform", a.transformType = "-moz-transform", a.transitionType = "MozTransition", void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)), void 0 !== b.webkitTransform && (a.animType = "webkitTransform", a.transformType = "-webkit-transform", a.transitionType = "webkitTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.msTransform && (a.animType = "msTransform", a.transformType = "-ms-transform", a.transitionType = "msTransition", void 0 === b.msTransform && (a.animType = !1)), void 0 !== b.transform && a.animType !== !1 && (a.animType = "transform", a.transformType = "transform", a.transitionType = "transition"), a.transformsEnabled = a.options.useTransform && null !== a.animType && a.animType !== !1
    }, b.prototype.setSlideClasses = function(a) {
     var c, d, e, f, b = this;
     d = b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), b.$slides.eq(a).addClass("slick-current"), b.options.centerMode === !0 ? (c = Math.floor(b.options.slidesToShow / 2), b.options.infinite === !0 && (a >= c && a <= b.slideCount - 1 - c ? b.$slides.slice(a - c, a + c + 1).addClass("slick-active").attr("aria-hidden", "false") : (e = b.options.slidesToShow + a,
      d.slice(e - c + 1, e + c + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === a ? d.eq(d.length - 1 - b.options.slidesToShow).addClass("slick-center") : a === b.slideCount - 1 && d.eq(b.options.slidesToShow).addClass("slick-center")), b.$slides.eq(a).addClass("slick-center")) : a >= 0 && a <= b.slideCount - b.options.slidesToShow ? b.$slides.slice(a, a + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : d.length <= b.options.slidesToShow ? d.addClass("slick-active").attr("aria-hidden", "false") : (f = b.slideCount % b.options.slidesToShow, e = b.options.infinite === !0 ? b.options.slidesToShow + a : a, b.options.slidesToShow == b.options.slidesToScroll && b.slideCount - a < b.options.slidesToShow ? d.slice(e - (b.options.slidesToShow - f), e + f).addClass("slick-active").attr("aria-hidden", "false") : d.slice(e, e + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === b.options.lazyLoad && b.lazyLoad()
    }, b.prototype.setupInfinite = function() {
     var c, d, e, b = this;
     if (b.options.fade === !0 && (b.options.centerMode = !1), b.options.infinite === !0 && b.options.fade === !1 && (d = null, b.slideCount > b.options.slidesToShow)) {
      for (e = b.options.centerMode === !0 ? b.options.slidesToShow + 1 : b.options.slidesToShow, c = b.slideCount; c > b.slideCount - e; c -= 1) d = c - 1, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d - b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");
      for (c = 0; e > c; c += 1) d = c, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d + b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");
      b.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
       a(this).attr("id", "")
      })
     }
    }, b.prototype.interrupt = function(a) {
     var b = this;
     a || b.autoPlay(), b.interrupted = a
    }, b.prototype.selectHandler = function(b) {
     var c = this,
      d = a(b.target).is(".slick-slide") ? a(b.target) : a(b.target).parents(".slick-slide"),
      e = parseInt(d.attr("data-slick-index"));
     return e || (e = 0), c.slideCount <= c.options.slidesToShow ? (c.setSlideClasses(e), void c.asNavFor(e)) : void c.slideHandler(e)
    }, b.prototype.slideHandler = function(a, b, c) {
     var d, e, f, g, j, h = null,
      i = this;
     return b = b || !1, i.animating === !0 && i.options.waitForAnimate === !0 || i.options.fade === !0 && i.currentSlide === a || i.slideCount <= i.options.slidesToShow ? void 0 : (b === !1 && i.asNavFor(a), d = a, h = i.getLeft(d), g = i.getLeft(i.currentSlide), i.currentLeft = null === i.swipeLeft ? g : i.swipeLeft, i.options.infinite === !1 && i.options.centerMode === !1 && (0 > a || a > i.getDotCount() * i.options.slidesToScroll) ? void(i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function() {
      i.postSlide(d)
     }) : i.postSlide(d))) : i.options.infinite === !1 && i.options.centerMode === !0 && (0 > a || a > i.slideCount - i.options.slidesToScroll) ? void(i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function() {
      i.postSlide(d)
     }) : i.postSlide(d))) : (i.options.autoplay && clearInterval(i.autoPlayTimer), e = 0 > d ? i.slideCount % i.options.slidesToScroll !== 0 ? i.slideCount - i.slideCount % i.options.slidesToScroll : i.slideCount + d : d >= i.slideCount ? i.slideCount % i.options.slidesToScroll !== 0 ? 0 : d - i.slideCount : d, i.animating = !0, i.$slider.trigger("beforeChange", [i, i.currentSlide, e]), f = i.currentSlide, i.currentSlide = e, i.setSlideClasses(i.currentSlide), i.options.asNavFor && (j = i.getNavTarget(), j = j.slick("getSlick"), j.slideCount <= j.options.slidesToShow && j.setSlideClasses(i.currentSlide)), i.updateDots(), i.updateArrows(), i.options.fade === !0 ? (c !== !0 ? (i.fadeSlideOut(f), i.fadeSlide(e, function() {
      i.postSlide(e)
     })) : i.postSlide(e), void i.animateHeight()) : void(c !== !0 ? i.animateSlide(h, function() {
      i.postSlide(e)
     }) : i.postSlide(e))))
    }, b.prototype.startLoad = function() {
     var a = this;
     a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(), a.$nextArrow.hide()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(), a.$slider.addClass("slick-loading")
    }, b.prototype.swipeDirection = function() {
     var a, b, c, d, e = this;
     return a = e.touchObject.startX - e.touchObject.curX, b = e.touchObject.startY - e.touchObject.curY, c = Math.atan2(b, a), d = Math.round(180 * c / Math.PI), 0 > d && (d = 360 - Math.abs(d)), 45 >= d && d >= 0 ? e.options.rtl === !1 ? "left" : "right" : 360 >= d && d >= 315 ? e.options.rtl === !1 ? "left" : "right" : d >= 135 && 225 >= d ? e.options.rtl === !1 ? "right" : "left" : e.options.verticalSwiping === !0 ? d >= 35 && 135 >= d ? "down" : "up" : "vertical"
    }, b.prototype.swipeEnd = function(a) {
     var c, d, b = this;
     if (b.dragging = !1, b.interrupted = !1, b.shouldClick = b.touchObject.swipeLength > 10 ? !1 : !0, void 0 === b.touchObject.curX) return !1;
     if (b.touchObject.edgeHit === !0 && b.$slider.trigger("edge", [b, b.swipeDirection()]), b.touchObject.swipeLength >= b.touchObject.minSwipe) {
      switch (d = b.swipeDirection()) {
       case "left":
       case "down":
        c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide + b.getSlideCount()) : b.currentSlide + b.getSlideCount(), b.currentDirection = 0;
        break;
       case "right":
       case "up":
        c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide - b.getSlideCount()) : b.currentSlide - b.getSlideCount(), b.currentDirection = 1
      }
      "vertical" != d && (b.slideHandler(c), b.touchObject = {}, b.$slider.trigger("swipe", [b, d]))
     } else b.touchObject.startX !== b.touchObject.curX && (b.slideHandler(b.currentSlide), b.touchObject = {})
    }, b.prototype.swipeHandler = function(a) {
     var b = this;
     if (!(b.options.swipe === !1 || "ontouchend" in document && b.options.swipe === !1 || b.options.draggable === !1 && -1 !== a.type.indexOf("mouse"))) switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1, b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold, b.options.verticalSwiping === !0 && (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold), a.data.action) {
      case "start":
       b.swipeStart(a);
       break;
      case "move":
       b.swipeMove(a);
       break;
      case "end":
       b.swipeEnd(a)
     }
    }, b.prototype.swipeMove = function(a) {
     var d, e, f, g, h, b = this;
     return h = void 0 !== a.originalEvent ? a.originalEvent.touches : null, !b.dragging || h && 1 !== h.length ? !1 : (d = b.getLeft(b.currentSlide), b.touchObject.curX = void 0 !== h ? h[0].pageX : a.clientX, b.touchObject.curY = void 0 !== h ? h[0].pageY : a.clientY, b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curX - b.touchObject.startX, 2))), b.options.verticalSwiping === !0 && (b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curY - b.touchObject.startY, 2)))), e = b.swipeDirection(), "vertical" !== e ? (void 0 !== a.originalEvent && b.touchObject.swipeLength > 4 && a.preventDefault(), g = (b.options.rtl === !1 ? 1 : -1) * (b.touchObject.curX > b.touchObject.startX ? 1 : -1), b.options.verticalSwiping === !0 && (g = b.touchObject.curY > b.touchObject.startY ? 1 : -1), f = b.touchObject.swipeLength, b.touchObject.edgeHit = !1, b.options.infinite === !1 && (0 === b.currentSlide && "right" === e || b.currentSlide >= b.getDotCount() && "left" === e) && (f = b.touchObject.swipeLength * b.options.edgeFriction, b.touchObject.edgeHit = !0), b.options.vertical === !1 ? b.swipeLeft = d + f * g : b.swipeLeft = d + f * (b.$list.height() / b.listWidth) * g, b.options.verticalSwiping === !0 && (b.swipeLeft = d + f * g), b.options.fade === !0 || b.options.touchMove === !1 ? !1 : b.animating === !0 ? (b.swipeLeft = null, !1) : void b.setCSS(b.swipeLeft)) : void 0)
    }, b.prototype.swipeStart = function(a) {
     var c, b = this;
     return b.interrupted = !0, 1 !== b.touchObject.fingerCount || b.slideCount <= b.options.slidesToShow ? (b.touchObject = {}, !1) : (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (c = a.originalEvent.touches[0]), b.touchObject.startX = b.touchObject.curX = void 0 !== c ? c.pageX : a.clientX, b.touchObject.startY = b.touchObject.curY = void 0 !== c ? c.pageY : a.clientY, void(b.dragging = !0))
    }, b.prototype.unfilterSlides = b.prototype.slickUnfilter = function() {
     var a = this;
     null !== a.$slidesCache && (a.unload(), a.$slideTrack.children(this.options.slide).detach(), a.$slidesCache.appendTo(a.$slideTrack), a.reinit())
    }, b.prototype.unload = function() {
     var b = this;
     a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.remove(), b.$nextArrow && b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.remove(), b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
    }, b.prototype.unslick = function(a) {
     var b = this;
     b.$slider.trigger("unslick", [b, a]), b.destroy()
    }, b.prototype.updateArrows = function() {
     var b, a = this;
     b = Math.floor(a.options.slidesToShow / 2), a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && !a.options.infinite && (a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === a.currentSlide ? (a.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - a.options.slidesToShow && a.options.centerMode === !1 ? (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - 1 && a.options.centerMode === !0 && (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
    }, b.prototype.updateDots = function() {
     var a = this;
     null !== a.$dots && (a.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), a.$dots.find("li").eq(Math.floor(a.currentSlide / a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
    }, b.prototype.visibility = function() {
     var a = this;
     a.options.autoplay && (document[a.hidden] ? a.interrupted = !0 : a.interrupted = !1)
    }, a.fn.slick = function() {
     var f, g, a = this,
      c = arguments[0],
      d = Array.prototype.slice.call(arguments, 1),
      e = a.length;
     for (f = 0; e > f; f++)
      if ("object" == typeof c || "undefined" == typeof c ? a[f].slick = new b(a[f], c) : g = a[f].slick[c].apply(a[f].slick, d), "undefined" != typeof g) return g;
     return a
    }
   });
   
   
   
   /*
    jQuery animateNumber plugin v0.0.13
    (c) 2013, Alexandr Borisov.
    https://github.com/aishek/jquery-animateNumber
   */
   (function(d) {
    var q = function(b) {
      return b.split("").reverse().join("")
     },
     m = {
      numberStep: function(b, a) {
       var e = Math.floor(b);
       d(a.elem).text(e)
      }
     },
     h = function(b) {
      var a = b.elem;
      a.nodeType && a.parentNode && (a = a._animateNumberSetter, a || (a = m.numberStep), a(b.now, b))
     };
    d.Tween && d.Tween.propHooks ? d.Tween.propHooks.number = {
     set: h
    } : d.fx.step.number = h;
    d.animateNumber = {
     numberStepFactories: {
      append: function(b) {
       return function(a, e) {
        var g = Math.floor(a);
        d(e.elem).prop("number", a).text(g + b)
       }
      },
      separator: function(b, a, e) {
       b = b || " ";
       a = a || 3;
       e = e || "";
       return function(g, k) {
        var c = Math.floor(g).toString(),
         t = d(k.elem);
        if (c.length > a) {
         for (var f = c, l = a, m = f.split("").reverse(), c = [], n, r, p, s = 0, h = Math.ceil(f.length / l); s < h; s++) {
          n = "";
          for (p = 0; p < l; p++) {
           r = s * l + p;
           if (r === f.length) break;
           n += m[r]
          }
          c.push(n)
         }
         f = c.length - 1;
         l = q(c[f]);
         c[f] = q(parseInt(l, 10).toString());
         c = c.join(b);
         c = q(c)
        }
        t.prop("number", g).text(c + e)
       }
      }
     }
    };
    d.fn.animateNumber = function() {
     for (var b = arguments[0], a = d.extend({}, m, b), e = d(this), g = [a], k = 1, c = arguments.length; k < c; k++) g.push(arguments[k]);
     if (b.numberStep) {
      var h = this.each(function() {
        this._animateNumberSetter = b.numberStep
       }),
       f = a.complete;
      a.complete = function() {
       h.each(function() {
        delete this._animateNumberSetter
       });
       f && f.apply(this, arguments)
      }
     }
     return e.animate.apply(e, g)
    }
   })(jQuery);
   
   
   
   /**
    * jquery-circle-progress - jQuery Plugin to draw animated circular progress bars:
    * @version 1.2.1
    * @licence MIT
    */
   ! function(i) {
    if ("function" == typeof define && define.amd) define(["jquery"], i);
    else if ("object" == typeof module && module.exports) {
     var t = require("jquery");
     i(t), module.exports = t
    } else i(jQuery)
   }(function(i) {
    function t(i) {
     this.init(i)
    }
    t.prototype = {
     value: 0,
     size: 100,
     startAngle: -Math.PI,
     thickness: "auto",
     fill: {
      gradient: ["#3aeabb", "#fdd250"]
     },
     emptyFill: "rgba(0, 0, 0, .1)",
     animation: {
      duration: 1200,
      easing: "circleProgressEasing"
     },
     animationStartValue: 0,
     reverse: !1,
     lineCap: "butt",
     insertMode: "prepend",
     constructor: t,
     el: null,
     canvas: null,
     ctx: null,
     radius: 0,
     arcFill: null,
     lastFrameValue: 0,
     init: function(t) {
      i.extend(this, t), this.radius = this.size / 2, this.initWidget(), this.initFill(), this.draw(), this.el.trigger("circle-inited")
     },
     initWidget: function() {
      this.canvas || (this.canvas = i("<canvas>")["prepend" == this.insertMode ? "prependTo" : "appendTo"](this.el)[0]);
      var t = this.canvas;
      if (t.width = this.size, t.height = this.size, this.ctx = t.getContext("2d"), window.devicePixelRatio > 1) {
       var e = window.devicePixelRatio;
       t.style.width = t.style.height = this.size + "px", t.width = t.height = this.size * e, this.ctx.scale(e, e)
      }
     },
     initFill: function() {
      function t() {
       var t = i("<canvas>")[0];
       t.width = e.size, t.height = e.size, t.getContext("2d").drawImage(g, 0, 0, r, r), e.arcFill = e.ctx.createPattern(t, "no-repeat"), e.drawFrame(e.lastFrameValue)
      }
      var e = this,
       a = this.fill,
       n = this.ctx,
       r = this.size;
      if (!a) throw Error("The fill is not specified!");
      if ("string" == typeof a && (a = {
        color: a
       }), a.color && (this.arcFill = a.color), a.gradient) {
       var s = a.gradient;
       if (1 == s.length) this.arcFill = s[0];
       else if (s.length > 1) {
        for (var l = a.gradientAngle || 0, o = a.gradientDirection || [r / 2 * (1 - Math.cos(l)), r / 2 * (1 + Math.sin(l)), r / 2 * (1 + Math.cos(l)), r / 2 * (1 - Math.sin(l))], h = n.createLinearGradient.apply(n, o), c = 0; c < s.length; c++) {
         var d = s[c],
          u = c / (s.length - 1);
         i.isArray(d) && (u = d[1], d = d[0]), h.addColorStop(u, d)
        }
        this.arcFill = h
       }
      }
      if (a.image) {
       var g;
       a.image instanceof Image ? g = a.image : (g = new Image, g.src = a.image), g.complete ? t() : g.onload = t
      }
     },
     draw: function() {
      this.animation ? this.drawAnimated(this.value) : this.drawFrame(this.value)
     },
     drawFrame: function(i) {
      this.lastFrameValue = i, this.ctx.clearRect(0, 0, this.size, this.size), this.drawEmptyArc(i), this.drawArc(i)
     },
     drawArc: function(i) {
      if (0 !== i) {
       var t = this.ctx,
        e = this.radius,
        a = this.getThickness(),
        n = this.startAngle;
       t.save(), t.beginPath(), this.reverse ? t.arc(e, e, e - a / 2, n - 2 * Math.PI * i, n) : t.arc(e, e, e - a / 2, n, n + 2 * Math.PI * i), t.lineWidth = a, t.lineCap = this.lineCap, t.strokeStyle = this.arcFill, t.stroke(), t.restore()
      }
     },
     drawEmptyArc: function(i) {
      var t = this.ctx,
       e = this.radius,
       a = this.getThickness(),
       n = this.startAngle;
      i < 1 && (t.save(), t.beginPath(), i <= 0 ? t.arc(e, e, e - a / 2, 0, 2 * Math.PI) : this.reverse ? t.arc(e, e, e - a / 2, n, n - 2 * Math.PI * i) : t.arc(e, e, e - a / 2, n + 2 * Math.PI * i, n), t.lineWidth = a, t.strokeStyle = this.emptyFill, t.stroke(), t.restore())
     },
     drawAnimated: function(t) {
      var e = this,
       a = this.el,
       n = i(this.canvas);
      n.stop(!0, !1), a.trigger("circle-animation-start"), n.css({
       animationProgress: 0
      }).animate({
       animationProgress: 1
      }, i.extend({}, this.animation, {
       step: function(i) {
        var n = e.animationStartValue * (1 - i) + t * i;
        e.drawFrame(n), a.trigger("circle-animation-progress", [i, n])
       }
      })).promise().always(function() {
       a.trigger("circle-animation-end")
      })
     },
     getThickness: function() {
      return i.isNumeric(this.thickness) ? this.thickness : this.size / 14
     },
     getValue: function() {
      return this.value
     },
     setValue: function(i) {
      this.animation && (this.animationStartValue = this.lastFrameValue), this.value = i, this.draw()
     }
    }, i.circleProgress = {
     defaults: t.prototype
    }, i.easing.circleProgressEasing = function(i, t, e, a, n) {
     return (t /= n / 2) < 1 ? a / 2 * t * t * t + e : a / 2 * ((t -= 2) * t * t + 2) + e
    }, i.fn.circleProgress = function(e, a) {
     var n = "circle-progress",
      r = this.data(n);
     if ("widget" == e) {
      if (!r) throw Error('Calling "widget" method on not initialized instance is forbidden');
      return r.canvas
     }
     if ("value" == e) {
      if (!r) throw Error('Calling "value" method on not initialized instance is forbidden');
      if ("undefined" == typeof a) return r.getValue();
      var s = arguments[1];
      return this.each(function() {
       i(this).data(n).setValue(s)
      })
     }
     return this.each(function() {
      var a = i(this),
       r = a.data(n),
       s = i.isPlainObject(e) ? e : {};
      if (r) r.init(s);
      else {
       var l = i.extend({}, a.data());
       "string" == typeof l.fill && (l.fill = JSON.parse(l.fill)), "string" == typeof l.animation && (l.animation = JSON.parse(l.animation)), s = i.extend(l, s), s.el = a, r = new t(s), a.data(n, r)
      }
     })
    }
   });
   
   
   
   /*!
    * The Final Countdown for jQuery v2.2.0 (http://hilios.github.io/jQuery.countdown/)
    */
   ! function(a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
   }(function(a) {
    "use strict";
   
    function b(a) {
     if (a instanceof Date) return a;
     if (String(a).match(g)) return String(a).match(/^[0-9]*$/) && (a = Number(a)), String(a).match(/\-/) && (a = String(a).replace(/\-/g, "/")), new Date(a);
     throw new Error("Couldn't cast `" + a + "` to a date object.")
    }
   
    function c(a) {
     var b = a.toString().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
     return new RegExp(b)
    }
   
    function d(a) {
     return function(b) {
      var d = b.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);
      if (d)
       for (var f = 0, g = d.length; f < g; ++f) {
        var h = d[f].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),
         j = c(h[0]),
         k = h[1] || "",
         l = h[3] || "",
         m = null;
        h = h[2], i.hasOwnProperty(h) && (m = i[h], m = Number(a[m])), null !== m && ("!" === k && (m = e(l, m)), "" === k && m < 10 && (m = "0" + m.toString()), b = b.replace(j, m.toString()))
       }
      return b = b.replace(/%%/, "%")
     }
    }
   
    function e(a, b) {
     var c = "s",
      d = "";
     return a && (a = a.replace(/(:|;|\s)/gi, "").split(/\,/), 1 === a.length ? c = a[0] : (d = a[0], c = a[1])), Math.abs(b) > 1 ? c : d
    }
    var f = [],
     g = [],
     h = {
      precision: 100,
      elapse: !1,
      defer: !1
     };
    g.push(/^[0-9]*$/.source), g.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), g.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), g = new RegExp(g.join("|"));
    var i = {
      Y: "years",
      m: "months",
      n: "daysToMonth",
      d: "daysToWeek",
      w: "weeks",
      W: "weeksToMonth",
      H: "hours",
      M: "minutes",
      S: "seconds",
      D: "totalDays",
      I: "totalHours",
      N: "totalMinutes",
      T: "totalSeconds"
     },
     j = function(b, c, d) {
      this.el = b, this.$el = a(b), this.interval = null, this.offset = {}, this.options = a.extend({}, h), this.firstTick = !0, this.instanceNumber = f.length, f.push(this), this.$el.data("countdown-instance", this.instanceNumber), d && ("function" == typeof d ? (this.$el.on("update.countdown", d), this.$el.on("stoped.countdown", d), this.$el.on("finish.countdown", d)) : this.options = a.extend({}, h, d)), this.setFinalDate(c), this.options.defer === !1 && this.start()
     };
    a.extend(j.prototype, {
     start: function() {
      null !== this.interval && clearInterval(this.interval);
      var a = this;
      this.update(), this.interval = setInterval(function() {
       a.update.call(a)
      }, this.options.precision)
     },
     stop: function() {
      clearInterval(this.interval), this.interval = null, this.dispatchEvent("stoped")
     },
     toggle: function() {
      this.interval ? this.stop() : this.start()
     },
     pause: function() {
      this.stop()
     },
     resume: function() {
      this.start()
     },
     remove: function() {
      this.stop.call(this), f[this.instanceNumber] = null, delete this.$el.data().countdownInstance
     },
     setFinalDate: function(a) {
      this.finalDate = b(a)
     },
     update: function() {
      if (0 === this.$el.closest("html").length) return void this.remove();
      var a, b = new Date;
      return a = this.finalDate.getTime() - b.getTime(), a = Math.ceil(a / 1e3), a = !this.options.elapse && a < 0 ? 0 : Math.abs(a), this.totalSecsLeft === a || this.firstTick ? void(this.firstTick = !1) : (this.totalSecsLeft = a, this.elapsed = b >= this.finalDate, this.offset = {
       seconds: this.totalSecsLeft % 60,
       minutes: Math.floor(this.totalSecsLeft / 60) % 60,
       hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,
       days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
       daysToWeek: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,
       daysToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 % 30.4368),
       weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),
       weeksToMonth: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7) % 4,
       months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30.4368),
       years: Math.abs(this.finalDate.getFullYear() - b.getFullYear()),
       totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),
       totalHours: Math.floor(this.totalSecsLeft / 60 / 60),
       totalMinutes: Math.floor(this.totalSecsLeft / 60),
       totalSeconds: this.totalSecsLeft
      }, void(this.options.elapse || 0 !== this.totalSecsLeft ? this.dispatchEvent("update") : (this.stop(), this.dispatchEvent("finish"))))
     },
     dispatchEvent: function(b) {
      var c = a.Event(b + ".countdown");
      c.finalDate = this.finalDate, c.elapsed = this.elapsed, c.offset = a.extend({}, this.offset), c.strftime = d(this.offset), this.$el.trigger(c)
     }
    }), a.fn.countdown = function() {
     var b = Array.prototype.slice.call(arguments, 0);
     return this.each(function() {
      var c = a(this).data("countdown-instance");
      if (void 0 !== c) {
       var d = f[c],
        e = b[0];
       j.prototype.hasOwnProperty(e) ? d[e].apply(d, b.slice(1)) : null === String(e).match(/^[$A-Z_][0-9A-Z_$]*$/i) ? (d.setFinalDate.call(d, e), d.start()) : a.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi, e))
      } else new j(this, b[0], b[1])
     })
    }
   });