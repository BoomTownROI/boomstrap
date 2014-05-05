(function(Boomstrap) {
  'use strict';

  /**
   * @ngdoc directive
   * @name  boomstrap.directive:btIFrame
   * @requires  $window
   * @restrict A
   *
   * @param {string} width Number value representing the width of the iFrame
   * @param {string} height Number value representing the height of the iFrame
   * @param {string} src The uri to the iFrame
   * @param {expression} closeFrame Expression to call when the iFrame has been closed internally.
   *
   * @description The `btIFrame` attribute directive allows the user to embed an iFrame with the ability
   * to communicate the iFrame closing back to Angular.  The iFrame must be on the same domain as
   * the calling code, and must implement a global function called registerClose, which takes a function
   * as an argument and sets a function internally to that function.  It is intended that that function
   * will be called when the iFrame wishes to close.
   *
   */
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
})(angular.module('boomstrap'));