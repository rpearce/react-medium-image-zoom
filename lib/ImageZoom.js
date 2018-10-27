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

var _keyboardEvents = require('./keyboardEvents');

var _EventsWrapper = require('./EventsWrapper');

var _EventsWrapper2 = _interopRequireDefault(_EventsWrapper);

var _Zoom = require('./Zoom');

var _Zoom2 = _interopRequireDefault(_Zoom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isControlled = function isControlled(isZoomed) {
  return isZoomed !== null && isZoomed !== undefined;
};
var focusableTabIndex = 0;
var unfocusableTabIndex = -1;

var ImageZoom = function (_Component) {
  _inherits(ImageZoom, _Component);

  function ImageZoom(props) {
    _classCallCheck(this, ImageZoom);

    var _this = _possibleConstructorReturn(this, (ImageZoom.__proto__ || Object.getPrototypeOf(ImageZoom)).call(this, props));

    _this.state = {
      isDisabled: false,
      isZoomed: false,
      src: props.image.src
    };

    _this._handleKeyDown = _this._handleKeyDown.bind(_this);
    _this._handleLoad = _this._handleLoad.bind(_this);
    _this._handleLoadError = _this._handleLoadError.bind(_this);
    _this._handleUnzoom = _this._handleUnzoom.bind(_this);
    _this._handleZoom = _this._handleZoom.bind(_this);
    return _this;
  }

  _createClass(ImageZoom, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!isControlled(this.props.isZoomed) && isControlled(nextProps.isZoomed)) {
        throw new Error(_defaults2.default.errors.uncontrolled);
      } else if (isControlled(this.props.isZoomed) && !isControlled(nextProps.isZoomed)) {
        throw new Error(_defaults2.default.errors.controlled);
      }

      /**
       * When component is controlled, we need a flag
       * set when it's about to close in order to keep
       * hiding the original image on the page until the
       * unzooming is complete
       */
      if (this.props.isZoomed && !nextProps.isZoomed) {
        this.isClosing = true;
      }

      var src = this.props.image.src;
      var nextSrc = nextProps.image.src;

      // If the consumer wants to change the image's src, then so be it.

      if (src !== nextSrc) {
        this.setState({ src: nextSrc });
      }
    }

    /**
     * When the component's state updates, check for changes
     * and either zoom or start the unzoom procedure.
     * NOTE: We need to differentiate whether this is a
     * controlled or uncontrolled component and do the check
     * based off of that.
     */

  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var prevIsZoomed = isControlled(prevProps.isZoomed) ? prevProps.isZoomed : prevState.isZoomed;
      var isZoomed = isControlled(this.props.isZoomed) ? this.props.isZoomed : this.state.isZoomed;
      if (prevIsZoomed !== isZoomed && !isZoomed && this.portalInstance) {
        this.portalInstance.unzoom({ force: true });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          defaultStyles = _props.defaultStyles,
          image = _props.image,
          propsIsZoomed = _props.isZoomed,
          shouldRespectMaxDimension = _props.shouldRespectMaxDimension,
          zoomImage = _props.zoomImage,
          zoomMargin = _props.zoomMargin,
          _state = this.state,
          isDisabled = _state.isDisabled,
          stateIsZoomed = _state.isZoomed,
          src = _state.src;

      /**
       * Take whatever attributes you want to pass the image
       * and then override with the properties we need,
       * including using state as source of truth for hi/low-res
       * version img src.
       * Also, disable any clicking if the component is
       * already at its maximum dimensions.
       */

      var attrs = _extends({}, !isDisabled && { tabIndex: focusableTabIndex }, image, { src: src, style: this._getImageStyle() }, !isDisabled && {
        onMouseDown: this._preventFocus,
        onClick: this._handleZoom,
        onKeyDown: this._handleKeyDown
      });
      var isZoomed = isControlled(propsIsZoomed) ? propsIsZoomed : stateIsZoomed;

      return [_react2.default.createElement('img', _extends({}, attrs, {
        key: 'image',
        ref: function ref(x) {
          _this2.image = x;
        },
        onLoad: this._handleLoad,
        onError: this._handleLoadError
      })), this.image && (isZoomed || this.isClosing) ? _react2.default.createElement(
        _EventsWrapper2.default,
        {
          key: 'portal',
          ref: function ref(node) {
            _this2.portalInstance = node;
          },
          controlledEventFn: this._getControlledEventFn(),
          allowAccessibilityClose: this._allowTabNavigation()
        },
        _react2.default.createElement(_Zoom2.default, {
          defaultStyles: defaultStyles,
          image: this.image,
          shouldRespectMaxDimension: shouldRespectMaxDimension,
          zoomImage: zoomImage,
          zoomMargin: Number(zoomMargin),
          onUnzoom: this._handleUnzoom
        })
      ) : null];
    }

    /**
     * If the image should not exceed its original
     * dimensions AND there is no zoomImage AND the
     * image is already rendered at its maximum dimensions,
     * then we shouldn't try to zoom it at all. We currently
     * only do this on componentDidMount, though on window
     * resize could be something to consider if necessary.
     */

  }, {
    key: '_checkShouldDisableComponent',
    value: function _checkShouldDisableComponent() {
      var _props2 = this.props,
          shouldRespectMaxDimension = _props2.shouldRespectMaxDimension,
          zoomImage = _props2.zoomImage;

      var isDisabled = shouldRespectMaxDimension && !zoomImage && (0, _helpers.isMaxDimension)(this.image);

      this.setState({ isDisabled: isDisabled });
    }
  }, {
    key: '_getImageStyle',
    value: function _getImageStyle() {
      var isClosing = this.isClosing,
          _props3 = this.props,
          defaultStyles = _props3.defaultStyles,
          image = _props3.image,
          isZoomedP = _props3.isZoomed,
          _state2 = this.state,
          isDisabled = _state2.isDisabled,
          isZoomedSt = _state2.isZoomed;


      var isHidden = isZoomedSt || isZoomedP || isClosing;

      return _extends({}, _defaults2.default.styles.image, isHidden && { visibility: 'hidden' }, defaultStyles.image, image.style, isDisabled && { cursor: 'inherit' });
    }

    /**
     * We need to wait for the main image
     * to load before we can do any width/height
     * checks on it.
     */

  }, {
    key: '_handleLoad',
    value: function _handleLoad(e) {
      this._checkShouldDisableComponent();

      var cb = this.props.image.onLoad || Function.prototype;
      cb(e);
    }
  }, {
    key: '_handleLoadError',
    value: function _handleLoadError(e) {
      this.setState({ isDisabled: true });

      var cb = this.props.image.onError || Function.prototype;
      cb(e);
    }
  }, {
    key: '_handleKeyDown',
    value: function _handleKeyDown(e) {
      if ((0, _keyboardEvents.isEnterOrSpaceBarKey)(e)) {
        e.preventDefault();
        this._handleZoom(e);
      }
    }
  }, {
    key: '_preventFocus',
    value: function _preventFocus(e) {
      e.preventDefault();
    }
  }, {
    key: '_handleZoom',
    value: function _handleZoom(e) {
      if (!isControlled(this.props.isZoomed) && this.props.shouldHandleZoom(e)) {
        this.setState({ isZoomed: true }, this.props.onZoom);
      } else {
        this.props.onZoom();
      }
    }

    /**
     * This gets passed to the zoomed component as a callback
     * to trigger when the time is right to shut down the zoom.
     * If `shouldReplaceImage`, update the normal image we're showing
     * with the zoomed image -- useful when wanting to replace a low-res
     * image with a high-res one once it's already been downloaded.
     * It also cleans up the zoom references and then updates state.
     */

  }, {
    key: '_handleUnzoom',
    value: function _handleUnzoom(src, allowRefocus) {
      var _this3 = this;

      return function () {
        var changes = _extends({ isZoomed: false }, _this3.props.shouldReplaceImage && { src: src });

        /**
         * Lamentable but necessary right now in order to
         * remove the portal instance before the next
         * `componentDidUpdate` check for the portalInstance.
         * The reasoning is so we can differentiate between an
         * external `isZoomed` command and an internal one.
         */
        delete _this3.isClosing;

        _this3.setState(changes, _this3.props.onUnzoom);

        if (allowRefocus && _this3._allowTabNavigation()) {
          _this3.image.focus();
        }
      };
    }
  }, {
    key: '_getControlledEventFn',
    value: function _getControlledEventFn() {
      return isControlled(this.props.isZoomed) ? this.props.onUnzoom : null;
    }
  }, {
    key: '_allowTabNavigation',
    value: function _allowTabNavigation() {
      return this.image.tabIndex !== unfocusableTabIndex;
    }
  }], [{
    key: 'defaultProps',
    get: function get() {
      return {
        shouldReplaceImage: true,
        shouldRespectMaxDimension: false,
        zoomMargin: 40,
        defaultStyles: {
          zoomContainer: {},
          overlay: {},
          image: {},
          zoomImage: {}
        },
        shouldHandleZoom: function shouldHandleZoom() {
          return true;
        },
        onZoom: function onZoom() {},
        onUnzoom: function onUnzoom() {}
      };
    }
  }]);

  return ImageZoom;
}(_react.Component);

exports.default = ImageZoom;


ImageZoom.propTypes = {
  image: (0, _propTypes.shape)({
    src: _propTypes.string.isRequired,
    alt: _propTypes.string,
    className: _propTypes.string,
    style: _propTypes.object
  }).isRequired,
  zoomImage: (0, _propTypes.shape)({
    src: _propTypes.string,
    alt: _propTypes.string,
    className: _propTypes.string,
    style: _propTypes.object
  }),
  defaultStyles: _propTypes.object,
  isZoomed: _propTypes.bool,
  shouldHandleZoom: _propTypes.func,
  shouldReplaceImage: _propTypes.bool,
  shouldRespectMaxDimension: _propTypes.bool,
  onZoom: _propTypes.func,
  onUnzoom: _propTypes.func
};