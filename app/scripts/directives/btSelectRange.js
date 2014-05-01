(function(Boomstrap) {
  'use strict';

  Boomstrap.directive('btSelectRange', function() {
    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: function(tElement, tAttrs) {
        // Set the template to number by default
        var templateUrl = 'template/select-range/number.tpl.html';
        if (tAttrs && tAttrs.rangeType) {
          var rangeType = tAttrs.rangeType;
          if (rangeType === 'money') {
            templateUrl = 'template/select-range/money.tpl.html';
          }
        }
        return templateUrl;
      },
      replace: true,
      scope: {
        values: '=',
        minPlaceholder: '@',
        maxPlaceholder: '@'
      },
      link: function(scope, iElement, iAttrs, ngModel) {
        scope.minimum = {
          value: ngModel.$modelValue.minimum
        };
        scope.maximum = {
          value: ngModel.$modelValue.maximum
        };

        scope.minPlaceholder = scope.minPlaceholder || 'Select a minimum value';
        scope.maxPlaceholder = scope.maxPLaceholder || 'Select a maximum value';

        var validateMinMax = function(flippingFn) {
          // Normalize values first
          if(!angular.isNumber(scope.minimum.value)) {
            scope.minimum.value = null;
          }
          if(!angular.isNumber(scope.maximum.value)) {
            scope.maximum.value = null;
          }

          if(scope.maximum.value !== null && scope.minimum.value !== null && scope.maximum.value < scope.minimum.value && flippingFn) {
            flippingFn();
          }
        };

        var addValueToValues = function(value, collection) {
          if (value) {
            var parsedValue = value.replace(/[^0-9\.]+/, '');
            parsedValue = parseInt(parsedValue, 10);
            if (!isNaN(parsedValue) && collection.indexOf(parsedValue) === -1) {
              collection.unshift(parsedValue);
            }
          }
        };

        scope.$watch(function() { return ngModel.$modelValue.minimum; }, function(newVal, oldVal) {
          if (scope.minimum.value !== ngModel.$modelValue.minimum) {
            scope.minimum.value = ngModel.$modelValue.minimum;
          }
        });

        scope.$watch(function() { return ngModel.$modelValue.maximum; }, function(newVal, oldVal) {
          if (scope.maximum.value !== ngModel.$modelValue.maximum) {
            scope.maximum.value = ngModel.$modelValue.maximum;
          }
        });

        scope.$watch('minimum.value', function(newMin, oldMin) {
          if (newMin !== oldMin) {
            validateMinMax(function() {
              // Pass in the flipping function if the min/max order is invalid.
              scope.maximum.value = scope.minimum.value;
            });
            addValueToValues(scope.minimum.value);

            ngModel.$modelValue.minimum = scope.minimum.value;
            ngModel.$setViewValue(ngModel.$viewValue);
          }
        });

        scope.$watch('maximum.value', function(newMax, oldMax) {
          if (newMax !== oldMax) {
            validateMinMax(function() {
              // Pass in the flipping function if the min/max order is invalid.
              scope.minimum.value = scope.maximum.value;
            });
            addValueToValues(scope.maximum.value);

            ngModel.$modelValue.maximum = scope.maximum.value;
            ngModel.$setViewValue(ngModel.$viewValue);
          }
        });

        scope.getValues = function(value) {
          var newValues = scope.values.slice();
          var parsedValue;

          addValueToValues(value, newValues);

          return newValues;
        };
      }
    };
  });
})(angular.module('boomstrap'));