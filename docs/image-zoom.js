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
  var ARIA_DESCRIBEDBY = 'aria-describedby';
  var ARIA_LABEL = 'aria-label';
  var ARIA_LABELLEDBY = 'aria-labelledby';
  var ARIA_MODAL = 'aria-modal';
  var BUTTON = 'button';
  var CLICK = 'click';
  var DATA_RMIZ_DESC = 'data-rmiz-desc';
  var DATA_RMIZ_DESC_WRAP = 'data-rmiz-desc-wrap';
  var DATA_RMIZ_OVERLAY = 'data-rmiz-overlay';
  var DATA_RMIZ_ZOOMED = 'data-rmiz-zoomed';
  var DIALOG = 'dialog';
  var ID = 'id';
  var KEYDOWN = 'keydown';
  var LOAD = 'load';
  var RESIZE = 'resize';
  var ROLE = 'role';
  var SCROLL = 'scroll';
  var STYLE = 'style';
  var TABINDEX = 'tabindex';
  var TRANSITIONEND = 'transitionend';
  var TRUE_STR = 'true';
  var ZERO_STR = '0';
  var ZERO_MS = ZERO_STR + 'ms';
  var ImageZoom = function (_a, targetEl) {
      var _b = _a === void 0 ? {} : _a, _c = _b.closeText, closeText = _c === void 0 ? 'Press to unzoom image' : _c, _d = _b.isControlled, isControlled = _d === void 0 ? false : _d, _e = _b.modalText, modalText = _e === void 0 ? 'Zoomed item' : _e, onZoomChange = _b.onZoomChange, _f = _b.openText, openText = _f === void 0 ? 'Press to zoom image' : _f, _g = _b.overlayBgColorEnd, overlayBgColorEnd = _g === void 0 ? 'rgba(255,255,255,0.95)' : _g, _h = _b.overlayBgColorStart, overlayBgColorStart = _h === void 0 ? 'rgba(255,255,255,0)' : _h, _portalEl = _b.portalEl, _scrollableEl = _b.scrollableEl, _j = _b.transitionDuration, transitionDuration = _j === void 0 ? '300ms' : _j, _k = _b.zoomMargin, zoomMargin = _k === void 0 ? 0 : _k, _l = _b.zoomZindex, zoomZindex = _l === void 0 ? 2147483647 : _l;
      var closeDescId = uniqueId('rmiz-close-');
      var openDescId = uniqueId('rmiz-open-');
      var originalAriaDescribedBy = getAttribute(ARIA_DESCRIBEDBY, targetEl);
      var originalRole = getAttribute(ROLE, targetEl);
      var originalStyle = getAttribute(STYLE, targetEl);
      var originalTabIndex = getAttribute(TABINDEX, targetEl);
      var isImgEl = targetEl.tagName === 'IMG';
      var isSvgSrc = isImgEl && SVG_REGEX.test(targetEl.currentSrc);
      var isImg = !isSvgSrc && isImgEl;
      var documentBody = document.body;
      var closeDescEl;
      var descWrapEl;
      var modalEl;
      var motionPref;
      var openDescEl;
      var portalEl = _portalEl || documentBody;
      var scrollableEl = _scrollableEl || window;
      var state = State.UNLOADED;
      var zoomEl;
      var zoomImgEl;
      var init = function () {
          addEventListener(RESIZE, handleResize, window);
          initMotionPref();
          initDescriptions();
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
      var initMotionPref = function () {
          motionPref = window.matchMedia('(prefers-reduced-motion:reduce)');
          motionPref.addListener(handleMotionPref); // NOT addEventListener b/c compatibility
      };
      var initDescriptions = function () {
          descWrapEl = documentBody.querySelector("[" + DATA_RMIZ_DESC_WRAP + "]");
          if (!descWrapEl) {
              descWrapEl = createDiv();
              setAttribute(DATA_RMIZ_DESC_WRAP, '', descWrapEl);
              appendChild(descWrapEl, documentBody);
          }
          openDescEl = createDescEl(openDescId, openText);
          closeDescEl = createDescEl(closeDescId, closeText);
          appendChild(openDescEl, descWrapEl);
          appendChild(closeDescEl, descWrapEl);
      };
      var initImg = function () {
          if (!targetEl || state !== State.UNLOADED)
              return;
          var _a = targetEl.getBoundingClientRect(), height = _a.height, width = _a.width;
          var _b = targetEl, naturalHeight = _b.naturalHeight, naturalWidth = _b.naturalWidth;
          var currentScale = isImg && naturalHeight && naturalWidth
              ? getMaxDimensionScale(height, width, zoomMargin, naturalHeight, naturalWidth)
              : getScale(height, width, zoomMargin);
          if (currentScale > 1) {
              setAttribute(ARIA_DESCRIBEDBY, openDescId, targetEl);
              setAttribute(ROLE, BUTTON, targetEl);
              setAttribute(TABINDEX, originalTabIndex || ZERO_STR, targetEl);
              setAttribute(STYLE, combineStyles(originalStyle, styleCursorZoomIn), targetEl);
              addEventListener(CLICK, handleImgClick, targetEl);
              addEventListener(KEYDOWN, handleImgKeyDown, targetEl);
          }
          else {
              cleanupImg();
          }
      };
      var update = function (opts) {
          if (opts === void 0) { opts = {}; }
          if (opts.modalText)
              modalText = opts.modalText;
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
          if (opts.closeText) {
              closeText = opts.closeText;
              if (closeDescEl) {
                  setTextContent(closeText, closeDescEl);
              }
          }
          if (opts.openText) {
              openText = opts.openText;
              if (openDescEl) {
                  setTextContent(openText, openDescEl);
              }
          }
          if (state === State.UNLOADED) {
              if (opts.portalEl) {
                  portalEl = opts.portalEl;
              }
              if (opts.scrollableEl) {
                  scrollableEl = opts.scrollableEl;
              }
          }
          setZoomImgStyle();
          if (state === State.UNLOADED && opts.isZoomed) {
              zoom();
          }
          else if (state === State.LOADED && opts.isZoomed === false) {
              unzoom();
          }
      };
      var cleanup = function () {
          cleanupZoomImg();
          cleanupImg();
          cleanupModal();
          cleanupDescriptions();
          if (isImg && targetEl) {
              removeEventListener(LOAD, initImg, targetEl);
          }
          if (motionPref) {
              motionPref.removeListener(handleMotionPref);
              motionPref = undefined;
          }
          removeEventListener(RESIZE, handleResize, window);
      };
      var cleanupDescriptions = function () {
          var openEl = document.getElementById(openDescId);
          var closeEl = document.getElementById(closeDescId);
          removeChild(openEl, descWrapEl);
          removeChild(closeEl, descWrapEl);
      };
      var cleanupImg = function () {
          if (!targetEl)
              return;
          removeEventListener(KEYDOWN, handleImgKeyDown, targetEl);
          removeEventListener(CLICK, handleImgClick, targetEl);
          if (originalTabIndex) {
              setAttribute(TABINDEX, originalTabIndex, targetEl);
          }
          else {
              removeAttribute(TABINDEX, targetEl);
          }
          if (originalStyle) {
              setAttribute(STYLE, originalStyle, targetEl);
          }
          else {
              removeAttribute(STYLE, targetEl);
          }
          if (originalRole) {
              setAttribute(ROLE, originalRole, targetEl);
          }
          else {
              removeAttribute(ROLE, targetEl);
          }
          if (originalAriaDescribedBy) {
              setAttribute(ARIA_DESCRIBEDBY, originalAriaDescribedBy, targetEl);
          }
          else {
              removeAttribute(ARIA_DESCRIBEDBY, targetEl);
          }
      };
      var cleanupZoomImg = function () {
          var el = isImg ? zoomImgEl : zoomEl;
          if (el) {
              removeEventListener(TRANSITIONEND, handleUnzoomTransitionEnd, el);
              removeEventListener(TRANSITIONEND, handleZoomTransitionEnd, el);
              removeEventListener(CLICK, handleZoomImgClick, el);
              removeEventListener(KEYDOWN, handleZoomImgKeyDown, el);
              removeEventListener(LOAD, handleZoomImgLoad, el);
              removeChild(el, modalEl);
          }
          zoomImgEl = undefined;
          zoomEl = undefined;
          removeEventListener(SCROLL, handleScroll, scrollableEl);
          removeEventListener(KEYDOWN, handleDocumentKeyDown, document);
      };
      var cleanupModal = function () {
          if (!modalEl)
              return;
          removeEventListener(CLICK, handleModalClick, modalEl);
          removeChild(modalEl, portalEl);
          modalEl = undefined;
      };
      var handleMotionPref = function () {
          transitionDuration = ZERO_MS;
      };
      var handleImgClick = function (e) {
          e.preventDefault();
          if (onZoomChange) {
              onZoomChange(true);
          }
          if (!isControlled) {
              zoom();
          }
      };
      var handleZoomImgClick = function (e) {
          e.preventDefault();
          if (onZoomChange) {
              onZoomChange(false);
          }
          if (!isControlled) {
              unzoom();
          }
      };
      var handleImgKeyDown = function (e) {
          if (isSelectKey(e)) {
              e.preventDefault();
              if (onZoomChange) {
                  onZoomChange(true);
              }
              if (!isControlled) {
                  zoom();
              }
          }
      };
      var handleZoomImgKeyDown = function (e) {
          if (isSelectKey(e)) {
              e.preventDefault();
              if (onZoomChange) {
                  onZoomChange(false);
              }
              if (!isControlled) {
                  unzoom();
              }
          }
      };
      var handleResize = function () {
          if (state === State.LOADED) {
              window.requestAnimationFrame(function () { return setZoomImgStyle(true); });
          }
          else {
              initImg();
          }
      };
      var handleZoomTransitionEnd = function () {
          var el = zoomImgEl || zoomEl;
          if (el) {
              focus(el);
          }
      };
      var handleZoomImgLoad = function () {
          if (targetEl) {
              setAttribute(STYLE, combineStyles(originalStyle, styleVisibilityHidden), targetEl);
          }
          if (modalEl) {
              modalEl.style.backgroundColor = overlayBgColorEnd;
          }
          if (zoomImgEl) {
              removeEventListener(LOAD, handleZoomImgLoad, zoomImgEl);
              addEventListener(TRANSITIONEND, handleZoomTransitionEnd, zoomImgEl);
              setAttribute(STYLE, styleZoomed, zoomImgEl);
          }
          if (zoomEl) {
              addEventListener(TRANSITIONEND, handleZoomTransitionEnd, zoomEl);
              setAttribute(STYLE, styleZoomed, zoomEl);
          }
          setState(State.LOADED);
      };
      var handleUnzoomTransitionEnd = function () {
          if (!targetEl)
              return;
          setAttribute(STYLE, combineStyles(originalStyle, styleCursorZoomIn), targetEl);
          // timeout for Safari flickering issue
          window.setTimeout(function () {
              cleanupZoomImg();
              cleanupModal();
              focus(targetEl);
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
          window.requestAnimationFrame(function () {
              if (onZoomChange) {
                  return onZoomChange(false);
              }
              if (!isControlled) {
                  return unzoom();
              }
          });
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
          if (!targetEl)
              return;
          var el = isImg ? zoomImgEl : zoomEl;
          if (el) {
              setAttribute(STYLE, getZoomImgStyle(instant ? ZERO_MS : transitionDuration, zoomMargin, targetEl, isImg, state), el);
          }
      };
      var zoom = function () {
          if (isImg) {
              zoomImg();
          }
          else {
              zoomNonImg();
          }
      };
      var zoomImg = function () {
          if (!targetEl || state !== State.UNLOADED)
              return;
          var targetAlt = targetEl.alt;
          var targetLabel = getAttribute(ARIA_LABEL, targetEl);
          var targetLabelledBy = getAttribute(ARIA_LABELLEDBY, targetEl);
          var targetSizes = targetEl.sizes;
          var targetSrc = targetEl.src;
          var targetSrcset = targetEl.srcset;
          zoomImgEl = new Image();
          addEventListener(LOAD, handleZoomImgLoad, zoomImgEl);
          addEventListener(CLICK, handleZoomImgClick, zoomImgEl);
          addEventListener(KEYDOWN, handleZoomImgKeyDown, zoomImgEl);
          setAttribute(ARIA_DESCRIBEDBY, closeDescId, zoomImgEl);
          setAttribute(DATA_RMIZ_ZOOMED, '', zoomImgEl);
          setAttribute(ROLE, BUTTON, zoomImgEl);
          setAttribute(STYLE, styleZoomStart, zoomImgEl);
          setAttribute(TABINDEX, ZERO_STR, zoomImgEl);
          if (targetAlt)
              zoomImgEl.alt = targetAlt;
          if (targetSrc)
              zoomImgEl.src = targetSrc;
          if (targetSrcset)
              zoomImgEl.srcset = targetSrcset;
          if (targetSizes)
              zoomImgEl.sizes = targetSizes;
          if (targetLabel)
              setAttribute(ARIA_LABEL, targetLabel, zoomImgEl);
          if (targetLabelledBy) {
              setAttribute(ARIA_LABELLEDBY, targetLabelledBy, zoomImgEl);
          }
          modalEl = createModal();
          appendChild(zoomImgEl, modalEl);
          appendChild(modalEl, portalEl);
          addEventListener(KEYDOWN, handleDocumentKeyDown, document);
          addEventListener(SCROLL, handleScroll, scrollableEl);
      };
      var zoomNonImg = function () {
          if (!targetEl || state !== State.UNLOADED)
              return;
          zoomEl = createDiv();
          addEventListener(CLICK, handleZoomImgClick, zoomEl);
          addEventListener(KEYDOWN, handleZoomImgKeyDown, zoomEl);
          setAttribute(ARIA_DESCRIBEDBY, closeDescId, zoomEl);
          setAttribute(DATA_RMIZ_ZOOMED, '', zoomEl);
          setAttribute(ROLE, BUTTON, zoomEl);
          setAttribute(STYLE, styleZoomStart, zoomEl);
          setAttribute(TABINDEX, ZERO_STR, zoomEl);
          var cloneEl = targetEl.cloneNode(true);
          removeAttribute(ID, cloneEl);
          removeAttribute(TABINDEX, cloneEl);
          if (originalRole) {
              setAttribute(ROLE, originalRole, cloneEl);
          }
          else {
              removeAttribute(ROLE, cloneEl);
          }
          if (originalAriaDescribedBy) {
              setAttribute(ARIA_DESCRIBEDBY, originalAriaDescribedBy, cloneEl);
          }
          else {
              removeAttribute(ARIA_DESCRIBEDBY, cloneEl);
          }
          addEventListener(CLICK, handleZoomImgClick, zoomEl);
          appendChild(cloneEl, zoomEl);
          modalEl = createModal();
          appendChild(zoomEl, modalEl);
          appendChild(modalEl, portalEl);
          addEventListener(KEYDOWN, handleDocumentKeyDown, document);
          addEventListener(SCROLL, handleScroll, scrollableEl);
          handleZoomImgLoad();
      };
      var createModal = function () {
          var el = createDiv();
          setAttribute(ARIA_LABEL, modalText, el);
          setAttribute(ARIA_MODAL, TRUE_STR, el);
          setAttribute(DATA_RMIZ_OVERLAY, '', el);
          setAttribute(ROLE, DIALOG, el);
          setAttribute(STYLE, getStyleOverlay(overlayBgColorStart, transitionDuration, String(zoomZindex)), el);
          addEventListener(CLICK, handleModalClick, el);
          return el;
      };
      var unzoom = function () {
          if (state === State.LOADED) {
              var el = isImg ? zoomImgEl : zoomEl;
              if (el) {
                  el.blur();
                  addEventListener(TRANSITIONEND, handleUnzoomTransitionEnd, el);
              }
              if (modalEl) {
                  modalEl.style.backgroundColor = overlayBgColorStart;
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
  var styleCursorZoomIn = 'cursor:-webkit-zoom-in;cursor:zoom-in;';
  var styleCursorZoomOut = 'cursor:-webkit-zoom-out;cursor:zoom-out;';
  var getStyleOverlay = function (backgroundColor, transitionDuration, zIndex) {
      return styleCursorZoomOut +
          'position:fixed;' +
          'top:0;' +
          'right:0;' +
          'bottom:0;' +
          'left:0;' +
          'width:100%;' +
          'height:100%;' +
          '-webkit-transition-property:background-color;' +
          '-o-transition-property:background-color;' +
          'transition-property:background-color;' +
          ("background-color:" + backgroundColor + ";") +
          ("transition-duration:" + transitionDuration + ";") +
          'transition-timing-function:ease;' +
          ("z-index:" + zIndex + ";");
  };
  var styleVisibilityHidden = 'visibility:hidden;';
  var styleHidden = 'display:none;';
  var styleZoomed = styleCursorZoomOut +
      'position:absolute;' +
      '-webkit-transition-property:-webkit-transform;' +
      'transition-property:-webkit-transform;' +
      '-o-transition-property:transform;' +
      'transition-property:transform;' +
      'transition-property:transform,-webkit-transform;' +
      '-webkit-transform-origin:center center;' +
      '-ms-transform-origin:center center;' +
      'transform-origin:center center;';
  var styleZoomStart = styleZoomed + styleVisibilityHidden;
  var getZoomImgStyleStr = function (height, width, left, top, transform, transitionDuration) {
      return styleZoomed +
          ("height:" + height + "px;") +
          ("width:" + width + "px;") +
          ("left:" + left + "px;") +
          ("top:" + top + "px;") +
          ("-webkit-transform:" + transform + ";") +
          ("transform:" + transform + ";") +
          ("-webkit-transition-duration:" + transitionDuration + ";") +
          ("transition-duration:" + transitionDuration + ";") +
          'transition-timing-function:ease;';
  };
  var combineStyles = function (x, y) {
      var safeX = (x || '').trim();
      var separator = safeX.slice(-1) === ';' ? '' : ';';
      return [safeX, y].join(separator);
  };
  var getZoomImgStyle = function (transitionDuration, zoomMargin, targetEl, isImg, state) {
      if (!targetEl) {
          return getZoomImgStyleStr(0, 0, 0, 0, 'none', '0ms');
      }
      var _a = targetEl.getBoundingClientRect(), height = _a.height, left = _a.left, top = _a.top, width = _a.width;
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
  var isSelectKey = function (e) {
      return e.key === 'Enter' || e.keyCode === 13 || e.key === 'Space' || e.keyCode === 32;
  };
  var isEscapeKey = function (e) { return e.key === 'Escape' || e.keyCode === 27; };
  var uniqueId = function (prefix) {
      if (prefix === void 0) { prefix = ''; }
      return prefix.concat(Math.random().toString(16).slice(-4));
  };
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
  var createDiv = function () { return document.createElement('div'); };
  var createDescEl = function (id, text) {
      var el = createDiv();
      setAttribute(ID, id, el);
      setAttribute(DATA_RMIZ_DESC, '', el);
      setAttribute(STYLE, styleHidden, el);
      setTextContent(text, el);
      return el;
  };
  var focus = function (el) {
      el.focus({ preventScroll: true });
  };
  var addEventListener = function (type, cb, el) {
      el.addEventListener(type, cb);
  };
  var removeEventListener = function (type, handler, el) {
      el.removeEventListener(type, handler);
  };
  var getAttribute = function (attr, el) { return el.getAttribute(attr); };
  var removeAttribute = function (attr, el) { return el.removeAttribute(attr); };
  var setAttribute = function (attr, value, el) {
      return el.setAttribute(attr, value);
  };
  var setTextContent = function (text, el) { return (el.textContent = text); };

  return ImageZoom;

}());
