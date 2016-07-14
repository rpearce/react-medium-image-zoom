'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _Zoom = require('./Zoom');

var _Zoom2 = _interopRequireDefault(_Zoom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var shape = _react.PropTypes.shape;
var string = _react.PropTypes.string;
var object = _react.PropTypes.object;

var ImageZoom = function (_Component) {
  _inherits(ImageZoom, _Component);

  function ImageZoom(props) {
    _classCallCheck(this, ImageZoom);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ImageZoom).call(this, props));

    _this.state = {
      isZoomed: false
    };

    _this.handleZoom = _this.handleZoom.bind(_this);
    _this.handleUnzoom = _this.handleUnzoom.bind(_this);
    return _this;
  }

  _createClass(ImageZoom, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.portal = document.createElement('div');
      document.body.appendChild(this.portal);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.body.removeChild(this.portal);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.isZoomed !== this.state.isZoomed) {
        this.state.isZoomed ? this.renderZoomed() : this.removeZoomed();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('img', {
        src: this.props.image.src,
        alt: this.props.image.alt,
        className: this.props.image.className,
        style: this.getImageStyle(),
        onClick: this.handleZoom
      });
    }
  }, {
    key: 'renderZoomed',
    value: function renderZoomed() {
      var image = _reactDom2.default.findDOMNode(this);

      _reactDom2.default.render(_react2.default.createElement(_Zoom2.default, _extends({}, this.props.zoomImage, {
        image: image,
        onClick: this.handleUnzoom
      })), this.portal);
    }
  }, {
    key: 'removeZoomed',
    value: function removeZoomed() {
      if (this.portal) _reactDom2.default.unmountComponentAtNode(this.portal);
    }
  }, {
    key: 'getImageStyle',
    value: function getImageStyle() {
      var style = {};
      if (this.state.isZoomed) style.visibility = 'hidden';
      return Object.assign({}, _defaults2.default.styles.image, style, this.props.image.style);
    }
  }, {
    key: 'handleZoom',
    value: function handleZoom() {
      this.setState({ isZoomed: true });
    }
  }, {
    key: 'handleUnzoom',
    value: function handleUnzoom() {
      this.setState({ isZoomed: false });
    }
  }]);

  return ImageZoom;
}(_react.Component);

ImageZoom.propTypes = {
  image: shape({
    src: string.isRequired,
    alt: string,
    className: string,
    style: object
  }).isRequired,
  zoomImage: shape({
    src: string.isRequired,
    alt: string,
    className: string,
    style: object
  })
};

exports.default = ImageZoom;
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Overlay).call(this, props));

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
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.props.isVisible !== nextProps.isVisible || this.state.isVisible !== nextProps.isVisible;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { style: this.getStyle() });
    }
  }, {
    key: 'getStyle',
    value: function getStyle() {
      var opacity = this.state.isVisible & 1; // bitwise and; converts bool to 0 or 1
      return Object.assign({}, _defaults2.default.styles.overlay, { opacity: opacity });
    }
  }]);

  return Overlay;
}(_react.Component);

Overlay.propTypes = {
  isVisible: _react.PropTypes.bool.isRequired
};

