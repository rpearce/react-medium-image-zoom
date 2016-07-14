export default {
  styles: {
    image: {
    },
    zoomImage: {
      position   : 'absolute',
      transition : 'all 300ms',
      transform  : 'translate3d(0, 0, 0)'
    },
    zoomContainer: {
      position        : 'fixed',
      top             : 0,
      right           : 0,
      bottom          : 0,
      left            : 0,
      zIndex          : 999,
    },
    overlay: {
      position        : 'absolute',
      top             : 0,
      right           : 0,
      bottom          : 0,
      left            : 0,
      backgroundColor : '#fff',
      opacity         : 0,
      transition      : 'opacity 300ms'
    }
  }
}
