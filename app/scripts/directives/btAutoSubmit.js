(function(Boomstrap) {
  'use strict';

  Boomstrap.directive('btAutoSubmit', function($timeout) {
    return {
      require: 'form',
      restrict: 'A',
      scope: {
        'ngSubmit': '&',
        'shouldAutoSubmit': '=btAutoSubmit',
        'submitTimeout': '@',
        'willLoad': '='
      },
      link: function(scope, iElement, iAttrs, iCtrl) {
        var autoSubmit = parseInt(scope.submitTimeout, 10);
        var submitTimeout = $timeout(function() {}, 0);

        var triggerTimeout = function() {
          iCtrl.$setPristine();
          $timeout.cancel(submitTimeout);

          scope.willLoad.value = true;

          submitTimeout = $timeout(function() {
            scope.willLoad.value = false;
            if (iCtrl.$valid) {
              scope.ngSubmit({});
              iCtrl.$setPristine();
            }
          }, autoSubmit);
        };

        scope.$watch(function() {
          return iCtrl.$valid && iCtrl.$dirty;
        }, function(val, oldVal) {
          // We can programmatically determine when the form should auto submit
          if (scope.shouldAutoSubmit) {
            // If the form is both dirty and valid
            // Start the clock for submission
            if(val !== oldVal && val) {
              triggerTimeout();
            }
          } else {
            iCtrl.$setPristine();
          }

        });

        // If we've updated our focus to a new field, cancel the timeout
        // scope.$on('formField:inFocus', function() {
        //   scope.$apply(function() {
        //     // Remove willLoad state
        //     if (loadingService.willLoad.value) loadingService.willLoad.value = false;

        //     // Cancel any existing form submissions
        //     $timeout.cancel(submitTimeout);
        //     // Set pristine again so the next field that dirties will re-trigger timeout
        //     iCtrl.$setPristine();
        //   });
        // });
      }

    };

  });

})(angular.module('Boomstrap'));