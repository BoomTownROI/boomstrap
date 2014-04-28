(function(Boomstrap) {
  'use strict';

  // http://stackoverflow.com/questions/19488884/angularjs-update-model-only-on-blur
  // http://plnkr.co/edit/mZyWw8?p=preview
  Boomstrap.directive('btNgModelOnblur', function ($analytics) {
    return {
      restrict: 'A',
      require: 'ngModel',
      priority: 1,
      link: function (scope, element, attrs, ngModel) {
        var analyticsName = '';

        var reportAnalyticsChange = function(value) {
          if (!value && value !== 0) {
            value = 'Empty';
          }

          $analytics.eventTrack(value, {
            category: 'BestFitLeads2.0',
            label: analyticsName + ' manual entry'
          });
        };

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
            reportAnalyticsChange(ngModel.$modelValue);

          });
        };
        element.off('input').off('keydown').off('change').on('blur', function() {
          update(false);
        }).on('keydown', function (e) {
          if (e.keyCode === 13) {
            update(true);
          }
        });

        // Code to set pristine on focus
        // .on('focus', function () {
        //   scope.$apply(function () {
        //     ngModel.$setPristine();
        //   });
        // })

        attrs.$observe('btNgModelOnblur', function(newVal, oldVal) {
          if (newVal !== oldVal) {
            analyticsName = newVal;
          }
        });

        // Remove bindings when the scope is destroyed
        scope.$on('$destroy', function() {
          element.unbind();
        });

      }
    };
  });
})(angular.module('Boomstrap'));