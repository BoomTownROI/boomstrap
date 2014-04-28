(function(Boomstrap) {
  'use strict';

  /**
   * @ngdoc directive
   * @name boomstrap.directive:btAutoSubmit
   * @restrict A
   *
   * @description `btAutoSubmit` allows you to auto submit a form whenever the model of a form-field changes.
   * This directive requires the `ngForm` directive to also be present on the element.
   * 
   *
   * @requires $timeout
   * @requires ngForm
   * @param {expression} ngSubmit Fires upon timeout completion
   * @param {expression} btAutoSubmit If the `expression` is truthy then the `ngSubmit` expression will fire upon timeout
   * @param {Number} submitTimeout Number of milliseconds to wait after a model change before firing the `ngSubmit`
   * @param {expression} willLoad This directive will set the value supplied here to true when it has scheduled the timeout, but not fired it
   *
   * @example
     <doc:example module="boomstrap">
        <doc:source>
          <script>
            angular.module('boomstrap')
              .controller('subTest', function($scope) {
                $scope.willLoad = {
                  value: false
                };
                $scope.inputValue = 'Type here!';
                $scope.submit = function() {
                  $scope.delayedValue = $scope.inputValue;
                }
              });
          </script>
          <div ng-app="autoSubmitTest">
            <div ng-controller="subTest">
              <ng-form ng-submit="submit()" bt-auto-submit="true" submit-timeout="3000" will-load="willLoad">
                <input name="myName" ng-model="inputValue">
              </ng-form>
              <label ng-show="willLoad.value">I'm thinking...</label>
              <label ng-bind="delayedValue"></label>
            </div>
          </div>
        </doc:source>
      </doc:example> 
   */
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

})(angular.module('boomstrap'));