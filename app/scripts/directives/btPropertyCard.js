(function(Boomstrap) {
  'use strict';
  Boomstrap.directive('btPropertyCard', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        property: '=',
        size: '@',
        onClickBestFit: '&',
        onClickFavs: '&'
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
      link: function(scope) {
        scope.onClickBestFit = scope.onClickBestFit || angular.noop;
        scope.onClickFavs    = scope.onClickFavs    || angular.noop;
        scope.isSmall        = scope.size === 'sm';
      }
    };
  });
})(angular.module('boomstrap'));