exports.default = Overlay;
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Overlay = require('./Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var string = _react.PropTypes.string;
var object = _react.PropTypes.object;

var Zoom = function (_Component) {
  _inherits(Zoom, _Component);

  function Zoom(props) {
    _classCallCheck(this, Zoom);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Zoom).call(this, props));

    _this.state = {
      hasLoaded: false,
      isZoomed: true,
      src: _this.props.image.src
    };

    _this.handleUnzoom = _this.handleUnzoom.bind(_this);
    _this.handleScroll = _this.handleScroll.bind(_this);
    _this.handleTouchStart = _this.handleTouchStart.bind(_this);
    _this.handleTouchMove = _this.handleTouchMove.bind(_this);
    _this.handleTouchEnd = _this.handleTouchEnd.bind(_this);
    return _this;
  }

  _createClass(Zoom, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ hasLoaded: true });
      if (this.props.src) this.fetchZoomImage();
      this.addListeners();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.removeListeners();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { onClick: this.handleUnzoom, style: _defaults2.default.styles.zoomContainer },
        _react2.default.createElement(_Overlay2.default, { isVisible: this.state.isZoomed }),
        _react2.default.createElement('img', {
          ref: 'zoomImage',
          src: this.state.src,
          alt: this.props.alt,
          className: this.props.className,
          style: this.getZoomImageStyle()
        })
      );
    }
  }, {
    key: 'fetchZoomImage',
    value: function fetchZoomImage() {
      var _this2 = this;

      var src = this.props.src;

      var img = new Image();
      img.src = src;
      img.onload = function () {
        return _this2.setState({ hasLoaded: true, src: src });
      };
    }
  }, {
    key: 'addListeners',
    value: function addListeners() {
      this.scrollPosition = window.pageYOffset;
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('ontouchstart', this.handleTouchStart);
      window.addEventListener('ontouchmove', this.handleTouchMove);
      window.addEventListener('ontouchend', this.handleTouchEnd);
    }
  }, {
    key: 'removeListeners',
    value: function removeListeners() {
      this.scrollPosition = undefined;
      this.yTouchPosition = undefined;
      window.removeEventListener('scroll', this.handleScroll);
      window.removeEventListener('ontouchstart', this.handleTouchStart);
      window.removeEventListener('ontouchmove', this.handleTouchMove);
      window.removeEventListener('ontouchend', this.handleTouchEnd);
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll() {
      var scrollChange = Math.abs(window.pageYOffset - this.scrollPosition);
      if (scrollChange > 30) this.handleUnzoom();
    }
  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(e) {
      this.yTouchPosition = e.touches[0].clientY;
    }
  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(e) {
      var touchChange = Math.abs(e.touches[0].clientY - this.yTouchPosition);
      if (touchChange > 10) this.handleUnzoom();
    }
  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd(e) {
      this.yTouchPosition = undefined;
    }
  }, {
    key: 'handleUnzoom',
    value: function handleUnzoom() {
      var _this3 = this;

      this.setState({ isZoomed: false }, function () {
        return setTimeout(_this3.props.onClick, 300);
      });
    }
  }, {
    key: 'getZoomImageStyle',
    value: function getZoomImageStyle() {
      var image = this.props.image;

      var imageOffset = image.getBoundingClientRect();

      var top = imageOffset.top;
      var left = imageOffset.left;
      var width = image.width;
      var height = image.height;


      var style = { top: top, left: left, width: width, height: height, transform: 'none' };

      if (!this.state.hasLoaded || !this.state.isZoomed) {
        return Object.assign({}, _defaults2.default.styles.zoomImage, this.props.style, style);
      }

      // Get the the coords for center of the viewport
      var viewportX = window.innerWidth / 2;
      var viewportY = window.innerHeight / 2;

      // Get the coords for center of the original image
      var imageCenterX = imageOffset.left + image.width / 2;
      var imageCenterY = imageOffset.top + image.height / 2;

      // Get offset amounts for image coords to be centered on screen
      var translateX = viewportX - imageCenterX;
      var translateY = viewportY - imageCenterY;

      // Figure out how much to scale the image so it doesn't overflow the screen
      var scale = this.getScale({ width: width, height: height });

      var zoomStyle = {
        transform: 'translate3d(' + translateX + 'px, ' + translateY + 'px, 0) scale(' + scale + ')'
      };

      return Object.assign({}, _defaults2.default.styles.zoomImage, this.props.style, style, zoomStyle);
    }
  }, {
    key: 'getScale',
    value: function getScale(_ref) {
      var width = _ref.width;
      var height = _ref.height;

      var totalMargin = 40;
      var scaleX = window.innerWidth / (width + totalMargin);
      var scaleY = window.innerHeight / (height + totalMargin);
      return Math.min(scaleX, scaleY);
    }
  }]);

  return Zoom;
}(_react.Component);

Zoom.propTypes = {
  src: string,
  alt: string,
  className: string,
  style: object,
  image: object.isRequired
};

