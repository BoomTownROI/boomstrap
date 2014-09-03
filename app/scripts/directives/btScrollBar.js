(function(Boomstrap, baron) {
  'use strict';

  /**
   * @ngdoc directive
   * @name  boomstrap.directive:btScrollbar
   * @restrict EA
   *
   * @description
   * The `btScrollbar` directive adds a simulated scrollbar to any element.  It wraps the jQuery baron library.
   */
  Boomstrap.directive('btScrollbar', function($window) {
    return {
      restrict: 'EA',
      transclude: true,
      replace: true,
      templateUrl: 'template/scrollbar/bt-scrollbar.tpl.html',
      link: function(scope, element) {
        var $element = angular.element(element);

        var scroll = baron({
          root: element,
          scroller: '.baron-scroller',
          track: '.baron-scroller-track',
          bar: '.baron-scroller-bar',
          $: angular.element
        });
        // Seriously hacky. Need to add a subdirective for elements in the scrollbar that need to trigger the scroller update
        $element.on('click', function() {
          $window.setTimeout(function() {
            scroll.update();
          }, 400);
        });

        scope.$on('$destroy', function() {
          scroll.dispose();
        });
      }
    };
  });
})(angular.module('boomstrap'), window.baron);