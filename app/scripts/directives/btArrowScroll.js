(function(Boomstrap) {
  'use strict';
  Boomstrap.directive('btArrowScroll', function($window){
    return {
      restrict: 'A',
      link: function(scope, element) {
        var $windowEl = angular.element($window);
        var scrollDistance = 50;

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