exports.default = Zoom;
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  styles: {
    image: {
      cursor: 'zoom-in'
    },
    zoomImage: {
      cursor: 'zoom-out',
      position: 'absolute',
      transition: 'all 300ms',
      transform: 'translate3d(0, 0, 0)',
      transformOrigin: 'center center'
    },
    zoomContainer: {
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 999
    },
    overlay: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: '#fff',
      opacity: 0,
      transition: 'opacity 300ms'
    }
  }
};
module.exports = exports['default'];
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ImageZoom = require('../ImageZoom');

var _ImageZoom2 = _interopRequireDefault(_ImageZoom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(App).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(
          'h1',
          null,
          'Image Zoom'
        ),
        _react2.default.createElement(
          'p',
          null,
          'Trust fund seitan chia, wolf lomo letterpress Bushwick before they sold out. Carles kogi fixie, squid twee Tonx readymade cred typewriter scenester locavore kale chips vegan organic. Meggings pug wolf Shoreditch typewriter skateboard. McSweeney\'s iPhone chillwave, food truck direct trade disrupt flannel irony tousled Cosby sweater single-origin coffee. Organic disrupt bicycle rights, tattooed messenger bag flannel craft beer fashion axe bitters. Readymade sartorial craft beer, quinoa sustainable butcher Marfa Echo Park Terry Richardson gluten-free flannel retro cred mlkshk banjo. Salvia 90\'s art party Blue Bottle, PBR&B cardigan 8-bit.'
        ),
        _react2.default.createElement(
          'p',
          null,
          'Meggings irony fashion axe, tattooed master cleanse Blue Bottle stumptown bitters authentic flannel freegan paleo letterpress ugh sriracha. Wolf PBR&B art party aesthetic meh cliche. Sartorial before they sold out deep v, aesthetic PBR&B craft beer post-ironic synth keytar pork belly skateboard pour-over. Tonx cray pug Etsy, gastropub ennui wolf ethnic Odd Future viral master cleanse skateboard banjo. Pitchfork scenester cornhole, whatever try-hard ethnic banjo +1 gastropub American Apparel vinyl skateboard Shoreditch seitan. Blue Bottle keffiyeh Austin Helvetica art party. Portland ethnic fixie, beard retro direct trade ugh scenester Tumblr readymade authentic plaid pickled hashtag biodiesel.'
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_ImageZoom2.default, {
            image: {
              src: 'bridge.jpg',
              alt: 'Golden Gate Bridge',
              className: 'img',
              style: {}
            },
            zoomImage: {
              src: 'bridge-big.jpg',
              alt: 'Golden Gate Bridge',
              className: 'img--zoomed',
              style: {}
            }
          })
        ),
        _react2.default.createElement(
          'p',
          null,
          'Thundercats freegan Truffaut, four loko twee Austin scenester lo-fi seitan High Life paleo quinoa cray. Schlitz butcher ethical Tumblr, pop-up DIY keytar ethnic iPhone PBR sriracha. Tonx direct trade bicycle rights gluten-free flexitarian asymmetrical. Whatever drinking vinegar PBR XOXO Bushwick gentrify. Cliche semiotics banjo retro squid Wes Anderson. Fashion axe dreamcatcher you probably haven\'t heard of them bicycle rights. Tote bag organic four loko ethical selfies gastropub, PBR fingerstache tattooed bicycle rights.'
        ),
        _react2.default.createElement(
          'div',
          { style: { float: 'left', margin: '0 1.5em 0 0' } },
          _react2.default.createElement(_ImageZoom2.default, {
            image: {
              src: 'nz.jpg',
              alt: 'Picture of Mt. Cook in New Zealand',
              className: 'img',
              style: {}
            },
            zoomImage: {
              src: 'nz-big.jpg',
              alt: 'Picture of Mt. Cook in New Zealand',
              className: 'img--zoomed',
              style: {}
            }
          })
        ),
        _react2.default.createElement(
          'p',
          null,
          'Ugh Portland Austin, distillery tattooed typewriter polaroid pug Banksy Neutra keffiyeh. Shoreditch mixtape wolf PBR&B, tote bag dreamcatcher literally bespoke Odd Future selfies 90\'s master cleanse vegan. Flannel tofu deep v next level pickled, authentic Etsy Shoreditch literally swag photo booth iPhone pug semiotics banjo. Bicycle rights butcher Blue Bottle, actually DIY semiotics Banksy banjo mixtape Austin pork belly post-ironic. American Apparel gastropub hashtag, McSweeney\'s master cleanse occupy High Life bitters wayfarers next level bicycle rights. Wolf chia Terry Richardson, pop-up plaid kitsch ugh. Butcher +1 Carles, swag selfies Blue Bottle viral.'
        ),
        _react2.default.createElement(
          'p',
          null,
          'Keffiyeh food truck organic letterpress leggings iPhone four loko hella pour-over occupy, Wes Anderson cray post-ironic. Neutra retro fixie gastropub +1, High Life semiotics. Vinyl distillery Etsy freegan flexitarian cliche jean shorts, Schlitz wayfarers skateboard tousled irony locavore XOXO meh. Ethnic Wes Anderson McSweeney\'s messenger bag, mixtape XOXO slow-carb cornhole aesthetic Marfa banjo Thundercats bitters. Raw denim banjo typewriter cray Tumblr, High Life single-origin coffee. 90\'s Tumblr cred, Terry Richardson occupy raw denim tofu fashion axe photo booth banh mi. Trust fund locavore Helvetica, fashion axe selvage authentic Shoreditch swag selfies stumptown +1.'
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_ImageZoom2.default, {
            image: {
              src: 'gazelle.jpg',
              alt: 'Gazelle Stomping',
              className: 'img',
              style: {}
            }
          })
        ),
        _react2.default.createElement(
          'p',
          null,
          'Scenester chambray slow-carb, trust fund biodiesel ugh bicycle rights cornhole. Gentrify messenger bag Truffaut tousled roof party pork belly leggings, photo booth jean shorts. Austin readymade PBR plaid chambray. Squid Echo Park pour-over, wayfarers forage whatever locavore typewriter artisan deep v four loko. Locavore occupy Neutra Pitchfork McSweeney\'s, wayfarers fingerstache. Actually asymmetrical drinking vinegar yr brunch biodiesel. Before they sold out sustainable readymade craft beer Portland gastropub squid Austin, roof party Thundercats chambray narwhal Bushwick pug.'
        ),
        _react2.default.createElement(
          'p',
          null,
          'Literally typewriter chillwave, bicycle rights Carles flannel wayfarers. Biodiesel farm-to-table actually, locavore keffiyeh hella shabby chic pour-over try-hard Bushwick. Sriracha American Apparel Brooklyn, synth cray stumptown blog Bushwick +1 VHS hashtag. Wolf umami Carles Marfa, 90\'s food truck Cosby sweater. Fanny pack try-hard keytar pop-up readymade, master cleanse four loko trust fund polaroid salvia. Photo booth kitsch forage chambray, Carles scenester slow-carb lomo cardigan dreamcatcher. Swag asymmetrical leggings, biodiesel Tonx shabby chic ethnic master cleanse freegan.'
        ),
        _react2.default.createElement(
          'p',
          null,
          'Raw denim Banksy shabby chic, 8-bit salvia narwhal fashion axe. Ethical Williamsburg four loko, chia kale chips distillery Shoreditch messenger bag swag iPhone Pitchfork. Viral PBR&B single-origin coffee quinoa readymade, ethical chillwave drinking vinegar gluten-free Wes Anderson kitsch Tumblr synth actually bitters. Butcher McSweeney\'s forage mlkshk kogi fingerstache. Selvage scenester butcher Shoreditch, Carles beard plaid disrupt DIY. Pug readymade selvage retro, Austin salvia vinyl master cleanse flexitarian deep v bicycle rights plaid Terry Richardson mlkshk pour-over. Trust fund try-hard banh mi Brooklyn, 90\'s Etsy kogi YOLO salvia.'
        )
      );
    }
  }]);

  return App;
}(_react.Component);

var container = document.querySelector('[data-app]');
_reactDom2.default.render(_react2.default.createElement(App, null), container);
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageZoom = undefined;

var _ImageZoom2 = require('./ImageZoom');

var _ImageZoom3 = _interopRequireDefault(_ImageZoom2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ImageZoom = _ImageZoom3.default;
