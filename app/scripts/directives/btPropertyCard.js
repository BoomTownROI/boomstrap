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
      templateUrl: function(el, attrs) {
        var template = '';
        if (attrs.size === 'sm') {
          template = 'template/property-card/bt-property-card-sm.tpl.html';
        } else {
          template = 'template/property-card/bt-property-card.tpl.html';
        }
        return template;
      },
      link: function(scope, element, attrs) {
        if (scope.size === 'sm') {
          scope.isSmall = true;
        }
      }
    };
  });
})(angular.module('boomstrap'));