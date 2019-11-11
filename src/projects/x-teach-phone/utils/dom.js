import Vue from 'vue'
const isServer = Vue.prototype.$isServer
export const on = (function () {
  if (!isServer && document.addEventListener) {
    return function(element, event, handler) {
      if (element && event, handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on'+event, handler)
      }
    }
  }
})()

export const off = (function() {
  if (!isServer && document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent('on'+event, handler)
      }
    }
  }
})

export const once = function(el, event, fn) {
  var listener = function() {
    if (fn) {
      fn.apply(this, arguments)
    }
    off(el, event, listener)
  }
  on(el, event, listener)
}

let elementStyle = document.createElement('div').style;

let vender = (() => {
    let transformNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transform'
    };
    for (let k in transformNames) {
        if (elementStyle[transformNames[k]] !== undefined) {
            return k;
        }
    }
    return false;
})();

export function prefixStyle(style) {
    if (vender === false) {
        return false;
    }
    if (vender === 'standard') {
        return style;
    }
    return vender + style.charAt(0).toUpperCase() + style.substr(1);
}
