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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Overlay = function (_Component) {
  _inherits(Overlay, _Component);

  function Overlay(props) {
    _classCallCheck(this, Overlay);

    var _this = _possibleConstructorReturn(this, (Overlay.__proto__ || Object.getPrototypeOf(Overlay)).call(this, props));

    _this.state = {
      isVisible: false
    };
    return _this;
  }

  _createClass(Overlay, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ isVisible: true });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!nextProps.isVisible) this.setState({ isVisible: false });
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return this.props.isVisible !== nextProps.isVisible || this.state.isVisible !== nextProps.isVisible;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { style: this._getStyle() });
    }
  }, {
    key: '_getStyle',
    value: function _getStyle() {
      var opacity = this.state.isVisible & 1; // bitwise and; converts bool to 0 or 1
      return _extends({}, _defaults2.default.styles.overlay, { opacity: opacity }, this.props.defaultStyles.overlay);
    }
  }]);

  return Overlay;
}(_react.Component);

exports.default = Overlay;


Overlay.propTypes = {
  isVisible: _propTypes.bool.isRequired,
  defaultStyles: _propTypes.object.isRequired
};