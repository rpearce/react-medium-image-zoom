var imageZoom = (function () {
    'use strict';

    var addEventListener = function (type, cb, el, useCapture) {
        if (useCapture === void 0) { useCapture = false; }
        el.addEventListener(type, cb, useCapture);
    };

    var cloneElement = function (deep, el) {
        if (deep === void 0) { deep = true; }
        return el.cloneNode(deep);
    };

    var createElement = function (type) {
        return document.createElement(type);
    };

    var focus = function (opts, el) {
        if (opts === void 0) { opts = { preventScroll: false }; }
        el === null || el === void 0 ? void 0 : el.focus(opts);
    };

    var removeAttribute = function (attr, el) {
        el.removeAttribute(attr);
    };

    var removeEventListener = function (type, handler, el, useCapture) {
        if (useCapture === void 0) { useCapture = false; }
        el.removeEventListener(type, handler, useCapture);
    };

    var setAttribute = function (attr, value, el) {
        return el.setAttribute(attr, value);
    };

    var setStyleProperty = function (priority, propertyName, value, el) {
        el.style.setProperty(propertyName, value, priority);
    };

    //import 'focus-options-polyfill'
    var State;
    (function (State) {
        State["UNZOOMED"] = "UNZOOMED";
        State["ANIMATING"] = "ANIMATING";
        State["ZOOMED"] = "ZOOMED";
    })(State || (State = {}));
    var ANIMATING = State.ANIMATING, UNZOOMED = State.UNZOOMED, ZOOMED = State.ZOOMED;
    var imageZoom = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.auto, auto = _c === void 0 ? true : _c, _d = _b.closeText, closeText = _d === void 0 ? 'Unzoom image' : _d, _e = _b.modalText, modalText = _e === void 0 ? 'Zoomed item' : _e, _f = _b.onChange, onChange = _f === void 0 ? undefined : _f, _g = _b.openText, openText = _g === void 0 ? 'Zoom image' : _g, _h = _b.overlayBgColor, overlayBgColor = _h === void 0 ? '#fff' : _h, _j = _b.overlayOpacity, overlayOpacity = _j === void 0 ? 1 : _j, _k = _b.transitionDuration, transitionDuration = _k === void 0 ? 300 : _k, _l = _b.margin, margin = _l === void 0 ? 0 : _l, _m = _b.zIndex, zIndex = _m === void 0 ? 2147483647 : _m;
        var trackedEls = [];
        var state = UNZOOMED;
        // setup overlay
        var overlayEl = createElement(DIV);
        setAttribute(STYLE, stylePosFixed +
            styleAllDirsZero +
            (BG_COLOR + ":" + overlayBgColor + ";") +
            (OPACITY + ":0;") +
            ("transition-property:" + OPACITY + ";") +
            (TRANSITION_DURATION + ":" + transitionDuration) +
            ("transition-timing-function:" + styleTransitionTimingFn) +
            styleWillChangeOpacity, overlayEl);
        var init = function () {
            // handle window resizing
            addEventListener(RESIZE, handleResize, window);
        };
        var attach = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!args.length)
                return;
            var setup = function (el) {
                if (el instanceof HTMLImageElement || el instanceof SVGElement) {
                    setStyleProp(CURSOR, 'pointer', el);
                    setStyleProp(CURSOR, 'zoom-in', el);
                    if (auto) {
                        addEventListener('click', handleImgClick, el);
                        trackedEls.push(el);
                    }
                }
            };
            for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
                var arg = args_1[_a];
                if (arg instanceof NodeList || arg instanceof Array) {
                    for (var _b = 0, _c = arg; _b < _c.length; _b++) {
                        var item = _c[_b];
                        setup(item);
                    }
                }
                else {
                    setup(arg);
                }
            }
        };
        var detach = function (targetEl, skipTracking) {
            if (skipTracking === void 0) { skipTracking = false; }
            if (!targetEl)
                return;
            setStyleProp(CURSOR, '', targetEl);
            if (!skipTracking) {
                trackedEls = trackedEls.filter(function (x) { return x !== targetEl; });
            }
            if (auto) {
                removeEventListener('click', handleImgClick, targetEl);
            }
        };
        // update the instance's options
        var update = function (opts) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            if (opts === void 0) { opts = {}; }
            auto = (_a = opts.auto) !== null && _a !== void 0 ? _a : auto;
            closeText = (_b = opts.closeText) !== null && _b !== void 0 ? _b : closeText;
            margin = (_c = opts.margin) !== null && _c !== void 0 ? _c : margin;
            modalText = (_d = opts.modalText) !== null && _d !== void 0 ? _d : modalText;
            onChange = (_e = opts.onChange) !== null && _e !== void 0 ? _e : onChange;
            openText = (_f = opts.openText) !== null && _f !== void 0 ? _f : openText;
            overlayBgColor = (_g = opts.overlayBgColor) !== null && _g !== void 0 ? _g : overlayBgColor;
            overlayOpacity = (_h = opts.overlayOpacity) !== null && _h !== void 0 ? _h : overlayOpacity;
            transitionDuration = (_j = opts.transitionDuration) !== null && _j !== void 0 ? _j : transitionDuration;
            zIndex = (_k = opts.zIndex) !== null && _k !== void 0 ? _k : zIndex;
            if (isNotNil(opts.overlayBgColor)) {
                setStyleProp(BG_COLOR, overlayBgColor, overlayEl);
            }
            if (isNotNil(opts.overlayOpacity)) {
                setStyleProp(OPACITY, "" + overlayOpacity, overlayEl);
            }
            if (isNotNil(opts.transitionDuration)) {
                setStyleProp(TRANSITION_DURATION, "" + transitionDuration, overlayEl);
            }
        };
        var teardown = function () {
            trackedEls.forEach(function (x) {
                if (x) {
                    detach(x, true);
                }
            });
            trackedEls = [];
            removeEventListener(RESIZE, handleResize, window);
        };
        var unzoom = function () {
            console.log('unzoom');
        };
        var zoom = function (targetEl) {
            if (!targetEl)
                return;
            var img = cloneElement(true, targetEl);
            removeAttribute(ID, img);
            removeAttribute(CLASS, img);
            removeAttribute(CLASS, img);
            console.log(img);
        };
        var handleImgClick = function (e) {
            zoom(e.currentTarget);
        };
        var handleResize = function () {
            if (state === ZOOMED) {
                unzoom();
            }
        };
        init();
        return {
            attach: attach,
            detach: detach,
            teardown: teardown,
            unzoom: unzoom,
            update: update,
            zoom: zoom,
        };
    };
    // HELPERS
    var focusPreventScroll = focus.bind(null, { preventScroll: true });
    var isNotNil = function (x) { return x != null; };
    var setStyleProp = setStyleProperty.bind(null, undefined);
    //
    // STRINGS
    //
    //const ABSOLUTE = 'absolute'
    //const ARIA_HIDDEN = 'aria-hidden'
    //const ARIA_LABEL = 'aria-label'
    //const ARIA_MODAL = 'aria-modal'
    var BG_COLOR = 'background-color';
    //const BLOCK = 'block'
    //const BUTTON = 'button'
    //const CLICK = 'click'
    var CLASS = 'class';
    var CURSOR = 'cursor';
    var DIV = 'div';
    var ID = 'id';
    var OPACITY = 'opacity';
    //const POSITION = 'position'
    var RESIZE = 'resize';
    //const ROLE = 'role'
    //const SCROLL = 'scroll'
    var STYLE = 'style';
    //const TABINDEX = 'tabindex'
    //const TOP = 'top'
    //const TRANSFORM = 'transform'
    //const TRANSITION = 'transition'
    var TRANSITION_DURATION = 'transition-duration';
    //
    // STYLING
    //
    var styleAllDirsZero = 'top:0;right:0;bottom:0;left:0;';
    //const styleCursorZoomIn = styleCursorPointer + `cursor:zoom-in;`
    //const styleCursorZoomOut = styleCursorPointer + `cursor:zoom-out;`
    //const styleDisplayBlock = 'display:block;'
    //const styleFastTap = 'touch-action:manipulation;'
    //const styleHeight100pct = 'height:100%;'
    //const styleMaxHeight100pct = 'max-height:100%;'
    //const styleMaxWidth100pct = `max-width:100%;`
    //const stylePosAbsolute = 'position:absolute;'
    var stylePosFixed = 'position:fixed;';
    var styleTransitionTimingFn = 'ease';
    //const styleVisibilityHidden = 'visibility:hidden;'
    //const styleWidth100pct = 'width:100%;'
    var styleWillChangeOpacity = 'will-change:opacity;';

    return imageZoom;

}());
