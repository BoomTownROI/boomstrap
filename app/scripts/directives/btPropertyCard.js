(function(Boomstrap) {
  'use strict';
  Boomstrap.directive('btPropertyCard', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        property: '='
      },
      templateUrl: 'template/property-card/bt-property-card.tpl.html',
      link: function(scope, element, attrs) {
        
      }
    };
  });
})(angular.module('boomstrap'));