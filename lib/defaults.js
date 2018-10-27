'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var transitionDuration = 300;

var defaults = {
  errors: {
    controlled: 'A component is changing a react-medium-image-zoom component from a controlled component to an uncontrolled one. ImageZoom elements should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled image zoom element for the lifetime of the component.',
    uncontrolled: 'A component is changing a react-medium-image-zoom component from an uncontrolled component to a controlled one. ImageZoom elements should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled image zoom element for the lifetime of the component.'
  },
  styles: {
    image: {
      cursor: 'zoom-in'
    },
    zoomImage: {
      cursor: 'zoom-out',
      position: 'absolute',
      transition: 'transform ' + transitionDuration + 'ms',
      transform: 'translate3d(0, 0, 0) scale(1)',
      transformOrigin: 'center center',
      willChange: 'transform, top, left'
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
      transition: 'opacity ' + transitionDuration + 'ms'
    }
  },
  transitionDuration: transitionDuration
};

exports.default = defaults;