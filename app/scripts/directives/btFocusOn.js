(function(Boomstrap) {
  'use strict';
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
})(angular.module('Boomstrap'));