'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _helpers = require('./helpers');

var _Overlay = require('./Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The `tmpSrc` and `TmpImg` code here is a workaround
 * for a longstanding Firefox issue where replacing the
 * `src` of an `<img>` tag requires calculations and
 * results in a "flicker" of sorts.
 *
 * See https://github.com/rpearce/react-medium-image-zoom/issues/96
 * for further details.
 */

var Zoom = function (_Component) {
  _inherits(Zoom, _Component);

  function Zoom(props) {
    _classCallCheck(this, Zoom);

    var _this = _possibleConstructorReturn(this, (Zoom.__proto__ || Object.getPrototypeOf(Zoom)).call(this, props));

    _this.state = {
      hasLoaded: false,
      isZoomed: true,
      src: props.image.currentSrc || props.image.src,
      tmpSrc: null,
      cross: false
    };

    _this.unzoom = _this.unzoom.bind(_this);
    _this._handleImageLoad = _this._handleImageLoad.bind(_this);
    return _this;
  }

  _createClass(Zoom, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props$zoomImage = this.props.zoomImage,
          src = _props$zoomImage.src,
          srcSet = _props$zoomImage.srcSet;


      this.setState({ hasLoaded: true });

      setTimeout(function () {
        _this2.setState({ cross: true });
      }, 200);

      if (src || srcSet) {
        (0, _helpers.fetchImage)(this.props.zoomImage, this._handleImageLoad);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _this3 = this;

      // If we have a `tmpSrc`, wait and then give it to `src`
      if (!prevState.tmpSrc && this.state.tmpSrc) {
        setTimeout(function () {
          _this3.setState({ src: _this3.state.tmpSrc, tmpSrc: null });
        }, 100);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          defaultStyles = _props.defaultStyles,
          zoomImage = _props.zoomImage,
          _state = this.state,
          tmpSrc = _state.tmpSrc,
          isZoomed = _state.isZoomed,
          src = _state.src;


      var style = this._getZoomImageStyle();

      return _react2.default.createElement(
        'div',
        { style: this._getZoomContainerStyle() },
        this.state.cross && _react2.default.createElement(
          'div',
          {
            style: {
              position: 'absolute',
              zIndex: '999',
              top: '10px',
              right: '10px',
              overflow: 'hidden',
              cursor: 'pointer',
              width: '40px',
              opacity: this.state.cross ? 1 : 0,
              transition: 'opacity 1s ease-in-out'
            } },
          _react2.default.createElement(
            'svg',
            { stroke: 'black' },
            _react2.default.createElement('path', { 'stroke-width': '2', d: 'M 10,10 L 30,30 M 30,10 L 10,30' })
          )
        ),
        _react2.default.createElement(_Overlay2.default, { isVisible: isZoomed, defaultStyles: defaultStyles }),
        _react2.default.createElement('img', _extends({}, zoomImage, { src: src, style: style })),
        _react2.default.createElement(TmpImg, _extends({}, zoomImage, { src: tmpSrc, style: style }))
      );
    }
  }, {
    key: 'unzoom',
    value: function unzoom(allowRefocus) {
      this.setState({ cross: false });
      var onUnzoom = this.props.onUnzoom(this.state.src, allowRefocus);
      this.setState({ isZoomed: false }, function () {
        return setTimeout(onUnzoom, _defaults2.default.transitionDuration);
      });
    }
  }, {
    key: '_handleImageLoad',
    value: function _handleImageLoad(img) {
      // Only set state if component is still mounted
      if (this.state.isZoomed) {
        this.setState({ tmpSrc: img.currentSrc || img.src });
      }
    }
  }, {
    key: '_getZoomContainerStyle',
    value: function _getZoomContainerStyle() {
      return _extends({}, _defaults2.default.styles.zoomContainer, this.props.defaultStyles.zoomContainer);
    }
  }, {
    key: '_getZoomImageStyle',
    value: function _getZoomImageStyle() {
      var _props2 = this.props,
          image = _props2.image,
          shouldRespectMaxDimension = _props2.shouldRespectMaxDimension,
          src = _props2.src,
          zoomMargin = _props2.zoomMargin;

      var imageOffset = image.getBoundingClientRect();

      var top = imageOffset.top,
          left = imageOffset.left;
      var width = image.width,
          height = image.height,
          naturalWidth = image.naturalWidth,
          naturalHeight = image.naturalHeight;


      var style = { top: top, left: left, width: width, height: height };

      if (!this.state.hasLoaded || !this.state.isZoomed) {
        return _extends({}, _defaults2.default.styles.zoomImage, this.props.defaultStyles.zoomImage, this.props.style, style);
      }

      // Get the the coords for center of the viewport
      var viewportX = document.body.clientWidth / 2;
      var viewportY = window.innerHeight / 2;

      // Get the coords for center of the original image
      var imageCenterX = imageOffset.left + width / 2;
      var imageCenterY = imageOffset.top + height / 2;

      // Get offset amounts for image coords to be centered on screen
      var translateX = viewportX - imageCenterX;
      var translateY = viewportY - imageCenterY;

      // Figure out how much to scale the image
      var scale = shouldRespectMaxDimension && !src ? (0, _helpers.getMaxDimensionScale)({
        width: width,
        height: height,
        naturalWidth: naturalWidth,
        naturalHeight: naturalHeight,
        zoomMargin: zoomMargin
      }) : (0, _helpers.getScale)({ width: width, height: height, zoomMargin: zoomMargin });

      var zoomStyle = {
        transform: 'translate3d(0px, ' + translateY + 'px, 0) scale(' + scale + ')'
      };

      return _extends({}, _defaults2.default.styles.zoomImage, this.props.defaultStyles.zoomImage, this.props.style, style, zoomStyle);
    }
  }], [{
    key: 'defaultProps',
    get: function get() {
      return {
        zoomImage: {}
      };
    }
  }]);

  return Zoom;
}(_react.Component);

exports.default = Zoom;


Zoom.propTypes = {
  defaultStyles: _propTypes.object.isRequired,
  image: _propTypes.object.isRequired,
  shouldRespectMaxDimension: _propTypes.bool,
  zoomImage: (0, _propTypes.shape)({
    src: _propTypes.string,
    alt: _propTypes.string,
    className: _propTypes.string,
    style: _propTypes.object
  }).isRequired,
  zoomMargin: _propTypes.number.isRequired,
  onUnzoom: _propTypes.func.isRequired
};

var TmpImg = function TmpImg(_ref) {
  var src = _ref.src,
      style = _ref.style,
      props = _objectWithoutProperties(_ref, ['src', 'style']);

  return src ? _react2.default.createElement('img', _extends({}, props, { src: src, style: getTmpStyle(style) })) : null;
};

var tmpStyle = {
  position: 'fixed',
  visibility: 'hidden'
};

var getTmpStyle = function getTmpStyle(style) {
  return _extends({}, style, tmpStyle);
};