var ImageZoom = (function () {
  'use strict';

  // focus - focusOptions - preventScroll polyfill
  (function() {
    if (
      typeof window === "undefined" ||
      typeof document === "undefined" ||
      typeof HTMLElement === "undefined"
    ) {
      return;
    }

    var supportsPreventScrollOption = false;
    try {
      var focusElem = document.createElement("div");
      focusElem.addEventListener(
        "focus",
        function(event) {
          event.preventDefault();
          event.stopPropagation();
        },
        true
      );
      focusElem.focus(
        Object.defineProperty({}, "preventScroll", {
          get: function() {
            supportsPreventScrollOption = true;
          }
        })
      );
    } catch (e) {}

    if (
      HTMLElement.prototype.nativeFocus === undefined &&
      !supportsPreventScrollOption
    ) {
      HTMLElement.prototype.nativeFocus = HTMLElement.prototype.focus;

      var calcScrollableElements = function(element) {
        var parent = element.parentNode;
        var scrollableElements = [];
        var rootScrollingElement =
          document.scrollingElement || document.documentElement;

        while (parent && parent !== rootScrollingElement) {
          if (
            parent.offsetHeight < parent.scrollHeight ||
            parent.offsetWidth < parent.scrollWidth
          ) {
            scrollableElements.push([
              parent,
              parent.scrollTop,
              parent.scrollLeft
            ]);
          }
          parent = parent.parentNode;
        }
        parent = rootScrollingElement;
        scrollableElements.push([parent, parent.scrollTop, parent.scrollLeft]);

        return scrollableElements;
      };

      var restoreScrollPosition = function(scrollableElements) {
        for (var i = 0; i < scrollableElements.length; i++) {
          scrollableElements[i][0].scrollTop = scrollableElements[i][1];
          scrollableElements[i][0].scrollLeft = scrollableElements[i][2];
        }
        scrollableElements = [];
      };

      var patchedFocus = function(args) {
        if (args && args.preventScroll) {
          var evScrollableElements = calcScrollableElements(this);
          this.nativeFocus();
          if (typeof setTimeout === 'function') {
            setTimeout(function () {
              restoreScrollPosition(evScrollableElements);
            }, 0);
          } else {
            restoreScrollPosition(evScrollableElements);          
          }
        }
        else {
          this.nativeFocus();
        }
      };

      HTMLElement.prototype.focus = patchedFocus;
    }
  })();

  var State;
  (function (State) {
      State["LOADED"] = "LOADED";
      State["UNLOADED"] = "UNLOADED";
      State["UNLOADING"] = "UNLOADING";
  })(State || (State = {}));
  var ARIA_HIDDEN = 'aria-hidden';
  var ARIA_LABEL = 'aria-label';
  var ARIA_MODAL = 'aria-modal';
  var BLOCK = 'block';
  var BUTTON = 'button';
  var CLASS = 'class';
  var CLICK = 'click';
  var DATA_RMIZ_OVERLAY = 'data-rmiz-overlay';
  var DATA_RMIZ_WRAP = 'data-rmiz-wrap';
  var DATA_RMIZ_ZOOMED = 'data-rmiz-zoomed';
  var DIALOG = 'dialog';
  var DISPLAY = 'display';
  var DIV = 'div';
  var FOCUS = 'focus';
  var HIDDEN = 'hidden';
  var HUNDRED_PCT = '100%';
  var ID = 'id';
  var KEYDOWN = 'keydown';
  var LOAD = 'load';
  var MARGIN = 'margin';
  var MAX_HEIGHT = 'maxHeight';
  var MAX_WIDTH = 'maxWidth';
  var MIN_WIDTH = 'minWidth';
  var NONE = 'none';
  var POSITION = 'position';
  var RESIZE = 'resize';
  var ROLE = 'role';
  var SCROLL = 'scroll';
  var STYLE = 'style';
  var TABINDEX = 'tabindex';
  var TRANSFORM = 'transform';
  var TRANSITIONEND = 'transitionend';
  var TRUE_STR = 'true';
  var TYPE = 'type';
  var VISIBILITY = 'visibility';
  var ZERO = '0';
  var ImageZoom = function (_a, targetEl) {
      var _b = _a === void 0 ? {} : _a, _c = _b.closeText, closeText = _c === void 0 ? 'Unzoom image' : _c, _d = _b.isControlled, isControlled = _d === void 0 ? false : _d, _e = _b.modalText, modalText = _e === void 0 ? 'Zoomed item' : _e, onZoomChange = _b.onZoomChange, _f = _b.openText, openText = _f === void 0 ? 'Zoom image' : _f, _g = _b.overlayBgColorEnd, overlayBgColorEnd = _g === void 0 ? 'rgba(255,255,255,0.95)' : _g, _h = _b.overlayBgColorStart, overlayBgColorStart = _h === void 0 ? 'rgba(255,255,255,0)' : _h, _j = _b.transitionDuration, _transitionDuration = _j === void 0 ? 300 : _j, _k = _b.zoomMargin, zoomMargin = _k === void 0 ? 0 : _k, _l = _b.zoomZindex, zoomZindex = _l === void 0 ? 2147483647 : _l;
      var isImgEl = targetEl.tagName === 'IMG';
      var isSvgSrc = isImgEl && SVG_REGEX.test(targetEl.currentSrc);
      var isImg = !isSvgSrc && isImgEl;
      var documentBody = document.body;
      var scrollableEl = window;
      var ariaHiddenSiblings = [];
      var cloneImgEl;
      var closeBtnEl;
      var boundaryDivFirst;
      var boundaryDivLast;
      var modalEl;
      var motionPref;
      var observer;
      var openBtnEl;
      var overlayEl;
      var state = State.UNLOADED;
      var targetCloneEl;
      var transitionDuration = _transitionDuration;
      var originalStyleDisplay = '';
      var originalCompDisplay = '';
      var originalCompMaxWidth = '';
      var wrapEl;
      var zoomWrapEl;
      var init = function () {
          addEventListener(RESIZE, handleResize, window);
          initMotionPref();
          if (isImg && !targetEl.complete) {
              addEventListener(LOAD, initImg, targetEl);
          }
          else {
              initImg();
          }
      };
      // START TARGET MUTATION OBSERVER
      var initMutationObserver = function () {
          var cb = function () {
              cleanup();
              init();
          };
          observer = new MutationObserver(cb);
          observer.observe(targetEl, {
              attributes: true,
              characterData: true,
              childList: true,
              subtree: true,
          });
      };
      var cleanupMutationObserver = function () {
          observer === null || observer === void 0 ? void 0 : observer.disconnect();
          observer = undefined;
      };
      // END TARGET MUTATION OBSERVER
      // START MOTION PREFS
      var initMotionPref = function () {
          motionPref = window.matchMedia('(prefers-reduced-motion:reduce)');
          motionPref.addListener(handleMotionPref); // NOT addEventListener because compatibility
      };
      var handleMotionPref = function () {
          transitionDuration = 0;
      };
      var cleanupMotionPref = function () {
          motionPref === null || motionPref === void 0 ? void 0 : motionPref.removeListener(handleMotionPref); // NOT removeEventListener because compatibility
          motionPref = undefined;
      };
      // END MOTION PREFS
      var initImg = function () {
          if (!targetEl || state !== State.UNLOADED)
              return;
          var _a = targetEl.getBoundingClientRect(), height = _a.height, width = _a.width;
          var _b = targetEl, naturalHeight = _b.naturalHeight, naturalWidth = _b.naturalWidth;
          var currentScale = isImg && naturalHeight && naturalWidth
              ? getMaxDimensionScale(height, width, zoomMargin, naturalHeight, naturalWidth)
              : getScale(height, width, zoomMargin);
          if (currentScale > 1) {
              if (!targetCloneEl) {
                  // store the original display style & max-width
                  var compStyle = getComputedStyle(targetEl);
                  originalCompDisplay = compStyle[DISPLAY];
                  originalCompMaxWidth = compStyle[MAX_WIDTH];
                  originalStyleDisplay = getStyleProp(DISPLAY, targetEl);
                  targetCloneEl = createTargetCloneEl();
                  wrapEl = createWrapEl();
                  openBtnEl = createOpenBtnEl();
                  // add targetEl margin to wrapEl
                  setStyleProp(MARGIN, getCompStyle(targetEl)[MARGIN], wrapEl);
                  // remove margin from targetCloneEl
                  setStyleProp(MARGIN, ZERO, targetCloneEl);
                  // add targetCloneEl & openBtnEl to the wrapEl
                  appendChild(targetCloneEl, wrapEl);
                  appendChild(openBtnEl, wrapEl);
                  // hide the targetEl, and insert wrapEl
                  // just before targetEl
                  if (targetEl.parentNode) {
                      setStyleProp(DISPLAY, NONE, targetEl);
                      targetEl.parentNode.insertBefore(wrapEl, targetEl);
                  }
                  initMutationObserver();
              }
          }
          else {
              cleanupZoom();
              cleanupMutationObserver();
              cleanupTargetLoad();
              cleanupDOMMutations();
          }
      };
      var createTargetCloneEl = function () {
          var el = cloneElement(true, targetEl);
          removeAttribute(TABINDEX, el);
          setStyleProp(MAX_WIDTH, NONE, el);
          setStyleProp(MAX_HEIGHT, NONE, el);
          if (isImg || originalCompDisplay !== BLOCK) {
              setStyleProp(DISPLAY, BLOCK, el);
              setStyleProp(MIN_WIDTH, '40px', el);
              setStyleProp(MAX_WIDTH, originalCompMaxWidth && originalCompMaxWidth !== NONE
                  ? originalCompMaxWidth : HUNDRED_PCT, el);
          }
          return el;
      };
      var createWrapEl = function () {
          var el = createElement(DIV);
          var styleStr = originalCompDisplay === BLOCK
              ? styleWrapBlock
              : styleWrapInline;
          setAttribute(DATA_RMIZ_WRAP, '', el);
          setAttribute(STYLE, styleStr, el);
          return el;
      };
      var createOpenBtnEl = function () {
          var el = createElement(BUTTON);
          setAttribute(ARIA_LABEL, openText, el);
          setAttribute(STYLE, styleZoomBtnIn, el);
          setAttribute(TYPE, BUTTON, el);
          addEventListener(CLICK, handleOpenBtnClick, el);
          return el;
      };
      var update = function (opts) {
          if (opts === void 0) { opts = {}; }
          if (opts.closeText)
              closeText = opts.closeText;
          if (opts.modalText)
              modalText = opts.modalText;
          if (opts.openText)
              openText = opts.openText;
          if (opts.overlayBgColorEnd)
              overlayBgColorEnd = opts.overlayBgColorEnd;
          if (opts.overlayBgColorStart)
              overlayBgColorStart = opts.overlayBgColorStart;
          if (opts.transitionDuration)
              transitionDuration = opts.transitionDuration;
          if (opts.zoomMargin)
              zoomMargin = opts.zoomMargin;
          if (opts.zoomZindex)
              zoomZindex = opts.zoomZindex;
          setZoomImgStyle();
          if (state === State.UNLOADED && opts.isZoomed) {
              zoom();
          }
          else if (state === State.LOADED && opts.isZoomed === false) {
              unzoom();
          }
      };
      // START CLEANUP
      var cleanup = function () {
          cleanupZoom();
          cleanupMutationObserver();
          cleanupTargetLoad();
          cleanupDOMMutations();
          cleanupMotionPref();
          removeEventListener(RESIZE, handleResize, window);
      };
      var cleanupTargetLoad = function () {
          if (isImg && targetEl) {
              removeEventListener(LOAD, initImg, targetEl);
          }
      };
      var cleanupDOMMutations = function () {
          if (openBtnEl) {
              removeEventListener(CLICK, handleOpenBtnClick, openBtnEl);
          }
          removeChild(wrapEl, wrapEl === null || wrapEl === void 0 ? void 0 : wrapEl.parentNode);
          setStyleProp(DISPLAY, originalStyleDisplay, targetEl);
          openBtnEl = undefined;
          wrapEl = undefined;
          targetCloneEl = undefined;
      };
      var cleanupZoom = function () {
          removeEventListener(SCROLL, handleScroll, scrollableEl);
          removeEventListener(KEYDOWN, handleDocumentKeyDown, document);
          if (cloneImgEl) {
              removeEventListener(LOAD, handleZoomImgLoad, cloneImgEl);
          }
          if (zoomWrapEl) {
              removeEventListener(TRANSITIONEND, handleUnzoomTransitionEnd, zoomWrapEl);
              removeEventListener(TRANSITIONEND, handleZoomTransitionEnd, zoomWrapEl);
          }
          if (closeBtnEl) {
              removeEventListener(CLICK, handleCloseBtnClick, closeBtnEl);
          }
          if (boundaryDivFirst) {
              removeEventListener(FOCUS, handleFocusBoundaryDiv, boundaryDivFirst);
          }
          if (boundaryDivLast) {
              removeEventListener(FOCUS, handleFocusBoundaryDiv, boundaryDivLast);
          }
          if (modalEl) {
              removeEventListener(CLICK, handleModalClick, modalEl);
              removeChild(modalEl, documentBody);
          }
          cloneImgEl = undefined;
          closeBtnEl = undefined;
          boundaryDivFirst = undefined;
          boundaryDivLast = undefined;
          zoomWrapEl = undefined;
          overlayEl = undefined;
          modalEl = undefined;
      };
      // END CLEANUP
      var handleOpenBtnClick = function (e) {
          e.preventDefault();
          if (onZoomChange) {
              onZoomChange(true);
          }
          if (!isControlled) {
              zoom();
          }
      };
      var handleCloseBtnClick = function (e) {
          e.preventDefault();
          if (onZoomChange) {
              onZoomChange(false);
          }
          if (!isControlled) {
              unzoom();
          }
      };
      var handleFocusBoundaryDiv = function () {
          focus(closeBtnEl);
      };
      var handleResize = function () {
          if (state === State.LOADED) {
              setZoomImgStyle(true);
          }
          else {
              initImg();
          }
      };
      var handleZoomTransitionEnd = function () {
          focus(closeBtnEl);
      };
      var handleZoomImgLoad = function () {
          if (targetCloneEl) {
              setStyleProp(VISIBILITY, HIDDEN, targetCloneEl);
          }
          if (overlayEl) {
              setAttribute(STYLE, getStyleOverlay(overlayBgColorEnd, transitionDuration), overlayEl);
          }
          if (zoomWrapEl) {
              addEventListener(TRANSITIONEND, handleZoomTransitionEnd, zoomWrapEl);
              setAttribute(STYLE, stylePosAbsolute, zoomWrapEl);
          }
          setState(State.LOADED);
          ariaHideOtherContent();
      };
      var handleUnzoomTransitionEnd = function () {
          // timeout for Safari flickering issue
          window.setTimeout(function () {
              if (targetCloneEl) {
                  setStyleProp(VISIBILITY, '', targetCloneEl);
              }
              cleanupZoom();
              setState(State.UNLOADED);
              focus(openBtnEl);
          }, 0);
      };
      var handleModalClick = function () {
          if (onZoomChange) {
              onZoomChange(false);
          }
          if (!isControlled) {
              unzoom();
          }
      };
      var handleScroll = function () {
          if (onZoomChange) {
              onZoomChange(false);
          }
          if (!isControlled) {
              unzoom();
          }
      };
      var handleDocumentKeyDown = function (e) {
          if (isEscapeKey(e)) {
              e.stopPropagation();
              if (onZoomChange) {
                  onZoomChange(false);
              }
              if (!isControlled) {
                  unzoom();
              }
          }
      };
      var setState = function (s) {
          state = s;
          setZoomImgStyle();
      };
      var setZoomImgStyle = function (instant) {
          if (instant === void 0) { instant = false; }
          if (!targetCloneEl)
              return;
          if (zoomWrapEl) {
              setAttribute(STYLE, getZoomImgStyle(instant ? 0 : transitionDuration, zoomMargin, wrapEl, targetCloneEl, isImg, state), zoomWrapEl);
          }
      };
      var zoom = function () {
          if (isImg) {
              zoomImg();
          }
          else {
              zoomNonImg();
          }
          blur(openBtnEl);
      };
      var zoomImg = function () {
          if (!targetCloneEl || state !== State.UNLOADED)
              return;
          cloneImgEl = cloneElement(true, targetCloneEl);
          addEventListener(LOAD, handleZoomImgLoad, cloneImgEl);
          removeAttribute(ID, cloneImgEl);
          removeAttribute(CLASS, cloneImgEl);
          setAttribute(STYLE, styleZoomImgContent, cloneImgEl);
          modalEl = createModal(cloneImgEl);
          appendChild(modalEl, documentBody);
          addEventListener(KEYDOWN, handleDocumentKeyDown, document);
          addEventListener(SCROLL, handleScroll, scrollableEl);
      };
      var zoomNonImg = function () {
          if (!targetCloneEl || state !== State.UNLOADED)
              return;
          var cloneEl = cloneElement(true, targetCloneEl);
          removeAttribute(ID, cloneEl);
          modalEl = createModal(cloneEl);
          appendChild(modalEl, documentBody);
          addEventListener(KEYDOWN, handleDocumentKeyDown, document);
          addEventListener(SCROLL, handleScroll, scrollableEl);
          handleZoomImgLoad();
      };
      var createModal = function (contentEl) {
          var el = createElement(DIV);
          setAttribute(ARIA_LABEL, modalText, el);
          setAttribute(ARIA_MODAL, TRUE_STR, el);
          setAttribute(DATA_RMIZ_OVERLAY, '', el);
          setAttribute(ROLE, DIALOG, el);
          setAttribute(STYLE, getStyleDialog(String(zoomZindex)), el);
          addEventListener(CLICK, handleModalClick, el);
          overlayEl = createElement(DIV);
          setAttribute(STYLE, getStyleOverlay(overlayBgColorStart, transitionDuration), overlayEl);
          boundaryDivFirst = createElement(DIV);
          setAttribute(TABINDEX, ZERO, boundaryDivFirst);
          addEventListener(FOCUS, handleFocusBoundaryDiv, boundaryDivFirst);
          boundaryDivLast = createElement(DIV);
          setAttribute(TABINDEX, ZERO, boundaryDivLast);
          addEventListener(FOCUS, handleFocusBoundaryDiv, boundaryDivLast);
          closeBtnEl = createElement(BUTTON);
          setAttribute(ARIA_LABEL, closeText, closeBtnEl);
          setAttribute(STYLE, styleZoomBtnOut, closeBtnEl);
          setAttribute(TYPE, BUTTON, el);
          addEventListener(CLICK, handleCloseBtnClick, closeBtnEl);
          zoomWrapEl = createElement(DIV);
          setAttribute(DATA_RMIZ_ZOOMED, '', zoomWrapEl);
          setAttribute(STYLE, styleZoomStart, zoomWrapEl);
          appendChild(contentEl, zoomWrapEl);
          appendChild(overlayEl, el);
          appendChild(boundaryDivFirst, el);
          appendChild(closeBtnEl, el);
          appendChild(zoomWrapEl, el);
          appendChild(boundaryDivLast, el);
          return el;
      };
      var ariaHideOtherContent = function () {
          if (modalEl) {
              forEachSibling(function (el) {
                  var ariaHiddenValue = getAttribute(ARIA_HIDDEN, el);
                  if (ariaHiddenValue) {
                      ariaHiddenSiblings.push([el, ariaHiddenValue]);
                  }
                  el.setAttribute(ARIA_HIDDEN, TRUE_STR);
              }, modalEl);
          }
      };
      var ariaResetOtherContent = function () {
          if (modalEl) {
              forEachSibling(function (el) {
                  removeAttribute(ARIA_HIDDEN, el);
              }, modalEl);
          }
          ariaHiddenSiblings.forEach(function (_a) {
              var el = _a[0], ariaHiddenValue = _a[1];
              if (el) {
                  setAttribute(ARIA_HIDDEN, ariaHiddenValue, el);
              }
          });
          ariaHiddenSiblings = [];
      };
      var unzoom = function () {
          if (state === State.LOADED) {
              blur(closeBtnEl);
              ariaResetOtherContent();
              if (zoomWrapEl) {
                  addEventListener(TRANSITIONEND, handleUnzoomTransitionEnd, zoomWrapEl);
              }
              if (overlayEl) {
                  setAttribute(STYLE, getStyleOverlay(overlayBgColorStart, transitionDuration), overlayEl);
              }
          }
          if (state !== State.UNLOADED) {
              setState(State.UNLOADING);
          }
      };
      init();
      return { cleanup: cleanup, update: update };
  };
  //
  // STYLING
  //
  var styleAllDirsZero = 'top:0;right:0;bottom:0;left:0;';
  var styleAppearanceNone = "-webkit-appearance:" + NONE + ";-moz-appearance:" + NONE + ";appearance:" + NONE + ";";
  var styleCursorPointer = 'cursor:pointer;';
  var styleCursorZoomIn = styleCursorPointer + 'cursor:-webkit-zoom-in;cursor:zoom-in;';
  var styleCursorZoomOut = styleCursorPointer + 'cursor:-webkit-zoom-out;cursor:zoom-out;';
  var styleDisplayBlock = DISPLAY + ":" + BLOCK + ";";
  var styleDisplayInlineBlock = DISPLAY + ":inline-block;";
  var styleFastTap = 'touch-action:manipulation;';
  var styleHeight100pct = "height:" + HUNDRED_PCT + ";";
  var styleMaxWidth100pct = "max-width:" + HUNDRED_PCT + ";";
  var stylePosAbsolute = POSITION + ":absolute;";
  var stylePosRelative = POSITION + ":relative;";
  var styleTransitionTimingFn = 'cubic-bezier(.42,0,.58,1);';
  var styleVisibilityHidden = VISIBILITY + ":" + HIDDEN + ";";
  var styleWidth100pct = "width:" + HUNDRED_PCT + ";";
  var styleWrapBlock = stylePosRelative + styleDisplayBlock;
  var styleWrapInline = stylePosRelative +
      styleDisplayInlineBlock +
      "vertical-align:top;";
  var styleZoomBtn = stylePosAbsolute +
      styleAllDirsZero +
      styleHeight100pct +
      styleWidth100pct +
      ("background:" + NONE + ";") +
      ("border:" + NONE + ";") +
      'margin:0;' +
      'padding:0;';
  var styleZoomBtnBase = styleZoomBtn + styleFastTap + styleAppearanceNone;
  var styleZoomBtnIn = styleZoomBtnBase + styleCursorZoomIn;
  var styleZoomBtnOut = styleZoomBtnBase + styleCursorZoomOut + 'z-index:1;';
  var styleZoomStart = stylePosAbsolute + styleVisibilityHidden;
  var styleZoomImgContent = styleDisplayBlock +
      styleHeight100pct +
      styleMaxWidth100pct;
  var getStyleOverlay = function (backgroundColor, transitionDuration) {
      var td = transitionDuration ? transitionDuration / 3 : transitionDuration;
      return stylePosAbsolute +
          styleAllDirsZero +
          ("transition:background " + td + "ms " + styleTransitionTimingFn + ";") +
          ("background:" + backgroundColor + ";");
  };
  var getStyleDialog = function (zIndex) {
      return 'position:fixed;' +
          styleAllDirsZero +
          styleWidth100pct +
          styleHeight100pct +
          ("z-index:" + zIndex + ";");
  };
  var getZoomImgStyleStr = function (height, width, left, top, transform, transitionDuration) {
      return stylePosAbsolute +
          ("height:" + height + "px;") +
          ("width:" + width + "px;") +
          ("left:" + left + "px;") +
          ("top:" + top + "px;") +
          ("transition:transform " + transitionDuration + "ms " + styleTransitionTimingFn + ";") +
          ("-webkit-transform:" + transform + ";") +
          ("-ms-transform:" + transform + ";") +
          ("transform:" + transform + ";");
  };
  var getZoomImgStyle = function (transitionDuration, zoomMargin, containerEl, targetEl, isImg, state) {
      if (!containerEl) {
          return getZoomImgStyleStr(0, 0, 0, 0, NONE, 0);
      }
      var _a = containerEl.getBoundingClientRect(), height = _a.height, left = _a.left, top = _a.top, width = _a.width;
      var originalTransform = getStyleProp(TRANSFORM, targetEl);
      if (state !== State.LOADED) {
          var initTransform = 'scale(1) translate(0,0)' +
              (originalTransform ? " " + originalTransform : '');
          return getZoomImgStyleStr(height, width, left, top, initTransform, transitionDuration);
      }
      var _b = targetEl, naturalHeight = _b.naturalHeight, naturalWidth = _b.naturalWidth;
      // Get amount to scale item
      var scale = isImg && naturalHeight && naturalWidth
          ? getMaxDimensionScale(height, width, zoomMargin, naturalHeight, naturalWidth)
          : getScale(height, width, zoomMargin);
      // Get the the coords for center of the viewport
      var viewportX = window.innerWidth / 2;
      var viewportY = window.innerHeight / 2;
      // Get the coords for center of the parent item
      var childCenterX = left + width / 2;
      var childCenterY = top + height / 2;
      // Get offset amounts for item coords to be centered on screen
      var translateX = (viewportX - childCenterX) / scale;
      var translateY = (viewportY - childCenterY) / scale;
      // Build transform style, including any original transform
      var transform = "scale(" + scale + ") translate(" + translateX + "px," + translateY + "px)" +
          (originalTransform ? " " + originalTransform : '');
      return getZoomImgStyleStr(height, width, left, top, transform, transitionDuration);
  };
  var isEscapeKey = function (e) { return e.key === 'Escape' || e.keyCode === 27; };
  var getScale = function (height, width, zoomMargin) {
      var scaleX = window.innerWidth / (width + zoomMargin);
      var scaleY = window.innerHeight / (height + zoomMargin);
      return Math.min(scaleX, scaleY);
  };
  var getMaxDimensionScale = function (height, width, zoomMargin, naturalHeight, naturalWidth) {
      var scale = getScale(naturalHeight, naturalWidth, zoomMargin);
      var ratio = naturalWidth > naturalHeight ? naturalWidth / width : naturalHeight / height;
      return scale > 1 ? ratio : scale * ratio;
  };
  var SVG_REGEX = /\.svg$/i;
  var appendChild = function (child, parent) { return parent.appendChild(child); };
  var removeChild = function (child, parent) {
      if (child && parent) {
          parent.removeChild(child);
      }
  };
  var createElement = function (type) { return document.createElement(type); };
  var cloneElement = function (deep, el) {
      return el.cloneNode(deep);
  };
  var blur = function (el) {
      el === null || el === void 0 ? void 0 : el.blur();
  };
  var focus = function (el) {
      if (el) {
          el.focus({ preventScroll: true });
      }
  };
  var forEachSibling = function (handler, target) {
      var _a;
      var nodes = ((_a = target.parentNode) === null || _a === void 0 ? void 0 : _a.children) || [];
      for (var i = 0; i < nodes.length; i++) {
          var el = nodes[i];
          if (!el)
              return;
          var tagName = el.tagName;
          if (tagName === 'SCRIPT' ||
              tagName === 'NOSCRIPT' ||
              tagName === 'STYLE' ||
              el === target) {
              continue;
          }
          handler(el);
      }
  };
  var addEventListener = function (type, cb, el, useCapture) {
      if (useCapture === void 0) { useCapture = false; }
      el.addEventListener(type, cb, useCapture);
  };
  var removeEventListener = function (type, handler, el, useCapture) {
      if (useCapture === void 0) { useCapture = false; }
      el.removeEventListener(type, handler, useCapture);
  };
  var getAttribute = function (attr, el) { return el.getAttribute(attr); };
  var removeAttribute = function (attr, el) {
      el.removeAttribute(attr);
  };
  var setAttribute = function (attr, value, el) {
      return el.setAttribute(attr, value);
  };
  var getStyle = function (el) { return el.style; };
  var getStyleProp = function (attr, el) { return getStyle(el)[attr]; };
  var setStyleProp = function (attr, value, el) {
      getStyle(el)[attr] = value;
  };
  var getCompStyle = function (el) { return window.getComputedStyle(el); };

  return ImageZoom;

}());
