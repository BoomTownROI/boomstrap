(function(Boomstrap) {
  'use strict';

  Boomstrap.filter('capitalize', function() {
    return function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    };
  });
})(angular.module('boomstrap'));
