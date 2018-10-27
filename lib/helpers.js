'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var createPortalContainer = exports.createPortalContainer = function createPortalContainer(tag) {
  var portal = document.createElement(tag);
  document.body.appendChild(portal);
  return portal;
};

var removePortalContainer = exports.removePortalContainer = function removePortalContainer(portal) {
  document.body.removeChild(portal);
};

var fetchImage = exports.fetchImage = function fetchImage(image, cb) {
  var src = image.src,
      srcSet = image.srcSet,
      sizes = image.sizes;

  var img = new Image();
  var onLoad = function onLoad() {
    cb(img);

    /**
     * If using srcset, future resize events can trigger
     * additional onload events to fire.
     * Remove listener after first load
     */
    img.removeEventListener('load', onLoad);
  };
  img.addEventListener('load', onLoad);
  img.src = src;
  if (srcSet) img.srcset = srcSet;
  if (sizes) img.sizes = sizes;
};

/**
 * Figure out how much to scale based
 * solely on no maxing out the browser
 */
var getScale = exports.getScale = function getScale(_ref) {
  var width = _ref.width,
      height = _ref.height,
      zoomMargin = _ref.zoomMargin;

  var scaleX = window.innerWidth / (width + zoomMargin);
  var scaleY = window.innerHeight / (height + zoomMargin);
  return Math.min(scaleX, scaleY);
};

/**
 * Figure out how much to scale so you're
 * not larger than the original image
 */
var getMaxDimensionScale = exports.getMaxDimensionScale = function getMaxDimensionScale(_ref2) {
  var width = _ref2.width,
      height = _ref2.height,
      naturalWidth = _ref2.naturalWidth,
      naturalHeight = _ref2.naturalHeight,
      zoomMargin = _ref2.zoomMargin;

  var scale = getScale({
    width: naturalWidth,
    height: naturalHeight,
    zoomMargin: zoomMargin
  });
  var ratio = naturalWidth > naturalHeight ? naturalWidth / width : naturalHeight / height;
  return scale > 1 ? ratio : scale * ratio;
};

var isMaxDimension = exports.isMaxDimension = function isMaxDimension(img) {
  return img.clientWidth >= img.naturalWidth || img.clientHeight >= img.naturalHeight;
};