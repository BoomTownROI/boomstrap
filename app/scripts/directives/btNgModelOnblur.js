(function(Boomstrap) {
  'use strict';

  /**
   * @ngdoc directive
   * @name  boomstrap.directive:btNgModelOnBlur
   * @requires ngModel
   * @restrict A
   *
   * @description The `btNgModelOnBlur` attribute directive when used with an input will only update the
   * ngModel when the user has left focus of the input or pressed the enter key. This directive will be
   * made redundant with the ngModelOptions directive in Angular 1.3
   *
   */
  Boomstrap.directive('btNgModelOnblur', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      priority: 1,
      link: function (scope, element, attrs, ngModel) {
        var analyticsName = '';

        var update = function (alwaysUpdate) {
          scope.$apply(function () {
            var elementValue = element.val().trim();

            if (!alwaysUpdate) {
              var modelEmpty = (angular.isUndefined(ngModel.$modelValue) || ngModel.$modelValue === null);
              // We don't care about blank values not changing
              if (modelEmpty) {
                if (elementValue === '') {
                  return;
                }
              } else {
                var normalizedValue = elementValue.replace(/[^.0-9]+/g, '');

                if (normalizedValue !== '') {
                  normalizedValue = /\./.test(normalizedValue) ? parseFloat(normalizedValue, 10) : parseInt(normalizedValue, 10);

                  // Check the numbers and if they're equal, abort!
                  if(normalizedValue === ngModel.$modelValue) {
                    return;
                  }
                }
              }
            }

            ngModel.$setViewValue(elementValue);
            ngModel.$render();
          });
        };
        element.off('input').off('keydown').off('change').on('blur', function() {
          update(false);
        }).on('keydown', function (e) {
          if (e.keyCode === 13) {
            update(true);
          }
        });

        // Remove bindings when the scope is destroyed
        scope.$on('$destroy', function() {
          element.unbind();
        });

      }
    };
  });
})(angular.module('boomstrap'));