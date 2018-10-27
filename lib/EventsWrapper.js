'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _propTypes = require('prop-types');

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _helpers = require('./helpers');

var _keyboardEvents = require('./keyboardEvents');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventsWrapper = function (_Component) {
  _inherits(EventsWrapper, _Component);

  function EventsWrapper() {
    _classCallCheck(this, EventsWrapper);

    var _this = _possibleConstructorReturn(this, (EventsWrapper.__proto__ || Object.getPrototypeOf(EventsWrapper)).call(this));

    _this.portal = (0, _helpers.createPortalContainer)('div');
    _this.unzoom = _this.unzoom.bind(_this);
    _this._handleScroll = _this._handleScroll.bind(_this);
    _this._handleKeyDown = _this._handleKeyDown.bind(_this);
    _this._handleResize = _this._handleResize.bind(_this);
    _this._handleTouchStart = _this._handleTouchStart.bind(_this);
    _this._handleTouchMove = _this._handleTouchMove.bind(_this);
    _this._handleTouchEnd = _this._handleTouchEnd.bind(_this);
    return _this;
  }

  _createClass(EventsWrapper, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.pageYOffset = window.pageYOffset;
      this.loadTimeout = setTimeout(function () {
        window.addEventListener('scroll', _this2._handleScroll);
        window.addEventListener('keydown', _this2._handleKeyDown);
        window.addEventListener('ontouchstart', _this2._handleTouchStart);
        window.addEventListener('ontouchmove', _this2._handleTouchMove);
        window.addEventListener('ontouchend', _this2._handleTouchEnd);
        window.addEventListener('ontouchcancel', _this2._handleTouchEnd);
        window.addEventListener('resize', _this2._handleResize);
      }, _defaults2.default.transitionDuration);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.loadTimeout);
      window.removeEventListener('scroll', this._handleScroll);
      window.removeEventListener('keydown', this._handleKeyDown);
      window.removeEventListener('ontouchstart', this._handleTouchStart);
      window.removeEventListener('ontouchmove', this._handleTouchMove);
      window.removeEventListener('ontouchend', this._handleTouchEnd);
      window.removeEventListener('ontouchcancel', this._handleTouchEnd);
      window.removeEventListener('resize', this._handleResize);
      (0, _helpers.removePortalContainer)(this.portal);
    }
  }, {
    key: 'render',
    value: function render() {
      return this.portal ? (0, _reactDom.createPortal)(_react2.default.createElement(
        'div',
        { onClick: this.unzoom },
        this._cloneChild()
      ), this.portal) : null;
    }
  }, {
    key: 'unzoom',
    value: function unzoom() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          force = _ref.force,
          allowRefocus = _ref.allowRefocus;

      if (this.props.controlledEventFn && !force) {
        return this.props.controlledEventFn();
      }

      return this.child.unzoom(allowRefocus);
    }
  }, {
    key: '_cloneChild',
    value: function _cloneChild() {
      var _this3 = this;

      return _react2.default.cloneElement(_react2.default.Children.only(this.props.children), {
        ref: function ref(child) {
          _this3.child = child;
        }
      });
    }
  }, {
    key: '_handleKeyDown',
    value: function _handleKeyDown(e) {
      if ((0, _keyboardEvents.isTabKey)(e)) {
        e.preventDefault(); // prevent in-behind controls from grabbing focus
        return;
      }

      var allowAccessibilityClose = this.props.allowAccessibilityClose;

      var unzoomForEnterOrSpace = allowAccessibilityClose && (0, _keyboardEvents.isEnterOrSpaceBarKey)(e);
      var unzoomForEscape = (0, _keyboardEvents.isEscapeKey)(e);

      if (unzoomForEnterOrSpace) {
        e.preventDefault(); // prevent space bar from scrolling
      }

      if (unzoomForEnterOrSpace || unzoomForEscape) {
        this.unzoom({ allowRefocus: true });
      }
    }
  }, {
    key: '_handleResize',
    value: function _handleResize() {
      this.forceUpdate();
    }
  }, {
    key: '_handleScroll',
    value: function _handleScroll() {
      this.forceUpdate();
      var scrollChange = Math.abs(window.pageYOffset - this.pageYOffset);
      if (scrollChange > 10) {
        this.unzoom();
      }
    }
  }, {
    key: '_handleTouchStart',
    value: function _handleTouchStart(e) {
      this.yTouchPosition = e.touches[0].clientY;
    }
  }, {
    key: '_handleTouchMove',
    value: function _handleTouchMove(e) {
      this.forceUpdate();
      var touchChange = Math.abs(e.touches[0].clientY - this.yTouchPosition);
      if (touchChange > 10) {
        this.unzoom();
      }
    }
  }, {
    key: '_handleTouchEnd',
    value: function _handleTouchEnd() {
      delete this.yTouchPosition;
    }
  }]);

  return EventsWrapper;
}(_react.Component);

exports.default = EventsWrapper;


EventsWrapper.propTypes = {
  children: _propTypes.element.isRequired,
  getControlledEventFn: _propTypes.func
};