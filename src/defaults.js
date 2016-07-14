export default {
  styles: {
    image: {
    },
    zoomImage: {
      position        : 'fixed',
      zIndex          : 999,
      transition      : 'all 300ms',
      scale           : 1
    },
    overlay: {
      position        : 'fixed',
      top             : 0,
      right           : 0,
      bottom          : 0,
      left            : 0,
      backgroundColor : '#fff',
      zIndex          : 998,
      opacity         : 1,
      transition      : 'opacity 300ms'
    }
  }
}
