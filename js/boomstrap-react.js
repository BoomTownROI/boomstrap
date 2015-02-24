!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.BoomStrapReact=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
  Common: require('./Common/App.jsx')
};

},{"./Common/App.jsx":2}],2:[function(require,module,exports){
module.exports = {
  Components: require('./Components/App.js')
};

},{"./Components/App.js":3}],3:[function(require,module,exports){
module.exports = {
  Fauxbox: require('./Fauxbox.jsx')
};

},{"./Fauxbox.jsx":4}],4:[function(require,module,exports){
'use strict';

var React = require('react/addons');
var cx    = React.addons.classSet;

module.exports = React.createClass({
  displayName: 'Fauxbox',

  propTypes: {
    boxID:      React.PropTypes.string,
    boxClass:   React.PropTypes.string,
    labelClass: React.PropTypes.string,
    checked:    React.PropTypes.bool.isRequired,
    onClick:    React.PropTypes.func,
    inline:     React.PropTypes.bool,
    label:      React.PropTypes.node
  },

  render: function() {
    var fauxboxClasses = {
      'fauxbox': true,
      'fauxbox-inline': !!this.props.inline
    };
    if (this.props.boxClass) {
      fauxboxClasses[this.props.boxClass] = true;
    }

    var fauxboxClass = cx(fauxboxClasses);
    var labelClass = this.props.labelClass || '';

    return (
      React.createElement("div", {className: fauxboxClass}, 
      React.createElement("input", {
        type: "checkbox", 
        id: this.props.boxID, 
        checked: this.props.checked, 
        readOnly: true, 
        onClick: this.props.onClick}), 
        React.createElement("label", {className: labelClass, htmlFor: this.props.boxID}, this.props.label)
      )
    );
  }
});

},{"react/addons":undefined}]},{},[1])(1)
});