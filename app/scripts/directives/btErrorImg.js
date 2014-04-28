(function(Boomstrap) {
  'use strict';
  Boomstrap.directive('btErrorImg', function() {
    return {
      link: function(scope, element, attrs) {
        element.bind('error', function() {
          element.attr('src', attrs.btErrorImg);
        });
      }
    };
  });
})(angular.module('boomstrap'));