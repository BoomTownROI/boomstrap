(function(Boomstrap) {
  'use strict';
  Boomstrap.directive('btCategory', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        category: '@',
        width: '@'
      },
      template: '<span class="cat cat-{{ category | lowercase }}">{{ category | capitalize }}</span>',
      link: function(scope, element, attrs) {
        // lala
      }
    };
  });
})(angular.module('boomstrap'));
