(function(Boomstrap) {
  'use strict';
  Boomstrap.directive('btPropertyCard', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        property: '=',
        size: '@'
      },
      templateUrl: 'template/property-card/bt-property-card.tpl.html',
      link: function(scope, element, attrs) {
        if (scope.size === 'sm') {
          scope.isSmall = true;
        }
      }
    };
  });
})(angular.module('boomstrap'));