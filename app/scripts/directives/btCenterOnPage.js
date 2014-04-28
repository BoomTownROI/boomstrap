(function(Boomstrap) {
  'use strict';
  Boomstrap.directive('btCenterOnPage', function($window, $timeout) {
    return {
      restrict: 'A',
      link: function(scope, element) {
        var $element      = angular.element(element),
            windowEl      = angular.element($window);

        var centerElement = function() {
          var windowWidth   = windowEl.width(),
              windowHeight  = windowEl.height(),
              elementWidth  = $element.width(),
              elementHeight = $element.height();

          $element.css({
            top: Math.floor((windowHeight - elementHeight) / 2).toString() + 'px',
            left: Math.floor((windowWidth - elementWidth) / 2).toString() + 'px'
          });
        };

        $timeout(centerElement, 0);

        windowEl.on('resize.modal', centerElement);

        scope.$on('$destroy', function() {
          windowEl.off('resize.modal');
        });
      }
    };
  });
})(angular.module('Boomstrap'));