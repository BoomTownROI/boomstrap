(function(Boomstrap) {
  'use strict';

  /**
   * @ngdoc directive
   * @name  boomstrap.directive:btFocusOn
   * @requires  $timeout
   * @restrict A
   *
   * @param {expression} btFocusOn Expression that will be evaluated to truthy or falsey.
   * If this expression goes from falsey to truthy, focus will be placed on the element
   *
   * @description The `btFocusOn` attribute directive will focus on an input when the expression provided
   * goes from false to true.  This is helpful when guiding the user through a page.
   */
  Boomstrap.directive('btFocusOn', function($timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {

        var currentValue = {
          value: false
        };

        attrs.$observe('btFocusOn', function(newValue) {

          if(angular.isDefined(newValue)) {
            var newValBool = scope.$eval(newValue);

            // We are going from false to true
            if (!currentValue.value && newValBool) {
              
              // Defer to next digest loop
              // For cases of ng-show on an element
              // So that ng-show happens first
              $timeout(function() {
                element[0].focus();
              });
            }

            currentValue.value = newValBool;
          }
        });

      }
    };
  });
})(angular.module('boomstrap'));