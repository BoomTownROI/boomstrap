(function(app) {
  'use strict';

  app.directive('plNav', [function() {
    return {
      restrict: 'A',
      templateUrl: 'template/nav.html',
      replace: true,
      link: function (scope, elem, attrs) {
        console.log("Linked plNav directive.");
      }
    };
  }]);
})(angular.module('PatternLibrary'));