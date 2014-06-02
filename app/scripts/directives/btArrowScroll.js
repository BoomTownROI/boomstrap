(function(Boomstrap) {
  'use strict';

  /**
   * @ngdoc directive
   * @name  boomstrap.directive:btArrowScroll
   * @requires  $window
   * @restrict A
   *
   * @description The `btArrowScroll` attribute directive will direct all arrow key events to a specific element.
   * This is useful for modals in certain browsers.  Be careful using this as it will always be activated
   * so long as the element exists on the page.  Combine with ng-if to programmatically kill this functionality.
   *
   */
  Boomstrap.directive('btArrowScroll', function($window){
    return {
      restrict: 'A',
      scope: {
        distance: '@btArrowScroll'
      },
      link: function(scope, element) {
        var $windowEl = angular.element($window);
        var DEFAULT_SCROLL_DISTANCE = 50;
        var scrollDistance;

        var parseScroll = function(value) {
          var parsed;

          if (angular.isDefined(value)) {
            parsed = parseInt(value, 10);
            return isNaN(parsed) ? DEFAULT_SCROLL_DISTANCE : parsed;
          } else {
            return DEFAULT_SCROLL_DISTANCE;
          }
        };

        scrollDistance = parseScroll(scope.distance);

        scope.$watch('distance', function(newVal) {
          if (angular.isDefined(newVal) && newVal !== scrollDistance) {
            scrollDistance = parseScroll(newVal);
          }
        });

        $windowEl.on('keydown.arrowscroll', function(e) {
          var scroll;

          // Handle down key
          if (e.keyCode === 40) {

            scroll = element.scrollTop();

            if (scroll + scrollDistance < element[0].scrollHeight) {
              element.scrollTop(scroll + scrollDistance);
              e.preventDefault();
            } else if (scroll !== element[0].scrollHeight) {
              // Scroll to the bottom if we're less than the scroll distance
              element.scrollTop(element[0].scrollHeight);
            }
          } else if(e.keyCode === 38) {

            // Handle up key
            scroll = element.scrollTop();

            if (scroll - scrollDistance >= 0) {
              element.scrollTop(scroll - scrollDistance);
              e.preventDefault();
            } else if (scroll !== 0) {
              // Scroll to the top if we're less than the scroll distance
              element.scrollTop(0);
            }
          }
        });

        element.bind('$destroy', function() {
          $windowEl.off('keydown.arrowscroll');
        });
      }
    };
  });
})(angular.module('boomstrap'));