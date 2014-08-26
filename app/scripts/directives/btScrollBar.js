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
  Boomstrap.directive('btScrollbar', function() {
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

        $element.on('resize', function() {
          scroll.update();
        });

        scope.$on('$destroy', function() {
          scroll.dispose();
        });
      }
    };
  });
})(angular.module('boomstrap'), window.baron);
