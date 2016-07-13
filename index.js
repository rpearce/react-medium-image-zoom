'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var shape = _react.PropTypes.shape;
var string = _react.PropTypes.string;

//<ImageZoom
//  image={{
//    src="",
//    alt="",
//    className=""
//  }}
//  zoomImage={{
//    src="",
//    alt="",
//    className=""
//  }}
///>

var ImageZoom = function (_Component) {
  _inherits(ImageZoom, _Component);

  function ImageZoom(props) {
    _classCallCheck(this, ImageZoom);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ImageZoom).call(this, props));

    _this.state = {
      isZoomed: false
    };

    _this.zoom = _this.zoom.bind(_this);
    _this.unzoom = _this.unzoom.bind(_this);
    _this.addScrollListener = _this.addScrollListener.bind(_this);
    _this.removeScrollListener = _this.removeScrollListener.bind(_this);
    _this.handleScroll = _this.handleScroll.bind(_this);
    return _this;
  }

  _createClass(ImageZoom, [{
    key: 'render',
    value: function render() {
      return this.state.isZoomed ? renderZoomed : renderUnzoomed;
    }
  }, {
    key: 'renderZoomed',
    value: function renderZoomed() {}
  }, {
    key: 'renderUnzoomed',
    value: function renderUnzoomed() {
      return _react2.default.createElement('img', {
        src: this.props.src,
        alt: this.props.alt,
        className: this.props.className,
        onClick: this.zoom
      });
    }
  }, {
    key: 'zoom',
    value: function zoom() {
      console.log('ZOOM');
      this.setState({ isZoomed: true }, this.addScrollListener);
    }
  }, {
    key: 'unzoom',
    value: function unzoom() {
      this.setState({ isZoomed: false }, this.removeScrollListener);
    }
  }, {
    key: 'addScrollListener',
    value: function addScrollListener() {
      this.scrollPosition = window.pageYOffset;
      window.addEventListener('scroll', this.handleScroll);
    }
  }, {
    key: 'removeScrollListener',
    value: function removeScrollListener() {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll() {
      var scrollChange = Math.abs(window.pageYOffset - this.scrollPosition);
      if (scrollChange > 30) {
        this.scrollPosition = undefined;
        this.unzoom();
      }
    }
  }], [{
    key: 'propTypes',
    get: function get() {
      return {
        image: shape({
          src: string.isRequired,
          alt: string,
          className: string
        }).isRequired,
        zoomImage: shape({
          src: string.isRequired,
          alt: string,
          className: string
        }).isRequired
      };
    }
  }]);

  return ImageZoom;
}(_react.Component);
