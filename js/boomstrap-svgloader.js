(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['boomstrapSvgLoader'], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.boomstrapSvgLoader = factory();
  }
}(this, function() {
  'use strict';
  function loadSvg(url) {
    var ajax = new XMLHttpRequest();
    ajax.open("GET", url, true);
    ajax.send();
    ajax.onload = function(e) {
      var div = document.createElement("div");
      div.style.cssText = 'display: none;';
      div.innerHTML = ajax.responseText;
      document.body.insertBefore(div, document.body.childNodes[0]);
    }
  }
  return {
    loadSvg: loadSvg
  };
}));