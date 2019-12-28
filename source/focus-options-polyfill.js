/* eslint-disable */

export default function () {
  // Credit: https://github.com/calvellido/focus-options-polyfill

  // focus - focusOptions - preventScroll polyfill
  var supportsPreventScrollOption = false;
  try {
    var focusElem = document.createElement('div');
    focusElem.addEventListener('focus', function(event) {
      event.preventDefault();
      event.stopPropagation();
    }, true);
    // document.documentElement.focus(
    focusElem.focus(
      Object.defineProperty({}, 'preventScroll', { get: function () {
        supportsPreventScrollOption = true;
      }})
    );
  } catch(e) {}

  if (HTMLElement.prototype.nativeFocus === undefined && !supportsPreventScrollOption) {

    HTMLElement.prototype.nativeFocus = HTMLElement.prototype.focus;

    var patchedFocus = function (args) {
      var actualPosition = window.scrollY || window.pageYOffset;
      this.nativeFocus();
      if (args && args.preventScroll) {
        // Hijacking the event loop order, since the focus() will trigger
        // internally an scroll that goes to the event loop
        setTimeout(function() {
          window.scroll((window.scrollX || window.pageXOffset), actualPosition);
        }, 0);
      }
    }

    HTMLElement.prototype.focus = patchedFocus;

  }
}
