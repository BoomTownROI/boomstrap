(function(Boomstrap) {
  'use strict';

  /**
   * @ngdoc directive
   * @name  boomstrap.directive:btCenterOnPage
   * @requires  $window
   * @requires  $timeout
   * @restrict A
   *
   * @description The `btCenterOnPage` attribute directive will add a top and left to an element
   * such that it is absolutely centered on the page.  This is mostly used for Modals.
   */
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
})(angular.module('boomstrap'));