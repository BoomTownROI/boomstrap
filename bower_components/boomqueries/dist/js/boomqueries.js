/*! BoomQueries 0.0.4 | http://boomtownroi.github.io/boomqueries/ | (c) 2014 BoomTown | MIT License */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['boomQueries'], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.boomQueries = factory();
  }
}(this, function() {
  'use strict';

  function BoomQuery() {
    // Array of dom nodes which update their class when the window resizes
    this.nodes = [];

    // Hash of selectors with their corresponding break points
    this.map = {};

    // Dispatch our custom event when the window resizes
    window.addEventListener('resize', this.debounce(this, this.update, 100), false);
  }

  // classList.add() Polyfill
  function addClass(el, className) {
    if (el.classList)
      el.classList.add(className);
    else
      el.className += ' ' + className;
  }

  // classList.remove() Polyfill
  function removeClass(el, className) {
    if (el.classList)
      el.classList.remove(className);
    else
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }

  // Polyfill for CustomEvent
  // source: https://developer.mozilla.org/en/docs/Web/API/CustomEvent
  var CustomEvent = window.CustomEvent;
  if (typeof CustomEvent === "object") {
    CustomEvent = function ( event, params ) {
      params = params || { bubbles: false, cancelable: false, detail: undefined };
      var evt = document.createEvent( 'CustomEvent' );
      evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
      return evt;
    };
    CustomEvent.prototype = window.Event.prototype;
  }

  // Rate limit the amount of times our update method gets called on window resize
  BoomQuery.prototype.debounce = function(context, func, wait, immediate) {
    var timeout;
    return function() {
      var args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  // Called whenever we need to ensure all nodes have their proper class
  BoomQuery.prototype.update = function(options) {
    var details = {};
    // You can pass a custom object to each node when we dispatch the event
    if ( typeof options !== 'undefined' ) details.detail = options;
    var updateEvent = new CustomEvent("checkyourself", details);
    // Loop through our nodes firing a "checkyourself" event on each of them
    this.nodes.forEach(function(node) {
      node.dispatchEvent(updateEvent);
    });
  };

  // Internal function that accepts a DOM node with break points
  // Adds custom properties and a listener to the node and then stores the node in an internal array
  BoomQuery.prototype._add = function(node, breakPoints, selector) {
    // Check to ensure we aren't already tracking this node
    if ( node.breaks === undefined ) {

      // Store the break points array in the node
      node.breaks = breakPoints;

      // If we pass a selector/name, add it to the node so we can reference it later
      if ( selector !== null ) node.selector = selector;

      // Attach an event listener with functionality to update it's own class
      node.addEventListener("checkyourself", function(event) {
        // event.detail is custom object if we have one

        // Ensure we have a parent with layout to assess our offsetWidth from
        if ( this.offsetParent !== null ) {
          var componentBreaksCounter = this.breaks.length,
              currentWidth = this.offsetWidth,
              currentBreak = -1;

          while ( componentBreaksCounter-- ) {
            if ( currentWidth >= this.breaks[componentBreaksCounter][0] ) {
              currentBreak++;
            }
            removeClass(this, this.breaks[componentBreaksCounter][1]);
          }

          if ( currentBreak >= 0 ) {
            addClass(this, this.breaks[currentBreak][1]);
          }

          // Create a custom object with details of our event to pass to our callback
          var details = {
            detail: {
              'offsetWidth': currentWidth,
              'currentBreak': this.breaks[currentBreak]
            }
          };
          var completedEvent = new CustomEvent("nodeUpdated", details);

          // You can now attach an event listener to this node to catch when we have completed the event
          this.dispatchEvent(completedEvent);
        }
      });

      node.addEventListener("cleanup", function(event) {
        var self = this;
        this.breaks.forEach(function(br) {
          classListRemove(self, br[1]);
        });
      });

      // Push the node on to our stack of nodes
      this.nodes.push(node);
    }
  };

  // Internal method that accepts a css selector,
  BoomQuery.prototype._addSelector = function(selector, breakPoints) {
    // Add selector to internal map hash for refreshing
    this.map[selector] = breakPoints;

    // Loop through nodes adding them internally
    var nodes = document.querySelectorAll(selector), self = this;
    Array.prototype.forEach.call(nodes, function(node) {
      self._add(node, breakPoints, selector);
    });
  };

  // Main method for external use
  // Can add a css selector or DOM node as first par
  // Breakpoints is a multi dimensional array containing an offsetWidth int and a corresponding class name
  // Name is an optional parameter that allows you to specify or name a DOM node
  BoomQuery.prototype.add = function (selector, breakPoints, name) {
    if ( typeof selector === 'string' ) {
      this._addSelector(selector, breakPoints);
    } else {
      var id = null, self = this;
      if ( name !== 'undefined' ) id = name;
      if ( selector.constructor === Array ) {
        selector.forEach(function(node){
          self._add(node, breakPoints, id);
        });
      } else {
        this._add(selector, breakPoints, id);
      }
    }
    this.update();
  };

  // Call refresh method when new DOM elements have been added
  BoomQuery.prototype.refresh = function() {
    // First let's remove any nodes which have been removed from DOM
    this.remove();

    // Now we need to roll through css selectors and requery them to see if there are a new nodes we need to consume
    var selectors = Object.keys(this.map), self = this;
    selectors.forEach(function(selector) {
      self._addSelector(selector, self.map[selector]);
    });

    this.update();
  };

  // Internal method to stay DRY
  BoomQuery.prototype._delete = function(i) {
    // Remove event listener before discarding to avoid zombies
    this.nodes[i].dispatchEvent(new CustomEvent("cleanup"));
    this.nodes[i].removeEventListener("checkyourself");
    this.nodes[i].removeEventListener("cleanup");
    this.nodes.splice(i, 1);
    return true;
  };

  // Remove internal nodes based on selector or it's presence in the DOM
  BoomQuery.prototype.remove = function(selector) {
    var i;

    // Remove node based on selector or unique name provided
    if ( selector !== undefined ) {
      for ( i = this.nodes.length; i--; ) {
        if ( this.nodes[i].selector === selector ) {
          this._delete(i);
        }
      }
      // Make sure our selector map actually has selector before deleting
      // If we pass an ID of DOM node to delete, it won't be contained in our selector map
      if ( this.map.hasOwnProperty(selector) ) delete this.map[selector];
    // If a selector is not passed, let's remove the node if it is no longer in the DOM
    } else {
      for ( i = this.nodes.length; i--; ) {
        if ( !document.body.contains(this.nodes[i]) ) {
          this._delete(i);
        }
      }
    }
  };

  BoomQuery.prototype.get = function(selector) {
    // Loop through internal array of nodes
    for ( var i = this.nodes.length; i--; ) {
      if ( this.nodes[i].selector === selector ) {
        return this.nodes[i];
      }
    }
  };

  // Just logs the internal array of nodes for debug/inspection
  // You can specify which internal store you want to inspect: map or nodes
  BoomQuery.prototype.inspect = function(which) {
    if ( typeof console !== "undefined" ) {
      if ( which === 'map' ) console.log(this.map);
      else console.log(this.nodes);
    }
  };

  return new BoomQuery();

}));
