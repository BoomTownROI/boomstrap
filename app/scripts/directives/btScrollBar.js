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
        var $element  = angular.element(element);
        var $scroller = $element.find('.baron-scroller')[0];

        var scroll = baron({
          root: element,
          scroller: '.baron-scroller',
          track: '.baron-scroller-track',
          bar: '.baron-scroller-bar',
          $: angular.element
        });
        // Seriously hacky. Need to add a subdirective for elements in the scrollbar that need to trigger the scroller update
        // And need to bind a more generic event. Here we only update on click.
        $element.on('click', function() {
          $window.setTimeout(function() {
            scroll.update();
          }, 400);
          if ($scroller.scrollHeight <= $scroller.clientHeight) {
            $element[0].classList.remove('baron');
          } else {
            if (!$element[0].classList.contains('baron')) {
              $element[0].classList.add('baron');
            }
          }
        });

        scope.$on('$destroy', function() {
          scroll.dispose();
        });
      }
    };
  });
})(angular.module('boomstrap'), window.baron);
