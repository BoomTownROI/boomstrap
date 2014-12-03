/*! BoomQueries 0.0.3 | http://boomtownroi.github.io/boomqueries/ | (c) 2014 BoomTown | MIT License */
(function (global, boomQueries) {
  if(typeof define === 'function' && define.amd) {
    define(['boomQueries'], boomQueries);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = boomQueries();
  } else {
    window.boomQueries = boomQueries();
  }
}(window, function() {
  'use strict';

  var boomQueriesComponents = {};
  var elementKey = 0;

  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  function add(nameOrObject, descriptor) {
    var key;
    if (typeof nameOrObject === 'string') {
      key = nameOrObject;
      boomQueriesComponents[nameOrObject] = descriptor;
    } else {
      key = elementKey++;
      boomQueriesComponents[key] = nameOrObject;
    }
    return key;
  }

  function remove(key) {
    delete boomQueriesComponents[key];
  }

  function calculateElements() {
    var componentKeys = Object.keys(boomQueriesComponents);

    var currentComponent;
    var $elements;

    function calculateElement(element, i) {
      if (element.offsetParent !== null) {
        var componentBreaksCounter = currentComponent.breaks.length,
        currentWidth = element.offsetWidth,
        currentBreak = -1;

        while (componentBreaksCounter--) {
          if(currentWidth >= currentComponent.breaks[componentBreaksCounter][0]) {
            currentBreak++;
          }
          element.classList.remove(currentComponent.breaks[componentBreaksCounter][1]);
        }

        if (currentBreak >= 0) {
          element.classList.add(currentComponent.breaks[currentBreak][1]);
        }
      }
    }

    componentKeys.forEach(function(key) {
      currentComponent = boomQueriesComponents[key];
      if (currentComponent.selector) {
        $elements = document.querySelectorAll(currentComponent.selector);
      } else if (currentComponent.element) {
        $elements = [currentComponent.element];
      }
      Array.prototype.forEach.call($elements, calculateElement);
    });
  }

  window.addEventListener('load',   calculateElements);
  window.addEventListener('resize', debounce(calculateElements, 100), false);

  return {
    add:       add,
    remove:    remove,
    calculate: calculateElements
  };
}));
