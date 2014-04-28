(function(Boomstrap) {
  'use strict';
  Boomstrap.directive('btIFrame', function($window) {
    $window.iFrameCloseRegister = function() {};

    return {
      template: '<iframe ng-src="{{src}}" width="{{width}}" height="{{height}}" seamless onload="window.iFrameCloseRegister()"></iframe>',
      restrict: 'A',
      scope: {
        width: '@',
        height: '@',
        src: '=',
        closeFrame: '&'
      },
      link: function(scope, element) {

        $window.iFrameCloseRegister = function() {
          if (element.children()[0] && element.children()[0].contentWindow &&
            element.children()[0].contentWindow.registerClose) {
            element.children()[0].contentWindow.registerClose(function() {
              scope.closeFrame();
            });
          }
        };

        scope.$on('$destroy', function() {
          $window.iFrameCloseRegister = function() { };
        });
      }
    };
  });
})(angular.module('Boomstrap'));