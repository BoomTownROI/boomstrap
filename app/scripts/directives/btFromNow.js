(function(Boomstrap) {
  'use strict';
  Boomstrap.directive('btFromNow', function() {
    return {
      restrict: 'E',
      scope: {
        date: '='
      },
      replace: true,
      template: '<span class="bt-from-now">{{ fromNow }}</span>',
      link: function(scope, element, attrs) {
        scope.fromNow = moment(scope.date).fromNow();
      }
    };
  });
})(angular.module('boomstrap'));