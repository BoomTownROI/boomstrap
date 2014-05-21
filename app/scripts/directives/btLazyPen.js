(function(Boomstrap) {
  'use strict';

  /**
   * @ngdoc directive
   * @name  boomstrap.directive:lazyPen
   * @restrict E
   *
   * @description Lazy loads a CodePen iframe
   */
  Boomstrap.directive('btLazyPen', function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        height: '@',
        themeId: '@',
        slug: '@',
        userId: '@',
        author: '@'
      },
      templateUrl: 'template/btLazyPen/btLazyPen.tpl.html',
      link: function(scope, element) {
        scope.showingPen = { value: false };
      }
    };
  });
})(angular.module('boomstrap'));