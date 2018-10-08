/*! jQuery v2.1.4 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */



function FastClick(e) {
    "use strict";
    var t, n = this;
    this.trackingClick = !1
        , this.trackingClickStart = 0
        , this.targetElement = null
        , this.touchStartX = 0
        , this.touchStartY = 0
        , this.lastTouchIdentifier = 0
        , this.touchBoundary = 10
        , this.layer = e;
    if (!e || !e.nodeType)throw new TypeError("Layer must be a document node");
    this.onClick = function () {
        return FastClick.prototype.onClick.apply(n, arguments)
    }, this.onMouse = function () {
        return FastClick.prototype.onMouse.apply(n, arguments)
    }, this.onTouchStart = function () {
        return FastClick.prototype.onTouchStart.apply(n, arguments)
    }, this.onTouchEnd = function () {
        return FastClick.prototype.onTouchEnd.apply(n, arguments)
    }, this.onTouchCancel = function () {
        return FastClick.prototype.onTouchCancel.apply(n, arguments)
    };
    if (FastClick.notNeeded(e))return;
    this.deviceIsAndroid && (e.addEventListener("mouseover", this.onMouse, !0)
        , e.addEventListener("mousedown", this.onMouse, !0)
        , e.addEventListener("mouseup", this.onMouse, !0))
        , e.addEventListener("click", this.onClick, !0)
        , e.addEventListener("touchstart", this.onTouchStart, !1)
        , e.addEventListener("touchend", this.onTouchEnd, !1)
        , e.addEventListener("touchcancel", this.onTouchCancel, !1)
        , Event.prototype.stopImmediatePropagation || (e.removeEventListener = function (t, n, r) {
        var i = Node.prototype.removeEventListener;
        t === "click" ? i.call(e, t, n.hijacked || n, r) : i.call(e, t, n, r)
    }
    , e.addEventListener = function (t, n, r) {
        var i = Node.prototype.addEventListener;
        t === "click" ? i.call(e, t, n.hijacked || (n.hijacked = function (e) {
                e.propagationStopped || n(e)
            }), r) : i.call(e, t, n, r)
    })
    , typeof e.onclick == "function" && (t = e.onclick, e.addEventListener("click", function (e) {
        t(e)
    }, !1), e.onclick = null)
}
function Swipe(e, t) {
    "use strict";
    function h() {
        o = s.children, f = o.length, o.length < 2 && (t.continuous = !1), i.transitions && t.continuous && o.length < 3 && (s.appendChild(o[0].cloneNode(!0)), s.appendChild(s.children[1].cloneNode(!0)), o = s.children), u = new Array(o.length), a = e.getBoundingClientRect().width || e.offsetWidth, a += 20, s.style.width = o.length * a + "px";
        var n = o.length;
        while (n--) {
            var r = o[n];
            r.style.width = a + "px", r.setAttribute("data-index", n), i.transitions && (r.style.left = n * -a + "px", g(n, l > n ? -a : l < n ? a : 0, 0))
        }
        t.continuous && i.transitions && (g(v(l - 1), -a, 0), g(v(l + 1), a, 0)), i.transitions || (s.style.left = l * -a + "px"), e.style.visibility = "visible"
    }

    function p() {
        t.continuous ? m(l - 1) : l && m(l - 1)
    }

    function d() {
        t.continuous ? m(l + 1) : l < o.length - 1 && m(l + 1)
    }

    function v(e) {
        return (o.length + e % o.length) % o.length
    }

    function m(e, n) {
        if (l == e)return;
        if (i.transitions) {
            var s = Math.abs(l - e) / (l - e);
            if (t.continuous) {
                var f = s;
                s = -u[v(e)] / a, s !== f && (e = -s * o.length + e)
            }
            var h = Math.abs(l - e) - 1;
            while (h--)g(v((e > l ? e : l) - h - 1), a * s, 0);
            e = v(e), g(l, a * s, n || c), g(e, 0, n || c), t.continuous && g(v(e - s), -(a * s), 0)
        } else e = v(e), b(l * -a, e * -a, n || c);
        l = e, r(t.callback && t.callback(l, o[l]))
    }

    function g(e, t, n) {
        y(e, t, n), u[e] = t
    }

    function y(e, t, n) {
        var r = o[e], i = r && r.style;
        if (!i)return;
        i.webkitTransitionDuration = i.MozTransitionDuration = i.msTransitionDuration = i.OTransitionDuration = i.transitionDuration = n + "ms", i.webkitTransform = "translate(" + t + "px,0)" + "translateZ(0)", i.msTransform = i.MozTransform = i.OTransform = "translateX(" + t + "px)"
    }

    function b(e, n, r) {
        if (!r) {
            s.style.left = n + "px";
            return
        }
        var i = +(new Date), u = setInterval(function () {
            var a = +(new Date) - i;
            if (a > r) {
                s.style.left = n + "px", w && S(), t.transitionEnd && t.transitionEnd.call(event, l, o[l]), clearInterval(u);
                return
            }
            s.style.left = (n - e) * (Math.floor(a / r * 100) / 100) + e + "px"
        }, 4)
    }

    function S() {
        E = setTimeout(d, w)
    }

    function x() {
        w = 0, clearTimeout(E)
    }

    var n = function () {
    }, r = function (e) {
        setTimeout(e || n, 0)
    }, i = {
        addEventListener: !!window.addEventListener,
        touch: "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch,
        transitions: function (e) {
            var t = ["transitionProperty", "WebkitTransition", "MozTransition", "OTransition", "msTransition"];
            for (var n in t)if (e.style[t[n]] !== undefined)return !0;
            return !1
        }(document.createElement("swipe"))
    };
    if (!e)return;
    var s = e.children[0], o, u, a, f;
    t = t || {};
    var l = parseInt(t.startSlide, 10) || 0, c = t.speed || 300;
    t.continuous = t.continuous !== undefined ? t.continuous : !0;
    var w = t.auto || 0, E, T = {}, N = {}, C, k = {
        Jm:Jm.rem(),
        handleEvent: function (e) {
            switch (e.type) {
                case"touchstart":
                    this.start(e);
                    break;
                case"touchmove":
                    this.move(e);
                    break;
                case"touchend":
                    r(this.end(e));
                    break;
                case"webkitTransitionEnd":
                case"msTransitionEnd":
                case"oTransitionEnd":
                case"otransitionend":
                case"transitionend":
                    r(this.transitionEnd(e));
                    break;
                case"resize":
                    r(h)
            }
            t.stopPropagation && e.stopPropagation()
        }, start: function (e) {
            var t = e.touches[0];
            T = {
                x: t.pageX,
                y: t.pageY,
                time: +(new Date)
            }, C = undefined, N = {}, s.addEventListener("touchmove", this, !1), s.addEventListener("touchend", this, !1)
        }, move: function (e) {
            if (e.touches.length > 1 || e.scale && e.scale !== 1)return;
            t.disableScroll && e.preventDefault();
            var n = e.touches[0];
            N = {
                x: n.pageX - T.x,
                y: n.pageY - T.y
            }, typeof C == "undefined" && (C = !!(C || Math.abs(N.x) < Math.abs(N.y))), C || (e.preventDefault(), x(), t.continuous ? (y(v(l - 1), N.x + u[v(l - 1)], 0), y(l, N.x + u[l], 0), y(v(l + 1), N.x + u[v(l + 1)], 0)) : (N.x = N.x / (!l && N.x > 0 || l == o.length - 1 && N.x < 0 ? Math.abs(N.x) / a + 1 : 1), y(l - 1, N.x + u[l - 1], 0), y(l, N.x + u[l], 0), y(l + 1, N.x + u[l + 1], 0)))
        }, end: function (e) {
            var n = +(new Date) - T.time, r = Number(n) < 250 && Math.abs(N.x) > 20 || Math.abs(N.x) > a / 2,
                i = !l && N.x > 0 || l == o.length - 1 && N.x < 0;
            t.continuous && (i = !1);
            var f = N.x < 0;
            C || (r && !i ? (f ? (t.continuous ? (g(v(l - 1), -a, 0), g(v(l + 2), a, 0)) : g(l - 1, -a, 0), g(l, u[l] - a, c), g(v(l + 1), u[v(l + 1)] - a, c), l = v(l + 1)) : (t.continuous ? (g(v(l + 1), a, 0), g(v(l - 2), -a, 0)) : g(l + 1, a, 0), g(l, u[l] + a, c), g(v(l - 1), u[v(l - 1)] + a, c), l = v(l - 1)), t.callback && t.callback(l, o[l])) : t.continuous ? (g(v(l - 1), -a, c), g(l, 0, c), g(v(l + 1), a, c)) : (g(l - 1, -a, c), g(l, 0, c), g(l + 1, a, c))), s.removeEventListener("touchmove", k, !1), s.removeEventListener("touchend", k, !1)
        }, transitionEnd: function (e) {
            parseInt(e.target.getAttribute("data-index"), 10) == l && (w && S(), t.transitionEnd && t.transitionEnd.call(e, l, o[l]))
        }
    };
    return h(), w && S(), i.addEventListener ? (i.touch && s.addEventListener("touchstart", k, !1), i.transitions && (s.addEventListener("webkitTransitionEnd", k, !1), s.addEventListener("msTransitionEnd", k, !1), s.addEventListener("oTransitionEnd", k, !1), s.addEventListener("otransitionend", k, !1), s.addEventListener("transitionend", k, !1)), window.addEventListener("resize", k, !1)) : window.onresize = function () {
        h();
    }, {
        setup: function () {
            h()
        }, slide: function (e, t) {
            x(), m(e, t)
        }, prev: function () {
            x(), p()
        }, next: function () {
            x(), d()
        }, stop: function () {
            x()
        }, getPos: function () {
            return l
        }, getNumSlides: function () {
            return f
        }, kill: function () {
            x(), s.style.width = "", s.style.left = "";
            var e = o.length;
            while (e--) {
                var t = o[e];
                t.style.width = "", t.style.left = "", i.transitions && y(e, 0, 0)
            }
            i.addEventListener ? (s.removeEventListener("touchstart", k, !1), s.removeEventListener("webkitTransitionEnd", k, !1), s.removeEventListener("msTransitionEnd", k, !1), s.removeEventListener("oTransitionEnd", k, !1), s.removeEventListener("otransitionend", k, !1), s.removeEventListener("transitionend", k, !1), window.removeEventListener("resize", k, !1)) : window.onresize = null
        }
    }
}
!function (e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function (e) {
        if (!e.document)throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function (a, b) {
    function s(e) {
        var t = "length" in e && e.length, r = n.type(e);
        return "function" === r || n.isWindow(e) ? !1 : 1 === e.nodeType && t ? !0 : "array" === r || 0 === t || "number" == typeof t && t > 0 && t - 1 in e
    }

    function x(e, t, r) {
        if (n.isFunction(t))return n.grep(e, function (e, n) {
            return !!t.call(e, n, e) !== r
        });
        if (t.nodeType)return n.grep(e, function (e) {
            return e === t !== r
        });
        if ("string" == typeof t) {
            if (w.test(t))return n.filter(t, e, r);
            t = n.filter(t, e)
        }
        return n.grep(e, function (e) {
            return g.call(t, e) >= 0 !== r
        })
    }

    function D(e, t) {
        while ((e = e[t]) && 1 !== e.nodeType);
        return e
    }

    function G(e) {
        var t = F[e] = {};
        return n.each(e.match(E) || [], function (e, n) {
            t[n] = !0
        }), t
    }

    function I() {
        l.removeEventListener("DOMContentLoaded", I, !1), a.removeEventListener("load", I, !1), n.ready()
    }

    function K() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function () {
                return {}
            }
        }), this.expando = n.expando + K.uid++
    }

    function P(e, t, r) {
        var i;
        if (void 0 === r && 1 === e.nodeType)if (i = "data-" + t.replace(O, "-$1").toLowerCase(), r = e.getAttribute(i), "string" == typeof r) {
            try {
                r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : +r + "" === r ? +r : N.test(r) ? n.parseJSON(r) : r
            } catch (s) {
            }
            M.set(e, t, r)
        } else r = void 0;
        return r
    }

    function Z() {
        return !0
    }

    function $() {
        return !1
    }

    function _() {
        try {
            return l.activeElement
        } catch (e) {
        }
    }

    function ja(e, t) {
        return n.nodeName(e, "table") && n.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }

    function ka(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }

    function la(e) {
        var t = ga.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }

    function ma(e, t) {
        for (var n = 0, r = e.length; r > n; n++)L.set(e[n], "globalEval", !t || L.get(t[n], "globalEval"))
    }

    function na(e, t) {
        var r, i, s, o, u, a, f, l;
        if (1 === t.nodeType) {
            if (L.hasData(e) && (o = L.access(e), u = L.set(t, o), l = o.events)) {
                delete u.handle, u.events = {};
                for (s in l)for (r = 0, i = l[s].length; i > r; r++)n.event.add(t, s, l[s][r])
            }
            M.hasData(e) && (a = M.access(e), f = n.extend({}, a), M.set(t, f))
        }
    }

    function oa(e, t) {
        var r = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
        return void 0 === t || t && n.nodeName(e, t) ? n.merge([e], r) : r
    }

    function pa(e, t) {
        var n = t.nodeName.toLowerCase();
        "input" === n && T.test(e.type) ? t.checked = e.checked : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
    }

    function sa(e, t) {
        var r, i = n(t.createElement(e)).appendTo(t.body),
            s = a.getDefaultComputedStyle && (r = a.getDefaultComputedStyle(i[0])) ? r.display : n.css(i[0], "display");
        return i.detach(), s
    }


    function xa(e, t, r) {
        var i, s, o, u, a = e.style;
        return r = r || wa(e), r && (u = r.getPropertyValue(t) || r[t]), r && ("" !== u || n.contains(e.ownerDocument, e) || (u = n.style(e, t)), va.test(u) && ua.test(t) && (i = a.width, s = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = u, u = r.width, a.width = i, a.minWidth = s, a.maxWidth = o)), void 0 !== u ? u + "" : u
    }

    function ya(e, t) {
        return {
            get: function () {
                return e() ? void delete this.get : (this.get = t).apply(this, arguments)
            }
        }
    }

    function Fa(e, t) {
        if (t in e)return t;
        var n = t[0].toUpperCase() + t.slice(1), r = t, i = Ea.length;
        while (i--)if (t = Ea[i] + n, t in e)return t;
        return r
    }

    function Ga(e, t, n) {
        var r = Aa.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }

    function Ha(e, t, r, i, s) {
        for (var o = r === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0,
                 u = 0; 4 > o; o += 2)"margin" === r && (u += n.css(e, r + R[o], !0, s)), i ? ("content" === r && (u -= n.css(e, "padding" + R[o], !0, s)), "margin" !== r && (u -= n.css(e, "border" + R[o] + "Width", !0, s))) : (u += n.css(e, "padding" + R[o], !0, s), "padding" !== r && (u += n.css(e, "border" + R[o] + "Width", !0, s)));
        return u
    }

    function Ia(e, t, r) {
        var i = !0, s = "width" === t ? e.offsetWidth : e.offsetHeight, o = wa(e),
            u = "border-box" === n.css(e, "boxSizing", !1, o);
        if (0 >= s || null == s) {
            if (s = xa(e, t, o), (0 > s || null == s) && (s = e.style[t]), va.test(s))return s;
            i = u && (k.boxSizingReliable() || s === e.style[t]), s = parseFloat(s) || 0
        }
        return s + Ha(e, t, r || (u ? "border" : "content"), i, o) + "px"
    }

    function Ja(e, t) {
        for (var r, i, s, o = [], u = 0,
                 a = e.length; a > u; u++)i = e[u], i.style && (o[u] = L.get(i, "olddisplay"), r = i.style.display, t ? (o[u] || "none" !== r || (i.style.display = ""), "" === i.style.display && S(i) && (o[u] = L.access(i, "olddisplay", ta(i.nodeName)))) : (s = S(i), "none" === r && s || L.set(i, "olddisplay", s ? r : n.css(i, "display"))));
        for (u = 0; a > u; u++)i = e[u], i.style && (t && "none" !== i.style.display && "" !== i.style.display || (i.style.display = t ? o[u] || "" : "none"));
        return e
    }

    function Ka(e, t, n, r, i) {
        return new Ka.prototype.init(e, t, n, r, i)
    }

    function Sa() {
        return setTimeout(function () {
            La = void 0
        }), La = n.now()
    }

    function Ta(e, t) {
        var n, r = 0, i = {height: e};
        for (t = t ? 1 : 0; 4 > r; r += 2 - t)n = R[r], i["margin" + n] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e), i
    }

    function Ua(e, t, n) {
        for (var r, i = (Ra[t] || []).concat(Ra["*"]), s = 0,
                 o = i.length; o > s; s++)if (r = i[s].call(n, t, e))return r
    }

    function Va(e, t, r) {
        var i, s, o, u, a, f, l, c, h = this, p = {}, d = e.style, v = e.nodeType && S(e), m = L.get(e, "fxshow");
        r.queue || (a = n._queueHooks(e, "fx"), null == a.unqueued && (a.unqueued = 0, f = a.empty.fire, a.empty.fire = function () {
            a.unqueued || f()
        }), a.unqueued++, h.always(function () {
            h.always(function () {
                a.unqueued--, n.queue(e, "fx").length || a.empty.fire()
            })
        })), 1 === e.nodeType && ("height" in t || "width" in t) && (r.overflow = [d.overflow, d.overflowX, d.overflowY], l = n.css(e, "display"), c = "none" === l ? L.get(e, "olddisplay") || ta(e.nodeName) : l, "inline" === c && "none" === n.css(e, "float") && (d.display = "inline-block")), r.overflow && (d.overflow = "hidden", h.always(function () {
            d.overflow = r.overflow[0], d.overflowX = r.overflow[1], d.overflowY = r.overflow[2]
        }));
        for (i in t)if (s = t[i], Na.exec(s)) {
            if (delete t[i], o = o || "toggle" === s, s === (v ? "hide" : "show")) {
                if ("show" !== s || !m || void 0 === m[i])continue;
                v = !0
            }
            p[i] = m && m[i] || n.style(e, i)
        } else l = void 0;
        if (n.isEmptyObject(p)) "inline" === ("none" === l ? ta(e.nodeName) : l) && (d.display = l); else {
            m ? "hidden" in m && (v = m.hidden) : m = L.access(e, "fxshow", {}), o && (m.hidden = !v), v ? n(e).show() : h.done(function () {
                n(e).hide()
            }), h.done(function () {
                var t;
                L.remove(e, "fxshow");
                for (t in p)n.style(e, t, p[t])
            });
            for (i in p)u = Ua(v ? m[i] : 0, i, h), i in m || (m[i] = u.start, v && (u.end = u.start, u.start = "width" === i || "height" === i ? 1 : 0))
        }
    }

    function Wa(e, t) {
        var r, i, s, o, u;
        for (r in e)if (i = n.camelCase(r), s = t[i], o = e[r], n.isArray(o) && (s = o[1], o = e[r] = o[0]), r !== i && (e[i] = o, delete e[r]), u = n.cssHooks[i], u && "expand" in u) {
            o = u.expand(o), delete e[i];
            for (r in o)r in e || (e[r] = o[r], t[r] = s)
        } else t[i] = s
    }

    function Xa(e, t, r) {
        var i, s, o = 0, u = Qa.length, a = n.Deferred().always(function () {
            delete f.elem
        }), f = function () {
            if (s)return !1;
            for (var t = La || Sa(), n = Math.max(0, l.startTime + l.duration - t), r = n / l.duration || 0, i = 1 - r,
                     o = 0, u = l.tweens.length; u > o; o++)l.tweens[o].run(i);
            return a.notifyWith(e, [l, i, n]), 1 > i && u ? n : (a.resolveWith(e, [l]), !1)
        }, l = a.promise({
            elem: e,
            props: n.extend({}, t),
            opts: n.extend(!0, {specialEasing: {}}, r),
            originalProperties: t,
            originalOptions: r,
            startTime: La || Sa(),
            duration: r.duration,
            tweens: [],
            createTween: function (t, r) {
                var i = n.Tween(e, l.opts, t, r, l.opts.specialEasing[t] || l.opts.easing);
                return l.tweens.push(i), i
            },
            stop: function (t) {
                var n = 0, r = t ? l.tweens.length : 0;
                if (s)return this;
                for (s = !0; r > n; n++)l.tweens[n].run(1);
                return t ? a.resolveWith(e, [l, t]) : a.rejectWith(e, [l, t]), this
            }
        }), c = l.props;
        for (Wa(c, l.opts.specialEasing); u > o; o++)if (i = Qa[o].call(l, e, c, l.opts))return i;
        return n.map(c, Ua, l), n.isFunction(l.opts.start) && l.opts.start.call(e, l), n.fx.timer(n.extend(f, {
            elem: e,
            anim: l,
            queue: l.opts.queue
        })), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always)
    }

    function qb(e) {
        return function (t, r) {
            "string" != typeof t && (r = t, t = "*");
            var i, s = 0, o = t.toLowerCase().match(E) || [];
            if (n.isFunction(r))while (i = o[s++])"+" === i[0] ? (i = i.slice(1) || "*", (e[i] = e[i] || []).unshift(r)) : (e[i] = e[i] || []).push(r)
        }
    }

    function rb(e, t, r, i) {
        function u(l) {
            var h;
            return s[l] = !0, n.each(e[l] || [], function (e, n) {
                var a = n(t, r, i);
                return "string" != typeof a || o || s[a] ? o ? !(h = a) : void 0 : (t.dataTypes.unshift(a), u(a), !1)
            }), h
        }

        var s = {}, o = e === mb;
        return u(t.dataTypes[0]) || !s["*"] && u("*")
    }

    function sb(e, t) {
        var r, i, s = n.ajaxSettings.flatOptions || {};
        for (r in t)void 0 !== t[r] && ((s[r] ? e : i || (i = {}))[r] = t[r]);
        return i && n.extend(!0, e, i), e
    }

    function tb(e, t, n) {
        var r, i, s, o, u = e.contents, a = e.dataTypes;
        while ("*" === a[0])a.shift(), void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
        if (r)for (i in u)if (u[i] && u[i].test(r)) {
            a.unshift(i);
            break
        }
        if (a[0] in n) s = a[0]; else {
            for (i in n) {
                if (!a[0] || e.converters[i + " " + a[0]]) {
                    s = i;
                    break
                }
                o || (o = i)
            }
            s = s || o
        }
        return s ? (s !== a[0] && a.unshift(s), n[s]) : void 0
    }

    function ub(e, t, n, r) {
        var i, s, o, u, a, f = {}, l = e.dataTypes.slice();
        if (l[1])for (o in e.converters)f[o.toLowerCase()] = e.converters[o];
        s = l.shift();
        while (s)if (e.responseFields[s] && (n[e.responseFields[s]] = t), !a && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), a = s, s = l.shift())if ("*" === s) s = a; else if ("*" !== a && a !== s) {
            if (o = f[a + " " + s] || f["* " + s], !o)for (i in f)if (u = i.split(" "), u[1] === s && (o = f[a + " " + u[0]] || f["* " + u[0]])) {
                o === !0 ? o = f[i] : f[i] !== !0 && (s = u[0], l.unshift(u[1]));
                break
            }
            if (o !== !0)if (o && e["throws"]) t = o(t); else try {
                t = o(t)
            } catch (c) {
                return {state: "parsererror", error: o ? c : "No conversion from " + a + " to " + s}
            }
        }
        return {state: "success", data: t}
    }

    function Ab(e, t, r, i) {
        var s;
        if (n.isArray(t)) n.each(t, function (t, n) {
            r || wb.test(e) ? i(e, n) : Ab(e + "[" + ("object" == typeof n ? t : "") + "]", n, r, i)
        }); else if (r || "object" !== n.type(t)) i(e, t); else for (s in t)Ab(e + "[" + s + "]", t[s], r, i)
    }

    function Jb(e) {
        return n.isWindow(e) ? e : 9 === e.nodeType && e.defaultView
    }

    var c = [], d = c.slice, e = c.concat, f = c.push, g = c.indexOf, h = {}, i = h.toString, j = h.hasOwnProperty,
        k = {}, l = a.document, m = "2.1.4", n = function (e, t) {
            return new n.fn.init(e, t)
        }, o = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, p = /^-ms-/, q = /-([\da-z])/gi, r = function (e, t) {
            return t.toUpperCase()
        };
    n.fn = n.prototype = {
        jquery: m, constructor: n, selector: "", length: 0, toArray: function () {
            return d.call(this)
        }, get: function (e) {
            return null != e ? 0 > e ? this[e + this.length] : this[e] : d.call(this)
        }, pushStack: function (e) {
            var t = n.merge(this.constructor(), e);
            return t.prevObject = this, t.context = this.context, t
        }, each: function (e, t) {
            return n.each(this, e, t)
        }, map: function (e) {
            return this.pushStack(n.map(this, function (t, n) {
                return e.call(t, n, t)
            }))
        }, slice: function () {
            return this.pushStack(d.apply(this, arguments))
        }, first: function () {
            return this.eq(0)
        }, last: function () {
            return this.eq(-1)
        }, eq: function (e) {
            var t = this.length, n = +e + (0 > e ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
        }, end: function () {
            return this.prevObject || this.constructor(null)
        }, push: f, sort: c.sort, splice: c.splice
    }, n.extend = n.fn.extend = function () {
        var e, t, r, i, s, o, u = arguments[0] || {}, a = 1, f = arguments.length, l = !1;
        for ("boolean" == typeof u && (l = u, u = arguments[a] || {}, a++), "object" == typeof u || n.isFunction(u) || (u = {}), a === f && (u = this, a--); f > a; a++)if (null != (e = arguments[a]))for (t in e)r = u[t], i = e[t], u !== i && (l && i && (n.isPlainObject(i) || (s = n.isArray(i))) ? (s ? (s = !1, o = r && n.isArray(r) ? r : []) : o = r && n.isPlainObject(r) ? r : {}, u[t] = n.extend(l, o, i)) : void 0 !== i && (u[t] = i));
        return u
    }, n.extend({
        expando: "jQuery" + (m + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (e) {
            throw new Error(e)
        }, noop: function () {
        }, isFunction: function (e) {
            return "function" === n.type(e)
        }, isArray: Array.isArray, isWindow: function (e) {
            return null != e && e === e.window
        }, isNumeric: function (e) {
            return !n.isArray(e) && e - parseFloat(e) + 1 >= 0
        }, isPlainObject: function (e) {
            return "object" !== n.type(e) || e.nodeType || n.isWindow(e) ? !1 : e.constructor && !j.call(e.constructor.prototype, "isPrototypeOf") ? !1 : !0
        }, isEmptyObject: function (e) {
            var t;
            for (t in e)return !1;
            return !0
        }, type: function (e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? h[i.call(e)] || "object" : typeof e
        }, globalEval: function (a) {
            var b, c = eval;
            a = n.trim(a), a && (1 === a.indexOf("use strict") ? (b = l.createElement("script"), b.text = a, l.head.appendChild(b).parentNode.removeChild(b)) : c(a))
        }, camelCase: function (e) {
            return e.replace(p, "ms-").replace(q, r)
        }, nodeName: function (e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        }, each: function (e, t, n) {
            var r, i = 0, o = e.length, u = s(e);
            if (n) {
                if (u) {
                    for (; o > i; i++)if (r = t.apply(e[i], n), r === !1)break
                } else for (i in e)if (r = t.apply(e[i], n), r === !1)break
            } else if (u) {
                for (; o > i; i++)if (r = t.call(e[i], i, e[i]), r === !1)break
            } else for (i in e)if (r = t.call(e[i], i, e[i]), r === !1)break;
            return e
        }, trim: function (e) {
            return null == e ? "" : (e + "").replace(o, "")
        }, makeArray: function (e, t) {
            var r = t || [];
            return null != e && (s(Object(e)) ? n.merge(r, "string" == typeof e ? [e] : e) : f.call(r, e)), r
        }, inArray: function (e, t, n) {
            return null == t ? -1 : g.call(t, e, n)
        }, merge: function (e, t) {
            for (var n = +t.length, r = 0, i = e.length; n > r; r++)e[i++] = t[r];
            return e.length = i, e
        }, grep: function (e, t, n) {
            for (var r, i = [], s = 0, o = e.length, u = !n; o > s; s++)r = !t(e[s], s), r !== u && i.push(e[s]);
            return i
        }, map: function (t, n, r) {
            var i, o = 0, u = t.length, a = s(t), f = [];
            if (a)for (; u > o; o++)i = n(t[o], o, r), null != i && f.push(i); else for (o in t)i = n(t[o], o, r), null != i && f.push(i);
            return e.apply([], f)
        }, guid: 1, proxy: function (e, t) {
            var r, i, s;
            return "string" == typeof t && (r = e[t], t = e, e = r), n.isFunction(e) ? (i = d.call(arguments, 2), s = function () {
                return e.apply(t || this, i.concat(d.call(arguments)))
            }, s.guid = e.guid = e.guid || n.guid++, s) : void 0
        }, now: Date.now, support: k
    }), n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
        h["[object " + t + "]"] = t.toLowerCase()
    });
    var t = function (e) {
        function ot(e, t, r, i) {
            var s, u, f, l, c, d, g, y, S, x;
            if ((t ? t.ownerDocument || t : E) !== p && h(t), t = t || p, r = r || [], l = t.nodeType, "string" != typeof e || !e || 1 !== l && 9 !== l && 11 !== l)return r;
            if (!i && v) {
                if (11 !== l && (s = Z.exec(e)))if (f = s[1]) {
                    if (9 === l) {
                        if (u = t.getElementById(f), !u || !u.parentNode)return r;
                        if (u.id === f)return r.push(u), r
                    } else if (t.ownerDocument && (u = t.ownerDocument.getElementById(f)) && b(t, u) && u.id === f)return r.push(u), r
                } else {
                    if (s[2])return D.apply(r, t.getElementsByTagName(e)), r;
                    if ((f = s[3]) && n.getElementsByClassName)return D.apply(r, t.getElementsByClassName(f)), r
                }
                if (n.qsa && (!m || !m.test(e))) {
                    if (y = g = w, S = t, x = 1 !== l && e, 1 === l && "object" !== t.nodeName.toLowerCase()) {
                        d = o(e), (g = t.getAttribute("id")) ? y = g.replace(tt, "\\$&") : t.setAttribute("id", y), y = "[id='" + y + "'] ", c = d.length;
                        while (c--)d[c] = y + gt(d[c]);
                        S = et.test(e) && vt(t.parentNode) || t, x = d.join(",")
                    }
                    if (x)try {
                        return D.apply(r, S.querySelectorAll(x)), r
                    } catch (T) {
                    } finally {
                        g || t.removeAttribute("id")
                    }
                }
            }
            return a(e.replace(z, "$1"), t, r, i)
        }

        function ut() {
            function t(n, i) {
                return e.push(n + " ") > r.cacheLength && delete t[e.shift()], t[n + " "] = i
            }

            var e = [];
            return t
        }

        function at(e) {
            return e[w] = !0, e
        }

        function ft(e) {
            var t = p.createElement("div");
            try {
                return !!e(t)
            } catch (n) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }

        function lt(e, t) {
            var n = e.split("|"), i = e.length;
            while (i--)r.attrHandle[n[i]] = t
        }

        function ct(e, t) {
            var n = t && e,
                r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || L) - (~e.sourceIndex || L);
            if (r)return r;
            if (n)while (n = n.nextSibling)if (n === t)return -1;
            return e ? 1 : -1
        }

        function ht(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }

        function pt(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }

        function dt(e) {
            return at(function (t) {
                return t = +t, at(function (n, r) {
                    var i, s = e([], n.length, t), o = s.length;
                    while (o--)n[i = s[o]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }

        function vt(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e
        }

        function mt() {
        }

        function gt(e) {
            for (var t = 0, n = e.length, r = ""; n > t; t++)r += e[t].value;
            return r
        }

        function yt(e, t, n) {
            var r = t.dir, i = n && "parentNode" === r, s = x++;
            return t.first ? function (t, n, s) {
                while (t = t[r])if (1 === t.nodeType || i)return e(t, n, s)
            } : function (t, n, o) {
                var u, a, f = [S, s];
                if (o) {
                    while (t = t[r])if ((1 === t.nodeType || i) && e(t, n, o))return !0
                } else while (t = t[r])if (1 === t.nodeType || i) {
                    if (a = t[w] || (t[w] = {}), (u = a[r]) && u[0] === S && u[1] === s)return f[2] = u[2];
                    if (a[r] = f, f[2] = e(t, n, o))return !0
                }
            }
        }

        function bt(e) {
            return e.length > 1 ? function (t, n, r) {
                var i = e.length;
                while (i--)if (!e[i](t, n, r))return !1;
                return !0
            } : e[0]
        }

        function wt(e, t, n) {
            for (var r = 0, i = t.length; i > r; r++)ot(e, t[r], n);
            return n
        }

        function Et(e, t, n, r, i) {
            for (var s, o = [], u = 0, a = e.length,
                     f = null != t; a > u; u++)(s = e[u]) && (!n || n(s, r, i)) && (o.push(s), f && t.push(u));
            return o
        }

        function St(e, t, n, r, i, s) {
            return r && !r[w] && (r = St(r)), i && !i[w] && (i = St(i, s)), at(function (s, o, u, a) {
                var f, l, c, h = [], p = [], d = o.length, v = s || wt(t || "*", u.nodeType ? [u] : u, []),
                    m = !e || !s && t ? v : Et(v, h, e, u, a), g = n ? i || (s ? e : d || r) ? [] : o : m;
                if (n && n(m, g, u, a), r) {
                    f = Et(g, p), r(f, [], u, a), l = f.length;
                    while (l--)(c = f[l]) && (g[p[l]] = !(m[p[l]] = c))
                }
                if (s) {
                    if (i || e) {
                        if (i) {
                            f = [], l = g.length;
                            while (l--)(c = g[l]) && f.push(m[l] = c);
                            i(null, g = [], f, a)
                        }
                        l = g.length;
                        while (l--)(c = g[l]) && (f = i ? H(s, c) : h[l]) > -1 && (s[f] = !(o[f] = c))
                    }
                } else g = Et(g === o ? g.splice(d, g.length) : g), i ? i(null, o, g, a) : D.apply(o, g)
            })
        }

        function xt(e) {
            for (var t, n, i, s = e.length, o = r.relative[e[0].type], u = o || r.relative[" "], a = o ? 1 : 0,
                     l = yt(function (e) {
                         return e === t
                     }, u, !0), c = yt(function (e) {
                    return H(t, e) > -1
                }, u, !0), h = [function (e, n, r) {
                    var i = !o && (r || n !== f) || ((t = n).nodeType ? l(e, n, r) : c(e, n, r));
                    return t = null, i
                }]; s > a; a++)if (n = r.relative[e[a].type]) h = [yt(bt(h), n)]; else {
                if (n = r.filter[e[a].type].apply(null, e[a].matches), n[w]) {
                    for (i = ++a; s > i; i++)if (r.relative[e[i].type])break;
                    return St(a > 1 && bt(h), a > 1 && gt(e.slice(0, a - 1).concat({value: " " === e[a - 2].type ? "*" : ""})).replace(z, "$1"), n, i > a && xt(e.slice(a, i)), s > i && xt(e = e.slice(i)), s > i && gt(e))
                }
                h.push(n)
            }
            return bt(h)
        }

        function Tt(e, t) {
            var n = t.length > 0, i = e.length > 0, s = function (s, o, u, a, l) {
                var c, h, d, v = 0, m = "0", g = s && [], y = [], b = f, w = s || i && r.find.TAG("*", l),
                    E = S += null == b ? 1 : Math.random() || .1, x = w.length;
                for (l && (f = o !== p && o); m !== x && null != (c = w[m]); m++) {
                    if (i && c) {
                        h = 0;
                        while (d = e[h++])if (d(c, o, u)) {
                            a.push(c);
                            break
                        }
                        l && (S = E)
                    }
                    n && ((c = !d && c) && v--, s && g.push(c))
                }
                if (v += m, n && m !== v) {
                    h = 0;
                    while (d = t[h++])d(g, y, o, u);
                    if (s) {
                        if (v > 0)while (m--)g[m] || y[m] || (y[m] = M.call(a));
                        y = Et(y)
                    }
                    D.apply(a, y), l && !s && y.length > 0 && v + t.length > 1 && ot.uniqueSort(a)
                }
                return l && (S = E, f = b), g
            };
            return n ? at(s) : s
        }

        var t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w = "sizzle" + 1 * new Date, E = e.document, S = 0,
            x = 0, T = ut(), N = ut(), C = ut(), k = function (e, t) {
                return e === t && (c = !0), 0
            }, L = 1 << 31, A = {}.hasOwnProperty, O = [], M = O.pop, _ = O.push, D = O.push, P = O.slice,
            H = function (e, t) {
                for (var n = 0, r = e.length; r > n; n++)if (e[n] === t)return n;
                return -1
            },
            B = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            j = "[\\x20\\t\\r\\n\\f]", F = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", I = F.replace("w", "w#"),
            q = "\\[" + j + "*(" + F + ")(?:" + j + "*([*^$|!~]?=)" + j + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + I + "))|)" + j + "*\\]",
            R = ":(" + F + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + q + ")*)|.*)\\)|)",
            U = new RegExp(j + "+", "g"), z = new RegExp("^" + j + "+|((?:^|[^\\\\])(?:\\\\.)*)" + j + "+$", "g"),
            W = new RegExp("^" + j + "*," + j + "*"), X = new RegExp("^" + j + "*([>+~]|" + j + ")" + j + "*"),
            V = new RegExp("=" + j + "*([^\\]'\"]*?)" + j + "*\\]", "g"), $ = new RegExp(R),
            J = new RegExp("^" + I + "$"), K = {
                ID: new RegExp("^#(" + F + ")"),
                CLASS: new RegExp("^\\.(" + F + ")"),
                TAG: new RegExp("^(" + F.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + q),
                PSEUDO: new RegExp("^" + R),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + j + "*(even|odd|(([+-]|)(\\d*)n|)" + j + "*(?:([+-]|)" + j + "*(\\d+)|))" + j + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + B + ")$", "i"),
                needsContext: new RegExp("^" + j + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + j + "*((?:-\\d)?\\d*)" + j + "*\\)|)(?=[^-]|$)", "i")
            }, Q = /^(?:input|select|textarea|button)$/i, G = /^h\d$/i, Y = /^[^{]+\{\s*\[native \w/,
            Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, et = /[+~]/, tt = /'|\\/g,
            nt = new RegExp("\\\\([\\da-f]{1,6}" + j + "?|(" + j + ")|.)", "ig"), rt = function (e, t, n) {
                var r = "0x" + t - 65536;
                return r !== r || n ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
            }, it = function () {
                h()
            };
        try {
            D.apply(O = P.call(E.childNodes), E.childNodes), O[E.childNodes.length].nodeType
        } catch (st) {
            D = {
                apply: O.length ? function (e, t) {
                    _.apply(e, P.call(t))
                } : function (e, t) {
                    var n = e.length, r = 0;
                    while (e[n++] = t[r++]);
                    e.length = n - 1
                }
            }
        }
        n = ot.support = {}, s = ot.isXML = function (e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName : !1
        }, h = ot.setDocument = function (e) {
            var t, i, o = e ? e.ownerDocument || e : E;
            return o !== p && 9 === o.nodeType && o.documentElement ? (p = o, d = o.documentElement, i = o.defaultView, i && i !== i.top && (i.addEventListener ? i.addEventListener("unload", it, !1) : i.attachEvent && i.attachEvent("onunload", it)), v = !s(o), n.attributes = ft(function (e) {
                return e.className = "i", !e.getAttribute("className")
            }), n.getElementsByTagName = ft(function (e) {
                return e.appendChild(o.createComment("")), !e.getElementsByTagName("*").length
            }), n.getElementsByClassName = Y.test(o.getElementsByClassName), n.getById = ft(function (e) {
                return d.appendChild(e).id = w, !o.getElementsByName || !o.getElementsByName(w).length
            }), n.getById ? (r.find.ID = function (e, t) {
                if ("undefined" != typeof t.getElementById && v) {
                    var n = t.getElementById(e);
                    return n && n.parentNode ? [n] : []
                }
            }, r.filter.ID = function (e) {
                var t = e.replace(nt, rt);
                return function (e) {
                    return e.getAttribute("id") === t
                }
            }) : (delete r.find.ID, r.filter.ID = function (e) {
                var t = e.replace(nt, rt);
                return function (e) {
                    var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), r.find.TAG = n.getElementsByTagName ? function (e, t) {
                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : n.qsa ? t.querySelectorAll(e) : void 0
            } : function (e, t) {
                var n, r = [], i = 0, s = t.getElementsByTagName(e);
                if ("*" === e) {
                    while (n = s[i++])1 === n.nodeType && r.push(n);
                    return r
                }
                return s
            }, r.find.CLASS = n.getElementsByClassName && function (e, t) {
                    return v ? t.getElementsByClassName(e) : void 0
                }, g = [], m = [], (n.qsa = Y.test(o.querySelectorAll)) && (ft(function (e) {
                d.appendChild(e).innerHTML = "<a id='" + w + "'></a><select id='" + w + "-\f]' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && m.push("[*^$]=" + j + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || m.push("\\[" + j + "*(?:value|" + B + ")"), e.querySelectorAll("[id~=" + w + "-]").length || m.push("~="), e.querySelectorAll(":checked").length || m.push(":checked"), e.querySelectorAll("a#" + w + "+*").length || m.push(".#.+[+~]")
            }), ft(function (e) {
                var t = o.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && m.push("name" + j + "*[*^$|!~]?="), e.querySelectorAll(":enabled").length || m.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), m.push(",.*:")
            })), (n.matchesSelector = Y.test(y = d.matches || d.webkitMatchesSelector || d.mozMatchesSelector || d.oMatchesSelector || d.msMatchesSelector)) && ft(function (e) {
                n.disconnectedMatch = y.call(e, "div"), y.call(e, "[s!='']:x"), g.push("!=", R)
            }), m = m.length && new RegExp(m.join("|")), g = g.length && new RegExp(g.join("|")), t = Y.test(d.compareDocumentPosition), b = t || Y.test(d.contains) ? function (e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e, r = t && t.parentNode;
                return e === r || !!r && 1 === r.nodeType && !!(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r))
            } : function (e, t) {
                if (t)while (t = t.parentNode)if (t === e)return !0;
                return !1
            }, k = t ? function (e, t) {
                if (e === t)return c = !0, 0;
                var r = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return r ? r : (r = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1, 1 & r || !n.sortDetached && t.compareDocumentPosition(e) === r ? e === o || e.ownerDocument === E && b(E, e) ? -1 : t === o || t.ownerDocument === E && b(E, t) ? 1 : l ? H(l, e) - H(l, t) : 0 : 4 & r ? -1 : 1)
            } : function (e, t) {
                if (e === t)return c = !0, 0;
                var n, r = 0, i = e.parentNode, s = t.parentNode, u = [e], a = [t];
                if (!i || !s)return e === o ? -1 : t === o ? 1 : i ? -1 : s ? 1 : l ? H(l, e) - H(l, t) : 0;
                if (i === s)return ct(e, t);
                n = e;
                while (n = n.parentNode)u.unshift(n);
                n = t;
                while (n = n.parentNode)a.unshift(n);
                while (u[r] === a[r])r++;
                return r ? ct(u[r], a[r]) : u[r] === E ? -1 : a[r] === E ? 1 : 0
            }, o) : p
        }, ot.matches = function (e, t) {
            return ot(e, null, null, t)
        }, ot.matchesSelector = function (e, t) {
            if ((e.ownerDocument || e) !== p && h(e), t = t.replace(V, "='$1']"), !(!n.matchesSelector || !v || g && g.test(t) || m && m.test(t)))try {
                var r = y.call(e, t);
                if (r || n.disconnectedMatch || e.document && 11 !== e.document.nodeType)return r
            } catch (i) {
            }
            return ot(t, p, null, [e]).length > 0
        }, ot.contains = function (e, t) {
            return (e.ownerDocument || e) !== p && h(e), b(e, t)
        }, ot.attr = function (e, t) {
            (e.ownerDocument || e) !== p && h(e);
            var i = r.attrHandle[t.toLowerCase()],
                s = i && A.call(r.attrHandle, t.toLowerCase()) ? i(e, t, !v) : void 0;
            return void 0 !== s ? s : n.attributes || !v ? e.getAttribute(t) : (s = e.getAttributeNode(t)) && s.specified ? s.value : null
        }, ot.error = function (e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, ot.uniqueSort = function (e) {
            var t, r = [], i = 0, s = 0;
            if (c = !n.detectDuplicates, l = !n.sortStable && e.slice(0), e.sort(k), c) {
                while (t = e[s++])t === e[s] && (i = r.push(s));
                while (i--)e.splice(r[i], 1)
            }
            return l = null, e
        }, i = ot.getText = function (e) {
            var t, n = "", r = 0, s = e.nodeType;
            if (s) {
                if (1 === s || 9 === s || 11 === s) {
                    if ("string" == typeof e.textContent)return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling)n += i(e)
                } else if (3 === s || 4 === s)return e.nodeValue
            } else while (t = e[r++])n += i(t);
            return n
        }, r = ot.selectors = {
            cacheLength: 50,
            createPseudo: at,
            match: K,
            attrHandle: {},
            find: {},
            relative: {
                ">": {dir: "parentNode", first: !0},
                " ": {dir: "parentNode"},
                "+": {dir: "previousSibling", first: !0},
                "~": {dir: "previousSibling"}
            },
            preFilter: {
                ATTR: function (e) {
                    return e[1] = e[1].replace(nt, rt), e[3] = (e[3] || e[4] || e[5] || "").replace(nt, rt), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                }, CHILD: function (e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || ot.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && ot.error(e[0]), e
                }, PSEUDO: function (e) {
                    var t, n = !e[6] && e[2];
                    return K.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && $.test(n) && (t = o(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function (e) {
                    var t = e.replace(nt, rt).toLowerCase();
                    return "*" === e ? function () {
                        return !0
                    } : function (e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                }, CLASS: function (e) {
                    var t = T[e + " "];
                    return t || (t = new RegExp("(^|" + j + ")" + e + "(" + j + "|$)")) && T(e, function (e) {
                            return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                        })
                }, ATTR: function (e, t, n) {
                    return function (r) {
                        var i = ot.attr(r, e);
                        return null == i ? "!=" === t : t ? (i += "", "=" === t ? i === n : "!=" === t ? i !== n : "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1 : "$=" === t ? n && i.slice(-n.length) === n : "~=" === t ? (" " + i.replace(U, " ") + " ").indexOf(n) > -1 : "|=" === t ? i === n || i.slice(0, n.length + 1) === n + "-" : !1) : !0
                    }
                }, CHILD: function (e, t, n, r, i) {
                    var s = "nth" !== e.slice(0, 3), o = "last" !== e.slice(-4), u = "of-type" === t;
                    return 1 === r && 0 === i ? function (e) {
                        return !!e.parentNode
                    } : function (t, n, a) {
                        var f, l, c, h, p, d, v = s !== o ? "nextSibling" : "previousSibling", m = t.parentNode,
                            g = u && t.nodeName.toLowerCase(), y = !a && !u;
                        if (m) {
                            if (s) {
                                while (v) {
                                    c = t;
                                    while (c = c[v])if (u ? c.nodeName.toLowerCase() === g : 1 === c.nodeType)return !1;
                                    d = v = "only" === e && !d && "nextSibling"
                                }
                                return !0
                            }
                            if (d = [o ? m.firstChild : m.lastChild], o && y) {
                                l = m[w] || (m[w] = {}), f = l[e] || [], p = f[0] === S && f[1], h = f[0] === S && f[2], c = p && m.childNodes[p];
                                while (c = ++p && c && c[v] || (h = p = 0) || d.pop())if (1 === c.nodeType && ++h && c === t) {
                                    l[e] = [S, p, h];
                                    break
                                }
                            } else if (y && (f = (t[w] || (t[w] = {}))[e]) && f[0] === S) h = f[1]; else while (c = ++p && c && c[v] || (h = p = 0) || d.pop())if ((u ? c.nodeName.toLowerCase() === g : 1 === c.nodeType) && ++h && (y && ((c[w] || (c[w] = {}))[e] = [S, h]), c === t))break;
                            return h -= i, h === r || h % r === 0 && h / r >= 0
                        }
                    }
                }, PSEUDO: function (e, t) {
                    var n, i = r.pseudos[e] || r.setFilters[e.toLowerCase()] || ot.error("unsupported pseudo: " + e);
                    return i[w] ? i(t) : i.length > 1 ? (n = [e, e, "", t], r.setFilters.hasOwnProperty(e.toLowerCase()) ? at(function (e, n) {
                        var r, s = i(e, t), o = s.length;
                        while (o--)r = H(e, s[o]), e[r] = !(n[r] = s[o])
                    }) : function (e) {
                        return i(e, 0, n)
                    }) : i
                }
            },
            pseudos: {
                not: at(function (e) {
                    var t = [], n = [], r = u(e.replace(z, "$1"));
                    return r[w] ? at(function (e, t, n, i) {
                        var s, o = r(e, null, i, []), u = e.length;
                        while (u--)(s = o[u]) && (e[u] = !(t[u] = s))
                    }) : function (e, i, s) {
                        return t[0] = e, r(t, null, s, n), t[0] = null, !n.pop()
                    }
                }), has: at(function (e) {
                    return function (t) {
                        return ot(e, t).length > 0
                    }
                }), contains: at(function (e) {
                    return e = e.replace(nt, rt), function (t) {
                        return (t.textContent || t.innerText || i(t)).indexOf(e) > -1
                    }
                }), lang: at(function (e) {
                    return J.test(e || "") || ot.error("unsupported lang: " + e), e = e.replace(nt, rt).toLowerCase(), function (t) {
                        var n;
                        do if (n = v ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))return n = n.toLowerCase(), n === e || 0 === n.indexOf(e + "-"); while ((t = t.parentNode) && 1 === t.nodeType);
                        return !1
                    }
                }), target: function (t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                }, root: function (e) {
                    return e === d
                }, focus: function (e) {
                    return e === p.activeElement && (!p.hasFocus || p.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                }, enabled: function (e) {
                    return e.disabled === !1
                }, disabled: function (e) {
                    return e.disabled === !0
                }, checked: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                }, selected: function (e) {
                    return e.parentNode && e.parentNode.selectedIndex, e.selected === !0
                }, empty: function (e) {
                    for (e = e.firstChild; e; e = e.nextSibling)if (e.nodeType < 6)return !1;
                    return !0
                }, parent: function (e) {
                    return !r.pseudos.empty(e)
                }, header: function (e) {
                    return G.test(e.nodeName)
                }, input: function (e) {
                    return Q.test(e.nodeName)
                }, button: function (e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                }, text: function (e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                }, first: dt(function () {
                    return [0]
                }), last: dt(function (e, t) {
                    return [t - 1]
                }), eq: dt(function (e, t, n) {
                    return [0 > n ? n + t : n]
                }), even: dt(function (e, t) {
                    for (var n = 0; t > n; n += 2)e.push(n);
                    return e
                }), odd: dt(function (e, t) {
                    for (var n = 1; t > n; n += 2)e.push(n);
                    return e
                }), lt: dt(function (e, t, n) {
                    for (var r = 0 > n ? n + t : n; --r >= 0;)e.push(r);
                    return e
                }), gt: dt(function (e, t, n) {
                    for (var r = 0 > n ? n + t : n; ++r < t;)e.push(r);
                    return e
                })
            }
        }, r.pseudos.nth = r.pseudos.eq;
        for (t in{radio: !0, checkbox: !0, file: !0, password: !0, image: !0})r.pseudos[t] = ht(t);
        for (t in{submit: !0, reset: !0})r.pseudos[t] = pt(t);
        return mt.prototype = r.filters = r.pseudos, r.setFilters = new mt, o = ot.tokenize = function (e, t) {
            var n, i, s, o, u, a, f, l = N[e + " "];
            if (l)return t ? 0 : l.slice(0);
            u = e, a = [], f = r.preFilter;
            while (u) {
                (!n || (i = W.exec(u))) && (i && (u = u.slice(i[0].length) || u), a.push(s = [])), n = !1, (i = X.exec(u)) && (n = i.shift(), s.push({
                    value: n,
                    type: i[0].replace(z, " ")
                }), u = u.slice(n.length));
                for (o in r.filter)!(i = K[o].exec(u)) || f[o] && !(i = f[o](i)) || (n = i.shift(), s.push({
                    value: n,
                    type: o,
                    matches: i
                }), u = u.slice(n.length));
                if (!n)break
            }
            return t ? u.length : u ? ot.error(e) : N(e, a).slice(0)
        }, u = ot.compile = function (e, t) {
            var n, r = [], i = [], s = C[e + " "];
            if (!s) {
                t || (t = o(e)), n = t.length;
                while (n--)s = xt(t[n]), s[w] ? r.push(s) : i.push(s);
                s = C(e, Tt(i, r)), s.selector = e
            }
            return s
        }, a = ot.select = function (e, t, i, s) {
            var a, f, l, c, h, p = "function" == typeof e && e, d = !s && o(e = p.selector || e);
            if (i = i || [], 1 === d.length) {
                if (f = d[0] = d[0].slice(0), f.length > 2 && "ID" === (l = f[0]).type && n.getById && 9 === t.nodeType && v && r.relative[f[1].type]) {
                    if (t = (r.find.ID(l.matches[0].replace(nt, rt), t) || [])[0], !t)return i;
                    p && (t = t.parentNode), e = e.slice(f.shift().value.length)
                }
                a = K.needsContext.test(e) ? 0 : f.length;
                while (a--) {
                    if (l = f[a], r.relative[c = l.type])break;
                    if ((h = r.find[c]) && (s = h(l.matches[0].replace(nt, rt), et.test(f[0].type) && vt(t.parentNode) || t))) {
                        if (f.splice(a, 1), e = s.length && gt(f), !e)return D.apply(i, s), i;
                        break
                    }
                }
            }
            return (p || u(e, d))(s, t, !v, i, et.test(e) && vt(t.parentNode) || t), i
        }, n.sortStable = w.split("").sort(k).join("") === w, n.detectDuplicates = !!c, h(), n.sortDetached = ft(function (e) {
            return 1 & e.compareDocumentPosition(p.createElement("div"))
        }), ft(function (e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || lt("type|href|height|width", function (e, t, n) {
            return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), n.attributes && ft(function (e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || lt("value", function (e, t, n) {
            return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue
        }), ft(function (e) {
            return null == e.getAttribute("disabled")
        }) || lt(B, function (e, t, n) {
            var r;
            return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }), ot
    }(a);
    n.find = t, n.expr = t.selectors, n.expr[":"] = n.expr.pseudos, n.unique = t.uniqueSort, n.text = t.getText, n.isXMLDoc = t.isXML, n.contains = t.contains;
    var u = n.expr.match.needsContext, v = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, w = /^.[^:#\[\.,]*$/;
    n.filter = function (e, t, r) {
        var i = t[0];
        return r && (e = ":not(" + e + ")"), 1 === t.length && 1 === i.nodeType ? n.find.matchesSelector(i, e) ? [i] : [] : n.find.matches(e, n.grep(t, function (e) {
            return 1 === e.nodeType
        }))
    }, n.fn.extend({
        find: function (e) {
            var t, r = this.length, i = [], s = this;
            if ("string" != typeof e)return this.pushStack(n(e).filter(function () {
                for (t = 0; r > t; t++)if (n.contains(s[t], this))return !0
            }));
            for (t = 0; r > t; t++)n.find(e, s[t], i);
            return i = this.pushStack(r > 1 ? n.unique(i) : i), i.selector = this.selector ? this.selector + " " + e : e, i
        }, filter: function (e) {
            return this.pushStack(x(this, e || [], !1))
        }, not: function (e) {
            return this.pushStack(x(this, e || [], !0))
        }, is: function (e) {
            return !!x(this, "string" == typeof e && u.test(e) ? n(e) : e || [], !1).length
        }
    });
    var y, z = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, A = n.fn.init = function (e, t) {
        var r, i;
        if (!e)return this;
        if ("string" == typeof e) {
            if (r = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : z.exec(e), !r || !r[1] && t)return !t || t.jquery ? (t || y).find(e) : this.constructor(t).find(e);
            if (r[1]) {
                if (t = t instanceof n ? t[0] : t, n.merge(this, n.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : l, !0)), v.test(r[1]) && n.isPlainObject(t))for (r in t)n.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                return this
            }
            return i = l.getElementById(r[2]), i && i.parentNode && (this.length = 1, this[0] = i), this.context = l, this.selector = e, this
        }
        return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : n.isFunction(e) ? "undefined" != typeof y.ready ? y.ready(e) : e(n) : (void 0 !== e.selector && (this.selector = e.selector, this.context = e.context), n.makeArray(e, this))
    };
    A.prototype = n.fn, y = n(l);
    var B = /^(?:parents|prev(?:Until|All))/, C = {children: !0, contents: !0, next: !0, prev: !0};
    n.extend({
        dir: function (e, t, r) {
            var i = [], s = void 0 !== r;
            while ((e = e[t]) && 9 !== e.nodeType)if (1 === e.nodeType) {
                if (s && n(e).is(r))break;
                i.push(e)
            }
            return i
        }, sibling: function (e, t) {
            for (var n = []; e; e = e.nextSibling)1 === e.nodeType && e !== t && n.push(e);
            return n
        }
    }), n.fn.extend({
        has: function (e) {
            var t = n(e, this), r = t.length;
            return this.filter(function () {
                for (var e = 0; r > e; e++)if (n.contains(this, t[e]))return !0
            })
        }, closest: function (e, t) {
            for (var r, i = 0, s = this.length, o = [],
                     a = u.test(e) || "string" != typeof e ? n(e, t || this.context) : 0; s > i; i++)for (r = this[i]; r && r !== t; r = r.parentNode)if (r.nodeType < 11 && (a ? a.index(r) > -1 : 1 === r.nodeType && n.find.matchesSelector(r, e))) {
                o.push(r);
                break
            }
            return this.pushStack(o.length > 1 ? n.unique(o) : o)
        }, index: function (e) {
            return e ? "string" == typeof e ? g.call(n(e), this[0]) : g.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        }, add: function (e, t) {
            return this.pushStack(n.unique(n.merge(this.get(), n(e, t))))
        }, addBack: function (e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), n.each({
        parent: function (e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        }, parents: function (e) {
            return n.dir(e, "parentNode")
        }, parentsUntil: function (e, t, r) {
            return n.dir(e, "parentNode", r)
        }, next: function (e) {
            return D(e, "nextSibling")
        }, prev: function (e) {
            return D(e, "previousSibling")
        }, nextAll: function (e) {
            return n.dir(e, "nextSibling")
        }, prevAll: function (e) {
            return n.dir(e, "previousSibling")
        }, nextUntil: function (e, t, r) {
            return n.dir(e, "nextSibling", r)
        }, prevUntil: function (e, t, r) {
            return n.dir(e, "previousSibling", r)
        }, siblings: function (e) {
            return n.sibling((e.parentNode || {}).firstChild, e)
        }, children: function (e) {
            return n.sibling(e.firstChild)
        }, contents: function (e) {
            return e.contentDocument || n.merge([], e.childNodes)
        }
    }, function (e, t) {
        n.fn[e] = function (r, i) {
            var s = n.map(this, t, r);
            return "Until" !== e.slice(-5) && (i = r), i && "string" == typeof i && (s = n.filter(i, s)), this.length > 1 && (C[e] || n.unique(s), B.test(e) && s.reverse()), this.pushStack(s)
        }
    });
    var E = /\S+/g, F = {};
    n.Callbacks = function (e) {
        e = "string" == typeof e ? F[e] || G(e) : n.extend({}, e);
        var t, r, i, s, o, u, a = [], f = !e.once && [], l = function (n) {
            for (t = e.memory && n, r = !0, u = s || 0, s = 0, o = a.length, i = !0; a && o > u; u++)if (a[u].apply(n[0], n[1]) === !1 && e.stopOnFalse) {
                t = !1;
                break
            }
            i = !1, a && (f ? f.length && l(f.shift()) : t ? a = [] : c.disable())
        }, c = {
            add: function () {
                if (a) {
                    var r = a.length;
                    !function u(t) {
                        n.each(t, function (t, r) {
                            var i = n.type(r);
                            "function" === i ? e.unique && c.has(r) || a.push(r) : r && r.length && "string" !== i && u(r)
                        })
                    }(arguments), i ? o = a.length : t && (s = r, l(t))
                }
                return this
            }, remove: function () {
                return a && n.each(arguments, function (e, t) {
                    var r;
                    while ((r = n.inArray(t, a, r)) > -1)a.splice(r, 1), i && (o >= r && o--, u >= r && u--)
                }), this
            }, has: function (e) {
                return e ? n.inArray(e, a) > -1 : !!a && !!a.length
            }, empty: function () {
                return a = [], o = 0, this
            }, disable: function () {
                return a = f = t = void 0, this
            }, disabled: function () {
                return !a
            }, lock: function () {
                return f = void 0, t || c.disable(), this
            }, locked: function () {
                return !f
            }, fireWith: function (e, t) {
                return !a || r && !f || (t = t || [], t = [e, t.slice ? t.slice() : t], i ? f.push(t) : l(t)), this
            }, fire: function () {
                return c.fireWith(this, arguments), this
            }, fired: function () {
                return !!r
            }
        };
        return c
    }, n.extend({
        Deferred: function (e) {
            var t = [["resolve", "done", n.Callbacks("once memory"), "resolved"], ["reject", "fail", n.Callbacks("once memory"), "rejected"], ["notify", "progress", n.Callbacks("memory")]],
                r = "pending", i = {
                    state: function () {
                        return r
                    }, always: function () {
                        return s.done(arguments).fail(arguments), this
                    }, then: function () {
                        var e = arguments;
                        return n.Deferred(function (r) {
                            n.each(t, function (t, o) {
                                var u = n.isFunction(e[t]) && e[t];
                                s[o[1]](function () {
                                    var e = u && u.apply(this, arguments);
                                    e && n.isFunction(e.promise) ? e.promise().done(r.resolve).fail(r.reject).progress(r.notify) : r[o[0] + "With"](this === i ? r.promise() : this, u ? [e] : arguments)
                                })
                            }), e = null
                        }).promise()
                    }, promise: function (e) {
                        return null != e ? n.extend(e, i) : i
                    }
                }, s = {};
            return i.pipe = i.then, n.each(t, function (e, n) {
                var o = n[2], u = n[3];
                i[n[1]] = o.add, u && o.add(function () {
                    r = u
                }, t[1 ^ e][2].disable, t[2][2].lock), s[n[0]] = function () {
                    return s[n[0] + "With"](this === s ? i : this, arguments), this
                }, s[n[0] + "With"] = o.fireWith
            }), i.promise(s), e && e.call(s, s), s
        }, when: function (e) {
            var t = 0, r = d.call(arguments), i = r.length, s = 1 !== i || e && n.isFunction(e.promise) ? i : 0,
                o = 1 === s ? e : n.Deferred(), u = function (e, t, n) {
                    return function (r) {
                        t[e] = this, n[e] = arguments.length > 1 ? d.call(arguments) : r, n === a ? o.notifyWith(t, n) : --s || o.resolveWith(t, n)
                    }
                }, a, f, l;
            if (i > 1)for (a = new Array(i), f = new Array(i), l = new Array(i); i > t; t++)r[t] && n.isFunction(r[t].promise) ? r[t].promise().done(u(t, l, r)).fail(o.reject).progress(u(t, f, a)) : --s;
            return s || o.resolveWith(l, r), o.promise()
        }
    });
    var H;
    n.fn.ready = function (e) {
        return n.ready.promise().done(e), this
    }, n.extend({
        isReady: !1, readyWait: 1, holdReady: function (e) {
            e ? n.readyWait++ : n.ready(!0)
        }, ready: function (e) {
            (e === !0 ? --n.readyWait : n.isReady) || (n.isReady = !0, e !== !0 && --n.readyWait > 0 || (H.resolveWith(l, [n]), n.fn.triggerHandler && (n(l).triggerHandler("ready"), n(l).off("ready"))))
        }
    }), n.ready.promise = function (e) {
        return H || (H = n.Deferred(), "complete" === l.readyState ? setTimeout(n.ready) : (l.addEventListener("DOMContentLoaded", I, !1), a.addEventListener("load", I, !1))), H.promise(e)
    }, n.ready.promise();
    var J = n.access = function (e, t, r, i, s, o, u) {
        var a = 0, f = e.length, l = null == r;
        if ("object" === n.type(r)) {
            s = !0;
            for (a in r)n.access(e, t, a, r[a], !0, o, u)
        } else if (void 0 !== i && (s = !0, n.isFunction(i) || (u = !0), l && (u ? (t.call(e, i), t = null) : (l = t, t = function (e, t, r) {
                return l.call(n(e), r)
            })), t))for (; f > a; a++)t(e[a], r, u ? i : i.call(e[a], a, t(e[a], r)));
        return s ? e : l ? t.call(e) : f ? t(e[0], r) : o
    };
    n.acceptData = function (e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
    }, K.uid = 1, K.accepts = n.acceptData, K.prototype = {
        key: function (e) {
            if (!K.accepts(e))return 0;
            var t = {}, r = e[this.expando];
            if (!r) {
                r = K.uid++;
                try {
                    t[this.expando] = {value: r}, Object.defineProperties(e, t)
                } catch (i) {
                    t[this.expando] = r, n.extend(e, t)
                }
            }
            return this.cache[r] || (this.cache[r] = {}), r
        }, set: function (e, t, r) {
            var i, s = this.key(e), o = this.cache[s];
            if ("string" == typeof t) o[t] = r; else if (n.isEmptyObject(o)) n.extend(this.cache[s], t); else for (i in t)o[i] = t[i];
            return o
        }, get: function (e, t) {
            var n = this.cache[this.key(e)];
            return void 0 === t ? n : n[t]
        }, access: function (e, t, r) {
            var i;
            return void 0 === t || t && "string" == typeof t && void 0 === r ? (i = this.get(e, t), void 0 !== i ? i : this.get(e, n.camelCase(t))) : (this.set(e, t, r), void 0 !== r ? r : t)
        }, remove: function (e, t) {
            var r, i, s, o = this.key(e), u = this.cache[o];
            if (void 0 === t) this.cache[o] = {}; else {
                n.isArray(t) ? i = t.concat(t.map(n.camelCase)) : (s = n.camelCase(t), t in u ? i = [t, s] : (i = s, i = i in u ? [i] : i.match(E) || [])), r = i.length;
                while (r--)delete u[i[r]]
            }
        }, hasData: function (e) {
            return !n.isEmptyObject(this.cache[e[this.expando]] || {})
        }, discard: function (e) {
            e[this.expando] && delete this.cache[e[this.expando]]
        }
    };
    var L = new K, M = new K, N = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, O = /([A-Z])/g;
    n.extend({
        hasData: function (e) {
            return M.hasData(e) || L.hasData(e)
        }, data: function (e, t, n) {
            return M.access(e, t, n)
        }, removeData: function (e, t) {
            M.remove(e, t)
        }, _data: function (e, t, n) {
            return L.access(e, t, n)
        }, _removeData: function (e, t) {
            L.remove(e, t)
        }
    }), n.fn.extend({
        data: function (e, t) {
            var r, i, s, o = this[0], u = o && o.attributes;
            if (void 0 === e) {
                if (this.length && (s = M.get(o), 1 === o.nodeType && !L.get(o, "hasDataAttrs"))) {
                    r = u.length;
                    while (r--)u[r] && (i = u[r].name, 0 === i.indexOf("data-") && (i = n.camelCase(i.slice(5)), P(o, i, s[i])));
                    L.set(o, "hasDataAttrs", !0)
                }
                return s
            }
            return "object" == typeof e ? this.each(function () {
                M.set(this, e)
            }) : J(this, function (t) {
                var r, i = n.camelCase(e);
                if (o && void 0 === t) {
                    if (r = M.get(o, e), void 0 !== r)return r;
                    if (r = M.get(o, i), void 0 !== r)return r;
                    if (r = P(o, i, void 0), void 0 !== r)return r
                } else this.each(function () {
                    var n = M.get(this, i);
                    M.set(this, i, t), -1 !== e.indexOf("-") && void 0 !== n && M.set(this, e, t)
                })
            }, null, t, arguments.length > 1, null, !0)
        }, removeData: function (e) {
            return this.each(function () {
                M.remove(this, e)
            })
        }
    }), n.extend({
        queue: function (e, t, r) {
            var i;
            return e ? (t = (t || "fx") + "queue", i = L.get(e, t), r && (!i || n.isArray(r) ? i = L.access(e, t, n.makeArray(r)) : i.push(r)), i || []) : void 0
        }, dequeue: function (e, t) {
            t = t || "fx";
            var r = n.queue(e, t), i = r.length, s = r.shift(), o = n._queueHooks(e, t), u = function () {
                n.dequeue(e, t)
            };
            "inprogress" === s && (s = r.shift(), i--), s && ("fx" === t && r.unshift("inprogress"), delete o.stop, s.call(e, u, o)), !i && o && o.empty.fire()
        }, _queueHooks: function (e, t) {
            var r = t + "queueHooks";
            return L.get(e, r) || L.access(e, r, {
                    empty: n.Callbacks("once memory").add(function () {
                        L.remove(e, [t + "queue", r])
                    })
                })
        }
    }), n.fn.extend({
        queue: function (e, t) {
            var r = 2;
            return "string" != typeof e && (t = e, e = "fx", r--), arguments.length < r ? n.queue(this[0], e) : void 0 === t ? this : this.each(function () {
                var r = n.queue(this, e, t);
                n._queueHooks(this, e), "fx" === e && "inprogress" !== r[0] && n.dequeue(this, e)
            })
        }, dequeue: function (e) {
            return this.each(function () {
                n.dequeue(this, e)
            })
        }, clearQueue: function (e) {
            return this.queue(e || "fx", [])
        }, promise: function (e, t) {
            var r, i = 1, s = n.Deferred(), o = this, u = this.length, a = function () {
                --i || s.resolveWith(o, [o])
            };
            "string" != typeof e && (t = e, e = void 0), e = e || "fx";
            while (u--)r = L.get(o[u], e + "queueHooks"), r && r.empty && (i++, r.empty.add(a));
            return a(), s.promise(t)
        }
    });
    var Q = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, R = ["Top", "Right", "Bottom", "Left"], S = function (e, t) {
        return e = t || e, "none" === n.css(e, "display") || !n.contains(e.ownerDocument, e)
    }, T = /^(?:checkbox|radio)$/i;
    !function () {
        var e = l.createDocumentFragment(), t = e.appendChild(l.createElement("div")), n = l.createElement("input");
        n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), t.appendChild(n), k.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked, t.innerHTML = "<textarea>x</textarea>", k.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue
    }();
    var U = "undefined";
    k.focusinBubbles = "onfocusin" in a;
    var V = /^key/, W = /^(?:mouse|pointer|contextmenu)|click/, X = /^(?:focusinfocus|focusoutblur)$/,
        Y = /^([^.]*)(?:\.(.+)|)$/;
    n.event = {
        global: {},
        add: function (e, t, r, i, s) {
            var o, u, a, f, l, c, h, p, d, v, m, g = L.get(e);
            if (g) {
                r.handler && (o = r, r = o.handler, s = o.selector), r.guid || (r.guid = n.guid++), (f = g.events) || (f = g.events = {}), (u = g.handle) || (u = g.handle = function (t) {
                    return typeof n !== U && n.event.triggered !== t.type ? n.event.dispatch.apply(e, arguments) : void 0
                }), t = (t || "").match(E) || [""], l = t.length;
                while (l--)a = Y.exec(t[l]) || [], d = m = a[1], v = (a[2] || "").split(".").sort(), d && (h = n.event.special[d] || {}, d = (s ? h.delegateType : h.bindType) || d, h = n.event.special[d] || {}, c = n.extend({
                    type: d,
                    origType: m,
                    data: i,
                    handler: r,
                    guid: r.guid,
                    selector: s,
                    needsContext: s && n.expr.match.needsContext.test(s),
                    namespace: v.join(".")
                }, o), (p = f[d]) || (p = f[d] = [], p.delegateCount = 0, h.setup && h.setup.call(e, i, v, u) !== !1 || e.addEventListener && e.addEventListener(d, u, !1)), h.add && (h.add.call(e, c), c.handler.guid || (c.handler.guid = r.guid)), s ? p.splice(p.delegateCount++, 0, c) : p.push(c), n.event.global[d] = !0)
            }
        },
        remove: function (e, t, r, i, s) {
            var o, u, a, f, l, c, h, p, d, v, m, g = L.hasData(e) && L.get(e);
            if (g && (f = g.events)) {
                t = (t || "").match(E) || [""], l = t.length;
                while (l--)if (a = Y.exec(t[l]) || [], d = m = a[1], v = (a[2] || "").split(".").sort(), d) {
                    h = n.event.special[d] || {}, d = (i ? h.delegateType : h.bindType) || d, p = f[d] || [], a = a[2] && new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)"), u = o = p.length;
                    while (o--)c = p[o], !s && m !== c.origType || r && r.guid !== c.guid || a && !a.test(c.namespace) || i && i !== c.selector && ("**" !== i || !c.selector) || (p.splice(o, 1), c.selector && p.delegateCount--, h.remove && h.remove.call(e, c));
                    u && !p.length && (h.teardown && h.teardown.call(e, v, g.handle) !== !1 || n.removeEvent(e, d, g.handle), delete f[d])
                } else for (d in f)n.event.remove(e, d + t[l], r, i, !0);
                n.isEmptyObject(f) && (delete g.handle, L.remove(e, "events"))
            }
        },
        trigger: function (e, t, r, i) {
            var s, o, u, f, c, h, p, d = [r || l], v = j.call(e, "type") ? e.type : e,
                m = j.call(e, "namespace") ? e.namespace.split(".") : [];
            if (o = u = r = r || l, 3 !== r.nodeType && 8 !== r.nodeType && !X.test(v + n.event.triggered) && (v.indexOf(".") >= 0 && (m = v.split("."), v = m.shift(), m.sort()), c = v.indexOf(":") < 0 && "on" + v, e = e[n.expando] ? e : new n.Event(v, "object" == typeof e && e), e.isTrigger = i ? 2 : 3, e.namespace = m.join("."), e.namespace_re = e.namespace ? new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = r), t = null == t ? [e] : n.makeArray(t, [e]), p = n.event.special[v] || {}, i || !p.trigger || p.trigger.apply(r, t) !== !1)) {
                if (!i && !p.noBubble && !n.isWindow(r)) {
                    for (f = p.delegateType || v, X.test(f + v) || (o = o.parentNode); o; o = o.parentNode)d.push(o), u = o;
                    u === (r.ownerDocument || l) && d.push(u.defaultView || u.parentWindow || a)
                }
                s = 0;
                while ((o = d[s++]) && !e.isPropagationStopped())e.type = s > 1 ? f : p.bindType || v, h = (L.get(o, "events") || {})[e.type] && L.get(o, "handle"), h && h.apply(o, t), h = c && o[c], h && h.apply && n.acceptData(o) && (e.result = h.apply(o, t), e.result === !1 && e.preventDefault());
                return e.type = v, i || e.isDefaultPrevented() || p._default && p._default.apply(d.pop(), t) !== !1 || !n.acceptData(r) || c && n.isFunction(r[v]) && !n.isWindow(r) && (u = r[c], u && (r[c] = null), n.event.triggered = v, r[v](), n.event.triggered = void 0, u && (r[c] = u)), e.result
            }
        },
        dispatch: function (e) {
            e = n.event.fix(e);
            var t, r, i, s, o, u = [], a = d.call(arguments), f = (L.get(this, "events") || {})[e.type] || [],
                l = n.event.special[e.type] || {};
            if (a[0] = e, e.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, e) !== !1) {
                u = n.event.handlers.call(this, e, f), t = 0;
                while ((s = u[t++]) && !e.isPropagationStopped()) {
                    e.currentTarget = s.elem, r = 0;
                    while ((o = s.handlers[r++]) && !e.isImmediatePropagationStopped())(!e.namespace_re || e.namespace_re.test(o.namespace)) && (e.handleObj = o, e.data = o.data, i = ((n.event.special[o.origType] || {}).handle || o.handler).apply(s.elem, a), void 0 !== i && (e.result = i) === !1 && (e.preventDefault(), e.stopPropagation()))
                }
                return l.postDispatch && l.postDispatch.call(this, e), e.result
            }
        },
        handlers: function (e, t) {
            var r, i, s, o, u = [], a = t.delegateCount, f = e.target;
            if (a && f.nodeType && (!e.button || "click" !== e.type))for (; f !== this; f = f.parentNode || this)if (f.disabled !== !0 || "click" !== e.type) {
                for (i = [], r = 0; a > r; r++)o = t[r], s = o.selector + " ", void 0 === i[s] && (i[s] = o.needsContext ? n(s, this).index(f) >= 0 : n.find(s, this, null, [f]).length), i[s] && i.push(o);
                i.length && u.push({elem: f, handlers: i})
            }
            return a < t.length && u.push({elem: this, handlers: t.slice(a)}), u
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "), filter: function (e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (e, t) {
                var n, r, i, s = t.button;
                return null == e.pageX && null != t.clientX && (n = e.target.ownerDocument || l, r = n.documentElement, i = n.body, e.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)), e.which || void 0 === s || (e.which = 1 & s ? 1 : 2 & s ? 3 : 4 & s ? 2 : 0), e
            }
        },
        fix: function (e) {
            if (e[n.expando])return e;
            var t, r, i, s = e.type, o = e, u = this.fixHooks[s];
            u || (this.fixHooks[s] = u = W.test(s) ? this.mouseHooks : V.test(s) ? this.keyHooks : {}), i = u.props ? this.props.concat(u.props) : this.props, e = new n.Event(o), t = i.length;
            while (t--)r = i[t], e[r] = o[r];
            return e.target || (e.target = l), 3 === e.target.nodeType && (e.target = e.target.parentNode), u.filter ? u.filter(e, o) : e
        },
        special: {
            load: {noBubble: !0}, focus: {
                trigger: function () {
                    return this !== _() && this.focus ? (this.focus(), !1) : void 0
                }, delegateType: "focusin"
            }, blur: {
                trigger: function () {
                    return this === _() && this.blur ? (this.blur(), !1) : void 0
                }, delegateType: "focusout"
            }, click: {
                trigger: function () {
                    return "checkbox" === this.type && this.click && n.nodeName(this, "input") ? (this.click(), !1) : void 0
                }, _default: function (e) {
                    return n.nodeName(e.target, "a")
                }
            }, beforeunload: {
                postDispatch: function (e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function (e, t, r, i) {
            var s = n.extend(new n.Event, r, {type: e, isSimulated: !0, originalEvent: {}});
            i ? n.event.trigger(s, null, t) : n.event.dispatch.call(t, s), s.isDefaultPrevented() && r.preventDefault()
        }
    }, n.removeEvent = function (e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    }, n.Event = function (e, t) {
        return this instanceof n.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && e.returnValue === !1 ? Z : $) : this.type = e, t && n.extend(this, t), this.timeStamp = e && e.timeStamp || n.now(), void (this[n.expando] = !0)) : new n.Event(e, t)
    }, n.Event.prototype = {
        isDefaultPrevented: $,
        isPropagationStopped: $,
        isImmediatePropagationStopped: $,
        preventDefault: function () {
            var e = this.originalEvent;
            this.isDefaultPrevented = Z, e && e.preventDefault && e.preventDefault()
        },
        stopPropagation: function () {
            var e = this.originalEvent;
            this.isPropagationStopped = Z, e && e.stopPropagation && e.stopPropagation()
        },
        stopImmediatePropagation: function () {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = Z, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, n.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function (e, t) {
        n.event.special[e] = {
            delegateType: t, bindType: t, handle: function (e) {
                var r, i = this, s = e.relatedTarget, o = e.handleObj;
                return (!s || s !== i && !n.contains(i, s)) && (e.type = o.origType, r = o.handler.apply(this, arguments), e.type = t), r
            }
        }
    }), k.focusinBubbles || n.each({focus: "focusin", blur: "focusout"}, function (e, t) {
        var r = function (e) {
            n.event.simulate(t, e.target, n.event.fix(e), !0)
        };
        n.event.special[t] = {
            setup: function () {
                var n = this.ownerDocument || this, i = L.access(n, t);
                i || n.addEventListener(e, r, !0), L.access(n, t, (i || 0) + 1)
            }, teardown: function () {
                var n = this.ownerDocument || this, i = L.access(n, t) - 1;
                i ? L.access(n, t, i) : (n.removeEventListener(e, r, !0), L.remove(n, t))
            }
        }
    }), n.fn.extend({
        on: function (e, t, r, i, s) {
            var o, u;
            if ("object" == typeof e) {
                "string" != typeof t && (r = r || t, t = void 0);
                for (u in e)this.on(u, t, r, e[u], s);
                return this
            }
            if (null == r && null == i ? (i = t, r = t = void 0) : null == i && ("string" == typeof t ? (i = r, r = void 0) : (i = r, r = t, t = void 0)), i === !1) i = $; else if (!i)return this;
            return 1 === s && (o = i, i = function (e) {
                return n().off(e), o.apply(this, arguments)
            }, i.guid = o.guid || (o.guid = n.guid++)), this.each(function () {
                n.event.add(this, e, i, r, t)
            })
        }, one: function (e, t, n, r) {
            return this.on(e, t, n, r, 1)
        }, off: function (e, t, r) {
            var i, s;
            if (e && e.preventDefault && e.handleObj)return i = e.handleObj, n(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
            if ("object" == typeof e) {
                for (s in e)this.off(s, t, e[s]);
                return this
            }
            return (t === !1 || "function" == typeof t) && (r = t, t = void 0), r === !1 && (r = $), this.each(function () {
                n.event.remove(this, e, r, t)
            })
        }, trigger: function (e, t) {
            return this.each(function () {
                n.event.trigger(e, t, this)
            })
        }, triggerHandler: function (e, t) {
            var r = this[0];
            return r ? n.event.trigger(e, t, r, !0) : void 0
        }
    });
    var aa = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, ba = /<([\w:]+)/,
        ca = /<|&#?\w+;/, da = /<(?:script|style|link)/i, ea = /checked\s*(?:[^=]|=\s*.checked.)/i,
        fa = /^$|\/(?:java|ecma)script/i, ga = /^true\/(.*)/, ha = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, ia = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    ia.optgroup = ia.option, ia.tbody = ia.tfoot = ia.colgroup = ia.caption = ia.thead, ia.th = ia.td, n.extend({
        clone: function (e, t, r) {
            var i, s, o, u, a = e.cloneNode(!0), f = n.contains(e.ownerDocument, e);
            if (!(k.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || n.isXMLDoc(e)))for (u = oa(a), o = oa(e), i = 0, s = o.length; s > i; i++)pa(o[i], u[i]);
            if (t)if (r)for (o = o || oa(e), u = u || oa(a), i = 0, s = o.length; s > i; i++)na(o[i], u[i]); else na(e, a);
            return u = oa(a, "script"), u.length > 0 && ma(u, !f && oa(e, "script")), a
        }, buildFragment: function (e, t, r, i) {
            for (var s, o, u, a, f, l, c = t.createDocumentFragment(), h = [], p = 0,
                     d = e.length; d > p; p++)if (s = e[p], s || 0 === s)if ("object" === n.type(s)) n.merge(h, s.nodeType ? [s] : s); else if (ca.test(s)) {
                o = o || c.appendChild(t.createElement("div")), u = (ba.exec(s) || ["", ""])[1].toLowerCase(), a = ia[u] || ia._default, o.innerHTML = a[1] + s.replace(aa, "<$1></$2>") + a[2], l = a[0];
                while (l--)o = o.lastChild;
                n.merge(h, o.childNodes), o = c.firstChild, o.textContent = ""
            } else h.push(t.createTextNode(s));
            c.textContent = "", p = 0;
            while (s = h[p++])if ((!i || -1 === n.inArray(s, i)) && (f = n.contains(s.ownerDocument, s), o = oa(c.appendChild(s), "script"), f && ma(o), r)) {
                l = 0;
                while (s = o[l++])fa.test(s.type || "") && r.push(s)
            }
            return c
        }, cleanData: function (e) {
            for (var t, r, i, s, o = n.event.special, u = 0; void 0 !== (r = e[u]); u++) {
                if (n.acceptData(r) && (s = r[L.expando], s && (t = L.cache[s]))) {
                    if (t.events)for (i in t.events)o[i] ? n.event.remove(r, i) : n.removeEvent(r, i, t.handle);
                    L.cache[s] && delete L.cache[s]
                }
                delete M.cache[r[M.expando]]
            }
        }
    }), n.fn.extend({
        text: function (e) {
            return J(this, function (e) {
                return void 0 === e ? n.text(this) : this.empty().each(function () {
                    (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = e)
                })
            }, null, e, arguments.length)
        }, append: function () {
            return this.domManip(arguments, function (e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = ja(this, e);
                    t.appendChild(e)
                }
            })
        }, prepend: function () {
            return this.domManip(arguments, function (e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = ja(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        }, before: function () {
            return this.domManip(arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        }, after: function () {
            return this.domManip(arguments, function (e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        }, remove: function (e, t) {
            for (var r, i = e ? n.filter(e, this) : this,
                     s = 0; null != (r = i[s]); s++)t || 1 !== r.nodeType || n.cleanData(oa(r)), r.parentNode && (t && n.contains(r.ownerDocument, r) && ma(oa(r, "script")), r.parentNode.removeChild(r));
            return this
        }, empty: function () {
            for (var e,
                     t = 0; null != (e = this[t]); t++)1 === e.nodeType && (n.cleanData(oa(e, !1)), e.textContent = "");
            return this
        }, clone: function (e, t) {
            return e = null == e ? !1 : e, t = null == t ? e : t, this.map(function () {
                return n.clone(this, e, t)
            })
        }, html: function (e) {
            return J(this, function (e) {
                var t = this[0] || {}, r = 0, i = this.length;
                if (void 0 === e && 1 === t.nodeType)return t.innerHTML;
                if ("string" == typeof e && !da.test(e) && !ia[(ba.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = e.replace(aa, "<$1></$2>");
                    try {
                        for (; i > r; r++)t = this[r] || {}, 1 === t.nodeType && (n.cleanData(oa(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (s) {
                    }
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        }, replaceWith: function () {
            var e = arguments[0];
            return this.domManip(arguments, function (t) {
                e = this.parentNode, n.cleanData(oa(this)), e && e.replaceChild(t, this)
            }), e && (e.length || e.nodeType) ? this : this.remove()
        }, detach: function (e) {
            return this.remove(e, !0)
        }, domManip: function (t, r) {
            t = e.apply([], t);
            var i, s, o, u, a, f, l = 0, c = this.length, h = this, p = c - 1, d = t[0], v = n.isFunction(d);
            if (v || c > 1 && "string" == typeof d && !k.checkClone && ea.test(d))return this.each(function (e) {
                var n = h.eq(e);
                v && (t[0] = d.call(this, e, n.html())), n.domManip(t, r)
            });
            if (c && (i = n.buildFragment(t, this[0].ownerDocument, !1, this), s = i.firstChild, 1 === i.childNodes.length && (i = s), s)) {
                for (o = n.map(oa(i, "script"), ka), u = o.length; c > l; l++)a = i, l !== p && (a = n.clone(a, !0, !0), u && n.merge(o, oa(a, "script"))), r.call(this[l], a, l);
                if (u)for (f = o[o.length - 1].ownerDocument, n.map(o, la), l = 0; u > l; l++)a = o[l], fa.test(a.type || "") && !L.access(a, "globalEval") && n.contains(f, a) && (a.src ? n._evalUrl && n._evalUrl(a.src) : n.globalEval(a.textContent.replace(ha, "")))
            }
            return this
        }
    }), n.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (e, t) {
        n.fn[e] = function (e) {
            for (var r, i = [], s = n(e), o = s.length - 1,
                     u = 0; o >= u; u++)r = u === o ? this : this.clone(!0), n(s[u])[t](r), f.apply(i, r.get());
            return this.pushStack(i)
        }
    });
    var qa, ra = {}, ua = /^margin/, va = new RegExp("^(" + Q + ")(?!px)[a-z%]+$", "i"), wa = function (e) {
        return e.ownerDocument.defaultView.opener ? e.ownerDocument.defaultView.getComputedStyle(e, null) : a.getComputedStyle(e, null)
    };
    !function () {
        var e, t, r = l.documentElement, i = l.createElement("div"), s = l.createElement("div");
        if (s.style) {
            s.style.backgroundClip = "content-box", s.cloneNode(!0).style.backgroundClip = "", k.clearCloneStyle = "content-box" === s.style.backgroundClip, i.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", i.appendChild(s);
            function o() {
                s.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", s.innerHTML = "", r.appendChild(i);
                var n = a.getComputedStyle(s, null);
                e = "1%" !== n.top, t = "4px" === n.width, r.removeChild(i)
            }

            a.getComputedStyle && n.extend(k, {
                pixelPosition: function () {
                    return o(), e
                }, boxSizingReliable: function () {
                    return null == t && o(), t
                }, reliableMarginRight: function () {
                    var e, t = s.appendChild(l.createElement("div"));
                    return t.style.cssText = s.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", t.style.marginRight = t.style.width = "0", s.style.width = "1px", r.appendChild(i), e = !parseFloat(a.getComputedStyle(t, null).marginRight), r.removeChild(i), s.removeChild(t), e
                }
            })
        }
    }(), n.swap = function (e, t, n, r) {
        var i, s, o = {};
        for (s in t)o[s] = e.style[s], e.style[s] = t[s];
        i = n.apply(e, r || []);
        for (s in t)e.style[s] = o[s];
        return i
    };
    var za = /^(none|table(?!-c[ea]).+)/, Aa = new RegExp("^(" + Q + ")(.*)$", "i"),
        Ba = new RegExp("^([+-])=(" + Q + ")", "i"),
        Ca = {position: "absolute", visibility: "hidden", display: "block"},
        Da = {letterSpacing: "0", fontWeight: "400"}, Ea = ["Webkit", "O", "Moz", "ms"];
    n.extend({
        cssHooks: {
            opacity: {
                get: function (e, t) {
                    if (t) {
                        var n = xa(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {"float": "cssFloat"},
        style: function (e, t, r, i) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var s, o, u, a = n.camelCase(t), f = e.style;
                return t = n.cssProps[a] || (n.cssProps[a] = Fa(f, a)), u = n.cssHooks[t] || n.cssHooks[a], void 0 === r ? u && "get" in u && void 0 !== (s = u.get(e, !1, i)) ? s : f[t] : (o = typeof r, "string" === o && (s = Ba.exec(r)) && (r = (s[1] + 1) * s[2] + parseFloat(n.css(e, t)), o = "number"), null != r && r === r && ("number" !== o || n.cssNumber[a] || (r += "px"), k.clearCloneStyle || "" !== r || 0 !== t.indexOf("background") || (f[t] = "inherit"), u && "set" in u && void 0 === (r = u.set(e, r, i)) || (f[t] = r)), void 0)
            }
        },
        css: function (e, t, r, i) {
            var s, o, u, a = n.camelCase(t);
            return t = n.cssProps[a] || (n.cssProps[a] = Fa(e.style, a)), u = n.cssHooks[t] || n.cssHooks[a], u && "get" in u && (s = u.get(e, !0, r)), void 0 === s && (s = xa(e, t, i)), "normal" === s && t in Da && (s = Da[t]), "" === r || r ? (o = parseFloat(s), r === !0 || n.isNumeric(o) ? o || 0 : s) : s
        }
    }), n.each(["height", "width"], function (e, t) {
        n.cssHooks[t] = {
            get: function (e, r, i) {
                return r ? za.test(n.css(e, "display")) && 0 === e.offsetWidth ? n.swap(e, Ca, function () {
                    return Ia(e, t, i)
                }) : Ia(e, t, i) : void 0
            }, set: function (e, r, i) {
                var s = i && wa(e);
                return Ga(e, r, i ? Ha(e, t, i, "border-box" === n.css(e, "boxSizing", !1, s), s) : 0)
            }
        }
    }), n.cssHooks.marginRight = ya(k.reliableMarginRight, function (e, t) {
        return t ? n.swap(e, {display: "inline-block"}, xa, [e, "marginRight"]) : void 0
    }), n.each({margin: "", padding: "", border: "Width"}, function (e, t) {
        n.cssHooks[e + t] = {
            expand: function (n) {
                for (var r = 0, i = {},
                         s = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++)i[e + R[r] + t] = s[r] || s[r - 2] || s[0];
                return i
            }
        }, ua.test(e) || (n.cssHooks[e + t].set = Ga)
    }), n.fn.extend({
        css: function (e, t) {
            return J(this, function (e, t, r) {
                var i, s, o = {}, u = 0;
                if (n.isArray(t)) {
                    for (i = wa(e), s = t.length; s > u; u++)o[t[u]] = n.css(e, t[u], !1, i);
                    return o
                }
                return void 0 !== r ? n.style(e, t, r) : n.css(e, t)
            }, e, t, arguments.length > 1)
        }, show: function () {
            return Ja(this, !0)
        }, hide: function () {
            return Ja(this)
        }, toggle: function (e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function () {
                S(this) ? n(this).show() : n(this).hide()
            })
        }
    }), n.Tween = Ka, Ka.prototype = {
        constructor: Ka, init: function (e, t, r, i, s, o) {
            this.elem = e, this.prop = r, this.easing = s || "swing", this.options = t, this.start = this.now = this.cur(), this.end = i, this.unit = o || (n.cssNumber[r] ? "" : "px")
        }, cur: function () {
            var e = Ka.propHooks[this.prop];
            return e && e.get ? e.get(this) : Ka.propHooks._default.get(this)
        }, run: function (e) {
            var t, r = Ka.propHooks[this.prop];
            return this.options.duration ? this.pos = t = n.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), r && r.set ? r.set(this) : Ka.propHooks._default.set(this), this
        }
    }, Ka.prototype.init.prototype = Ka.prototype, Ka.propHooks = {
        _default: {
            get: function (e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = n.css(e.elem, e.prop, ""), t && "auto" !== t ? t : 0) : e.elem[e.prop]
            }, set: function (e) {
                n.fx.step[e.prop] ? n.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[n.cssProps[e.prop]] || n.cssHooks[e.prop]) ? n.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    }, Ka.propHooks.scrollTop = Ka.propHooks.scrollLeft = {
        set: function (e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, n.easing = {
        linear: function (e) {
            return e
        }, swing: function (e) {
            return .5 - Math.cos(e * Math.PI) / 2
        }
    }, n.fx = Ka.prototype.init, n.fx.step = {};
    var La, Ma, Na = /^(?:toggle|show|hide)$/, Oa = new RegExp("^(?:([+-])=|)(" + Q + ")([a-z%]*)$", "i"),
        Pa = /queueHooks$/, Qa = [Va], Ra = {
            "*": [function (e, t) {
                var r = this.createTween(e, t), i = r.cur(), s = Oa.exec(t), o = s && s[3] || (n.cssNumber[e] ? "" : "px"),
                    u = (n.cssNumber[e] || "px" !== o && +i) && Oa.exec(n.css(r.elem, e)), a = 1, f = 20;
                if (u && u[3] !== o) {
                    o = o || u[3], s = s || [], u = +i || 1;
                    do a = a || ".5", u /= a, n.style(r.elem, e, u + o); while (a !== (a = r.cur() / i) && 1 !== a && --f)
                }
                return s && (u = r.start = +u || +i || 0, r.unit = o, r.end = s[1] ? u + (s[1] + 1) * s[2] : +s[2]), r
            }]
        };
    n.Animation = n.extend(Xa, {
        tweener: function (e, t) {
            n.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            for (var r, i = 0, s = e.length; s > i; i++)r = e[i], Ra[r] = Ra[r] || [], Ra[r].unshift(t)
        }, prefilter: function (e, t) {
            t ? Qa.unshift(e) : Qa.push(e)
        }
    }), n.speed = function (e, t, r) {
        var i = e && "object" == typeof e ? n.extend({}, e) : {
            complete: r || !r && t || n.isFunction(e) && e,
            duration: e,
            easing: r && t || t && !n.isFunction(t) && t
        };
        return i.duration = n.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in n.fx.speeds ? n.fx.speeds[i.duration] : n.fx.speeds._default, (null == i.queue || i.queue === !0) && (i.queue = "fx"), i.old = i.complete, i.complete = function () {
            n.isFunction(i.old) && i.old.call(this), i.queue && n.dequeue(this, i.queue)
        }, i
    }, n.fn.extend({
        fadeTo: function (e, t, n, r) {
            return this.filter(S).css("opacity", 0).show().end().animate({opacity: t}, e, n, r)
        }, animate: function (e, t, r, i) {
            var s = n.isEmptyObject(e), o = n.speed(t, r, i), u = function () {
                var t = Xa(this, n.extend({}, e), o);
                (s || L.get(this, "finish")) && t.stop(!0)
            };
            return u.finish = u, s || o.queue === !1 ? this.each(u) : this.queue(o.queue, u)
        }, stop: function (e, t, r) {
            var i = function (e) {
                var t = e.stop;
                delete e.stop, t(r)
            };
            return "string" != typeof e && (r = t, t = e, e = void 0), t && e !== !1 && this.queue(e || "fx", []), this.each(function () {
                var t = !0, s = null != e && e + "queueHooks", o = n.timers, u = L.get(this);
                if (s) u[s] && u[s].stop && i(u[s]); else for (s in u)u[s] && u[s].stop && Pa.test(s) && i(u[s]);
                for (s = o.length; s--;)o[s].elem !== this || null != e && o[s].queue !== e || (o[s].anim.stop(r), t = !1, o.splice(s, 1));
                (t || !r) && n.dequeue(this, e)
            })
        }, finish: function (e) {
            return e !== !1 && (e = e || "fx"), this.each(function () {
                var t, r = L.get(this), i = r[e + "queue"], s = r[e + "queueHooks"], o = n.timers, u = i ? i.length : 0;
                for (r.finish = !0, n.queue(this, e, []), s && s.stop && s.stop.call(this, !0), t = o.length; t--;)o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                for (t = 0; u > t; t++)i[t] && i[t].finish && i[t].finish.call(this);
                delete r.finish
            })
        }
    }), n.each(["toggle", "show", "hide"], function (e, t) {
        var r = n.fn[t];
        n.fn[t] = function (e, n, i) {
            return null == e || "boolean" == typeof e ? r.apply(this, arguments) : this.animate(Ta(t, !0), e, n, i)
        }
    }), n.each({
        slideDown: Ta("show"),
        slideUp: Ta("hide"),
        slideToggle: Ta("toggle"),
        fadeIn: {opacity: "show"},
        fadeOut: {opacity: "hide"},
        fadeToggle: {opacity: "toggle"}
    }, function (e, t) {
        n.fn[e] = function (e, n, r) {
            return this.animate(t, e, n, r)
        }
    }), n.timers = [], n.fx.tick = function () {
        var e, t = 0, r = n.timers;
        for (La = n.now(); t < r.length; t++)e = r[t], e() || r[t] !== e || r.splice(t--, 1);
        r.length || n.fx.stop(), La = void 0
    }, n.fx.timer = function (e) {
        n.timers.push(e), e() ? n.fx.start() : n.timers.pop()
    }, n.fx.interval = 13, n.fx.start = function () {
        Ma || (Ma = setInterval(n.fx.tick, n.fx.interval))
    }, n.fx.stop = function () {
        clearInterval(Ma), Ma = null
    }, n.fx.speeds = {slow: 600, fast: 200, _default: 400}, n.fn.delay = function (e, t) {
        return e = n.fx ? n.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
            var r = setTimeout(t, e);
            n.stop = function () {
                clearTimeout(r)
            }
        })
    }, function () {
        var e = l.createElement("input"), t = l.createElement("select"), n = t.appendChild(l.createElement("option"));
        e.type = "checkbox", k.checkOn = "" !== e.value, k.optSelected = n.selected, t.disabled = !0, k.optDisabled = !n.disabled, e = l.createElement("input"), e.value = "t", e.type = "radio", k.radioValue = "t" === e.value
    }();
    var Ya, Za, $a = n.expr.attrHandle;
    n.fn.extend({
        attr: function (e, t) {
            return J(this, n.attr, e, t, arguments.length > 1)
        }, removeAttr: function (e) {
            return this.each(function () {
                n.removeAttr(this, e)
            })
        }
    }), n.extend({
        attr: function (e, t, r) {
            var i, s, o = e.nodeType;
            if (e && 3 !== o && 8 !== o && 2 !== o)return typeof e.getAttribute === U ? n.prop(e, t, r) : (1 === o && n.isXMLDoc(e) || (t = t.toLowerCase(), i = n.attrHooks[t] || (n.expr.match.bool.test(t) ? Za : Ya)), void 0 === r ? i && "get" in i && null !== (s = i.get(e, t)) ? s : (s = n.find.attr(e, t), null == s ? void 0 : s) : null !== r ? i && "set" in i && void 0 !== (s = i.set(e, r, t)) ? s : (e.setAttribute(t, r + ""), r) : void n.removeAttr(e, t))
        }, removeAttr: function (e, t) {
            var r, i, s = 0, o = t && t.match(E);
            if (o && 1 === e.nodeType)while (r = o[s++])i = n.propFix[r] || r, n.expr.match.bool.test(r) && (e[i] = !1), e.removeAttribute(r)
        }, attrHooks: {
            type: {
                set: function (e, t) {
                    if (!k.radioValue && "radio" === t && n.nodeName(e, "input")) {
                        var r = e.value;
                        return e.setAttribute("type", t), r && (e.value = r), t
                    }
                }
            }
        }
    }), Za = {
        set: function (e, t, r) {
            return t === !1 ? n.removeAttr(e, r) : e.setAttribute(r, r), r
        }
    }, n.each(n.expr.match.bool.source.match(/\w+/g), function (e, t) {
        var r = $a[t] || n.find.attr;
        $a[t] = function (e, t, n) {
            var i, s;
            return n || (s = $a[t], $a[t] = i, i = null != r(e, t, n) ? t.toLowerCase() : null, $a[t] = s), i
        }
    });
    var _a = /^(?:input|select|textarea|button)$/i;
    n.fn.extend({
        prop: function (e, t) {
            return J(this, n.prop, e, t, arguments.length > 1)
        }, removeProp: function (e) {
            return this.each(function () {
                delete this[n.propFix[e] || e]
            })
        }
    }), n.extend({
        propFix: {"for": "htmlFor", "class": "className"}, prop: function (e, t, r) {
            var i, s, o, u = e.nodeType;
            if (e && 3 !== u && 8 !== u && 2 !== u)return o = 1 !== u || !n.isXMLDoc(e), o && (t = n.propFix[t] || t, s = n.propHooks[t]), void 0 !== r ? s && "set" in s && void 0 !== (i = s.set(e, r, t)) ? i : e[t] = r : s && "get" in s && null !== (i = s.get(e, t)) ? i : e[t]
        }, propHooks: {
            tabIndex: {
                get: function (e) {
                    return e.hasAttribute("tabindex") || _a.test(e.nodeName) || e.href ? e.tabIndex : -1
                }
            }
        }
    }), k.optSelected || (n.propHooks.selected = {
        get: function (e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        }
    }), n.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        n.propFix[this.toLowerCase()] = this
    });
    var ab = /[\t\r\n\f]/g;
    n.fn.extend({
        addClass: function (e) {
            var t, r, i, s, o, u, a = "string" == typeof e && e, f = 0, l = this.length;
            if (n.isFunction(e))return this.each(function (t) {
                n(this).addClass(e.call(this, t, this.className))
            });
            if (a)for (t = (e || "").match(E) || []; l > f; f++)if (r = this[f], i = 1 === r.nodeType && (r.className ? (" " + r.className + " ").replace(ab, " ") : " ")) {
                o = 0;
                while (s = t[o++])i.indexOf(" " + s + " ") < 0 && (i += s + " ");
                u = n.trim(i), r.className !== u && (r.className = u)
            }
            return this
        }, removeClass: function (e) {
            var t, r, i, s, o, u, a = 0 === arguments.length || "string" == typeof e && e, f = 0, l = this.length;
            if (n.isFunction(e))return this.each(function (t) {
                n(this).removeClass(e.call(this, t, this.className))
            });
            if (a)for (t = (e || "").match(E) || []; l > f; f++)if (r = this[f], i = 1 === r.nodeType && (r.className ? (" " + r.className + " ").replace(ab, " ") : "")) {
                o = 0;
                while (s = t[o++])while (i.indexOf(" " + s + " ") >= 0)i = i.replace(" " + s + " ", " ");
                u = e ? n.trim(i) : "", r.className !== u && (r.className = u)
            }
            return this
        }, toggleClass: function (e, t) {
            var r = typeof e;
            return "boolean" == typeof t && "string" === r ? t ? this.addClass(e) : this.removeClass(e) : this.each(n.isFunction(e) ? function (r) {
                n(this).toggleClass(e.call(this, r, this.className, t), t)
            } : function () {
                if ("string" === r) {
                    var t, i = 0, s = n(this), o = e.match(E) || [];
                    while (t = o[i++])s.hasClass(t) ? s.removeClass(t) : s.addClass(t)
                } else(r === U || "boolean" === r) && (this.className && L.set(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : L.get(this, "__className__") || "")
            })
        }, hasClass: function (e) {
            for (var t = " " + e + " ", n = 0,
                     r = this.length; r > n; n++)if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(ab, " ").indexOf(t) >= 0)return !0;
            return !1
        }
    });
    var bb = /\r/g;
    n.fn.extend({
        val: function (e) {
            var t, r, i, s = this[0];
            if (arguments.length)return i = n.isFunction(e), this.each(function (r) {
                var s;
                1 === this.nodeType && (s = i ? e.call(this, r, n(this).val()) : e, null == s ? s = "" : "number" == typeof s ? s += "" : n.isArray(s) && (s = n.map(s, function (e) {
                        return null == e ? "" : e + ""
                    })), t = n.valHooks[this.type] || n.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, s, "value") || (this.value = s))
            });
            if (s)return t = n.valHooks[s.type] || n.valHooks[s.nodeName.toLowerCase()], t && "get" in t && void 0 !== (r = t.get(s, "value")) ? r : (r = s.value, "string" == typeof r ? r.replace(bb, "") : null == r ? "" : r)
        }
    }), n.extend({
        valHooks: {
            option: {
                get: function (e) {
                    var t = n.find.attr(e, "value");
                    return null != t ? t : n.trim(n.text(e))
                }
            }, select: {
                get: function (e) {
                    for (var t, r, i = e.options, s = e.selectedIndex, o = "select-one" === e.type || 0 > s,
                             u = o ? null : [], a = o ? s + 1 : i.length,
                             f = 0 > s ? a : o ? s : 0; a > f; f++)if (r = i[f], !(!r.selected && f !== s || (k.optDisabled ? r.disabled : null !== r.getAttribute("disabled")) || r.parentNode.disabled && n.nodeName(r.parentNode, "optgroup"))) {
                        if (t = n(r).val(), o)return t;
                        u.push(t)
                    }
                    return u
                }, set: function (e, t) {
                    var r, i, s = e.options, o = n.makeArray(t), u = s.length;
                    while (u--)i = s[u], (i.selected = n.inArray(i.value, o) >= 0) && (r = !0);
                    return r || (e.selectedIndex = -1), o
                }
            }
        }
    }), n.each(["radio", "checkbox"], function () {
        n.valHooks[this] = {
            set: function (e, t) {
                return n.isArray(t) ? e.checked = n.inArray(n(e).val(), t) >= 0 : void 0
            }
        }, k.checkOn || (n.valHooks[this].get = function (e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    }), n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
        n.fn[t] = function (e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        }
    }), n.fn.extend({
        hover: function (e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }, bind: function (e, t, n) {
            return this.on(e, null, t, n)
        }, unbind: function (e, t) {
            return this.off(e, null, t)
        }, delegate: function (e, t, n, r) {
            return this.on(t, e, n, r)
        }, undelegate: function (e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    });
    var cb = n.now(), db = /\?/;
    n.parseJSON = function (e) {
        return JSON.parse(e + "")
    }, n.parseXML = function (e) {
        var t, r;
        if (!e || "string" != typeof e)return null;
        try {
            r = new DOMParser, t = r.parseFromString(e, "text/xml")
        } catch (i) {
            t = void 0
        }
        return (!t || t.getElementsByTagName("parsererror").length) && n.error("Invalid XML: " + e), t
    };
    var eb = /#.*$/, fb = /([?&])_=[^&]*/, gb = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        hb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, ib = /^(?:GET|HEAD)$/, jb = /^\/\//,
        kb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, lb = {}, mb = {}, nb = "*/".concat("*"),
        ob = a.location.href, pb = kb.exec(ob.toLowerCase()) || [];
    n.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ob,
            type: "GET",
            isLocal: hb.test(pb[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": nb,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {xml: /xml/, html: /html/, json: /json/},
            responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
            converters: {"* text": String, "text html": !0, "text json": n.parseJSON, "text xml": n.parseXML},
            flatOptions: {url: !0, context: !0}
        },
        ajaxSetup: function (e, t) {
            return t ? sb(sb(e, n.ajaxSettings), t) : sb(n.ajaxSettings, e)
        },
        ajaxPrefilter: qb(lb),
        ajaxTransport: qb(mb),
        ajax: function (e, t) {
            function T(e, t, o, a) {
                var l, g, y, w, E, x = t;
                2 !== b && (b = 2, u && clearTimeout(u), r = void 0, s = a || "", S.readyState = e > 0 ? 4 : 0, l = e >= 200 && 300 > e || 304 === e, o && (w = tb(c, S, o)), w = ub(c, w, S, l), l ? (c.ifModified && (E = S.getResponseHeader("Last-Modified"), E && (n.lastModified[i] = E), E = S.getResponseHeader("etag"), E && (n.etag[i] = E)), 204 === e || "HEAD" === c.type ? x = "nocontent" : 304 === e ? x = "notmodified" : (x = w.state, g = w.data, y = w.error, l = !y)) : (y = x, (e || !x) && (x = "error", 0 > e && (e = 0))), S.status = e, S.statusText = (t || x) + "", l ? d.resolveWith(h, [g, x, S]) : d.rejectWith(h, [S, x, y]), S.statusCode(m), m = void 0, f && p.trigger(l ? "ajaxSuccess" : "ajaxError", [S, c, l ? g : y]), v.fireWith(h, [S, x]), f && (p.trigger("ajaxComplete", [S, c]), --n.active || n.event.trigger("ajaxStop")))
            }

            "object" == typeof e && (t = e, e = void 0), t = t || {};
            var r, i, s, o, u, a, f, l, c = n.ajaxSetup({}, t), h = c.context || c,
                p = c.context && (h.nodeType || h.jquery) ? n(h) : n.event, d = n.Deferred(),
                v = n.Callbacks("once memory"), m = c.statusCode || {}, g = {}, y = {}, b = 0, w = "canceled", S = {
                    readyState: 0, getResponseHeader: function (e) {
                        var t;
                        if (2 === b) {
                            if (!o) {
                                o = {};
                                while (t = gb.exec(s))o[t[1].toLowerCase()] = t[2]
                            }
                            t = o[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    }, getAllResponseHeaders: function () {
                        return 2 === b ? s : null
                    }, setRequestHeader: function (e, t) {
                        var n = e.toLowerCase();
                        return b || (e = y[n] = y[n] || e, g[e] = t), this
                    }, overrideMimeType: function (e) {
                        return b || (c.mimeType = e), this
                    }, statusCode: function (e) {
                        var t;
                        if (e)if (2 > b)for (t in e)m[t] = [m[t], e[t]]; else S.always(e[S.status]);
                        return this
                    }, abort: function (e) {
                        var t = e || w;
                        return r && r.abort(t), T(0, t), this
                    }
                };
            if (d.promise(S).complete = v.add, S.success = S.done, S.error = S.fail, c.url = ((e || c.url || ob) + "").replace(eb, "").replace(jb, pb[1] + "//"), c.type = t.method || t.type || c.method || c.type, c.dataTypes = n.trim(c.dataType || "*").toLowerCase().match(E) || [""], null == c.crossDomain && (a = kb.exec(c.url.toLowerCase()), c.crossDomain = !(!a || a[1] === pb[1] && a[2] === pb[2] && (a[3] || ("http:" === a[1] ? "80" : "443")) === (pb[3] || ("http:" === pb[1] ? "80" : "443")))), c.data && c.processData && "string" != typeof c.data && (c.data = n.param(c.data, c.traditional)), rb(lb, c, t, S), 2 === b)return S;
            f = n.event && c.global, f && 0 === n.active++ && n.event.trigger("ajaxStart"), c.type = c.type.toUpperCase(), c.hasContent = !ib.test(c.type), i = c.url, c.hasContent || (c.data && (i = c.url += (db.test(i) ? "&" : "?") + c.data, delete c.data), c.cache === !1 && (c.url = fb.test(i) ? i.replace(fb, "$1_=" + cb++) : i + (db.test(i) ? "&" : "?") + "_=" + cb++)), c.ifModified && (n.lastModified[i] && S.setRequestHeader("If-Modified-Since", n.lastModified[i]), n.etag[i] && S.setRequestHeader("If-None-Match", n.etag[i])), (c.data && c.hasContent && c.contentType !== !1 || t.contentType) && S.setRequestHeader("Content-Type", c.contentType), S.setRequestHeader("Accept", c.dataTypes[0] && c.accepts[c.dataTypes[0]] ? c.accepts[c.dataTypes[0]] + ("*" !== c.dataTypes[0] ? ", " + nb + "; q=0.01" : "") : c.accepts["*"]);
            for (l in c.headers)S.setRequestHeader(l, c.headers[l]);
            if (!c.beforeSend || c.beforeSend.call(h, S, c) !== !1 && 2 !== b) {
                w = "abort";
                for (l in{success: 1, error: 1, complete: 1})S[l](c[l]);
                if (r = rb(mb, c, t, S)) {
                    S.readyState = 1, f && p.trigger("ajaxSend", [S, c]), c.async && c.timeout > 0 && (u = setTimeout(function () {
                        S.abort("timeout")
                    }, c.timeout));
                    try {
                        b = 1, r.send(g, T)
                    } catch (x) {
                        if (!(2 > b))throw x;
                        T(-1, x)
                    }
                } else T(-1, "No Transport");
                return S
            }
            return S.abort()
        },
        getJSON: function (e, t, r) {
            return n.get(e, t, r, "json")
        },
        getScript: function (e, t) {
            return n.get(e, void 0, t, "script")
        }
    }), n.each(["get", "post"], function (e, t) {
        n[t] = function (e, r, i, s) {
            return n.isFunction(r) && (s = s || i, i = r, r = void 0), n.ajax({
                url: e,
                type: t,
                dataType: s,
                data: r,
                success: i
            })
        }
    }), n._evalUrl = function (e) {
        return n.ajax({url: e, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0})
    }, n.fn.extend({
        wrapAll: function (e) {
            var t;
            return n.isFunction(e) ? this.each(function (t) {
                n(this).wrapAll(e.call(this, t))
            }) : (this[0] && (t = n(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
                var e = this;
                while (e.firstElementChild)e = e.firstElementChild;
                return e
            }).append(this)), this)
        }, wrapInner: function (e) {
            return this.each(n.isFunction(e) ? function (t) {
                n(this).wrapInner(e.call(this, t))
            } : function () {
                var t = n(this), r = t.contents();
                r.length ? r.wrapAll(e) : t.append(e)
            })
        }, wrap: function (e) {
            var t = n.isFunction(e);
            return this.each(function (r) {
                n(this).wrapAll(t ? e.call(this, r) : e)
            })
        }, unwrap: function () {
            return this.parent().each(function () {
                n.nodeName(this, "body") || n(this).replaceWith(this.childNodes)
            }).end()
        }
    }), n.expr.filters.hidden = function (e) {
        return e.offsetWidth <= 0 && e.offsetHeight <= 0
    }, n.expr.filters.visible = function (e) {
        return !n.expr.filters.hidden(e)
    };
    var vb = /%20/g, wb = /\[\]$/, xb = /\r?\n/g, yb = /^(?:submit|button|image|reset|file)$/i,
        zb = /^(?:input|select|textarea|keygen)/i;
    n.param = function (e, t) {
        var r, i = [], s = function (e, t) {
            t = n.isFunction(t) ? t() : null == t ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        };
        if (void 0 === t && (t = n.ajaxSettings && n.ajaxSettings.traditional), n.isArray(e) || e.jquery && !n.isPlainObject(e)) n.each(e, function () {
            s(this.name, this.value)
        }); else for (r in e)Ab(r, e[r], t, s);
        return i.join("&").replace(vb, "+")
    }, n.fn.extend({
        serialize: function () {
            return n.param(this.serializeArray())
        }, serializeArray: function () {
            return this.map(function () {
                var e = n.prop(this, "elements");
                return e ? n.makeArray(e) : this
            }).filter(function () {
                var e = this.type;
                return this.name && !n(this).is(":disabled") && zb.test(this.nodeName) && !yb.test(e) && (this.checked || !T.test(e))
            }).map(function (e, t) {
                var r = n(this).val();
                return null == r ? null : n.isArray(r) ? n.map(r, function (e) {
                    return {name: t.name, value: e.replace(xb, "\r\n")}
                }) : {name: t.name, value: r.replace(xb, "\r\n")}
            }).get()
        }
    }), n.ajaxSettings.xhr = function () {
        try {
            return new XMLHttpRequest
        } catch (e) {
        }
    };
    var Bb = 0, Cb = {}, Db = {0: 200, 1223: 204}, Eb = n.ajaxSettings.xhr();
    a.attachEvent && a.attachEvent("onunload", function () {
        for (var e in Cb)Cb[e]()
    }), k.cors = !!Eb && "withCredentials" in Eb, k.ajax = Eb = !!Eb, n.ajaxTransport(function (e) {
        var t;
        return k.cors || Eb && !e.crossDomain ? {
            send: function (n, r) {
                var i, s = e.xhr(), o = ++Bb;
                if (s.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)for (i in e.xhrFields)s[i] = e.xhrFields[i];
                e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                for (i in n)s.setRequestHeader(i, n[i]);
                t = function (e) {
                    return function () {
                        t && (delete Cb[o], t = s.onload = s.onerror = null, "abort" === e ? s.abort() : "error" === e ? r(s.status, s.statusText) : r(Db[s.status] || s.status, s.statusText, "string" == typeof s.responseText ? {text: s.responseText} : void 0, s.getAllResponseHeaders()))
                    }
                }, s.onload = t(), s.onerror = t("error"), t = Cb[o] = t("abort");
                try {
                    //s.send(e.hasContent && e.data || null)
                } catch (u) {
                    if (t)throw u
                }
            }, abort: function () {
                t && t()
            }
        } : void 0
    }), n.ajaxSetup({
        accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
        contents: {script: /(?:java|ecma)script/},
        converters: {
            "text script": function (e) {
                return n.globalEval(e), e
            }
        }
    }), n.ajaxPrefilter("script", function (e) {
        void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), n.ajaxTransport("script", function (e) {
        if (e.crossDomain) {
            var t, r;
            return {
                send: function (i, s) {
                    t = n("<script>").prop({
                        async: !0,
                        charset: e.scriptCharset,
                        src: e.url
                    }).on("load error", r = function (e) {
                        t.remove(), r = null, e && s("error" === e.type ? 404 : 200, e.type)
                    }), l.head.appendChild(t[0])
                }, abort: function () {
                    r && r()
                }
            }
        }
    });
    var Fb = [], Gb = /(=)\?(?=&|$)|\?\?/;
    n.ajaxSetup({
        jsonp: "callback", jsonpCallback: function () {
            var e = Fb.pop() || n.expando + "_" + cb++;
            return this[e] = !0, e
        }
    }), n.ajaxPrefilter("json jsonp", function (e, t, r) {
        var i, s, o,
            u = e.jsonp !== !1 && (Gb.test(e.url) ? "url" : "string" == typeof e.data && !(e.contentType || "").indexOf("application/x-www-form-urlencoded") && Gb.test(e.data) && "data");
        return u || "jsonp" === e.dataTypes[0] ? (i = e.jsonpCallback = n.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, u ? e[u] = e[u].replace(Gb, "$1" + i) : e.jsonp !== !1 && (e.url += (db.test(e.url) ? "&" : "?") + e.jsonp + "=" + i), e.converters["script json"] = function () {
            return o || n.error(i + " was not called"), o[0]
        }, e.dataTypes[0] = "json", s = a[i], a[i] = function () {
            o = arguments
        }, r.always(function () {
            a[i] = s, e[i] && (e.jsonpCallback = t.jsonpCallback, Fb.push(i)), o && n.isFunction(s) && s(o[0]), o = s = void 0
        }), "script") : void 0
    }), n.parseHTML = function (e, t, r) {
        if (!e || "string" != typeof e)return null;
        "boolean" == typeof t && (r = t, t = !1), t = t || l;
        var i = v.exec(e), s = !r && [];
        return i ? [t.createElement(i[1])] : (i = n.buildFragment([e], t, s), s && s.length && n(s).remove(), n.merge([], i.childNodes))
    };
    var Hb = n.fn.load;
    n.fn.load = function (e, t, r) {
        if ("string" != typeof e && Hb)return Hb.apply(this, arguments);
        var i, s, o, u = this, a = e.indexOf(" ");
        return a >= 0 && (i = n.trim(e.slice(a)), e = e.slice(0, a)), n.isFunction(t) ? (r = t, t = void 0) : t && "object" == typeof t && (s = "POST"), u.length > 0 && n.ajax({
            url: e,
            type: s,
            dataType: "html",
            data: t
        }).done(function (e) {
            o = arguments, u.html(i ? n("<div>").append(n.parseHTML(e)).find(i) : e)
        }).complete(r && function (e, t) {
                u.each(r, o || [e.responseText, t, e])
            }), this
    }, n.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
        n.fn[t] = function (e) {
            return this.on(t, e)
        }
    }), n.expr.filters.animated = function (e) {
        return n.grep(n.timers, function (t) {
            return e === t.elem
        }).length
    };
    var Ib = a.document.documentElement;
    n.offset = {
        setOffset: function (e, t, r) {
            var i, s, o, u, a, f, l, c = n.css(e, "position"), h = n(e), p = {};
            "static" === c && (e.style.position = "relative"), a = h.offset(), o = n.css(e, "top"), f = n.css(e, "left"), l = ("absolute" === c || "fixed" === c) && (o + f).indexOf("auto") > -1, l ? (i = h.position(), u = i.top, s = i.left) : (u = parseFloat(o) || 0, s = parseFloat(f) || 0), n.isFunction(t) && (t = t.call(e, r, a)), null != t.top && (p.top = t.top - a.top + u), null != t.left && (p.left = t.left - a.left + s), "using" in t ? t.using.call(e, p) : h.css(p)
        }
    }, n.fn.extend({
        offset: function (e) {
            if (arguments.length)return void 0 === e ? this : this.each(function (t) {
                n.offset.setOffset(this, e, t)
            });
            var t, r, i = this[0], s = {top: 0, left: 0}, o = i && i.ownerDocument;
            if (o)return t = o.documentElement, n.contains(t, i) ? (typeof i.getBoundingClientRect !== U && (s = i.getBoundingClientRect()), r = Jb(o), {
                top: s.top + r.pageYOffset - t.clientTop,
                left: s.left + r.pageXOffset - t.clientLeft
            }) : s
        }, position: function () {
            if (this[0]) {
                var e, t, r = this[0], i = {top: 0, left: 0};
                return "fixed" === n.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), n.nodeName(e[0], "html") || (i = e.offset()), i.top += n.css(e[0], "borderTopWidth", !0), i.left += n.css(e[0], "borderLeftWidth", !0)), {
                    top: t.top - i.top - n.css(r, "marginTop", !0),
                    left: t.left - i.left - n.css(r, "marginLeft", !0)
                }
            }
        }, offsetParent: function () {
            return this.map(function () {
                var e = this.offsetParent || Ib;
                while (e && !n.nodeName(e, "html") && "static" === n.css(e, "position"))e = e.offsetParent;
                return e || Ib
            })
        }
    }), n.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (e, t) {
        var r = "pageYOffset" === t;
        n.fn[e] = function (n) {
            return J(this, function (e, n, i) {
                var s = Jb(e);
                return void 0 === i ? s ? s[t] : e[n] : void (s ? s.scrollTo(r ? a.pageXOffset : i, r ? i : a.pageYOffset) : e[n] = i)
            }, e, n, arguments.length, null)
        }
    }), n.each(["top", "left"], function (e, t) {
        n.cssHooks[t] = ya(k.pixelPosition, function (e, r) {
            return r ? (r = xa(e, t), va.test(r) ? n(e).position()[t] + "px" : r) : void 0
        })
    }), n.each({Height: "height", Width: "width"}, function (e, t) {
        n.each({padding: "inner" + e, content: t, "": "outer" + e}, function (r, i) {
            n.fn[i] = function (i, s) {
                var o = arguments.length && (r || "boolean" != typeof i),
                    u = r || (i === !0 || s === !0 ? "margin" : "border");
                return J(this, function (t, r, i) {
                    var s;
                    return n.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (s = t.documentElement, Math.max(t.body["scroll" + e], s["scroll" + e], t.body["offset" + e], s["offset" + e], s["client" + e])) : void 0 === i ? n.css(t, r, u) : n.style(t, r, i, u)
                }, t, o ? i : void 0, o, null)
            }
        })
    }), n.fn.size = function () {
        return this.length
    }, n.fn.andSelf = n.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
        return n
    });
    var Kb = a.jQuery, Lb = a.$;
    return n.noConflict = function (e) {
        return a.$ === n && (a.$ = Lb), e && a.jQuery === n && (a.jQuery = Kb), n
    }, typeof b === U && (a.jQuery = a.$ = n), n
}), function () {
    function e(e, t, n) {
        n = (n || 0) - 1;
        for (var r = e ? e.length : 0; ++n < r;)if (e[n] === t)return n;
        return -1
    }

    function t(t, n) {
        var r = typeof n;
        if (t = t.l, "boolean" == r || null == n)return t[n] ? 0 : -1;
        "number" != r && "string" != r && (r = "object");
        var i = "number" == r ? n : g + n;
        return t = (t = t[r]) && t[i], "object" == r ? t && -1 < e(t, n) ? 0 : -1 : t ? 0 : -1
    }

    function n(e) {
        var t = this.l, n = typeof e;
        if ("boolean" == n || null == e) t[e] = !0; else {
            "number" != n && "string" != n && (n = "object");
            var r = "number" == n ? e : g + e, t = t[n] || (t[n] = {});
            "object" == n ? (t[r] || (t[r] = [])).push(e) : t[r] = !0
        }
    }

    function r(e) {
        return e.charCodeAt(0)
    }

    function i(e, t) {
        for (var n = e.m, r = t.m, i = -1, s = n.length; ++i < s;) {
            var o = n[i], u = r[i];
            if (o !== u) {
                if (o > u || typeof o == "undefined")return 1;
                if (o < u || typeof u == "undefined")return -1
            }
        }
        return e.n - t.n
    }

    function s(e) {
        var t = -1, r = e.length, i = e[0], s = e[r / 2 | 0], o = e[r - 1];
        if (i && typeof i == "object" && s && typeof s == "object" && o && typeof o == "object")return !1;
        for (i = a(), i["false"] = i["null"] = i["true"] = i.undefined = !1, s = a(), s.k = e, s.l = i, s.push = n; ++t < r;)s.push(e[t]);
        return s
    }

    function o(e) {
        return "\\" + V[e]
    }

    function u() {
        return d.pop() || []
    }

    function a() {
        return v.pop() || {
                k: null,
                l: null,
                m: null,
                "false": !1,
                n: 0,
                "null": !1,
                number: null,
                object: null,
                push: null,
                string: null,
                "true": !1,
                "undefined": !1,
                o: null
            }
    }

    function f(e) {
        e.length = 0, d.length < b && d.push(e)
    }

    function l(e) {
        var t = e.l;
        t && l(t), e.k = e.l = e.m = e.object = e.number = e.string = e.o = null, v.length < b && v.push(e)
    }

    function c(e, t, n) {
        t || (t = 0), typeof n == "undefined" && (n = e ? e.length : 0);
        var r = -1;
        n = n - t || 0;
        for (var i = Array(0 > n ? 0 : n); ++r < n;)i[r] = e[t + r];
        return i
    }

    function h(n) {
        function d(e, t, n) {
            if (!e || !X[typeof e])return e;
            t = t && typeof n == "undefined" ? t : tt(t, n, 3);
            for (var r = -1, i = X[typeof e] && jn(e),
                     s = i ? i.length : 0; ++r < s && (n = i[r], !1 !== t(e[n], n, e)););
            return e
        }

        function v(e, t, n) {
            var r;
            if (!e || !X[typeof e])return e;
            t = t && typeof n == "undefined" ? t : tt(t, n, 3);
            for (r in e)if (!1 === t(e[r], r, e))break;
            return e
        }

        function b(e, t, n) {
            var r, i = e, s = i;
            if (!i)return s;
            for (var o = arguments, u = 0,
                     a = typeof n == "number" ? 2 : o.length; ++u < a;)if ((i = o[u]) && X[typeof i])for (var f = -1,
                                                                                                              l = X[typeof i] && jn(i),
                                                                                                              c = l ? l.length : 0; ++f < c;)r = l[f], "undefined" == typeof s[r] && (s[r] = i[r]);
            return s
        }

        function V(e, t, n) {
            var r, i = e, s = i;
            if (!i)return s;
            var o = arguments, u = 0, a = typeof n == "number" ? 2 : o.length;
            if (3 < a && "function" == typeof o[a - 2])var f = tt(o[--a - 1], o[a--], 2); else 2 < a && "function" == typeof o[a - 1] && (f = o[--a]);
            for (; ++u < a;)if ((i = o[u]) && X[typeof i])for (var l = -1, c = X[typeof i] && jn(i),
                                                                   h = c ? c.length : 0; ++l < h;)r = c[l], s[r] = f ? f(s[r], i[r]) : i[r];
            return s
        }

        function J(e) {
            var t, n = [];
            if (!e || !X[typeof e])return n;
            for (t in e)yn.call(e, t) && n.push(t);
            return n
        }

        function K(e) {
            return e && typeof e == "object" && !Bn(e) && yn.call(e, "__wrapped__") ? e : new Q(e)
        }

        function Q(e, t) {
            this.__chain__ = !!t, this.__wrapped__ = e
        }

        function G(e) {
            function t() {
                if (r) {
                    var e = c(r);
                    bn.apply(e, arguments)
                }
                if (this instanceof t) {
                    var s = et(n.prototype), e = n.apply(s, e || arguments);
                    return Et(e) ? e : s
                }
                return n.apply(i, e || arguments)
            }

            var n = e[0], r = e[2], i = e[4];
            return Hn(t, e), t
        }

        function Z(e, t, n, r, i) {
            if (n) {
                var s = n(e);
                if (typeof s != "undefined")return s
            }
            if (!Et(e))return e;
            var o = cn.call(e);
            if (!U[o])return e;
            var a = Dn[o];
            switch (o) {
                case H:
                case B:
                    return new a(+e);
                case F:
                case R:
                    return new a(e);
                case q:
                    return s = a(e.source, N.exec(e)), s.lastIndex = e.lastIndex, s
            }
            if (o = Bn(e), t) {
                var l = !r;
                r || (r = u()), i || (i = u());
                for (var h = r.length; h--;)if (r[h] == e)return i[h];
                s = o ? a(e.length) : {}
            } else s = o ? c(e) : V({}, e);
            return o && (yn.call(e, "index") && (s.index = e.index), yn.call(e, "input") && (s.input = e.input)), t ? (r.push(e), i.push(s), (o ? At : d)(e, function (e, o) {
                s[o] = Z(e, t, n, r, i)
            }), l && (f(r), f(i)), s) : s
        }

        function et(e) {
            return Et(e) ? Tn(e) : {}
        }

        function tt(e, t, n) {
            if (typeof e != "function")return Vt;
            if (typeof t != "undefined" && "prototype" in e) {
                var r = e.__bindData__;
                if (typeof r == "undefined" && (Pn.funcNames && (r = !e.name), r = r || !Pn.funcDecomp, !r)) {
                    var i = mn.call(e);
                    Pn.funcNames || (r = !C.test(i)), r || (r = O.test(i), Hn(e, r))
                }
                if (!1 === r || !0 !== r && 1 & r[1])return e;
                switch (n) {
                    case 1:
                        return function (n) {
                            return e.call(t, n)
                        };
                    case 2:
                        return function (n, r) {
                            return e.call(t, n, r)
                        };
                    case 3:
                        return function (n, r, i) {
                            return e.call(t, n, r, i)
                        };
                    case 4:
                        return function (n, r, i, s) {
                            return e.call(t, n, r, i, s)
                        }
                }
                return Wt(e, t)
            }
            return e
        }

        function nt(e) {
            function t() {
                var e = a ? o : this;
                if (i) {
                    var d = c(i);
                    bn.apply(d, arguments)
                }
                return (s || l) && (d || (d = c(arguments)), s && bn.apply(d, s), l && d.length < u) ? (r |= 16, nt([n, h ? r : -4 & r, d, null, o, u])) : (d || (d = arguments), f && (n = e[p]), this instanceof t ? (e = et(n.prototype), d = n.apply(e, d), Et(d) ? d : e) : n.apply(e, d))
            }

            var n = e[0], r = e[1], i = e[2], s = e[3], o = e[4], u = e[5], a = 1 & r, f = 2 & r, l = 4 & r, h = 8 & r,
                p = n;
            return Hn(t, e), t
        }

        function rt(n, r) {
            var i = -1, o = ht(), u = n ? n.length : 0, a = u >= y && o === e, f = [];
            if (a) {
                var c = s(r);
                c ? (o = t, r = c) : a = !1
            }
            for (; ++i < u;)c = n[i], 0 > o(r, c) && f.push(c);
            return a && l(r), f
        }

        function it(e, t, n, r) {
            r = (r || 0) - 1;
            for (var i = e ? e.length : 0, s = []; ++r < i;) {
                var o = e[r];
                if (o && typeof o == "object" && typeof o.length == "number" && (Bn(o) || mt(o))) {
                    t || (o = it(o, t, n));
                    var u = -1, a = o.length, f = s.length;
                    for (s.length += a; ++u < a;)s[f++] = o[u]
                } else n || s.push(o)
            }
            return s
        }

        function st(e, t, n, r, i, s) {
            if (n) {
                var o = n(e, t);
                if (typeof o != "undefined")return !!o
            }
            if (e === t)return 0 !== e || 1 / e == 1 / t;
            if (e === e && !(e && X[typeof e] || t && X[typeof t]))return !1;
            if (null == e || null == t)return e === t;
            var a = cn.call(e), l = cn.call(t);
            if (a == D && (a = I), l == D && (l = I), a != l)return !1;
            switch (a) {
                case H:
                case B:
                    return +e == +t;
                case F:
                    return e != +e ? t != +t : 0 == e ? 1 / e == 1 / t : e == +t;
                case q:
                case R:
                    return e == on(t)
            }
            if (l = a == P, !l) {
                var c = yn.call(e, "__wrapped__"), h = yn.call(t, "__wrapped__");
                if (c || h)return st(c ? e.__wrapped__ : e, h ? t.__wrapped__ : t, n, r, i, s);
                if (a != I)return !1;
                if (a = e.constructor, c = t.constructor, a != c && !(wt(a) && a instanceof a && wt(c) && c instanceof c) && "constructor" in e && "constructor" in t)return !1
            }
            for (a = !i, i || (i = u()), s || (s = u()), c = i.length; c--;)if (i[c] == e)return s[c] == t;
            var p = 0, o = !0;
            if (i.push(e), s.push(t), l) {
                if (c = e.length, p = t.length, (o = p == c) || r)for (; p--;)if (l = c, h = t[p], r)for (; l-- && !(o = st(e[l], h, n, r, i, s));); else if (!(o = st(e[p], h, n, r, i, s)))break
            } else v(t, function (t, u, a) {
                return yn.call(a, u) ? (p++, o = yn.call(e, u) && st(e[u], t, n, r, i, s)) : void 0
            }), o && !r && v(e, function (e, t, n) {
                return yn.call(n, t) ? o = -1 < --p : void 0
            });
            return i.pop(), s.pop(), a && (f(i), f(s)), o
        }

        function ot(e, t, n, r, i) {
            (Bn(t) ? At : d)(t, function (t, s) {
                var o, u, a = t, f = e[s];
                if (t && ((u = Bn(t)) || Un(t))) {
                    for (a = r.length; a--;)if (o = r[a] == t) {
                        f = i[a];
                        break
                    }
                    if (!o) {
                        var l;
                        n && (a = n(f, t), l = typeof a != "undefined") && (f = a), l || (f = u ? Bn(f) ? f : [] : Un(f) ? f : {}), r.push(t), i.push(f), l || ot(f, t, n, r, i)
                    }
                } else n && (a = n(f, t), typeof a == "undefined" && (a = t)), typeof a != "undefined" && (f = a);
                e[s] = f
            })
        }

        function ut(e, t) {
            return e + vn(_n() * (t - e + 1))
        }

        function at(n, r, i) {
            var o = -1, a = ht(), c = n ? n.length : 0, h = [], p = !r && c >= y && a === e, d = i || p ? u() : h;
            for (p && (d = s(d), a = t); ++o < c;) {
                var v = n[o], m = i ? i(v, o, n) : v;
                (r ? !o || d[d.length - 1] !== m : 0 > a(d, m)) && ((i || p) && d.push(m), h.push(v))
            }
            return p ? (f(d.k), l(d)) : i && f(d), h
        }

        function ft(e) {
            return function (t, n, r) {
                var i = {};
                n = K.createCallback(n, r, 3), r = -1;
                var s = t ? t.length : 0;
                if (typeof s == "number")for (; ++r < s;) {
                    var o = t[r];
                    e(i, o, n(o, r, t), t)
                } else d(t, function (t, r, s) {
                    e(i, t, n(t, r, s), s)
                });
                return i
            }
        }

        function lt(e, t, n, r, i, s) {
            var o = 1 & t, u = 4 & t, a = 16 & t, f = 32 & t;
            if (!(2 & t || wt(e)))throw new un;
            a && !n.length && (t &= -17, a = n = !1), f && !r.length && (t &= -33, f = r = !1);
            var l = e && e.__bindData__;
            return l && !0 !== l ? (l = c(l), l[2] && (l[2] = c(l[2])), l[3] && (l[3] = c(l[3])), !o || 1 & l[1] || (l[4] = i), !o && 1 & l[1] && (t |= 8), !u || 4 & l[1] || (l[5] = s), a && bn.apply(l[2] || (l[2] = []), n), f && Sn.apply(l[3] || (l[3] = []), r), l[1] |= t, lt.apply(null, l)) : (1 == t || 17 === t ? G : nt)([e, t, n, r, i, s])
        }

        function ct(e) {
            return Fn[e]
        }

        function ht() {
            var t = (t = K.indexOf) === Ft ? e : t;
            return t
        }

        function pt(e) {
            return typeof e == "function" && hn.test(e)
        }

        function dt(e) {
            var t, n;
            return e && cn.call(e) == I && (t = e.constructor, !wt(t) || t instanceof t) ? (v(e, function (e, t) {
                n = t
            }), typeof n == "undefined" || yn.call(e, n)) : !1
        }

        function vt(e) {
            return In[e]
        }

        function mt(e) {
            return e && typeof e == "object" && typeof e.length == "number" && cn.call(e) == D || !1
        }

        function gt(e, t, n) {
            var r = jn(e), i = r.length;
            for (t = tt(t, n, 3); i-- && (n = r[i], !1 !== t(e[n], n, e)););
            return e
        }

        function yt(e) {
            var t = [];
            return v(e, function (e, n) {
                wt(e) && t.push(n)
            }), t.sort()
        }

        function bt(e) {
            for (var t = -1, n = jn(e), r = n.length, i = {}; ++t < r;) {
                var s = n[t];
                i[e[s]] = s
            }
            return i
        }

        function wt(e) {
            return typeof e == "function"
        }

        function Et(e) {
            return !!e && !!X[typeof e]
        }

        function St(e) {
            return typeof e == "number" || e && typeof e == "object" && cn.call(e) == F || !1
        }

        function xt(e) {
            return typeof e == "string" || e && typeof e == "object" && cn.call(e) == R || !1
        }

        function Tt(e) {
            for (var t = -1, n = jn(e), r = n.length, i = Gt(r); ++t < r;)i[t] = e[n[t]];
            return i
        }

        function Nt(e, t, n) {
            var r = -1, i = ht(), s = e ? e.length : 0, o = !1;
            return n = (0 > n ? An(0, s + n) : n) || 0, Bn(e) ? o = -1 < i(e, t, n) : typeof s == "number" ? o = -1 < (xt(e) ? e.indexOf(t, n) : i(e, t, n)) : d(e, function (e) {
                return ++r < n ? void 0 : !(o = e === t)
            }), o
        }

        function Ct(e, t, n) {
            var r = !0;
            t = K.createCallback(t, n, 3), n = -1;
            var i = e ? e.length : 0;
            if (typeof i == "number")for (; ++n < i && (r = !!t(e[n], n, e));); else d(e, function (e, n, i) {
                return r = !!t(e, n, i)
            });
            return r
        }

        function kt(e, t, n) {
            var r = [];
            t = K.createCallback(t, n, 3), n = -1;
            var i = e ? e.length : 0;
            if (typeof i == "number")for (; ++n < i;) {
                var s = e[n];
                t(s, n, e) && r.push(s)
            } else d(e, function (e, n, i) {
                t(e, n, i) && r.push(e)
            });
            return r
        }

        function Lt(e, t, n) {
            t = K.createCallback(t, n, 3), n = -1;
            var r = e ? e.length : 0;
            if (typeof r != "number") {
                var i;
                return d(e, function (e, n, r) {
                    return t(e, n, r) ? (i = e, !1) : void 0
                }), i
            }
            for (; ++n < r;) {
                var s = e[n];
                if (t(s, n, e))return s
            }
        }

        function At(e, t, n) {
            var r = -1, i = e ? e.length : 0;
            if (t = t && typeof n == "undefined" ? t : tt(t, n, 3), typeof i == "number")for (; ++r < i && !1 !== t(e[r], r, e);); else d(e, t);
            return e
        }

        function Ot(e, t, n) {
            var r = e ? e.length : 0;
            if (t = t && typeof n == "undefined" ? t : tt(t, n, 3), typeof r == "number")for (; r-- && !1 !== t(e[r], r, e);); else {
                var i = jn(e), r = i.length;
                d(e, function (e, n, s) {
                    return n = i ? i[--r] : --r, t(s[n], n, s)
                })
            }
            return e
        }

        function Mt(e, t, n) {
            var r = -1, i = e ? e.length : 0;
            if (t = K.createCallback(t, n, 3), typeof i == "number")for (var s = Gt(i); ++r < i;)s[r] = t(e[r], r, e); else s = [], d(e, function (e, n, i) {
                s[++r] = t(e, n, i)
            });
            return s
        }

        function _t(e, t, n) {
            var i = -1 / 0, s = i;
            if (typeof t != "function" && n && n[t] === e && (t = null), null == t && Bn(e)) {
                n = -1;
                for (var o = e.length; ++n < o;) {
                    var u = e[n];
                    u > s && (s = u)
                }
            } else t = null == t && xt(e) ? r : K.createCallback(t, n, 3), At(e, function (e, n, r) {
                n = t(e, n, r), n > i && (i = n, s = e)
            });
            return s
        }

        function Dt(e, t, n, r) {
            if (!e)return n;
            var i = 3 > arguments.length;
            t = K.createCallback(t, r, 4);
            var s = -1, o = e.length;
            if (typeof o == "number")for (i && (n = e[++s]); ++s < o;)n = t(n, e[s], s, e); else d(e, function (e, r, s) {
                n = i ? (i = !1, e) : t(n, e, r, s)
            });
            return n
        }

        function Pt(e, t, n, r) {
            var i = 3 > arguments.length;
            return t = K.createCallback(t, r, 4), Ot(e, function (e, r, s) {
                n = i ? (i = !1, e) : t(n, e, r, s)
            }), n
        }

        function Ht(e) {
            var t = -1, n = e ? e.length : 0, r = Gt(typeof n == "number" ? n : 0);
            return At(e, function (e) {
                var n = ut(0, ++t);
                r[t] = r[n], r[n] = e
            }), r
        }

        function Bt(e, t, n) {
            var r;
            t = K.createCallback(t, n, 3), n = -1;
            var i = e ? e.length : 0;
            if (typeof i == "number")for (; ++n < i && !(r = t(e[n], n, e));); else d(e, function (e, n, i) {
                return !(r = t(e, n, i))
            });
            return !!r
        }

        function jt(e, t, n) {
            var r = 0, i = e ? e.length : 0;
            if (typeof t != "number" && null != t) {
                var s = -1;
                for (t = K.createCallback(t, n, 3); ++s < i && t(e[s], s, e);)r++
            } else if (r = t, null == r || n)return e ? e[0] : p;
            return c(e, 0, On(An(0, r), i))
        }

        function Ft(t, n, r) {
            if (typeof r == "number") {
                var i = t ? t.length : 0;
                r = 0 > r ? An(0, i + r) : r || 0
            } else if (r)return r = qt(t, n), t[r] === n ? r : -1;
            return e(t, n, r)
        }

        function It(e, t, n) {
            if (typeof t != "number" && null != t) {
                var r = 0, i = -1, s = e ? e.length : 0;
                for (t = K.createCallback(t, n, 3); ++i < s && t(e[i], i, e);)r++
            } else r = null == t || n ? 1 : An(0, t);
            return c(e, r)
        }

        function qt(e, t, n, r) {
            var i = 0, s = e ? e.length : i;
            for (n = n ? K.createCallback(n, r, 1) : Vt, t = n(t); i < s;)r = i + s >>> 1, n(e[r]) < t ? i = r + 1 : s = r;
            return i
        }

        function Rt(e, t, n, r) {
            return typeof t != "boolean" && null != t && (r = n, n = typeof t != "function" && r && r[t] === e ? null : t, t = !1), null != n && (n = K.createCallback(n, r, 3)), at(e, t, n)
        }

        function Ut() {
            for (var e = 1 < arguments.length ? arguments : arguments[0], t = -1, n = e ? _t(Vn(e, "length")) : 0,
                     r = Gt(0 > n ? 0 : n); ++t < n;)r[t] = Vn(e, t);
            return r
        }

        function zt(e, t) {
            var n = -1, r = e ? e.length : 0, i = {};
            for (t || !r || Bn(e[0]) || (t = []); ++n < r;) {
                var s = e[n];
                t ? i[s] = t[n] : s && (i[s[0]] = s[1])
            }
            return i
        }

        function Wt(e, t) {
            return 2 < arguments.length ? lt(e, 17, c(arguments, 2), null, t) : lt(e, 1, null, null, t)
        }

        function Xt(e, t, n) {
            function r() {
                l && dn(l), o = l = c = p, (v || d !== t) && (h = $n(), u = e.apply(f, s), l || o || (s = f = null))
            }

            function i() {
                var n = t - ($n() - a);
                0 < n ? l = wn(i, n) : (o && dn(o), n = c, o = l = c = p, n && (h = $n(), u = e.apply(f, s), l || o || (s = f = null)))
            }

            var s, o, u, a, f, l, c, h = 0, d = !1, v = !0;
            if (!wt(e))throw new un;
            if (t = An(0, t) || 0, !0 === n)var m = !0,
                v = !1; else Et(n) && (m = n.leading, d = "maxWait" in n && (An(t, n.maxWait) || 0), v = "trailing" in n ? n.trailing : v);
            return function () {
                if (s = arguments, a = $n(), f = this, c = v && (l || !m), !1 === d)var n = m && !l; else {
                    o || m || (h = a);
                    var p = d - (a - h), g = 0 >= p;
                    g ? (o && (o = dn(o)), h = a, u = e.apply(f, s)) : o || (o = wn(r, p))
                }
                return g && l ? l = dn(l) : l || t === d || (l = wn(i, t)), n && (g = !0, u = e.apply(f, s)), !g || l || o || (s = f = null), u
            }
        }

        function Vt(e) {
            return e
        }

        function $t(e, t, n) {
            var r = !0, i = t && yt(t);
            t && (n || i.length) || (null == n && (n = t), s = Q, t = e, e = K, i = yt(t)), !1 === n ? r = !1 : Et(n) && "chain" in n && (r = n.chain);
            var s = e, o = wt(s);
            At(i, function (n) {
                var i = e[n] = t[n];
                o && (s.prototype[n] = function () {
                    var t = this.__chain__, n = this.__wrapped__, o = [n];
                    if (bn.apply(o, arguments), o = i.apply(e, o), r || t) {
                        if (n === o && Et(o))return this;
                        o = new s(o), o.__chain__ = t
                    }
                    return o
                })
            })
        }

        function Jt() {
        }

        function Kt(e) {
            return function (t) {
                return t[e]
            }
        }

        function Qt() {
            return this.__wrapped__
        }

        n = n ? Y.defaults($.Object(), n, Y.pick($, _)) : $;
        var Gt = n.Array, Yt = n.Boolean, Zt = n.Date, en = n.Function, tn = n.Math, nn = n.Number, rn = n.Object,
            sn = n.RegExp, on = n.String, un = n.TypeError, an = [], fn = rn.prototype, ln = n._, cn = fn.toString,
            hn = sn("^" + on(cn).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/toString| for [^\]]+/g, ".*?") + "$"),
            pn = tn.ceil, dn = n.clearTimeout, vn = tn.floor, mn = en.prototype.toString,
            gn = pt(gn = rn.getPrototypeOf) && gn, yn = fn.hasOwnProperty, bn = an.push, wn = n.setTimeout,
            En = an.splice, Sn = an.unshift, xn = function () {
                try {
                    var e = {}, t = pt(t = rn.defineProperty) && t, n = t(e, e, e) && t
                } catch (r) {
                }
                return n
            }(), Tn = pt(Tn = rn.create) && Tn, Nn = pt(Nn = Gt.isArray) && Nn, Cn = n.isFinite, kn = n.isNaN,
            Ln = pt(Ln = rn.keys) && Ln, An = tn.max, On = tn.min, Mn = n.parseInt, _n = tn.random, Dn = {};
        Dn[P] = Gt, Dn[H] = Yt, Dn[B] = Zt, Dn[j] = en, Dn[I] = rn, Dn[F] = nn, Dn[q] = sn, Dn[R] = on, Q.prototype = K.prototype;
        var Pn = K.support = {};
        Pn.funcDecomp = !pt(n.a) && O.test(h), Pn.funcNames = typeof en.name == "string", K.templateSettings = {
            escape: /<%-([\s\S]+?)%>/g,
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: k,
            variable: "",
            imports: {_: K}
        }, Tn || (et = function () {
            function e() {
            }

            return function (t) {
                if (Et(t)) {
                    e.prototype = t;
                    var r = new e;
                    e.prototype = null
                }
                return r || n.Object()
            }
        }());
        var Hn = xn ? function (e, t) {
                W.value = t, xn(e, "__bindData__", W)
            } : Jt, Bn = Nn || function (e) {
                    return e && typeof e == "object" && typeof e.length == "number" && cn.call(e) == P || !1
                }, jn = Ln ? function (e) {
                return Et(e) ? Ln(e) : []
            } : J, Fn = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}, In = bt(Fn),
            qn = sn("(" + jn(In).join("|") + ")", "g"), Rn = sn("[" + jn(Fn).join("") + "]", "g"),
            Un = gn ? function (e) {
                if (!e || cn.call(e) != I)return !1;
                var t = e.valueOf, n = pt(t) && (n = gn(t)) && gn(n);
                return n ? e == n || gn(e) == n : dt(e)
            } : dt, zn = ft(function (e, t, n) {
                yn.call(e, n) ? e[n]++ : e[n] = 1
            }), Wn = ft(function (e, t, n) {
                (yn.call(e, n) ? e[n] : e[n] = []).push(t)
            }), Xn = ft(function (e, t, n) {
                e[n] = t
            }), Vn = Mt, $n = pt($n = Zt.now) && $n || function () {
                    return (new Zt).getTime()
                }, Jn = 8 == Mn(w + "08") ? Mn : function (e, t) {
                return Mn(xt(e) ? e.replace(L, "") : e, t || 0)
            };
        return K.after = function (e, t) {
            if (!wt(t))throw new un;
            return function () {
                return 1 > --e ? t.apply(this, arguments) : void 0
            }
        }, K.assign = V, K.at = function (e) {
            for (var t = arguments, n = -1, r = it(t, !0, !1, 1), t = t[2] && t[2][t[1]] === e ? 1 : r.length,
                     i = Gt(t); ++n < t;)i[n] = e[r[n]];
            return i
        }, K.bind = Wt, K.bindAll = function (e) {
            for (var t = 1 < arguments.length ? it(arguments, !0, !1, 1) : yt(e), n = -1, r = t.length; ++n < r;) {
                var i = t[n];
                e[i] = lt(e[i], 1, null, null, e)
            }
            return e
        }, K.bindKey = function (e, t) {
            return 2 < arguments.length ? lt(t, 19, c(arguments, 2), null, e) : lt(t, 3, null, null, e)
        }, K.chain = function (e) {
            return e = new Q(e), e.__chain__ = !0, e
        }, K.compact = function (e) {
            for (var t = -1, n = e ? e.length : 0, r = []; ++t < n;) {
                var i = e[t];
                i && r.push(i)
            }
            return r
        }, K.compose = function () {
            for (var e = arguments, t = e.length; t--;)if (!wt(e[t]))throw new un;
            return function () {
                for (var t = arguments, n = e.length; n--;)t = [e[n].apply(this, t)];
                return t[0]
            }
        }, K.constant = function (e) {
            return function () {
                return e
            }
        }, K.countBy = zn, K.create = function (e, t) {
            var n = et(e);
            return t ? V(n, t) : n
        }, K.createCallback = function (e, t, n) {
            var r = typeof e;
            if (null == e || "function" == r)return tt(e, t, n);
            if ("object" != r)return Kt(e);
            var i = jn(e), s = i[0], o = e[s];
            return 1 != i.length || o !== o || Et(o) ? function (t) {
                for (var n = i.length, r = !1; n-- && (r = st(t[i[n]], e[i[n]], null, !0)););
                return r
            } : function (e) {
                return e = e[s], o === e && (0 !== o || 1 / o == 1 / e)
            }
        }, K.curry = function (e, t) {
            return t = typeof t == "number" ? t : +t || e.length, lt(e, 4, null, null, null, t)
        }, K.debounce = Xt, K.defaults = b, K.defer = function (e) {
            if (!wt(e))throw new un;
            var t = c(arguments, 1);
            return wn(function () {
                e.apply(p, t)
            }, 1)
        }, K.delay = function (e, t) {
            if (!wt(e))throw new un;
            var n = c(arguments, 2);
            return wn(function () {
                e.apply(p, n)
            }, t)
        }, K.difference = function (e) {
            return rt(e, it(arguments, !0, !0, 1))
        }, K.filter = kt, K.flatten = function (e, t, n, r) {
            return typeof t != "boolean" && null != t && (r = n, n = typeof t != "function" && r && r[t] === e ? null : t, t = !1), null != n && (e = Mt(e, n, r)), it(e, t)
        }, K.forEach = At, K.forEachRight = Ot, K.forIn = v, K.forInRight = function (e, t, n) {
            var r = [];
            v(e, function (e, t) {
                r.push(t, e)
            });
            var i = r.length;
            for (t = tt(t, n, 3); i-- && !1 !== t(r[i--], r[i], e););
            return e
        }, K.forOwn = d, K.forOwnRight = gt, K.functions = yt, K.groupBy = Wn, K.indexBy = Xn, K.initial = function (e, t, n) {
            var r = 0, i = e ? e.length : 0;
            if (typeof t != "number" && null != t) {
                var s = i;
                for (t = K.createCallback(t, n, 3); s-- && t(e[s], s, e);)r++
            } else r = null == t || n ? 1 : t || r;
            return c(e, 0, On(An(0, i - r), i))
        }, K.intersection = function () {
            for (var n = [], r = -1, i = arguments.length, o = u(), a = ht(), c = a === e, h = u(); ++r < i;) {
                var p = arguments[r];
                (Bn(p) || mt(p)) && (n.push(p), o.push(c && p.length >= y && s(r ? n[r] : h)))
            }
            var c = n[0], d = -1, v = c ? c.length : 0, m = [];
            e:for (; ++d < v;) {
                var g = o[0], p = c[d];
                if (0 > (g ? t(g, p) : a(h, p))) {
                    for (r = i, (g || h).push(p); --r;)if (g = o[r], 0 > (g ? t(g, p) : a(n[r], p)))continue e;
                    m.push(p)
                }
            }
            for (; i--;)(g = o[i]) && l(g);
            return f(o), f(h), m
        }, K.invert = bt, K.invoke = function (e, t) {
            var n = c(arguments, 2), r = -1, i = typeof t == "function", s = e ? e.length : 0,
                o = Gt(typeof s == "number" ? s : 0);
            return At(e, function (e) {
                o[++r] = (i ? t : e[t]).apply(e, n)
            }), o
        }, K.keys = jn, K.map = Mt, K.mapValues = function (e, t, n) {
            var r = {};
            return t = K.createCallback(t, n, 3), d(e, function (e, n, i) {
                r[n] = t(e, n, i)
            }), r
        }, K.max = _t, K.memoize = function (e, t) {
            function n() {
                var r = n.cache, i = t ? t.apply(this, arguments) : g + arguments[0];
                return yn.call(r, i) ? r[i] : r[i] = e.apply(this, arguments)
            }

            if (!wt(e))throw new un;
            return n.cache = {}, n
        }, K.merge = function (e) {
            var t = arguments, n = 2;
            if (!Et(e))return e;
            if ("number" != typeof t[2] && (n = t.length), 3 < n && "function" == typeof t[n - 2])var r = tt(t[--n - 1], t[n--], 2); else 2 < n && "function" == typeof t[n - 1] && (r = t[--n]);
            for (var t = c(arguments, 1, n), i = -1, s = u(), o = u(); ++i < n;)ot(e, t[i], r, s, o);
            return f(s), f(o), e
        }, K.min = function (e, t, n) {
            var i = 1 / 0, s = i;
            if (typeof t != "function" && n && n[t] === e && (t = null), null == t && Bn(e)) {
                n = -1;
                for (var o = e.length; ++n < o;) {
                    var u = e[n];
                    u < s && (s = u)
                }
            } else t = null == t && xt(e) ? r : K.createCallback(t, n, 3), At(e, function (e, n, r) {
                n = t(e, n, r), n < i && (i = n, s = e)
            });
            return s
        }, K.omit = function (e, t, n) {
            var r = {};
            if (typeof t != "function") {
                var i = [];
                v(e, function (e, t) {
                    i.push(t)
                });
                for (var i = rt(i, it(arguments, !0, !1, 1)), s = -1, o = i.length; ++s < o;) {
                    var u = i[s];
                    r[u] = e[u]
                }
            } else t = K.createCallback(t, n, 3), v(e, function (e, n, i) {
                t(e, n, i) || (r[n] = e)
            });
            return r
        }, K.once = function (e) {
            var t, n;
            if (!wt(e))throw new un;
            return function () {
                return t ? n : (t = !0, n = e.apply(this, arguments), e = null, n)
            }
        }, K.pairs = function (e) {
            for (var t = -1, n = jn(e), r = n.length, i = Gt(r); ++t < r;) {
                var s = n[t];
                i[t] = [s, e[s]]
            }
            return i
        }, K.partial = function (e) {
            return lt(e, 16, c(arguments, 1))
        }, K.partialRight = function (e) {
            return lt(e, 32, null, c(arguments, 1))
        }, K.pick = function (e, t, n) {
            var r = {};
            if (typeof t != "function")for (var i = -1, s = it(arguments, !0, !1, 1),
                                                o = Et(e) ? s.length : 0; ++i < o;) {
                var u = s[i];
                u in e && (r[u] = e[u])
            } else t = K.createCallback(t, n, 3), v(e, function (e, n, i) {
                t(e, n, i) && (r[n] = e)
            });
            return r
        }, K.pluck = Vn, K.property = Kt, K.pull = function (e) {
            for (var t = arguments, n = 0, r = t.length, i = e ? e.length : 0; ++n < r;)for (var s = -1,
                                                                                                 o = t[n]; ++s < i;)e[s] === o && (En.call(e, s--, 1), i--);
            return e
        }, K.range = function (e, t, n) {
            e = +e || 0, n = typeof n == "number" ? n : +n || 1, null == t && (t = e, e = 0);
            var r = -1;
            t = An(0, pn((t - e) / (n || 1)));
            for (var i = Gt(t); ++r < t;)i[r] = e, e += n;
            return i
        }, K.reject = function (e, t, n) {
            return t = K.createCallback(t, n, 3), kt(e, function (e, n, r) {
                return !t(e, n, r)
            })
        }, K.remove = function (e, t, n) {
            var r = -1, i = e ? e.length : 0, s = [];
            for (t = K.createCallback(t, n, 3); ++r < i;)n = e[r], t(n, r, e) && (s.push(n), En.call(e, r--, 1), i--);
            return s
        }, K.rest = It, K.shuffle = Ht, K.sortBy = function (e, t, n) {
            var r = -1, s = Bn(t), o = e ? e.length : 0, c = Gt(typeof o == "number" ? o : 0);
            for (s || (t = K.createCallback(t, n, 3)), At(e, function (e, n, i) {
                var o = c[++r] = a();
                s ? o.m = Mt(t, function (t) {
                    return e[t]
                }) : (o.m = u())[0] = t(e, n, i), o.n = r, o.o = e
            }), o = c.length, c.sort(i); o--;)e = c[o], c[o] = e.o, s || f(e.m), l(e);
            return c
        }, K.tap = function (e, t) {
            return t(e), e
        }, K.throttle = function (e, t, n) {
            var r = !0, i = !0;
            if (!wt(e))throw new un;
            return !1 === n ? r = !1 : Et(n) && (r = "leading" in n ? n.leading : r, i = "trailing" in n ? n.trailing : i), z.leading = r, z.maxWait = t, z.trailing = i, Xt(e, t, z)
        }, K.times = function (e, t, n) {
            e = -1 < (e = +e) ? e : 0;
            var r = -1, i = Gt(e);
            for (t = tt(t, n, 1); ++r < e;)i[r] = t(r);
            return i
        }, K.toArray = function (e) {
            return e && typeof e.length == "number" ? c(e) : Tt(e)
        }, K.transform = function (e, t, n, r) {
            var i = Bn(e);
            if (null == n)if (i) n = []; else {
                var s = e && e.constructor;
                n = et(s && s.prototype)
            }
            return t && (t = K.createCallback(t, r, 4), (i ? At : d)(e, function (e, r, i) {
                return t(n, e, r, i)
            })), n
        }, K.union = function () {
            return at(it(arguments, !0, !0))
        }, K.uniq = Rt, K.values = Tt, K.where = kt, K.without = function (e) {
            return rt(e, c(arguments, 1))
        }, K.wrap = function (e, t) {
            return lt(t, 16, [e])
        }, K.xor = function () {
            for (var e = -1, t = arguments.length; ++e < t;) {
                var n = arguments[e];
                if (Bn(n) || mt(n))var r = r ? at(rt(r, n).concat(rt(n, r))) : n
            }
            return r || []
        }, K.zip = Ut, K.zipObject = zt, K.collect = Mt, K.drop = It, K.each = At, K.eachRight = Ot, K.extend = V, K.methods = yt, K.object = zt, K.select = kt, K.tail = It, K.unique = Rt, K.unzip = Ut, $t(K), K.clone = function (e, t, n, r) {
            return typeof t != "boolean" && null != t && (r = n, n = t, t = !1), Z(e, t, typeof n == "function" && tt(n, r, 1))
        }, K.cloneDeep = function (e, t, n) {
            return Z(e, !0, typeof t == "function" && tt(t, n, 1))
        }, K.contains = Nt, K.escape = function (e) {
            return null == e ? "" : on(e).replace(Rn, ct)
        }, K.every = Ct, K.find = Lt, K.findIndex = function (e, t, n) {
            var r = -1, i = e ? e.length : 0;
            for (t = K.createCallback(t, n, 3); ++r < i;)if (t(e[r], r, e))return r;
            return -1
        }, K.findKey = function (e, t, n) {
            var r;
            return t = K.createCallback(t, n, 3), d(e, function (e, n, i) {
                return t(e, n, i) ? (r = n, !1) : void 0
            }), r
        }, K.findLast = function (e, t, n) {
            var r;
            return t = K.createCallback(t, n, 3), Ot(e, function (e, n, i) {
                return t(e, n, i) ? (r = e, !1) : void 0
            }), r
        }, K.findLastIndex = function (e, t, n) {
            var r = e ? e.length : 0;
            for (t = K.createCallback(t, n, 3); r--;)if (t(e[r], r, e))return r;
            return -1
        }, K.findLastKey = function (e, t, n) {
            var r;
            return t = K.createCallback(t, n, 3), gt(e, function (e, n, i) {
                return t(e, n, i) ? (r = n, !1) : void 0
            }), r
        }, K.has = function (e, t) {
            return e ? yn.call(e, t) : !1
        }, K.identity = Vt, K.indexOf = Ft, K.isArguments = mt, K.isArray = Bn, K.isBoolean = function (e) {
            return !0 === e || !1 === e || e && typeof e == "object" && cn.call(e) == H || !1
        }, K.isDate = function (e) {
            return e && typeof e == "object" && cn.call(e) == B || !1
        }, K.isElement = function (e) {
            return e && 1 === e.nodeType || !1
        },K.isEmpty = function (e) {
            var t = !0;
            if (!e)return t;
            var n = cn.call(e), r = e.length;
            return n == P || n == R || n == D || n == I && typeof r == "number" && wt(e.splice) ? !r : (d(e, function () {
                return t = !1
            }), t)
        },K.isEqual = function (e, t, n, r) {
            return st(e, t, typeof n == "function" && tt(n, r, 2))
        },K.isFinite = function (e) {
            return Cn(e) && !kn(parseFloat(e))
        },K.isFunction = wt,K.isNaN = function (e) {
            return St(e) && e != +e
        },K.isNull = function (e) {
            return null === e
        },K.isNumber = St,K.isObject = Et,K.isPlainObject = Un,K.isRegExp = function (e) {
            return e && typeof e == "object" && cn.call(e) == q || !1
        },K.isString = xt,K.isUndefined = function (e) {
            return typeof e == "undefined"
        },K.lastIndexOf = function (e, t, n) {
            var r = e ? e.length : 0;
            for (typeof n == "number" && (r = (0 > n ? An(0, r + n) : On(n, r - 1)) + 1); r--;)if (e[r] === t)return r;
            return -1
        },K.mixin = $t,K.noConflict = function () {
            return n._ = ln, this
        },K.noop = Jt,K.now = $n,K.parseInt = Jn,K.random = function (e, t, n) {
            var r = null == e, i = null == t;
            return null == n && (typeof e == "boolean" && i ? (n = e, e = 1) : i || typeof t != "boolean" || (n = t, i = !0)), r && i && (t = 1), e = +e || 0, i ? (t = e, e = 0) : t = +t || 0, n || e % 1 || t % 1 ? (n = _n(), On(e + n * (t - e + parseFloat("1e-" + ((n + "").length - 1))), t)) : ut(e, t)
        },K.reduce = Dt,K.reduceRight = Pt,K.result = function (e, t) {
            if (e) {
                var n = e[t];
                return wt(n) ? e[t]() : n
            }
        },K.runInContext = h,K.size = function (e) {
            var t = e ? e.length : 0;
            return typeof t == "number" ? t : jn(e).length
        },K.some = Bt,K.sortedIndex = qt,K.template = function (e, t, n) {
            var r = K.templateSettings;
            e = on(e || ""), n = b({}, n, r);
            var i, s = b({}, n.imports, r.imports), r = jn(s), s = Tt(s), u = 0, a = n.interpolate || A, f = "__p+='",
                a = sn((n.escape || A).source + "|" + a.source + "|" + (a === k ? T : A).source + "|" + (n.evaluate || A).source + "|$", "g");
            e.replace(a, function (t, n, r, s, a, l) {
                return r || (r = s), f += e.slice(u, l).replace(M, o), n && (f += "'+__e(" + n + ")+'"), a && (i = !0, f += "';" + a + ";\n__p+='"), r && (f += "'+((__t=(" + r + "))==null?'':__t)+'"), u = l + t.length, t
            }), f += "';", a = n = n.variable, a || (n = "obj", f = "with(" + n + "){" + f + "}"), f = (i ? f.replace(E, "") : f).replace(S, "$1").replace(x, "$1;"), f = "function(" + n + "){" + (a ? "" : n + "||(" + n + "={});") + "var __t,__p='',__e=_.escape" + (i ? ",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}" : ";") + f + "return __p}";
            try {
                var l = en(r, "return " + f).apply(p, s)
            } catch (c) {
                throw c.source = f, c
            }
            return t ? l(t) : (l.source = f, l)
        },K.unescape = function (e) {
            return null == e ? "" : on(e).replace(qn, vt)
        },K.uniqueId = function (e) {
            var t = ++m;
            return on(null == e ? "" : e) + t
        },K.all = Ct,K.any = Bt,K.detect = Lt,K.findWhere = Lt,K.foldl = Dt,K.foldr = Pt,K.include = Nt,K.inject = Dt,$t(function () {
            var e = {};
            return d(K, function (t, n) {
                K.prototype[n] || (e[n] = t)
            }), e
        }(), !1),K.first = jt,K.last = function (e, t, n) {
            var r = 0, i = e ? e.length : 0;
            if (typeof t != "number" && null != t) {
                var s = i;
                for (t = K.createCallback(t, n, 3); s-- && t(e[s], s, e);)r++
            } else if (r = t, null == r || n)return e ? e[i - 1] : p;
            return c(e, An(0, i - r))
        },K.sample = function (e, t, n) {
            return e && typeof e.length != "number" && (e = Tt(e)), null == t || n ? e ? e[ut(0, e.length - 1)] : p : (e = Ht(e), e.length = On(An(0, t), e.length), e)
        },K.take = jt,K.head = jt,d(K, function (e, t) {
            var n = "sample" !== t;
            K.prototype[t] || (K.prototype[t] = function (t, r) {
                var i = this.__chain__, s = e(this.__wrapped__, t, r);
                return i || null != t && (!r || n && typeof t == "function") ? new Q(s, i) : s
            })
        }),K.VERSION = "2.4.1",K.prototype.chain = function () {
            return this.__chain__ = !0, this
        },K.prototype.toString = function () {
            return on(this.__wrapped__)
        },K.prototype.value = Qt,K.prototype.valueOf = Qt,At(["join", "pop", "shift"], function (e) {
            var t = an[e];
            K.prototype[e] = function () {
                var e = this.__chain__, n = t.apply(this.__wrapped__, arguments);
                return e ? new Q(n, e) : n
            }
        }),At(["push", "reverse", "sort", "unshift"], function (e) {
            var t = an[e];
            K.prototype[e] = function () {
                return t.apply(this.__wrapped__, arguments), this
            }
        }),At(["concat", "slice", "splice"], function (e) {
            var t = an[e];
            K.prototype[e] = function () {
                return new Q(t.apply(this.__wrapped__, arguments), this.__chain__)
            }
        }),K
    }

    var p, d = [], v = [], m = 0, g = +(new Date) + "", y = 75, b = 40,
        w = " 	\f ﻿\n\r\u2028\u2029 ᠎             　", E = /\b__p\+='';/g, S = /\b(__p\+=)''\+/g,
        x = /(__e\(.*?\)|\b__t\))\+'';/g, T = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, N = /\w*$/,
        C = /^\s*function[ \n\r\t]+\w/, k = /<%=([\s\S]+?)%>/g, L = RegExp("^[" + w + "]*0+(?=.$)"), A = /($^)/,
        O = /\bthis\b/, M = /['\n\r\t\u2028\u2029\\]/g,
        _ = "Array Boolean Date Function Math Number Object RegExp String _ attachEvent clearTimeout isFinite isNaN parseInt setTimeout".split(" "),
        D = "[object Arguments]", P = "[object Array]", H = "[object Boolean]", B = "[object Date]",
        j = "[object Function]", F = "[object Number]", I = "[object Object]", q = "[object RegExp]",
        R = "[object String]", U = {};
    U[j] = !1, U[D] = U[P] = U[H] = U[B] = U[F] = U[I] = U[q] = U[R] = !0;
    var z = {leading: !1, maxWait: 0, trailing: !1}, W = {configurable: !1, enumerable: !1, value: null, writable: !1},
        X = {"boolean": !1, "function": !0, object: !0, number: !1, string: !1, "undefined": !1},
        V = {"\\": "\\", "'": "'", "\n": "n", "\r": "r", "	": "t", "\u2028": "u2028", "\u2029": "u2029"},
        $ = X[typeof window] && window || this, J = X[typeof exports] && exports && !exports.nodeType && exports,
        K = X[typeof module] && module && !module.nodeType && module, Q = K && K.exports === J && J,
        G = X[typeof global] && global;
    !G || G.global !== G && G.window !== G || ($ = G);
    var Y = h();
    typeof define == "function" && typeof define.amd == "object" && define.amd ? ($._ = Y, define("underscore", [], function () {
        return Y
    })) : J && K ? Q ? (K.exports = Y)._ = Y : J._ = Y : $._ = Y
}.call(this), (window._gsQueue || (window._gsQueue = [])).push(function () {
    "use strict";
    window._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function (e, t) {
        var n, r, i, s, o = function () {
            e.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = o.prototype.setRatio
        }, u = {}, a = o.prototype = new e("css");
        a.constructor = o, o.version = "1.11.8", o.API = 2, o.defaultTransformPerspective = 0, o.defaultSkewType = "compensated", a = "px", o.suffixMap = {
            top: a,
            right: a,
            bottom: a,
            left: a,
            width: a,
            height: a,
            fontSize: a,
            padding: a,
            margin: a,
            perspective: a,
            lineHeight: ""
        };
        var f, l, c, h, p, d, v = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
            m = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
            g = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi, y = /[^\d\-\.]/g, b = /(?:\d|\-|\+|=|#|\.)*/g,
            w = /opacity *= *([^)]*)/, E = /opacity:([^;]*)/, S = /alpha\(opacity *=.+?\)/i, x = /^(rgb|hsl)/,
            T = /([A-Z])/g, N = /-([a-z])/gi, C = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi, k = function (e, t) {
                return t.toUpperCase()
            }, L = /(?:Left|Right|Width)/i, A = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
            O = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i, M = /,(?=[^\)]*(?:\(|$))/gi, _ = Math.PI / 180,
            D = 180 / Math.PI, P = {}, H = document, B = H.createElement("div"), j = H.createElement("img"),
            F = o._internals = {_specialProps: u}, I = navigator.userAgent, q = function () {
                var e, t = I.indexOf("Android"), n = H.createElement("div");
                return c = -1 !== I.indexOf("Safari") && -1 === I.indexOf("Chrome") && (-1 === t || Number(I.substr(t + 8, 1)) > 3), p = c && 6 > Number(I.substr(I.indexOf("Version/") + 8, 1)), h = -1 !== I.indexOf("Firefox"), /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(I) && (d = parseFloat(RegExp.$1)), n.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>", e = n.getElementsByTagName("a")[0], e ? /^0.55/.test(e.style.opacity) : !1
            }(), R = function (e) {
                return w.test("string" == typeof e ? e : (e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
            }, U = function (e) {
                window.console && 0
            }, z = "", W = "", X = function (e, t) {
                t = t || B;
                var n, r, i = t.style;
                if (void 0 !== i[e])return e;
                for (e = e.charAt(0).toUpperCase() + e.substr(1), n = ["O", "Moz", "ms", "Ms", "Webkit"], r = 5; --r > -1 && void 0 === i[n[r] + e];);
                return r >= 0 ? (W = 3 === r ? "ms" : n[r], z = "-" + W.toLowerCase() + "-", W + e) : null
            }, V = H.defaultView ? H.defaultView.getComputedStyle : function () {
            }, $ = o.getStyle = function (e, t, n, r, i) {
                var s;
                return q || "opacity" !== t ? (!r && e.style[t] ? s = e.style[t] : (n = n || V(e, null)) ? s = n[t] || n.getPropertyValue(t) || n.getPropertyValue(t.replace(T, "-$1").toLowerCase()) : e.currentStyle && (s = e.currentStyle[t]), null == i || s && "none" !== s && "auto" !== s && "auto auto" !== s ? s : i) : R(e)
            }, J = F.convertToPixels = function (e, n, r, i, s) {
                if ("px" === i || !i)return r;
                if ("auto" === i || !r)return 0;
                var u, a, f, l = L.test(n), c = e, h = B.style, p = 0 > r;
                if (p && (r = -r), "%" === i && -1 !== n.indexOf("border")) u = r / 100 * (l ? e.clientWidth : e.clientHeight); else {
                    if (h.cssText = "border:0 solid red;position:" + $(e, "position") + ";line-height:0;", "%" !== i && c.appendChild) h[l ? "borderLeftWidth" : "borderTopWidth"] = r + i; else {
                        if (c = e.parentNode || H.body, a = c._gsCache, f = t.ticker.frame, a && l && a.time === f)return a.width * r / 100;
                        h[l ? "width" : "height"] = r + i
                    }
                    c.appendChild(B), u = parseFloat(B[l ? "offsetWidth" : "offsetHeight"]), c.removeChild(B), l && "%" === i && o.cacheWidths !== !1 && (a = c._gsCache = c._gsCache || {}, a.time = f, a.width = 100 * (u / r)), 0 !== u || s || (u = J(e, n, r, i, !0))
                }
                return p ? -u : u
            }, K = F.calculateOffset = function (e, t, n) {
                if ("absolute" !== $(e, "position", n))return 0;
                var r = "left" === t ? "Left" : "Top", i = $(e, "margin" + r, n);
                return e["offset" + r] - (J(e, t, parseFloat(i), i.replace(b, "")) || 0)
            }, Q = function (e, t) {
                var n, r, i = {};
                if (t = t || V(e, null))if (n = t.length)for (; --n > -1;)i[t[n].replace(N, k)] = t.getPropertyValue(t[n]); else for (n in t)i[n] = t[n]; else if (t = e.currentStyle || e.style)for (n in t)"string" == typeof n && void 0 === i[n] && (i[n.replace(N, k)] = t[n]);
                return q || (i.opacity = R(e)), r = Tt(e, t, !1), i.rotation = r.rotation, i.skewX = r.skewX, i.scaleX = r.scaleX, i.scaleY = r.scaleY, i.x = r.x, i.y = r.y, St && (i.z = r.z, i.rotationX = r.rotationX, i.rotationY = r.rotationY, i.scaleZ = r.scaleZ), i.filters && delete i.filters, i
            }, G = function (e, t, n, r, i) {
                var s, o, u, a = {}, f = e.style;
                for (o in n)"cssText" !== o && "length" !== o && isNaN(o) && (t[o] !== (s = n[o]) || i && i[o]) && -1 === o.indexOf("Origin") && ("number" == typeof s || "string" == typeof s) && (a[o] = "auto" !== s || "left" !== o && "top" !== o ? "" !== s && "auto" !== s && "none" !== s || "string" != typeof t[o] || "" === t[o].replace(y, "") ? s : 0 : K(e, o), void 0 !== f[o] && (u = new ct(f, o, f[o], u)));
                if (r)for (o in r)"className" !== o && (a[o] = r[o]);
                return {difs: a, firstMPT: u}
            }, Y = {width: ["Left", "Right"], height: ["Top", "Bottom"]},
            Z = ["marginLeft", "marginRight", "marginTop", "marginBottom"], et = function (e, t, n) {
                var r = parseFloat("width" === t ? e.offsetWidth : e.offsetHeight), i = Y[t], s = i.length;
                for (n = n || V(e, null); --s > -1;)r -= parseFloat($(e, "padding" + i[s], n, !0)) || 0, r -= parseFloat($(e, "border" + i[s] + "Width", n, !0)) || 0;
                return r
            }, tt = function (e, t) {
                (null == e || "" === e || "auto" === e || "auto auto" === e) && (e = "0 0");
                var n = e.split(" "), r = -1 !== e.indexOf("left") ? "0%" : -1 !== e.indexOf("right") ? "100%" : n[0],
                    i = -1 !== e.indexOf("top") ? "0%" : -1 !== e.indexOf("bottom") ? "100%" : n[1];
                return null == i ? i = "0" : "center" === i && (i = "50%"), ("center" === r || isNaN(parseFloat(r)) && -1 === (r + "").indexOf("=")) && (r = "50%"), t && (t.oxp = -1 !== r.indexOf("%"), t.oyp = -1 !== i.indexOf("%"), t.oxr = "=" === r.charAt(1), t.oyr = "=" === i.charAt(1), t.ox = parseFloat(r.replace(y, "")), t.oy = parseFloat(i.replace(y, ""))), r + " " + i + (n.length > 2 ? " " + n[2] : "")
            }, nt = function (e, t) {
                return "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * parseFloat(e.substr(2)) : parseFloat(e) - parseFloat(t)
            }, rt = function (e, t) {
                return null == e ? t : "string" == typeof e && "=" === e.charAt(1) ? parseInt(e.charAt(0) + "1", 10) * Number(e.substr(2)) + t : parseFloat(e)
            }, it = function (e, t, n, r) {
                var i, s, o, u, a = 1e-6;
                return null == e ? u = t : "number" == typeof e ? u = e : (i = 360, s = e.split("_"), o = Number(s[0].replace(y, "")) * (-1 === e.indexOf("rad") ? 1 : D) - ("=" === e.charAt(1) ? 0 : t), s.length && (r && (r[n] = t + o), -1 !== e.indexOf("short") && (o %= i, o !== o % (i / 2) && (o = 0 > o ? o + i : o - i)), -1 !== e.indexOf("_cw") && 0 > o ? o = (o + 9999999999 * i) % i - (0 | o / i) * i : -1 !== e.indexOf("ccw") && o > 0 && (o = (o - 9999999999 * i) % i - (0 | o / i) * i)), u = t + o), a > u && u > -a && (u = 0), u
            }, st = {
                aqua: [0, 255, 255],
                lime: [0, 255, 0],
                silver: [192, 192, 192],
                black: [0, 0, 0],
                maroon: [128, 0, 0],
                teal: [0, 128, 128],
                blue: [0, 0, 255],
                navy: [0, 0, 128],
                white: [255, 255, 255],
                fuchsia: [255, 0, 255],
                olive: [128, 128, 0],
                yellow: [255, 255, 0],
                orange: [255, 165, 0],
                gray: [128, 128, 128],
                purple: [128, 0, 128],
                green: [0, 128, 0],
                red: [255, 0, 0],
                pink: [255, 192, 203],
                cyan: [0, 255, 255],
                transparent: [255, 255, 255, 0]
            }, ot = function (e, t, n) {
                return e = 0 > e ? e + 1 : e > 1 ? e - 1 : e, 0 | 255 * (1 > 6 * e ? t + 6 * (n - t) * e : .5 > e ? n : 2 > 3 * e ? t + 6 * (n - t) * (2 / 3 - e) : t) + .5
            }, ut = function (e) {
                var t, n, r, i, s, o;
                return e && "" !== e ? "number" == typeof e ? [e >> 16, 255 & e >> 8, 255 & e] : ("," === e.charAt(e.length - 1) && (e = e.substr(0, e.length - 1)), st[e] ? st[e] : "#" === e.charAt(0) ? (4 === e.length && (t = e.charAt(1), n = e.charAt(2), r = e.charAt(3), e = "#" + t + t + n + n + r + r), e = parseInt(e.substr(1), 16), [e >> 16, 255 & e >> 8, 255 & e]) : "hsl" === e.substr(0, 3) ? (e = e.match(v), i = Number(e[0]) % 360 / 360, s = Number(e[1]) / 100, o = Number(e[2]) / 100, n = .5 >= o ? o * (s + 1) : o + s - o * s, t = 2 * o - n, e.length > 3 && (e[3] = Number(e[3])), e[0] = ot(i + 1 / 3, t, n), e[1] = ot(i, t, n), e[2] = ot(i - 1 / 3, t, n), e) : (e = e.match(v) || st.transparent, e[0] = Number(e[0]), e[1] = Number(e[1]), e[2] = Number(e[2]), e.length > 3 && (e[3] = Number(e[3])), e)) : st.black
            }, at = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
        for (a in st)at += "|" + a + "\\b";
        at = RegExp(at + ")", "gi");
        var ft = function (e, t, n, r) {
            if (null == e)return function (e) {
                return e
            };
            var i, s = t ? (e.match(at) || [""])[0] : "", o = e.split(s).join("").match(g) || [],
                u = e.substr(0, e.indexOf(o[0])), a = ")" === e.charAt(e.length - 1) ? ")" : "",
                f = -1 !== e.indexOf(" ") ? " " : ",", l = o.length, c = l > 0 ? o[0].replace(v, "") : "";
            return l ? i = t ? function (e) {
                var t, h, p, d;
                if ("number" == typeof e) e += c; else if (r && M.test(e)) {
                    for (d = e.replace(M, "|").split("|"), p = 0; d.length > p; p++)d[p] = i(d[p]);
                    return d.join(",")
                }
                if (t = (e.match(at) || [s])[0], h = e.split(t).join("").match(g) || [], p = h.length, l > p--)for (; l > ++p;)h[p] = n ? h[0 | (p - 1) / 2] : o[p];
                return u + h.join(f) + f + t + a + (-1 !== e.indexOf("inset") ? " inset" : "")
            } : function (e) {
                var t, s, h;
                if ("number" == typeof e) e += c; else if (r && M.test(e)) {
                    for (s = e.replace(M, "|").split("|"), h = 0; s.length > h; h++)s[h] = i(s[h]);
                    return s.join(",")
                }
                if (t = e.match(g) || [], h = t.length, l > h--)for (; l > ++h;)t[h] = n ? t[0 | (h - 1) / 2] : o[h];
                return u + t.join(f) + a
            } : function (e) {
                return e
            }
        }, lt = function (e) {
            return e = e.split(","), function (t, n, r, i, s, o, u) {
                var a, f = (n + "").split(" ");
                for (u = {}, a = 0; 4 > a; a++)u[e[a]] = f[a] = f[a] || f[(a - 1) / 2 >> 0];
                return i.parse(t, u, s, o)
            }
        }, ct = (F._setPluginRatio = function (e) {
            this.plugin.setRatio(e);
            for (var t, n, r, i, s = this.data, o = s.proxy, u = s.firstMPT,
                     a = 1e-6; u;)t = o[u.v], u.r ? t = Math.round(t) : a > t && t > -a && (t = 0), u.t[u.p] = t, u = u._next;
            if (s.autoRotate && (s.autoRotate.rotation = o.rotation), 1 === e)for (u = s.firstMPT; u;) {
                if (n = u.t, n.type) {
                    if (1 === n.type) {
                        for (i = n.xs0 + n.s + n.xs1, r = 1; n.l > r; r++)i += n["xn" + r] + n["xs" + (r + 1)];
                        n.e = i
                    }
                } else n.e = n.s + n.xs0;
                u = u._next
            }
        }, function (e, t, n, r, i) {
            this.t = e, this.p = t, this.v = n, this.r = i, r && (r._prev = this, this._next = r)
        }), ht = (F._parseToProxy = function (e, t, n, r, i, s) {
            var o, u, a, f, l, c = r, h = {}, p = {}, d = n._transform, v = P;
            for (n._transform = null, P = t, r = l = n.parse(e, t, r, i), P = v, s && (n._transform = d, c && (c._prev = null, c._prev && (c._prev._next = null))); r && r !== c;) {
                if (1 >= r.type && (u = r.p, p[u] = r.s + r.c, h[u] = r.s, s || (f = new ct(r, "s", u, f, r.r), r.c = 0), 1 === r.type))for (o = r.l; --o > 0;)a = "xn" + o, u = r.p + "_" + a, p[u] = r.data[a], h[u] = r[a], s || (f = new ct(r, a, u, f, r.rxp[a]));
                r = r._next
            }
            return {proxy: h, end: p, firstMPT: f, pt: l}
        }, F.CSSPropTween = function (e, t, r, i, o, u, a, f, l, c, h) {
            this.t = e, this.p = t, this.s = r, this.c = i, this.n = a || t, e instanceof ht || s.push(this.n), this.r = f, this.type = u || 0, l && (this.pr = l, n = !0), this.b = void 0 === c ? r : c, this.e = void 0 === h ? r + i : h, o && (this._next = o, o._prev = this)
        }), pt = o.parseComplex = function (e, t, n, r, i, s, o, u, a, l) {
            n = n || s || "", o = new ht(e, t, 0, 0, o, l ? 2 : 1, null, !1, u, n, r), r += "";
            var c, h, p, d, g, y, b, w, E, S, T, N, C = n.split(", ").join(",").split(" "),
                k = r.split(", ").join(",").split(" "), L = C.length, A = f !== !1;
            for ((-1 !== r.indexOf(",") || -1 !== n.indexOf(",")) && (C = C.join(" ").replace(M, ", ").split(" "), k = k.join(" ").replace(M, ", ").split(" "), L = C.length), L !== k.length && (C = (s || "").split(" "), L = C.length), o.plugin = a, o.setRatio = l, c = 0; L > c; c++)if (d = C[c], g = k[c], w = parseFloat(d), w || 0 === w) o.appendXtra("", w, nt(g, w), g.replace(m, ""), A && -1 !== g.indexOf("px"), !0); else if (i && ("#" === d.charAt(0) || st[d] || x.test(d))) N = "," === g.charAt(g.length - 1) ? ")," : ")", d = ut(d), g = ut(g), E = d.length + g.length > 6, E && !q && 0 === g[3] ? (o["xs" + o.l] += o.l ? " transparent" : "transparent", o.e = o.e.split(k[c]).join("transparent")) : (q || (E = !1), o.appendXtra(E ? "rgba(" : "rgb(", d[0], g[0] - d[0], ",", !0, !0).appendXtra("", d[1], g[1] - d[1], ",", !0).appendXtra("", d[2], g[2] - d[2], E ? "," : N, !0), E && (d = 4 > d.length ? 1 : d[3], o.appendXtra("", d, (4 > g.length ? 1 : g[3]) - d, N, !1))); else if (y = d.match(v)) {
                if (b = g.match(m), !b || b.length !== y.length)return o;
                for (p = 0, h = 0; y.length > h; h++)T = y[h], S = d.indexOf(T, p), o.appendXtra(d.substr(p, S - p), Number(T), nt(b[h], T), "", A && "px" === d.substr(S + T.length, 2), 0 === h), p = S + T.length;
                o["xs" + o.l] += d.substr(p)
            } else o["xs" + o.l] += o.l ? " " + d : d;
            if (-1 !== r.indexOf("=") && o.data) {
                for (N = o.xs0 + o.data.s, c = 1; o.l > c; c++)N += o["xs" + c] + o.data["xn" + c];
                o.e = N + o["xs" + c]
            }
            return o.l || (o.type = -1, o.xs0 = o.e), o.xfirst || o
        }, dt = 9;
        for (a = ht.prototype, a.l = a.pr = 0; --dt > 0;)a["xn" + dt] = 0, a["xs" + dt] = "";
        a.xs0 = "", a._next = a._prev = a.xfirst = a.data = a.plugin = a.setRatio = a.rxp = null, a.appendXtra = function (e, t, n, r, i, s) {
            var o = this, u = o.l;
            return o["xs" + u] += s && u ? " " + e : e || "", n || 0 === u || o.plugin ? (o.l++, o.type = o.setRatio ? 2 : 1, o["xs" + o.l] = r || "", u > 0 ? (o.data["xn" + u] = t + n, o.rxp["xn" + u] = i, o["xn" + u] = t, o.plugin || (o.xfirst = new ht(o, "xn" + u, t, n, o.xfirst || o, 0, o.n, i, o.pr), o.xfirst.xs0 = 0), o) : (o.data = {s: t + n}, o.rxp = {}, o.s = t, o.c = n, o.r = i, o)) : (o["xs" + u] += t + (r || ""), o)
        };
        var vt = function (e, t) {
            t = t || {}, this.p = t.prefix ? X(e) || e : e, u[e] = u[this.p] = this, this.format = t.formatter || ft(t.defaultValue, t.color, t.collapsible, t.multi), t.parser && (this.parse = t.parser), this.clrs = t.color, this.multi = t.multi, this.keyword = t.keyword, this.dflt = t.defaultValue, this.pr = t.priority || 0
        }, mt = F._registerComplexSpecialProp = function (e, t, n) {
            "object" != typeof t && (t = {parser: n});
            var r, i, s = e.split(","), o = t.defaultValue;
            for (n = n || [o], r = 0; s.length > r; r++)t.prefix = 0 === r && t.prefix, t.defaultValue = n[r] || o, i = new vt(s[r], t)
        }, gt = function (e) {
            if (!u[e]) {
                var t = e.charAt(0).toUpperCase() + e.substr(1) + "Plugin";
                mt(e, {
                    parser: function (e, n, r, i, s, o, a) {
                        var f = (window.GreenSockGlobals || window).com.greensock.plugins[t];
                        return f ? (f._cssRegister(), u[r].parse(e, n, r, i, s, o, a)) : (U("Error: " + t + " js file not loaded."), s)
                    }
                })
            }
        };
        a = vt.prototype, a.parseComplex = function (e, t, n, r, i, s) {
            var o, u, a, f, l, c, h = this.keyword;
            if (this.multi && (M.test(n) || M.test(t) ? (u = t.replace(M, "|").split("|"), a = n.replace(M, "|").split("|")) : h && (u = [t], a = [n])), a) {
                for (f = a.length > u.length ? a.length : u.length, o = 0; f > o; o++)t = u[o] = u[o] || this.dflt, n = a[o] = a[o] || this.dflt, h && (l = t.indexOf(h), c = n.indexOf(h), l !== c && (n = -1 === c ? a : u, n[o] += " " + h));
                t = u.join(", "), n = a.join(", ")
            }
            return pt(e, this.p, t, n, this.clrs, this.dflt, r, this.pr, i, s)
        }, a.parse = function (e, t, n, r, s, o) {
            return this.parseComplex(e.style, this.format($(e, this.p, i, !1, this.dflt)), this.format(t), s, o)
        }, o.registerSpecialProp = function (e, t, n) {
            mt(e, {
                parser: function (e, r, i, s, o, u) {
                    var a = new ht(e, i, 0, 0, o, 2, i, !1, n);
                    return a.plugin = u, a.setRatio = t(e, r, s._tween, i), a
                }, priority: n
            })
        };
        var yt = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective".split(","),
            bt = X("transform"), wt = z + "transform", Et = X("transformOrigin"), St = null !== X("perspective"),
            xt = F.Transform = function () {
                this.skewY = 0
            }, Tt = F.getTransform = function (e, t, n, r) {
                if (e._gsTransform && n && !r)return e._gsTransform;
                var i, s, u, a, f, l, c, h, p, d, v, m, g, y = n ? e._gsTransform || new xt : new xt, b = 0 > y.scaleX,
                    w = 2e-5, E = 1e5, S = 179.99, x = S * _,
                    T = St ? parseFloat($(e, Et, t, !1, "0 0 0").split(" ")[2]) || y.zOrigin || 0 : 0;
                for (bt ? i = $(e, wt, t, !0) : e.currentStyle && (i = e.currentStyle.filter.match(A), i = i && 4 === i.length ? [i[0].substr(4), Number(i[2].substr(4)), Number(i[1].substr(4)), i[3].substr(4), y.x || 0, y.y || 0].join(",") : ""), s = (i || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], u = s.length; --u > -1;)a = Number(s[u]), s[u] = (f = a - (a |= 0)) ? (0 | f * E + (0 > f ? -0.5 : .5)) / E + a : a;
                if (16 === s.length) {
                    var N = s[8], C = s[9], k = s[10], L = s[12], O = s[13], M = s[14];
                    if (y.zOrigin && (M = -y.zOrigin, L = N * M - s[12], O = C * M - s[13], M = k * M + y.zOrigin - s[14]), !n || r || null == y.rotationX) {
                        var P, H, B, j, F, I, q, R = s[0], U = s[1], z = s[2], W = s[3], X = s[4], V = s[5], J = s[6],
                            K = s[7], Q = s[11], G = Math.atan2(J, k), Y = -x > G || G > x;
                        y.rotationX = G * D, G && (j = Math.cos(-G), F = Math.sin(-G), P = X * j + N * F, H = V * j + C * F, B = J * j + k * F, N = X * -F + N * j, C = V * -F + C * j, k = J * -F + k * j, Q = K * -F + Q * j, X = P, V = H, J = B), G = Math.atan2(N, R), y.rotationY = G * D, G && (I = -x > G || G > x, j = Math.cos(-G), F = Math.sin(-G), P = R * j - N * F, H = U * j - C * F, B = z * j - k * F, C = U * F + C * j, k = z * F + k * j, Q = W * F + Q * j, R = P, U = H, z = B), G = Math.atan2(U, V), y.rotation = G * D, G && (q = -x > G || G > x, j = Math.cos(-G), F = Math.sin(-G), R = R * j + X * F, H = U * j + V * F, V = U * -F + V * j, J = z * -F + J * j, U = H), q && Y ? y.rotation = y.rotationX = 0 : q && I ? y.rotation = y.rotationY = 0 : I && Y && (y.rotationY = y.rotationX = 0), y.scaleX = (0 | Math.sqrt(R * R + U * U) * E + .5) / E, y.scaleY = (0 | Math.sqrt(V * V + C * C) * E + .5) / E, y.scaleZ = (0 | Math.sqrt(J * J + k * k) * E + .5) / E, y.skewX = 0, y.perspective = Q ? 1 / (0 > Q ? -Q : Q) : 0, y.x = L, y.y = O, y.z = M
                    }
                } else if (!(St && !r && s.length && y.x === s[4] && y.y === s[5] && (y.rotationX || y.rotationY) || void 0 !== y.x && "none" === $(e, "display", t))) {
                    var Z = s.length >= 6, et = Z ? s[0] : 1, tt = s[1] || 0, nt = s[2] || 0, rt = Z ? s[3] : 1;
                    y.x = s[4] || 0, y.y = s[5] || 0, l = Math.sqrt(et * et + tt * tt), c = Math.sqrt(rt * rt + nt * nt), h = et || tt ? Math.atan2(tt, et) * D : y.rotation || 0, p = nt || rt ? Math.atan2(nt, rt) * D + h : y.skewX || 0, d = l - Math.abs(y.scaleX || 0), v = c - Math.abs(y.scaleY || 0), Math.abs(p) > 90 && 270 > Math.abs(p) && (b ? (l *= -1, p += 0 >= h ? 180 : -180, h += 0 >= h ? 180 : -180) : (c *= -1, p += 0 >= p ? 180 : -180)), m = (h - y.rotation) % 180, g = (p - y.skewX) % 180, (void 0 === y.skewX || d > w || -w > d || v > w || -w > v || m > -S && S > m && !1 | m * E || g > -S && S > g && !1 | g * E) && (y.scaleX = l, y.scaleY = c, y.rotation = h, y.skewX = p), St && (y.rotationX = y.rotationY = y.z = 0, y.perspective = parseFloat(o.defaultTransformPerspective) || 0, y.scaleZ = 1)
                }
                y.zOrigin = T;
                for (u in y)w > y[u] && y[u] > -w && (y[u] = 0);
                return n && (e._gsTransform = y), y
            }, Nt = function (e) {
                var t, n, r = this.data, i = -r.rotation * _, s = i + r.skewX * _, o = 1e5,
                    u = (0 | Math.cos(i) * r.scaleX * o) / o, a = (0 | Math.sin(i) * r.scaleX * o) / o,
                    f = (0 | Math.sin(s) * -r.scaleY * o) / o, l = (0 | Math.cos(s) * r.scaleY * o) / o, c = this.t.style,
                    h = this.t.currentStyle;
                if (h) {
                    n = a, a = -f, f = -n, t = h.filter, c.filter = "";
                    var p, v, m = this.t.offsetWidth, g = this.t.offsetHeight, y = "absolute" !== h.position,
                        E = "progid:DXImageTransform.Microsoft.Matrix(M11=" + u + ", M12=" + a + ", M21=" + f + ", M22=" + l,
                        S = r.x, x = r.y;
                    if (null != r.ox && (p = (r.oxp ? .01 * m * r.ox : r.ox) - m / 2, v = (r.oyp ? .01 * g * r.oy : r.oy) - g / 2, S += p - (p * u + v * a), x += v - (p * f + v * l)), y ? (p = m / 2, v = g / 2, E += ", Dx=" + (p - (p * u + v * a) + S) + ", Dy=" + (v - (p * f + v * l) + x) + ")") : E += ", sizingMethod='auto expand')", c.filter = -1 !== t.indexOf("DXImageTransform.Microsoft.Matrix(") ? t.replace(O, E) : E + " " + t, (0 === e || 1 === e) && 1 === u && 0 === a && 0 === f && 1 === l && (y && -1 === E.indexOf("Dx=0, Dy=0") || w.test(t) && 100 !== parseFloat(RegExp.$1) || -1 === t.indexOf(t.indexOf("Alpha")) && c.removeAttribute("filter")), !y) {
                        var T, N, C, k = 8 > d ? 1 : -1;
                        for (p = r.ieOffsetX || 0, v = r.ieOffsetY || 0, r.ieOffsetX = Math.round((m - ((0 > u ? -u : u) * m + (0 > a ? -a : a) * g)) / 2 + S), r.ieOffsetY = Math.round((g - ((0 > l ? -l : l) * g + (0 > f ? -f : f) * m)) / 2 + x), dt = 0; 4 > dt; dt++)N = Z[dt], T = h[N], n = -1 !== T.indexOf("px") ? parseFloat(T) : J(this.t, N, parseFloat(T), T.replace(b, "")) || 0, C = n !== r[N] ? 2 > dt ? -r.ieOffsetX : -r.ieOffsetY : 2 > dt ? p - r.ieOffsetX : v - r.ieOffsetY, c[N] = (r[N] = Math.round(n - C * (0 === dt || 2 === dt ? 1 : k))) + "px"
                    }
                }
            }, Ct = F.set3DTransformRatio = function () {
                var e, t, n, r, i, s, o, u, a, f, l, c, p, d, v, m, g, y, b, w, E, S, x, T = this.data, N = this.t.style,
                    C = T.rotation * _, k = T.scaleX, L = T.scaleY, A = T.scaleZ, O = T.perspective;
                if (h) {
                    var M = 1e-4;
                    M > k && k > -M && (k = A = 2e-5), M > L && L > -M && (L = A = 2e-5), !O || T.z || T.rotationX || T.rotationY || (O = 0)
                }
                if (C || T.skewX) y = Math.cos(C), b = Math.sin(C), e = y, i = b, T.skewX && (C -= T.skewX * _, y = Math.cos(C), b = Math.sin(C), "simple" === T.skewType && (w = Math.tan(T.skewX * _), w = Math.sqrt(1 + w * w), y *= w, b *= w)), t = -b, s = y; else {
                    if (!(T.rotationY || T.rotationX || 1 !== A || O))return N[bt] = "translate3d(" + T.x + "px," + T.y + "px," + T.z + "px)" + (1 !== k || 1 !== L ? " scale(" + k + "," + L + ")" : ""), void 0;
                    e = s = 1, t = i = 0
                }
                l = 1, n = r = o = u = a = f = c = p = d = 0, v = O ? -1 / O : 0, m = T.zOrigin, g = 1e5, C = T.rotationY * _, C && (y = Math.cos(C), b = Math.sin(C), a = l * -b, p = v * -b, n = e * b, o = i * b, l *= y, v *= y, e *= y, i *= y), C = T.rotationX * _, C && (y = Math.cos(C), b = Math.sin(C), w = t * y + n * b, E = s * y + o * b, S = f * y + l * b, x = d * y + v * b, n = t * -b + n * y, o = s * -b + o * y, l = f * -b + l * y, v = d * -b + v * y, t = w, s = E, f = S, d = x), 1 !== A && (n *= A, o *= A, l *= A, v *= A), 1 !== L && (t *= L, s *= L, f *= L, d *= L), 1 !== k && (e *= k, i *= k, a *= k, p *= k), m && (c -= m, r = n * c, u = o * c, c = l * c + m), r = (w = (r += T.x) - (r |= 0)) ? (0 | w * g + (0 > w ? -0.5 : .5)) / g + r : r, u = (w = (u += T.y) - (u |= 0)) ? (0 | w * g + (0 > w ? -0.5 : .5)) / g + u : u, c = (w = (c += T.z) - (c |= 0)) ? (0 | w * g + (0 > w ? -0.5 : .5)) / g + c : c, N[bt] = "matrix3d(" + [(0 | e * g) / g, (0 | i * g) / g, (0 | a * g) / g, (0 | p * g) / g, (0 | t * g) / g, (0 | s * g) / g, (0 | f * g) / g, (0 | d * g) / g, (0 | n * g) / g, (0 | o * g) / g, (0 | l * g) / g, (0 | v * g) / g, r, u, c, O ? 1 + -c / O : 1].join(",") + ")"
            }, kt = F.set2DTransformRatio = function (e) {
                var t, n, r, i, s, o = this.data, u = this.t, a = u.style;
                return o.rotationX || o.rotationY || o.z || o.force3D ? (this.setRatio = Ct, Ct.call(this, e), void 0) : (o.rotation || o.skewX ? (t = o.rotation * _, n = t - o.skewX * _, r = 1e5, i = o.scaleX * r, s = o.scaleY * r, a[bt] = "matrix(" + (0 | Math.cos(t) * i) / r + "," + (0 | Math.sin(t) * i) / r + "," + (0 | Math.sin(n) * -s) / r + "," + (0 | Math.cos(n) * s) / r + "," + o.x + "," + o.y + ")") : a[bt] = "matrix(" + o.scaleX + ",0,0," + o.scaleY + "," + o.x + "," + o.y + ")", void 0)
            };
        mt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType", {
            parser: function (e, t, n, r, s, u, a) {
                if (r._transform)return s;
                var f, l, c, h, p, d, v, m = r._transform = Tt(e, i, !0, a.parseTransform), g = e.style, y = 1e-6,
                    b = yt.length, w = a, E = {};
                if ("string" == typeof w.transform && bt) c = g.cssText, g[bt] = w.transform, g.display = "block", f = Tt(e, null, !1), g.cssText = c; else if ("object" == typeof w) {
                    if (f = {
                            scaleX: rt(null != w.scaleX ? w.scaleX : w.scale, m.scaleX),
                            scaleY: rt(null != w.scaleY ? w.scaleY : w.scale, m.scaleY),
                            scaleZ: rt(w.scaleZ, m.scaleZ),
                            x: rt(w.x, m.x),
                            y: rt(w.y, m.y),
                            z: rt(w.z, m.z),
                            perspective: rt(w.transformPerspective, m.perspective)
                        }, v = w.directionalRotation, null != v)if ("object" == typeof v)for (c in v)w[c] = v[c]; else w.rotation = v;
                    f.rotation = it("rotation" in w ? w.rotation : "shortRotation" in w ? w.shortRotation + "_short" : "rotationZ" in w ? w.rotationZ : m.rotation, m.rotation, "rotation", E), St && (f.rotationX = it("rotationX" in w ? w.rotationX : "shortRotationX" in w ? w.shortRotationX + "_short" : m.rotationX || 0, m.rotationX, "rotationX", E), f.rotationY = it("rotationY" in w ? w.rotationY : "shortRotationY" in w ? w.shortRotationY + "_short" : m.rotationY || 0, m.rotationY, "rotationY", E)), f.skewX = null == w.skewX ? m.skewX : it(w.skewX, m.skewX), f.skewY = null == w.skewY ? m.skewY : it(w.skewY, m.skewY), (l = f.skewY - m.skewY) && (f.skewX += l, f.rotation += l)
                }
                for (St && null != w.force3D && (m.force3D = w.force3D, d = !0), m.skewType = w.skewType || m.skewType || o.defaultSkewType, p = m.force3D || m.z || m.rotationX || m.rotationY || f.z || f.rotationX || f.rotationY || f.perspective, p || null == w.scale || (f.scaleZ = 1); --b > -1;)n = yt[b], h = f[n] - m[n], (h > y || -y > h || null != P[n]) && (d = !0, s = new ht(m, n, m[n], h, s), n in E && (s.e = E[n]), s.xs0 = 0, s.plugin = u, r._overwriteProps.push(s.n));
                return h = w.transformOrigin, (h || St && p && m.zOrigin) && (bt ? (d = !0, n = Et, h = (h || $(e, n, i, !1, "50% 50%")) + "", s = new ht(g, n, 0, 0, s, -1, "transformOrigin"), s.b = g[n], s.plugin = u, St ? (c = m.zOrigin, h = h.split(" "), m.zOrigin = (h.length > 2 && (0 === c || "0px" !== h[2]) ? parseFloat(h[2]) : c) || 0, s.xs0 = s.e = g[n] = h[0] + " " + (h[1] || "50%") + " 0px", s = new ht(m, "zOrigin", 0, 0, s, -1, s.n), s.b = c, s.xs0 = s.e = m.zOrigin) : s.xs0 = s.e = g[n] = h) : tt(h + "", m)), d && (r._transformType = p || 3 === this._transformType ? 3 : 2), s
            }, prefix: !0
        }), mt("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999",
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: "inset"
        }), mt("borderRadius", {
            defaultValue: "0px", parser: function (e, t, n, s, o) {
                t = this.format(t);
                var u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S,
                    x = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                    T = e.style;
                for (v = parseFloat(e.offsetWidth), m = parseFloat(e.offsetHeight), u = t.split(" "), a = 0; x.length > a; a++)this.p.indexOf("border") && (x[a] = X(x[a])), c = l = $(e, x[a], i, !1, "0px"), -1 !== c.indexOf(" ") && (l = c.split(" "), c = l[0], l = l[1]), h = f = u[a], p = parseFloat(c), y = c.substr((p + "").length), b = "=" === h.charAt(1), b ? (d = parseInt(h.charAt(0) + "1", 10), h = h.substr(2), d *= parseFloat(h), g = h.substr((d + "").length - (0 > d ? 1 : 0)) || "") : (d = parseFloat(h), g = h.substr((d + "").length)), "" === g && (g = r[n] || y), g !== y && (w = J(e, "borderLeft", p, y), E = J(e, "borderTop", p, y), "%" === g ? (c = 100 * (w / v) + "%", l = 100 * (E / m) + "%") : "em" === g ? (S = J(e, "borderLeft", 1, "em"), c = w / S + "em", l = E / S + "em") : (c = w + "px", l = E + "px"), b && (h = parseFloat(c) + d + g, f = parseFloat(l) + d + g)), o = pt(T, x[a], c + " " + l, h + " " + f, !1, "0px", o);
                return o
            }, prefix: !0, formatter: ft("0px 0px 0px 0px", !1, !0)
        }), mt("backgroundPosition", {
            defaultValue: "0 0", parser: function (e, t, n, r, s, o) {
                var u, a, f, l, c, h, p = "background-position", v = i || V(e, null),
                    m = this.format((v ? d ? v.getPropertyValue(p + "-x") + " " + v.getPropertyValue(p + "-y") : v.getPropertyValue(p) : e.currentStyle.backgroundPositionX + " " + e.currentStyle.backgroundPositionY) || "0 0"),
                    g = this.format(t);
                if (-1 !== m.indexOf("%") != (-1 !== g.indexOf("%")) && (h = $(e, "backgroundImage").replace(C, ""), h && "none" !== h)) {
                    for (u = m.split(" "), a = g.split(" "), j.setAttribute("src", h), f = 2; --f > -1;)m = u[f], l = -1 !== m.indexOf("%"), l !== (-1 !== a[f].indexOf("%")) && (c = 0 === f ? e.offsetWidth - j.width : e.offsetHeight - j.height, u[f] = l ? parseFloat(m) / 100 * c + "px" : 100 * (parseFloat(m) / c) + "%");
                    m = u.join(" ")
                }
                return this.parseComplex(e.style, m, g, s, o)
            }, formatter: tt
        }), mt("backgroundSize", {defaultValue: "0 0", formatter: tt}), mt("perspective", {
            defaultValue: "0px",
            prefix: !0
        }), mt("perspectiveOrigin", {
            defaultValue: "50% 50%",
            prefix: !0
        }), mt("transformStyle", {prefix: !0}), mt("backfaceVisibility", {prefix: !0}), mt("userSelect", {prefix: !0}), mt("margin", {parser: lt("marginTop,marginRight,marginBottom,marginLeft")}), mt("padding", {parser: lt("paddingTop,paddingRight,paddingBottom,paddingLeft")}), mt("clip", {
            defaultValue: "rect(0px,0px,0px,0px)",
            parser: function (e, t, n, r, s, o) {
                var u, a, f;
                return 9 > d ? (a = e.currentStyle, f = 8 > d ? " " : ",", u = "rect(" + a.clipTop + f + a.clipRight + f + a.clipBottom + f + a.clipLeft + ")", t = this.format(t).split(",").join(f)) : (u = this.format($(e, this.p, i, !1, this.dflt)), t = this.format(t)), this.parseComplex(e.style, u, t, s, o)
            }
        }), mt("textShadow", {
            defaultValue: "0px 0px 0px #999",
            color: !0,
            multi: !0
        }), mt("autoRound,strictUnits", {
            parser: function (e, t, n, r, i) {
                return i
            }
        }), mt("border", {
            defaultValue: "0px solid #dd3a20", parser: function (e, t, n, r, s, o) {
                return this.parseComplex(e.style, this.format($(e, "borderTopWidth", i, !1, "0px") + " " + $(e, "borderTopStyle", i, !1, "solid") + " " + $(e, "borderTopColor", i, !1, "#dd3a20")), this.format(t), s, o)
            }, color: !0, formatter: function (e) {
                var t = e.split(" ");
                return t[0] + " " + (t[1] || "solid") + " " + (e.match(at) || ["#dd3a20"])[0]
            }
        }), mt("borderWidth", {parser: lt("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")}), mt("float,cssFloat,styleFloat", {
            parser: function (e, t, n, r, i) {
                var s = e.style, o = "cssFloat" in s ? "cssFloat" : "styleFloat";
                return new ht(s, o, 0, 0, i, -1, n, !1, 0, s[o], t)
            }
        });
        var Lt = function (e) {
            var t, n = this.t, r = n.filter || $(this.data, "filter"), i = 0 | this.s + this.c * e;
            100 === i && (-1 === r.indexOf("atrix(") && -1 === r.indexOf("radient(") && -1 === r.indexOf("oader(") ? (n.removeAttribute("filter"), t = !$(this.data, "filter")) : (n.filter = r.replace(S, ""), t = !0)), t || (this.xn1 && (n.filter = r = r || "alpha(opacity=" + i + ")"), -1 === r.indexOf("opacity") ? 0 === i && this.xn1 || (n.filter = r + " alpha(opacity=" + i + ")") : n.filter = r.replace(w, "opacity=" + i))
        };
        mt("opacity,alpha,autoAlpha", {
            defaultValue: "1", parser: function (e, t, n, r, s, o) {
                var u = parseFloat($(e, "opacity", i, !1, "1")), a = e.style, f = "autoAlpha" === n;
                return "string" == typeof t && "=" === t.charAt(1) && (t = ("-" === t.charAt(0) ? -1 : 1) * parseFloat(t.substr(2)) + u), f && 1 === u && "hidden" === $(e, "visibility", i) && 0 !== t && (u = 0), q ? s = new ht(a, "opacity", u, t - u, s) : (s = new ht(a, "opacity", 100 * u, 100 * (t - u), s), s.xn1 = f ? 1 : 0, a.zoom = 1, s.type = 2, s.b = "alpha(opacity=" + s.s + ")", s.e = "alpha(opacity=" + (s.s + s.c) + ")", s.data = e, s.plugin = o, s.setRatio = Lt), f && (s = new ht(a, "visibility", 0, 0, s, -1, null, !1, 0, 0 !== u ? "inherit" : "hidden", 0 === t ? "hidden" : "inherit"), s.xs0 = "inherit", r._overwriteProps.push(s.n), r._overwriteProps.push(n)), s
            }
        });
        var At = function (e, t) {
            t && (e.removeProperty ? ("ms" === t.substr(0, 2) && (t = "M" + t.substr(1)), e.removeProperty(t.replace(T, "-$1").toLowerCase())) : e.removeAttribute(t))
        }, Ot = function (e) {
            if (this.t._gsClassPT = this, 1 === e || 0 === e) {
                this.t.className = 0 === e ? this.b : this.e;
                for (var t = this.data, n = this.t.style; t;)t.v ? n[t.p] = t.v : At(n, t.p), t = t._next;
                1 === e && this.t._gsClassPT === this && (this.t._gsClassPT = null)
            } else this.t.className !== this.e && (this.t.className = this.e)
        };
        mt("className", {
            parser: function (e, t, r, s, o, u, a) {
                var f, l, c, h, p, d = e.className, v = e.style.cssText;
                if (o = s._classNamePT = new ht(e, r, 0, 0, o, 2), o.setRatio = Ot, o.pr = -11, n = !0, o.b = d, l = Q(e, i), c = e._gsClassPT) {
                    for (h = {}, p = c.data; p;)h[p.p] = 1, p = p._next;
                    c.setRatio(1)
                }
                return e._gsClassPT = o, o.e = "=" !== t.charAt(1) ? t : d.replace(RegExp("\\s*\\b" + t.substr(2) + "\\b"), "") + ("+" === t.charAt(0) ? " " + t.substr(2) : ""), s._tween._duration && (e.className = o.e, f = G(e, l, Q(e), a, h), e.className = d, o.data = f.firstMPT, e.style.cssText = v, o = o.xfirst = s.parse(e, f.difs, o, u)), o
            }
        });
        var Mt = function (e) {
            if ((1 === e || 0 === e) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                var t, n, r, i, s = this.t.style, o = u.transform.parse;
                if ("all" === this.e) s.cssText = "", i = !0; else for (t = this.e.split(","), r = t.length; --r > -1;)n = t[r], u[n] && (u[n].parse === o ? i = !0 : n = "transformOrigin" === n ? Et : u[n].p), At(s, n);
                i && (At(s, bt), this.t._gsTransform && delete this.t._gsTransform)
            }
        };
        for (mt("clearProps", {
            parser: function (e, t, r, i, s) {
                return s = new ht(e, r, 0, 0, s, 2), s.setRatio = Mt, s.e = t, s.pr = -10, s.data = i._tween, n = !0, s
            }
        }), a = "bezier,throwProps,physicsProps,physics2D".split(","), dt = a.length; dt--;)gt(a[dt]);
        a = o.prototype, a._firstPT = null, a._onInitTween = function (e, t, u) {
            if (!e.nodeType)return !1;
            this._target = e, this._tween = u, this._vars = t, f = t.autoRound, n = !1, r = t.suffixMap || o.suffixMap, i = V(e, ""), s = this._overwriteProps;
            var a, h, d, v, m, g, y, b, w, S = e.style;
            if (l && "" === S.zIndex && (a = $(e, "zIndex", i), ("auto" === a || "" === a) && (S.zIndex = 0)), "string" == typeof t && (v = S.cssText, a = Q(e, i), S.cssText = v + ";" + t, a = G(e, a, Q(e)).difs, !q && E.test(t) && (a.opacity = parseFloat(RegExp.$1)), t = a, S.cssText = v), this._firstPT = h = this.parse(e, t, null), this._transformType) {
                for (w = 3 === this._transformType, bt ? c && (l = !0, "" === S.zIndex && (y = $(e, "zIndex", i), ("auto" === y || "" === y) && (S.zIndex = 0)), p && (S.WebkitBackfaceVisibility = this._vars.WebkitBackfaceVisibility || (w ? "visible" : "hidden"))) : S.zoom = 1, d = h; d && d._next;)d = d._next;
                b = new ht(e, "transform", 0, 0, null, 2), this._linkCSSP(b, null, d), b.setRatio = w && St ? Ct : bt ? kt : Nt, b.data = this._transform || Tt(e, i, !0), s.pop()
            }
            if (n) {
                for (; h;) {
                    for (g = h._next, d = v; d && d.pr > h.pr;)d = d._next;
                    (h._prev = d ? d._prev : m) ? h._prev._next = h : v = h, (h._next = d) ? d._prev = h : m = h, h = g
                }
                this._firstPT = v
            }
            return !0
        }, a.parse = function (e, t, n, s) {
            var o, a, l, c, h, p, d, v, m, g, y = e.style;
            for (o in t)p = t[o], a = u[o], a ? n = a.parse(e, p, o, this, n, s, t) : (h = $(e, o, i) + "", m = "string" == typeof p, "color" === o || "fill" === o || "stroke" === o || -1 !== o.indexOf("Color") || m && x.test(p) ? (m || (p = ut(p), p = (p.length > 3 ? "rgba(" : "rgb(") + p.join(",") + ")"), n = pt(y, o, h, p, !0, "transparent", n, 0, s)) : !m || -1 === p.indexOf(" ") && -1 === p.indexOf(",") ? (l = parseFloat(h), d = l || 0 === l ? h.substr((l + "").length) : "", ("" === h || "auto" === h) && ("width" === o || "height" === o ? (l = et(e, o, i), d = "px") : "left" === o || "top" === o ? (l = K(e, o, i), d = "px") : (l = "opacity" !== o ? 0 : 1, d = "")), g = m && "=" === p.charAt(1), g ? (c = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), c *= parseFloat(p), v = p.replace(b, "")) : (c = parseFloat(p), v = m ? p.substr((c + "").length) || "" : ""), "" === v && (v = o in r ? r[o] : d), p = c || 0 === c ? (g ? c + l : c) + v : t[o], d !== v && "" !== v && (c || 0 === c) && l && (l = J(e, o, l, d), "%" === v ? (l /= J(e, o, 100, "%") / 100, t.strictUnits !== !0 && (h = l + "%")) : "em" === v ? l /= J(e, o, 1, "em") : "px" !== v && (c = J(e, o, c, v), v = "px"), g && (c || 0 === c) && (p = c + l + v)), g && (c += l), !l && 0 !== l || !c && 0 !== c ? void 0 !== y[o] && (p || "NaN" != p + "" && null != p) ? (n = new ht(y, o, c || l || 0, 0, n, -1, o, !1, 0, h, p), n.xs0 = "none" !== p || "display" !== o && -1 === o.indexOf("Style") ? p : h) : U("invalid " + o + " tween value: " + t[o]) : (n = new ht(y, o, l, c - l, n, 0, o, f !== !1 && ("px" === v || "zIndex" === o), 0, h, p), n.xs0 = v)) : n = pt(y, o, h, p, !0, null, n, 0, s)), s && n && !n.plugin && (n.plugin = s);
            return n
        }, a.setRatio = function (e) {
            var t, n, r, i = this._firstPT, s = 1e-6;
            if (1 !== e || this._tween._time !== this._tween._duration && 0 !== this._tween._time)if (e || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -0.000001)for (; i;) {
                if (t = i.c * e + i.s, i.r ? t = Math.round(t) : s > t && t > -s && (t = 0), i.type)if (1 === i.type)if (r = i.l, 2 === r) i.t[i.p] = i.xs0 + t + i.xs1 + i.xn1 + i.xs2; else if (3 === r) i.t[i.p] = i.xs0 + t + i.xs1 + i.xn1 + i.xs2 + i.xn2 + i.xs3; else if (4 === r) i.t[i.p] = i.xs0 + t + i.xs1 + i.xn1 + i.xs2 + i.xn2 + i.xs3 + i.xn3 + i.xs4; else if (5 === r) i.t[i.p] = i.xs0 + t + i.xs1 + i.xn1 + i.xs2 + i.xn2 + i.xs3 + i.xn3 + i.xs4 + i.xn4 + i.xs5; else {
                    for (n = i.xs0 + t + i.xs1, r = 1; i.l > r; r++)n += i["xn" + r] + i["xs" + (r + 1)];
                    i.t[i.p] = n
                } else-1 === i.type ? i.t[i.p] = i.xs0 : i.setRatio && i.setRatio(e); else i.t[i.p] = t + i.xs0;
                i = i._next
            } else for (; i;)2 !== i.type ? i.t[i.p] = i.b : i.setRatio(e), i = i._next; else for (; i;)2 !== i.type ? i.t[i.p] = i.e : i.setRatio(e), i = i._next
        }, a._enableTransforms = function (e) {
            this._transformType = e || 3 === this._transformType ? 3 : 2, this._transform = this._transform || Tt(this._target, i, !0)
        }, a._linkCSSP = function (e, t, n, r) {
            return e && (t && (t._prev = e), e._next && (e._next._prev = e._prev), e._prev ? e._prev._next = e._next : this._firstPT === e && (this._firstPT = e._next, r = !0), n ? n._next = e : r || null !== this._firstPT || (this._firstPT = e), e._next = t, e._prev = n), e
        }, a._kill = function (t) {
            var n, r, i, s = t;
            if (t.autoAlpha || t.alpha) {
                s = {};
                for (r in t)s[r] = t[r];
                s.opacity = 1, s.autoAlpha && (s.visibility = 1)
            }
            return t.className && (n = this._classNamePT) && (i = n.xfirst, i && i._prev ? this._linkCSSP(i._prev, n._next, i._prev._prev) : i === this._firstPT && (this._firstPT = n._next), n._next && this._linkCSSP(n._next, n._next._next, i._prev), this._classNamePT = null), e.prototype._kill.call(this, s)
        };
        var _t = function (e, t, n) {
            var r, i, s, o;
            if (e.slice)for (i = e.length; --i > -1;)_t(e[i], t, n); else for (r = e.childNodes, i = r.length; --i > -1;)s = r[i], o = s.type, s.style && (t.push(Q(s)), n && n.push(s)), 1 !== o && 9 !== o && 11 !== o || !s.childNodes.length || _t(s, t, n)
        };
        return o.cascadeTo = function (e, n, r) {
            var i, s, o, u = t.to(e, n, r), a = [u], f = [], l = [], c = [], h = t._internals.reservedProps;
            for (e = u._targets || u.target, _t(e, f, c), u.render(n, !0), _t(e, l), u.render(0, !0), u._enabled(!0), i = c.length; --i > -1;)if (s = G(c[i], f[i], l[i]), s.firstMPT) {
                s = s.difs;
                for (o in r)h[o] && (s[o] = r[o]);
                a.push(t.to(c[i], n, s))
            }
            return a
        }, e.activate([o]), o
    }, !0)
}), window._gsDefine && window._gsQueue.pop()(), define("CSSPlugin", function () {
}), (window._gsQueue || (window._gsQueue = [])).push(function () {
    "use strict";
    window._gsDefine("easing.Back", ["easing.Ease"], function (e) {
        var t, n, r, i = window.GreenSockGlobals || window, s = i.com.greensock, o = 2 * Math.PI, u = Math.PI / 2,
            a = s._class, f = function (t, n) {
                var r = a("easing." + t, function () {
                }, !0), i = r.prototype = new e;
                return i.constructor = r, i.getRatio = n, r
            }, l = e.register || function () {
                }, c = function (e, t, n, r) {
                var i = a("easing." + e, {easeOut: new t, easeIn: new n, easeInOut: new r}, !0);
                return l(i, e), i
            }, h = function (e, t, n) {
                this.t = e, this.v = t, n && (this.next = n, n.prev = this, this.c = n.v - t, this.gap = n.t - e)
            }, p = function (t, n) {
                var r = a("easing." + t, function (e) {
                    this._p1 = e || 0 === e ? e : 1.70158, this._p2 = 1.525 * this._p1
                }, !0), i = r.prototype = new e;
                return i.constructor = r, i.getRatio = n, i.config = function (e) {
                    return new r(e)
                }, r
            }, d = c("Back", p("BackOut", function (e) {
                return (e -= 1) * e * ((this._p1 + 1) * e + this._p1) + 1
            }), p("BackIn", function (e) {
                return e * e * ((this._p1 + 1) * e - this._p1)
            }), p("BackInOut", function (e) {
                return 1 > (e *= 2) ? .5 * e * e * ((this._p2 + 1) * e - this._p2) : .5 * ((e -= 2) * e * ((this._p2 + 1) * e + this._p2) + 2)
            })), v = a("easing.SlowMo", function (e, t, n) {
                t = t || 0 === t ? t : .7, null == e ? e = .7 : e > 1 && (e = 1), this._p = 1 !== e ? t : 0, this._p1 = (1 - e) / 2, this._p2 = e, this._p3 = this._p1 + this._p2, this._calcEnd = n === !0
            }, !0), m = v.prototype = new e;
        return m.constructor = v, m.getRatio = function (e) {
            var t = e + (.5 - e) * this._p;
            return this._p1 > e ? this._calcEnd ? 1 - (e = 1 - e / this._p1) * e : t - (e = 1 - e / this._p1) * e * e * e * t : e > this._p3 ? this._calcEnd ? 1 - (e = (e - this._p3) / this._p1) * e : t + (e - t) * (e = (e - this._p3) / this._p1) * e * e * e : this._calcEnd ? 1 : t
        }, v.ease = new v(.7, .7), m.config = v.config = function (e, t, n) {
            return new v(e, t, n)
        }, t = a("easing.SteppedEase", function (e) {
            e = e || 1, this._p1 = 1 / e, this._p2 = e + 1
        }, !0), m = t.prototype = new e, m.constructor = t, m.getRatio = function (e) {
            return 0 > e ? e = 0 : e >= 1 && (e = .999999999), (this._p2 * e >> 0) * this._p1
        }, m.config = t.config = function (e) {
            return new t(e)
        }, n = a("easing.RoughEase", function (t) {
            t = t || {};
            for (var n, r, i, s, o, u, a = t.taper || "none", f = [], l = 0, c = 0 | (t.points || 20), p = c,
                     d = t.randomize !== !1, v = t.clamp === !0, m = t.template instanceof e ? t.template : null,
                     g = "number" == typeof t.strength ? .4 * t.strength : .4; --p > -1;)n = d ? Math.random() : 1 / c * p, r = m ? m.getRatio(n) : n, "none" === a ? i = g : "out" === a ? (s = 1 - n, i = s * s * g) : "in" === a ? i = n * n * g : .5 > n ? (s = 2 * n, i = .5 * s * s * g) : (s = 2 * (1 - n), i = .5 * s * s * g), d ? r += Math.random() * i - .5 * i : p % 2 ? r += .5 * i : r -= .5 * i, v && (r > 1 ? r = 1 : 0 > r && (r = 0)), f[l++] = {
                x: n,
                y: r
            };
            for (f.sort(function (e, t) {
                return e.x - t.x
            }), u = new h(1, 1, null), p = c; --p > -1;)o = f[p], u = new h(o.x, o.y, u);
            this._prev = new h(0, 0, 0 !== u.t ? u : u.next)
        }, !0), m = n.prototype = new e, m.constructor = n, m.getRatio = function (e) {
            var t = this._prev;
            if (e > t.t) {
                for (; t.next && e >= t.t;)t = t.next;
                t = t.prev
            } else for (; t.prev && t.t >= e;)t = t.prev;
            return this._prev = t, t.v + (e - t.t) / t.gap * t.c
        }, m.config = function (e) {
            return new n(e)
        }, n.ease = new n, c("Bounce", f("BounceOut", function (e) {
            return 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
        }), f("BounceIn", function (e) {
            return 1 / 2.75 > (e = 1 - e) ? 1 - 7.5625 * e * e : 2 / 2.75 > e ? 1 - (7.5625 * (e -= 1.5 / 2.75) * e + .75) : 2.5 / 2.75 > e ? 1 - (7.5625 * (e -= 2.25 / 2.75) * e + .9375) : 1 - (7.5625 * (e -= 2.625 / 2.75) * e + .984375)
        }), f("BounceInOut", function (e) {
            var t = .5 > e;
            return e = t ? 1 - 2 * e : 2 * e - 1, e = 1 / 2.75 > e ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375, t ? .5 * (1 - e) : .5 * e + .5
        })), c("Circ", f("CircOut", function (e) {
            return Math.sqrt(1 - (e -= 1) * e)
        }), f("CircIn", function (e) {
            return -(Math.sqrt(1 - e * e) - 1)
        }), f("CircInOut", function (e) {
            return 1 > (e *= 2) ? -0.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
        })), r = function (t, n, r) {
            var i = a("easing." + t, function (e, t) {
                this._p1 = e || 1, this._p2 = t || r, this._p3 = this._p2 / o * (Math.asin(1 / this._p1) || 0)
            }, !0), s = i.prototype = new e;
            return s.constructor = i, s.getRatio = n, s.config = function (e, t) {
                return new i(e, t)
            }, i
        }, c("Elastic", r("ElasticOut", function (e) {
            return this._p1 * Math.pow(2, -10 * e) * Math.sin((e - this._p3) * o / this._p2) + 1
        }, .3), r("ElasticIn", function (e) {
            return -(this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * o / this._p2))
        }, .3), r("ElasticInOut", function (e) {
            return 1 > (e *= 2) ? -0.5 * this._p1 * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - this._p3) * o / this._p2) : .5 * this._p1 * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - this._p3) * o / this._p2) + 1
        }, .45)), c("Expo", f("ExpoOut", function (e) {
            return 1 - Math.pow(2, -10 * e)
        }), f("ExpoIn", function (e) {
            return Math.pow(2, 10 * (e - 1)) - .001
        }), f("ExpoInOut", function (e) {
            return 1 > (e *= 2) ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (2 - Math.pow(2, -10 * (e - 1)))
        })), c("Sine", f("SineOut", function (e) {
            return Math.sin(e * u)
        }), f("SineIn", function (e) {
            return -Math.cos(e * u) + 1
        }), f("SineInOut", function (e) {
            return -0.5 * (Math.cos(Math.PI * e) - 1)
        })), a("easing.EaseLookup", {
            find: function (t) {
                return e.map[t]
            }
        }, !0), l(i.SlowMo, "SlowMo", "ease,"), l(n, "RoughEase", "ease,"), l(t, "SteppedEase", "ease,"), d
    }, !0)
}), window._gsDefine && window._gsQueue.pop()(), define("Ease", function () {
}), (window._gsQueue || (window._gsQueue = [])).push(function () {
    "use strict";
    var e = document.documentElement, t = window, n = function (n, r) {
        var i = "x" === r ? "Width" : "Height", s = "scroll" + i, o = "client" + i, u = document.body;
        return n === t || n === e || n === u ? Math.max(e[s], u[s]) - (t["inner" + i] || Math.max(e[o], u[o])) : n[s] - n["offset" + i]
    }, r = window._gsDefine.plugin({
        propName: "scrollTo", API: 2, version: "1.7.3", init: function (e, r, i) {
            return this._wdw = e === t, this._target = e, this._tween = i, "object" != typeof r && (r = {y: r}), this._autoKill = r.autoKill !== !1, this.x = this.xPrev = this.getX(), this.y = this.yPrev = this.getY(), null != r.x ? (this._addTween(this, "x", this.x, "max" === r.x ? n(e, "x") : r.x, "scrollTo_x", !0), this._overwriteProps.push("scrollTo_x")) : this.skipX = !0, null != r.y ? (this._addTween(this, "y", this.y, "max" === r.y ? n(e, "y") : r.y, "scrollTo_y", !0), this._overwriteProps.push("scrollTo_y")) : this.skipY = !0, !0
        }, set: function (e) {
            this._super.setRatio.call(this, e);
            var r = this._wdw || !this.skipX ? this.getX() : this.xPrev,
                i = this._wdw || !this.skipY ? this.getY() : this.yPrev, s = i - this.yPrev, o = r - this.xPrev;
            this._autoKill && (!this.skipX && (o > 7 || -7 > o) && n(this._target, "x") > r && (this.skipX = !0), !this.skipY && (s > 7 || -7 > s) && n(this._target, "y") > i && (this.skipY = !0), this.skipX && this.skipY && this._tween.kill()), this._wdw ? t.scrollTo(this.skipX ? r : this.x, this.skipY ? i : this.y) : (this.skipY || (this._target.scrollTop = this.y), this.skipX || (this._target.scrollLeft = this.x)), this.xPrev = this.x, this.yPrev = this.y
        }
    }), i = r.prototype;
    r.max = n, i.getX = function () {
        return this._wdw ? null != t.pageXOffset ? t.pageXOffset : null != e.scrollLeft ? e.scrollLeft : document.body.scrollLeft : this._target.scrollLeft
    }, i.getY = function () {
        return this._wdw ? null != t.pageYOffset ? t.pageYOffset : null != e.scrollTop ? e.scrollTop : document.body.scrollTop : this._target.scrollTop
    }, i._kill = function (e) {
        return e.scrollTo_x && (this.skipX = !0), e.scrollTo_y && (this.skipY = !0), this._super._kill.call(this, e)
    }
}), window._gsDefine && window._gsQueue.pop()(), define("ScrollToPlugin", function () {
}), function (e) {
    "use strict";
    var t = e.GreenSockGlobals || e;
    if (!t.TweenLite) {
        var n, r, i, s, o, u = function (e) {
            var n, r = e.split("."), i = t;
            for (n = 0; r.length > n; n++)i[r[n]] = i = i[r[n]] || {};
            return i
        }, a = u("com.greensock"), f = 1e-10, l = [].slice, c = function () {
        }, h = function () {
            var e = Object.prototype.toString, t = e.call([]);
            return function (n) {
                return null != n && (n instanceof Array || "object" == typeof n && !!n.push && e.call(n) === t)
            }
        }(), p = {}, d = function (n, r, i, s) {
            this.sc = p[n] ? p[n].sc : [], p[n] = this, this.gsClass = null, this.func = i;
            var o = [];
            this.check = function (a) {
                for (var f, l, c, h, v = r.length,
                         m = v; --v > -1;)(f = p[r[v]] || new d(r[v], [])).gsClass ? (o[v] = f.gsClass, m--) : a && f.sc.push(this);
                if (0 === m && i)for (l = ("com.greensock." + n).split("."), c = l.pop(), h = u(l.join("."))[c] = this.gsClass = i.apply(i, o), s && (t[c] = h, "function" == typeof define && define.amd ? define((e.GreenSockAMDPath ? e.GreenSockAMDPath + "/" : "") + n.split(".").join("/"), [], function () {
                    return h
                }) : "undefined" != typeof module && module.exports && (module.exports = h)), v = 0; this.sc.length > v; v++)this.sc[v].check()
            }, this.check(!0)
        }, v = e._gsDefine = function (e, t, n, r) {
            return new d(e, t, n, r)
        }, m = a._class = function (e, t, n) {
            return t = t || function () {
                }, v(e, [], function () {
                return t
            }, n), t
        };
        v.globals = t;
        var g = [0, 0, 1, 1], y = [], b = m("easing.Ease", function (e, t, n, r) {
            this._func = e, this._type = n || 0, this._power = r || 0, this._params = t ? g.concat(t) : g
        }, !0), w = b.map = {}, E = b.register = function (e, t, n, r) {
            for (var i, s, o, u, f = t.split(","), l = f.length,
                     c = (n || "easeIn,easeOut,easeInOut").split(","); --l > -1;)for (s = f[l], i = r ? m("easing." + s, null, !0) : a.easing[s] || {}, o = c.length; --o > -1;)u = c[o], w[s + "." + u] = w[u + s] = i[u] = e.getRatio ? e : e[u] || new e
        };
        for (i = b.prototype, i._calcEnd = !1, i.getRatio = function (e) {
            if (this._func)return this._params[0] = e, this._func.apply(null, this._params);
            var t = this._type, n = this._power, r = 1 === t ? 1 - e : 2 === t ? e : .5 > e ? 2 * e : 2 * (1 - e);
            return 1 === n ? r *= r : 2 === n ? r *= r * r : 3 === n ? r *= r * r * r : 4 === n && (r *= r * r * r * r), 1 === t ? 1 - r : 2 === t ? r : .5 > e ? r / 2 : 1 - r / 2
        }, n = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], r = n.length; --r > -1;)i = n[r] + ",Power" + r, E(new b(null, null, 1, r), i, "easeOut", !0), E(new b(null, null, 2, r), i, "easeIn" + (0 === r ? ",easeNone" : "")), E(new b(null, null, 3, r), i, "easeInOut");
        w.linear = a.easing.Linear.easeIn, w.swing = a.easing.Quad.easeInOut;
        var S = m("events.EventDispatcher", function (e) {
            this._listeners = {}, this._eventTarget = e || this
        });
        i = S.prototype, i.addEventListener = function (e, t, n, r, i) {
            i = i || 0;
            var u, a, f = this._listeners[e], l = 0;
            for (null == f && (this._listeners[e] = f = []), a = f.length; --a > -1;)u = f[a], u.c === t && u.s === n ? f.splice(a, 1) : 0 === l && i > u.pr && (l = a + 1);
            f.splice(l, 0, {c: t, s: n, up: r, pr: i}), this !== s || o || s.wake()
        }, i.removeEventListener = function (e, t) {
            var n, r = this._listeners[e];
            if (r)for (n = r.length; --n > -1;)if (r[n].c === t)return r.splice(n, 1), void 0
        }, i.dispatchEvent = function (e) {
            var t, n, r, i = this._listeners[e];
            if (i)for (t = i.length, n = this._eventTarget; --t > -1;)r = i[t], r.up ? r.c.call(r.s || n, {
                type: e,
                target: n
            }) : r.c.call(r.s || n)
        };
        var x = e.requestAnimationFrame, T = e.cancelAnimationFrame, N = Date.now || function () {
                return (new Date).getTime()
            }, C = N();
        for (n = ["ms", "moz", "webkit", "o"], r = n.length; --r > -1 && !x;)x = e[n[r] + "RequestAnimationFrame"], T = e[n[r] + "CancelAnimationFrame"] || e[n[r] + "CancelRequestAnimationFrame"];
        m("Ticker", function (e, t) {
            var n, r, i, u, a, f = this, l = N(), h = t !== !1 && x, p = function (e) {
                C = N(), f.time = (C - l) / 1e3;
                var t, s = f.time - a;
                (!n || s > 0 || e === !0) && (f.frame++, a += s + (s >= u ? .004 : u - s), t = !0), e !== !0 && (i = r(p)), t && f.dispatchEvent("tick")
            };
            S.call(f), f.time = f.frame = 0, f.tick = function () {
                p(!0)
            }, f.sleep = function () {
                null != i && (h && T ? T(i) : clearTimeout(i), r = c, i = null, f === s && (o = !1))
            }, f.wake = function () {
                null !== i && f.sleep(), r = 0 === n ? c : h && x ? x : function (e) {
                    return setTimeout(e, 0 | 1e3 * (a - f.time) + 1)
                }, f === s && (o = !0), p(2)
            }, f.fps = function (e) {
                return arguments.length ? (n = e, u = 1 / (n || 60), a = this.time + u, f.wake(), void 0) : n
            }, f.useRAF = function (e) {
                return arguments.length ? (f.sleep(), h = e, f.fps(n), void 0) : h
            }, f.fps(e), setTimeout(function () {
                h && (!i || 5 > f.frame) && f.useRAF(!1)
            }, 1500)
        }), i = a.Ticker.prototype = new a.events.EventDispatcher, i.constructor = a.Ticker;
        var k = m("core.Animation", function (e, t) {
            if (this.vars = t = t || {}, this._duration = this._totalDuration = e || 0, this._delay = Number(t.delay) || 0, this._timeScale = 1, this._active = t.immediateRender === !0, this.data = t.data, this._reversed = t.reversed === !0, q) {
                o || s.wake();
                var n = this.vars.useFrames ? I : q;
                n.add(this, n._time), this.vars.paused && this.paused(!0)
            }
        });
        s = k.ticker = new a.Ticker, i = k.prototype, i._dirty = i._gc = i._initted = i._paused = !1, i._totalTime = i._time = 0, i._rawPrevTime = -1, i._next = i._last = i._onUpdate = i._timeline = i.timeline = null, i._paused = !1;
        var L = function () {
            o && N() - C > 2e3 && s.wake(), setTimeout(L, 2e3)
        };
        L(), i.play = function (e, t) {
            return null != e && this.seek(e, t), this.reversed(!1).paused(!1)
        }, i.pause = function (e, t) {
            return null != e && this.seek(e, t), this.paused(!0)
        }, i.resume = function (e, t) {
            return null != e && this.seek(e, t), this.paused(!1)
        }, i.seek = function (e, t) {
            return this.totalTime(Number(e), t !== !1)
        }, i.restart = function (e, t) {
            return this.reversed(!1).paused(!1).totalTime(e ? -this._delay : 0, t !== !1, !0)
        }, i.reverse = function (e, t) {
            return null != e && this.seek(e || this.totalDuration(), t), this.reversed(!0).paused(!1)
        }, i.render = function () {
        }, i.invalidate = function () {
            return this
        }, i.isActive = function () {
            var e, t = this._timeline, n = this._startTime;
            return !t || !this._gc && !this._paused && t.isActive() && (e = t.rawTime()) >= n && n + this.totalDuration() / this._timeScale > e
        }, i._enabled = function (e, t) {
            return o || s.wake(), this._gc = !e, this._active = this.isActive(), t !== !0 && (e && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !e && this.timeline && this._timeline._remove(this, !0)), !1
        }, i._kill = function () {
            return this._enabled(!1, !1)
        }, i.kill = function (e, t) {
            return this._kill(e, t), this
        }, i._uncache = function (e) {
            for (var t = e ? this : this.timeline; t;)t._dirty = !0, t = t.timeline;
            return this
        }, i._swapSelfInParams = function (e) {
            for (var t = e.length, n = e.concat(); --t > -1;)"{self}" === e[t] && (n[t] = this);
            return n
        }, i.eventCallback = function (e, t, n, r) {
            if ("on" === (e || "").substr(0, 2)) {
                var i = this.vars;
                if (1 === arguments.length)return i[e];
                null == t ? delete i[e] : (i[e] = t, i[e + "Params"] = h(n) && -1 !== n.join("").indexOf("{self}") ? this._swapSelfInParams(n) : n, i[e + "Scope"] = r), "onUpdate" === e && (this._onUpdate = t)
            }
            return this
        }, i.delay = function (e) {
            return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + e - this._delay), this._delay = e, this) : this._delay
        }, i.duration = function (e) {
            return arguments.length ? (this._duration = this._totalDuration = e, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== e && this.totalTime(this._totalTime * (e / this._duration), !0), this) : (this._dirty = !1, this._duration)
        }, i.totalDuration = function (e) {
            return this._dirty = !1, arguments.length ? this.duration(e) : this._totalDuration
        }, i.time = function (e, t) {
            return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(e > this._duration ? this._duration : e, t)) : this._time
        }, i.totalTime = function (e, t, n) {
            if (o || s.wake(), !arguments.length)return this._totalTime;
            if (this._timeline) {
                if (0 > e && !n && (e += this.totalDuration()), this._timeline.smoothChildTiming) {
                    this._dirty && this.totalDuration();
                    var r = this._totalDuration, i = this._timeline;
                    if (e > r && !n && (e = r), this._startTime = (this._paused ? this._pauseTime : i._time) - (this._reversed ? r - e : e) / this._timeScale, i._dirty || this._uncache(!1), i._timeline)for (; i._timeline;)i._timeline._time !== (i._startTime + i._totalTime) / i._timeScale && i.totalTime(i._totalTime, !0), i = i._timeline
                }
                this._gc && this._enabled(!0, !1), (this._totalTime !== e || 0 === this._duration) && this.render(e, t, !1)
            }
            return this
        }, i.progress = i.totalProgress = function (e, t) {
            return arguments.length ? this.totalTime(this.duration() * e, t) : this._time / this.duration()
        }, i.startTime = function (e) {
            return arguments.length ? (e !== this._startTime && (this._startTime = e, this.timeline && this.timeline._sortChildren && this.timeline.add(this, e - this._delay)), this) : this._startTime
        }, i.timeScale = function (e) {
            if (!arguments.length)return this._timeScale;
            if (e = e || f, this._timeline && this._timeline.smoothChildTiming) {
                var t = this._pauseTime, n = t || 0 === t ? t : this._timeline.totalTime();
                this._startTime = n - (n - this._startTime) * this._timeScale / e
            }
            return this._timeScale = e, this._uncache(!1)
        }, i.reversed = function (e) {
            return arguments.length ? (e != this._reversed && (this._reversed = e, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
        }, i.paused = function (e) {
            if (!arguments.length)return this._paused;
            if (e != this._paused && this._timeline) {
                o || e || s.wake();
                var t = this._timeline, n = t.rawTime(), r = n - this._pauseTime;
                !e && t.smoothChildTiming && (this._startTime += r, this._uncache(!1)), this._pauseTime = e ? n : null, this._paused = e, this._active = this.isActive(), !e && 0 !== r && this._initted && this.duration() && this.render(t.smoothChildTiming ? this._totalTime : (n - this._startTime) / this._timeScale, !0, !0)
            }
            return this._gc && !e && this._enabled(!0, !1), this
        };
        var A = m("core.SimpleTimeline", function (e) {
            k.call(this, 0, e), this.autoRemoveChildren = this.smoothChildTiming = !0
        });
        i = A.prototype = new k, i.constructor = A, i.kill()._gc = !1, i._first = i._last = null, i._sortChildren = !1, i.add = i.insert = function (e, t) {
            var n, r;
            if (e._startTime = Number(t || 0) + e._delay, e._paused && this !== e._timeline && (e._pauseTime = e._startTime + (this.rawTime() - e._startTime) / e._timeScale), e.timeline && e.timeline._remove(e, !0), e.timeline = e._timeline = this, e._gc && e._enabled(!0, !0), n = this._last, this._sortChildren)for (r = e._startTime; n && n._startTime > r;)n = n._prev;
            return n ? (e._next = n._next, n._next = e) : (e._next = this._first, this._first = e), e._next ? e._next._prev = e : this._last = e, e._prev = n, this._timeline && this._uncache(!0), this
        }, i._remove = function (e, t) {
            return e.timeline === this && (t || e._enabled(!1, !0), e.timeline = null, e._prev ? e._prev._next = e._next : this._first === e && (this._first = e._next), e._next ? e._next._prev = e._prev : this._last === e && (this._last = e._prev), this._timeline && this._uncache(!0)), this
        }, i.render = function (e, t, n) {
            var r, i = this._first;
            for (this._totalTime = this._time = this._rawPrevTime = e; i;)r = i._next, (i._active || e >= i._startTime && !i._paused) && (i._reversed ? i.render((i._dirty ? i.totalDuration() : i._totalDuration) - (e - i._startTime) * i._timeScale, t, n) : i.render((e - i._startTime) * i._timeScale, t, n)), i = r
        }, i.rawTime = function () {
            return o || s.wake(), this._totalTime
        };
        var O = m("TweenLite", function (t, n, r) {
            if (k.call(this, n, r), this.render = O.prototype.render, null == t)throw"Cannot tween a null target.";
            this.target = t = "string" != typeof t ? t : O.selector(t) || t;
            var i, s, o,
                u = t.jquery || t.length && t !== e && t[0] && (t[0] === e || t[0].nodeType && t[0].style && !t.nodeType),
                a = this.vars.overwrite;
            if (this._overwrite = a = null == a ? F[O.defaultOverwrite] : "number" == typeof a ? a >> 0 : F[a], (u || t instanceof Array || t.push && h(t)) && "number" != typeof t[0])for (this._targets = o = l.call(t, 0), this._propLookup = [], this._siblings = [], i = 0; o.length > i; i++)s = o[i], s ? "string" != typeof s ? s.length && s !== e && s[0] && (s[0] === e || s[0].nodeType && s[0].style && !s.nodeType) ? (o.splice(i--, 1), this._targets = o = o.concat(l.call(s, 0))) : (this._siblings[i] = R(s, this, !1), 1 === a && this._siblings[i].length > 1 && U(s, this, null, 1, this._siblings[i])) : (s = o[i--] = O.selector(s), "string" == typeof s && o.splice(i + 1, 1)) : o.splice(i--, 1); else this._propLookup = {}, this._siblings = R(t, this, !1), 1 === a && this._siblings.length > 1 && U(t, this, null, 1, this._siblings);
            (this.vars.immediateRender || 0 === n && 0 === this._delay && this.vars.immediateRender !== !1) && this.render(-this._delay, !1, !0)
        }, !0), M = function (t) {
            return t.length && t !== e && t[0] && (t[0] === e || t[0].nodeType && t[0].style && !t.nodeType)
        }, _ = function (e, t) {
            var n, r = {};
            for (n in e)j[n] || n in t && "x" !== n && "y" !== n && "width" !== n && "height" !== n && "className" !== n && "border" !== n || !(!P[n] || P[n] && P[n]._autoCSS) || (r[n] = e[n], delete e[n]);
            e.css = r
        };
        i = O.prototype = new k, i.constructor = O, i.kill()._gc = !1, i.ratio = 0, i._firstPT = i._targets = i._overwrittenProps = i._startAt = null, i._notifyPluginsOfEnabled = !1, O.version = "1.11.8", O.defaultEase = i._ease = new b(null, null, 1, 1), O.defaultOverwrite = "auto", O.ticker = s, O.autoSleep = !0, O.selector = e.$ || e.jQuery || function (t) {
                return e.$ ? (O.selector = e.$, e.$(t)) : e.document ? e.document.getElementById("#" === t.charAt(0) ? t.substr(1) : t) : t
            };
        var D = O._internals = {isArray: h, isSelector: M}, P = O._plugins = {}, H = O._tweenLookup = {}, B = 0,
            j = D.reservedProps = {
                ease: 1,
                delay: 1,
                overwrite: 1,
                onComplete: 1,
                onCompleteParams: 1,
                onCompleteScope: 1,
                useFrames: 1,
                runBackwards: 1,
                startAt: 1,
                onUpdate: 1,
                onUpdateParams: 1,
                onUpdateScope: 1,
                onStart: 1,
                onStartParams: 1,
                onStartScope: 1,
                onReverseComplete: 1,
                onReverseCompleteParams: 1,
                onReverseCompleteScope: 1,
                onRepeat: 1,
                onRepeatParams: 1,
                onRepeatScope: 1,
                easeParams: 1,
                yoyo: 1,
                immediateRender: 1,
                repeat: 1,
                repeatDelay: 1,
                data: 1,
                paused: 1,
                reversed: 1,
                autoCSS: 1
            }, F = {none: 0, all: 1, auto: 2, concurrent: 3, allOnStart: 4, preexisting: 5, "true": 1, "false": 0},
            I = k._rootFramesTimeline = new A, q = k._rootTimeline = new A;
        q._startTime = s.time, I._startTime = s.frame, q._active = I._active = !0, k._updateRoot = function () {
            if (q.render((s.time - q._startTime) * q._timeScale, !1, !1), I.render((s.frame - I._startTime) * I._timeScale, !1, !1), !(s.frame % 120)) {
                var e, t, n;
                for (n in H) {
                    for (t = H[n].tweens, e = t.length; --e > -1;)t[e]._gc && t.splice(e, 1);
                    0 === t.length && delete H[n]
                }
                if (n = q._first, (!n || n._paused) && O.autoSleep && !I._first && 1 === s._listeners.tick.length) {
                    for (; n && n._paused;)n = n._next;
                    n || s.sleep()
                }
            }
        }, s.addEventListener("tick", k._updateRoot);
        var R = function (e, t, n) {
            var r, i, s = e._gsTweenID;
            if (H[s || (e._gsTweenID = s = "t" + B++)] || (H[s] = {
                    target: e,
                    tweens: []
                }), t && (r = H[s].tweens, r[i = r.length] = t, n))for (; --i > -1;)r[i] === t && r.splice(i, 1);
            return H[s].tweens
        }, U = function (e, t, n, r, i) {
            var s, o, u, a;
            if (1 === r || r >= 4) {
                for (a = i.length, s = 0; a > s; s++)if ((u = i[s]) !== t) u._gc || u._enabled(!1, !1) && (o = !0); else if (5 === r)break;
                return o
            }
            var l, c = t._startTime + f, h = [], p = 0, d = 0 === t._duration;
            for (s = i.length; --s > -1;)(u = i[s]) === t || u._gc || u._paused || (u._timeline !== t._timeline ? (l = l || z(t, 0, d), 0 === z(u, l, d) && (h[p++] = u)) : c >= u._startTime && u._startTime + u.totalDuration() / u._timeScale > c && ((d || !u._initted) && 2e-10 >= c - u._startTime || (h[p++] = u)));
            for (s = p; --s > -1;)u = h[s], 2 === r && u._kill(n, e) && (o = !0), (2 !== r || !u._firstPT && u._initted) && u._enabled(!1, !1) && (o = !0);
            return o
        }, z = function (e, t, n) {
            for (var r = e._timeline, i = r._timeScale, s = e._startTime; r._timeline;) {
                if (s += r._startTime, i *= r._timeScale, r._paused)return -100;
                r = r._timeline
            }
            return s /= i, s > t ? s - t : n && s === t || !e._initted && 2 * f > s - t ? f : (s += e.totalDuration() / e._timeScale / i) > t + f ? 0 : s - t - f
        };
        i._init = function () {
            var e, t, n, r, i = this.vars, s = this._overwrittenProps, o = this._duration, u = i.immediateRender,
                a = i.ease;
            if (i.startAt) {
                if (this._startAt && this._startAt.render(-1, !0), i.startAt.overwrite = 0, i.startAt.immediateRender = !0, this._startAt = O.to(this.target, 0, i.startAt), u)if (this._time > 0) this._startAt = null; else if (0 !== o)return
            } else if (i.runBackwards && 0 !== o)if (this._startAt) this._startAt.render(-1, !0), this._startAt = null; else {
                n = {};
                for (r in i)j[r] && "autoCSS" !== r || (n[r] = i[r]);
                if (n.overwrite = 0, n.data = "isFromStart", this._startAt = O.to(this.target, 0, n), i.immediateRender) {
                    if (0 === this._time)return
                } else this._startAt.render(-1, !0)
            }
            if (this._ease = a ? a instanceof b ? i.easeParams instanceof Array ? a.config.apply(a, i.easeParams) : a : "function" == typeof a ? new b(a, i.easeParams) : w[a] || O.defaultEase : O.defaultEase, this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)for (e = this._targets.length; --e > -1;)this._initProps(this._targets[e], this._propLookup[e] = {}, this._siblings[e], s ? s[e] : null) && (t = !0); else t = this._initProps(this.target, this._propLookup, this._siblings, s);
            if (t && O._onPluginEvent("_onInitAllProps", this), s && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), i.runBackwards)for (n = this._firstPT; n;)n.s += n.c, n.c = -n.c, n = n._next;
            this._onUpdate = i.onUpdate, this._initted = !0
        }, i._initProps = function (t, n, r, i) {
            var s, o, u, a, f, l;
            if (null == t)return !1;
            this.vars.css || t.style && t !== e && t.nodeType && P.css && this.vars.autoCSS !== !1 && _(this.vars, t);
            for (s in this.vars) {
                if (l = this.vars[s], j[s]) l && (l instanceof Array || l.push && h(l)) && -1 !== l.join("").indexOf("{self}") && (this.vars[s] = l = this._swapSelfInParams(l, this)); else if (P[s] && (a = new P[s])._onInitTween(t, this.vars[s], this)) {
                    for (this._firstPT = f = {
                        _next: this._firstPT,
                        t: a,
                        p: "setRatio",
                        s: 0,
                        c: 1,
                        f: !0,
                        n: s,
                        pg: !0,
                        pr: a._priority
                    }, o = a._overwriteProps.length; --o > -1;)n[a._overwriteProps[o]] = this._firstPT;
                    (a._priority || a._onInitAllProps) && (u = !0), (a._onDisable || a._onEnable) && (this._notifyPluginsOfEnabled = !0)
                } else this._firstPT = n[s] = f = {
                    _next: this._firstPT,
                    t: t,
                    p: s,
                    f: "function" == typeof t[s],
                    n: s,
                    pg: !1,
                    pr: 0
                }, f.s = f.f ? t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)]() : parseFloat(t[s]), f.c = "string" == typeof l && "=" === l.charAt(1) ? parseInt(l.charAt(0) + "1", 10) * Number(l.substr(2)) : Number(l) - f.s || 0;
                f && f._next && (f._next._prev = f)
            }
            return i && this._kill(i, t) ? this._initProps(t, n, r, i) : this._overwrite > 1 && this._firstPT && r.length > 1 && U(t, this, n, this._overwrite, r) ? (this._kill(n, t), this._initProps(t, n, r, i)) : u
        }, i.render = function (e, t, n) {
            var r, i, s, o, u = this._time, a = this._duration;
            if (e >= a) this._totalTime = this._time = a, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (r = !0, i = "onComplete"), 0 === a && (o = this._rawPrevTime, this._startTime === this._timeline._duration && (e = 0), (0 === e || 0 > o || o === f) && o !== e && (n = !0, o > f && (i = "onReverseComplete")), this._rawPrevTime = o = !t || e || this._rawPrevTime === e ? e : f); else if (1e-7 > e) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== u || 0 === a && this._rawPrevTime > 0 && this._rawPrevTime !== f) && (i = "onReverseComplete", r = this._reversed), 0 > e ? (this._active = !1, 0 === a && (this._rawPrevTime >= 0 && (n = !0), this._rawPrevTime = o = !t || e || this._rawPrevTime === e ? e : f)) : this._initted || (n = !0); else if (this._totalTime = this._time = e, this._easeType) {
                var l = e / a, c = this._easeType, h = this._easePower;
                (1 === c || 3 === c && l >= .5) && (l = 1 - l), 3 === c && (l *= 2), 1 === h ? l *= l : 2 === h ? l *= l * l : 3 === h ? l *= l * l * l : 4 === h && (l *= l * l * l * l), this.ratio = 1 === c ? 1 - l : 2 === c ? l : .5 > e / a ? l / 2 : 1 - l / 2
            } else this.ratio = this._ease.getRatio(e / a);
            if (this._time !== u || n) {
                if (!this._initted) {
                    if (this._init(), !this._initted || this._gc)return;
                    this._time && !r ? this.ratio = this._ease.getRatio(this._time / a) : r && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                }
                for (this._active || !this._paused && this._time !== u && e >= 0 && (this._active = !0), 0 === u && (this._startAt && (e >= 0 ? this._startAt.render(e, t, n) : i || (i = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === a) && (t || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || y))), s = this._firstPT; s;)s.f ? s.t[s.p](s.c * this.ratio + s.s) : s.t[s.p] = s.c * this.ratio + s.s, s = s._next;
                this._onUpdate && (0 > e && this._startAt && this._startTime && this._startAt.render(e, t, n), t || (this._time !== u || r) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || y)), i && (this._gc || (0 > e && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(e, t, n), r && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[i] && this.vars[i].apply(this.vars[i + "Scope"] || this, this.vars[i + "Params"] || y), 0 === a && this._rawPrevTime === f && o !== f && (this._rawPrevTime = 0)))
            }
        }, i._kill = function (e, t) {
            if ("all" === e && (e = null), null != e || null != t && t !== this.target) {
                t = "string" != typeof t ? t || this._targets || this.target : O.selector(t) || t;
                var n, r, i, s, o, u, a, f;
                if ((h(t) || M(t)) && "number" != typeof t[0])for (n = t.length; --n > -1;)this._kill(e, t[n]) && (u = !0); else {
                    if (this._targets) {
                        for (n = this._targets.length; --n > -1;)if (t === this._targets[n]) {
                            o = this._propLookup[n] || {}, this._overwrittenProps = this._overwrittenProps || [], r = this._overwrittenProps[n] = e ? this._overwrittenProps[n] || {} : "all";
                            break
                        }
                    } else {
                        if (t !== this.target)return !1;
                        o = this._propLookup, r = this._overwrittenProps = e ? this._overwrittenProps || {} : "all"
                    }
                    if (o) {
                        a = e || o, f = e !== r && "all" !== r && e !== o && ("object" != typeof e || !e._tempKill);
                        for (i in a)(s = o[i]) && (s.pg && s.t._kill(a) && (u = !0), s.pg && 0 !== s.t._overwriteProps.length || (s._prev ? s._prev._next = s._next : s === this._firstPT && (this._firstPT = s._next), s._next && (s._next._prev = s._prev), s._next = s._prev = null), delete o[i]), f && (r[i] = 1);
                        !this._firstPT && this._initted && this._enabled(!1, !1)
                    }
                }
                return u
            }
            return this._enabled(!1, !1)
        }, i.invalidate = function () {
            return this._notifyPluginsOfEnabled && O._onPluginEvent("_onDisable", this), this._firstPT = null, this._overwrittenProps = null, this._onUpdate = null, this._startAt = null, this._initted = this._active = this._notifyPluginsOfEnabled = !1, this._propLookup = this._targets ? {} : [], this
        }, i._enabled = function (e, t) {
            if (o || s.wake(), e && this._gc) {
                var n, r = this._targets;
                if (r)for (n = r.length; --n > -1;)this._siblings[n] = R(r[n], this, !0); else this._siblings = R(this.target, this, !0)
            }
            return k.prototype._enabled.call(this, e, t), this._notifyPluginsOfEnabled && this._firstPT ? O._onPluginEvent(e ? "_onEnable" : "_onDisable", this) : !1
        }, O.to = function (e, t, n) {
            return new O(e, t, n)
        }, O.from = function (e, t, n) {
            return n.runBackwards = !0, n.immediateRender = 0 != n.immediateRender, new O(e, t, n)
        }, O.fromTo = function (e, t, n, r) {
            return r.startAt = n, r.immediateRender = 0 != r.immediateRender && 0 != n.immediateRender, new O(e, t, r)
        }, O.delayedCall = function (e, t, n, r, i) {
            return new O(t, 0, {
                delay: e,
                onComplete: t,
                onCompleteParams: n,
                onCompleteScope: r,
                onReverseComplete: t,
                onReverseCompleteParams: n,
                onReverseCompleteScope: r,
                immediateRender: !1,
                useFrames: i,
                overwrite: 0
            })
        }, O.set = function (e, t) {
            return new O(e, 0, t)
        }, O.getTweensOf = function (e, t) {
            if (null == e)return [];
            e = "string" != typeof e ? e : O.selector(e) || e;
            var n, r, i, s;
            if ((h(e) || M(e)) && "number" != typeof e[0]) {
                for (n = e.length, r = []; --n > -1;)r = r.concat(O.getTweensOf(e[n], t));
                for (n = r.length; --n > -1;)for (s = r[n], i = n; --i > -1;)s === r[i] && r.splice(n, 1)
            } else for (r = R(e).concat(), n = r.length; --n > -1;)(r[n]._gc || t && !r[n].isActive()) && r.splice(n, 1);
            return r
        }, O.killTweensOf = O.killDelayedCallsTo = function (e, t, n) {
            "object" == typeof t && (n = t, t = !1);
            for (var r = O.getTweensOf(e, t), i = r.length; --i > -1;)r[i]._kill(n, e)
        };
        var W = m("plugins.TweenPlugin", function (e, t) {
            this._overwriteProps = (e || "").split(","), this._propName = this._overwriteProps[0], this._priority = t || 0, this._super = W.prototype
        }, !0);
        if (i = W.prototype, W.version = "1.10.1", W.API = 2, i._firstPT = null, i._addTween = function (e, t, n, r, i, s) {
                var o, u;
                return null != r && (o = "number" == typeof r || "=" !== r.charAt(1) ? Number(r) - n : parseInt(r.charAt(0) + "1", 10) * Number(r.substr(2))) ? (this._firstPT = u = {
                    _next: this._firstPT,
                    t: e,
                    p: t,
                    s: n,
                    c: o,
                    f: "function" == typeof e[t],
                    n: i || t,
                    r: s
                }, u._next && (u._next._prev = u), u) : void 0
            }, i.setRatio = function (e) {
                for (var t, n = this._firstPT,
                         r = 1e-6; n;)t = n.c * e + n.s, n.r ? t = Math.round(t) : r > t && t > -r && (t = 0), n.f ? n.t[n.p](t) : n.t[n.p] = t, n = n._next
            }, i._kill = function (e) {
                var t, n = this._overwriteProps, r = this._firstPT;
                if (null != e[this._propName]) this._overwriteProps = []; else for (t = n.length; --t > -1;)null != e[n[t]] && n.splice(t, 1);
                for (; r;)null != e[r.n] && (r._next && (r._next._prev = r._prev), r._prev ? (r._prev._next = r._next, r._prev = null) : this._firstPT === r && (this._firstPT = r._next)), r = r._next;
                return !1
            }, i._roundProps = function (e, t) {
                for (var n = this._firstPT; n;)(e[this._propName] || null != n.n && e[n.n.split(this._propName + "_").join("")]) && (n.r = t), n = n._next
            }, O._onPluginEvent = function (e, t) {
                var n, r, i, s, o, u = t._firstPT;
                if ("_onInitAllProps" === e) {
                    for (; u;) {
                        for (o = u._next, r = i; r && r.pr > u.pr;)r = r._next;
                        (u._prev = r ? r._prev : s) ? u._prev._next = u : i = u, (u._next = r) ? r._prev = u : s = u, u = o
                    }
                    u = t._firstPT = i
                }
                for (; u;)u.pg && "function" == typeof u.t[e] && u.t[e]() && (n = !0), u = u._next;
                return n
            }, W.activate = function (e) {
                for (var t = e.length; --t > -1;)e[t].API === W.API && (P[(new e[t])._propName] = e[t]);
                return !0
            }, v.plugin = function (e) {
                if (!(e && e.propName && e.init && e.API))throw"illegal plugin definition.";
                var t, n = e.propName, r = e.priority || 0, i = e.overwriteProps, s = {
                    init: "_onInitTween",
                    set: "setRatio",
                    kill: "_kill",
                    round: "_roundProps",
                    initAll: "_onInitAllProps"
                }, o = m("plugins." + n.charAt(0).toUpperCase() + n.substr(1) + "Plugin", function () {
                    W.call(this, n, r), this._overwriteProps = i || []
                }, e.global === !0), u = o.prototype = new W(n);
                u.constructor = o, o.API = e.API;
                for (t in s)"function" == typeof e[t] && (u[s[t]] = e[t]);
                return o.version = e.version, W.activate([o]), o
            }, n = e._gsQueue) {
            for (r = 0; n.length > r; r++)n[r]();
            for (i in p)p[i].func || e.console.log("GSAP encountered missing dependency: com.greensock." + i)
        }
        o = !1
    }
}(window), define("TweenLite", ["CSSPlugin", "Ease", "ScrollToPlugin"], function (e) {
    return function () {
        var t, n;
        return t || e.TweenLite
    }
}(this)), (window._gsQueue || (window._gsQueue = [])).push(function () {
    "use strict";
    window._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (e, t, n) {
        var r = function (e) {
                t.call(this, e), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                var n, r, i = this.vars;
                for (r in i)n = i[r], o(n) && -1 !== n.join("").indexOf("{self}") && (i[r] = this._swapSelfInParams(n));
                o(i.tweens) && this.add(i.tweens, 0, i.align, i.stagger)
            }, i = 1e-10, s = n._internals.isSelector, o = n._internals.isArray, u = [], a = window._gsDefine.globals,
            f = function (e) {
                var t, n = {};
                for (t in e)n[t] = e[t];
                return n
            }, l = function (e, t, n, r) {
                e._timeline.pause(e._startTime), t && t.apply(r || e._timeline, n || u)
            }, c = u.slice, h = r.prototype = new t;
        return r.version = "1.11.8", h.constructor = r, h.kill()._gc = !1, h.to = function (e, t, r, i) {
            var s = r.repeat && a.TweenMax || n;
            return t ? this.add(new s(e, t, r), i) : this.set(e, r, i)
        }, h.from = function (e, t, r, i) {
            return this.add((r.repeat && a.TweenMax || n).from(e, t, r), i)
        }, h.fromTo = function (e, t, r, i, s) {
            var o = i.repeat && a.TweenMax || n;
            return t ? this.add(o.fromTo(e, t, r, i), s) : this.set(e, i, s)
        }, h.staggerTo = function (e, t, i, o, u, a, l, h) {
            var p, d = new r({
                onComplete: a,
                onCompleteParams: l,
                onCompleteScope: h,
                smoothChildTiming: this.smoothChildTiming
            });
            for ("string" == typeof e && (e = n.selector(e) || e), s(e) && (e = c.call(e, 0)), o = o || 0, p = 0; e.length > p; p++)i.startAt && (i.startAt = f(i.startAt)), d.to(e[p], t, f(i), p * o);
            return this.add(d, u)
        }, h.staggerFrom = function (e, t, n, r, i, s, o, u) {
            return n.immediateRender = 0 != n.immediateRender, n.runBackwards = !0, this.staggerTo(e, t, n, r, i, s, o, u)
        }, h.staggerFromTo = function (e, t, n, r, i, s, o, u, a) {
            return r.startAt = n, r.immediateRender = 0 != r.immediateRender && 0 != n.immediateRender, this.staggerTo(e, t, r, i, s, o, u, a)
        }, h.call = function (e, t, r, i) {
            return this.add(n.delayedCall(0, e, t, r), i)
        }, h.set = function (e, t, r) {
            return r = this._parseTimeOrLabel(r, 0, !0), null == t.immediateRender && (t.immediateRender = r === this._time && !this._paused), this.add(new n(e, 0, t), r)
        }, r.exportRoot = function (e, t) {
            e = e || {}, null == e.smoothChildTiming && (e.smoothChildTiming = !0);
            var i, s, o = new r(e), u = o._timeline;
            for (null == t && (t = !0), u._remove(o, !0), o._startTime = 0, o._rawPrevTime = o._time = o._totalTime = u._time, i = u._first; i;)s = i._next, t && i instanceof n && i.target === i.vars.onComplete || o.add(i, i._startTime - i._delay), i = s;
            return u.add(o, 0), o
        }, h.add = function (i, s, u, a) {
            var f, l, c, h, p, d;
            if ("number" != typeof s && (s = this._parseTimeOrLabel(s, 0, !0, i)), !(i instanceof e)) {
                if (i instanceof Array || i && i.push && o(i)) {
                    for (u = u || "normal", a = a || 0, f = s, l = i.length, c = 0; l > c; c++)o(h = i[c]) && (h = new r({tweens: h})), this.add(h, f), "string" != typeof h && "function" != typeof h && ("sequence" === u ? f = h._startTime + h.totalDuration() / h._timeScale : "start" === u && (h._startTime -= h.delay())), f += a;
                    return this._uncache(!0)
                }
                if ("string" == typeof i)return this.addLabel(i, s);
                if ("function" != typeof i)throw"Cannot add " + i + " into the timeline; it is not a tween, timeline, function, or string.";
                i = n.delayedCall(0, i)
            }
            if (t.prototype.add.call(this, i, s), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())for (p = this, d = p.rawTime() > i._startTime; p._timeline;)d && p._timeline.smoothChildTiming ? p.totalTime(p._totalTime, !0) : p._gc && p._enabled(!0, !1), p = p._timeline;
            return this
        }, h.remove = function (t) {
            if (t instanceof e)return this._remove(t, !1);
            if (t instanceof Array || t && t.push && o(t)) {
                for (var n = t.length; --n > -1;)this.remove(t[n]);
                return this
            }
            return "string" == typeof t ? this.removeLabel(t) : this.kill(null, t)
        }, h._remove = function (e, n) {
            t.prototype._remove.call(this, e, n);
            var r = this._last;
            return r ? this._time > r._startTime + r._totalDuration / r._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
        }, h.append = function (e, t) {
            return this.add(e, this._parseTimeOrLabel(null, t, !0, e))
        }, h.insert = h.insertMultiple = function (e, t, n, r) {
            return this.add(e, t || 0, n, r)
        }, h.appendMultiple = function (e, t, n, r) {
            return this.add(e, this._parseTimeOrLabel(null, t, !0, e), n, r)
        }, h.addLabel = function (e, t) {
            return this._labels[e] = this._parseTimeOrLabel(t), this
        }, h.addPause = function (e, t, n, r) {
            return this.call(l, ["{self}", t, n, r], this, e)
        }, h.removeLabel = function (e) {
            return delete this._labels[e], this
        }, h.getLabelTime = function (e) {
            return null != this._labels[e] ? this._labels[e] : -1
        }, h._parseTimeOrLabel = function (t, n, r, i) {
            var s;
            if (i instanceof e && i.timeline === this) this.remove(i); else if (i && (i instanceof Array || i.push && o(i)))for (s = i.length; --s > -1;)i[s] instanceof e && i[s].timeline === this && this.remove(i[s]);
            if ("string" == typeof n)return this._parseTimeOrLabel(n, r && "number" == typeof t && null == this._labels[n] ? t - this.duration() : 0, r);
            if (n = n || 0, "string" != typeof t || !isNaN(t) && null == this._labels[t]) null == t && (t = this.duration()); else {
                if (s = t.indexOf("="), -1 === s)return null == this._labels[t] ? r ? this._labels[t] = this.duration() + n : n : this._labels[t] + n;
                n = parseInt(t.charAt(s - 1) + "1", 10) * Number(t.substr(s + 1)), t = s > 1 ? this._parseTimeOrLabel(t.substr(0, s - 1), 0, r) : this.duration()
            }
            return Number(t) + n
        }, h.seek = function (e, t) {
            return this.totalTime("number" == typeof e ? e : this._parseTimeOrLabel(e), t !== !1)
        }, h.stop = function () {
            return this.paused(!0)
        }, h.gotoAndPlay = function (e, t) {
            return this.play(e, t)
        }, h.gotoAndStop = function (e, t) {
            return this.pause(e, t)
        }, h.render = function (e, t, n) {
            this._gc && this._enabled(!0, !1);
            var r, s, o, a, f, l = this._dirty ? this.totalDuration() : this._totalDuration, c = this._time,
                h = this._startTime, p = this._timeScale, d = this._paused;
            if (e >= l ? (this._totalTime = this._time = l, this._reversed || this._hasPausedChild() || (s = !0, a = "onComplete", 0 === this._duration && (0 === e || 0 > this._rawPrevTime || this._rawPrevTime === i) && this._rawPrevTime !== e && this._first && (f = !0, this._rawPrevTime > i && (a = "onReverseComplete"))), this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : i, e = l + 1e-4) : 1e-7 > e ? (this._totalTime = this._time = 0, (0 !== c || 0 === this._duration && this._rawPrevTime !== i && (this._rawPrevTime > 0 || 0 > e && this._rawPrevTime >= 0)) && (a = "onReverseComplete", s = this._reversed), 0 > e ? (this._active = !1, 0 === this._duration && this._rawPrevTime >= 0 && this._first && (f = !0), this._rawPrevTime = e) : (this._rawPrevTime = this._duration || !t || e || this._rawPrevTime === e ? e : i, e = 0, this._initted || (f = !0))) : this._totalTime = this._time = this._rawPrevTime = e, this._time !== c && this._first || n || f) {
                if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== c && e > 0 && (this._active = !0), 0 === c && this.vars.onStart && 0 !== this._time && (t || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || u)), this._time >= c)for (r = this._first; r && (o = r._next, !this._paused || d);)(r._active || r._startTime <= this._time && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, n) : r.render((e - r._startTime) * r._timeScale, t, n)), r = o; else for (r = this._last; r && (o = r._prev, !this._paused || d);)(r._active || c >= r._startTime && !r._paused && !r._gc) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (e - r._startTime) * r._timeScale, t, n) : r.render((e - r._startTime) * r._timeScale, t, n)), r = o;
                this._onUpdate && (t || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || u)), a && (this._gc || (h === this._startTime || p !== this._timeScale) && (0 === this._time || l >= this.totalDuration()) && (s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !t && this.vars[a] && this.vars[a].apply(this.vars[a + "Scope"] || this, this.vars[a + "Params"] || u)))
            }
        }, h._hasPausedChild = function () {
            for (var e = this._first; e;) {
                if (e._paused || e instanceof r && e._hasPausedChild())return !0;
                e = e._next
            }
            return !1
        }, h.getChildren = function (e, t, r, i) {
            i = i || -9999999999;
            for (var s = [], o = this._first,
                     u = 0; o;)i > o._startTime || (o instanceof n ? t !== !1 && (s[u++] = o) : (r !== !1 && (s[u++] = o), e !== !1 && (s = s.concat(o.getChildren(!0, t, r)), u = s.length))), o = o._next;
            return s
        }, h.getTweensOf = function (e, t) {
            for (var r = n.getTweensOf(e), i = r.length, s = [],
                     o = 0; --i > -1;)(r[i].timeline === this || t && this._contains(r[i])) && (s[o++] = r[i]);
            return s
        }, h._contains = function (e) {
            for (var t = e.timeline; t;) {
                if (t === this)return !0;
                t = t.timeline
            }
            return !1
        }, h.shiftChildren = function (e, t, n) {
            n = n || 0;
            for (var r, i = this._first, s = this._labels; i;)i._startTime >= n && (i._startTime += e), i = i._next;
            if (t)for (r in s)s[r] >= n && (s[r] += e);
            return this._uncache(!0)
        }, h._kill = function (e, t) {
            if (!e && !t)return this._enabled(!1, !1);
            for (var n = t ? this.getTweensOf(t) : this.getChildren(!0, !0, !1), r = n.length,
                     i = !1; --r > -1;)n[r]._kill(e, t) && (i = !0);
            return i
        }, h.clear = function (e) {
            var t = this.getChildren(!1, !0, !0), n = t.length;
            for (this._time = this._totalTime = 0; --n > -1;)t[n]._enabled(!1, !1);
            return e !== !1 && (this._labels = {}), this._uncache(!0)
        }, h.invalidate = function () {
            for (var e = this._first; e;)e.invalidate(), e = e._next;
            return this
        }, h._enabled = function (e, n) {
            if (e === this._gc)for (var r = this._first; r;)r._enabled(e, !0), r = r._next;
            return t.prototype._enabled.call(this, e, n)
        }, h.duration = function (e) {
            return arguments.length ? (0 !== this.duration() && 0 !== e && this.timeScale(this._duration / e), this) : (this._dirty && this.totalDuration(), this._duration)
        }, h.totalDuration = function (e) {
            if (!arguments.length) {
                if (this._dirty) {
                    for (var t, n, r = 0, i = this._last,
                             s = 999999999999; i;)t = i._prev, i._dirty && i.totalDuration(), i._startTime > s && this._sortChildren && !i._paused ? this.add(i, i._startTime - i._delay) : s = i._startTime, 0 > i._startTime && !i._paused && (r -= i._startTime, this._timeline.smoothChildTiming && (this._startTime += i._startTime / this._timeScale), this.shiftChildren(-i._startTime, !1, -9999999999), s = 0), n = i._startTime + i._totalDuration / i._timeScale, n > r && (r = n), i = t;
                    this._duration = this._totalDuration = r, this._dirty = !1
                }
                return this._totalDuration
            }
            return 0 !== this.totalDuration() && 0 !== e && this.timeScale(this._totalDuration / e), this
        }, h.usesFrames = function () {
            for (var t = this._timeline; t._timeline;)t = t._timeline;
            return t === e._rootFramesTimeline
        }, h.rawTime = function () {
            return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
        }, r
    }, !0)
}), window._gsDefine && window._gsQueue.pop()(), define("TimelineLite", ["TweenLite"], function (e) {
    return function () {
        var t, n;
        return t || e.TimelineLite
    }
}(this)), !function (e) {
    if ("object" == typeof exports) module.exports = e(); else if ("function" == typeof define && define.amd) define("Class", e); else {
        var t;
        "undefined" != typeof window ? t = window : "undefined" != typeof global ? t = global : "undefined" != typeof self && (t = self), t.Class = e()
    }
}(function () {
    var e, t, n;
    return function r(e, t, n) {
        function i(o, u) {
            if (!t[o]) {
                if (!e[o]) {
                    var a = typeof require == "function" && require;
                    if (!u && a)return a(o, !0);
                    if (s)return s(o, !0);
                    throw new Error("Cannot find module '" + o + "'")
                }
                var f = t[o] = {exports: {}};
                e[o][0].call(f.exports, function (t) {
                    var n = e[o][1][t];
                    return i(n ? n : t)
                }, f, f.exports, r, e, t, n)
            }
            return t[o].exports
        }

        var s = typeof require == "function" && require;
        for (var o = 0; o < n.length; o++)i(n[o]);
        return i
    }({
        1: [function (e, t, n) {
            var r = e("./baseClass"), i = function (e) {
                var t = undefined;
                e === undefined && (e = {}), e.initialize ? (t = e.initialize, delete e.initialize) : t = function () {
                    Array.prototype.splice.apply(arguments, [0, 0, this]), i.parent.apply(undefined, arguments)
                }, e.Extends !== undefined ? (e.Extends.$$isConstructor = !0, t.prototype = Object.create(e.Extends.prototype), t.$$parentConstructor = e.Extends, delete e.Extends) : (t.prototype = Object.create(r), t.$$parentConstructor = function () {
                }), t.prototype.$$getters = {}, t.prototype.$$setters = {};
                for (var n in e)typeof e[n] == "function" ? (e[n].$$name = n, e[n].$$owner = t.prototype, t.prototype[n] = e[n]) : e[n] && typeof e[n] == "object" && (e[n].get || e[n].set) ? (Object.defineProperty(t.prototype, n, e[n]), e[n].get && (t.prototype.$$getters[n] = e[n].get, e[n].get.$$name = n, e[n].get.$$owner = t.prototype), e[n].set && (t.prototype.$$setters[n] = e[n].set, e[n].set.$$name = n, e[n].set.$$owner = t.prototype)) : t.prototype[n] = e[n];
                t.$$isConstructor = !0;
                for (var n = 1; n < arguments.length; n++)arguments[n].compare(t);
                return t
            };
            i.parent = function (e) {
                var t = i.parent.caller;
                arguments = Array.prototype.slice.apply(arguments, [1]);
                if (t.$$isConstructor)var n = t.$$parentConstructor; else {
                    if (!t.$$name)throw"You cannot call parent here";
                    var r = t.$$name, s = t.$$owner.$$getters[r], o = t.$$owner.$$setters[r];
                    if (arguments.length == 1 && o) {
                        var n = Object.getPrototypeOf(t.$$owner).$$setters[r];
                        if (n === undefined)throw"No setter defined in parent"
                    } else if (arguments.length == 0 && s) {
                        var n = Object.getPrototypeOf(t.$$owner).$$getters[r];
                        if (n === undefined)throw"No getter defined in parent"
                    } else {
                        if (o || s)throw"Incorrect amount of arguments sent to getter or setter";
                        var n = Object.getPrototypeOf(t.$$owner)[r];
                        if (n === undefined)throw"No parent function defined for " + r
                    }
                }
                return n.apply(e, arguments)
            }, t.exports = i
        }, {"./baseClass": 2}], 2: [function (e, t, n) {
            t.exports = {
                parent: function () {
                    if (this.parent.caller.$$isConstructor)var e = this.parent.caller.$$parentConstructor; else {
                        if (!this.parent.caller.$$name)throw"You cannot call parent here";
                        var t = this.parent.caller.$$name, n = this.parent.caller.$$owner.$$getters[t],
                            r = this.parent.caller.$$owner.$$setters[t];
                        if (arguments.length == 1 && r) {
                            var e = Object.getPrototypeOf(this.parent.caller.$$owner).$$setters[t];
                            if (e === undefined)throw"No setter defined in parent"
                        } else if (arguments.length == 0 && n) {
                            var e = Object.getPrototypeOf(this.parent.caller.$$owner).$$getters[t];
                            if (e === undefined)throw"No getter defined in parent"
                        } else {
                            if (r || n)throw"Incorrect amount of arguments sent to getter or setter";
                            var e = Object.getPrototypeOf(this.parent.caller.$$owner)[t];
                            if (e === undefined)throw"No parent function defined for " + t
                        }
                    }
                    return e.apply(this, arguments)
                }
            }
        }, {}]
    }, {}, [1])(1)
}), function (e) {
    function t(e, t, n, r, i) {
        this._listener = t, this._isOnce = n, this.context = r, this._signal = e, this._priority = i || 0
    }

    function n(e, t) {
        if (typeof e != "function")throw Error("listener is a required param of {fn}() and should be a Function.".replace("{fn}", t))
    }

    function r() {
        this._bindings = [], this._prevParams = null;
        var e = this;
        this.dispatch = function () {
            r.prototype.dispatch.apply(e, arguments)
        }
    }

    t.prototype = {
        active: !0, params: null, execute: function (e) {
            var t;
            return this.active && this._listener && (e = this.params ? this.params.concat(e) : e, t = this._listener.apply(this.context, e), this._isOnce && this.detach()), t
        }, detach: function () {
            return this.isBound() ? this._signal.remove(this._listener, this.context) : null
        }, isBound: function () {
            return !!this._signal && !!this._listener
        }, isOnce: function () {
            return this._isOnce
        }, getListener: function () {
            return this._listener
        }, getSignal: function () {
            return this._signal
        }, _destroy: function () {
            delete this._signal, delete this._listener, delete this.context
        }, toString: function () {
            return "[SignalBinding isOnce:" + this._isOnce + ", isBound:" + this.isBound() + ", active:" + this.active + "]"
        }
    }, r.prototype = {
        VERSION: "1.0.0",
        memorize: !1,
        _shouldPropagate: !0,
        active: !0,
        _registerListener: function (e, n, r, i) {
            var s = this._indexOfListener(e, r);
            if (s !== -1) {
                if (e = this._bindings[s], e.isOnce() !== n)throw Error("You cannot add" + (n ? "" : "Once") + "() then add" + (n ? "Once" : "") + "() the same listener without removing the relationship first.")
            } else e = new t(this, e, n, r, i), this._addBinding(e);
            return this.memorize && this._prevParams && e.execute(this._prevParams), e
        },
        _addBinding: function (e) {
            var t = this._bindings.length;
            do--t; while (this._bindings[t] && e._priority <= this._bindings[t]._priority);
            this._bindings.splice(t + 1, 0, e)
        },
        _indexOfListener: function (e, t) {
            for (var n = this._bindings.length,
                     r; n--;)if (r = this._bindings[n], r._listener === e && r.context === t)return n;
            return -1
        },
        has: function (e, t) {
            return this._indexOfListener(e, t) !== -1
        },
        add: function (e, t, r) {
            return n(e, "add"), this._registerListener(e, !1, t, r)
        },
        addOnce: function (e, t, r) {
            return n(e, "addOnce"), this._registerListener(e, !0, t, r)
        },
        remove: function (e, t) {
            n(e, "remove");
            var r = this._indexOfListener(e, t);
            return r !== -1 && (this._bindings[r]._destroy(), this._bindings.splice(r, 1)), e
        },
        removeAll: function () {
            for (var e = this._bindings.length; e--;)this._bindings[e]._destroy();
            this._bindings.length = 0
        },
        getNumListeners: function () {
            return this._bindings.length
        },
        halt: function () {
            this._shouldPropagate = !1
        },
        dispatch: function (e) {
            if (this.active) {
                var t = Array.prototype.slice.call(arguments), n = this._bindings.length, r;
                this.memorize && (this._prevParams = t);
                if (n) {
                    r = this._bindings.slice(), this._shouldPropagate = !0;
                    do n--; while (r[n] && this._shouldPropagate && r[n].execute(t) !== !1)
                }
            }
        },
        forget: function () {
            this._prevParams = null
        },
        dispose: function () {
            this.removeAll(), delete this._bindings, delete this._prevParams
        },
        toString: function () {
            return "[Signal active:" + this.active + " numListeners:" + this.getNumListeners() + "]"
        }
    };
    var i = r;
    i.Signal = r, typeof define == "function" && define.amd ? define("Signal", [], function () {
        return i
    }) : typeof module != "undefined" && module.exports ? module.exports = i : e.signals = i
}(this), define("ui/FadeIn", ["Class", "jquery", "TweenLite", "TimelineLite", "Global"], function (e, t, n, r, i) {
    var s = new e({
        selector: null, initialize: function () {
            var e = this;
            for (var r = 0; r < arguments.length; r++)r == 0 ? this.selector = arguments[r] : this.selector = this.selector.add(arguments[r]), arguments[r].css({opacity: "0"}), n.set(arguments[r], {y: 100});
            t(e.selector).each(function () {
                t(this).each(function (e) {
                    var r = t(this).offset().top + t(this).outerHeight() / 5 - 100,
                        i = t(window).scrollTop() + t(window).height();
                    i > r && n.to(t(this), 1, {y: 0, opacity: 1, clearProps: "transform,opacity"})
                })
            });
            var i = function () {
                var r = null, i = 0;
                t(e.selector).each(function (e) {
                    if (t(this).css("opacity") == 0) {
                        var s = t(this).offset().top + t(this).outerHeight() / 10,
                            o = t(window).scrollTop() + t(window).height();
                        s != r ? (i = 0, r = s) : i++, o > s && (n.to(t(this), 1, {
                            delay: .1 * i,
                            opacity: 1,
                            clearProps: "opacity"
                        }), n.to(t(this), 1, {delay: .1 * i, y: 0, clearProps: "transform", ease: Expo.easeOut}))
                    }
                })
            };
            t(window).off("scroll", _.debounce(i, 50)), t(window).on("scroll", _.debounce(i, 50))
        }
    });
    return s
}), define("Global", ["Class", "jquery", "underscore", "TweenLite", "TimelineLite", "Signal", "ui/FadeIn"], function (e, t, n, r, i, s, o) {
    var u = new e({
        breakPoints: {mobile: 0, tabletPortrait: 768, tabletLandscape: 992, desktop: 1280},
        currentWidthType: 1280,
        width: 1280,
        spinOpts: {lines: 12, length: 10, width: 6, radius: 13},
        pathArray: null,
        firstLevelLocation: null,
        secondLevelLocation: null,
        windowHeight: null,
        newHash: null,
        videoPlaying: !1,
        videoFinished: !1,
        videoInFullScreen: !1,
        onVideoInactive: null,
        coverAnimating: !1,
        menuOpen: !1,
        videoID: "8sdLAHzZVMc",
        now: 0,
        assetsPath: "",
        assetsAutoGeneratedPath: "",
        phpUploadPath: "assetsDropboxSymLink/",
        assetsAutoGeneratedSubPath: "autoAssets/",
        textureNotFound: "",
        particleDBSavePath: "",
        particleDBLoadPath: "",
        aspectRatio: 2,
        mouseStrength: 1,
        FloatArraysSupported: !1,
        isLoading: !1,
        loadingStartedSignal: null,
        loadingFinishedSignal: null,
        noBeforeUnload: null,
        renderText: "HEEEEY.",
        isMobile: !1,
        onResponsiveImgsSrcSet: null,
        onResize: null,
        initialize: function () {
            this.onResponsiveImgsSrcSet = new s, this.onResize = new s
                , this.onVideoInactive = new s, this.onVideoFullScreenChange = new s
                , this.onNavItemClicked = new s, this.navOpened = new s, this.navClosed = new s
                , this.loadingStartedSignal = new s, this.loadingFinishedSignal = new s
                , this.isIOS8 = this.checkIOS8(), this.renderText = frontpage_quote || this.renderText
                , function () {
                var e = 0, t = ["ms", "moz", "webkit", "o"];
                for (var n = 0; n < t.length && !window.requestAnimationFrame; ++n)window.requestAnimationFrame = window[t[n] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[n] + "CancelAnimationFrame"] || window[t[n] + "CancelRequestAnimationFrame"];
                window.requestAnimationFrame || (window.requestAnimationFrame = function (t, n) {
                    var r = (new Date).getTime(), i = Math.max(0, 16 - (r - e)), s = window.setTimeout(function () {
                        t(r + i)
                    }, i);
                    return e = r + i, s
                }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (e) {
                    clearTimeout(e)
                })
            }(), console.clear || (console.clear = function () {
            }), console.trace || (console.trace = function () {
            }), console.group || (console.group = function () {
            }), console.groupCollapsed || (console.groupCollapsed = function () {
            }), console.groupEnd || (console.groupEnd = function () {
            }), console.timeStamp || (console.timeStamp = function () {
            }), console.profile || (console.profile = function () {
            }), console.profileEnd || (console.profileEnd = function () {
            }), console.count || (console.count = function () {
            }), jQuery.fn.center = function (e) {
                return e = e ? this.parent() : window, this.css({
                    position: "fixed",
                    top: (t(e).height() - this.outerHeight()) / 2 + t(e).scrollTop() + "px",
                    left: (t(e).width() - this.outerWidth()) / 2 + t(e).scrollLeft() + "px"
                }), this
            }, this.introTextResized = new s, this.introTextAnimatedIn = new s, this.pathArray = window.location.pathname.split("/"), this.firstLevelLocation = this.pathArray[1], this.secondLevelLocation = this.pathArray[2], this.windowHeight = t(window).height(), this.getWidthType(), t(window).on("beforeunload", function (e) {
                this.noBeforeUnload == null ? r.to(t("body"), .5, {
                    opacity: 0,
                    ease: Linear.easeNone,
                    onComplete: function () {
                        t(window).scrollTop(0)
                    }
                }) : this.noBeforeUnload = null
            }.bind(this)), this.initResponsiveImages(), this.widthRespond = this.widthRespond.bind(this), n.delay(this.widthRespond, 100, "logged later"), t(window).on("resize", this.widthRespond), this.initGifReplace()
        },
        getWidthType: function () {
            var e = this, n = window.innerWidth;
            this.width = t(window).width(), this.height = t(window).height();
            var r;
            return t.each(this.breakPoints, function (e) {
                if (parseInt(this, 10) > n)return !1;
                r = e
            }), e.currentWidthType = r, e.currentWidthType === "desktop" || e.currentWidthType === "tabletLandscape" ? this.isMobile = !1 : this.isMobile = !0, r
        },
        animateHeaderTitle: function (e, n) {
            e = e || 0;
            var r = t(".work-title .inner-holder").width(), s = new i({paused: !0, delay: e});
            s.fromTo(t(".work-title-slash"), .8, {opacity: 0, visibility: "visible", left: -10}, {
                opacity: 1,
                left: 0,
                visibility: "visible",
                ease: Expo.easeOut
            }), s.set(t(".work-title"), {visibility: "visible"}), s.fromTo(t(".work-title .inner-holder"), .8, {
                left: -r,
                visibility: "visible"
            }, {
                left: 0,
                visibility: "visible",
                ease: Expo.easeOut
            }, "-=0.4"), s.fromTo(t(".nav-back-arrow"), .8, {width: 0}, {
                width: 28,
                ease: Expo.easeInOut
            }, "-=0.6"), s.fromTo(t(".nav-back-arrow .icon-arrow-right"), .5, {left: 25, opacity: 0}, {
                left: 0,
                opacity: 1,
                ease: Expo.easeOut
            }, "-=0.4"), n ? s.reverse(0) : s.play()
        },
        onGifClick: function (e) {
            var n = t(e.target);
            n.removeClass("responsive"), n.attr("src", n.data("src-gif"))
        },
        initGifReplace: function () {
            var e = this.imgRespond.bind(this);
            t("body").on("click", "img.gif-replace", this.onGifClick);
            var n = t("main"), r = new Date;
            n.scroll(function () {
                var i = new Date;
                if (i - r > 2e3) {
                    r = i;
                    var s = n.height(), o = !1;
                    t("img.gif-replace:not(.responsive)").each(function () {
                        var e = t(this), n = e.offset().top;
                        if (n < -s || n > s) e.addClass("responsive"), o = !0
                    }), o && e()
                }
            })
        },
        imgRespond: function () {
            var e = this, r = n.keys(this.breakPoints), i = e.currentWidthType, s = r.length;
            t("img.responsive").each(function () {
                var e = t(this);
                if (i !== "mobile" && e.hasClass("gif-replace")) e.removeClass("responsive"), n = e.data("src-gif"); else {
                    var n;
                    for (var o = 0; o < s; o += 1) {
                        var u = r[o];
                        u === i && (n = e.data("src" + i.charAt(0).toUpperCase() + i.slice(1).toLowerCase()))
                    }
                }
                for (var a = 0; a < s; a += 1)e.removeClass("responsive-" + r[a]);
                e.addClass("responsive-" + i), e.attr("src", n)
            }), this.onResponsiveImgsSrcSet.dispatch()
        },
        initResponsiveImages: function () {
            t("img.responsive").each(function () {
                typeof t(this).data("src-mobile") == "undefined" && t(this).data("src-mobile", t(this).attr("src"))
            }), this.onResponsiveImgsSrcSet.dispatch()
        },
        widthRespond: function () {
            0, this.getWidthType(), this.windowHeight = this.height, this.imgRespond()
                , this.onResize.dispatch(this.width, this.height), t(document).trigger("widthRespond")
        },
        setSize: function (e, t) {
            this.width = e === undefined ? window.innerWidth : e
                , this.height = t === undefined ? window.innerHeight : t
                , this.widthHalf = this.width * .5
                , this.heightHalf = this.height * .5
                , this.aspectRatio = this.width / this.height
        },
        checkIOS8: function () {
            var e = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
            return e && parseInt(e[1], 10) >= 8
        }
    });
    return u.instance = new u, u.instance
}), define("ui/BorderButtons", ["Class", "jquery", "TweenLite", "TimelineLite"], function (e, t, n, r) {
    var i = new e({
        width: null,
        height: null,
        paddingX: null,
        paddingY: null,
        direction: null,
        txt: null,
        img: null,
        offset: 3,
        topMask: null,
        rightMask: null,
        bottomMask: null,
        leftMask: null,
        button: null,
        buttonTimeline: null,
        initialize: function (e, t, n, r, i, s, o, u) {
            return this.width = e, this.height = t, this.button = n, this.direction = r, this.txt = i, this.paddingX = s ? s : 0, this.paddingY = o ? o : 0, this.img = u, this.init(), this.animate(), this.button
        },
        init: function () {
            this.txt, this.topMask = t("<div>").addClass("btnBorder").appendTo(this.button), this.rightMask = t("<div>").addClass("btnBorder").appendTo(this.button), this.bottomMask = t("<div>").addClass("btnBorder").appendTo(this.button), this.leftMask = t("<div>").addClass("btnBorder").appendTo(this.button), t(this.button).css({padding: this.paddingY + "px " + this.paddingX + "px"}), this.button.width(this.width), this.button.height(this.height), this.width -= this.offset, this.height -= this.offset, this.img && (this.bg = t("<img>").attr("src", this.img).appendTo(this.button))
        },
        animate: function () {
            var e = .1, t = this.width + this.paddingX * 2;
            this.height = this.height + this.paddingY * 2, this.buttonTimeline = new r({paused: !0}), this.buttonTimeline.add(n.fromTo(this.button, .2, {opacity: 0}, {
                opacity: 100,
                delay: .35
            }));
            switch (this.direction) {
                case"right":
                    this.buttonTimeline.add(n.fromTo(this.topMask, e, {
                        width: t + 4 * this.offset,
                        right: -this.offset,
                        top: -this.offset
                    }, {
                        width: 0,
                        delay: -0.2
                    })), this.buttonTimeline.add(n.fromTo(this.rightMask, e / 2, {
                        height: this.height + 2 * this.offset,
                        left: t + this.offset,
                        bottom: -this.offset
                    }, {height: 0})), this.buttonTimeline.add(n.fromTo(this.bottomMask, e / 1.2, {
                        width: t + this.offset,
                        left: 0,
                        top: this.height + this.offset
                    }, {width: 0})), this.buttonTimeline.add(n.fromTo(this.leftMask, e / 3, {
                        height: this.height + 2 * this.offset,
                        left: -this.offset,
                        top: 0
                    }, {height: 0}));
                    break;
                case"left":
                    this.buttonTimeline.add(n.fromTo(this.topMask, e, {
                        width: t + 4 * this.offset,
                        left: -this.offset,
                        top: -this.offset
                    }, {
                        width: 0,
                        delay: -0.2
                    })), this.buttonTimeline.add(n.fromTo(this.leftMask, e / 2, {
                        height: this.height + 2 * this.offset,
                        left: -this.offset,
                        bottom: -this.offset
                    }, {height: 0})), this.buttonTimeline.add(n.fromTo(this.bottomMask, e / 1.2, {
                        width: t + this.offset,
                        right: 0,
                        top: this.height + this.offset
                    }, {width: 0})), this.buttonTimeline.add(n.fromTo(this.rightMask, e / 3, {
                        height: this.height + 2 * this.offset,
                        left: t + this.offset,
                        top: 0
                    }, {height: 0}));
                    break;
                case"up":
                    this.buttonTimeline.add(n.fromTo(this.rightMask, e / 1.2, {
                        height: this.height + 2 * this.offset,
                        left: t + this.offset,
                        top: 0
                    }, {
                        height: 0,
                        delay: -0.2
                    })), this.buttonTimeline.add(n.fromTo(this.topMask, e, {
                        width: t + 3 * this.offset,
                        left: -this.offset,
                        top: -this.offset
                    }, {
                        width: 0,
                        delay: -0.05
                    })), this.buttonTimeline.add(n.fromTo(this.leftMask, e / 2, {
                        height: this.height + 2 * this.offset,
                        left: -this.offset,
                        bottom: -this.offset
                    }, {height: 0})), this.buttonTimeline.add(n.fromTo(this.bottomMask, e / 1.2, {
                        width: t + 2 * this.offset,
                        right: 0,
                        top: this.height + this.offset
                    }, {width: 0}));
                    break;
                case"down":
                    this.buttonTimeline.add(n.fromTo(this.leftMask, e / 1.2, {
                        height: this.height + 2 * this.offset,
                        left: -this.offset,
                        bottom: 0
                    }, {
                        height: 0,
                        delay: -0.2
                    })), this.buttonTimeline.add(n.fromTo(this.bottomMask, e, {
                        width: t + 2 * this.offset,
                        right: 0,
                        top: this.height + this.offset
                    }, {width: 0})), this.buttonTimeline.add(n.fromTo(this.rightMask, e / 2, {
                        height: this.height + 2 * this.offset,
                        left: t + this.offset,
                        top: 0
                    }, {height: 0})), this.buttonTimeline.add(n.fromTo(this.topMask, e / 1.2, {
                        width: t + 2 * this.offset,
                        left: 0,
                        top: -this.offset
                    }, {width: 0}));
                    break;
                default:
            }
            this.img && this.buttonTimeline.add(n.fromTo(this.bg, .8, {opacity: 0}, {
                opacity: 1,
                delay: -0.1
            })), this.buttonTimeline.play()
        }
    });
    return i
}), define("utils/GA", ["Class", "Global"], function (e, t) {
    "use strict";
    var n, r = new e({
        pageID: null, initialize: function () {
            n = this
        }, init: function () {

        }, setPageID: function (e) {
            this.pageID = e
        }, trackEvent: function () {
            try {
                __gaTracker && __gaTracker("send", {
                    hitType: "event",
                    eventCategory: arguments[0],
                    eventAction: arguments[1],
                    eventLabel: arguments[2]
                })
            } catch (e) {
                0
            }
        }, trackWorkItem: function (e) {
            this.trackEvent("Work", "WorkClick", e.toLowerCase())
        }
    });
    return new r
}), function () {
    function e(e, t) {
        if (e.tagName !== "TABLE")throw new Error("Element must be a table");
        this.init(e, t || {})
    }

    e.prototype = {
        init: function (e, t) {
            var n = this, r;
            this.thead = !1, this.options = t, this.options.d = t.descending || !1, e.rows && e.rows.length > 0 && (e.tHead && e.tHead.rows.length > 0 ? (r = e.tHead.rows[e.tHead.rows.length - 1], n.thead = !0) : r = e.rows[0]);
            if (!r)return;
            var s = function (e) {
                var t = i(u, "tr").getElementsByTagName("th");
                for (var r = 0; r < t.length; r++)(f(t[r], "sort-up") || f(t[r], "sort-down")) && t[r] !== this && (t[r].className = t[r].className.replace(" sort-up", "").replace(" sort-down", ""));
                n.current = this, n.sortTable(this)
            };
            for (var o = 0; o < r.cells.length; o++) {
                var u = r.cells[o];
                f(u, "no-sort") || (u.className = "sort-header", l(u, "click", s))
            }
        }, sortTable: function (e, t) {
            var l = this, c = e.cellIndex, h, p = i(e, "table"), d = "", v = 0;
            if (p.rows.length <= 1)return;
            while (d === "" && v < p.tBodies[0].rows.length) {
                d = s(p.tBodies[0].rows[v].cells[c]), d = u(d);
                if (d.substr(0, 4) === "<!--" || d.length === 0) d = "";
                v++
            }
            if (d === "")return;
            var m = function (e, t) {
                var n = s(e.cells[l.col]).toLowerCase(), r = s(t.cells[l.col]).toLowerCase();
                return n === r ? 0 : n < r ? 1 : -1
            }, g = function (e, t) {
                var n = s(e.cells[l.col]), r = s(t.cells[l.col]);
                return n = a(n), r = a(r), o(r, n)
            }, y = function (e, t) {
                var n = s(e.cells[l.col]).toLowerCase(), i = s(t.cells[l.col]).toLowerCase();
                return r(i) - r(n)
            };
            d.match(/^-?[£\x24Û¢´]\d/) || d.match(/^-?(\d+[,\.]?)+(E[\-+][\d]+)?%?$/) ? h = g : n(d) ? h = y : h = m, this.col = c;
            var b = [], w = 0;
            for (v = 0; v < p.tBodies.length; v++)if (!l.thead)for (w = 1; w < p.tBodies[v].rows.length; w++)b[w - 1] = p.tBodies[v].rows[w]; else for (w = 0; w < p.tBodies[v].rows.length; w++)b[w] = p.tBodies[v].rows[w];
            b.sort(h), t || (l.options.d ? f(e, "sort-up") ? (e.className = e.className.replace(/ sort-up/, ""), e.className += " sort-down") : (e.className = e.className.replace(/ sort-down/, ""), e.className += " sort-up") : f(e, "sort-down") ? (e.className = e.className.replace(/ sort-down/, ""), e.className += " sort-up") : (e.className = e.className.replace(/ sort-up/, ""), e.className += " sort-down")), f(e, "sort-down") && b.reverse();
            for (v = 0; v < b.length; v++)f(b[v], "no-sort") || p.tBodies[0].appendChild(b[v]);
            var E = new CustomEvent("sortComplete");
            document.body.dispatchEvent(E)
        }, refresh: function () {
            this.current !== undefined && this.sortTable(this.current, !0)
        }
    };
    var t = /(January|February|March|April|May|June|July|August|September|October|November|December)/i,
        n = function (e) {
            return e.search(t) !== -1
        }, r = function (e) {
            return e = e.replace(/\-/g, "/"), e = e.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/, "$1/$2/$3"), (new Date(e)).getTime()
        }, i = function (e, t) {
            return e === null ? null : e.nodeType === 1 && e.tagName.toLowerCase() === t.toLowerCase() ? e : i(e.parentNode, t)
        }, s = function (e) {
            var t = this;
            if (typeof e == "string" || typeof e == "undefined")return e;
            var n = e.getAttribute("data-sort") || "";
            if (n)return n;
            if (e.textContent)return e.textContent;
            if (e.innerText)return e.innerText;
            var r = e.childNodes, i = r.length;
            for (var s = 0; s < i; s++)switch (r[s].nodeType) {
                case 1:
                    n += t.getInnerText(r[s]);
                    break;
                case 3:
                    n += r[s].nodeValue
            }
            return n
        }, o = function (e, t) {
            var n = parseFloat(e), r = parseFloat(t);
            return e = isNaN(n) ? 0 : n, t = isNaN(r) ? 0 : r, e - t
        }, u = function (e) {
            return e.replace(/^\s+|\s+$/g, "")
        }, a = function (e) {
            return e.replace(/[^\-?0-9.]/g, "")
        }, f = function (e, t) {
            return (" " + e.className + " ").indexOf(" " + t + " ") > -1
        }, l = function (e, t, n) {
            e.attachEvent ? (e["e" + t + n] = n, e[t + n] = function () {
                e["e" + t + n](window.event)
            }, e.attachEvent("on" + t, e[t + n])) : e.addEventListener(t, n, !1)
        };
    window.Tablesort = e
}(), define("Tablesort", function () {
}), define("Awards", ["Class", "jquery", "underscore", "TweenLite", "TimelineLite", "Global", "ui/FadeIn", "ui/BorderButtons", "utils/GA", "Tablesort"], function (e, t, n, r, i, s, o, u, a) {
    var f = new e({
        mouseX: null,
        mouseY: null,
        lastX: null,
        lastY: null,
        menuItem: null,
        table: null,
        currentHash: null,
        initialize: function () {
            a.setPageID("achievements"), this.table = t("#awardsTable"),
                this.menuItem = t(".single-award-wrap"),
                this.setupTable(),
                this.countAwards(),
                this.onAwardHover(),
                this.onProjectHover(),
                this.onMouseMove(),
                this.shimIE(), !s.isMobile;
            var e = this;
            this.menuItem.parent().on("click", function () {
                return e.onAwardClick(this), !1
            }),
            (this.currentHash = window.location.hash) && this.sortByProject(this.currentHash.replace("#", ""))
        },
        setupTable: function () {
            var e = this, n = new Tablesort(document.getElementById("awardsTable"), {descending: !0});
            t(".sort-header:first-child").click().addClass("sort-down"), this.hideYear(), t("body").on("sortComplete", function () {
                e.table.find("tr td:last-child span").css("color", "#555555"), e.hideYear()
            })
        },
        hideYear: function () {
            var e = null, n = null, r = t("#awardsTable tbody tr td:first-child");
            r.each(function () {
                n = t(this).html(), e == n ? t(this).css("visibility", "hidden") : t(this).css("visibility", "visible"), e = n
            })
        },
        countAwards: function () {
            function s(n) {
                var n = n || "Award", r = 0;
                for (var i = 0; i < e.length; i++)e[i] === n && r++;
                r <= 9 ? t("#" + n + " .awardCount").html("0" + r) : t("#" + n + " .awardCount").html(r)
            }

            var e = [];
            this.table.find("tr").each(function () {
                var n = t(this).attr("class");
                e.push(n)
            });
            var r = n.uniq(e);
            for (var i = 0; i < r.length; i++)s(r[i])
        },
        mobile: function () {
            return t(window).width() <= 992
        },
        onMouseMove: function () {
            var e = this;
            t("body").mousemove(function (t) {
                e.lastX = t.clientX, e.lastY = t.clientY
            })
        },
        onAwardClick: function (e) {
            var i = this.table, o = t(e), u = o.data("title");
            a.trackEvent("Achievements", "AchievementClick", u);
            var f = e.id;
            if (!s.isMobile) {
                i.find("tr td:last-child span").css("color", "#555555"), t(".sort-header:first-child").click().addClass("sort-down"), i.find("tr." + f).each(function () {
                    var e = t(this).clone(!0, !0);
                    t(this).remove(), e.prependTo(i)
                }), this.hideYear(), n.delay(function () {
                    t("html, body").animate({scrollTop: i.offset().top - i.find("th").height() - parseInt(i.find("th").css("padding-top")) * 3}, 300)
                }, 300);
                var l = i.find("tr." + f + " td:nth-child(2)").add("tr." + f + " a"),
                    c = i.find("tr." + f + " td:nth-child(4) span"), h = i.find("tr." + f + " td:nth-child(4)");
                r.to(l, .3, {color: "#dd3a20", delay: .8}), r.to(c, .3, {
                    color: "#dd3a20",
                    delay: .8
                }), r.to(h, .3, {color: "#dd3a20", delay: .8}), r.to(l, 1.2, {
                    color: "#555555",
                    delay: 1.2
                }), r.to(h, 1.2, {color: "#555555", delay: 1.2})
            }
        },
        onAwardHover: function () {
            var e = this;
            this.menuItem.hover(function (n) {
                var i = t(this).find(".btn"), s = parseInt(i.css("padding-left")), o = parseInt(i.css("padding-top")),
                    a = parseInt(i.css("border-top-width")), f = i.width() + 2 * (s + a), l = i.html(), c = "right";
                e.mouseX = n.clientX, e.mouseY = n.clientY;
                var h = Math.abs(e.mouseX - e.lastX), p = Math.abs(e.mouseY - e.lastY);
                h > p ? e.mouseX > e.lastX ? c = "right" : e.mouseX < e.lastX && (c = "left") : p > h && (e.mouseY > e.lastY ? c = "down" : e.mouseY < e.lastY && (c = "up")), c === "right" ? r.fromTo(t(this).find(".animatedBG"), .2, {
                    top: 0,
                    left: 0,
                    width: 0,
                    height: "100%"
                }, {width: "100%"}) : c === "left" ? r.fromTo(t(this).find(".animatedBG"), .2, {
                    top: 0,
                    left: "100%",
                    width: 0,
                    height: "100%"
                }, {
                    width: "100%",
                    left: -t(".animatedBG").width()
                }) : c === "down" ? r.fromTo(t(this).find(".animatedBG"), .2, {
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: 0
                }, {height: "100%"}) : c === "up" && r.fromTo(t(this).find(".animatedBG"), .2, {
                        top: "100%",
                        left: 0,
                        width: "100%",
                        height: 0
                    }, {
                        height: "100%",
                        top: -t(".animatedBG").height()
                    }), e.lastX = e.mouseX, e.lastY = e.mouseY, i = new u(41, 16, i, c, l, 20, 12), i.mousedown(function () {
                    r.to(t(this), .2, {background: t(this).css("color"), color: "#fff"}), t(this).mouseup(function () {
                        r.to(t(this), 0, {background: "none", color: t(this).css("border-color"), delay: 1})
                    })
                })
            }, function () {
                r.set(t(this).find(".animatedBG"), {top: 0, left: 0, width: 0, height: 0})
            }), this.menuItem.mouseleave(function () {
                var e = t(this).find(".btnBorder");
                e.remove()
            })
        },
        onProjectHover: function () {
            var e = this.table.find("a"), n = this.getUniqueProjectList(e), i = [];
            for (var s = 0; s < n.length; s++)i.push(t("a#" + n[s]).parent().parent().find(".btn-preview img").attr("src"));
            var o = this.table.find(".btn-preview");
            o.remove(), e.mouseenter(function () {
                var e = t(this).parent().parent();
                r.to(t(this), .4, {color: "#dd3a20"}), r.set(e.find(".underline"), {opacity: 1}), r.fromTo(e.find(".underline"), .2, {width: 0}, {
                    width: "100%",
                    delay: .2
                }), o = new u(150, 88, t("<div class='btn btn-preview'></div>"), "right", "", 0, 0, i[n.indexOf(this.id)]), o.appendTo(e), r.to(o, 3, {
                    opacity: 0,
                    delay: 2
                }), t(this).parent().mouseleave(function () {
                    r.to(t(this).find("a"), .2, {color: "#555555"}), r.to(e.find(".underline"), 0, {opacity: 0}), o.remove()
                })
            })
        },
        sortByProject: function (e) {
            var i = this.table, o = e;
            0;
            if (!s.isMobile) {
                i.find("tr td:last-child span").css("color", "#555555"), t(".sort-header:first-child").click().addClass("sort-down"), i.find("tr[data-awardname=" + o + "]").each(function () {
                    var e = t(this).clone(!0, !0);
                    t(this).remove(), e.prependTo(i)
                }), this.hideYear(), n.delay(function () {
                    t("html, body").animate({scrollTop: i.offset().top - i.find("th").height() - parseInt(i.find("th").css("padding-top")) * 3}, 300)
                }, 300);
                var u = i.find('tr[data-awardname="' + o + '"] td:nth-child(2)'),
                    a = i.find('tr[data-awardname="' + o + '"] td:nth-child(2)').add('tr[data-awardname="' + o + '"] a'),
                    f = i.find('tr[data-awardname="' + o + '"] td:nth-child(4) span'),
                    l = i.find('tr[data-awardname="' + o + '"] td:nth-child(4)');
                r.to(a, .3, {color: "#dd3a20", delay: .8}), r.to(f, .3, {
                    color: "#dd3a20",
                    delay: .8
                }), r.to(l, .3, {color: "#dd3a20", delay: .8}), r.to(u, 1.2, {
                    color: "#555555",
                    delay: 1.2
                }), r.to(f, 1.2, {color: "#555555", delay: 1.2}), r.to(l, 1.2, {color: "#555555", delay: 1.2})
            }
        },
        getUniqueProjectList: function (e) {
            function r(e) {
                var n = [];
                return t.each(e, function (e, r) {
                    t.inArray(r, n) == -1 && n.push(r)
                }), n
            }

            var n = [];
            return e.each(function () {
                n.push(this.id)
            }), n = r(n), n
        },
        shimIE: function () {
            Array.prototype.indexOf || (Array.prototype.indexOf = function (e, t) {
                var n, r = t ? t : 0, i;
                if (!this)throw new TypeError;
                i = this.length;
                if (i === 0 || r >= i)return -1;
                r < 0 && (r = i - Math.abs(r));
                for (n = r; n < i; n++)if (this[n] === e)return n;
                return -1
            })
        }
    });
    return f
}), function (e) {
    function t(t) {
        var n = t || window.event, r = [].slice.call(arguments, 1), i = 0, s = !0, o = 0, u = 0;
        return t = e.event.fix(n), t.type = "mousewheel", n.wheelDelta && (i = n.wheelDelta / 120), n.detail && (i = -n.detail / 3), u = i, n.axis !== undefined && n.axis === n.HORIZONTAL_AXIS && (u = 0, o = -1 * i), n.wheelDeltaY !== undefined && (u = n.wheelDeltaY / 120), n.wheelDeltaX !== undefined && (o = -1 * n.wheelDeltaX / 120), r.unshift(t, i, o, u), (e.event.dispatch || e.event.handle).apply(this, r)
    }

    var n = ["DOMMouseScroll", "mousewheel"];
    if (e.event.fixHooks)for (var r = n.length; r;)e.event.fixHooks[n[--r]] = e.event.mouseHooks;
    e.event.special.mousewheel = {
        setup: function () {
            if (this.addEventListener)for (var e = n.length; e;)this.addEventListener(n[--e], t, !1); else this.onmousewheel = t
        }, teardown: function () {
            if (this.removeEventListener)for (var e = n.length; e;)this.removeEventListener(n[--e], t, !1); else this.onmousewheel = null
        }
    }, e.fn.extend({
        mousewheel: function (e) {
            return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
        }, unmousewheel: function (e) {
            return this.unbind("mousewheel", e)
        }
    })
}(jQuery), function (e) {
    var t = {
        init: function (t) {
            var n = {
                set_width: !1,
                set_height: !1,
                horizontalScroll: !1,
                scrollInertia: 950,
                mouseWheel: !0,
                mouseWheelPixels: "auto",
                autoDraggerLength: !0,
                autoHideScrollbar: !1,
                snapAmount: null,
                snapOffset: 0,
                scrollButtons: {enable: !1, scrollType: "continuous", scrollSpeed: "auto", scrollAmount: 40},
                advanced: {
                    updateOnBrowserResize: !0,
                    updateOnContentResize: !1,
                    autoExpandHorizontalScroll: !1,
                    autoScrollOnFocus: !0,
                    normalizeMouseWheelDelta: !1
                },
                contentTouchScroll: !0,
                callbacks: {
                    onScrollStart: function () {
                    }, onScroll: function () {
                    }, onTotalScroll: function () {
                    }, onTotalScrollBack: function () {
                    }, onTotalScrollOffset: 0, onTotalScrollBackOffset: 0, whileScrolling: function () {
                    }
                },
                theme: "light"
            }, t = e.extend(!0, n, t);
            return this.each(function () {
                var n = e(this);
                t.set_width && n.css("width", t.set_width), t.set_height && n.css("height", t.set_height);
                if (!e(document).data("mCustomScrollbar-index")) e(document).data("mCustomScrollbar-index", "1"); else {
                    var r = parseInt(e(document).data("mCustomScrollbar-index"));
                    e(document).data("mCustomScrollbar-index", r + 1)
                }
                n.wrapInner("<div class='mCustomScrollBox mCS-" + t.theme + "' id='mCSB_" + e(document).data("mCustomScrollbar-index") + "' style='position:relative; height:100%; overflow:hidden; max-width:100%;' />").addClass("mCustomScrollbar _mCS_" + e(document).data("mCustomScrollbar-index"));
                var i = n.children(".mCustomScrollBox");
                if (t.horizontalScroll) {
                    i.addClass("mCSB_horizontal").wrapInner("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />");
                    var s = i.children(".mCSB_h_wrapper");
                    s.wrapInner("<div class='mCSB_container' style='position:absolute; left:0;' />").children(".mCSB_container").css({
                        width: s.children().outerWidth(),
                        position: "relative"
                    }).unwrap()
                } else i.wrapInner("<div class='mCSB_container' style='position:relative; top:0;' />");
                var o = i.children(".mCSB_container");
                e.support.touch && o.addClass("mCS_touch"), o.after("<div class='mCSB_scrollTools' style='position:absolute;'><div class='mCSB_draggerContainer'><div class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' style='position:relative;'></div></div><div class='mCSB_draggerRail'></div></div></div>");
                var u = i.children(".mCSB_scrollTools"), a = u.children(".mCSB_draggerContainer"),
                    f = a.children(".mCSB_dragger");
                t.horizontalScroll ? f.data("minDraggerWidth", f.width()) : f.data("minDraggerHeight", f.height()), t.scrollButtons.enable && (t.horizontalScroll ? u.prepend("<a class='mCSB_buttonLeft' oncontextmenu='return false;'></a>").append("<a class='mCSB_buttonRight' oncontextmenu='return false;'></a>") : u.prepend("<a class='mCSB_buttonUp' oncontextmenu='return false;'></a>").append("<a class='mCSB_buttonDown' oncontextmenu='return false;'></a>")), i.bind("scroll", function () {
                    n.is(".mCS_disabled") || i.scrollTop(0).scrollLeft(0)
                }), n.data({
                    mCS_Init: !0,
                    mCustomScrollbarIndex: e(document).data("mCustomScrollbar-index"),
                    horizontalScroll: t.horizontalScroll,
                    scrollInertia: t.scrollInertia,
                    scrollEasing: "mcsEaseOut",
                    mouseWheel: t.mouseWheel,
                    mouseWheelPixels: t.mouseWheelPixels,
                    autoDraggerLength: t.autoDraggerLength,
                    autoHideScrollbar: t.autoHideScrollbar,
                    snapAmount: t.snapAmount,
                    snapOffset: t.snapOffset,
                    scrollButtons_enable: t.scrollButtons.enable,
                    scrollButtons_scrollType: t.scrollButtons.scrollType,
                    scrollButtons_scrollSpeed: t.scrollButtons.scrollSpeed,
                    scrollButtons_scrollAmount: t.scrollButtons.scrollAmount,
                    autoExpandHorizontalScroll: t.advanced.autoExpandHorizontalScroll,
                    autoScrollOnFocus: t.advanced.autoScrollOnFocus,
                    normalizeMouseWheelDelta: t.advanced.normalizeMouseWheelDelta,
                    contentTouchScroll: t.contentTouchScroll,
                    onScrollStart_Callback: t.callbacks.onScrollStart,
                    onScroll_Callback: t.callbacks.onScroll,
                    onTotalScroll_Callback: t.callbacks.onTotalScroll,
                    onTotalScrollBack_Callback: t.callbacks.onTotalScrollBack,
                    onTotalScroll_Offset: t.callbacks.onTotalScrollOffset,
                    onTotalScrollBack_Offset: t.callbacks.onTotalScrollBackOffset,
                    whileScrolling_Callback: t.callbacks.whileScrolling,
                    bindEvent_scrollbar_drag: !1,
                    bindEvent_content_touch: !1,
                    bindEvent_scrollbar_click: !1,
                    bindEvent_mousewheel: !1,
                    bindEvent_buttonsContinuous_y: !1,
                    bindEvent_buttonsContinuous_x: !1,
                    bindEvent_buttonsPixels_y: !1,
                    bindEvent_buttonsPixels_x: !1,
                    bindEvent_focusin: !1,
                    bindEvent_autoHideScrollbar: !1,
                    mCSB_buttonScrollRight: !1,
                    mCSB_buttonScrollLeft: !1,
                    mCSB_buttonScrollDown: !1,
                    mCSB_buttonScrollUp: !1
                });
                if (t.horizontalScroll) n.css("max-width") !== "none" && (t.advanced.updateOnContentResize || (t.advanced.updateOnContentResize = !0)); else if (n.css("max-height") !== "none") {
                    var l = !1, h = parseInt(n.css("max-height"));
                    n.css("max-height").indexOf("%") >= 0 && (l = h, h = n.parent().height() * l / 100), n.css("overflow", "hidden"), i.css("max-height", h)
                }
                n.mCustomScrollbar("update");
                if (t.advanced.updateOnBrowserResize) {
                    var p, d = e(window).width(), v = e(window).height();
                    e(window).bind("resize." + n.data("mCustomScrollbarIndex"), function () {
                        p && clearTimeout(p), p = setTimeout(function () {
                            if (!n.is(".mCS_disabled") && !n.is(".mCS_destroyed")) {
                                var t = e(window).width(), r = e(window).height();
                                if (d !== t || v !== r) n.css("max-height") !== "none" && l && i.css("max-height", n.parent().height() * l / 100), n.mCustomScrollbar("update"), d = t, v = r
                            }
                        }, 150)
                    })
                }
                if (t.advanced.updateOnContentResize) {
                    var m;
                    if (t.horizontalScroll)var g = o.outerWidth(); else var g = o.outerHeight();
                    m = setInterval(function () {
                        if (t.horizontalScroll) {
                            t.advanced.autoExpandHorizontalScroll && o.css({
                                position: "absolute",
                                width: "auto"
                            }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
                                width: o.outerWidth(),
                                position: "relative"
                            }).unwrap();
                            var e = o.outerWidth()
                        } else var e = o.outerHeight();
                        e != g && (n.mCustomScrollbar("update"), g = e)
                    }, 300)
                }
            })
        }, update: function () {
            var t = e(this), n = t.children(".mCustomScrollBox"), r = n.children(".mCSB_container");
            r.removeClass("mCS_no_scrollbar"), t.removeClass("mCS_disabled mCS_destroyed"), n.scrollTop(0).scrollLeft(0);
            var i = n.children(".mCSB_scrollTools"), s = i.children(".mCSB_draggerContainer"),
                o = s.children(".mCSB_dragger");
            if (t.data("horizontalScroll")) {
                var u = i.children(".mCSB_buttonLeft"), a = i.children(".mCSB_buttonRight"), f = n.width();
                t.data("autoExpandHorizontalScroll") && r.css({
                    position: "absolute",
                    width: "auto"
                }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
                    width: r.outerWidth(),
                    position: "relative"
                }).unwrap();
                var l = r.outerWidth()
            } else var h = i.children(".mCSB_buttonUp"), p = i.children(".mCSB_buttonDown"), d = n.height(),
                v = r.outerHeight();
            if (v > d && !t.data("horizontalScroll")) {
                i.css("display", "block");
                var m = s.height();
                if (t.data("autoDraggerLength")) {
                    var g = Math.round(d / v * m), y = o.data("minDraggerHeight");
                    if (g <= y) o.css({height: y}); else if (g >= m - 10) {
                        var b = m - 10;
                        o.css({height: b})
                    } else o.css({height: g});
                    o.children(".mCSB_dragger_bar").css({"line-height": o.height() + "px"})
                }
                var w = o.height(), E = (v - d) / (m - w);
                t.data("scrollAmount", E).mCustomScrollbar("scrolling", n, r, s, o, h, p, u, a);
                var S = Math.abs(r.position().top);
                t.mCustomScrollbar("scrollTo", S, {scrollInertia: 0, trigger: "internal"})
            } else if (l > f && t.data("horizontalScroll")) {
                i.css("display", "block");
                var x = s.width();
                if (t.data("autoDraggerLength")) {
                    var T = Math.round(f / l * x), N = o.data("minDraggerWidth");
                    if (T <= N) o.css({width: N}); else if (T >= x - 10) {
                        var C = x - 10;
                        o.css({width: C})
                    } else o.css({width: T})
                }
                var k = o.width(), E = (l - f) / (x - k);
                t.data("scrollAmount", E).mCustomScrollbar("scrolling", n, r, s, o, h, p, u, a);
                var S = Math.abs(r.position().left);
                t.mCustomScrollbar("scrollTo", S, {scrollInertia: 0, trigger: "internal"})
            } else n.unbind("mousewheel focusin"), t.data("horizontalScroll") ? o.add(r).css("left", 0) : o.add(r).css("top", 0), i.css("display", "none"), r.addClass("mCS_no_scrollbar"), t.data({
                bindEvent_mousewheel: !1,
                bindEvent_focusin: !1
            })
        }, scrolling: function (t, r, i, s, o, u, a, f) {
            function v(e, t, n, r) {
                l.data("horizontalScroll") ? l.mCustomScrollbar("scrollTo", s.position().left - t + r, {
                    moveDragger: !0,
                    trigger: "internal"
                }) : l.mCustomScrollbar("scrollTo", s.position().top - e + n, {moveDragger: !0, trigger: "internal"})
            }

            var l = e(this);
            if (!l.data("bindEvent_scrollbar_drag")) {
                var h, p;
                e.support.msPointer ? (s.bind("MSPointerDown", function (t) {
                    t.preventDefault(), l.data({on_drag: !0}), s.addClass("mCSB_dragger_onDrag");
                    var n = e(this), r = n.offset(), i = t.originalEvent.pageX - r.left,
                        o = t.originalEvent.pageY - r.top;
                    i < n.width() && i > 0 && o < n.height() && o > 0 && (h = o, p = i)
                }), e(document).bind("MSPointerMove." + l.data("mCustomScrollbarIndex"), function (e) {
                    e.preventDefault();
                    if (l.data("on_drag")) {
                        var t = s, n = t.offset(), r = e.originalEvent.pageX - n.left,
                            i = e.originalEvent.pageY - n.top;
                        v(h, p, i, r)
                    }
                }).bind("MSPointerUp." + l.data("mCustomScrollbarIndex"), function (e) {
                    l.data({on_drag: !1}), s.removeClass("mCSB_dragger_onDrag")
                })) : (s.bind("mousedown touchstart", function (t) {
                    t.preventDefault(), t.stopImmediatePropagation();
                    var n = e(this), r = n.offset(), i, o;
                    if (t.type === "touchstart") {
                        var u = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0];
                        i = u.pageX - r.left, o = u.pageY - r.top
                    } else l.data({on_drag: !0}), s.addClass("mCSB_dragger_onDrag"), i = t.pageX - r.left, o = t.pageY - r.top;
                    i < n.width() && i > 0 && o < n.height() && o > 0 && (h = o, p = i)
                }).bind("touchmove", function (t) {
                    t.preventDefault(), t.stopImmediatePropagation();
                    var n = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0], r = e(this),
                        i = r.offset(), s = n.pageX - i.left, o = n.pageY - i.top;
                    v(h, p, o, s)
                }), e(document).bind("mousemove." + l.data("mCustomScrollbarIndex"), function (e) {
                    if (l.data("on_drag")) {
                        var t = s, n = t.offset(), r = e.pageX - n.left, i = e.pageY - n.top;
                        v(h, p, i, r)
                    }
                }).bind("mouseup." + l.data("mCustomScrollbarIndex"), function (e) {
                    l.data({on_drag: !1}), s.removeClass("mCSB_dragger_onDrag")
                })), l.data({bindEvent_scrollbar_drag: !0})
            }
            if (e.support.touch && l.data("contentTouchScroll") && !l.data("bindEvent_content_touch")) {
                var m, g, y, b, w, E, S;
                r.bind("touchstart", function (t) {
                    t.stopImmediatePropagation(), m = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0], g = e(this), y = g.offset(), w = m.pageX - y.left, b = m.pageY - y.top, E = b, S = w
                }), r.bind("touchmove", function (t) {
                    t.preventDefault(), t.stopImmediatePropagation(), m = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0], g = e(this).parent(), y = g.offset(), w = m.pageX - y.left, b = m.pageY - y.top, l.data("horizontalScroll") ? l.mCustomScrollbar("scrollTo", S - w, {trigger: "internal"}) : l.mCustomScrollbar("scrollTo", E - b, {trigger: "internal"})
                })
            }
            l.data("bindEvent_scrollbar_click") || (i.bind("click", function (t) {
                var n = (t.pageY - i.offset().top) * l.data("scrollAmount"), r = e(t.target);
                l.data("horizontalScroll") && (n = (t.pageX - i.offset().left) * l.data("scrollAmount")), (r.hasClass("mCSB_draggerContainer") || r.hasClass("mCSB_draggerRail")) && l.mCustomScrollbar("scrollTo", n, {
                    trigger: "internal",
                    scrollEasing: "draggerRailEase"
                })
            }), l.data({bindEvent_scrollbar_click: !0})), l.data("mouseWheel") && (l.data("bindEvent_mousewheel") || (t.bind("mousewheel", function (e, t) {
                var n, o = l.data("mouseWheelPixels"), u = Math.abs(r.position().top), a = s.position().top,
                    f = i.height() - s.height();
                l.data("normalizeMouseWheelDelta") && (t < 0 ? t = -1 : t = 1), o === "auto" && (o = 100 + Math.round(l.data("scrollAmount") / 2)), l.data("horizontalScroll") && (a = s.position().left, f = i.width() - s.width(), u = Math.abs(r.position().left));
                if (t > 0 && a !== 0 || t < 0 && a !== f) e.preventDefault(), e.stopImmediatePropagation();
                n = u - t * o, l.mCustomScrollbar("scrollTo", n, {trigger: "internal"})
            }), l.data({bindEvent_mousewheel: !0})));
            if (l.data("scrollButtons_enable"))if (l.data("scrollButtons_scrollType") === "pixels") {
                l.data("horizontalScroll") ? (f.add(a).unbind("mousedown touchstart MSPointerDown mouseup MSPointerUp mouseout MSPointerOut touchend", T, N), l.data({bindEvent_buttonsContinuous_x: !1}), l.data("bindEvent_buttonsPixels_x") || (f.bind("click", function (e) {
                    e.preventDefault(), x(Math.abs(r.position().left) + l.data("scrollButtons_scrollAmount"))
                }), a.bind("click", function (e) {
                    e.preventDefault(), x(Math.abs(r.position().left) - l.data("scrollButtons_scrollAmount"))
                }), l.data({bindEvent_buttonsPixels_x: !0}))) : (u.add(o).unbind("mousedown touchstart MSPointerDown mouseup MSPointerUp mouseout MSPointerOut touchend", T, N), l.data({bindEvent_buttonsContinuous_y: !1}), l.data("bindEvent_buttonsPixels_y") || (u.bind("click", function (e) {
                    e.preventDefault(), x(Math.abs(r.position().top) + l.data("scrollButtons_scrollAmount"))
                }), o.bind("click", function (e) {
                    e.preventDefault(), x(Math.abs(r.position().top) - l.data("scrollButtons_scrollAmount"))
                }), l.data({bindEvent_buttonsPixels_y: !0})));
                function x(e) {
                    s.data("preventAction") || (s.data("preventAction", !0), l.mCustomScrollbar("scrollTo", e, {trigger: "internal"}))
                }
            } else {
                if (l.data("horizontalScroll")) {
                    f.add(a).unbind("click"), l.data({bindEvent_buttonsPixels_x: !1});
                    if (!l.data("bindEvent_buttonsContinuous_x")) {
                        f.bind("mousedown touchstart MSPointerDown", function (e) {
                            e.preventDefault();
                            var t = L();
                            l.data({
                                mCSB_buttonScrollRight: setInterval(function () {
                                    l.mCustomScrollbar("scrollTo", Math.abs(r.position().left) + t, {
                                        trigger: "internal",
                                        scrollEasing: "easeOutCirc"
                                    })
                                }, 17)
                            })
                        });
                        var T = function (e) {
                            e.preventDefault(), clearInterval(l.data("mCSB_buttonScrollRight"))
                        };
                        f.bind("mouseup touchend MSPointerUp mouseout MSPointerOut", T), a.bind("mousedown touchstart MSPointerDown", function (e) {
                            e.preventDefault();
                            var t = L();
                            l.data({
                                mCSB_buttonScrollLeft: setInterval(function () {
                                    l.mCustomScrollbar("scrollTo", Math.abs(r.position().left) - t, {
                                        trigger: "internal",
                                        scrollEasing: "easeOutCirc"
                                    })
                                }, 17)
                            })
                        });
                        var N = function (e) {
                            e.preventDefault(), clearInterval(l.data("mCSB_buttonScrollLeft"))
                        };
                        a.bind("mouseup touchend MSPointerUp mouseout MSPointerOut", N), l.data({bindEvent_buttonsContinuous_x: !0})
                    }
                } else {
                    u.add(o).unbind("click"), l.data({bindEvent_buttonsPixels_y: !1});
                    if (!l.data("bindEvent_buttonsContinuous_y")) {
                        u.bind("mousedown touchstart MSPointerDown", function (e) {
                            e.preventDefault();
                            var t = L();
                            l.data({
                                mCSB_buttonScrollDown: setInterval(function () {
                                    l.mCustomScrollbar("scrollTo", Math.abs(r.position().top) + t, {
                                        trigger: "internal",
                                        scrollEasing: "easeOutCirc"
                                    })
                                }, 17)
                            })
                        });
                        var C = function (e) {
                            e.preventDefault(), clearInterval(l.data("mCSB_buttonScrollDown"))
                        };
                        u.bind("mouseup touchend MSPointerUp mouseout MSPointerOut", C), o.bind("mousedown touchstart MSPointerDown", function (e) {
                            e.preventDefault();
                            var t = L();
                            l.data({
                                mCSB_buttonScrollUp: setInterval(function () {
                                    l.mCustomScrollbar("scrollTo", Math.abs(r.position().top) - t, {
                                        trigger: "internal",
                                        scrollEasing: "easeOutCirc"
                                    })
                                }, 17)
                            })
                        });
                        var k = function (e) {
                            e.preventDefault(), clearInterval(l.data("mCSB_buttonScrollUp"))
                        };
                        o.bind("mouseup touchend MSPointerUp mouseout MSPointerOut", k), l.data({bindEvent_buttonsContinuous_y: !0})
                    }
                }
                function L() {
                    var e = l.data("scrollButtons_scrollSpeed");
                    return l.data("scrollButtons_scrollSpeed") === "auto" && (e = Math.round((l.data("scrollInertia") + 100) / 40)), e
                }
            }
            l.data("autoScrollOnFocus") && (l.data("bindEvent_focusin") || (t.bind("focusin", function () {
                t.scrollTop(0).scrollLeft(0);
                var n = e(document.activeElement);
                if (n.is("input,textarea,select,button,a[tabindex],area,object")) {
                    var i = r.position().top, s = n.position().top, o = t.height() - n.outerHeight();
                    l.data("horizontalScroll") && (i = r.position().left, s = n.position().left, o = t.width() - n.outerWidth()), (i + s < 0 || i + s > o) && l.mCustomScrollbar("scrollTo", s, {trigger: "internal"})
                }
            }), l.data({bindEvent_focusin: !0}))), l.data("autoHideScrollbar") && (l.data("bindEvent_autoHideScrollbar") || (t.bind("mouseenter", function (e) {
                t.addClass("mCS-mouse-over"), n.showScrollbar.call(t.children(".mCSB_scrollTools"))
            }).bind("mouseleave touchend", function (e) {
                t.removeClass("mCS-mouse-over"), e.type === "mouseleave" && n.hideScrollbar.call(t.children(".mCSB_scrollTools"))
            }), l.data({bindEvent_autoHideScrollbar: !0})))
        }, scrollTo: function (t, r) {
            function E(e) {
                this.mcs = {
                    top: a.position().top,
                    left: a.position().left,
                    draggerTop: h.position().top,
                    draggerLeft: h.position().left,
                    topPct: Math.round(100 * Math.abs(a.position().top) / Math.abs(a.outerHeight() - u.height())),
                    leftPct: Math.round(100 * Math.abs(a.position().left) / Math.abs(a.outerWidth() - u.width()))
                };
                switch (e) {
                    case"onScrollStart":
                        i.data("mCS_tweenRunning", !0).data("onScrollStart_Callback").call(i, this.mcs);
                        break;
                    case"whileScrolling":
                        i.data("whileScrolling_Callback").call(i, this.mcs);
                        break;
                    case"onScroll":
                        i.data("onScroll_Callback").call(i, this.mcs);
                        break;
                    case"onTotalScrollBack":
                        i.data("onTotalScrollBack_Callback").call(i, this.mcs);
                        break;
                    case"onTotalScroll":
                        i.data("onTotalScroll_Callback").call(i, this.mcs)
                }
            }

            var i = e(this), s = {
                    moveDragger: !1,
                    trigger: "external",
                    callbacks: !0,
                    scrollInertia: i.data("scrollInertia"),
                    scrollEasing: i.data("scrollEasing")
                }, r = e.extend(s, r), o, u = i.children(".mCustomScrollBox"), a = u.children(".mCSB_container"),
                f = u.children(".mCSB_scrollTools"), l = f.children(".mCSB_draggerContainer"),
                h = l.children(".mCSB_dragger"), p = draggerSpeed = r.scrollInertia, v, m, g, y;
            if (!a.hasClass("mCS_no_scrollbar")) {
                i.data({mCS_trigger: r.trigger}), i.data("mCS_Init") && (r.callbacks = !1);
                if (t || t === 0) {
                    if (typeof t == "number") r.moveDragger ? (o = t, i.data("horizontalScroll") ? t = h.position().left * i.data("scrollAmount") : t = h.position().top * i.data("scrollAmount"), draggerSpeed = 0) : o = t / i.data("scrollAmount"); else if (typeof t == "string") {
                        var b;
                        t === "top" ? b = 0 : t === "bottom" && !i.data("horizontalScroll") ? b = a.outerHeight() - u.height() : t === "left" ? b = 0 : t === "right" && i.data("horizontalScroll") ? b = a.outerWidth() - u.width() : t === "first" ? b = i.find(".mCSB_container").find(":first") : t === "last" ? b = i.find(".mCSB_container").find(":last") : b = i.find(t), b.length === 1 ? (i.data("horizontalScroll") ? t = b.position().left : t = b.position().top, o = t / i.data("scrollAmount")) : o = t = b
                    }
                    if (i.data("horizontalScroll")) {
                        i.data("onTotalScrollBack_Offset") && (m = -i.data("onTotalScrollBack_Offset")), i.data("onTotalScroll_Offset") && (y = u.width() - a.outerWidth() + i.data("onTotalScroll_Offset")), o < 0 ? (o = t = 0, clearInterval(i.data("mCSB_buttonScrollLeft")), m || (v = !0)) : o >= l.width() - h.width() ? (o = l.width() - h.width(), t = u.width() - a.outerWidth(), clearInterval(i.data("mCSB_buttonScrollRight")), y || (g = !0)) : t = -t;
                        var w = i.data("snapAmount");
                        w && (t = Math.round(t / w) * w - i.data("snapOffset")), n.mTweenAxis.call(this, h[0], "left", Math.round(o), draggerSpeed, r.scrollEasing), n.mTweenAxis.call(this, a[0], "left", Math.round(t), p, r.scrollEasing, {
                            onStart: function () {
                                r.callbacks && !i.data("mCS_tweenRunning") && E("onScrollStart"), i.data("autoHideScrollbar") && n.showScrollbar.call(f)
                            }, onUpdate: function () {
                                r.callbacks && E("whileScrolling")
                            }, onComplete: function () {
                                r.callbacks && (E("onScroll"), (v || m && a.position().left >= m) && E("onTotalScrollBack"), (g || y && a.position().left <= y) && E("onTotalScroll")), h.data("preventAction", !1), i.data("mCS_tweenRunning", !1), i.data("autoHideScrollbar") && (u.hasClass("mCS-mouse-over") || n.hideScrollbar.call(f))
                            }
                        })
                    } else {
                        i.data("onTotalScrollBack_Offset") && (m = -i.data("onTotalScrollBack_Offset")), i.data("onTotalScroll_Offset") && (y = u.height() - a.outerHeight() + i.data("onTotalScroll_Offset")), o < 0 ? (o = t = 0, clearInterval(i.data("mCSB_buttonScrollUp")), m || (v = !0)) : o >= l.height() - h.height() ? (o = l.height() - h.height(), t = u.height() - a.outerHeight(), clearInterval(i.data("mCSB_buttonScrollDown")), y || (g = !0)) : t = -t;
                        var w = i.data("snapAmount");
                        w && (t = Math.round(t / w) * w - i.data("snapOffset")), n.mTweenAxis.call(this, h[0], "top", Math.round(o), draggerSpeed, r.scrollEasing), n.mTweenAxis.call(this, a[0], "top", Math.round(t), p, r.scrollEasing, {
                            onStart: function () {
                                r.callbacks && !i.data("mCS_tweenRunning") && E("onScrollStart"), i.data("autoHideScrollbar") && n.showScrollbar.call(f)
                            }, onUpdate: function () {
                                r.callbacks && E("whileScrolling")
                            }, onComplete: function () {
                                r.callbacks && (E("onScroll"), (v || m && a.position().top >= m) && E("onTotalScrollBack"), (g || y && a.position().top <= y) && E("onTotalScroll")), h.data("preventAction", !1), i.data("mCS_tweenRunning", !1), i.data("autoHideScrollbar") && (u.hasClass("mCS-mouse-over") || n.hideScrollbar.call(f))
                            }
                        })
                    }
                    i.data("mCS_Init") && i.data({mCS_Init: !1})
                }
            }
        }, stop: function () {
            var t = e(this), r = t.children().children(".mCSB_container"),
                i = t.children().children().children().children(".mCSB_dragger");
            n.mTweenAxisStop.call(this, r[0]), n.mTweenAxisStop.call(this, i[0])
        }, disable: function (t) {
            var n = e(this), r = n.children(".mCustomScrollBox"), i = r.children(".mCSB_container"),
                s = r.children(".mCSB_scrollTools"), o = s.children().children(".mCSB_dragger");
            r.unbind("mousewheel focusin mouseenter mouseleave touchend"), i.unbind("touchstart touchmove"), t && (n.data("horizontalScroll") ? o.add(i).css("left", 0) : o.add(i).css("top", 0)), s.css("display", "none"), i.addClass("mCS_no_scrollbar"), n.data({
                bindEvent_mousewheel: !1,
                bindEvent_focusin: !1,
                bindEvent_content_touch: !1,
                bindEvent_autoHideScrollbar: !1
            }).addClass("mCS_disabled")
        }, destroy: function () {
            var t = e(this);
            t.removeClass("mCustomScrollbar _mCS_" + t.data("mCustomScrollbarIndex")).addClass("mCS_destroyed").children().children(".mCSB_container").unwrap().children().unwrap().siblings(".mCSB_scrollTools").remove(), e(document).unbind("mousemove." + t.data("mCustomScrollbarIndex") + " mouseup." + t.data("mCustomScrollbarIndex") + " MSPointerMove." + t.data("mCustomScrollbarIndex") + " MSPointerUp." + t.data("mCustomScrollbarIndex")), e(window).unbind("resize." + t.data("mCustomScrollbarIndex"))
        }
    }, n = {
        showScrollbar: function () {
            this.stop().animate({opacity: 1}, "fast")
        }, hideScrollbar: function () {
            this.stop().animate({opacity: 0}, "fast")
        }, mTweenAxis: function (e, t, n, r, i, s) {
            function v() {
                return window.performance && window.performance.now ? window.performance.now() : window.performance && window.performance.webkitNow ? window.performance.webkitNow() : Date.now ? Date.now() : (new Date).getTime()
            }

            function m() {
                c || o.call(), c = v() - f, g(), c >= e._time && (e._time = c > e._time ? c + l - (c - e._time) : c + l - 1, e._time < c + 1 && (e._time = c + 1)), e._time < r ? e._id = _request(m) : a.call()
            }

            function g() {
                r > 0 ? (e.currVal = w(e._time, h, d, r, i), p[t] = Math.round(e.currVal) + "px") : p[t] = n + "px", u.call()
            }

            function y() {
                l = 1e3 / 60, e._time = c + l, _request = window.requestAnimationFrame ? window.requestAnimationFrame : function (e) {
                    return g(), setTimeout(e, .01)
                }, e._id = _request(m)
            }

            function b() {
                if (e._id == null)return;
                window.requestAnimationFrame ? window.cancelAnimationFrame(e._id) : clearTimeout(e._id), e._id = null
            }

            function w(e, t, n, r, i) {
                switch (i) {
                    case"linear":
                        return n * e / r + t;
                    case"easeOutQuad":
                        return e /= r, -n * e * (e - 2) + t;
                    case"easeInOutQuad":
                        e /= r / 2;
                        if (e < 1)return n / 2 * e * e + t;
                        return e--, -n / 2 * (e * (e - 2) - 1) + t;
                    case"easeOutCubic":
                        return e /= r, e--, n * (e * e * e + 1) + t;
                    case"easeOutQuart":
                        return e /= r, e--, -n * (e * e * e * e - 1) + t;
                    case"easeOutQuint":
                        return e /= r, e--, n * (e * e * e * e * e + 1) + t;
                    case"easeOutCirc":
                        return e /= r, e--, n * Math.sqrt(1 - e * e) + t;
                    case"easeOutSine":
                        return n * Math.sin(e / r * (Math.PI / 2)) + t;
                    case"easeOutExpo":
                        return n * (-Math.pow(2, -10 * e / r) + 1) + t;
                    case"mcsEaseOut":
                        var s = (e /= r) * e, o = s * e;
                        return t + n * (.499999999999997 * o * s + -2.5 * s * s + 5.5 * o + -6.5 * s + 4 * e);
                    case"draggerRailEase":
                        e /= r / 2;
                        if (e < 1)return n / 2 * e * e * e + t;
                        return e -= 2, n / 2 * (e * e * e + 2) + t
                }
            }

            var s = s || {}, o = s.onStart || function () {
                }, u = s.onUpdate || function () {
                }, a = s.onComplete || function () {
                }, f = v(), l, c = 0, h = e.offsetTop, p = e.style;
            t === "left" && (h = e.offsetLeft);
            var d = n - h;
            b(), y()
        }, mTweenAxisStop: function (e) {
            if (e._id == null)return;
            window.requestAnimationFrame ? window.cancelAnimationFrame(e._id) : clearTimeout(e._id), e._id = null
        }, rafPolyfill: function () {
            var e = ["ms", "moz", "webkit", "o"], t = e.length;
            while (--t > -1 && !window.requestAnimationFrame)window.requestAnimationFrame = window[e[t] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[t] + "CancelAnimationFrame"] || window[e[t] + "CancelRequestAnimationFrame"]
        }
    };
    n.rafPolyfill.call(), e.support.touch = "ontouchstart" in window, e.support.msPointer = window.navigator.msPointerEnabled;
    var r = "https:" == document.location.protocol ? "https:" : "http:";
    e.event.special.mousewheel || document.write('<script src="' + r + '//cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.0.6/jquery.mousewheel.min.js"></script>'), e.fn.mCustomScrollbar = function (n) {
        if (t[n])return t[n].apply(this, Array.prototype.slice.call(arguments, 1));
        if (typeof n == "object" || !n)return t.init.apply(this, arguments);
        e.error("Method " + n + " does not exist")
    }
}(jQuery), define("jquery.mCustomScrollbar", ["jquery"], function (e) {
    return function () {
        var t, n;
        return t || e.mCustomScrollbar
    }
}(this)), define("Map", ["Class", "Global", "jquery", "TweenLite", "TimelineLite", "jquery.mCustomScrollbar", "utils/GA"], function (e, t, n, r, i, s, o) {
    var u = new e({
        directionsService: null,
        map: null,
        latlng: null,
        jam3Location: null,
        directionsDisplay: null,
        myOptions: null,
        currentCenter: null,
        mapcanvas: null,
        latlng: null,
        travelMode: null,
        icons: null,
        departureMarker: null,
        footerHeight: 65,
        defaultMapHeight: 160,
        initialize: function () {
            var e = this;
            o.setPageID("contact"), this.directionsService = new google.maps.DirectionsService, this.jam3Location = new google.maps.LatLng(43.647273, -79.392642), t.isMobile && t.windowHeight >= 800 && (this.defaultMapHeight = 400), 0;
            var r = "../wp-content/themes/jam3/assets/img/icons/";
            this.icons = {
                home: {
                    url: r + "home-icon.png",
                    anchor: new google.maps.Point(10, 36),
                    scaledSize: new google.maps.Size(20, 36)
                },
                departure: {
                    url: r + "start-icon.png",
                    anchor: new google.maps.Point(10, 36),
                    scaledSize: new google.maps.Size(20, 36)
                }
            }, this.loadMap(), this.success = this.success.bind(this), n("#travelMethod").on("click", "li a", function (t) {
                var r = n(this).data("traveltype"), i = n(this).parent();
                i.toggleClass("selected"), i.hasClass("selected") ? (i.siblings().removeClass("selected"), e.travelMethod(r), e.slideTravelMode(r)) : e.closeTravelMode(), t.preventDefault()
            }), n("#map-right").on("click", ".map-slide-trigger.open", function (t) {
                e.closeDrawer(!0), t.preventDefault()
            }), n("#map-right .close-but").on("click", e.closeTravelMode.bind(this)), n("a#currentLocationBtn").on("click", function (r) {
                $this = n(this);
                if ($this.hasClass("active")) {
                    $this.removeClass("active"), e.clearSearch();
                    return
                }
                $this.addClass("active"), n("#search-icon").addClass("icon-cross").removeClass("icon-search"), n("#mapSearch").val("").attr("placeholder", "CURRENT LOCATION"), t.isMobile ? (n(".location-section ").fadeOut("fast"), e.getLocation(), e.mobileOpen()) : (n("#map-right").removeClass("mobileDirection"), e.getLocation(), e.openDrawer()), r.preventDefault()
            }), t.isMobile && (n("#mapSearch").keyup(function () {
                var e = n(this).val();
                e !== "" ? n(".location-section").fadeOut("fast") : n(".location-section").fadeIn("fast")
            }), this.hideFooter()), t.currentWidthType == "tabletPortrait" && n("#content-wrap").css("background", "#f7f7f7"), n("#mapSearch").on("blur", function () {
                var e = n(this), t = e.val();
                o.trackEvent("Contact", "LocationRequest", t)
            }), n("#travelMethod").on("click", ".adp-directions tr", function () {
                var e = n(this), t = parseInt(e.attr("jsinstance"), 10);
                t += 1, o.trackEvent("Contact", "ContactClick", "DirectionsInstructionStep", t)
            }), n('.location-section a[href^="mailto:"]').one("mouseover", function () {
                var e = n(this).attr("href").replace("mailto:", "");
                o.trackEvent("Interaction", "ContactHover", e)
            }), n(".location-section").one("click", 'a[href^="mailto:"]', function () {
                var e = n(this).attr("href").replace("mailto:", "");
                o.trackEvent("Interaction", "ContactClick", e)
            }), n(window).resize(this.resize.bind(this)), this.resize()
        },
        openDrawer: function () {
            var e = this, t = n("#map-right").outerWidth(), i = n(".map-wrap").width(), s = i - t;
            r.to(n("#map-right"), .5, {
                right: 0,
                ease: Expo.easeInOut
            }), r.to(n("#travelMethod"), .3, {opacity: 1}), r.to(n("#map-right .close-but"), .3, {autoAlpha: 1}), n(".map-slide-trigger").removeClass("closed").addClass("open"), n("#map-right").off("click", ".map-slide-trigger.closed").on("click", ".map-slide-trigger.closed", function (t) {
                n(this).removeAttr("style"), e.openDrawer(), t.preventDefault()
            })
        },
        closeDrawer: function (e) {
            var t = this, i = n("#map-right").outerWidth(), s = n("#map"), o = s.width();
            e && (i -= 40), r.to(n("#map-right"), .5, {
                right: -i,
                ease: Expo.easeInOut
            }), r.to(n("#travelMethod"), .5, {opacity: 0}), r.to(n("#map-right .close-but"), .3, {autoAlpha: 0}), $mapSlideTrigger = n(".map-slide-trigger"), $mapSlideTrigger.removeClass("open").removeClass("closed").attr("style", ""), e && $mapSlideTrigger.addClass("closed").css({left: -13})
        },
        hideFooter: function () {
            n("#mapSearch").focus(function () {
                n("#map-right").hide()
            }), n("#mapSearch").blur(function () {
                n("#map-right").show()
            })
        },
        loadDistance: function (e, t) {
            var r = this, i = {origin: e, destination: t, travelMode: google.maps.DirectionsTravelMode.DRIVING};
            this.directionsService.route(i, function (e, t) {
                t === google.maps.DirectionsStatus.OK ? (n("#map-right h4, #travelMethod").fadeIn("fast"), document.querySelector("#status").innerHTML = 'You are <span class="distance">' + e.routes[0].legs[0].distance.text.replace(" ", "") + "</span> away.") : (document.querySelector("#status").innerHTML = "You are too far away to calculate travel time.", n("#map-right h4, #travelMethod").hide())
            })
        },
        loadTimes: function (e, n, r, i) {
            var s = {origin: e, destination: n, travelMode: r};
            t.isMobile || this.directionsService.route(s, function (e, t) {
                t === google.maps.DirectionsStatus.OK && (document.querySelector(i).innerHTML = e.routes[0].legs[0].duration.text)
            })
        },
        allLoadTimes: function (e, t) {
            this.loadTimes(e, t, google.maps.DirectionsTravelMode.WALKING, "#walking"), this.loadTimes(e, t, google.maps.DirectionsTravelMode.DRIVING, "#driving"), this.loadTimes(e, t, google.maps.DirectionsTravelMode.BICYCLING, "#biking"), this.loadTimes(e, t, google.maps.DirectionsTravelMode.TRANSIT, "#transit") != "undefined" && n("#travelMethod").find('li a[data-traveltype="TRANSIT"]').length < 1 && this.loadTimes(e, t, google.maps.DirectionsTravelMode.TRANSIT, "#transit")
        },
        success: function (e) {
            0, this.latlng = new google.maps.LatLng(e.coords.latitude, e.coords.longitude), this.loadDistance(this.latlng, this.jam3Location), this.allLoadTimes(this.latlng, this.jam3Location), n("#travelMethod li.selected").removeClass("selected")
        },
        error: function (e) {
            var t = document.querySelector("#status");
            t.innerHTML = typeof e == "string" ? e : "Uh oh, we couldn't find you!", t.className = "fail", 0
        },
        travelMethod: function (e) {
            var i = this;
            o.trackEvent("Contact", "ContactClick", e), this.departureMarker && this.departureMarker.setMap(null), e === "WALKING" ? this.travelMode = google.maps.DirectionsTravelMode.WALKING : e === "BIKING" ? this.travelMode = google.maps.DirectionsTravelMode.BICYCLING : e === "DRIVING" ? this.travelMode = google.maps.DirectionsTravelMode.DRIVING : e === "TRANSIT" && (this.travelMode = google.maps.DirectionsTravelMode.TRANSIT);
            var s = {origin: this.latlng, destination: this.jam3Location, travelMode: this.travelMode};
            this.directionsDisplay.setMap(this.map), this.directionsService.route(s, function (e, t) {
                if (t === google.maps.DirectionsStatus.OK) {
                    var r = e.routes[0].legs[0];
                    i.departureMarker = i.makeMarker(r.start_location, i.icons.departure, r.start_address), i.directionsDisplay.setDirections(e), n("#status").html("You are " + e.routes[0].legs[0].distance.text + " away.")
                }
            }), this.directionsDisplay.setPanel(document.querySelector(".directions-panel." + e + "." + t.currentWidthType));
            if (t.isMobile) {
                var u = n(".directions-panel." + e + "." + t.currentWidthType);
                u.siblings().hide(), r.to([this.mapcanvas, n("#map")], .8, {
                    height: this.defaultMapHeight,
                    ease: Expo.easeInOut,
                    onComplete: function () {
                        var e = this.map.getCenter();
                        google.maps.event.trigger(this.map, "resize"), this.map.panTo(e)
                    }.bind(this)
                });
                var a = t.windowHeight, f = n(".main-header").outerHeight(), l = f + this.defaultMapHeight,
                    c = t.windowHeight - l;
                n("#map-right").css("height", c);
                var h = c - 65;
                u.css({maxHeight: h, height: h}), r.to(n("#map-right"), .8, {
                    top: l,
                    ease: Expo.easeInOut,
                    onComplete: function () {
                    }.bind(this)
                })
            } else n("#map-right").removeClass("mobileDirection")
        },
        slideTravelMode: function (e) {
            var i = this, s = n("#travelMethod li:not(.selected)");
            r.set(s, {height: 0}), r.to(s.find(".directions-panel"), .4, {height: 0, ease: Expo.easeInOut});
            var u = n(".directions-panel." + e + "." + t.currentWidthType), a = 400, f = n("#map-right");
            if (!t.isMobile) {
                var l = f.outerHeight();
                0;
                var c = n("#travelMethod li:first").position().top;
                a = l - c - 50 - 50
            }
            r.to(f.find(".close-but"), .75, {y: 0, ease: Expo.easeOut}), r.to(u, .75, {
                height: a,
                ease: Expo.easeOut,
                onComplete: function () {
                    u.mCustomScrollbar({
                        autoHideScrollbar: !1,
                        advanced: {updateOnContentResize: !1},
                        autoDraggerLength: !1,
                        callbacks: {
                            onScrollStart: function () {
                                i.panelScrollTracked || (o.trackEvent("Contact", "ContactScroll", "DirectionsScroll"), i.panelScrollTracked = !0)
                            }
                        }
                    })
                }
            })
        },
        closeTravelMode: function () {
            var e = n("#map-right");
            r.to(e.find(".close-but"), .75, {
                y: 50,
                ease: Expo.easeOut
            }), r.to(n("#travelMethod li .directions-panel"), .4, {
                height: 0,
                ease: Expo.easeInOut
            }), r.set(n("#travelMethod li"), {height: "auto"}), n("#travelMethod li").removeClass("selected"), this.clearMap()
        },
        makeMarker: function (e, t, n) {
            return new google.maps.Marker({position: e, map: this.map, icon: t, title: n})
        },
        getLocation: function () {
            navigator.geolocation ? navigator.geolocation.getCurrentPosition(this.success.bind(this), this.error.bind(this)) : error("not supported")
        },
        loadMap: function (e) {
            var r = this, i = !1, s;
            this.mapcanvas = document.createElement("div"), this.mapcanvas.id = "mapcanvas";
            var o = [{
                featureType: "All",
                elementType: "geometry.stroke",
                stylers: [{visibility: "simplified"}]
            }, {
                featureType: "landscape.man_made",
                elementType: "geometry.fill",
                stylers: [{visibility: "off"}]
            }, {
                featureType: "landscape.natural",
                elementType: "All",
                stylers: [{visibility: "off"}]
            }, {featureType: "poi", elementType: "All", stylers: [{visibility: "off"}]}, {
                featureType: "transit.line",
                elementType: "All",
                stylers: [{visibility: "off"}]
            }, {
                featureType: "landscape",
                elementType: "All",
                stylers: [{visibility: "on"}]
            }, {
                featureType: "road.highway",
                elementType: "All",
                stylers: [{visibility: "on"}, {weight: 1.7}, {saturation: -100}, {lightness: -42}, {gamma: 2}]
            }, {
                featureType: "landscape.man_made",
                elementType: "labels",
                stylers: [{visibility: "off"}]
            }, {
                featureType: "All",
                elementType: "geometry",
                stylers: [{saturation: -19}, {visibility: "simplified"}]
            }, {
                featureType: "water",
                elementType: "All",
                stylers: [{lightness: -70}, {saturation: -83}]
            }, {
                featureType: "landscape",
                elementType: "All",
                stylers: [{gamma: .97}, {saturation: -100}, {lightness: -72}]
            }, {
                featureType: "road.local",
                elementType: "All",
                stylers: [{lightness: -78}, {gamma: 2.13}]
            }, {
                featureType: "road.arterial",
                elementType: "All",
                stylers: [{lightness: -74}, {gamma: 2.13}]
            }, {featureType: "All", elementType: "labels.text.stroke", stylers: [{gamma: .41}]}, {
                featureType: "All",
                elementType: "labels.text.stroke",
                stylers: [{gamma: .32}, {visibility: "off"}]
            }, {
                featureType: "All",
                elementType: "labels.text",
                stylers: [{saturation: -100}, {lightness: -100}, {gamma: 9.99}]
            }, {featureType: "poi", elementType: "All", stylers: [{visibility: "off"}]}, {
                featureType: "All",
                elementType: "geometry",
                stylers: [{visibility: "simplified"}]
            }, {
                featureType: "All",
                elementType: "All",
                stylers: [{saturation: -82}, {lightness: -44}, {gamma: .92}]
            }, {featureType: "All", elementType: "labels.text.fill", stylers: [{lightness: 68}]}, {
                featureType: "poi",
                elementType: "All",
                stylers: [{visibility: "off"}]
            }, {
                featureType: "transit.line",
                elementType: "All",
                stylers: [{visibility: "simplified"}, {lightness: -60}]
            }, {
                featureType: "landscape.natural",
                elementType: "All",
                stylers: [{visibility: "on"}]
            }, {
                featureType: "road.local",
                elementType: "All",
                stylers: [{lightness: -59}]
            }, {
                featureType: "road.arterial",
                elementType: "All",
                stylers: [{saturation: 7}, {hue: "#0066ff"}, {gamma: .89}]
            }, {
                featureType: "transit",
                elementType: "All",
                stylers: [{lightness: -38}, {gamma: 1.5}]
            }, {
                featureType: "water",
                elementType: "All",
                stylers: [{hue: "#0022ff"}, {gamma: 1.38}, {lightness: -32}, {saturation: -4}]
            }, {
                featureType: "administrative",
                elementType: "All",
                stylers: [{lightness: -64}]
            }, {
                featureType: "administrative.locality",
                elementType: "All",
                stylers: [{lightness: 70}]
            }, {
                featureType: "All",
                elementType: "All",
                stylers: [{saturation: 1}, {hue: "#0022ff"}]
            }, {featureType: "transit", elementType: "All"}, {
                featureType: "road.local",
                stylers: [{gamma: .89}]
            }, {elementType: "labels.text.fill", stylers: [{lightness: 16}, {gamma: 1.03}]}];
            t.isMobile ? (this.mapcanvas.style.height = this.defaultMapHeight + "px", n("#map-right").addClass("mobileOption"), this.myOptions = {
                zoom: 17,
                center: this.jam3Location,
                mapTypeControl: !1,
                panControl: !1,
                zoomControl: !1,
                scaleControl: !1,
                streetViewControl: !1,
                overviewMapControl: !1,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: o
            }) : this.myOptions = {
                zoom: 16,
                center: this.jam3Location,
                mapTypeControl: !1,
                navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
                zoomControlOptions: {style: google.maps.ZoomControlStyle.SMALL},
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: o,
                disableDefaultUI: !0
            }, this.mapcanvas.style.width = "100%", document.querySelector("#map").appendChild(this.mapcanvas), this.map = new google.maps.Map(document.getElementById("mapcanvas"), this.myOptions), this.directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: !0}), this.directionsDisplay.setMap(this.map);
            var u = {url: this.iconBase + "map-icon.png", anchor: new google.maps.Point(15, 53)},
                a = new google.maps.Marker({
                    position: this.jam3Location,
                    title: "Jam3 Office: 252 - 171 East Liberty St. Toronto, Canada, M6k3P6",
                    map: this.map,
                    icon: this.icons.home
                }), f = document.getElementById("mapSearch"), l = new google.maps.LatLng(43.076846, -80.695514),
                c = new google.maps.LatLng(44.207738, -78.446064), h = new google.maps.LatLngBounds(l, c);
            this.searchBox = new google.maps.places.SearchBox(f, {bounds: h}), t.isMobile || google.maps.event.addListener(this.searchBox, "places_changed", this.gotSearchResults.bind(this)), n("#searchButton").click(function () {
                var e = n("#panel i");
                if (e.hasClass("icon-cross")) {
                    this.clearSearch();
                    return
                }
                if (n("#mapSearch").val()) {
                    e.toggleClass("icon-cross icon-search");
                    var t = new google.maps.places.PlacesService(r.map), i = n("#mapSearch").val(),
                        s = {query: i, location: r.jam3Location, radius: "40000"};
                    t.textSearch(s, function (e, t) {
                        if (t == google.maps.places.PlacesServiceStatus.OK) {
                            var n = e;
                            this.gotSearchResults(n)
                        } else 0, 0
                    }.bind(this))
                }
            }.bind(this))
        },
        clearSearch: function () {
            n("#mapSearch").val("").attr("placeholder", "GET DIRECTIONS"), n("#search-icon").removeClass("icon-cross").addClass("icon-search"), this.resetCurrentLocationButton();
            if (t.isMobile) {
                var e = n(".location-section");
                r.to(e, 1, {
                    autoAlpha: 1,
                    display: "block",
                    ease: Linear.easeNone
                }), r.to(n("#map-right"), .5, {
                    top: t.windowHeight + 200,
                    ease: Expo.easeIn
                }), this.resizeMap(this.defaultMapHeight, .8)
            } else this.closeDrawer();
            this.clearMap()
        },
        clearMap: function () {
            this.directionsDisplay.setMap(null), this.departureMarker && this.departureMarker.setMap(null), this.map.panTo(this.jam3Location)
        },
        resetCurrentLocationButton: function () {
            n("a#currentLocationBtn").removeClass("active")
        },
        gotSearchResults: function (e) {
            e = e || this.searchBox.getPlaces();
            var t = this;
            n("#search-icon").addClass("icon-cross").removeClass("icon-search"), this.resetCurrentLocationButton(), t.latlng = new google.maps.LatLng(e[0].geometry.location.lat(), e[0].geometry.location.lng()), t.loadDistance(t.latlng, t.jam3Location), t.allLoadTimes(t.latlng, t.jam3Location), this.openDirectionsChoice()
        },
        openDirectionsChoice: function () {
            n("#travelMethod li.selected").removeClass("selected"), t.isMobile ? (this.mobileOpen(), n(".location-section").fadeOut("fast")) : this.openDrawer()
        },
        resize: function () {
            this.currentCenter = this.map.getCenter();
            if (t.currentWidthType == "tabletLandscape" || t.currentWidthType == "tabletPortrait" || t.currentWidthType == "desktop") {
                var e = n("header.page-title").outerHeight(!0), r = n(".location-section").outerHeight(!0), i = e + r,
                    s = t.windowHeight;
                t.isMobile ? s -= 50 : s -= 100;
                var o = s - i;
                o = Math.max(400, o), this.resizeMap(o, 0), google.maps.event.trigger(this.map, "resize"), this.map.panTo(this.currentCenter)
            } else t.currentWidthType == "mobile" && (this.resizeMap(n(window).height() < 450 ? 250 : 340, 0), google.maps.event.trigger(this.map, "resize"), this.map.panTo(this.currentCenter))
        },
        resizeMap: function (e, t) {
            t = t || 0, r.to(this.mapcanvas, t, {height: e + 30, ease: Expo.easeInOut}), r.to(n("#map"), t, {
                height: e,
                ease: Expo.easeInOut,
                onComplete: function () {
                    google.maps.event.trigger(this.map, "resize");
                    var e = this.map.getCenter();
                    this.map.panTo(e)
                }.bind(this)
            })
        },
        mobileOpen: function () {
            var e = n(".main-header").outerHeight();
            0;
            var i = this.footerHeight;
            0;
            var s = t.windowHeight;
            0;
            var o = s - e - i;
            r.fromTo(n("#map-right"), .8, {top: s, display: "block"}, {
                top: s - i,
                ease: Expo.easeOut
            }), this.resizeMap(o, 1)
        },
        returnMobileMap: function () {
            n(".location-section ").fadeOut("fast"), _this.getLocation(), _this.mobileOpen(), n("#map-right").animate({height: "60px"}), n("#panel").fadeIn("fast")
        }
    });
    return u
}), FastClick.prototype.deviceIsAndroid = navigator.userAgent.indexOf("Android") > 0, FastClick.prototype.deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent), FastClick.prototype.deviceIsIOS4 = FastClick.prototype.deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent), FastClick.prototype.deviceIsIOSWithBadTarget = FastClick.prototype.deviceIsIOS && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent), FastClick.prototype.needsClick = function (e) {
    "use strict";
    switch (e.nodeName.toLowerCase()) {
        case"button":
        case"select":
        case"textarea":
            if (e.disabled)return !0;
            break;
        case"input":
            if (this.deviceIsIOS && e.type === "file" || e.disabled)return !0;
            break;
        case"label":
        case"video":
            return !0
    }
    return /\bneedsclick\b/.test(e.className)
}, FastClick.prototype.needsFocus = function (e) {
    "use strict";
    switch (e.nodeName.toLowerCase()) {
        case"textarea":
        case"select":
            return !0;
        case"input":
            switch (e.type) {
                case"button":
                case"checkbox":
                case"file":
                case"image":
                case"radio":
                case"submit":
                    return !1
            }
            return !e.disabled && !e.readOnly;
        default:
            return /\bneedsfocus\b/.test(e.className)
    }
}, FastClick.prototype.sendClick = function (e, t) {
    "use strict";
    var n, r;
    document.activeElement && document.activeElement !== e && document.activeElement.blur(), r = t.changedTouches[0], n = document.createEvent("MouseEvents"), n.initMouseEvent("click", !0, !0, window, 1, r.screenX, r.screenY, r.clientX, r.clientY, !1, !1, !1, !1, 0, null), n.forwardedTouchEvent = !0, e.dispatchEvent(n)
}, FastClick.prototype.focus = function (e) {
    "use strict";
    var t;
    this.deviceIsIOS && e.setSelectionRange ? (t = e.value.length, e.setSelectionRange(t, t)) : e.focus()
}, FastClick.prototype.updateScrollParent = function (e) {
    "use strict";
    var t, n;
    t = e.fastClickScrollParent;
    if (!t || !t.contains(e)) {
        n = e;
        do {
            if (n.scrollHeight > n.offsetHeight) {
                t = n, e.fastClickScrollParent = n;
                break
            }
            n = n.parentElement
        } while (n)
    }
    t && (t.fastClickLastScrollTop = t.scrollTop)
}, FastClick.prototype.getTargetElementFromEventTarget = function (e) {
    "use strict";
    return e.nodeType === Node.TEXT_NODE ? e.parentNode : e
}, FastClick.prototype.onTouchStart = function (e) {
    "use strict";
    var t, n, r;
    if (e.targetTouches.length > 1)return !0;
    t = this.getTargetElementFromEventTarget(e.target), n = e.targetTouches[0];
    if (this.deviceIsIOS) {
        r = window.getSelection();
        if (r.rangeCount && !r.isCollapsed)return !0;
        if (!this.deviceIsIOS4) {
            if (n.identifier === this.lastTouchIdentifier)return e.preventDefault(), !1;
            this.lastTouchIdentifier = n.identifier, this.updateScrollParent(t)
        }
    }
    return this.trackingClick = !0, this.trackingClickStart = e.timeStamp, this.targetElement = t, this.touchStartX = n.pageX, this.touchStartY = n.pageY, e.timeStamp - this.lastClickTime < 200 && e.preventDefault(), !0
}, FastClick.prototype.touchHasMoved = function (e) {
    "use strict";
    var t = e.changedTouches[0], n = this.touchBoundary;
    return Math.abs(t.pageX - this.touchStartX) > n || Math.abs(t.pageY - this.touchStartY) > n ? !0 : !1
}, FastClick.prototype.findControl = function (e) {
    "use strict";
    return e.control !== undefined ? e.control : e.htmlFor ? document.getElementById(e.htmlFor) : e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
}, FastClick.prototype.onTouchEnd = function (e) {
    "use strict";
    var t, n, r, i, s, o = this.targetElement;
    this.touchHasMoved(e) && (this.trackingClick = !1, this.targetElement = null);
    if (!this.trackingClick)return !0;
    if (e.timeStamp - this.lastClickTime < 200)return this.cancelNextClick = !0, !0;
    this.lastClickTime = e.timeStamp, n = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, this.deviceIsIOSWithBadTarget && (s = e.changedTouches[0], o = document.elementFromPoint(s.pageX - window.pageXOffset, s.pageY - window.pageYOffset) || o, o.fastClickScrollParent = this.targetElement.fastClickScrollParent), r = o.tagName.toLowerCase();
    if (r === "label") {
        t = this.findControl(o);
        if (t) {
            this.focus(o);
            if (this.deviceIsAndroid)return !1;
            o = t
        }
    } else if (this.needsFocus(o)) {
        if (e.timeStamp - n > 100 || this.deviceIsIOS && window.top !== window && r === "input")return this.targetElement = null, !1;
        this.focus(o);
        if (!this.deviceIsIOS4 || r !== "select") this.targetElement = null, e.preventDefault();
        return !1
    }
    if (this.deviceIsIOS && !this.deviceIsIOS4) {
        i = o.fastClickScrollParent;
        if (i && i.fastClickLastScrollTop !== i.scrollTop)return !0
    }
    return this.needsClick(o) || (e.preventDefault(), this.sendClick(o, e)), !1
}, FastClick.prototype.onTouchCancel = function () {
    "use strict";
    this.trackingClick = !1, this.targetElement = null
}, FastClick.prototype.onMouse = function (e) {
    "use strict";
    return this.targetElement ? e.forwardedTouchEvent ? !0 : e.cancelable ? !this.needsClick(this.targetElement) || this.cancelNextClick ? (e.stopImmediatePropagation ? e.stopImmediatePropagation() : e.propagationStopped = !0, e.stopPropagation(), e.preventDefault(), !1) : !0 : !0 : !0
}, FastClick.prototype.onClick = function (e) {
    "use strict";
    var t;
    return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : e.target.type === "submit" && e.detail === 0 ? !0 : (t = this.onMouse(e), t || (this.targetElement = null), t)
}, FastClick.prototype.destroy = function () {
    "use strict";
    var e = this.layer;
    this.deviceIsAndroid && (e.removeEventListener("mouseover", this.onMouse, !0), e.removeEventListener("mousedown", this.onMouse, !0), e.removeEventListener("mouseup", this.onMouse, !0)), e.removeEventListener("click", this.onClick, !0), e.removeEventListener("touchstart", this.onTouchStart, !1), e.removeEventListener("touchend", this.onTouchEnd, !1), e.removeEventListener("touchcancel", this.onTouchCancel, !1)
}, FastClick.notNeeded = function (e) {
    "use strict";
    var t;
    if (typeof window.ontouchstart == "undefined")return !0;
    if (/Chrome\/[0-9]+/.test(navigator.userAgent)) {
        if (!FastClick.prototype.deviceIsAndroid)return !0;
        t = document.querySelector("meta[name=viewport]");
        if (t && t.content.indexOf("user-scalable=no") !== -1)return !0
    }
    return e.style.msTouchAction === "none" ? !0 : !1
}, FastClick.attach = function (e) {
    "use strict";
    return new FastClick(e)
}, typeof define != "undefined" && define.amd ? define("lib/fastclick", [], function () {
    "use strict";
    return FastClick
}) : typeof module != "undefined" && module.exports ? (module.exports = FastClick.attach, module.exports.FastClick = FastClick) : window.FastClick = FastClick, function (e, t, n, r) {
    "use strict";
    function l(e, t, n) {
        return setTimeout(m(e, n), t)
    }

    function c(e, t, n) {
        return Array.isArray(e) ? (h(e, n[t], n), !0) : !1
    }

    function h(e, t, n) {
        var i, s;
        if (!e)return;
        if (e.forEach) e.forEach(t, n); else if (e.length !== r)for (i = 0, s = e.length; i < s; i++)t.call(n, e[i], i, e); else for (i in e)e.hasOwnProperty(i) && t.call(n, e[i], i, e)
    }

    function p(e, t, n) {
        var i = Object.keys(t);
        for (var s = 0, o = i.length; s < o; s++)if (!n || n && e[i[s]] === r) e[i[s]] = t[i[s]];
        return e
    }

    function d(e, t) {
        return p(e, t, !0)
    }

    function v(e, t, n) {
        var r = t.prototype, i;
        i = e.prototype = Object.create(r), i.constructor = e, i._super = r, n && p(i, n)
    }

    function m(e, t) {
        return function () {
            return e.apply(t, arguments)
        }
    }

    function g(e, t) {
        return typeof e == o ? e.apply(t ? t[0] || r : r, t) : e
    }

    function y(e, t) {
        return e === r ? t : e
    }

    function b(e, t, n) {
        h(x(t), function (t) {
            e.addEventListener(t, n, !1)
        })
    }

    function w(e, t, n) {
        h(x(t), function (t) {
            e.removeEventListener(t, n, !1)
        })
    }

    function E(e, t) {
        while (e) {
            if (e == t)return !0;
            e = e.parentNode
        }
        return !1
    }

    function S(e, t) {
        return e.indexOf(t) > -1
    }

    function x(e) {
        return e.trim().split(/\s+/g)
    }

    function T(e, t, n) {
        if (e.indexOf && !n)return e.indexOf(t);
        for (var r = 0, i = e.length; r < i; r++)if (n && e[r][n] == t || !n && e[r] === t)return r;
        return -1
    }

    function N(e) {
        return Array.prototype.slice.call(e, 0)
    }

    function C(e, t, n) {
        var r = [], i = [];
        for (var s = 0, o = e.length; s < o; s++) {
            var u = t ? e[s][t] : e[s];
            T(i, u) < 0 && r.push(e[s]), i[s] = u
        }
        return n && (t ? r = r.sort(function (n, r) {
            return n[t] > r[t]
        }) : r = r.sort()), r
    }

    function k(e, t) {
        var n, s, o = t[0].toUpperCase() + t.slice(1);
        for (var u = 0, a = i.length; u < a; u++) {
            n = i[u], s = n ? n + o : t;
            if (s in e)return s
        }
        return r
    }

    function A() {
        return L++
    }

    function Z(t, n) {
        var r = this;
        this.manager = t, this.callback = n, this.element = t.element, this.target = t.options.inputTarget, this.domHandler = function (e) {
            g(t.options.enable, [t]) && r.handler(e)
        }, this.evEl && b(this.element, this.evEl, this.domHandler), this.evTarget && b(this.target, this.evTarget, this.domHandler), this.evWin && b(e, this.evWin, this.domHandler)
    }

    function et(e) {
        var t;
        return _ ? t = Et : D ? t = Tt : M ? t = Ct : t = mt, new t(e, tt)
    }

    function tt(e, t, n) {
        var r = n.pointers.length, i = n.changedPointers.length, s = t & I && r - i === 0,
            o = t & (R | U) && r - i === 0;
        n.isFirst = !!s, n.isFinal = !!o, s && (e.session = {}), n.eventType = t, nt(e, n), e.emit("hammer.input", n), e.recognize(n), e.session.prevInput = n
    }

    function nt(e, t) {
        var n = e.session, r = t.pointers, i = r.length;
        n.firstInput || (n.firstInput = st(t)), i > 1 && !n.firstMultiple ? n.firstMultiple = st(t) : i === 1 && (n.firstMultiple = !1);
        var s = n.firstInput, o = n.firstMultiple, u = o ? o.center : s.center, a = t.center = ot(r);
        t.timeStamp = f(), t.deltaTime = t.timeStamp - s.timeStamp, t.angle = lt(u, a), t.distance = ft(u, a), rt(n, t), t.offsetDirection = at(t.deltaX, t.deltaY), t.scale = o ? ht(o.pointers, r) : 1, t.rotation = o ? ct(o.pointers, r) : 0, it(n, t);
        var l = e.element;
        E(t.srcEvent.target, l) && (l = t.srcEvent.target), t.target = l
    }

    function rt(e, t) {
        var n = t.center, r = e.offsetDelta || {}, i = e.prevDelta || {}, s = e.prevInput || {};
        if (t.eventType === I || s.eventType === R) i = e.prevDelta = {
            x: s.deltaX || 0,
            y: s.deltaY || 0
        }, r = e.offsetDelta = {x: n.x, y: n.y};
        t.deltaX = i.x + (n.x - r.x), t.deltaY = i.y + (n.y - r.y)
    }

    function it(e, t) {
        var n = e.lastInterval || t, i = t.timeStamp - n.timeStamp, s, o, u, f;
        if (t.eventType != U && (i > F || n.velocity === r)) {
            var l = n.deltaX - t.deltaX, c = n.deltaY - t.deltaY, h = ut(i, l, c);
            o = h.x, u = h.y, s = a(h.x) > a(h.y) ? h.x : h.y, f = at(l, c), e.lastInterval = t
        } else s = n.velocity, o = n.velocityX, u = n.velocityY, f = n.direction;
        t.velocity = s, t.velocityX = o, t.velocityY = u, t.direction = f
    }

    function st(e) {
        var t = [];
        for (var n = 0; n < e.pointers.length; n++)t[n] = {
            clientX: u(e.pointers[n].clientX),
            clientY: u(e.pointers[n].clientY)
        };
        return {timeStamp: f(), pointers: t, center: ot(t), deltaX: e.deltaX, deltaY: e.deltaY}
    }

    function ot(e) {
        var t = e.length;
        if (t === 1)return {x: u(e[0].clientX), y: u(e[0].clientY)};
        var n = 0, r = 0;
        for (var i = 0; i < t; i++)n += e[i].clientX, r += e[i].clientY;
        return {x: u(n / t), y: u(r / t)}
    }

    function ut(e, t, n) {
        return {x: t / e || 0, y: n / e || 0}
    }

    function at(e, t) {
        return e === t ? z : a(e) >= a(t) ? e > 0 ? W : X : t > 0 ? V : $
    }

    function ft(e, t, n) {
        n || (n = G);
        var r = t[n[0]] - e[n[0]], i = t[n[1]] - e[n[1]];
        return Math.sqrt(r * r + i * i)
    }

    function lt(e, t, n) {
        n || (n = G);
        var r = t[n[0]] - e[n[0]], i = t[n[1]] - e[n[1]];
        return Math.atan2(i, r) * 180 / Math.PI
    }

    function ct(e, t) {
        return lt(t[1], t[0], Y) - lt(e[1], e[0], Y)
    }

    function ht(e, t) {
        return ft(t[0], t[1], Y) / ft(e[0], e[1], Y)
    }

    function mt() {
        this.evEl = dt, this.evWin = vt, this.allow = !0, this.pressed = !1, Z.apply(this, arguments)
    }

    function Et() {
        this.evEl = bt, this.evWin = wt, Z.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
    }

    function Tt() {
        this.evTarget = xt, this.targetIds = {}, Z.apply(this, arguments)
    }

    function Nt(e, t) {
        var n = N(e.touches), r = this.targetIds;
        if (t & (I | q) && n.length === 1)return r[n[0].identifier] = !0, [n, n];
        var i, s, o = N(e.targetTouches), u = N(e.changedTouches), a = [];
        if (t === I)for (i = 0, s = o.length; i < s; i++)r[o[i].identifier] = !0;
        for (i = 0, s = u.length; i < s; i++)r[u[i].identifier] && a.push(u[i]), t & (R | U) && delete r[u[i].identifier];
        if (!a.length)return;
        return [C(o.concat(a), "identifier", !0), a]
    }

    function Ct() {
        Z.apply(this, arguments);
        var e = m(this.handler, this);
        this.touch = new Tt(this.manager, e), this.mouse = new mt(this.manager, e)
    }

    function Ht(e, t) {
        this.manager = e, this.set(t)
    }

    function Bt(e) {
        if (S(e, _t))return _t;
        var t = S(e, Dt), n = S(e, Pt);
        return t && n ? Dt + " " + Pt : t || n ? t ? Dt : Pt : S(e, Mt) ? Mt : Ot
    }

    function Wt(e) {
        this.id = A(), this.manager = null, this.options = d(e || {}, this.defaults), this.options.enable = y(this.options.enable, !0), this.state = jt, this.simultaneous = {}, this.requireFail = []
    }

    function Xt(e) {
        return e & Ut ? "cancel" : e & qt ? "end" : e & It ? "move" : e & Ft ? "start" : ""
    }

    function Vt(e) {
        return e == $ ? "down" : e == V ? "up" : e == W ? "left" : e == X ? "right" : ""
    }

    function $t(e, t) {
        var n = t.manager;
        return n ? n.get(e) : e
    }

    function Jt() {
        Wt.apply(this, arguments)
    }

    function Kt() {
        Jt.apply(this, arguments), this.pX = null, this.pY = null
    }

    function Qt() {
        Jt.apply(this, arguments)
    }

    function Gt() {
        Wt.apply(this, arguments), this._timer = null, this._input = null
    }

    function Yt() {
        Jt.apply(this, arguments)
    }

    function Zt() {
        Jt.apply(this, arguments)
    }

    function en() {
        Wt.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0
    }

    function tn(e, t) {
        return t = t || {}, t.recognizers = y(t.recognizers, tn.defaults.preset), new sn(e, t)
    }

    function sn(e, t) {
        t = t || {}, this.options = d(t, tn.defaults), this.options.inputTarget = this.options.inputTarget || e, this.handlers = {}, this.session = {}, this.recognizers = [], this.element = e, this.input = et(this), this.touchAction = new Ht(this, this.options.touchAction), on(this, !0), h(t.recognizers, function (e) {
            var t = this.add(new e[0](e[1]));
            e[2] && t.recognizeWith(e[2]), e[3] && t.requireFailure(e[2])
        }, this)
    }

    function on(e, t) {
        var n = e.element;
        h(e.options.cssProps, function (e, r) {
            n.style[k(n.style, r)] = t ? e : ""
        })
    }

    function un(e, n) {
        var r = t.createEvent("Event");
        r.initEvent(e, !0, !0), r.gesture = n, n.target.dispatchEvent(r)
    }

    var i = ["", "webkit", "moz", "MS", "ms", "o"], s = t.createElement("div"), o = "function", u = Math.round,
        a = Math.abs, f = Date.now, L = 1, O = /mobile|tablet|ip(ad|hone|od)|android/i, M = "ontouchstart" in e,
        _ = k(e, "PointerEvent") !== r, D = M && O.test(navigator.userAgent), P = "touch", H = "pen", B = "mouse",
        j = "kinect", F = 25, I = 1, q = 2, R = 4, U = 8, z = 1, W = 2, X = 4, V = 8, $ = 16, J = W | X, K = V | $,
        Q = J | K, G = ["x", "y"], Y = ["clientX", "clientY"];
    Z.prototype = {
        handler: function () {
        }, destroy: function () {
            this.evEl && w(this.element, this.evEl, this.domHandler), this.evTarget && w(this.target, this.evTarget, this.domHandler), this.evWin && w(e, this.evWin, this.domHandler)
        }
    };
    var pt = {mousedown: I, mousemove: q, mouseup: R}, dt = "mousedown", vt = "mousemove mouseup";
    v(mt, Z, {
        handler: function (t) {
            var n = pt[t.type];
            n & I && t.button === 0 && (this.pressed = !0), n & q && t.which !== 1 && (n = R);
            if (!this.pressed || !this.allow)return;
            n & R && (this.pressed = !1), this.callback(this.manager, n, {
                pointers: [t],
                changedPointers: [t],
                pointerType: B,
                srcEvent: t
            })
        }
    });
    var gt = {pointerdown: I, pointermove: q, pointerup: R, pointercancel: U, pointerout: U},
        yt = {2: P, 3: H, 4: B, 5: j}, bt = "pointerdown", wt = "pointermove pointerup pointercancel";
    e.MSPointerEvent && (bt = "MSPointerDown", wt = "MSPointerMove MSPointerUp MSPointerCancel"), v(Et, Z, {
        handler: function (t) {
            var n = this.store, r = !1, i = t.type.toLowerCase().replace("ms", ""), s = gt[i],
                o = yt[t.pointerType] || t.pointerType, u = o == P;
            s & I && (t.button === 0 || u) ? n.push(t) : s & (R | U) && (r = !0);
            var a = T(n, t.pointerId, "pointerId");
            if (a < 0)return;
            n[a] = t, this.callback(this.manager, s, {
                pointers: n,
                changedPointers: [t],
                pointerType: o,
                srcEvent: t
            }), r && n.splice(a, 1)
        }
    });
    var St = {touchstart: I, touchmove: q, touchend: R, touchcancel: U},
        xt = "touchstart touchmove touchend touchcancel";
    v(Tt, Z, {
        handler: function (t) {
            var n = St[t.type], r = Nt.call(this, t, n);
            if (!r)return;
            this.callback(this.manager, n, {pointers: r[0], changedPointers: r[1], pointerType: P, srcEvent: t})
        }
    }), v(Ct, Z, {
        handler: function (t, n, r) {
            var i = r.pointerType == P, s = r.pointerType == B;
            if (i) this.mouse.allow = !1; else if (s && !this.mouse.allow)return;
            n & (R | U) && (this.mouse.allow = !0), this.callback(t, n, r)
        }, destroy: function () {
            this.touch.destroy(), this.mouse.destroy()
        }
    });
    var kt = k(s.style, "touchAction"), Lt = kt !== r, At = "compute", Ot = "auto", Mt = "manipulation", _t = "none",
        Dt = "pan-x", Pt = "pan-y";
    Ht.prototype = {
        set: function (e) {
            e == At && (e = this.compute()), Lt && (this.manager.element.style[kt] = e), this.actions = e.toLowerCase().trim()
        }, update: function () {
            this.set(this.manager.options.touchAction)
        }, compute: function () {
            var e = [];
            return h(this.manager.recognizers, function (t) {
                g(t.options.enable, [t]) && (e = e.concat(t.getTouchAction()))
            }), Bt(e.join(" "))
        }, preventDefaults: function (e) {
            if (Lt)return;
            var t = e.srcEvent, n = e.offsetDirection;
            if (this.manager.session.prevented) {
                t.preventDefault();
                return
            }
            var r = this.actions, i = S(r, _t), s = S(r, Pt), o = S(r, Dt);
            if (i || s && o || s && n & J || o && n & K)return this.preventSrc(t)
        }, preventSrc: function (e) {
            this.manager.session.prevented = !0, e.preventDefault()
        }
    };
    var jt = 1, Ft = 2, It = 4, qt = 8, Rt = qt, Ut = 16, zt = 32;
    Wt.prototype = {
        defaults: {}, set: function (e) {
            return p(this.options, e), this.manager && this.manager.touchAction.update(), this
        }, recognizeWith: function (e) {
            if (c(e, "recognizeWith", this))return this;
            var t = this.simultaneous;
            return e = $t(e, this), t[e.id] || (t[e.id] = e, e.recognizeWith(this)), this
        }, dropRecognizeWith: function (e) {
            return c(e, "dropRecognizeWith", this) ? this : (e = $t(e, this), delete this.simultaneous[e.id], this)
        }, requireFailure: function (e) {
            if (c(e, "requireFailure", this))return this;
            var t = this.requireFail;
            return e = $t(e, this), T(t, e) === -1 && (t.push(e), e.requireFailure(this)), this
        }, dropRequireFailure: function (e) {
            if (c(e, "dropRequireFailure", this))return this;
            e = $t(e, this);
            var t = T(this.requireFail, e);
            return t > -1 && this.requireFail.splice(t, 1), this
        }, hasRequireFailures: function () {
            return this.requireFail.length > 0
        }, canRecognizeWith: function (e) {
            return !!this.simultaneous[e.id]
        }, emit: function (e) {
            function r(r) {
                t.manager.emit(t.options.event + (r ? Xt(n) : ""), e)
            }

            var t = this, n = this.state;
            n < qt && r(!0), r(), n >= qt && r(!0)
        }, tryEmit: function (e) {
            if (this.canEmit())return this.emit(e);
            this.state = zt
        }, canEmit: function () {
            for (var e = 0; e < this.requireFail.length; e++)if (!(this.requireFail[e].state & (zt | jt)))return !1;
            return !0
        }, recognize: function (e) {
            var t = p({}, e);
            if (!g(this.options.enable, [this, t])) {
                this.reset(), this.state = zt;
                return
            }
            this.state & (Rt | Ut | zt) && (this.state = jt), this.state = this.process(t), this.state & (Ft | It | qt | Ut) && this.tryEmit(t)
        }, process: function (e) {
        }, getTouchAction: function () {
        }, reset: function () {
        }
    }, v(Jt, Wt, {
        defaults: {pointers: 1}, attrTest: function (e) {
            var t = this.options.pointers;
            return t === 0 || e.pointers.length === t
        }, process: function (e) {
            var t = this.state, n = e.eventType, r = t & (Ft | It), i = this.attrTest(e);
            if (r && (n & U || !i))return t | Ut;
            if (r || i)return n & R ? t | qt : t & Ft ? t | It : Ft;
            return zt
        }
    }), v(Kt, Jt, {
        defaults: {event: "pan", threshold: 10, pointers: 1, direction: Q}, getTouchAction: function () {
            var e = this.options.direction;
            if (e === Q)return [_t];
            var t = [];
            return e & J && t.push(Pt), e & K && t.push(Dt), t
        }, directionTest: function (e) {
            var t = this.options, n = !0, r = e.distance, i = e.direction, s = e.deltaX, o = e.deltaY;
            return i & t.direction || (t.direction & J ? (i = s === 0 ? z : s < 0 ? W : X, n = s != this.pX, r = Math.abs(e.deltaX)) : (i = o === 0 ? z : o < 0 ? V : $, n = o != this.pY, r = Math.abs(e.deltaY))), e.direction = i, n && r > t.threshold && i & t.direction
        }, attrTest: function (e) {
            return Jt.prototype.attrTest.call(this, e) && (this.state & Ft || !(this.state & Ft) && this.directionTest(e))
        }, emit: function (e) {
            this.pX = e.deltaX, this.pY = e.deltaY;
            var t = Vt(e.direction);
            t && this.manager.emit(this.options.event + t, e), this._super.emit.call(this, e)
        }
    }), v(Qt, Jt, {
        defaults: {event: "pinch", threshold: 0, pointers: 2}, getTouchAction: function () {
            return [_t]
        }, attrTest: function (e) {
            return this._super.attrTest.call(this, e) && (Math.abs(e.scale - 1) > this.options.threshold || this.state & Ft)
        }, emit: function (e) {
            this._super.emit.call(this, e);
            if (e.scale !== 1) {
                var t = e.scale < 1 ? "in" : "out";
                this.manager.emit(this.options.event + t, e)
            }
        }
    }), v(Gt, Wt, {
        defaults: {event: "press", pointers: 1, time: 500, threshold: 5}, getTouchAction: function () {
            return [Ot]
        }, process: function (e) {
            var t = this.options, n = e.pointers.length === t.pointers, r = e.distance < t.threshold,
                i = e.deltaTime > t.time;
            this._input = e;
            if (!r || !n || e.eventType & (R | U) && !i) this.reset(); else if (e.eventType & I) this.reset(), this._timer = l(function () {
                this.state = Rt, this.tryEmit()
            }, t.time, this); else if (e.eventType & R)return Rt;
            return zt
        }, reset: function () {
            clearTimeout(this._timer)
        }, emit: function (e) {
            if (this.state !== Rt)return;
            e && e.eventType & R ? this.manager.emit(this.options.event + "up", e) : (this._input.timeStamp = f(), this.manager.emit(this.options.event, this._input))
        }
    }), v(Yt, Jt, {
        defaults: {event: "rotate", threshold: 0, pointers: 2}, getTouchAction: function () {
            return [_t]
        }, attrTest: function (e) {
            return this._super.attrTest.call(this, e) && (Math.abs(e.rotation) > this.options.threshold || this.state & Ft)
        }
    }), v(Zt, Jt, {
        defaults: {event: "swipe", threshold: 10, velocity: .65, direction: J | K, pointers: 1},
        getTouchAction: function () {
            return Kt.prototype.getTouchAction.call(this)
        },
        attrTest: function (e) {
            var t = this.options.direction, n;
            t & (J | K) ? n = e.velocity : t & J ? n = e.velocityX : t & K && (n = e.velocityY);
            var r = this._super.attrTest.call(this, e) && t & e.direction && a(n) > this.options.velocity && e.eventType & R;
            return r
        },
        emit: function (e) {
            var t = Vt(e.direction);
            t && this.manager.emit(this.options.event + t, e), this.manager.emit(this.options.event, e)
        }
    }), v(en, Wt, {
        defaults: {
            event: "tap",
            pointers: 1,
            taps: 1,
            interval: 300,
            time: 250,
            threshold: 2,
            posThreshold: 10
        }, getTouchAction: function () {
            return [Mt]
        }, process: function (e) {
            var t = this.options, n = e.pointers.length === t.pointers, r = e.distance < t.threshold,
                i = e.deltaTime < t.time;
            this.reset();
            if (e.eventType & I && this.count === 0)return this.failTimeout();
            if (r && i && n) {
                if (e.eventType != R)return this.failTimeout();
                var s = this.pTime ? e.timeStamp - this.pTime < t.interval : !0,
                    o = !this.pCenter || ft(this.pCenter, e.center) < t.posThreshold;
                this.pTime = e.timeStamp, this.pCenter = e.center, !o || !s ? this.count = 1 : this.count += 1, this._input = e;
                var u = this.count % t.taps;
                if (u === 0)return this.hasRequireFailures() ? (this._timer = l(function () {
                    this.state = Rt, this.tryEmit()
                }, t.interval, this), Ft) : Rt
            }
            return zt
        }, failTimeout: function () {
            return this._timer = l(function () {
                this.state = zt
            }, this.options.interval, this), zt
        }, reset: function () {
            clearTimeout(this._timer)
        }, emit: function () {
            this.state == Rt && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
        }
    }), tn.VERSION = "2.0.2", tn.defaults = {
        domEvents: !1,
        touchAction: At,
        inputTarget: null,
        enable: !0,
        preset: [[Yt, {enable: !1}], [Qt, {enable: !1}, ["rotate"]], [Zt, {direction: J}], [Kt, {direction: J}, ["swipe"]], [en], [en, {
            event: "doubletap",
            taps: 2
        }, ["tap"]], [Gt]],
        cssProps: {
            userSelect: "none",
            touchSelect: "none",
            touchCallout: "none",
            contentZooming: "none",
            userDrag: "none",
            tapHighlightColor: "rgba(0,0,0,0)"
        }
    };
    var nn = 1, rn = 2;
    sn.prototype = {
        set: function (e) {
            return p(this.options, e), this
        }, stop: function (e) {
            this.session.stopped = e ? rn : nn
        }, recognize: function (e) {
            var t = this.session;
            if (t.stopped)return;
            this.touchAction.preventDefaults(e);
            var n, r = this.recognizers, i = t.curRecognizer;
            if (!i || i && i.state & Rt) i = t.curRecognizer = null;
            for (var s = 0,
                     o = r.length; s < o; s++)n = r[s], t.stopped !== rn && (!i || n == i || n.canRecognizeWith(i)) ? n.recognize(e) : n.reset(), !i && n.state & (Ft | It | qt) && (i = t.curRecognizer = n)
        }, get: function (e) {
            if (e instanceof Wt)return e;
            var t = this.recognizers;
            for (var n = 0; n < t.length; n++)if (t[n].options.event == e)return t[n];
            return null
        }, add: function (e) {
            if (c(e, "add", this))return this;
            var t = this.get(e.options.event);
            return t && this.remove(t), this.recognizers.push(e), e.manager = this, this.touchAction.update(), e
        }, remove: function (e) {
            if (c(e, "remove", this))return this;
            var t = this.recognizers;
            return e = this.get(e), t.splice(T(t, e), 1), this.touchAction.update(), this
        }, on: function (e, t) {
            var n = this.handlers;
            return h(x(e), function (e) {
                n[e] = n[e] || [], n[e].push(t)
            }), this
        }, off: function (e, t) {
            var n = this.handlers;
            return h(x(e), function (e) {
                t ? n[e].splice(T(n[e], t), 1) : delete n[e]
            }), this
        }, emit: function (e, t) {
            this.options.domEvents && un(e, t);
            var n = this.handlers[e] && this.handlers[e].slice();
            if (!n || !n.length)return;
            t.type = e, t.preventDefault = function () {
                t.srcEvent.preventDefault()
            };
            for (var r = 0, i = n.length; r < i; r++)n[r](t)
        }, destroy: function () {
            this.element && on(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
        }
    }, p(tn, {
        INPUT_START: I,
        INPUT_MOVE: q,
        INPUT_END: R,
        INPUT_CANCEL: U,
        STATE_POSSIBLE: jt,
        STATE_BEGAN: Ft,
        STATE_CHANGED: It,
        STATE_ENDED: qt,
        STATE_RECOGNIZED: Rt,
        STATE_CANCELLED: Ut,
        STATE_FAILED: zt,
        DIRECTION_NONE: z,
        DIRECTION_LEFT: W,
        DIRECTION_RIGHT: X,
        DIRECTION_UP: V,
        DIRECTION_DOWN: $,
        DIRECTION_HORIZONTAL: J,
        DIRECTION_VERTICAL: K,
        DIRECTION_ALL: Q,
        Manager: sn,
        Input: Z,
        TouchAction: Ht,
        Recognizer: Wt,
        AttrRecognizer: Jt,
        Tap: en,
        Pan: Kt,
        Swipe: Zt,
        Pinch: Qt,
        Rotate: Yt,
        Press: Gt,
        on: b,
        off: w,
        each: h,
        merge: d,
        extend: p,
        inherit: v,
        bindFn: m,
        prefixed: k
    }), typeof define == o && define.amd ? define("hammerjs", [], function () {
        return tn
    }) : typeof module != "undefined" && module.exports ? module.exports = tn : e[n] = tn
}(window, document, "Hammer"), define("jquery.hammer", ["hammerjs"], function (e) {
    return function (e, t, n) {
        function r(r, i) {
            var s = e(r);
            s.data(n) || s.data(n, new t(s[0], i))
        }

        e.fn.hammer = function (e) {
            return this.each(function () {
                r(this, e)
            })
        }, t.Manager.prototype.emit = function (e) {
            return function (t, n) {
                e.call(this, t, n), jQuery(this.element).triggerHandler({type: t, gesture: n})
            }
        }(t.Manager.prototype.emit)
    }(jQuery, e, "hammer"), e
}), define("Mobile", ["Class", "jquery", "TweenLite", "TimelineLite", "Global", "lib/fastclick", "jquery.hammer"], function (e, t, n, r, i, s) {
    var o = new e({
        initialize: function () {
            this.mobileInteractions(), s.attach(document.body)
        }, mobileInteractions: function () {
            if (i.currentWidthType === "mobile" || i.currentWidthType === "tabletPortrait") t("main").on("click", ".rightNav.mobile-open a", function (e) {
                n.to(t(".rightNav"), .4, {
                    opacity: 0, onComplete: function () {
                        t(".rightNav").removeClass("mobile-open"), t(".loadedContent, main.single-work").find("article").first().removeClass("blurred"), t(".mobile-post-nav").removeClass("blurred")
                    }
                }), e.preventDefault()
            }), t("#category-nav.work-sorter ul.sub-menu li a").on("click", function () {
                var e = t(this).html();
                t(this).parent().parent().siblings("a").children("span").html(e), t(this).parent().parent().removeClass("visible")
            })
        }
    });
    return o
}), define("lib/LibJS/signals/Signal", [], function () {
    function e() {
        this._signalID = "signal" + e.nextSignalID, this._addOnceList = {}, this._listeners = [], e.nextSignalID++, arguments.length === 0 && (this.onListenerAdded = new e(!1), this.onListenerRemoved = new e(!1))
    }

    return e.nextSignalID = 0, e.nextListenerID = 0, e.prototype.countListeners = 0, e.prototype._signalID = 0, e.prototype._addOnceList = null, e.prototype._listeners = null, e.prototype._dispatchStopped = !1, e.prototype.onListenerAdded = null, e.prototype.onListenerRemoved = null, e.prototype.addOnce = function (e, t) {
        this.add(e, t), this._addOnceList[e.listenerIDX[this._signalID]] = !0
    }, e.prototype.add = function (t, n) {
        t.listenerIDX === undefined && (t.listenerID = e.nextListenerID++, t.listenerIDX = {}, t.targets = {}), t.listenerIDX[this._signalID] === undefined && (t.listenerIDX[this._signalID] = this._listeners.length, t.targets[this._signalID] = n, this._listeners[this._listeners.length] = t, this.countListeners++, this.onListenerAdded !== null && this.onListenerAdded.dispatch())
    }, e.prototype.remove = function (e) {
        if (typeof e != "undefined" && this._checkHasId(e)) {
            var t = e.listenerIDX[this._signalID];
            this._listeners.splice(t, 1);
            for (var n = t; n < this._listeners.length; n++)this._listeners[n].listenerIDX[this._signalID] = n;
            this.countListeners--, this.onListenerRemoved !== null && this.onListenerRemoved.dispatch(), delete e.listenerIDX[this._signalID], delete e.targets[this._signalID]
        }
    }, e.prototype.dispatch = function () {
        var e = this._listeners.concat();
        for (var t = 0; !this._dispatchStopped && t < e.length; t++)e[t].apply(e[t].targets[this._signalID], arguments), this._addOnceList[t] !== undefined && (this.remove(this._listeners[t]), delete this._addOnceList[t]);
        this._dispatchStopped = !1
    }, e.prototype.stopDispatch = function () {
        this._dispatchStopped = !0
    }, e.prototype._checkHasId = function (e) {
        return e.listenerIDX !== undefined && e.listenerIDX[this._signalID] !== undefined
    }, e
}), define("libjs/utils/Util", [], function () {
    var e = function () {
        var t = {
            PRODUCTION: "production",
            DEV: "dev",
            env: "production",
            support: {isHandheld: !1, isIPhone: !1, isRetina: !1, prefix: null}
        };
        /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) && (t.support.isHandheld = !0, t.support.isIPhone = /iPhone/.test(navigator.userAgent), t.support.isAndroid = /Android/.test(navigator.userAgent), t.support.isWebOS = /webOS/.test(navigator.userAgent), t.support.isIPad = /iPad/.test(navigator.userAgent), t.support.isIPod = /iPod/.test(navigator.userAgent), t.support.isBlackberry = /BlackBerry/.test(navigator.userAgent)), window.devicePixelRatio > 1 && (t.support.isRetina = !0);
        var n = window.getComputedStyle(document.documentElement, ""),
            r = (Array.prototype.slice.call(n).join("").match(/-(moz|webkit|ms)-/) || n.OLink === "" && ["", "o"])[1],
            i = "WebKit|Moz|MS|O".match(new RegExp("(" + r + ")", "i"))[1];
        return t.support.prefix = {
            dom: i,
            lowercase: r,
            css: "-" + r + "-",
            js: r[0].toUpperCase() + r.substr(1)
        }, t.truncate = function (e, t, n) {
            var r = e.substring(0, t);
            return e.length > t && n !== !1 && (r += "&#8230;"), r
        }, t.defer = function (e) {
            var t = Array.prototype.slice.call(arguments, 1);
            return setTimeout(function () {
                e.apply(null, t)
            }, 0)
        }, t.getImageURL = function (t) {
            return e.support.isRetina && t && t.length ? t.replace(/(\.\w+$)/, "@2x$1") : t
        }, t.format = function () {
            var e = arguments;
            return e.length == 0 ? "" : e.length == 1 ? e[0] : e[0].replace(/{(\d+)}/g, function (t, n) {
                return typeof e[+n + 1] != "undefined" ? e[+n + 1] : t
            })
        }, t.shuffle = function (e) {
            var t = e.length, n, r;
            while (t--)r = Math.random() * t | 0, n = e[t], e[t] = e[r], e[r] = n;
            return e
        }, t
    }();
    return e
}), define("Nav", ["Class", "jquery", "TweenLite", "TimelineLite", "Global", "lib/LibJS/signals/Signal", "libjs/utils/Util", "utils/GA"], function (e, t, n, r, i, s, o, u) {
    var a, f = new e({
        navTimelineOpen: null,
        navTimelineClose: null,
        buttonProps: {startWidth: 20, endWidth: 255},
        initialize: function () {
            var e = t(".menu-wrap .main-nav li"), r;
            a = this, i.nav = this, this.onClosed = new s, this.onOpened = new s, this.animateOutMenu = this.animateOutMenu.bind(this), this.animateInMenu = this.animateInMenu.bind(this), i.currentWidthType == "mobile" && (this.buttonProps.endWidth = 150, t(".blog-title a").addClass("mobile")), this.clickHandlerBound = this.clickHandler.bind(this), i.isMobile ? (t("#menu-click-area").on("touchend click", this.clickHandlerBound), t(document).on("touchend click", "#menu-content-overlay", this.clickHandlerBound)) : (t(document).on("touchend click", ".nav-button, #menu-content-overlay", this.clickHandlerBound), t("body.home").on("touchend click", ".nav-button-text", this.clickHandlerBound), e.each(function (e, t) {
                t.firstChild.innerHTML.toUpperCase() === "REEL" && (r = t)
            }), r && r.parentNode.removeChild(r)), t(".news-wrap article .image-wrapper").on("hover"), function () {
                0
            }, t(document).on("click", ".main-nav a", function (e) {
                var r = this;
                i.onNavItemClicked.dispatch(), a.animateOutMenu(), n.to(t('main[role="main"]'), .9, {
                    opacity: 0,
                    ease: Expo.easeOut,
                    onComplete: function () {
                        window.location.href = t(r).attr("href")
                    }
                }), e.preventDefault()
            }), t(".main-footer").find("a").click(function (e) {
                var r = t(event.target).hasClass("accessibility");
                if (r) {
                    var i = this;
                    a.animateOutMenu(), n.to(t('main[role="main"]'), .9, {
                        opacity: 0,
                        ease: Expo.easeOut,
                        onComplete: function () {
                            window.location.href = t(i).attr("href")
                        }
                    }), e.preventDefault()
                } else window.open(t(e.target).parent().attr("href"), "_blank")
            });
            if (!i.isMobile)var o = function () {
                n.to(t(".post-navigation-wrap"), .3, {top: t(this).scrollTop() + "px"}), n.set(t(".post-navigation-wrap .post-nav"), {top: t(window).height() * .5})
            };
            t("#menu-content-overlay").on("touchmove", function (e) {
                e.preventDefault()
            }), t(".menu-wrap").on("touchmove", function (e) {
                e.preventDefault()
            }), i.onResize.add(this.resized.bind(this)), t("body").on("click", 'a[href*="mailto:"], a[href*="tel:"]', function () {
                i.noBeforeUnload = !0
            })
        },
        clickHandler: function (e) {
            e.stopPropagation(), i.isLoading != 1 && (i.menuOpen ? a.animateOutMenu() : a.animateInMenu()), e.preventDefault()
        },
        getSlideItems: function () {
            return [t("#map-right")[0], t("#content-wrap")[0], t("footer#news-footer")[0]]
        },
        getMenuHideAmount: function () {
            return i.currentWidthType == "mobile" ? 281 : i.currentWidthType == "tabletPortrait" ? 281 : 281
        },
        getSlideDistance: function () {
            return i.currentWidthType == "mobile" ? 281 : i.currentWidthType == "tabletPortrait" ? 281 : i.currentWidthType == "tabletLandscape" ? 281 : 182
        },
        stopScroll: function (e) {
            e.stopPropagation(), e.preventDefault()
        },
        animateOutMenu: function (e) {
            if (!i.menuOpen)return;
            e = e || 0;
            var r = .3, s = Expo.easeOut;
            i.isMobile && n.to(t(".main-header"), r, {
                x: 0,
                ease: s
            }), t(document).on("mousewheel DOMMouseScroll", a.stopScroll);
            var o = this.getSlideItems();
            n.to(o, r, {
                x: 0, ease: s, delay: e, clearProps: "transform", onComplete: function () {
                    a.navExposed()
                }
            }), n.to(t("#fauxHeader #header-inner"), .5, {
                x: 0,
                ease: s,
                delay: e
            }), n.to(t(".menu-wrap"), r, {x: -this.getMenuHideAmount(), ease: s, delay: e})
        },
        animateInMenu: function (e) {
            if (i.menuOpen)return;
            n.set(t(".menu-wrap"), {height: window.innerHeight});
            var r = "MenuClick", s = "";
            switch (u.pageID) {
                case"home":
                    r = "IntroClick", s = "on Intro";
                    break;
                case"work":
                    s = "Work";
                    break;
                case"about":
                    s = "About";
                    break;
                case"work_page":
                    s = "WorkPage";
                    break;
                case"process":
                    s = "Process";
                    break;
                case"news":
                    s = "News";
                    break;
                case"news_page":
                    s = "NewsPage";
                    break;
                case"achievements":
                    s = "AchievementsPage";
                    break;
                case"contact":
                    s = "ContactPage";
                    break;
                case"careers":
                    s = "Careers";
                    break;
                case"reel":
                    s = "Reel";
                    break;
                case"careers_page":
                    s = "CareersPage"
            }
            u.trackEvent("OpenMenu", r, s), e = e || .2, t("#content-wrap").addClass("gpu"), this.navExposed();
            var o = .5, a = Expo.easeInOut, f = this.getSlideDistance();
            i.isMobile;
            var l = t(".menu-wrap").width(), c = e + .2;
            t(".menu-wrap .main-nav li").each(function (e, t) {
                n.fromTo(t, .5, {x: -10, opacity: 0, ease: Quint.easeOut}, {
                    x: 0,
                    opacity: 1,
                    ease: Quint.easeOut,
                    delay: c
                }), c += .045
            }.bind(this));
            var h = this.getSlideItems();
            n.set(t(".main-header, .rightNav"), {position: "absolute", top: t(window).scrollTop()}), n.to(h, o, {
                x: f,
                ease: a,
                delay: 0
            }), n.to(t(".menu-wrap"), o, {x: 0, ease: a, delay: 0}), n.to(t("#fauxHeader #header-inner"), .5, {
                x: 20,
                ease: a,
                delay: 0
            }), c = e + .4, t(".main-footer .social-links li").each(function (e, t) {
                n.fromTo(t, .5, {y: 20, opacity: 0, ease: Quint.easeOut}, {
                    y: 0,
                    opacity: 1,
                    ease: Quint.easeOut,
                    delay: c
                }), c += .045
            }.bind(this)), c = e + .8, t(".main-footer .site-info p").each(function (e, t) {
                n.fromTo(t, .5, {x: -10, opacity: 0, ease: Quint.easeOut}, {
                    x: 0,
                    opacity: 1,
                    ease: Quint.easeOut,
                    delay: c
                }), c += .045
            }.bind(this))
        },
        resized: function () {
            t("#menu-content-overlay").css({
                width: i.width,
                height: i.windowHeight
            }), i.isMobile || n.set(t(".post-navigation-wrap .post-nav"), {top: (t(window).height() - 100) * .5})
        },
        navExposed: function () {
            i.menuOpen ? (t(".container, body").removeClass("nav-exposed"), i.menuOpen = !1, i.navClosed.dispatch(), this.onClosed.dispatch(), n.set(t(".main-header, .rightNav"), {clearProps: "position,top"}), t(document).off("mousewheel DOMMouseScroll", a.stopScroll), t("#content-wrap").removeClass("gpu"), n.set(t("#content-wrap, .main-header"), {
                delay: .25,
                clearProps: "width"
            }), n.set(t("nav#category-nav.work-sorter"), {
                delay: .3,
                clearProps: "position,top,left,right"
            }), t(window).off("resize", a.animateOutMenu), t(document).off("mousewheel DOMMouseScroll", a.animateOutMenu), i.isMobile || t("section.cover.open").length == 0 && (n.set(t(".rightNav, .post-navigation-wrap"), {position: "fixed"}), n.set(t(".post-navigation-wrap"), {clearProps: "left,right,top"})), n.set(t("#menu-content-overlay"), {visibility: "hidden"})) : (this.onOpened.dispatch(), i.navOpened.dispatch(), i.menuOpen = !0, i.isIOS8 && /iPhone/i.test(navigator.userAgent) && /Version/i.test(navigator.userAgent) && (t(document).scrollTop(0), 0), t("#content-wrap").css("width", t("#content-wrap").outerWidth()), t(window).one("resize", a.animateOutMenu), t(document).one("mousewheel DOMMouseScroll", a.animateOutMenu), n.set(t("#menu-content-overlay"), {visibility: "visible"}), i.isMobile || (n.set(t(".rightNav, .post-navigation-wrap"), {position: "absolute"}), n.set(t(".post-navigation-wrap"), {
                left: 0,
                right: 0,
                top: t(window).scrollTop() - 100
            })), t(".container, body").addClass("nav-exposed"))
        }
    });
    return f
}), define("jquery.fitVids", ["jquery"], function (e) {
    (function (e) {
        "use strict";
        e.fn.fitVids = function (t) {
            var n = {customSelector: null};
            if (!document.getElementById("fit-vids-style")) {
                var r = document.createElement("div"),
                    i = document.getElementsByTagName("base")[0] || document.getElementsByTagName("script")[0];
                r.className = "fit-vids-style", r.id = "fit-vids-style", r.style.display = "none", r.innerHTML = "&shy;<style>                 .fluid-width-video-wrapper {                   width: 100%;                                position: relative;                         padding: 0;                              }                                                                                       .fluid-width-video-wrapper iframe,          .fluid-width-video-wrapper object,          .fluid-width-video-wrapper embed {             position: absolute;                         top: 0;                                     left: 0;                                    width: 100%;                                height: 100%;                            }                                         </style>", i.parentNode.insertBefore(r, i)
            }
            return t && e.extend(n, t), this.each(function () {
                var t = ["iframe[src*='player.vimeo.com']", "iframe[src*='youtube.com']", "iframe[src*='youtube-nocookie.com']", "iframe[src*='kickstarter.com'][src*='video.html']", "object", "embed"];
                n.customSelector && t.push(n.customSelector);
                var r = e(this).find(t.join(","));
                r = r.not("object object"), r.each(function () {
                    var t = e(this);
                    if (this.tagName.toLowerCase() === "embed" && t.parent("object").length || t.parent(".fluid-width-video-wrapper").length)return;
                    var n = this.tagName.toLowerCase() === "object" || t.attr("height") && !isNaN(parseInt(t.attr("height"), 10)) ? parseInt(t.attr("height"), 10) : t.height(),
                        r = isNaN(parseInt(t.attr("width"), 10)) ? t.width() : parseInt(t.attr("width"), 10), i = n / r;
                    if (!t.attr("id")) {
                        var s = "fitvid" + Math.floor(Math.random() * 999999);
                        t.attr("id", s)
                    }
                    t.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", i * 100 + "%"), t.removeAttr("height").removeAttr("width")
                })
            })
        }
    })(jQuery)
}), define("News", ["Class", "jquery", "TweenLite", "TimelineLite", "Global", "jquery.fitVids", "libjs/utils/Util", "utils/GA"], function (e, t, n, r, i, s, o, u) {
    var a = new e({
        initialize: function () {
            var e = this;
            t('input[type="text"]').val(""), u.setPageID("news");
            var s = new r({paused: !0});
            s.to(t("#textCursor"), 1, {left: 40, ease: Expo.easeInOut}).to(t("#placeHolder"), 1, {
                opacity: 0,
                ease: Expo.easeInOut,
                onComplete: function () {
                    t("#placeHolder").css("z-index", 50), t('input[type="text"]').focus(), t("#textCursor").css("opacity", 0)
                },
                onReverseComplete: function () {
                }
            }, 0), this.navDropDowns(), e.loadBlogContent = e.loadBlogContent.bind(this), t("#category-nav.news-sorter ul.main-cat li ul li a").on("click", function (n) {
                var r = t(this);
                u.trackEvent("News", "NewsClick", r.data("filtername")), e.loadBlogContent(r, "load-cat-filter"), t("#category-nav.news-sorter ul.main-cat > li > ul").removeClass("visible"), n.preventDefault()
            }), t("#category-nav.news-sorter ul.sub-cat li ul li a").on("click", function (n) {
                var r = t(this);
                u.trackEvent("News", "NewsClick", r.data("filtername")), e.loadBlogContent(r, "load-tag-filter"), n.preventDefault()
            }), t("#searchform").click(function () {
                s.play()
            }), t("#searchform").on("submit", function () {
                var e = t("#searchform").find("#s").val();
                u.trackEvent("Search", "NewsClick", e)
            }), t('input[type="text"]').blur(function () {
                0, t(this).val() || (t("#placeHolder").css("z-index", 150), t("#textCursor").css("opacity", 1), s.reverse())
            }), jQuery(".container").fitVids(), this.titleHovers(), this.searchOveride(), t("#content-wrap .content .news-wrap").on("mouseover", ".entry-title, .image-wrapper", _.debounce(function (e) {
                var r = t(this).parent().find(".entry-content a.read-more:first");
                r.addClass("hover"), n.delayedCall(.5, function () {
                    r.removeClass("hover")
                })
            }, 100)), t(window).resize(this.onResize.bind(this)), i.isMobile && t(".news-wrap").on("touchstart", "article a", function () {
                this.style.opacity = .7
            }).on("touchend", "article a", function () {
                this.style.opacity = 1
            }), t(".entry-content").find(".text").each(function (e, n) {
                var r = t(this), i = r.text().replace(/^\s+|\s+$/g, "");
                r.data("text", i)
            }), this.truncateText(!0), t("#category-nav ul").on("mouseover", "> li ul li", function () {
                var e = t(this);
                e.next("li a").addClass("no-border")
            }).on("mouseout", "> li ul li", function () {
                var e = t(this);
                e.next("li a").removeClass("no-border")
            }), t("a.read-more").on("click", function () {
                var e = t(this), n = e.closest("article"), r = n.find("header.entry-title > h2 > a").data("title");
                u.trackEvent("News", "NewsClickKeepReading", r)
            }), t("header.entry-title > h2 > a").on("click", function () {
                var e = t(this), n = e.data("title");
                u.trackEvent("News", "NewsClickLatest", n)
            }), t("article .image-wrapper a").on("click", function () {
                var e = t(this), n = e.closest("article"), r = n.find("header.entry-title > h2 > a").data("title");
                u.trackEvent("News", "NewsClickLatest", r)
            })
        }, truncateText: function (e) {
            var n = i.currentWidthType == "mobile" ? 30 : 100;
            t(".entry-content").find(".text").each(function (e, r) {
                var s = t(this), u = s.data("text");
                i.isMobile && (u = o.truncate(u, n)), s.html(u)
            }), e && t(".entry-content").css("visibility", "visible")
        }, onResize: function () {
            this.titleHovers(), this.truncateText()
        }, titleHovers: function () {
            t(".hoverTitle span").each(function () {
                var e = t(this);
                e.width(e.parent().parent().width() + 2)
            })
        }, navDropDowns: function () {
            i.isMobile ? (t("#category-nav.work-sorter").on("click", "ul li a", function (e) {
                u.trackEvent("News", "NewsClick", "Category"), t(this).siblings("ul").toggleClass("visible"), t(this).parent().parent().siblings().find("ul").removeClass("visible"), e.preventDefault()
            }), t("#category-nav.news-sorter").on("click", "> ul > li > a", function (e) {
                u.trackEvent("News", "NewsClick", "SubCategory");
                var n = t(this);
                t(this).siblings("ul").toggleClass("visible");
                var r = n.parent().parent();
                r.siblings("ul").find("> li > ul").removeClass("visible"), e.preventDefault()
            })) : (t("#category-nav").on("mouseenter", "ul", function () {
                t(this).find("li ul").addClass("visible"), t(this).siblings().find("li ul").removeClass("visible"), t(".news-wrap").addClass("fade")
            }).on("mouseleave", function () {
                t(this).find("ul li ul").removeClass("visible"), t(".news-wrap").removeClass("fade")
            }), t("#category-nav ul").one("mouseenter", function () {
                var e = t(this), n = e.find("a span").text().replace(/^\s+|\s+$/g, "");
                u.trackEvent("News", "NewsClick", n)
            }))
        }, loadBlogContent: function (e, n) {
            var r = t(e).attr("data-filter-id"), i = t(e).attr("data-filtername"), s = "/wp-admin/admin-ajax.php",
                o = this;
            t.ajax({
                type: "POST", url: s, data: {action: n, filter: r}, success: function (n) {
                    t(".news-wrap").html(n), t(".current-category").text(i);
                    var r = t(e).parent().parent().parent().parent();
                    return r.hasClass("main-cat") ? (t("span.cat-title").text(i), t("span.sub-cat-title").text("ALL")) : (t("span.sub-cat-title").text(i), t("span.cat-title").text("GENERAL")), o.truncateText(), !1
                }
            })
        }, searchOveride: function () {
            t('form[role="search"]').submit(function (e) {
                e.preventDefault();
                var n = t('input[name="s"]').val();
                if (n == "" || n == " ") {
                    e.preventDefault();
                    return
                }
                window.location.assign("/search/" + encodeURIComponent(n))
            })
        }
    });
    return a
}), define("About", ["Class", "Global", "jquery", "utils/GA"], function (e, t, n, r) {
    var i = new e({
        bannerImageLoaded: !1, initialize: function () {
            r.setPageID("about");
            var e = n(".banner-image.zoomable img"), i = e[0];
            i && i.complete ? this.bannerImgLoaded() : i.onload = this.bannerImgLoaded.bind(this), t.onResize.add(this.onResize.bind(this))
        }, bannerImgLoaded: function () {
            this.bannerImageLoaded = !0, this.onResize()
        }, onResize: function () {
            var e = n(".banner-image.zoomable"), t = e.find("img"), r = t.height(), i = r * .8;
            0, e.css({height: i}), t.css({top: (i - r) * .5})
        }
    });
    return i
}), function (e) {
    typeof define == "function" && define.amd ? define("jquery.mousewheel", ["jquery"], e) : typeof exports == "object" ? module.exports = e : e(jQuery)
}(function (e) {
    function a(t) {
        var n = t || window.event, o = r.call(arguments, 1), a = 0, c = 0, h = 0, p = 0, d = 0, v = 0;
        t = e.event.fix(n), t.type = "mousewheel", "detail" in n && (h = n.detail * -1), "wheelDelta" in n && (h = n.wheelDelta), "wheelDeltaY" in n && (h = n.wheelDeltaY), "wheelDeltaX" in n && (c = n.wheelDeltaX * -1), "axis" in n && n.axis === n.HORIZONTAL_AXIS && (c = h * -1, h = 0), a = h === 0 ? c : h, "deltaY" in n && (h = n.deltaY * -1, a = h), "deltaX" in n && (c = n.deltaX, h === 0 && (a = c * -1));
        if (h === 0 && c === 0)return;
        if (n.deltaMode === 1) {
            var m = e.data(this, "mousewheel-line-height");
            a *= m, h *= m, c *= m
        } else if (n.deltaMode === 2) {
            var g = e.data(this, "mousewheel-page-height");
            a *= g, h *= g, c *= g
        }
        p = Math.max(Math.abs(h), Math.abs(c));
        if (!s || p < s) s = p, l(n, p) && (s /= 40);
        l(n, p) && (a /= 40, c /= 40, h /= 40), a = Math[a >= 1 ? "floor" : "ceil"](a / s), c = Math[c >= 1 ? "floor" : "ceil"](c / s), h = Math[h >= 1 ? "floor" : "ceil"](h / s);
        if (u.settings.normalizeOffset && this.getBoundingClientRect) {
            var y = this.getBoundingClientRect();
            d = t.clientX - y.left, v = t.clientY - y.top
        }
        return t.deltaX = c, t.deltaY = h, t.deltaFactor = s, t.offsetX = d, t.offsetY = v, t.deltaMode = 0, o.unshift(t, a, c, h), i && clearTimeout(i), i = setTimeout(f, 200), (e.event.dispatch || e.event.handle).apply(this, o)
    }

    function f() {
        s = null
    }

    function l(e, t) {
        return u.settings.adjustOldDeltas && e.type === "mousewheel" && t % 120 === 0
    }

    var t = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        n = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        r = Array.prototype.slice, i, s;
    if (e.event.fixHooks)for (var o = t.length; o;)e.event.fixHooks[t[--o]] = e.event.mouseHooks;
    var u = e.event.special.mousewheel = {
        version: "3.1.11", setup: function () {
            if (this.addEventListener)for (var t = n.length; t;)this.addEventListener(n[--t], a, !1); else this.onmousewheel = a;
            e.data(this, "mousewheel-line-height", u.getLineHeight(this)), e.data(this, "mousewheel-page-height", u.getPageHeight(this))
        }, teardown: function () {
            if (this.removeEventListener)for (var t = n.length; t;)this.removeEventListener(n[--t], a, !1); else this.onmousewheel = null;
            e.removeData(this, "mousewheel-line-height"), e.removeData(this, "mousewheel-page-height")
        }, getLineHeight: function (t) {
            var n = e(t)["offsetParent" in e.fn ? "offsetParent" : "parent"]();
            return n.length || (n = e("body")), parseInt(n.css("fontSize"), 10)
        }, getPageHeight: function (t) {
            return e(t).height()
        }, settings: {adjustOldDeltas: !0, normalizeOffset: !0}
    };
    e.fn.extend({
        mousewheel: function (e) {
            return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
        }, unmousewheel: function (e) {
            return this.unbind("mousewheel", e)
        }
    })
}), define("Process", ["Class", "Global", "jquery", "underscore", "TweenLite", "TimelineLite", "jquery.hammer", "jquery.mousewheel", "libjs/utils/Util", "utils/GA"], function (e, t, n, r, i, s, o, u, a, f) {
    var l = 100, c = 1188 / 677, h = 1, p = new e({
        initialize: function () {
            this.slides = PROCESS_SLIDES, 0, f.setPageID("process"), this.container = n(".process-container"), this.imageContainer = n(".process-images"), this.circleMenu = n(".circle-menu"), this.circles = [], this.image = null, this.image = n(".contentImage"), this.lastImage = null, this.text = n(".contentText"), this.title = n(".contentTitle"), this.count = n(".contentCount"), this.nextButtonContainer = n(".da-arrows"), this.nextButton = n(".da-arrows-next"), this.waitingForScroll = !0, this.textLineHeight = 85, this.lastWidthType = null, this.animating = !1, this.deferredSwipe = null, this.lastImage = null, this.firstPage = !0, this.currentPage = -1;
            var e = 2e3;
            this.nextThrottled = r.throttle(this.next.bind(this), e, {trailing: !1}), this.previousThrottled = r.throttle(this.previous.bind(this), e, {trailing: !1}), this.vignette = null, this.vignetteAlpha = .5;
            if (a.support.isHandheld) {
                var s = t.currentWidthType !== "tabletLandscape" && t.currentWidthType !== "tabletPortrait";
                0, n(".process-scroll-text").text("SWIPE UP").css({
                    color: "white",
                    opacity: .5,
                    fontSize: s ? "13px" : "22px",
                    top: s ? -37 : -47
                }), this.circleMenu.hide(), this.nextButton.css({background: "transparent"});
                var o = this.nextButton.children().first();
                o.removeClass("icon-caret-down").addClass("da-arrow-up-icon");
                var u = "../wp-content/themes/jam3/assets/img/icons/arrow-up.png";
                o.css({
                    top: 10,
                    left: 0,
                    width: 57,
                    height: 37,
                    backgroundPosition: "50% 50%",
                    background: "url('" + u + "') no-repeat"
                }), this.nextButton.css({
                    width: 57,
                    height: 60,
                    top: -30
                }), i.set(this.nextButton, {
                    transform: "matrix(0.5, 0, 0, 0.5, -3, 0)",
                    transformOrigin: "center center"
                }), this.vignette = n("<div>").prependTo(this.container), this.vignette.addClass("mobile-vignette"), this.vignette.hide()
            }
            this.animatingScrollIcon = !0, this.animateScrollCaret(0, !0), this.handleResize(), this.setupEvents(), this.setupCircles(), this.currentLineCount = 0, this.setPage(0, !0)
        }, setupCircles: function () {
            for (var e = 0; e < this.slides.length; e++) {
                var t = n("<li>").appendTo(this.circleMenu);
                t.on("click", this.setPage.bind(this, e, !0)), this.circles.push(t)
            }
        }, handleMobileNext: function (e) {
            0, 0;
            if (t.menuOpen)return;
            e.preventDefault();
            if (this.waitingForScroll && !this.isDesktop()) {
                this.waitingForScroll = !1, this.animateOutScrollText(), this.updateText(.5, !0), this.currentPage = 0, this.updateCircles(), this.circleMenu.show(), i.fromTo(this.circleMenu, 1, {x: 200}, {
                    x: 0,
                    ease: Expo.easeOut
                });
                return
            }
            this.animating ? this.deferredSwipe = this.next.bind(this) : this.next()
        }, setupEvents: function () {
            n(window).bind("resize.process", this.handleResize.bind(this)), n(document).keydown(function (e) {
                if (t.menuOpen)return;
                e.which === 37 ? this.previous() : e.which === 39 && this.next()
            }.bind(this));
            if (a.support.isHandheld) {
                this.nextButtonContainer.on("touchstart", this.handleMobileNext.bind(this));
                var e = 50;
                a.support.isAndroid && (e = 40), 0;
                var r = new o(this.container[0]);
                r.get("swipe").set({direction: o.DIRECTION_VERTICAL}), r.on("swipeup", this.handleMobileNext.bind(this)), r.on("swipedown", function (e) {
                    0;
                    if (t.menuOpen)return;
                    this.animating ? this.deferredSwipe = this.previous.bind(this) : this.previous()
                }.bind(this))
            } else this.nextButton.on("click", this.next.bind(this, !0)), n(document).on("mousewheel", function (e) {
                0;
                if (t.menuOpen)return;
                if (Math.abs(e.deltaY) < h || e.deltaY === 0)return !0;
                e.deltaY > 0 ? this.animating || this.previousThrottled() : this.animating || this.nextThrottled(), e.preventDefault()
            }.bind(this))
        }, handleResize: function () {
            this.width = window.innerWidth, this.height = window.innerHeight;
            var e = this.isDesktop() ? l : 0;
            this.imageHeight = this.height - e * 2, this.container.css("height", this.imageHeight), n(".contentImage").css("width", "100%").css("height", this.imageHeight), this.nextButtonContainer.css("top", this.isDesktop() ? this.imageHeight + l : this.imageHeight - 35), this.isDesktop() ? this.circleMenu.css("bottom", 7).css("top", "") : this.circleMenu.css("top", "").css("bottom", "0"), n(".process-title-row").css("height", this.isDesktop() ? this.imageHeight / 2 : ""), t.currentWidthType !== this.lastWidthType && (0, this.updateTextTop(), this.waitingForScroll ? this.animatingScrollIcon || this.animateScrollCaret(0, !0) : this.circleMenu.show(), this.waitingForScroll && (this.isDesktop() || a.support.isHandheld ? this.nextButtonContainer.show() : this.nextButtonContainer.hide()), this.lastWidthType = t.currentWidthType)
        }, previous: function () {
            0, this.currentPage > 0 && this.setPage(this.currentPage - 1, !1)
        }, next: function (e) {
            0, this.currentPage < this.slides.length - 1 && this.setPage(this.currentPage + 1, !0, e)
        }, setPage: function (e, t, n) {
            if (this.currentPage === e)return;
            this.currentPage = e, this.updateCircles(), this.lastImage && (this.lastImage.onload = null, this.lastImage = null), this.firstPage && this.waitingForScroll && this.nextButtonContainer.hide();
            var r = this.slides[this.currentPage], i = r.title + " " + r.count;
            n ? f.trackEvent("Page View", "ProcessClick", i) : this.firstPage || f.trackEvent("Page View", "ProcessScroll", i);
            var s = new Image;
            s.onload = this.animateInNext.bind(this, 0, t), s.src = this.getURL(), this.lastImage = s
        }, getURL: function () {
            var e = this.slides[this.currentPage], t = this.isDesktop() ? e.url : e.mobile;
            return t || (t = e.url), t
        }, _setFinishedAnimating: function () {
            this.animating = !1, this.deferredSwipe && (this.deferredSwipe(), this.deferredSwipe = null)
        }, animateScrollCaret: function (e, t) {
            if (!this.waitingForScroll) {
                this.animatingScrollIcon = !1;
                return
            }
            var r = n(".scroll-down-icon"), s = .7, o = Expo.easeInOut, u = a.support.isHandheld ? 55 : 45;
            e = e || 0, a.support.isHandheld && (u = -u), i.fromTo(r, s, {y: t ? 0 : -u}, {
                y: 0,
                delay: e,
                ease: o
            }), i.to(r, s, {y: u, delay: e + s + .6, ease: o, onComplete: this.animateScrollCaret.bind(this)})
        }, animateOutScrollText: function () {
            var e = this.nextButtonContainer, t = n(".process-scroll-text");
            i.to(t, .5, {alpha: 0, onComplete: this.hideItem.bind(this, t)}), i.to(this.nextButton, .5, {
                alpha: 0,
                onComplete: this.hideItem.bind(this, this.nextButton)
            }), this.vignette && i.to(this.vignette, .5, {
                alpha: 0,
                onComplete: this.hideItem.bind(this, this.vignette)
            })
        }, animateInNext: function (e, t) {
            var n = this.slides[this.currentPage];
            e = e || 0;
            var r = this.image.clone();
            r.css("background-image", "url('" + this.getURL() + "')");
            var s = this.image;
            this.image = r, t ? this.imageContainer.prepend(r) : this.imageContainer.append(r), this.animating = !0;
            var o = !1, u;
            this.waitingForScroll && (this.nextButtonContainer.show(), i.fromTo(this.nextButtonContainer, 1, {alpha: 0}, {alpha: 1}), this.vignette && (this.vignette.show(), i.fromTo(this.vignette, 1, {alpha: 0}, {
                alpha: this.vignetteAlpha,
                delay: .3
            }))), this.firstPage ? (this.firstPage = !1, o = !0, !this.waitingForScroll || !a.support.isHandheld ? this.updateText(.5, t) : this.animating = !1) : (this.waitingForScroll && (this.waitingForScroll = !1, this.animateOutScrollText()), i.fromTo(t ? s : r, .5, {y: t ? 0 : -this.height}, {
                y: t ? -this.height : 0,
                z: 1,
                delay: o ? 0 : .5,
                ease: Expo.easeIn,
                onComplete: s ? s.detach.bind(s) : undefined
            }), this.animateOutText(0, this.updateText.bind(this, 0, t), t))
        }, animateOutText: function (e, t, n) {
            var r = .7, s = this.isDesktop(), o = n ? 1 : -1, u = .1;
            s ? this.animateOutSpan(this.count.children().first(), 0) : i.to(this.count, r, {
                y: -this.imageHeight * o,
                delay: e + (n ? 0 : u * 2),
                ease: Expo.easeInOut
            }), i.to(this.title, r, {
                y: -this.imageHeight * o,
                ease: Expo.easeInOut,
                delay: this.isDesktop() ? e + (n ? 0 : u) : e + (n ? u : u),
                onComplete: n ? t : undefined
            }), i.to(this.text, r, {
                y: -this.imageHeight * o,
                delay: this.isDesktop() ? e + (n ? u : 0) : e + (n ? u * 2 : 0),
                ease: Expo.easeInOut,
                onComplete: n ? undefined : t
            })
        }, animateInSpan: function (e, t) {
            i.fromTo(e, .5, {top: this.textLineHeight}, {top: 0, delay: t, ease: Expo.easeOut})
        }, animateOutSpan: function (e, t) {
            i.to(e, .5, {top: this.textLineHeight, delay: t, ease: Expo.easeInOut})
        }, getTextYOff: function () {
            return t.currentWidthType == "mobile" ? 220 : this.isDesktop() ? this.imageHeight * .33 : 150
        }, killDeferredSwipe: function () {
            this.deferredSwipe = null
        }, getTitleFontSize: function () {
            return 75
        }, updateTextTop: function () {
            var e = this.currentLineCount, t = this.getTitleFontSize(), n = -t, r = -t * e;
            this.isDesktop() || (r = n = "")
        }, updateText: function (e, r) {
            e = e || 0;
            var s = this.slides[this.currentPage], o = this._setFinishedAnimating.bind(this);
            i.killTweensOf([this.count, this.title, this.text]), i.set([this.count, this.title, this.text], {y: 0}), i.set(this.text, {alpha: 0}), t.isMobile && s.mobileColor != "" ? this.container.removeClass("dark light").addClass(s.mobileColor) : this.container.removeClass("dark light").addClass(s.color), this.title.html(s.title), this.count.html(this.spanify(this.getCount(s.count))), this.text.html(s.text), this.currentLineCount = n(".contentTitle").children().length, this.updateTextTop();
            var u = e + 0, a = .1;
            i.fromTo(this.title, 1, {y: r ? this.imageHeight : -this.imageHeight}, {
                y: 0,
                onStart: this.killDeferredSwipe.bind(this),
                ease: Expo.easeInOut,
                onComplete: r ? o : undefined,
                delay: r ? u : u + a
            }), i.fromTo(this.text, 1, {y: r ? this.imageHeight : -this.imageHeight, alpha: 1}, {
                y: 0,
                delay: r ? u + a : u,
                onComplete: r ? undefined : o,
                ease: Expo.easeInOut
            }), u += .5, this.animateInSpan(this.count.children().first(), u + .5)
        }, updateCircles: function () {
            for (var e = 0; e < this.circles.length; e++)e === this.currentPage ? this.circles[e].addClass("da-dots-current") : this.circles[e].removeClass("da-dots-current")
        }, hideItem: function (e) {
            e.hide()
        }, isDesktop: function () {
            return t.currentWidthType == "desktop" || t.currentWidthType == "tabletLandscape"
        }, spanify: function (e) {
            return e.split(" ").map(function (e) {
                return "<span>" + e + "</span>"
            })
        }, breakLines: function (e, t) {
            e.html(this.spanify(t));
            var r = e.find(n("span")), i = r.first().position().top, s, o = 0, u = 0;
            r.each(function (e) {
                s = n(this).position().top;
                if (e == 0)return;
                s == i ? (n(this).prepend(n(this).prev().text().replace(/^\s+|\s+$/g, "") + " "), n(this).prev().remove()) : o += s, i = s;
                var t = n(this).height()
            }), chidlren = e.find(n("span")), r.css("display", "block"), r.each(function (e) {
                var t = n(this).text().replace(/^\s+|\s+$/g, "");
                n(this).html("<p>" + t + "</p>")
            })
        }, getCount: function (e) {
            return e < 10 ? "0" + e : e
        }
    });
    return p
}), define("Careers", ["Class", "Global", "utils/GA", "ui/FadeIn"], function (e, t, n, r) {
    return new e({
        initialize: function () {
            n.setPageID("careers"), $(document).scrollTop(0), this.container = $("main.careers"), this.setEvents(), this.container.find(".table-container").height() ? t.isMobile || new r(this.container.find(".conclusion")) : (this.container.find(".intro").removeClass("keyline"), this.container.find(".openings").hide());
            var e = this.container.find(".taglines > p");
            e.slice(0, e.length - 1).css("display", "none");
            var i = Math.floor(Math.random() * e.length - 1);
            e.slice(i, i + 1).css("display", "block"), this.container.find(".taglines").css("display", "block");
            var s = this.container.find(".table-container .row:first-child .job-row").length;
            s === 1 && this.container.find(".table-container .row:first-child .category").css("border-bottom", "none")
        }, setEvents: function () {
            t.onResize.add(this.onResize.bind(this));
            var e;
            this.container.find(".job-title-link").on("mouseenter", function (t) {
                e = $(t.target), e.closest(".job-row").find(".read-more").addClass("hover")
            }), this.container.find(".job-title-link").on("mouseleave", function (t) {
                e = $(t.target), e.closest(".job-row").find(".read-more").removeClass("hover")
            }), this.container.find(".read-more").on("mouseenter", function (t) {
                e = $(t.target), e.closest(".job-row").find(".job-title-link").addClass("hover")
            }), this.container.find(".read-more").on("mouseleave", function (t) {
                e = $(t.target), e.closest(".job-row").find(".job-title-link").removeClass("hover")
            })
        }, onResize: function () {
            $(window).width >= 768 && this.container.find(".conclusion").width(this.container.find(".table-container").width())
        }
    })
}), define("CareersPost", ["Class", "Global", "utils/GA", "ui/FadeIn", "TweenLite", "TimelineLite"], function (e, t, n, r, i, s) {
    return new e({
        initialize: function () {
            n.setPageID("careers_page"), this.animateInNavTitle(), $(document).scrollTop(0), this.container = $("main.single-careers"), this.formIsReady = !0, this.errorShown = !1, this.inputChanged = !1, this.uploadBtn = this.container.find(".upload-btn"), this.submitBtn = this.container.find(".submit-btn"), this.clearBtn = this.container.find(".clear-btn"), i.set(this.container.find(".checkmark"), {autoAlpha: 0}), $(".main-nav").find("ul").find("li").removeClass("current_page_parent"), $(".main-nav").find(".icon-careers").addClass("current_page_item"), this.uploadBtnTxt = this.uploadBtn.find(".txt").html(), this.errorMessage = this.container.find(".error-message"), this.errorMessage.hide(), this.container.find(".fail").hide(), this.inputFields = this.container.find("input:text"), this.fileUpload = this.container.find("input:file"), this.defaultValues = [];
            for (var e = 0; e < this.inputFields.length; e++)this.defaultValues.push($(this.inputFields[e]).val());
            this.container.find(".job-description").find("li").wrapInner("<span></span>"), this.setEvents(), t.isMobile || new r(this.container.find(".form-wrapper"))
        }, setEvents: function () {
            t.onResize.add(this.onResize.bind(this)), $(".nav-button-text").on("click", function () {
                window.location.href = "/careers"
            }), this.uploadBtn.on("click", function (e) {
                e.preventDefault(), this.fileUpload.trigger("click")
            }.bind(this)), this.clearBtn.on("click", function (e) {
                e.preventDefault(), this.container.find(".fail").hide();
                if (this.formIsReady) {
                    $(this.inputFields).blur(), $(this.inputFields).removeClass("error");
                    for (var t = 0; t < this.inputFields.length; t++)$(this.inputFields[t]).val(this.defaultValues[t]);
                    this.fileUpload.val(""), this.uploadBtn.find(".txt").html(this.uploadBtnTxt), this.errorMessage.html(""), this.errorMessage.hide(), this.errorShown = !1
                }
            }.bind(this)), this.submitBtn.on("click", function (e) {
                e.preventDefault(), this.container.find(".fail").hide(), this.formIsReady && ($(this.inputFields).blur(), this.validate())
            }.bind(this)), $(document).keydown(function (e) {
                e.which == 13 && this.inputChanged && this.submitBtn.trigger("click")
            }.bind(this)), $(this.inputFields).on("focus", function (e) {
                var t = $(e.target), n = t.parent().index();
                this.inputChanged = !0, t.removeClass("error"), t.val().toLowerCase() === this.defaultValues[n].toLowerCase() && t.val("")
            }.bind(this)), $(this.inputFields).on("blur", function (e) {
                var t = $(e.target), n = t.parent().index();
                t.val().trim() === "" ? t.val(this.defaultValues[n]) : t.val(t.val().trim())
            }.bind(this)), $(this.fileUpload).change(function () {
                var e = $(this.fileUpload)[0].files[0];
                this.loadAttachment(e)
            }.bind(this))
        }, loadAttachment: function (e) {
            if (e) {
                var t = new FileReader;
                t.readAsDataURL(e);
                if (!/\.(doc|docx|rtf|pdf|odt|txt|wpd|wps)$/i.test(e.name)) {
                    this.errorMessage.html("Unsupported file type.<br/>Please try another one."), this.errorMessage.show(), this.errorShown = !0, this.uploadBtn.find(".txt").html(this.uploadBtnTxt), this.fileUpload.val(""), t.abort();
                    return
                }
                if (e.size / 1048576 > 10) {
                    this.errorMessage.html("File size exceeds 10Mb.<br/>Please try another one."), this.errorMessage.show(), this.errorShown = !0, this.uploadBtn.find(".txt").html("Upload Resume"), this.fileUpload.val(""), t.abort();
                    return
                }
                this.errorMessage.html(""), this.errorMessage.hide(), this.errorShown = !1, t.onloadstart = function () {
                    this.uploadBtn.find(".txt").html("Uploading...")
                }.bind(this), t.onloadend = function () {
                    this.uploadBtn.find(".txt").html("Replace File")
                }.bind(this)
            }
        }, validate: function () {
            var e = 0;
            for (var t = 0; t < this.inputFields.length; t++)this.checkInput($(this.inputFields[t]), t) && e++;
            e === this.inputFields.length && this.formIsReady && this.submit()
        }, checkInput: function (e, t) {
            var n = !1;
            switch (e.attr("name")) {
                case"firstname":
                case"lastname":
                    n = /^([a-z]+[a-z' -]*)$/i.test(e.val()) && e.val() !== this.defaultValues[t];
                    break;
                case"phone":
                    var r = e.val().replace(/[+\-\s()]/g, "");
                    n = /^[\d]{10,13}$/i.test(r);
                    break;
                case"email":
                    n = /^([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})$/i.test(e.val()) && e.val() !== this.defaultValues[t];
                    break;
                case"website":
                    n = /(https?:\/\/)?(w{3}\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi.test(e.val()) || e.val() === this.defaultValues[t];
                    break;
                case"linkedin":
                    n = /^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)\/.+/gm.test(e.val()) || e.val() === this.defaultValues[t];
                    break;
                default:
            }
            return n || e.addClass("error"), n
        }, submit: function () {
            this.formIsReady = !1;
            var e = new FormData;
            e.append("subject", $("input[name=subject]").val()), e.append("contact", $("input[name=contact]").val()), e.append("firstname", $("input[name=firstname]").val()), e.append("lastname", $("input[name=lastname]").val()), e.append("email", $("input[name=email]").val()), e.append("phone", $("input[name=phone]").val()), e.append("website", $("input[name=website]").val()), e.append("linkedin", $("input[name=linkedin]").val()), e.append("fileupload", $("input[name=fileupload]")[0].files[0]), e.append("action", "mail_before_submit"), $.ajax({
                url: "/wp-admin/admin-ajax.php",
                data: e,
                cache: !1,
                processData: !1,
                contentType: !1,
                type: "POST",
                beforeSend: function () {
                    this.container.find(".submit-btn").addClass("no-hover"), i.set(this.container.find(".submit-layer"), {
                        width: 0,
                        autoAlpha: 1
                    }), i.to(this.container.find(".submit-layer"), 20, {
                        width: "80%",
                        ease: Sine.easeOut
                    }), i.set(this.container.find(".form-blocker"), {
                        display: "block",
                        autoAlpha: 1
                    }), i.to([this.container.find("form"), this.container.find(".clear-btn")], .8, {autoAlpha: .5}), i.set(this.container.find(".checkmark"), {autoAlpha: 0})
                }.bind(this),
                success: function (e) {
                    0, e.trim() != "sent" && this.handleSubmitError(), i.to(this.container.find(".submit-layer"), .5, {
                        width: "100%",
                        ease: Linear.easeNone,
                        onComplete: function () {
                            i.to(this.container.find(".checkmark"), .2, {autoAlpha: 1, delay: .2})
                        }.bind(this)
                    }), 0
                }.bind(this),
                error: function () {
                    this.handleSubmitError()
                }.bind(this)
            })
        }, handleSubmitError: function () {
            this.formIsReady = !0, this.container.find(".fail").show(), this.container.find(".submit-btn").removeClass("no-hover"), i.set(this.container.find(".submit-layer"), {autoAlpha: 0}), i.set(this.container.find(".form-blocker"), {
                display: "none",
                autoAlpha: 0
            }), i.to([this.container.find("form"), this.container.find(".clear-btn")], .8, {autoAlpha: 1}), i.set(this.container.find(".checkmark"), {autoAlpha: 0}), 0
        }, onResize: function () {
            var e = this.container.find(".btn-container");
            t.isMobile ? ($(window).width() < 745 && e.width($(this.container.find("input")[0]).outerWidth()), this.errorShown && this.container.find(".error-message").hide()) : (e.width(this.container.find("form").width()), this.errorShown && this.container.find(".error-message").show()), this.container.find(".form-blocker").height(this.container.find(".form-wrapper").height())
        }, animateInNavTitle: function () {
            var e = $(".work-title-slash"), t = $(".nav-back-arrow"), n = $(".inner-holder"), r = new s;
            $(".nav-button-text").addClass("clickable"), i.set(e, {x: -10}), i.set($(".work-title"), {autoAlpha: 1}), i.set(t, {x: 10}), i.set(n, {
                autoAlpha: 1,
                position: "relative",
                left: "-100%"
            }), r.add(i.to(e, .3, {autoAlpha: 1, x: 0, delay: .5, ease: Expo.easeOut})), r.add(i.to(n, 1.1, {
                left: 0,
                delay: 0,
                ease: Expo.easeOut
            })), r.add(i.to(t, .2, {width: 28, x: 0, delay: "-0.4", ease: Linear.easeIn}))
        }
    })
}), define("utils/FullscreenController", ["Class", "lib/LibJS/signals/Signal", "Global"], function (e, t, n) {
    var r = new e({
        newSpec: !1,
        available: !0,
        target: null,
        prefix: "",
        active: !1,
        onChange: null,
        initialize: function (e) {
            this.target = e, this.findPrefix(), this.onChange = new t, document.addEventListener(this.prefix + "fullscreenchange", this._onChange.bind(this))
        },
        findPrefix: function () {
            if (typeof document["exitFullscreen"] != "undefined") this.newSpec = !0; else {
                var e = ["webkit", "moz", "ms", "o"];
                for (var t = 0; t < e.length; t++)if (typeof document[e[t] + "CancelFullScreen"] != "undefined") {
                    this.prefix = e[t];
                    return
                }
                typeof document["cancelFullScreen"] == "undefined" && (this.available = !1)
            }
        },
        _onChange: function () {
            this.newSpec ? document["fullscreenElement"] == null && this.onChange.dispatch() : document[this.prefix != "" ? this.prefix + "FullScreenElement" : "fullScreenElement"] == null && this.onChange.dispatch()
        },
        start: function (e) {
            n.videoInFullScreen = !0;
            var t = e != null ? e : this.target;
            this.newSpec ? t.requestFullscreen() : t[this.prefix != "" ? this.prefix + "RequestFullScreen" : "requestFullScreen"](), n.onVideoFullScreenChange.dispatch()
        },
        stop: function () {
            n.videoInFullScreen = !1, this.newSpec ? document.exitFullscreen() : document[this.prefix != "" ? this.prefix + "CancelFullScreen" : "cancelFullScreen"](), n.onVideoFullScreenChange.dispatch()
        },
        active: function () {
            return this.newSpec ? document["fullscreenElement"] != null : this.prefix == "" ? document.fullScreen : typeof document[this.prefix + "IsFullScreen"] != "undefined" ? document[this.prefix + "IsFullScreen"] : document[this.prefix + "FullScreen"]
        }
    });
    return r
}), define("ui/VideoControls", ["Class", "jquery", "utils/FullscreenController", "Global", "libjs/utils/Util", "utils/GA"], function (e, t, n, r, i, s) {
    var o = 2, u = 3.5, a = new e({
        initialize: function (e, s) {
            this.label = s || "", this.videoPlayer = t(e), this.video = this.videoPlayer.find("video").first(), this.videoSource = this.video.find("source").first(), this.src = this.videoSource.attr("src"), this.playContainer = this.videoPlayer.find(".play-container").first(), this.bottomBar = this.videoPlayer.find(".bottom-bar").first(), this.playButton = this.videoPlayer.find(".play-button").first(), this.loader = this.videoPlayer.find(".loaderDiv").first(), this.playToggle = this.videoPlayer.find(".play-toggle").first(), this.muteToggle = this.videoPlayer.find(".mute-toggle").first(), this.fullscreenToggle = this.videoPlayer.find(".fullscreen-toggle").first(), this.playSVG = this.videoPlayer.find(".play-svg").first(), this.pauseSVG = this.videoPlayer.find(".pause-svg").first(), this.volumeLines = this.videoPlayer.find(".volume-lines").first(), this.playButtonOut = this.videoPlayer.find(".play-button .out"), this.playButtonOver = this.videoPlayer.find(".play-button .over"), this.playButtonOutTriangle = this.videoPlayer.find(".out .play-button-triangle"), this.playButtonBorder = this.videoPlayer.find(".over .play-button-border"), this.playButtonTriangle = this.videoPlayer.find(".over .play-button-triangle"), this.loadedBar = this.videoPlayer.find(".loaded").first(), this.playedBar = this.videoPlayer.find(".played").first(), this.elapsedTimeLabel = this.videoPlayer.find(".elapsed-time").first(), this.totalTimeLabel = this.videoPlayer.find(".total-time").first(), this.progress = this.videoPlayer.find(".progress-container").first(), this.fullscreen = new n(this.videoPlayer[0]), this.fullscreen.onChange.add(this.checkVideoState.bind(this)), this.fullscreen.available || this.fullscreenToggle.remove(), this.lastTime = 0, this.hideControlsTimeout = null, this.hideControlsBound = this.hideControls.bind(this), this.showControlsBound = this.showControls.bind(this), this.started = !1, this.ended = !1, 0, r.isMobile && (this.videoPlayer.css({width: "100%"}), this.video.attr("width", "100%"), r.onVideoFullScreenChange.add(this.updateVideoSize.bind(this))), (i.support.isIPhone || i.support.isIPod || i.support.isIPad) && this.muteToggle.hide(), TweenLite.set(this.fullscreenToggle.find(".path1").first(), {y: 3}), TweenLite.set(this.fullscreenToggle.find(".path2").first(), {y: 3}), this.volumeLineHeights = [], this.volumeLineYPos = [];
            for (var o = 0; o < this.volumeLines[0].childNodes.length; o++)this.volumeLines[0].childNodes[o].tagName && (this.volumeLineHeights.push(this.volumeLines[0].childNodes[o].getAttribute("height")), this.volumeLineYPos.push(this.volumeLines[0].childNodes[o].getAttribute("y")));
            r.isMobile && this.playContainer.on("click", function () {
                this.togglePlay(), this.play()
            }.bind(this)), r.isMobile ? !i.support.isIPhone && !i.support.isIPod && !i.support.isIPad && this.playContainer.on("click", this.toggleControls.bind(this)) : (this.playContainer.on("click", this.togglePlay.bind(this)), this.videoPlayer.on("mousemove", this.showControlsBound), this.videoPlayer.on("mouseleave", this.hideControlsBound), this.playButton.on("mouseenter", this.playOver.bind(this)), this.playButton.on("mouseleave", this.playOut.bind(this)), this.fullscreenToggle.on("mouseenter", this.fullscreenOver.bind(this)), this.fullscreenToggle.on("mouseleave", this.fullscreenOut.bind(this)), this.progress.on("mousedown", this.onProgressDown.bind(this))), this.video.on("play", this.updateTotalTime.bind(this)), this.video.on("waiting", this.showBuffering.bind(this)), this.video.on("stalled", this.showBuffering.bind(this)), this.video.on("pause", this.onPause.bind(this)), this.video.on("playing", this.onPlay.bind(this)), this.video.on("timeupdate", this.onTimeUpdate.bind(this)), this.video.on("progress", this.onProgress.bind(this)), this.video.on("canplaythrough", this.onProgress.bind(this)), this.video.on("ended", this.onEnd.bind(this)), this.playButton.on("click", this.play.bind(this)), this.playToggle.on("click", this.togglePlay.bind(this)), this.muteToggle.on("click", this.toggleMute.bind(this)), this.fullscreenToggle.on("click", this.toggleFullscreen.bind(this)), this.progress.on("click", this.onProgressClick.bind(this)), r.isMobile && (this.video.on("canplaythrough", this.hideBuffering.bind(this)), this.video.on("timeupdate", this.hideBuffering.bind(this)), this.video.on("playing", this.hideBuffering.bind(this))), this.video = this.video[0], this.videoLoadComplete = !1, this.videoLoadStartedAt = null, this.checkBuffer = this.checkBuffer.bind(this), this.setPlayButtonVisible(!0)
        }, checkBuffer: function () {
            if (this.videoLoadComplete)return;
            this.videoLoadStartedAt || (this.videoLoadStartedAt = (new Date).getTime());
            var e = !0;
            if (this.video.readyState && this.video.buffered) {
                var t = this.video.buffered.end(0) / this.video.duration + .01;
                t >= .98 && (this.videoLoadCompleted(), e = !1)
            }
            e && (this.bufferTimeout = setTimeout(this.checkBuffer, 500))
        }, videoLoadCompleted: function () {
            this.videoLoadComplete = !0;
            var e = (new Date).getTime(), t = e - this.videoLoadStartedAt, n = t / 1e3;
            s.trackEvent("Video", "Video Load Time", this.label, n)
        }, setHideControlsTimeout: function () {
            this.hideControlsTimeout && (clearTimeout(this.hideControlsTimeout), this.hideControlsTimeout = null), this.hideControlsTimeout = setTimeout(this.hideControlsBound, o * 1e3)
        }, formatTime: function (e) {
            if (isNaN(e))return "";
            var t = Math.floor(e / 60), n = Math.floor(e - t * 60);
            return t < 10 && (t = "0" + t), n < 10 && (n = "0" + n), t + ":" + n
        }, showControls: function () {
            if (!this.barVisible || this.ended)return;
            this.bottomBar.css("visibility", "visible"), TweenLite.to(this.bottomBar, .3, {
                bottom: 0,
                ease: Expo.easeOut
            }), this.setHideControlsTimeout()
        }, hideControls: function () {
            if (!this.barVisible)return;
            TweenLite.to(this.bottomBar, .3, {
                bottom: -60, ease: Expo.easeIn, onComplete: function () {
                    this.bottomBar.css("visibility", "hide")
                }.bind(this)
            })
        }, toggleControls: function () {
            TweenLite.killDelayedCallsTo(this.hideControlsBound), this.bottomBar.css("visibility") == "visible" ? TweenLite.to(this.bottomBar, .3, {
                bottom: -60,
                ease: Expo.easeIn,
                onComplete: function () {
                    this.bottomBar.css("visibility", "hidden")
                }.bind(this)
            }) : (this.bottomBar.css("visibility", "visible"), TweenLite.to(this.bottomBar, .3, {
                bottom: 0,
                ease: Expo.easeOut
            }))
        }, updateTotalTime: function () {
            this.totalTimeLabel.html(this.formatTime(this.video.duration))
        }, play: function () {
            this.playButtonOut.css("display", "none"), this.playButtonTriangle.css("display", "none");
            var e = this.playButtonBorder[0].getTotalLength(), t = e, n = 6, r = function () {
                t -= n, this.playButtonBorder.css("strokeDasharray", t + " " + e), n += .6, t <= 0 ? (this.barVisible = !0, this.showControls(), this.video.play(), this.playButton.css("display", "none"), this.bottomBar.css("visibility", "visible")) : requestAnimationFrame(r)
            }.bind(this);
            requestAnimationFrame(r)
        }, playOver: function () {
            TweenLite.to(this.playButtonOver, .4, {
                width: "100%",
                ease: Expo.easeOut
            }), TweenLite.to(this.playButtonOutTriangle, .4, {
                x: 49,
                ease: Expo.easeOut
            }), TweenLite.fromTo(this.playButtonTriangle, .4, {x: -49, ease: Expo.easeOut}, {x: 0, ease: Expo.easeOut})
        }, playOut: function () {
            TweenLite.to(this.playButtonOver, .4, {
                width: "0%",
                ease: Expo.easeIn
            }), TweenLite.to(this.playButtonOutTriangle, .4, {
                x: 0,
                ease: Expo.easeIn
            }), TweenLite.to(this.playButtonTriangle, .4, {x: -49, ease: Expo.easeIn})
        }, showBuffering: function () {
            if (i.support.isIPhone || i.support.isIPod)return;
            this.loader.css("visibility", "visible")
        }, hideBuffering: function () {
            this.loader.css("visibility", "hidden")
        }, onPause: function () {
            this.playSVG.css("display", "none"), this.pauseSVG.css("display", "block")
        }, onPlay: function () {
            this.pauseSVG.css("display", "none"), this.playSVG.css("display", "block"), this.loader.css("visibility", "hidden"), r.videoPlaying = !0, this.started || (TweenLite.delayedCall(u, this.hideControlsBound), this.started = !0, this.ended = !1, this.updateTotalTime())
        }, togglePlay: function () {
            this.started || this.play(), this.video.paused ? (r.videoPlaying = !0, s.trackEvent("Video", "Play", this.label), !i.support.isIPhone && !i.support.isIPod && !i.support.isIPad && this.checkBuffer(), this.video.play()) : (r.videoPlaying = !1, this.video.pause(), s.trackEvent("Video", "Pause", this.label, this.video.currentTime), r.videoInFullScreen || r.onVideoInactive.dispatch())
        }, toggleMute: function () {
            if (this.video.muted) {
                s.trackEvent("Video", "UnMute", this.label), this.video.muted = !1;
                for (var e = 0; e < this.volumeLines[0].children.length; e++)TweenLite.to(this.volumeLines[0].children[e], .1, {
                    attr: {
                        height: this.volumeLineHeights[e],
                        y: this.volumeLineYPos[e]
                    }, delay: .04
                })
            } else {
                s.trackEvent("Video", "Mute", this.label), this.video.muted = !0;
                var t = (parseInt(this.muteToggle.children("svg").first().attr("height")) - 1) * .5;
                for (var e = 0; e < this.volumeLines[0].children.length; e++)TweenLite.to(this.volumeLines[0].children[e], .1, {
                    attr: {
                        height: 1,
                        y: t
                    }, delay: .04
                })
            }
        }, toggleFullscreen: function () {
            this.fullscreen.active() ? (TweenLite.delayedCall(o, this.hideControlsBound), this.fullscreen.stop(), this.videoPlayer.on("mousemove", function () {
                this.showControls(), TweenLite.delayedCall(u, this.hideControlsBound)
            }.bind(this))) : (s.trackEvent("Video", "Fullscreen", this.label), TweenLite.delayedCall(o, this.hideControlsBound), this.fullscreen.start(), this.videoPlayer.off("mousemove", function () {
                this.showControls(), TweenLite.delayedCall(u, this.hideControlsBound)
            }.bind(this)))
        }, checkVideoState: function () {
            this.fullscreen.active() ? this.videoPlayer.css({
                "max-width": "initial",
                "background-color": "#dd3a20"
            }) : this.videoPlayer.css({"max-width": "", "background-color": ""})
        }, fullscreenOver: function () {
            var e = this.fullscreenToggle.find(".path2").first();
            TweenLite.to(e[0], .125, {y: 0, x: 3, ease: Linear.easeNone, overwrite: !0})
        }, fullscreenOut: function () {
            var e = this.fullscreenToggle.find(".path2").first();
            TweenLite.to(e[0], .125, {y: 3, x: 0, ease: Linear.easeNone, overwrite: !0})
        }, onTimeUpdate: function () {
            this.elapsedTimeLabel.html(this.formatTime(this.video.currentTime)), TweenLite.to(this.playedBar, this.video.currentTime - this.lastTime, {
                width: Math.floor(this.video.currentTime / this.video.duration * 100) + "%",
                ease: Linear.easeNone,
                overwrite: !0
            }), this.lastTime = this.video.currentTime
        }, onProgress: function () {
            this.video.buffered.length > 0 && TweenLite.to(this.loadedBar, .2, {
                width: Math.floor(this.video.buffered.end(0) / this.video.duration * 100) + "%",
                ease: Linear.easeNone,
                overwrite: !0
            })
        }, onProgressClick: function (e) {
            var t = (e.clientX - this.progress.offset().left) / this.progress.width();
            this.video.currentTime = t * this.video.duration, this.onTimeUpdate()
        }, onProgressDown: function (e) {
            this.progress.on("mousemove", this.onProgressClick.bind(this)), t(document).on("mouseup", this.onProgressClean.bind(this))
        }, onProgressClean: function (e) {
            s.trackEvent("Video", "Seek", this.label, this.video.currentTime), this.progress.off("mousemove"), t(document).off("mouseup")
        }, setPlayButtonVisible: function (e) {
            if (i.support.isIPhone || i.support.isIPod) e = !1;
            this.playButton.css("display", e ? "block" : "none"), this.playButtonOut.css("display", e ? "block" : "none"), this.playButtonTriangle.css("display", e ? "block" : "none"), 0
        }, onEnd: function (e) {
            r.videoFinished = !0, r.videoPlaying = !1, r.onVideoInactive.dispatch(), this.hideControls(), this.setPlayButtonVisible(!0), this.started = !1, this.ended = !0, this.playButtonBorder.removeAttr("style"), this.fullscreen.available && this.fullscreen.active() && (this.fullscreen.stop(), TweenLite.delayedCall(o, this.hideControlsBound)), !i.support.isIPhone && !i.support.isIPod && this.video.load()
        }, updateVideoSize: function () {
            if (r.isMobile) {
                var e = this.videoPlayer.outerWidth() / 1.76678445229682;
                t(this.video).css("height", r.videoInFullScreen ? "inherit" : e)
            }
        }
    });
    return a
}), define("Reel", ["jquery", "Class", "Global", "ui/VideoControls", "utils/GA"], function (e, t, n, r, i) {
    return new t({
        initialize: function () {
            e(".videoPlayer").length > 0 && new r(e(".videoPlayer").last()), i.setPageID("reel")
        }
    })
}), function () {
    var e, t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S, x, T, N, C, k, L, A, O, M, _, D, P, H, B,
        j, F, I, q, R, U, z, W, X, V, $, J = [].slice, K = {}.hasOwnProperty, Q = function (e, t) {
            function n() {
                this.constructor = e
            }

            for (var r in t)K.call(t, r) && (e[r] = t[r]);
            return n.prototype = t.prototype, e.prototype = new n, e.__super__ = t.prototype, e
        }, G = [].indexOf || function (e) {
                for (var t = 0, n = this.length; n > t; t++)if (t in this && this[t] === e)return t;
                return -1
            };
    for (b = {
        catchupTime: 500,
        initialRate: .03,
        minTime: 500,
        ghostTime: 500,
        maxProgressPerFrame: 10,
        easeFactor: 1.25,
        startOnPageLoad: !0,
        restartOnPushState: !0,
        restartOnRequestAfter: 500,
        target: "body",
        elements: {checkInterval: 100, selectors: ["body"]},
        eventLag: {minSamples: 10, sampleCount: 3, lagThreshold: 3},
        ajax: {trackMethods: ["GET"], trackWebSockets: !0, ignoreURLs: []}
    }, k = function () {
        var e;
        return null != (e = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance.now() : void 0) ? e : +(new Date)
    }, A = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, y = window.cancelAnimationFrame || window.mozCancelAnimationFrame, null == A && (A = function (e) {
        return setTimeout(e, 50)
    }, y = function (e) {
        return clearTimeout(e)
    }), M = function (e) {
        var t, n;
        return t = k(), (n = function () {
            var r;
            return r = k() - t, r >= 33 ? (t = k(), e(r, function () {
                return A(n)
            })) : setTimeout(n, 33 - r)
        })()
    }, O = function () {
        var e, t, n;
        return n = arguments[0], t = arguments[1], e = 3 <= arguments.length ? J.call(arguments, 2) : [], "function" == typeof n[t] ? n[t].apply(n, e) : n[t]
    }, w = function () {
        var e, t, n, r, i, s, o;
        for (t = arguments[0], r = 2 <= arguments.length ? J.call(arguments, 1) : [], s = 0, o = r.length; o > s; s++)if (n = r[s])for (e in n)K.call(n, e) && (i = n[e], null != t[e] && "object" == typeof t[e] && null != i && "object" == typeof i ? w(t[e], i) : t[e] = i);
        return t
    }, v = function (e) {
        var t, n, r, i, s;
        for (n = t = 0, i = 0, s = e.length; s > i; i++)r = e[i], n += Math.abs(r), t++;
        return n / t
    }, S = function (e, t) {
        var n, r, i;
        if (null == e && (e = "options"), null == t && (t = !0), i = document.querySelector("[data-pace-" + e + "]")) {
            if (n = i.getAttribute("data-pace-" + e), !t)return n;
            try {
                return JSON.parse(n)
            } catch (s) {
                return r = s, "undefined" != typeof console && null !== console ? 0 : void 0
            }
        }
    }, o = function () {
        function e() {
        }

        return e.prototype.on = function (e, t, n, r) {
            var i;
            return null == r && (r = !1), null == this.bindings && (this.bindings = {}), null == (i = this.bindings)[e] && (i[e] = []), this.bindings[e].push({
                handler: t,
                ctx: n,
                once: r
            })
        }, e.prototype.once = function (e, t, n) {
            return this.on(e, t, n, !0)
        }, e.prototype.off = function (e, t) {
            var n, r, i;
            if (null != (null != (r = this.bindings) ? r[e] : void 0)) {
                if (null == t)return delete this.bindings[e];
                for (n = 0, i = []; n < this.bindings[e].length;)i.push(this.bindings[e][n].handler === t ? this.bindings[e].splice(n, 1) : n++);
                return i
            }
        }, e.prototype.trigger = function () {
            var e, t, n, r, i, s, o, u, a;
            if (n = arguments[0], e = 2 <= arguments.length ? J.call(arguments, 1) : [], null != (o = this.bindings) ? o[n] : void 0) {
                for (i = 0, a = []; i < this.bindings[n].length;)u = this.bindings[n][i], r = u.handler, t = u.ctx, s = u.once, r.apply(null != t ? t : this, e), a.push(s ? this.bindings[n].splice(i, 1) : i++);
                return a
            }
        }, e
    }(), null == window.Pace && (window.Pace = {}), w(Pace, o.prototype), L = Pace.options = w({}, b, window.paceOptions, S()), X = ["ajax", "document", "eventLag", "elements"], R = 0, z = X.length; z > R; R++)H = X[R], L[H] === !0 && (L[H] = b[H]);
    a = function (e) {
        function t() {
            return V = t.__super__.constructor.apply(this, arguments)
        }

        return Q(t, e), t
    }(Error), u = function () {
        function e() {
            this.bindings = {}
        }

        return e.prototype.trigger = function (e, t) {
            var n, r, i, s, o;
            if (null != this.bindings[e]) {
                for (s = this.bindings[e], o = [], r = 0, i = s.length; i > r; r++)n = s[r], o.push(n.call(this, t));
                return o
            }
        }, e.prototype.on = function (e, t) {
            var n;
            return null == (n = this.bindings)[e] && (n[e] = []), this.bindings[e].push(t)
        }, e
    }(), q = window.XMLHttpRequest, I = window.XDomainRequest, F = window.WebSocket, E = function (e, t) {
        var n, r, i, s;
        s = [];
        for (r in t.prototype)try {
            i = t.prototype[r], s.push(null == e[r] && "function" != typeof i ? e[r] = i : void 0)
        } catch (o) {
            n = o
        }
        return s
    }, N = [], Pace.ignore = function () {
        var e, t, n;
        return t = arguments[0], e = 2 <= arguments.length ? J.call(arguments, 1) : [], N.unshift("ignore"), n = t.apply(null, e), N.shift(), n
    }, Pace.track = function () {
        var e, t, n;
        return t = arguments[0], e = 2 <= arguments.length ? J.call(arguments, 1) : [], N.unshift("track"), n = t.apply(null, e), N.shift(), n
    }, P = function (e) {
        var t;
        if (null == e && (e = "GET"), "track" === N[0])return "force";
        if (!N.length && L.ajax) {
            if ("socket" === e && L.ajax.trackWebSockets)return !0;
            if (t = e.toUpperCase(), G.call(L.ajax.trackMethods, t) >= 0)return !0
        }
        return !1
    }, f = function (e) {
        function t() {
            var e, n = this;
            t.__super__.constructor.apply(this, arguments), e = function (e) {
                var t;
                return t = e.open, e.open = function (r, i) {
                    return P(r) && n.trigger("request", {type: r, url: i, request: e}), t.apply(e, arguments)
                }
            }, window.XMLHttpRequest = function (t) {
                var n;
                return n = new q(t), e(n), n
            };
            try {
                E(window.XMLHttpRequest, q)
            } catch (r) {
            }
            if (null != I) {
                window.XDomainRequest = function () {
                    var t;
                    return t = new I, e(t), t
                };
                try {
                    E(window.XDomainRequest, I)
                } catch (r) {
                }
            }
            if (null != F && L.ajax.trackWebSockets) {
                window.WebSocket = function (e, t) {
                    var r;
                    return r = null != t ? new F(e, t) : new F(e), P("socket") && n.trigger("request", {
                        type: "socket",
                        url: e,
                        protocols: t,
                        request: r
                    }), r
                };
                try {
                    E(window.WebSocket, F)
                } catch (r) {
                }
            }
        }

        return Q(t, e), t
    }(u), U = null, x = function () {
        return null == U && (U = new f), U
    }, D = function (e) {
        var t, n, r, i;
        for (i = L.ajax.ignoreURLs, n = 0, r = i.length; r > n; n++)if (t = i[n], "string" == typeof t) {
            if (-1 !== e.indexOf(t))return !0
        } else if (t.test(e))return !0;
        return !1
    },e = function () {
        function e() {
            var e = this;
            this.elements = [], x().on("request", function () {
                return e.watch.apply(e, arguments)
            })
        }

        return e.prototype.watch = function (e) {
            var t, n, r, i;
            return r = e.type, t = e.request, i = e.url, D(i) ? void 0 : (n = "socket" === r ? new h(t) : new p(t), this.elements.push(n))
        }, e
    }(), p = function () {
        function e(e) {
            var t, n, r, i, s, o, u = this;
            if (this.progress = 0, null != window.ProgressEvent)for (n = null, e.addEventListener("progress", function (e) {
                return u.progress = e.lengthComputable ? 100 * e.loaded / e.total : u.progress + (100 - u.progress) / 2
            }, !1), o = ["load", "abort", "timeout", "error"], r = 0, i = o.length; i > r; r++)t = o[r], e.addEventListener(t, function () {
                return u.progress = 100
            }, !1); else s = e.onreadystatechange, e.onreadystatechange = function () {
                var t;
                return 0 === (t = e.readyState) || 4 === t ? u.progress = 100 : 3 === e.readyState && (u.progress = 50), "function" == typeof s ? s.apply(null, arguments) : void 0
            }
        }

        return e
    }(), h = function () {
        function e(e) {
            var t, n, r, i, s = this;
            for (this.progress = 0, i = ["error", "open"], n = 0, r = i.length; r > n; n++)t = i[n], e.addEventListener(t, function () {
                return s.progress = 100
            }, !1)
        }

        return e
    }(), r = function () {
        function e(e) {
            var t, n, r, s;
            for (null == e && (e = {}), this.elements = [], null == e.selectors && (e.selectors = []), s = e.selectors, n = 0, r = s.length; r > n; n++)t = s[n], this.elements.push(new i(t))
        }

        return e
    }(), i = function () {
        function e(e) {
            this.selector = e, this.progress = 0, this.check()
        }

        return e.prototype.check = function () {
            var e = this;
            return document.querySelector(this.selector) ? this.done() : setTimeout(function () {
                return e.check()
            }, L.elements.checkInterval)
        }, e.prototype.done = function () {
            return this.progress = 100
        }, e
    }(), n = function () {
        function e() {
            var e, t, n = this;
            this.progress = null != (t = this.states[document.readyState]) ? t : 100, e = document.onreadystatechange, document.onreadystatechange = function () {
                return null != n.states[document.readyState] && (n.progress = n.states[document.readyState]), "function" == typeof e ? e.apply(null, arguments) : void 0
            }
        }

        return e.prototype.states = {loading: 0, interactive: 50, complete: 100}, e
    }(), s = function () {
        function e() {
            var e, t, n, r, i, s = this;
            this.progress = 0, e = 0, i = [], r = 0, n = k(), t = setInterval(function () {
                var o;
                return o = k() - n - 50, n = k(), i.push(o), i.length > L.eventLag.sampleCount && i.shift(), e = v(i), ++r >= L.eventLag.minSamples && e < L.eventLag.lagThreshold ? (s.progress = 100, clearInterval(t)) : s.progress = 100 * (3 / (e + 3))
            }, 50)
        }

        return e
    }(), c = function () {
        function e(e) {
            this.source = e, this.last = this.sinceLastUpdate = 0, this.rate = L.initialRate, this.catchup = 0, this.progress = this.lastProgress = 0, null != this.source && (this.progress = O(this.source, "progress"))
        }

        return e.prototype.tick = function (e, t) {
            var n;
            return null == t && (t = O(this.source, "progress")), t >= 100 && (this.done = !0), t === this.last ? this.sinceLastUpdate += e : (this.sinceLastUpdate && (this.rate = (t - this.last) / this.sinceLastUpdate), this.catchup = (t - this.progress) / L.catchupTime, this.sinceLastUpdate = 0, this.last = t), t > this.progress && (this.progress += this.catchup * e), n = 1 - Math.pow(this.progress / 100, L.easeFactor), this.progress += n * this.rate * e, this.progress = Math.min(this.lastProgress + L.maxProgressPerFrame, this.progress), this.progress = Math.max(0, this.progress), this.progress = Math.min(100, this.progress), this.lastProgress = this.progress, this.progress
        }, e
    }(), B = null,C = function(){return false;},  _ = null, m = null, j = null, d = null, g = null, Pace.running = !1, T = function () {
        return L.restartOnPushState ? Pace.restart() : void 0
    }, null != window.history.pushState && (W = window.history.pushState, window.history.pushState = function () {
        return T(), W.apply(window.history, arguments)
    }), null != window.history.replaceState && ($ = window.history.replaceState, window.history.replaceState = function () {
        return T(), $.apply(window.history, arguments)
    }), l = {ajax: e, elements: r, document: n, eventLag: s}, Pace.stop = function () {
        return Pace.trigger("stop"), Pace.running = !1, g = !0, null != d && ("function" == typeof y && y(d), d = null), C()
    }, Pace.restart = function () {
        return Pace.trigger("restart"), Pace.stop(), Pace.start()
    }, Pace.go = function () {
        var e;
        return Pace.running = !0, m.render(), e = k(), g = !1, d = M(function (t, n) {
            var r, i, s, o, u, a, f, l, h, p, d, v, y, b, w, E;
            for (l = 100 - m.progress, i = d = 0, s = !0, a = v = 0, b = B.length; b > v; a = ++v)for (H = B[a], p = null != _[a] ? _[a] : _[a] = [], u = null != (E = H.elements) ? E : [H], f = y = 0, w = u.length; w > y; f = ++y)o = u[f], h = null != p[f] ? p[f] : p[f] = new c(o), s &= h.done, h.done || (i++, d += h.tick(t));
            return r = d / i, m.update(j.tick(t, r)), m.done() || s || g ? (m.update(100), Pace.trigger("done"), setTimeout(function () {
                return m.finish(), Pace.running = !1, Pace.trigger("hide")
            }, Math.max(L.ghostTime, Math.max(L.minTime - (k() - e), 0)))) : n()
        })
    }, Pace.start = function (e) {
        w(L, e), Pace.running = !0;
        try {
            m.render()
        } catch (t) {
            a = t
        }
        return document.querySelector(".pace") ? (Pace.trigger("start"), Pace.go()) : setTimeout(Pace.start, 50)
    }, "function" == typeof define && define.amd ? define("pace", [], function () {
        return Pace
    }) : "object" == typeof exports ? module.exports = Pace : L.startOnPageLoad && Pace.start()
}.call(this), window.Modernizr = function (e, t, n) {

}(this, this.document), function (e, t, n) {
    function r(e) {
        return "[object Function]" == d.call(e)
    }

    function i(e) {
        return "string" == typeof e
    }

    function s() {
    }

    function o(e) {
        return !e || "loaded" == e || "complete" == e || "uninitialized" == e
    }

    function u() {
        var e = v.shift();
        m = 1, e ? e.t ? h(function () {
            ("c" == e.t ? k.injectCss : k.injectJs)(e.s, 0, e.a, e.x, e.e, 1)
        }, 0) : (e(), u()) : m = 0
    }

    function a(e, n, r, i, s, a, f) {
        function l(t) {
            if (!d && o(c.readyState) && (w.r = d = 1, !m && u(), c.onload = c.onreadystatechange = null, t)) {
                "img" != e && h(function () {
                    b.removeChild(c)
                }, 50);
                for (var r in T[n])T[n].hasOwnProperty(r) && T[n][r].onload()
            }
        }

        var f = f || k.errorTimeout, c = t.createElement(e), d = 0, g = 0, w = {t: r, s: n, e: s, a: a, x: f};
        1 === T[n] && (g = 1, T[n] = []), "object" == e ? c.data = n : (c.src = n, c.type = e), c.width = c.height = "0", c.onerror = c.onload = c.onreadystatechange = function () {
            l.call(this, g)
        }, v.splice(i, 0, w), "img" != e && (g || 2 === T[n] ? (b.insertBefore(c, y ? null : p), h(l, f)) : T[n].push(c))
    }

    function f(e, t, n, r, s) {
        return m = 0, t = t || "j", i(e) ? a("c" == t ? E : w, e, t, this.i++, n, r, s) : (v.splice(this.i++, 0, e), 1 == v.length && u()), this
    }

    function l() {
        var e = k;
        return e.loader = {load: f, i: 0}, e
    }

    var c = t.documentElement, h = e.setTimeout, p = t.getElementsByTagName("script")[0], d = {}.toString, v = [],
        m = 0, g = "MozAppearance" in c.style, y = g && !!t.createRange().compareNode, b = y ? c : p.parentNode,
        c = e.opera && "[object Opera]" == d.call(e.opera), c = !!t.attachEvent && !c,
        w = g ? "object" : c ? "script" : "img", E = c ? "script" : w, S = Array.isArray || function (e) {
                return "[object Array]" == d.call(e)
            }, x = [], T = {}, N = {
            timeout: function (e, t) {
                return t.length && (e.timeout = t[0]), e
            }
        }, C, k;
    k = function (e) {
        function t(e) {
            var e = e.split("!"), t = x.length, n = e.pop(), r = e.length, n = {url: n, origUrl: n, prefixes: e}, i, s,
                o;
            for (s = 0; s < r; s++)o = e[s].split("="), (i = N[o.shift()]) && (n = i(n, o));
            for (s = 0; s < t; s++)n = x[s](n);
            return n
        }

        function o(e, i, s, o, u) {
            var a = t(e), f = a.autoCallback;
            a.url.split(".").pop().split("?").shift(), a.bypass || (i && (i = r(i) ? i : i[e] || i[o] || i[e.split("/").pop().split("?")[0]]), a.instead ? a.instead(e, i, s, o, u) : (T[a.url] ? a.noexec = !0 : T[a.url] = 1, s.load(a.url, a.forceCSS || !a.forceJS && "css" == a.url.split(".").pop().split("?").shift() ? "c" : n, a.noexec, a.attrs, a.timeout), (r(i) || r(f)) && s.load(function () {
                l(), i && i(a.origUrl, u, o), f && f(a.origUrl, u, o), T[a.url] = 2
            })))
        }

        function u(e, t) {
            function n(e, n) {
                if (e) {
                    if (i(e)) n || (f = function () {
                        var e = [].slice.call(arguments);
                        l.apply(this, e), c()
                    }), o(e, f, t, 0, u); else if (Object(e) === e)for (p in h = function () {
                        var t = 0, n;
                        for (n in e)e.hasOwnProperty(n) && t++;
                        return t
                    }(), e)e.hasOwnProperty(p) && (!n && !--h && (r(f) ? f = function () {
                        var e = [].slice.call(arguments);
                        l.apply(this, e), c()
                    } : f[p] = function (e) {
                        return function () {
                            var t = [].slice.call(arguments);
                            e && e.apply(this, t), c()
                        }
                    }(l[p])), o(e[p], f, t, p, u))
                } else!n && c()
            }

            var u = !!e.test, a = e.load || e.both, f = e.callback || s, l = f, c = e.complete || s, h, p;
            n(u ? e.yep : e.nope, !!a), a && n(a)
        }

        var a, f, c = this.yepnope.loader;
        if (i(e)) o(e, 0, c, 0); else if (S(e))for (a = 0; a < e.length; a++)f = e[a], i(f) ? o(f, 0, c, 0) : S(f) ? k(f) : Object(f) === f && u(f, c); else Object(e) === e && u(e, c)
    }, k.addPrefix = function (e, t) {
        N[e] = t
    }, k.addFilter = function (e) {
        x.push(e)
    }, k.errorTimeout = 1e4, null == t.readyState && t.addEventListener && (t.readyState = "loading", t.addEventListener("DOMContentLoaded", C = function () {
        t.removeEventListener("DOMContentLoaded", C, 0), t.readyState = "complete"
    }, 0)), e.yepnope = l(), e.yepnope.executeStack = u, e.yepnope.injectJs = function (e, n, r, i, a, f) {
        var l = t.createElement("script"), c, d, i = i || k.errorTimeout;
        l.src = e;
        for (d in r)l.setAttribute(d, r[d]);
        n = f ? u : n || s, l.onreadystatechange = l.onload = function () {
            !c && o(l.readyState) && (c = 1, n(), l.onload = l.onreadystatechange = null)
        }, h(function () {
            c || (c = 1, n(1))
        }, i), a ? l.onload() : p.parentNode.insertBefore(l, p)
    }, e.yepnope.injectCss = function (e, n, r, i, o, a) {
        var i = t.createElement("link"), f, n = a ? u : n || s;
        i.href = e, i.rel = "stylesheet", i.type = "text/css";
        for (f in r)i.setAttribute(f, r[f]);
        o || (p.parentNode.insertBefore(i, p), h(n, 0))
    }
}(this, document),define("Modernizr", function (e) {
    return function () {
        var t, n;
        return t || e.Modernizr
    }
}(this)), (window.jQuery || window.Zepto) && function (e) {
    e.fn.Swipe = function (t) {
        return this.each(function () {
            e(this).data("Swipe", new Swipe(e(this)[0], t))
        })
    }
}(window.jQuery || window.Zepto), define("swipe", function (e) {
    return function () {
        var t, n;
        return t || e.Swipe
    }
}(this)), function (e, t, n) {
    "use strict";
    e.HoverDir = function (t, n) {
        this.$el = e(n), this._init(t)
    }, e.HoverDir.defaults = {
        speed: 800,
        easing: "cubic-bezier(0.19, 1, 0.22, 1)",
        hoverDelay: 0,
        inverse: !1
    }, e.HoverDir.prototype = {
        _init: function (t) {
            this.options = e.extend(!0, {}, e.HoverDir.defaults, t), this.transitionProp = "all " + this.options.speed + "ms " + this.options.easing, this.transitionPropOut = "all " + (this.options.speed - 400) + "ms " + this.options.easing, this.support = Modernizr.csstransitions, this._loadEvents()
        }, _loadEvents: function () {
            var t = this;
            this.$el.on("mouseenter.hoverdir, mouseleave.hoverdir", function (r) {
                var i = e(this), s = i.find("div.overlay", "img"), o = t._getDir(i, {x: r.pageX, y: r.pageY}), u, a,
                    f = {left: "0px", top: "-100%"}, l = {left: "0px", top: "100%"}, c = {left: "-100%", top: "0px"},
                    h = {left: "100%", top: "0px"}, p = {top: "0px"}, d = {left: "0px"}, v = {left: "10%"},
                    m = {top: "10%"};
                if (r.type === "mouseenter") {
                    switch (o) {
                        case 0:
                            u = t.options.inverse ? l : f, a = p;
                            break;
                        case 1:
                            u = t.options.inverse ? c : h, a = v;
                            break;
                        case 2:
                            u = t.options.inverse ? f : l, a = m;
                            break;
                        case 3:
                            u = t.options.inverse ? h : c, a = d
                    }
                    e(this).parent().parent().attr("data-mouseDirection", "direction-" + o), s.hide().css(u), clearTimeout(t.tmhover), t.tmhover = setTimeout(function () {
                        s.show(0, function () {
                            var n = e(this);
                            t.support && n.css("transition", t.transitionProp), t._applyAnimation(n, a, t.options.speed)
                        })
                    }, t.options.hoverDelay)
                } else {
                    e(this).parent().parent().attr("data-mouseDirection") != n && (o = parseInt((new String(e(this).parent().parent().attr("data-mouseDirection"))).replace("direction-", "")));
                    switch (o) {
                        case 0:
                            u = t.options.inverse ? l : f, a = p;
                            break;
                        case 1:
                            u = t.options.inverse ? c : h, a = v;
                            break;
                        case 2:
                            u = t.options.inverse ? f : l, a = m;
                            break;
                        case 3:
                            u = t.options.inverse ? h : c, a = d
                    }
                    clearTimeout(t.tmhover), t.support && s.css("transition", t.transitionPropOut), t._applyAnimation(s, u, t.options.speed)
                }
            })
        }, _getDir: function (e, t) {
            var n = e.width(), r = e.height(), i = (t.x - e.offset().left - n / 2) * (n > r ? r / n : 1),
                s = (t.y - e.offset().top - r / 2) * (r > n ? n / r : 1),
                o = Math.round((Math.atan2(s, i) * (180 / Math.PI) + 180) / 90 + 3) % 4;
            return o
        }, _getStyle: function (e) {
            return {from: fromStyle, to: toStyle}
        }, _applyAnimation: function (t, n, r) {
            e.fn.applyStyle = this.support ? e.fn.css : e.fn.animate, t.stop().applyStyle(n, e.extend(!0, [], {duration: r + "ms"}))
        }
    };
    var r = function (e) {
        t.console && t.console.error(e)
    };
    e.fn.hoverdir = function (t) {
        var n = e.data(this, "hoverdir");
        if (typeof t == "string") {
            var i = Array.prototype.slice.call(arguments, 1);
            this.each(function () {
                if (!n) {
                    r("cannot call methods on hoverdir prior to initialization; attempted to call method '" + t + "'");
                    return
                }
                if (!e.isFunction(n[t]) || t.charAt(0) === "_") {
                    r("no such method '" + t + "' for hoverdir instance");
                    return
                }
                n[t].apply(n, i)
            })
        } else this.each(function () {
            n ? n._init() : n = e.data(this, "hoverdir", new e.HoverDir(t, this))
        });
        return n
    }
}(jQuery, window), define("jquery.hoverdir", ["jquery"], function (e) {
    return function () {
        var t, n;
        return t || e.hoverdir
    }
}(this)), define("ui/GridManager", ["Class", "jquery", "TweenLite", "TimelineLite", "Global", "Signal"], function (e, t, n, r, i, s) {
    var o = 4, u = "mix_all", a = 1.77, f = new e({
        initialize: function (e, t) {
            this.container = e, this.items = t, this.itemWidth = 0, this.itemHeight = 0, this.currentItems = this.items, this.gridWidth = 0, this.gridHeight = 0, this.currentGridWidth = 0, this.currentGridHeight = 0, i.onGridFilter = new s, this.updateSize()
        }, setupSize: function (e, t) {
            o = e, this.items.css("width", t), this.update()
        }, updateSize: function () {
            var e = this.items.width(), n = Math.floor(e / a);
            this.itemWidth = e, this.itemHeight = n;
            var r = Math.max(0, Math.floor((this.currentItems.length - 1) / o) + 1),
                i = Math.max(0, Math.floor((this.items.length - 1) / o) + 1);
            return this.gridWidth = this.itemWidth * o, this.gridHeight = this.itemHeight * i, this.currentGridWidth = this.itemWidth * o, this.currentGridHeight = this.itemHeight * r, this.container.css({
                width: this.gridWidth,
                height: this.gridHeight
            }), t(".image-overlay-color").css("height", n + 5), !0
        }, update: function (e) {
            if (!this.updateSize())return;
            var r = this.currentItems.length;
            this.currentItems.each(function (i, s) {
                var u = t(s), a = Math.floor(i / o), f = Math.floor(i - o * a);
                u.data("x-index", f), u.data("y-index", a), e ? n.to(u, .5, {
                    x: f * this.itemWidth,
                    y: a * this.itemHeight,
                    ease: Expo.easeOut,
                    delay: this.calculateScrollDelay(f, a)
                }) : n.set(u, {zIndex: r, x: f * this.itemWidth, y: a * this.itemHeight}), r--
            }.bind(this)), this.container.css({width: "100%", height: this.currentGridHeight})
        }, animateIn: function (e, i, s, u) {
            e = e || .1, i = i || 0, 0;
            var a = new r({paused: !0, onComplete: this.animateInComplete.bind(this), delay: e});
            this.animatingGrid = !0;
            var f = t(".grid-container").height();
            s && this.currentGridHeight < f && n.set(t("ul.content.grid"), {height: "100%", delay: .2});
            var l, c, h;
            for (var p = i || 0; p < this.items.length; p++)l = t(this.items[p]), h = Math.floor(p / o), c = Math.floor(p - o * h), l.data("x-index", c), l.data("y-index", h), u && p >= u && l.find(".image-overlay-color").first().css("visibility", "visible"), n.set(l, {
                opacity: 1,
                top: f
            }), a.fromTo(l, .5, {x: this.itemWidth * c, y: f}, {
                top: 0,
                x: this.itemWidth * c,
                y: this.itemHeight * h,
                ease: Expo.easeOut,
                delay: .2
            }, (h * .1 + c * .1).toString());
            a.play()
        }, animateInComplete: function () {
            this.animatingGrid = !1
        }, calculateItemDelay: function (e, t) {
            var n = Math.max(0, Math.floor((this.items.length - 1) / o) + 1);
            return t / n / 2 + e / o / 5
        }, calculateSlideDelay: function (e, t) {
            var n = e + t * o;
            return n / this.items.length / 5
        }, calculateScrollDelay: function (e, t) {
            return this.calculateItemDelay(e, t)
        }, filter: function (e) {
            if (this.animatingGrid)return;
            this.animatingGrid = !0;
            var n = new r({paused: !0, onComplete: i.onGridFilter.dispatch.bind(this, e)}),
                s = this.currentItems.toArray();
            for (var o = 0, u = s.length; o < u; o += 1) {
                var a = t(s[o]), f = parseInt(a.data("y-index"), 10), l = parseInt(a.data("x-index"), 10);
                n.to(a, .6, {y: -this.itemHeight * 2, ease: Expo.easeInOut}, (f * .05 + l * .05).toString())
            }
            n.play()
        }
    });
    return f.FILTER_ALL = u, f
}), define("Work/Cell", ["Class", "jquery", "TweenLite", "TimelineLite", "Global"], function (e, t, n, r, i) {
    return new e({
        initialize: function (e) {
            var n = e.featured_image && e.featured_image.source,
                r = e.featured_image && e.featured_image.attachment_meta.sizes, i = {
                    tabletPortrait: r && r.desktopHomeMobile ? r.desktopHomeMobile.url : n,
                    tabletLandscape: r && r.desktopHomeTabletLandscape ? r.desktopHomeTabletLandscape.url : n,
                    desktop: r && r.desktopHomeTabletLandscape ? r.desktopHomeTabletLandscape.url : n,
                    mobile: r && r.desktopHomeMobile ? r.desktopHomeMobile.url : n
                }, s = "";
            e.acf ? s = e.acf.work_section_subtitle : e.terms.clients && (s = e.terms.clients[0].name);
            var o = e.terms["work-category"], u = "", a = [];
            o && o.forEach(function (e) {
                a.push(e.slug), u += '<li class="work-cat-icon ' + e.slug + '"><i class="icon icon-' + e.slug + '">' + e.name + "</i></li>"
            });
            var f = a.join(" "), l = e.terms.post_tag, c = [];
            l && l.forEach(function (e) {
                e.slug.indexOf("featured-for") === -1 && c.push("tag-" + e.slug)
            });
            var h = c.join(" ");
            h || (h = "untagged"), this.dom = t('<li class="mix resize ' + f + '" data-filter="' + f + '">' + '<article class="hentry ' + e.slug + " " + e.type + " " + e.status + " " + h + '">' + '<div class="image-wrapper">' + '<a href="' + e.link + '" rel="bookmark" data-postid="' + e.ID + '" data-postslug="' + e.slug + '">' + '<div class="swipe-arrow"><i class="icon icon-angle-left"></i><div class="swipe-text">SWIPE</div></div>' + '<div class="loadOverlay"></div>' + '<img  src="' + n + '" ' + 'class="responsive panel wp-post-image" ' + 'alt="' + e.featured_image.title + '" ' + 'data-src-tabletportrait="' + i.tabletPortrait + '" ' + 'data-src-tabletlandscape="' + i.tabletLandscape + '" ' + 'data-src-mobile="' + i.mobile + '" ' + 'data-src-desktop="' + i.desktop + '" >' + '<div class="image-overlay-color"></div>' + '<div class="overlay panel">' + '<span class="grey-bg-wrap"><span class="grey-bg"></span></span>' + "<header>" + '<h2 class="overlay-title">' + e.title + "</h2>" + '<h3 class="overlay-sub-title">' + s + "</h3>" + "<ul>" + u + "</ul>" + "</header>" + "</div>" + "</a>" + "</div>" + "</article>" + "</li>")
        }
    })
}), define("Work/SpinnersManager", ["Class", "jquery", "TweenLite", "Global"], function (e, t, n, r) {
    return new e({
        spinners: [], curNumOfPosts: 0, initialize: function (e) {
            var n;
            this.curNumOfPosts = e;
            for (var r = 0; r < e; r++)n = t('<div class="loaderDiv"> <svg height="32" width="35" class="spinner"> <circle cx="5" cy="5" r="5" fill="#c0bdbf"></circle> <circle cx="30" cy="5" r="5" fill="#c0bdbf"></circle> <circle cx="17.5" cy="26.65" r="5" fill="#c0bdbf"></circle> </svg> </div>'), t(".grid-container").append(n), this.spinners.push(n)
        }, reattach: function (e, n) {
            if (this.curNumOfPosts == e && !n)return;
            this.curNumOfPosts = e;
            for (var r = 0; r < e; r++)t(".grid-container").append(this.spinners[r])
        }, detach: function () {
            for (var e = 0; e < this.curNumOfPosts; e++)this.spinners[e].detach(), this.spinners[e].removeClass("loaded"), this.spinners[e].removeClass("fade-in"), this.spinners[e].removeClass("is-spinning")
        }, resize: function (e, r, i) {
            var s = 0, o = 0;
            for (var u = 0; u < this.curNumOfPosts; u++)u === 0 ? (s = ((u + 1) * e - 32) * .5, o = (r - 32) * .5) : u % i === 0 && (s = (e - 32) * .5, o += r), n.set(this.spinners[u], {
                left: s,
                top: o + t("#category-nav").height()
            }), s += e
        }, animateInViewport: function () {
            var e;
            for (var t = 0; t < this.curNumOfPosts; t++)e = this.spinners[t].get(0).getBoundingClientRect(), e.top > 100 && e.bottom - 100 <= (window.innerHeight || document.documentElement.clientHeight) && !this.spinners[t].hasClass("loaded") ? (this.spinners[t].addClass("fade-in"), this.spinners[t].addClass("is-spinning")) : (this.spinners[t].removeClass("fade-in"), setTimeout(function (e) {
                this.spinners[e].removeClass("is-spinning")
            }.bind(this, t), 400))
        }, hideRangeOnLoad: function (e, t) {
            for (var n = e; n < t; n++)this.spinners[n] && !this.spinners[n].hasClass("loaded") && (this.spinners[n].removeClass("fade-in"), this.spinners[n].addClass("loaded"), setTimeout(function (e) {
                this.spinners[e].removeClass("is-spinning")
            }.bind(this, n), 500))
        }
    })
}), define("ui/RotateHandler", ["Class", "jquery", "libjs/utils/Util", "TweenLite", "Global", "Signal"], function (e, t, n, r, i, s) {
    var o = new e({
        initialize: function () {
            this.onRotate = new s, this.handleResizeBound = this.handleResize.bind(this)
        }, setup: function () {
            t(window).bind("orientationchange", this.handleResizeBound), n.support.isRetina && t(".rotate-icon").each(function () {
                var e = t(this);
                e.css("width", e.width() / 2), e.css("height", e.height() / 2)
            }), this.hero = t(".rotate-hero-container"), this.lock = t(".rotate-lock-container"), this.lockHidden = !1, n.support.isIPhone || n.support.isIPad || n.support.isIPod, this.isLandscape() && this.setRotateScreenEnabled(!0), i.onVideoInactive.add(this.handleResizeBound)
        }, destroy: function () {
            t(window).unbind("orientationchange", this.handleResizeBound), i.onVideoInactive.remove(this.handleResizeBound)
        }, setRotateScreenEnabled: function (e) {
            var s = t(".container");
            s.css("display", e ? "none" : "block"), t("#menu-content-overlay").css("display", e ? "none" : "block"), t(".mobile-rotate-screen").css("display", e ? "block" : "none");
            if (e) {
                var o = window.innerHeight, u = this.hero.height();
                if (!this.lockHidden) {
                    var a = i.currentWidthType === "mobile" ? 30 : 175, f = this.lock.height();
                    u = u + a + f, this.lock.css("margin-top", a)
                }
                var l = Math.ceil((o - u) / 2);
                this.hero.css("margin-top", l);
                var c = i.currentWidthType === "mobile" ? "PHONE" : "TABLET", h = t("header", this.hero), p = h.html();
                h.html(n.format(p, c)), r.fromTo([this.hero, this.lock], .5, {alpha: 0}, {alpha: 1, delay: .3})
            }
        }, isLandscape: function () {
            return i.videoPlaying || i.videoInFullScreen ? !1 : window.DeviceOrientationEvent && Math.abs(Math.floor(window.orientation)) === 90
        }, handleResize: function () {
            var e = this.isLandscape();
            this.setRotateScreenEnabled(e), this.onRotate.dispatch(e)
        }
    });
    return new o
}), function () {
    var e = 0, t = ["webkit", "moz"];
    for (var n = 0; n < t.length && !window.requestAnimationFrame; ++n)window.requestAnimationFrame = window[t[n] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[n] + "CancelAnimationFrame"] || window[t[n] + "CancelRequestAnimationFrame"];
    window.requestAnimationFrame || (window.requestAnimationFrame = function (t, n) {
        var r = (new Date).getTime(), i = Math.max(0, 16 - (r - e)), s = window.setTimeout(function () {
            t(r + i)
        }, i);
        return e = r + i, s
    }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (e) {
        clearTimeout(e)
    })
}(), define("utils/raf", function () {
}), define("Work/Grid", ["Class", "jquery", "TweenLite", "TimelineLite", "Global", "Modernizr", "swipe", "jquery.hoverdir", "jquery.hammer", "underscore", "ui/GridManager", "Work/Cell", "Work/SpinnersManager", "ui/RotateHandler", "libjs/utils/Util", "utils/GA", "utils/raf"], function (e, t, n, r, i, s, o, u, a, f, l, c, h, p, d, v) {
    var m = null, g = new e({
        categoryNavTimeline: null,
        navWidth: null,
        gridContainerElement: null,
        isSetup: !1,
        allowFiveCols: !0,
        totalPosts: null,
        numOfCols: null,
        prevMobileFilter: "mix_all",
        initialize: function (e) {
            m = this, this.featuredURL = e, this.gridContainerElement = t(".grid-container"), this.gridEl = t("ul.content.grid"), this.categoryNav = t("#category-nav"), this.animateCategoryNav = this.animateCategoryNav.bind(this), this.introGrid = this.introGrid.bind(this), this.navRespond = this.navRespond.bind(this), this.animateInGrid = this.animateInGrid.bind(this), this.resizeWorkGrid = this.resizeWorkGrid.bind(this), this.initWorkHoverEffects = this.initWorkHoverEffects.bind(this), this.onResizeHandler = this.onResizeHandler.bind(this), this.loopCheckScrollDelta = this.loopCheckScrollDelta.bind(this), this.openMobileCategoryNav = this.openMobileCategoryNav.bind(this), this.closeMobileCategoryNav = this.closeMobileCategoryNav.bind(this), i.isMobile && (this.toggleScrollTouch(), this.mobileLoadMoreBtn = t(".grid-container .loadMore"), this.mobileLoadMoreBtn.click(function () {
                this.animateOutMobileLoadBtn()
            }.bind(this)), this.spinnersManager = new h(1), n.set(this.spinnersManager.spinners[0], {
                position: "fixed",
                left: window.innerWidth / 2 - 20
            }), this.spinnersManager.spinners[0].addClass("is-spinning")), this.resetGridData(), this.getCellsData(), n.to(t(window), 0, {scrollTo: 0})
        },
        toggleScrollTouch: function () {
            if (i.isMobile) {
                t("body > .container, #content-wrap, main.front-page").css({
                    width: i.width,
                    height: i.windowHeight,
                    overflowX: "hidden"
                });
                var e = {position: "absolute", overflowY: "scroll", top: 0, left: 0};
                d.support.isAndroid || (e.webkitOverflowScrolling = location.hash ? "touch" : "auto"), t("main.front-page").css(e), t("#category-nav, header").on("touchmove", function (e) {
                    e.preventDefault()
                })
            }
        },
        checkIfNeedsLoadPosts: function () {
            requestAnimationFrame(this.checkIfNeedsLoadPosts.bind(this)), this.spinnersManager && this.spinnersManager.animateInViewport();
            var e = this.gridEl.height() + this.gridEl.offset().top - i.windowHeight,
                n = this.gridManager.itemHeight * (this.numOfCols > 3 ? 1 : 3);
            t(window).scrollTop() >= e - n && !this.isLoadingGridData && !this.isFilteredByCategory && !location.hash && !this.featuredURL && this.getCellsData(++this.currPage, !0)
        },
        resetGridData: function () {
            this.currPage = 1, this.isInitGridLoad = !0, this.isLoadingGridData = !1, this.isFilteredByCategory = !1, this.noMorePostsToLoad = !1, this.isSetup = !1, i.isMobile ? this.postsPerPage = 10 : this.postsPerPage = window.innerWidth > 1800 && this.allowFiveCols ? 10 : 12
        },
        getCellsData: function (e, n, r) {
            if (this.noMorePostsToLoad && !r)return;
            this.isLoadingGridData = !0, this.topFeaturedItems = [], i.isMobile || (e = !e || e == 1 ? 1 : e + 1), r = r || "", 0;
            var s;
            i.isMobile ? s = r || this.featuredURL ? -1 : this.postsPerPage : s = r || this.featuredURL ? -1 : this.isInitGridLoad ? this.postsPerPage * 2 : this.postsPerPage;
            var o = "/wp-json/posts?type=work&post_status=publish&page=" + e + "&filter[term]=" + r,
                u = {posts_per_page: s, taxonomy: "work-category", term: r};
            this.featuredURL == "" && (u.meta_key = "include_in_grid_dropdown", u.meta_value = "Yes"), 0, t.ajax({
                url: o,
                data: {filter: u},
                cache: !i.isMobile,
                dataType: "json",
                type: "GET",
                success: function (e, t, i) {
                    0;
                    var s = [];
                    for (var o = 0; o < e.length; o++)s.push(e[o]);
                    0, this.featuredURL && this.sortItemsForSalesURL(s), this.isInitGridLoad && (this.totalPosts = i.getResponseHeader("X-WP-Total"), this.totalPages = i.getResponseHeader("X-WP-TotalPages"), 0), this.curNumOfPosts = s.length;
                    if (!s.length) {
                        this.isLoadingGridData = !1, this.noMorePostsToLoad = !0;
                        return
                    }
                    this.appendCells(s, n, r), this.isLoadingGridData = !1, this.isInitGridLoad && (this.isInitGridLoad = !1)
                }.bind(this),
                error: function () {
                    0
                }
            })
        },
        sortItemsForSalesURL: function (e) {
            var t;
            e.slice().forEach(function (t, n) {
                var r = t.terms.post_tag;
                r && r.forEach(function (r) {
                    r.slug == this.featuredURL && (this.topFeaturedItems.push(t), e.splice(n, 1))
                }.bind(this))
            }.bind(this)), Array.prototype.unshift.apply(e, this.topFeaturedItems)
        },
        appendCells: function (e, r, s) {
            var o = document.createDocumentFragment(), u, a = [];
            e.forEach(function (e) {
                u = new c(e), o.appendChild(u.dom[0]), a.push(u.dom)
            }.bind(this)), this.gridEl.append(t(o)), this.setupGrid(r, s), this.resizeWorkGrid(), this.navRespond(), this.setupClickEvents(), this.setupMobile(), i.imgRespond(), 0;
            if (!i.isMobile) {
                var f = s || this.isInitGridLoad ? 0 : this.postsPerPage * this.currPage;
                this.isInitGridLoad && this.checkIfNeedsLoadPosts(), r || s ? (this.gridManager.animateIn(0, f, s), s && n.to(t(window), 0, {scrollTo: 0})) : this.isFilteredAll && !r && this.introGrid(), this.spinnersManager.hideRangeOnLoad(f, f + e.length)
            } else {
                n.set(a, {
                    autoAlpha: 1,
                    y: t(".content.grid")[0].getBoundingClientRect().height
                }), n.to(this.spinnersManager.spinners[0], .1, {opacity: 0});
                var l = .2;
                for (var h = 0; h < a.length; h++)n.to(a[h], .6, {
                    y: 0,
                    delay: l += .1,
                    ease: Expo.easeOut,
                    onComplete: function (e) {
                        e == a.length - 1 && this.setMobileLoadButton()
                    }.bind(this, h)
                })
            }
        },
        animateOutMobileLoadBtn: function () {
            var e = t("li.mix"), r = (e.length + 1) * e.height();
            n.set(this.gridEl, {height: r}), n.to(this.mobileLoadMoreBtn, .1, {
                autoAlpha: 0,
                ease: Linear.easeNone
            }), n.to(this.gridContainerElement, 1.5, {scrollTo: r, delay: .1}), n.delayedCall(0, function () {
                this.getCellsData(++this.currPage, !0), this.showMobileSpinner(e.height() / 2 - 20, 0)
            }.bind(this))
        },
        setMobileLoadButton: function () {
            this.resizeWorkGrid();
            if (this.currPage >= this.totalPages && !this.isFilteredByCategory)return;
            var e = t("ul.content.grid"), r = t("ul.content.grid li.mix");
            e.css("height", "auto");
            var i = this.isFilteredByCategory ? 0 : r.height() * r.length;
            n.set(this.mobileLoadMoreBtn, {autoAlpha: i ? 1 : 0, y: i})
        },
        setupMobile: function () {
            i.isMobile && (this.firstSwipeArrow = t(".content.grid > li:first").find(".swipe-arrow:first"), this.firstSwipeArrowAnimation = new r({paused: !0}), this.firstSwipeArrowAnimation.to(this.firstSwipeArrow, 1, {
                width: 95,
                ease: Expo.easeInOut
            }), this.firstSwipeArrowAnimation.to(this.firstSwipeArrow.find(".swipe-text"), .5, {
                autoAlpha: 1,
                ease: Linear.easeNone
            }, "-=0.8"), this.playSwipeAnimationTimeout = setTimeout(this.playSwipeAnimation.bind(this), 2e3), this.loopCheckScrollDelta())
        },
        setupClickEvents: function () {
            var e = this;
            t(".content.grid .image-wrapper > a").on("click", function (r) {
                r.preventDefault();
                var s = t(this), o = s.find("header h2"), u = o.text().replace(/^\s+|\s+$/g, "");
                if (e.catNavOpen)return;
                if (e.isLoadingWorkPage)return;
                if (i.isMobile && !s.hasClass("animating"))if (s.hasClass("opened")) v.trackWorkItem(u), window.location.hash = s.data("postslug"), e.closeMobieGridItem(s); else {
                    e.swipeGridLeft.apply(this);
                    var a = .3;
                    n.to(s, a, {alpha: .5}), n.to(s, a, {delay: a, alpha: 1})
                } else t("body").removeClass("cover-closed").addClass("cover-open"), v.trackWorkItem(u), window.location.hash = s.data("postslug")
            })
        },
        onResizeHandler: function () {
            this.resizeWorkGrid(), this.initWorkHoverEffects(), this.navRespond(), i.isMobile && this.setupMobileGrid()
        },
        resizeWorkGrid: function () {
            if (!i.isMobile) {
                if (!this.gridManager)return;
                var e = 3;
                i.width > 1800 && this.allowFiveCols ? e = 5 : i.width > 1400 && (e = 4), this.numOfCols = e, this.gridManager.setupSize(e, 100 / e + "%"), this.gridManager.update();
                if (i.width !== this.lastWinWindth || this.isFilteredAll) {
                    var n = Math.ceil(this.totalPosts / e) * this.gridManager.itemHeight + t("#category-nav").height();
                    this.gridContainerElement.height(n), 0
                }
                this.isInitGridLoad && !this.isFilteredAll ? this.spinnersManager = new h(this.totalPosts) : (this.isFilteredByCategory || this.isFilteredAll) && this.isFilteredAll && this.spinnersManager.reattach(this.totalPosts), this.isFilteredByCategory || (this.spinnersManager.resize(this.gridManager.itemWidth, this.gridManager.itemHeight, e), this.spinnersManager.animateInViewport()), this.lastWinWindth = i.width
            } else {
                var r = this.getWorkItemHeight(), s = i.currentWidthType === "tabletPortrait" ? 300 : r;
                this.gridContainerElement.css({
                    width: i.width,
                    height: i.windowHeight - this.gridContainerElement.offset().top
                }), t("ul.content.grid > li a .overlay.panel header").each(function (e, n) {
                    var r = t(n), i = s * .5 - r.height() * .5;
                    r.css("top", i)
                }.bind(this));
                var o = t("ul.content.grid > li a img");
                i.currentWidthType === "tabletPortrait" && o.each(function (e, n) {
                    t(n).css({position: "relative", top: -(r - s) / 2})
                }.bind(this)), this.featuredURL && o.each(function (e, n) {
                    e > this.topFeaturedItems.length && !this.isFilteredByCategory && t(n).css({opacity: .2})
                }.bind(this))
            }
        },
        getWorkItemHeight: function () {
            return i.currentWidthType === "tabletPortrait" ? i.width / 1e3 * 566 : i.width / 640 * 308
        },
        navRespond: function () {
            var e = t("#category-nav.work-sorter"), n = e.find("ul:first"), r = n.find("li").filter(function () {
                var e = t(this).children("a:first");
                return e.length && e.attr("href") === "#categories"
            });
            i.isMobile ? r.length === 0 && (n.find(".fromCategoriesMenu").remove(), n.prepend(n.data("categoriesLi"))) : (r.length && (r.after(r.children("ul:first").children().clone().addClass("fromCategoriesMenu")), n.data("categoriesLi", r.remove())), this.gridManager && e.css("width", this.gridManager.gridWidth));
            if (i.isMobile) {
                var s = i.width;
                t("ul.content.grid > li a").width(s * 2), i.currentWidthType === "tabletPortrait" && (this.gridEl.width(s).css("height", i.height), this.gridContainerElement.width(s).css("height", i.height))
            }
        },
        setupGrid: function (e, r) {
            if (this.isSetup && !e && !r)return;
            this.gridItems = t(".content.grid li.mix"), t("header.main-header").removeClass("cloak"), this.gridItems.css("display", "block").css("position", "absolute"), i.isMobile || (this.gridManager = new l(this.gridEl, this.gridItems), i.onGridFilter.add(function (e) {
                this.isFilteredByCategory = e !== "mix_all", this.isFilteredAll = !this.isFilteredByCategory, this.gridEl.empty(), this.spinnersManager.detach(), n.to(t(window), 0, {scrollTo: 0}), this.isFilteredByCategory ? (this.gridContainerElement.css("height", "auto"), this.getCellsData(1, !1, e)) : (this.resetGridData(), this.getCellsData())
            }.bind(this))), this.navRespond(), this.initWorkHoverEffects(), !e && !r && !this.isFilteredAll && this.introNav(), this.respImgListenerSet || (this.respImgListenerSet = !0, i.onResponsiveImgsSrcSet.add(function () {
                0, !i.isMobile && this.gridManager ? this.gridManager.update() : this.gridItems.css("opacity", 1), f.defer(this.onResizeHandler)
            }.bind(this))), this.isSetup = !0
        },
        animateInGrid: function () {
            i.isMobile || (this.gridManager.update(), this.gridManager.animateIn(0, 0, !1, this.topFeaturedItems.length))
        },
        animateCategoryNav: function (e) {
            var i = this;
            this.categoryNavTimeline = new r({paused: !0, delay: .5, onComplete: e});
            var s = t(".dark-back:first");
            this.categoryNavTimeline.add(n.fromTo(s, .7, {scaleX: 0, transformOrigin: "top left"}, {
                scaleX: 1,
                transformOrigin: "top left",
                ease: Expo.easeInOut
            }));
            var o = t("#category-nav ul li:first").height();
            t("#category-nav ul li").each(function () {
                var e = t(this);
                i.categoryNavTimeline.fromTo(e, .5, {y: -o, opacity: 0}, {
                    y: 0,
                    opacity: 1,
                    ease: Expo.easeOut
                }, "-=0.4")
            }), this.categoryNavTimeline.play()
        },
        introGrid: function () {
            this.animateInGrid(), t("li > a.filter").on("click", function (e) {
                if (!t(this).hasClass("active")) {
                    if (m.gridManager.animatingGrid)return;
                    var n = t(this).attr("data-filter");
                    m.onFilter(n), t(this).parent().siblings().find("a.filter").removeClass("active"), t(this).addClass("active")
                }
                e.preventDefault()
            }), m.navWidth = t("#category-nav ul").width()
        },
        initWorkHoverEffects: function () {
            if (i.isMobile) this.gridItems.removeData("mousedirection"), t(".content.grid > li .image-wrapper").off("mouseenter.hoverdir, mouseleave.hoverdir"); else {
                var e = 0;
                t(".content.grid > li .image-wrapper").each(function (t, n) {
                    var r = jQuery(n);
                    t === 0 && (e = r.height()), r.hoverdir(), r.find(".panel,a").css("width", "");
                    var i = r.find(".panel header"), s = i.height();
                    i.css({height: s, marginTop: -s * .5})
                })
            }
        },
        onFilter: function (e) {
            i.isMobile || (this.gridManager.update(), this.gridManager.filter(e))
        },
        setupMobileGrid: function (e) {
            this.categoryNav.off("click").on("click", 'a[href="#categories"]', this.openMobileCategoryNav.bind(this)), t("#category-nav .sub-menu a").off("click").on("click", this.clickMobileCategoryNav.bind(this)), t("ul.content.grid > li").each(function (r, s) {
                var o = t(s).find("a:first-child");
                t(s).on("click", this.swipeGridLeft.bind(this, o[0])), this.hammertime = a(o[0]), this.hammertime.on("swipeleft", this.swipeGridLeft.bind(this, o[0])), this.hammertime.on("swiperight", this.swipeGridRight.bind(this, o[0])), e && !i.newHash && n.to(s, .4, {
                    opacity: 1,
                    delay: .1 * r,
                    ease: Linear.easeNone
                })
            }.bind(this)), this.isFilteredByCategory || this.categoryNav.find('a[data-filter="mix_all"]').parent().addClass("active")
        },
        swipeGridLeft: function (e) {
            var e = t(e);
            if (e.hasClass("opened") || e.hasClass("animating"))return;
            0;
            var r = t(".content.grid li a.opened");
            e.addClass("opened"), m.playSwipeAnimationTimeout && clearTimeout(m.playSwipeAnimationTimeout);
            var i = 0;
            r.length > 0 && (i = .1), r.each(function (e, n) {
                this != n && m.closeMobieGridItem(t(n))
            }.bind(this)), n.delayedCall(i, m.openMobileGridItem, [e])
        },
        swipeGridRight: function (e) {
            var e = t(e);
            m.closeMobieGridItem(e)
        },
        closeMobieGridItem: function (e) {
            if (!e.hasClass("opened"))return;
            var t = e.find("img"), r = .4;
            n.to(e, r, {
                x: 0, ease: Expo.easeIn, onComplete: function () {
                    e.removeClass("opened"), e.removeClass("animating")
                }
            }), i.isIOS8 ? (0, n.to(t, .3, {left: 0, ease: Expo.easeIn})) : n.to(t, .3, {x: 0, ease: Expo.easeIn});
            var s = e.find(".swipe-arrow:first");
            n.to(s, .2, {width: 45, overwrite: 1}), n.to(s, r, {x: 0, ease: Expo.easeIn})
        },
        openMobileGridItem: function (e) {
            var t = e.find("img"), r = .4;
            e.addClass("animating"), n.to(e, r, {
                x: -i.width, ease: Expo.easeIn, onComplete: function () {
                    e.removeClass("animating")
                }
            });
            var s = e.find(".swipe-arrow:first");
            n.to(s, r, {x: -i.width, ease: Expo.easeIn}), i.isIOS8 ? (0, n.to(t, r - .1, {
                left: 30,
                delay: 0,
                ease: Expo.easeIn
            })) : n.to(t, r - .1, {x: 30, delay: 0, ease: Expo.easeIn}), n.to(s, r, {
                width: 200,
                ease: Expo.easeOut
            }), s.hasClass("swipe-text-visible") && (n.to(s.find(".swipe-text"), .5, {
                autoAlpha: 0,
                overwrite: 1
            }), s.removeClass("swipe-text-visible"))
        },
        loopCheckScrollDelta: function () {
            setTimeout(this.loopCheckScrollDelta, 1e3);
            var e = this.gridContainerElement.scrollTop();
            if (Math.abs(this.lastScrollTop - e) > 30) {
                var n = t(".content.grid li a.opened");
                n.length && n.each(function (e, n) {
                    m.closeMobieGridItem(t(n))
                })
            }
            this.lastScrollTop = e
        },
        playSwipeAnimation: function () {
            this.firstSwipeArrow.addClass("swipe-text-visible"), this.firstSwipeArrowAnimation.play()
        },
        hideFirstSwipeCTA: function () {
            this.firstSwipeArrowAnimation.reverse(), this.firstSwipeArrowAnimation.play()
        },
        introNav: function () {
            i.isMobile ? this.setupMobileGrid(!0) : (n.set(t("#category-nav ul:first"), {opacity: 1}), this.animateCategoryNav(this.introGrid))
        },
        openMobileCategoryNav: function (e) {
            e.preventDefault();
            if (this.catNavOpen)return this.closeMobileCategoryNav(), !1;
            this.catNavOpen = !0, this.gridContainerElement.on("click", this.closeMobileCategoryNav.bind(this));
            var r = t("#category-nav ul.sub-menu");
            r.css({height: 0, "max-height": "none"});
            var s = r.find("> li:first").outerHeight(), o = r.find("> li").length, u = o * s,
                a = this.categoryNav.offset().top, f = this.categoryNav.height(), l = i.windowHeight - f - a,
                c = Math.min(u, l);
            return n.to(r, .5, {height: c, ease: Expo.easeInOut}), n.to(this.gridContainerElement, .5, {
                y: c,
                ease: Expo.easeInOut,
                overwrite: !0
            }), i.isMobile && this.gridEl.on("touchstart", this.closeMobileCategoryNav), !1
        },
        clickMobileCategoryNav: function (e) {
            e.preventDefault();
            var r = t(e.currentTarget), i = r.attr("data-filter");
            this.isFilteredByCategory = i && i !== "mix_all", this.isFilteredAll = !this.isFilteredByCategory;
            if (this.prevMobileFilter == i) {
                this.prevMobileFilter = i, this.closeMobileCategoryNav();
                return
            }
            return n.to(this.gridContainerElement, .5, {
                scrollTop: 0,
                ease: Expo.easeOut
            }), n.set(this.mobileLoadMoreBtn, {autoAlpha: 0}), this.gridEl.empty(), this.isFilteredByCategory || this.resetGridData(), this.getCellsData(1, !1, this.isFilteredByCategory ? i : !1), this.prevMobileFilter = i, 0, t("ul.sub-menu li").each(function (e, n) {
                var r = t(n), s = r.find("a:first"), o = s.attr("data-filter");
                o == i ? r.addClass("active") : r.removeClass("active")
            }), this.closeMobileCategoryNav(), n.to(t("main.front-page")[0], .7, {
                scrollTop: 0,
                ease: Expo.easeInOut
            }), !1
        },
        closeMobileCategoryNav: function (e) {
            e && (e.preventDefault(), e.stopImmediatePropagation()), i.isMobile && this.gridEl.off("touchstart", m.closeMobileCategoryNav), this.gridContainerElement.off("click"), n.to(t("#category-nav ul.sub-menu"), .5, {
                height: 0,
                ease: Expo.easeInOut
            }), n.to(this.gridContainerElement, .5, {
                y: 0, ease: Expo.easeInOut, onComplete: function () {
                    this.gridContainerElement.css("transform", ""), this.showMobileSpinner(t(window).height() / 2 - 30, .1)
                }.bind(this)
            }), this.catNavOpen = !1
        },
        showMobileSpinner: function (e, t) {
            n.set(this.spinnersManager.spinners[0], {bottom: e}), n.to(this.spinnersManager.spinners[0], .3, {
                opacity: 1,
                delay: t || 0
            })
        }
    });
    return g
}), define("Work/FullscreenGallery", ["Class", "Global", "utils/GA"], function (e, t, n) {
    var r = null, i = new e({
        inited: !1,
        width: 0,
        height: 0,
        isOpen: !1,
        lastTimestamp: 0,
        animationFrameID: null,
        _total: 0,
        total: {
            set: function (e) {
                this._total = e;
                var t = "";
                for (var n = 0, r = this._total; n < r; n += 1)t += '<div class="page"></div>';
                this.$pageIndicator.html(t), this.$totalNumber.html(this._total)
            }, get: function () {
                return this._total
            }
        },
        _curPos: 0,
        curPos: {
            set: function (e) {
                this._curPos = e, this.curImg = this.$galleryHolder.find("li > img")[this._curPos];
                var t = this.$pageIndicator.find(".page");
                t.length > 0 && t.each(function (e) {
                    var t = $(this);
                    e === r._curPos ? t.addClass("active") : t.removeClass("active")
                }), this.$currentPage.html(this._curPos + 1);
                if (this._curPos < this.total - 1) {
                    var n = this.$galleryHolder.find("li > img")[this._curPos + 1], i = n.dataset.srcMobile;
                    this.$nextBut.removeClass("inactive").find(".thumb").css({backgroundImage: "url('" + i + "')"})
                } else this.$nextBut.addClass("inactive");
                if (this._curPos > 0) {
                    var s = this.$galleryHolder.find("li > img")[this._curPos - 1], i = s.dataset.srcMobile;
                    this.$prevBut.removeClass("inactive").find(".thumb").css({backgroundImage: "url('" + i + "')"})
                } else this.$prevBut.addClass("inactive")
            }, get: function () {
                return this._curPos
            }
        },
        mouse: null,
        initialize: function () {
            r = this, this.mouse = {}, this.animationFrame = this.animationFrame.bind(this), this.mouseMove = this.mouseMove.bind(this), t.onResize.add(this.resize.bind(this))
        },
        init: function () {
            if (t.isMobile)return;
            if (this.inited)return;
            inited = !0;
            var e = '<div id="fullscreen-gallery">				<div id="gallery-holder"></div>				<div class="nav-but prev">					<div class="thumb"></div>				</div>				<div class="nav-but next">					<div class="thumb"></div>				</div>				<div class="dot-page-indicator"></div>				<div class="num-page-indicator">					<div class="current-number"></div>					<div class="seperator">⁄</div>					<div class="total-number"></div>				</div>				<div class="close"></div>			</div>';
            this.$container = $(e).appendTo($("body")), this.$galleryHolder = this.$container.find("#gallery-holder"), this.$pageIndicator = this.$container.find(".dot-page-indicator"), this.$numPageIndicator = this.$container.find(".number-page-indicator"), this.$currentPage = this.$container.find(".current-number"), this.$totalNumber = this.$container.find(".total-number"), this.$nextBut = this.$container.find(".nav-but.next"), this.$prevBut = this.$container.find(".nav-but.prev"), this.$container.on("click", ".nav-but", function () {
                var e = $(this);
                e.hasClass("prev") ? r.prev() : e.hasClass("next") && r.next()
            }).on("click", "li img", function () {
                r.hide()
            }), this.$container.find(".nav-but").on("mouseover", function () {
                r.$container.addClass("default-cursor")
            }).on("mouseout", function () {
                r.$container.removeClass("default-cursor")
            }), this.resize()
        },
        prev: function () {
            this.curPos > 0 && (this.moveToPos(this.curPos - 1), this.swipe.prev())
        },
        next: function () {
            this.curPos < this.total - 1 && (this.moveToPos(this.curPos + 1), this.swipe.next())
        },
        imgLoadComplete: function () {
            r.fillImg(this)
        },
        fillImg: function (e) {
            var t = e.naturalWidth, n = e.naturalHeight, r = this.width / t, i = this.height / n, s = Math.max(r, i),
                o = t * s, u = n * s;
            $(e).css({width: o, height: u, marginLeft: -o / 2, marginTop: -u / 2})
        },
        show: function (e, t, n) {
            if (this.isOpen)return;
            n == "#ffffff" ? this.$container.addClass("white") : this.$container.removeClass("white"), this.swipe = t;
            var i = e.find("ul.swipe-wrap li").clone();
            i.each(function (e) {
                var t = $(this);
                t.attr("style", "");
                var n = t.find("img"), i = n[0];
                i.onload = r.imgLoadComplete, i.complete && r.imgLoadComplete.call(i), n.attr("class", "");
                if (n.data("fullsrc")) {
                    var s = n.data("fullsrc");
                    n.attr("src", s)
                } else {
                    var o = n.data("srcDesktop");
                    n.attr("src", o)
                }
                TweenLite.set(this, {x: e * r.width})
            }), this.$galleryHolder.html(i), this.total = i.length, this.curPos = t.getPos();
            var s = new TimelineLite({paused: !0});
            s.add(TweenLite.fromTo(this.$container, .5, {x: this.width}, {
                onStart: function () {
                    r.$container.css({display: "block"})
                }, x: 0, delay: .1, ease: Expo.easeOut, onComplete: function () {
                    r.isOpen = !0, $(document).off("mousemove", r.mouseMove).on("mousemove", r.mouseMove), r.startAnimationFrame()
                }
            })), s.add([TweenLite.fromTo(this.$container.find(".nav-but.prev"), .5, {x: -50}, {
                x: 0,
                ease: Expo.easeOut
            }), TweenLite.fromTo(this.$container.find(".nav-but.next"), .5, {x: 50}, {
                x: 0,
                ease: Expo.easeOut
            })]), s.add(TweenLite.fromTo(this.$pageIndicator, .5, {opacity: 0}, {
                opacity: 1,
                ease: Linear.easeOut
            })), s.add(TweenLite.fromTo(this.$numPageIndicator, .5, {opacity: 0}, {
                opacity: 1,
                ease: Linear.easeOut
            })), s.play(), this.moveToPos(this.curPos, !0), $(window).on("mousewheel DOMMouseScroll", this.preventDefault)
        },
        hide: function () {
            this.stopAnimationFrame(), this.isOpen = !1, $(document).off("mousemove", this.mouseMove), TweenLite.to(this.$container, .5, {
                onComplete: function () {
                    r.$container.css({display: "none"}), $(window).off("mousewheel DOMMouseScroll", r.preventDefault)
                }, x: this.width, delay: 0, ease: Expo.easeIn
            })
        },
        preventDefault: function (e) {
            return e.preventDefault(), !1
        },
        mouseMove: function (e) {
            this.mouse.x = e.clientX, this.mouse.y = e.clientY, this.mouse.centerWeightX = -this.mouse.x / this.halfWidth + 1, this.mouse.centerWeightY = -this.mouse.y / this.halfHeight + 1
        },
        moveToPos: function (e, t) {
            time = t ? 0 : 1, delay = t ? 0 : 0, TweenLite.to(this.$galleryHolder, time, {
                delay: delay,
                x: -this.width * e,
                ease: Expo.easeInOut
            }), this.curPos = e
        },
        startAnimationFrame: function () {
            this.stopAnimationFrame(), this.animationFrameID = window.requestAnimationFrame(this.animationFrame)
        },
        stopAnimationFrame: function () {
            this.animationFrameID && (window.cancelAnimationFrame(this.animationFrameID), this.start = null, this.animationFrameID = null)
        },
        animationFrame: function (e) {
            this.start === null && (this.start = e);
            if (this.lastTimestamp > 0)var t = e - this.lastTimestamp;
            if (this.curImg)if (this.curImg.height > this.height || this.curImg.width > this.width) {
                var n = (this.curImg.height - this.height) / 2, r = n * this.mouse.centerWeightY,
                    i = (this.curImg.width - this.width) / 2, s = i * this.mouse.centerWeightX;
                TweenLite.to(this.curImg, 1, {y: r, x: s, overwrite: "auto", ease: Expo.easeOut})
            }
            this.lastTimestamp = e;
            if (!this.isOpen)return;
            this.animationFrameID = window.requestAnimationFrame(this.animationFrame)
        },
        resize: function (e, t) {
            e && t && (this.width = e, this.height = t, this.halfWidth = e / 2, this.halfHeight = t / 2);
            if (this.$container) {
                var n = {width: e, height: t};
                this.$container.css(n), this.$galleryHolder.css(n), this.$galleryHolder.find("li").each(function (e) {
                    var t = $(this);
                    TweenLite.set(this, {x: e * r.width}), r.fillImg(t.find("img")[0])
                }), this.moveToPos(this.curPos, !0)
            }
        }
    });
    return new i
}), define("Work/Gallery", ["Class", "Global", "Work/FullscreenGallery", "swipe", "utils/GA"], function (e, t, n, r, i) {
    var s = null, o = new e({
        swipe: null, initialize: function (e, n) {
            if (!e || !e.length)return;
            s = this, this.$container = e, this.project = n;
            var o = t.windowHeight, u = t.width, a = e.find(".swipe:first");
            this.createGalleryPagination(e.find(".gallery-lower"), a.find("> ul > li").length);
            if (a.length) {
                var f = a[0];
                if (e.find(".gallery-info").length === 0) {
                    var l = (o - 70) * ($(f).find("img").eq(0).outerWidth(!0) / $(f).find("img").eq(0).outerHeight(!0)) / u;
                    l > 1 && (l = 1), $(f).parent().parent().parent().css({
                        width: l.toFixed(2) * 100 + "%",
                        margin: "auto",
                        "float": "none"
                    })
                }
                this.swipe = new r(f, {
                    continuous: !1, transitionEnd: function () {
                        var t = s.swipe.getPos() + 1;
                        e.find(".slide-numbers .current-number").html(t), e.find(".gallery-markers .marker").removeClass("active"), e.find(".gallery-markers .marker").slice(t - 1, t).addClass("active"), i.trackEvent("Interaction", "BrowseSlideshow", s.project.projectTitle.toLowerCase(), t)
                    }
                }), e.find(".slide-numbers .current-number").html(s.swipe.getPos() + 1), e.find(".slide-numbers .total-number").html(s.swipe.getNumSlides()), e.find(".controls").on("click", ".prev", function (e) {
                    if (s.project.isLoadingWorkPage)return;
                    s.swipe.prev(), e.preventDefault()
                }), e.find(".controls").on("click", ".next", function (e) {
                    if (s.project.isLoadingWorkPage)return;
                    s.swipe.next(), e.preventDefault()
                }), e.find(".controls").on("click", ".magnify", function (e) {
                    var t = s.swipe.getPos() + 1;
                    s.magnify(), e.preventDefault()
                })
            }
        }, magnify: function () {
            i.trackEvent("Interaction", "SlideshowFullscreen", s.project.projectTitle.toLowerCase(), s.swipe.getPos() + 1), n.show(this.$container, s.swipe, s.project.coverColour)
        }, createGalleryPagination: function (e, n) {
            e = e.find(".gallery-markers");
            var r = "";
            for (var i = 0; i < n; i++)r += '<div class="marker' + (i == 0 ? " active" : "") + '"></div>';
            var s = 13, o = 6;
            t.isMobile && (e.addClass("small"), s = 10, o = 4), e.find(".markerWrap").html(r);
            var u = n * s + (n - 1) * o * 2;
            e.find(".line").css({
                width: u,
                "margin-left": -(u * .5)
            }), e.find(".markerWrap").css("margin-left", -(n * s + n * o * 2) * .5)
        }
    });
    return o
}), define("Work/Project", ["Class", "jquery", "TweenLite", "TimelineLite", "Global", "ui/FadeIn", "Modernizr", "swipe", "jquery.hoverdir", "jquery.hammer", "pace", "ui/VideoControls", "underscore", "ui/RotateHandler", "libjs/utils/Util", "utils/GA", "Work/Gallery", "Work/FullscreenGallery", "Signal"], function (e, t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y) {
    _this = null;
    var b = new e({
        scrollingDistance: null,
        coverColour: "#ffffff",
        isLoadingWorkPage: null,
        toolScrollTimeline: null,
        posterTimeline: null,
        posterHeight: null,
        posterWidth: null,
        posterContainerHeight: null,
        posterContainerWidth: null,
        rightNavHeight: null,
        titleOffset: null,
        previousIsMobile: !1,
        isPosterMode: !0,
        postNavShiftValue: 100,
        gallery: null,
        initialize: function (e) {
            _this = this, this.featuredURL = e, e && (this.onProjectShown = new y), t("html").css("overflow-y", "scroll"), g.init(), this.resizePoster = this.resizePoster.bind(this), this.mouseWheelHandler = this.mouseWheelHandler.bind(this), this.setupWorkIntro = this.setupWorkIntro.bind(this), this.setupCoverScrollUp = this.setupCoverScrollUp.bind(this), this.setNavPosition = this.setNavPosition.bind(this), this.posterImageLoaded = this.posterImageLoaded.bind(this), this.mainResizeHandler = this.mainResizeHandler.bind(this), this.pauseVideo = this.pauseVideo.bind(this), this.mouseWheelHandlerDebounced = this.mouseWheelHandler, this.previousIsMobile = i.isMobile, this.setupSmoothScroll(), i.isMobile || t(window).on("resize", this.resizePoster), t(window).on("resize", this.mainResizeHandler), this.setupClickEvents(), t.fn.textWidth = function () {
                var e = t(this).html(), n = "<span>" + e + "</span>";
                t(this).html(n);
                var r = t(this).find("span:first").width();
                return t(this).html(e), r
            }, t("main.single-work").length > 0 && i.isMobile && t("#posterContainer video").remove(), t(".video-player").length > 0 && new c(t(".video-player").last())
        },
        mainResizeHandler: function () {
            this.previousIsMobile != i.isMobile && i.isMobile && (this.isPosterMode ? window.location.reload(!1) : (this.posterTimeline.progress(1), t(window).off("scroll", this.setupCoverScrollUp))), $windowWidth = t(window).width(), $postNavigationWidth = t(".post-navigation-wrap").width(), this.setNavPosition($windowWidth, $postNavigationWidth), !i.isMobile, this.previousIsMobile = i.isMobile
        },
        setHeight: function (e, n, r) {
            var i = Math.max(t(window).height(), 400);
            e.height(i - n), r == "centered" && e.find("div:first-child").css({
                top: "50%",
                bottom: "auto",
                position: "absolute",
                marginTop: -e.first().height() * .5
            })
        },
        scrollStop: function (e) {
            e.stopPropagation(), e.preventDefault()
        },
        centerCoverTitle: function (e) {
            var r = e.find(".entry-title"),
                s = parseInt(e.find(".content").css("padding-top")) + (e.find(".poster-image").height() + e.find(".big-header").height()) * .5;
            !i.isMobile && !t("body").hasClass("cover-closed") && n.set(r, {y: -s})
        },
        setupClickEvents: function () {
            t("body").on("click", ".post-nav a", function (e) {
                _this.toggleMainHeaderVisibility(!1, .5), window.location.hash = t(this).parent().data("postslug"), e.preventDefault()
            })
        },
        setupFadeIn: function () {
            var e = new s(t("div.module-item"), t(".module-item li").not(".multiple_images li, .seamless-images li"), t(".multiple_images:first li, .seamless-images li:first"), t(".module h2.callout"), t(".module header h3.has-icon"), t(".image-gallery"), t(".gallery-lower"), t("a.btn"), t(".module .line"))
        },
        setupSmoothScroll: function () {
            t("main").on("click", "a.smooth-scroll", function (e) {
                e.preventDefault();
                var n = t(this.hash);
                n.length === 0 && (n = t("html")), t("html, body, main").animate({scrollTop: n.offset().top}, 500)
            }), t("main").on("click", "a.scroll-top", function (e) {
                e.preventDefault(), t("html, body, main").animate({scrollTop: 0}, 500)
            }), t("main").on("click", "a.nav-scroll", function (e) {
                var n = t(this.hash);
                n.length === 0 && (n = t("html")), i.isMobile ? (_this.hideMobilePoster(), t("html, body, main").animate({scrollTop: n.position().top}, 500)) : t("html, body").animate({scrollTop: n.find("h3.has-icon").offset().top - t(window).height() * .2}, 500), t(".loadedContent article").removeClass("blurred"), e.preventDefault()
            })
        },
        setupToolScroll: function () {
            if (i.isMobile)return;
            this.toolScrollTimeline = new r({paused: !0});
            var e = t(".rightNav"), s = t("body"), o = s[0].scrollHeight, u = t(".rightNav ul li:not(.close)").height(),
                a = t("body").scrollTop(), f = !1, l = 40, c = t(".rightNav ul li:not(.close)");
            this.rightNavHeight = (c.length - 1) * l + u * c.length, 0;
            var p = 150, d = i.windowHeight - p * 2;
            n.set(e, {
                height: this.rightNavHeight,
                top: i.windowHeight / 2 - this.rightNavHeight / 2,
                onComplete: function () {
                    n.to(e, .5, {autoAlpha: 1}), 0, this.featuredURL && t(".post-navigation-wrap").hide()
                }.bind(this)
            });
            var m = "", g = [], y = [], b = [], w = [], E = [], S = 0, x = t("article.work:has(section)").outerHeight();
            t("section.module.has-header").each(function (e) {
                var n = t(this), r = n.attr("id");
                n.data("id", r), b[e] = n, w[e] = n.data("title"), E[e] = t('.nav-scroll[href="#' + r + '"]'), y[e] = n.offset().top, g[e] = y[e] / x, e === 0 ? (S = g[e], g[e] = 0) : g[e] -= S
            });
            var T = 1 / g[g.length - 1];
            g = g.map(function (e) {
                return e * T
            }), c.each(function (e) {
                var r = t(this);
                n.set(r, {y: l * e})
            });
            var N = function () {
                t(".rightNav ul li:not(.close):not(first-child)").each(function (e) {
                    var r = t(this);
                    n.to(r, .8, {y: l * e, ease: Expo.easeInOut, delay: .1})
                }), t(".nav-scroll").removeClass("over"), n.to(e, .8, {
                    height: _this.rightNavHeight,
                    delay: .1,
                    top: i.windowHeight / 2 - _this.rightNavHeight / 2,
                    ease: Expo.easeInOut,
                    onComplete: function () {
                        f = !1
                    }
                })
            }, C = null, k = function () {
                C && clearTimeout(C), C = setTimeout(N, 2e3), _this.scrollingDistance = t(document).scrollTop();
                var r = i.windowHeight;
                d = r - p * 2 - (c.length - 1) * u;
                var s = .8;
                f = !0, c.each(function (e) {
                    var r = t(this);
                    n.to(r, s, {y: g[e] * d, ease: Expo.easeOut})
                }), n.set(t(".rightNav"), {height: "100%"}), n.to(e, s, {
                    top: p,
                    ease: Expo.easeOut,
                    onComplete: function () {
                        f = !1
                    }
                });
                var a = _this.scrollingDistance + 150, l = !1, h = null;
                for (var w = b.length - 1; w >= 0; w -= 1) {
                    var S = b[w], x = S.data("id"), T = E[w];
                    if (l) {
                        T.removeClass("over");
                        continue
                    }
                    if (_this.scrollingDistance + r >= o) {
                        T.hasClass("over") || (T.addClass("over"), h = T), l = !0;
                        continue
                    }
                    a >= y[w] ? (T.hasClass("over") || (T.addClass("over"), h = T), l = !0) : T.removeClass("over")
                }
                if (h) {
                    var k = h.data("title");
                    m != k && v.trackEvent("ScrollTools", _this.projectTitle.toLowerCase(), k)
                }
            };
            t(window).on("scroll", h.debounce(k, 20)), t(window).on("resize", function () {
                n.to(e, .5, {top: i.windowHeight / 2 - _this.rightNavHeight / 2, ease: Expo.easeInOut})
            })
        },
        tabletRotated: function (e) {
            0, e || this.resizePoster()
        },
        resizePoster: function () {
            this.posterSubContainer = t(".loadedContent.onTheWayIn section.cover.open #posterContainer"), this.posterContainer = t(".loadedContent.onTheWayIn .poster-image");
            if (i.isMobile) t(".loadedContent.onTheWayIn #posterContainer, .loadedContent.onTheWayIn #posterContainer img").css("width", "100%"), this.setHeight(t(".loadedContent.onTheWayIn .poster-image"), .65 * t(window).height(), "centered"), t(window).off("scroll", _this.setupCoverScrollUp); else {
                var e = t("body");
                e.hasClass("cover-closed") || (this.posterContainerWidth = e.width(), this.setHeight(t(".loadedContent.onTheWayIn .poster-image"), 80), this.posterContainerHeight = t(".loadedContent.onTheWayIn .poster-image").height(), this.posterContainerWidth / 1.76678445229682 <= this.posterContainerHeight ? (this.posterWidth = this.posterContainerHeight * 1.76678445229682, this.posterHeight = this.posterWidth / 1.76678445229682) : (this.posterHeight = this.posterContainerWidth / 1.76678445229682, this.posterWidth = this.posterHeight * 1.76678445229682), t(".loadedContent.onTheWayIn #posterContainer, .loadedContent.onTheWayIn #posterContainer img").height(this.posterHeight), t(".loadedContent.onTheWayIn #posterContainer").width(this.posterWidth), this.posterContainer.has("open").css({
                    marginRight: -100,
                    marginLeft: -100,
                    width: "auto",
                    display: "block"
                }), this.centerCoverTitle(t(".loadedContent.onTheWayIn")))
            }
        },
        hideMobilePoster: function () {
            if (i.isMobile)return;
            if (this.mobilePosterHidden)return;
            this.mobilePosterHidden = !0;
            var e = t("#posterContainer img").height();
            n.to(t(".poster-image"), .8, {
                height: 0,
                ease: Expo.easeIn,
                overwrite: !0
            }), n.to(t("#posterContainer img"), .8, {
                marginTop: -e * .5,
                ease: Expo.easeIn,
                overwrite: !0
            }), n.to(t("a.down-arrow"), .5, {autoAlpha: 0, overwrite: !0})
        },
        showMobilePoster: function () {
            if (i.isMobile)return;
            if (!this.mobilePosterHidden || t("main").scrollTop() > 0)return;
            this.mobilePosterHidden = !1;
            var e = t("#posterContainer img").height();
            n.to(t(".poster-image"), .8, {
                height: e,
                ease: Expo.easeIn,
                overwrite: !0
            }), n.to(t("#posterContainer img"), .8, {
                marginTop: 0,
                ease: Expo.easeIn,
                overwrite: !0
            }), n.to(t("a.down-arrow"), .5, {autoAlpha: 1, delay: .1, overwrite: !0})
        },
        toggleMainHeaderVisibility: function (e, r) {
            r = r || 0, n.to(t(".main-header"), r, {autoAlpha: e ? 1 : 0})
        },
        setupWorkIntro: function (e) {
            0;
            var r = t(".loadedContent");
            i.isMobile && e.css("top", t("main").scrollTop()), this.projectTitle = e.find("h1.big-header").text().replace(/^\s+|\s+$/g, ""), i.initResponsiveImages(), i.widthRespond(), this.resizePoster(), e.find("section.cover").addClass("open"), e.find(".post-nav").on("click touchstart", function (e) {
                var t = this.dataset.postTitle;
                v.trackEvent("Navigation", "WorkClick", t.toLowerCase())
            });
            if (!i.isMobile) {
                e.css("overflow", "visible"), this.setupPosterAnimation(), t("html").css("overflow-x", "hidden"), t("body").addClass("cover-open"), t("body").removeClass("cover-closed"), this.titleOffset = null, this.coverColour = e.find("section.cover").data("colour"), e.css("opacity", 0), n.set(t(".main-header"), {clearProps: "zIndex"}), n.set(t(".rightNav"), {
                    autoAlpha: 0,
                    position: "fixed"
                });
                var s = e.find("#fauxHeader");
                n.set(s.find("#header-inner"), {x: -t(window).width() - 100}), n.set(s.find("h4"), {color: _this.coverColour}), n.set(s.find(".nav-back-arrow i"), {color: _this.coverColour}), n.set([s.find(".hamburger .line"), s.find(".nav-vertical-line")], {backgroundColor: _this.coverColour == "#ffffff" ? "#f2f2f2" : _this.coverColour}), n.set([e.find(".big-header"), e.find(".entry-title h2")], {color: _this.coverColour}), n.set(e.find(".entry-title"), {color: _this.coverColour}), this.coverColour == "#dd3a20" && s.find(".blog-title a").addClass("black"), n.set([e.find(".content"), e.find("article.work")], {backgroundColor: "#fff"}), _this.setupFadeIn(), e.find(".down-arrow").off("click").on("click", function () {
                    this.arrowLocked = !0, n.set(t(".down-arrow span i.white"), {
                        autoAlpha: 0,
                        delay: .5,
                        display: "none"
                    }), n.set(t(".down-arrow span i.icon-caret-down, .down-arrow span i.icon-caret-up"), {y: 0}), setTimeout(function () {
                        this.arrowLocked = !1, t(this).removeClass("hover"), n.set(t(".down-arrow span i.white"), {
                            autoAlpha: 0,
                            delay: 0,
                            display: "none"
                        }), n.set(t(".down-arrow span i.icon-caret-down, .down-arrow span i.icon-caret-up"), {clearProps: "all"})
                    }.bind(this), 1200), _this.posterTimeline.progress() === 0 ? (_this.setForwardArrowAnimation(), _this.posterTimeline.play(), v.trackEvent("Page View", "WorkClick", _this.projectTitle.toLowerCase())) : _this.posterTimeline.progress() == 1 && (t("body").addClass("cover-open"), t("body").removeClass("cover-closed"), t("section.cover").toggleClass("open"), n.to(t("body"), 0, {scrollTo: 0}), t(window).off("mousewheel DOMMouseScroll", _this.mouseWheelHandlerDebounced).on("mousewheel DOMMouseScroll", _this.mouseWheelHandlerDebounced), n.killTweensOf(t(".rightNav")), n.set(t(".rightNav"), {
                            right: -63,
                            y: -100
                        }), n.to(t(".rightNav"), .5, {autoAlpha: 0}), _this.setReverseArrowAnimation(), _this.posterTimeline.reverse(0, !0))
                }), $windowWidth = t(window).width(), $postNavigationWidth = t(".post-navigation-wrap").width(), e.find(".post-nav").one("mouseover", function (e) {
                    var t = this.dataset.postTitle;
                    v.trackEvent("Interaction", "PrevNextWorkHover", t.toLowerCase())
                }), e.find(".rightNav").on("click", "a.nav-scroll", function (e) {
                    v.trackEvent("ScrollTools", this.dataset.title, _this.projectTitle.toLowerCase())
                }), e.find(".related-posts").on("click", "a.related-post-link", function (e) {
                    var t = this.dataset.title;
                    v.trackEvent("Navigation", "RelatedWorkClick", t.toLowerCase() + " from " + _this.projectTitle.toLowerCase())
                }), e.find(".related-posts a.related-post-link").one("mouseover", function (e) {
                    var t = this.dataset.title;
                    v.trackEvent("Interaction", "RelatedWorkHover", t.toLowerCase())
                }), e.find(".awards-btn").on("click", function (e) {
                    v.trackEvent("Navigation", "SeeAllAwards", _this.projectTitle.toLowerCase())
                }), e.find(".site-link").on("click", function (e) {
                    v.trackEvent("ExternalLink", "ViewSite", _this.projectTitle.toLowerCase())
                }), this.setNavPosition($windowWidth, $postNavigationWidth), t(window).off("mousewheel DOMMouseScroll", _this.mouseWheelHandlerDebounced).on("mousewheel DOMMouseScroll", _this.mouseWheelHandlerDebounced), t(window).on("keydown", function (e) {
                    if (e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 32 || e.keyCode == 33 || e.keyCode == 34 || e.keyCode == 35)return e.preventDefault(), !1
                })
            } else {
                n.set(e, {x: i.width}), _this.gallery = new m(e, _this), _this.mobilePosterHidden = !1, e.find("a.down-arrow").click(_this.hideMobilePoster.bind(_this)), t("body").addClass("cover-closed"), t("body").removeClass("cover-open"), t("#posterContainer video").remove();
                var o = e.find(".video-player").width() / 1.76678445229682;
                e.find(".video-player video").height(o), e.find("div.callout").css("opacity", 1)
            }
            e.find(".video-player").length > 0 && new c(t(".video-player").last(), this.projectTitle.toLowerCase());
            var u = e.find(".poster-image img:first"), a = u[0];
            a.complete ? _this.posterImageLoaded() : u.one("load", _this.posterImageLoaded)
        },
        posterImageLoaded: function () {
            i.loadingFinishedSignal.dispatch(), _this.animateInCover()
        },
        setNavPosition: function (e, r) {
            this.postNavShiftValue = Math.ceil((e - r) * .5), 0, i.isMobile || (e <= 1280 && t("body").hasClass("cover-open") ? (t(".post-navigation-wrap .prev-post").css("left", -this.postNavShiftValue), t(".post-navigation-wrap .next-post").css("right", -this.postNavShiftValue)) : (n.set(t(".post-navigation-wrap .prev-post"), {clearProps: "left"}), n.set(t(".post-navigation-wrap .next-post"), {clearProps: "right"})))
        },
        animateInCover: function () {
            var e = t(".loadedContent.onTheWayIn:not(.onTheWayOut)");
            if (!i.isMobile) {
                var r = e.find(".big-header").textWidth();
                n.set(e.find(".keyline-work"), {width: r, backgroundColor: _this.coverColour})
            }
            n.to(e, .8, {
                x: 0,
                delay: .5,
                ease: Expo.easeInOut,
                onComplete: _this.coverEndCallback.bind(_this)
            }), n.to(e, .2, {
                opacity: 1,
                delay: .6,
                ease: Expo.easeIn
            }), n.to(e.find("#fauxHeader #header-inner"), .5, {x: 0, delay: 0, ease: Expo.easeInOut, clearProps: "x"})
        },
        loadWorkContent: function (e) {
            0, i.loadingStartedSignal.dispatch(), _this.isLoadingWorkPage = !0;
            var r = "/wp-content/themes/jam3/custom-ajax.php";
            t.ajax({
                type: "GET",
                url: r,
                cache: !1,
                async: !0,
                dataType: "html",
                data: {action: "load-work", postSlug: e},
                success: function (e) {
                    var r = i.isMobile ? 0 : -100;
                    v.setPageID("work_page"), _this.isLoadingWorkPage = !1;
                    var s = t(".loadedContent");
                    i.isMobile && setTimeout(function () {
                        t(".content.grid .image-wrapper > a.opened").each(function (e, n) {
                            _this.closeMobieGridItem(t(n))
                        })
                    }, 1e3);
                    if (s.find("article").length) {
                        var o = t(".loadedContent.onTheWayIn");
                        o.addClass("onTheWayOut"), o.removeClass("onTheWayIn"), o.after('<div class="loadedContent onTheWayIn"></div>');
                        var u = t(".loadedContent.onTheWayIn:not(.onTheWayOut)");
                        n.set(u, {
                            x: i.width,
                            y: r
                        }), u.html(e), n.set(u, {zIndex: 1030}), t("body").addClass("cover-open"), t("body").removeClass("cover-closed")
                    } else {
                        var u = t(".loadedContent.onTheWayIn");
                        n.set(u, {x: i.width, y: r}), s.html(e)
                    }
                    u.find(".poster-image img, .poster-image video").length > 0 ? _this.setupWorkIntro(u) : (t(".loadedContent.onTheWayIn").empty(), window.location.replace(window.location.pathname)), this.featuredURL && t(".post-navigation-wrap").hide(), t(".down-arrow").on("mouseenter", function () {
                        0, !this.arrowLocked && t(this).addClass("hover")
                    }), t(".down-arrow").on("mouseleave", function () {
                        0, !this.arrowLocked && t(this).removeClass("hover")
                    })
                }.bind(this)
            })
        },
        setupCoverScrollUp: function () {
            if (i.isMobile)return;
            var e = document.body.scrollTop;
            e < -5 && i.coverAnimating == 0 && this.posterTimeline.reverse(0, !0)
        },
        fixHeader: function () {
            var e = {"-webkit-backface-visibility": "hidden", "-webkit-transform": "translateZ(0)"};
            t("#fauxHeader").css(e);
            var n = t(".loadedContent.onTheWayIn").find(".big-header").text().replace(/^\s+|\s+$/g, "");
            t(".main-header .work-title .inner-holder").html(n), t("header.main-header").removeClass("cloak"), i.animateHeaderTitle(), t(".nav-button-text").addClass("clickable").off("click").on("click", function (e) {
                e.preventDefault(), window.location.hash = ""
            })
        },
        coverEndCallback: function () {
            _this.fixHeader(), _this.toggleMainHeaderVisibility(!1, 0), n.set(t(".grid-container, #category-nav"), {autoAlpha: 0}), t(".loadedContent.onTheWayOut").remove(), t(".grid-container ul.grid li.mix").css("visibility", "hidden"), t("main > article:first").remove(), t(".module.related-posts .overlay header").each(function () {
                var e = t(this);
                e.height(e.height()), e.css({bottom: 0})
            });
            var e = t(".loadedContent.onTheWayIn");
            n.to(e, 0, {
                x: 0, clearProps: "zIndex", delay: .1, onComplete: function () {
                    _this.toggleMainHeaderVisibility(!0, 0)
                }
            }), 0, i.isMobile ? (e.css("top", 0), n.set(e, {clearProps: "transform"}), t("main").scrollTop(0), i.isIOS8 && (t(".grid-container").hide(), 0)) : (this.setupPosterAnimation(), this.featuredURL && this.onProjectShown.dispatch())
        },
        pauseVideo: function () {
            var e = t("#posterContainer video");
            e.length > 0 && e[0].pause()
        },
        playVideo: function () {
            var e = t("#posterContainer video");
            e.length > 0 && e[0].play()
        },
        setupPosterAnimation: function () {
        },
        setForwardArrowAnimation: function () {
            n.to(t(".prev-post"), .9, {left: 0, ease: Expo.easeInOut, delay: .4}), n.to(t(".next-post"), .9, {
                right: 0,
                ease: Expo.easeInOut,
                delay: .4
            })
        },
        setReverseArrowAnimation: function () {
            n.set(t(".prev-post"), {left: 0}), n.set(t(".next-post"), {right: 0});
            var e = Math.min(Math.round(t(window).width() * .5 - t(".loadedContent article.work").width() * .5), 100),
                r = window.innerWidth < 1120 ? 0 : -e;
            n.to(t(".prev-post"), .6, {
                left: r,
                ease: Expo.easeInOut,
                delay: 1.33
            }), n.to(t(".next-post"), .6, {right: r, ease: Expo.easeInOut, delay: 1.33})
        },
        mouseWheelHandler: function (e) {
            if (i.isMobile)return;
            e.preventDefault();
            var t = this.posterTimeline.paused();
            return t && (this.setForwardArrowAnimation(), this.posterTimeline.play(), v.trackEvent("Page View", "WorkScroll", _this.projectTitle.toLowerCase())), !1
        }
    });
    return b
}), define("Work/Router", ["Class", "jquery", "pace", "Global", "Work/Grid", "Work/Project", "utils/GA", "TweenLite", "Signal"], function (e, t, n, r, i, s, o, u, a) {
    var f = null, i, s, l = new e({
        newHash: null, currentHash: null, path: null, startMobile: !1, initialize: function () {
            var e = location.search.split("?")[1], a = e && e.indexOf("featured-for") !== -1 ? e : !1;
            this.featuredURL = a, i = new i(a), s = new s(a), a && (s.onProjectShown.add(this.toggleFeaturedTitle.bind(this, !1)), this.toggleFeaturedTitle(!0)), o.setPageID("work"), f = this, this.currentHash = window.location.hash, this.path = window.location.pathname.split("/"), this.changePage(), t(window).on("hashchange", this.changePage.bind(this)), this.currentHash.length > 1 ? r.newHash = this.currentHash.replace("#", "") : r.secondLevelLocation !== "" && r.secondLevelLocation !== undefined;
            var l = function (e) {
                e.stopPropagation(), e.preventDefault()
            };
            r.isMobile && (this.startMobile = !0, $window = t(window), $window.on("resize", function (e) {
                $window.width() >= 1020 && this.startMobile === !0 && window.location.reload()
            }.bind(this))), n.start({document: !1}), n.on("start", function () {
                r.isLoading = !0
            }), n.on("done", function () {
                r.isLoading = !1
            }), r.loadingFinishedSignal.add(function () {
                t(window).off("mousewheel DOMMouseScroll", l), u.to(t("#menu-content-overlay"), .4, {
                    autoAlpha: 0,
                    ease: Linear.easeNone
                })
            }), r.loadingStartedSignal.add(function () {
                u.to(t("#menu-content-overlay"), .3, {
                    autoAlpha: 1,
                    ease: Linear.easeNone
                }), t(window).off("mousewheel DOMMouseScroll"), t(window).on("mousewheel DOMMouseScroll", l)
            })
        }, toggleFeaturedTitle: function (e, n) {
            if (!this.featuredURL)return;
            u.delayedCall(n || 0, function () {
                var n = e ? "WORK / " + this.featuredURL.replace(/-/g, " ") : "WORK",
                    r = t(".nav-button-text span:contains('WORK')");
                r.text(n)
            }.bind(this))
        }, changePage: function (e) {

        }
    });
    return l
}), define("Post", ["Class", "Global", "jquery", "ui/VideoControls", "utils/GA"], function (e, t, n, r, i) {
    var s = new e({
        initialize: function () {

        }
    });
    return s
}), function e$$0(e, t, n) {
    function r(s, o) {
        if (!t[s]) {
            if (!e[s]) {
                var u = "function" == typeof require && require;
                if (!o && u)return u(s, !0);
                if (i)return i(s, !0);
                throw Error("Cannot find module '" + s + "'")
            }
            u = t[s] = {exports: {}}, e[s][0].call(u.exports, function (t) {
                var n = e[s][1][t];
                return r(n ? n : t)
            }, u, u.exports, e$$0, e, t, n)
        }
        return t[s].exports
    }

    for (var i = "function" == typeof require && require, s = 0; s < n.length; s++)r(n[s]);
    return r
}({
    1: [function (e, t, n) {
        function r(e, t) {
            function n(e, t) {
                return function () {
                    return e.apply(t, arguments)
                }
            }

            var s;
            t = t || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.lastTouchIdentifier = this.touchStartY = this.touchStartX = 0, this.touchBoundary = t.touchBoundary || 10, this.layer = e, this.tapDelay = t.tapDelay || 200;
            if (!r.notNeeded(e)) {
                for (var o = "onMouse onClick onTouchStart onTouchMove onTouchEnd onTouchCancel".split(" "), u = 0,
                         a = o.length; u < a; u++)this[o[u]] = n(this[o[u]], this);
                i && (e.addEventListener("mouseover", this.onMouse, !0), e.addEventListener("mousedown", this.onMouse, !0), e.addEventListener("mouseup", this.onMouse, !0)), e.addEventListener("click", this.onClick, !0), e.addEventListener("touchstart", this.onTouchStart, !1), e.addEventListener("touchmove", this.onTouchMove, !1), e.addEventListener("touchend", this.onTouchEnd, !1), e.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (e.removeEventListener = function (t, n, r) {
                    var i = Node.prototype.removeEventListener;
                    "click" === t ? i.call(e, t, n.hijacked || n, r) : i.call(e, t, n, r)
                }, e.addEventListener = function (t, n, r) {
                    var i = Node.prototype.addEventListener;
                    "click" === t ? i.call(e, t, n.hijacked || (n.hijacked = function (e) {
                            e.propagationStopped || n(e)
                        }), r) : i.call(e, t, n, r)
                }), "function" == typeof e.onclick && (s = e.onclick, e.addEventListener("click", function (e) {
                    s(e)
                }, !1), e.onclick = null)
            }
        }

        var i = 0 < navigator.userAgent.indexOf("Android"), s = /iP(ad|hone|od)/.test(navigator.userAgent),
            o = s && /OS 4_\d(_\d)?/.test(navigator.userAgent),
            u = s && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent);
        r.prototype.needsClick = function (e) {
            switch (e.nodeName.toLowerCase()) {
                case"button":
                case"select":
                case"textarea":
                    if (e.disabled)return !0;
                    break;
                case"input":
                    if (s && "file" === e.type || e.disabled)return !0;
                    break;
                case"label":
                case"video":
                    return !0
            }
            return /\bneedsclick\b/.test(e.className)
        }, r.prototype.needsFocus = function (e) {
            switch (e.nodeName.toLowerCase()) {
                case"textarea":
                    return !0;
                case"select":
                    return !i;
                case"input":
                    switch (e.type) {
                        case"button":
                        case"checkbox":
                        case"file":
                        case"image":
                        case"radio":
                        case"submit":
                            return !1
                    }
                    return !e.disabled && !e.readOnly;
                default:
                    return /\bneedsfocus\b/.test(e.className)
            }
        }, r.prototype.sendClick = function (e, t) {
            var n, r;
            document.activeElement && document.activeElement !== e && document.activeElement.blur(), r = t.changedTouches[0], n = document.createEvent("MouseEvents"), n.initMouseEvent(this.determineEventType(e), !0, !0, window, 1, r.screenX, r.screenY, r.clientX, r.clientY, !1, !1, !1, !1, 0, null), n.forwardedTouchEvent = !0, e.dispatchEvent(n)
        }, r.prototype.determineEventType = function (e) {
            return i && "select" === e.tagName.toLowerCase() ? "mousedown" : "click"
        }, r.prototype.focus = function (e) {
            var t;
            s && e.setSelectionRange && 0 !== e.type.indexOf("date") && "time" !== e.type ? (t = e.value.length, e.setSelectionRange(t, t)) : e.focus()
        }, r.prototype.updateScrollParent = function (e) {
            var t, n;
            t = e.fastClickScrollParent;
            if (!t || !t.contains(e)) {
                n = e;
                do {
                    if (n.scrollHeight > n.offsetHeight) {
                        t = n, e.fastClickScrollParent = n;
                        break
                    }
                    n = n.parentElement
                } while (n)
            }
            t && (t.fastClickLastScrollTop = t.scrollTop)
        }, r.prototype.getTargetElementFromEventTarget = function (e) {
            return e.nodeType === Node.TEXT_NODE ? e.parentNode : e
        }, r.prototype.onTouchStart = function (e) {
            var t, n, r;
            if (1 < e.targetTouches.length)return !0;
            t = this.getTargetElementFromEventTarget(e.target), n = e.targetTouches[0];
            if (s) {
                r = window.getSelection();
                if (r.rangeCount && !r.isCollapsed)return !0;
                if (!o) {
                    if (n.identifier === this.lastTouchIdentifier)return e.preventDefault(), !1;
                    this.lastTouchIdentifier = n.identifier, this.updateScrollParent(t)
                }
            }
            return this.trackingClick = !0, this.trackingClickStart = e.timeStamp, this.targetElement = t, this.touchStartX = n.pageX, this.touchStartY = n.pageY, e.timeStamp - this.lastClickTime < this.tapDelay && e.preventDefault(), !0
        }, r.prototype.touchHasMoved = function (e) {
            e = e.changedTouches[0];
            var t = this.touchBoundary;
            return Math.abs(e.pageX - this.touchStartX) > t || Math.abs(e.pageY - this.touchStartY) > t ? !0 : !1
        }, r.prototype.onTouchMove = function (e) {
            if (!this.trackingClick)return !0;
            if (this.targetElement !== this.getTargetElementFromEventTarget(e.target) || this.touchHasMoved(e)) this.trackingClick = !1, this.targetElement = null;
            return !0
        }, r.prototype.findControl = function (e) {
            return void 0 !== e.control ? e.control : e.htmlFor ? document.getElementById(e.htmlFor) : e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
        }, r.prototype.onTouchEnd = function (e) {
            var t, n, r = this.targetElement;
            if (!this.trackingClick)return !0;
            if (e.timeStamp - this.lastClickTime < this.tapDelay)return this.cancelNextClick = !0;
            this.cancelNextClick = !1, this.lastClickTime = e.timeStamp, t = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, u && (n = e.changedTouches[0], r = document.elementFromPoint(n.pageX - window.pageXOffset, n.pageY - window.pageYOffset) || r, r.fastClickScrollParent = this.targetElement.fastClickScrollParent), n = r.tagName.toLowerCase();
            if ("label" === n) {
                if (t = this.findControl(r)) {
                    this.focus(r);
                    if (i)return !1;
                    r = t
                }
            } else if (this.needsFocus(r))return 100 < e.timeStamp - t || s && window.top !== window && "input" === n ? (this.targetElement = null, !1) : (this.focus(r), this.sendClick(r, e), s && "select" === n || (this.targetElement = null, e.preventDefault()), !1);
            return s && !o && (t = r.fastClickScrollParent) && t.fastClickLastScrollTop !== t.scrollTop ? !0 : (this.needsClick(r) || (e.preventDefault(), this.sendClick(r, e)), !1)
        }, r.prototype.onTouchCancel = function () {
            this.trackingClick = !1, this.targetElement = null
        }, r.prototype.onMouse = function (e) {
            return this.targetElement && !e.forwardedTouchEvent && e.cancelable ? !this.needsClick(this.targetElement) || this.cancelNextClick ? (e.stopImmediatePropagation ? e.stopImmediatePropagation() : e.propagationStopped = !0, e.stopPropagation(), e.preventDefault(), !1) : !0 : !0
        }, r.prototype.onClick = function (e) {
            return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === e.target.type && 0 === e.detail ? !0 : (e = this.onMouse(e), e || (this.targetElement = null), e)
        }, r.prototype.destroy = function () {
            var e = this.layer;
            i && (e.removeEventListener("mouseover", this.onMouse, !0), e.removeEventListener("mousedown", this.onMouse, !0), e.removeEventListener("mouseup", this.onMouse, !0)), e.removeEventListener("click", this.onClick, !0), e.removeEventListener("touchstart", this.onTouchStart, !1), e.removeEventListener("touchmove", this.onTouchMove, !1), e.removeEventListener("touchend", this.onTouchEnd, !1), e.removeEventListener("touchcancel", this.onTouchCancel, !1)
        }, r.notNeeded = function (e) {
            var t, n;
            if ("undefined" == typeof window.ontouchstart)return !0;
            if (n = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
                if (!i)return !0;
                if ((t = document.querySelector("meta[name=viewport]")) && (-1 !== t.content.indexOf("user-scalable=no") || 31 < n && window.innerWidth <= window.screen.width))return !0
            }
            return "none" === e.style.msTouchAction ? !0 : !1
        }, r.attach = function (e, t) {
            return new r(e, t)
        }, "undefined" != typeof define && define.amd ? define("lib/fastclick.min", [], function () {
            return r
        }) : "undefined" != typeof t && t.exports ? (t.exports = r.attach, t.exports.FastClick = r) : window.FastClick = r
    }, {}], 2: [function (e, t, n) {
        e("./bower_components/fastclick/lib/fastclick.js")
    }, {"./bower_components/fastclick/lib/fastclick.js": 1}]
}, {}, [2]), require.config({
    baseUrl: "/wp-content/themes/jam3/assets/js/",
    paths: {
        Class: "vendor/jsOOP/Class",
        baseClass: "vendor/jsOOP/baseClass",
        jquery: "bower_components/jquery/dist/jquery.min",
        "jquery.fitVids": "lib/jquery.fitvids",
        "jquery.hammer": "lib/jquery.hammer.v2",
        hammerjs: "lib/hammer.min",
        "jquery.hoverdir": "lib/jquery.hoverdir",
        "jquery.mousewheel": "lib/jquery.mousewheel",
        "jquery.mCustomScrollbar": "lib/jquery.mCustomScrollbar.concat.min",
        libjs: "lib/LibJS",
        Modernizr: "lib/modernizr.custom.min.2.6.2",
        pace: "bower_components/pace/pace.min",
        swipe: "lib/swipe.new",
        Tablesort: "lib/tablesort",
        TimelineLite: "bower_components/greensock/src/minified/TimelineLite.min",
        TweenLite: "bower_components/greensock/src/minified/TweenLite.min",
        AttrPlugin: "bower_components/greensock/src/minified/plugins/AttrPlugin.min",
        CSSPlugin: "bower_components/greensock/src/minified/plugins/CSSPlugin.min",
        ScrollToPlugin: "bower_components/greensock/src/minified/plugins/ScrollToPlugin.min",
        Ease: "bower_components/greensock/src/minified/easing/EasePack.min",
        ColorPropsPlugin: "vendor/greensock-js/src/uncompressed/plugins/ColorPropsPlugin",
        Particle: "Particle",
        particle_release: "particle_release",
        underscore: "lib/lodash.min",
        text: "vendor/require/text",
        detector: "vendor/Detector",
        stats: "vendor/stats.min",
        three: "vendor/three.r60",
        Signal: "vendor/js-signals/signals.min",
        KeyboardState: "vendor/THREEx.KeyboardState",
        RendererStats: "vendor/THREEx.RendererStats",
        GUI: "vendor/datCustom.gui",
        goog: "/_ah/channel/jsapi?",
        TextManager: "vendor/textfx"
    },
    shim: {
        TweenLite: {deps: ["AttrPlugin", "CSSPlugin", "Ease", "ScrollToPlugin"], exports: "TweenLite"},
        TimelineLite: {deps: ["TweenLite"], exports: "TimelineLite"},
        Modernizr: {exports: "Modernizr"},
        swipe: {exports: "Swipe"},
        "jquery.hammer": ["jquery"],
        hammerjs: {exports: "Hammer"},
        "jquery.hoverdir": {deps: ["jquery"], exports: "HoverDir"},
        "jquery.fitVids": {deps: ["jquery"], exports: "$"},
        "jquery.mCustomScrollbar": {deps: ["jquery"], exports: "mCustomScrollbar"},
        "jquery.mousewheel": ["jquery", "jquery.mCustomScrollbar"],
        pace: {exports: "Pace"},
        detector: {exports: "Detector"},
        stats: {exports: "Stats"},
        "fonts/helvetiker_bold.typeface": {deps: ["three"]},
        three: {exports: "THREE"},
        OBJLoader: {exports: "OBJLoader"},
        ColorPropsPlugin: {deps: ["TweenLite"], exports: "ColorPropsPlugin"},
        GUI: {exports: "datCustom"},
        goog: {exports: "goog"},
        TextManager: {exports: "TextManager"}
    },
    waitSeconds: 10
}), require(["jquery", "underscore", "TweenLite", "TimelineLite", "Global", "Awards", "Map", "Mobile", "Nav", "News", "About", "Process", "Careers", "CareersPost", "Reel", "Work/Router", "Work/Project", "Work/Grid", "Post", "ui/BorderButtons", "ui/FadeIn", "jquery.fitVids", "jquery.hammer", "jquery.hoverdir", "jquery.mousewheel", "libjs/utils/Util", "ui/RotateHandler", "lib/fastclick.min", "utils/GA"], function (e, t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S, x, T, N, C, k, L) {
    e(function () {
    })
}), define("main", function () {
});