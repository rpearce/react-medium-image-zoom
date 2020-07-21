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
  var BUTTON = 'button';
  var CLICK = 'click';
  var DATA_RMIZ_OVERLAY = 'data-rmiz-overlay';
  var DATA_RMIZ_WRAP = 'data-rmiz-wrap';
  var DATA_RMIZ_ZOOMED = 'data-rmiz-zoomed';
  var DIALOG = 'dialog';
  var DIV = 'div';
  var FOCUS = 'focus';
  var ID = 'id';
  var KEYDOWN = 'keydown';
  var LOAD = 'load';
  var NONE = 'none';
  var RESIZE = 'resize';
  var ROLE = 'role';
  var SCROLL = 'scroll';
  var STYLE = 'style';
  var TABINDEX = 'tabindex';
  var TRANSITIONEND = 'transitionend';
  var TRUE_STR = 'true';
  var ImageZoom = function (_a, targetEl) {
      var _b = _a === void 0 ? {} : _a, _c = _b.closeText, closeText = _c === void 0 ? 'Unzoom image' : _c, _d = _b.isControlled, isControlled = _d === void 0 ? false : _d, _e = _b.modalText, modalText = _e === void 0 ? 'Zoomed item' : _e, onZoomChange = _b.onZoomChange, _f = _b.openText, openText = _f === void 0 ? 'Zoom image' : _f, _g = _b.overlayBgColorEnd, overlayBgColorEnd = _g === void 0 ? 'rgba(255,255,255,0.95)' : _g, _h = _b.overlayBgColorStart, overlayBgColorStart = _h === void 0 ? 'rgba(255,255,255,0)' : _h, _j = _b.transitionDuration, _transitionDuration = _j === void 0 ? 300 : _j, _k = _b.zoomMargin, zoomMargin = _k === void 0 ? 0 : _k, _l = _b.zoomZindex, zoomZindex = _l === void 0 ? 2147483647 : _l;
      var isDisplayBlock = window.getComputedStyle(targetEl).display === 'block';
      var isImgEl = targetEl.tagName === 'IMG';
      var isSvgSrc = isImgEl && SVG_REGEX.test(targetEl.currentSrc);
      var isImg = !isSvgSrc && isImgEl;
      var documentBody = document.body;
      var scrollableEl = window;
      var ariaHiddenSiblings = [];
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
      var wrapEl;
      var zoomWrapEl;
      var init = function () {
          addEventListener(RESIZE, handleResize, window);
          initMotionPref();
          if (isImg && !targetEl.complete) {
              targetEl.addEventListener(LOAD, function () {
                  window.setTimeout(function () {
                      initImg();
                  }, 500);
              });
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
                  targetCloneEl = targetEl.cloneNode(true);
                  removeAttribute(TABINDEX, targetCloneEl);
                  wrapEl = createElement(DIV);
                  openBtnEl = createElement(BUTTON);
                  setAttribute(DATA_RMIZ_WRAP, '', wrapEl);
                  setAttribute(STYLE, isDisplayBlock ? styleWrapDiv : styleWrap, wrapEl);
                  setAttribute(ARIA_LABEL, openText, openBtnEl);
                  setAttribute(STYLE, styleZoomBtnIn, openBtnEl);
                  addEventListener(CLICK, handleOpenBtnClick, openBtnEl);
                  appendChild(targetCloneEl, wrapEl);
                  appendChild(openBtnEl, wrapEl);
                  if (targetEl.parentNode) {
                      originalStyleDisplay = targetEl.style.display;
                      targetEl.style.display = NONE;
                      targetEl.parentNode.insertBefore(wrapEl, targetEl);
                  }
                  initMutationObserver();
              }
          }
          else {
              cleanupZoom();
              cleanupMutationObserver();
              cleanupDOMMutations();
          }
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
          if (isImg && targetEl) {
              removeEventListener(LOAD, initImg, targetEl);
          }
          cleanupDOMMutations();
          cleanupMotionPref();
          removeEventListener(RESIZE, handleResize, window);
      };
      var cleanupDOMMutations = function () {
          if (openBtnEl) {
              removeEventListener(CLICK, handleOpenBtnClick, openBtnEl);
          }
          removeChild(wrapEl, wrapEl === null || wrapEl === void 0 ? void 0 : wrapEl.parentNode);
          targetEl.style.display = originalStyleDisplay;
          openBtnEl = undefined;
          wrapEl = undefined;
          targetCloneEl = undefined;
      };
      var cleanupZoom = function () {
          removeEventListener(SCROLL, handleScroll, scrollableEl);
          removeEventListener(KEYDOWN, handleDocumentKeyDown, document);
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
              targetCloneEl.style.visibility = 'hidden';
          }
          if (overlayEl) {
              setAttribute(STYLE, getStyleOverlay(overlayBgColorEnd, transitionDuration), overlayEl);
          }
          if (zoomWrapEl) {
              addEventListener(TRANSITIONEND, handleZoomTransitionEnd, zoomWrapEl);
              setAttribute(STYLE, stylePosAbsolute, zoomWrapEl);
          }
          setState(State.LOADED);
      };
      var handleUnzoomTransitionEnd = function () {
          // timeout for Safari flickering issue
          window.setTimeout(function () {
              if (targetCloneEl) {
                  targetCloneEl.style.visibility = '';
              }
              cleanupZoom();
              focus(openBtnEl);
              setState(State.UNLOADED);
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
          ariaHideOtherContent();
      };
      var zoomImg = function () {
          if (!targetCloneEl || state !== State.UNLOADED)
              return;
          var cloneEl = targetCloneEl.cloneNode(true);
          removeAttribute(ID, cloneEl);
          setAttribute(STYLE, styleZoomImgContent, cloneEl);
          modalEl = createModal(cloneEl);
          appendChild(modalEl, documentBody);
          addEventListener(KEYDOWN, handleDocumentKeyDown, document);
          addEventListener(SCROLL, handleScroll, scrollableEl);
          handleZoomImgLoad();
      };
      var zoomNonImg = function () {
          if (!targetCloneEl || state !== State.UNLOADED)
              return;
          var cloneEl = targetCloneEl.cloneNode(true);
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
          setAttribute(TABINDEX, '0', boundaryDivFirst);
          addEventListener(FOCUS, handleFocusBoundaryDiv, boundaryDivFirst);
          boundaryDivLast = createElement(DIV);
          setAttribute(TABINDEX, '0', boundaryDivLast);
          addEventListener(FOCUS, handleFocusBoundaryDiv, boundaryDivLast);
          closeBtnEl = createElement(BUTTON);
          setAttribute(STYLE, styleZoomBtnOut, closeBtnEl);
          setAttribute(ARIA_LABEL, closeText, closeBtnEl);
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
          forEachSibling(function (el) {
              var ariaHiddenValue = el.getAttribute(ARIA_HIDDEN);
              if (ariaHiddenValue) {
                  ariaHiddenSiblings.push([el, ariaHiddenValue]);
              }
              el.setAttribute(ARIA_HIDDEN, TRUE_STR);
          }, documentBody);
      };
      var ariaResetOtherContent = function () {
          forEachSibling(function (el) {
              removeAttribute(ARIA_HIDDEN, el);
          }, documentBody);
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
          ariaResetOtherContent();
      };
      init();
      return { cleanup: cleanup, update: update };
  };
  //
  // STYLING
  //
  var styleAllDirsZero = 'top:0;right:0;bottom:0;left:0;';
  var styleAppearanceNone = '-webkit-appearance:none;-moz-appearance:none;appearance:none;';
  var styleFastTap = 'touch-action:manipulation;';
  var stylePosAbsolute = 'position:absolute;';
  var stylePosRelative = 'position:relative;';
  var styleTransitionTimingFn = 'cubic-bezier(0.2,0,0.2,1)';
  var styleVisibilityHidden = 'visibility:hidden;';
  var styleHeight100pct = 'height:100%;';
  var styleWidth100pct = 'width:100%;';
  var styleWrap = stylePosRelative +
      'display:inline-flex;' +
      'align-items:flex-start;';
  var styleWrapDiv = styleWrap + styleWidth100pct;
  var styleCursorZoomIn = 'cursor:-webkit-zoom-in;cursor:zoom-in;';
  var styleCursorZoomOut = 'cursor:-webkit-zoom-out;cursor:zoom-out;';
  var styleZoomBtn = stylePosAbsolute +
      styleAllDirsZero +
      styleHeight100pct +
      styleWidth100pct +
      'background:none;' +
      'border:none;' +
      'margin:0;' +
      'padding:0;';
  var styleZoomBtnBase = styleZoomBtn + styleFastTap + styleAppearanceNone;
  var styleZoomBtnIn = styleZoomBtnBase + styleCursorZoomIn;
  var styleZoomBtnOut = styleZoomBtnBase + styleCursorZoomOut + 'z-index:1;';
  var styleZoomStart = stylePosAbsolute + styleVisibilityHidden;
  var styleZoomImgContent = styleHeight100pct + 'max-width:100%;';
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
      var originalTransform = targetEl.style.transform;
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
  var blur = function (el) {
      if (el) {
          el.blur();
      }
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
              return;
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
  var removeAttribute = function (attr, el) { return el.removeAttribute(attr); };
  var setAttribute = function (attr, value, el) {
      return el.setAttribute(attr, value);
  };

  return ImageZoom;

}());
