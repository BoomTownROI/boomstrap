(function(Boomstrap) {
  'use strict';

  Boomstrap.directive('btRange', function($analytics, $window, $timeout) {
    var DEFAULT_DROPMIN = -1;
    var DEFAULT_DROPMAX = -1;

    return {
      restrict: 'E',
      require: 'ngModel',
      templateUrl: function(tElement, tAttrs) {
        // Set the template to number by default
        var templateUrl = 'template/range/bt-range-number.tpl.html';
        if (tAttrs && tAttrs.rangeType) {
          var rangeType = tAttrs.rangeType;
          if (rangeType === 'money') {
            templateUrl = 'template/range/bt-range-money.tpl.html';
          }
        }
        return templateUrl;
      },
      replace: true,
      scope: {
        header: '@',
        values: '='
      },
      link: function(scope, iElement, iAttrs, iCtrl) {
        scope.dropdown = {
          dropmin: DEFAULT_DROPMIN,
          dropmax: DEFAULT_DROPMAX
        };
        scope.minimum = iCtrl.$modelValue.minimum;
        scope.maximum = iCtrl.$modelValue.maximum;

        var $element = angular.element(iElement),
            windowEl = angular.element($window);

        var validateMinMax = function(flippingFn) {
          var valid = true;

          // Normalize values first
          if(!angular.isNumber(scope.minimum)) {
            scope.minimum = null;
          }
          if(!angular.isNumber(scope.maximum)) {
            scope.maximum = null;
          }

          if(scope.maximum !== null && scope.minimum !== null && scope.maximum < scope.minimum && flippingFn) {
            flippingFn();
          }

          // Ranges would formerly be invalid
          // if the minimum was greater than the maximum or if either was null
          // this is no longer the case
          return valid;
          // return valid && scope.minimum <= scope.maximum;
        };

        var setDropdownWidths = function() {
          scope.minDropdownWidth = $element.find('.range-min').outerWidth(true);
          scope.maxDropdownWidth = $element.find('.range-max').outerWidth(true);
          scope.inputWidth = $element.find('input').outerWidth(true);
        };
        setDropdownWidths();

        windowEl.on('resize.range', function() {
          scope.$apply(setDropdownWidths);
        });

        scope.$on('$destroy', function() {
          windowEl.off('resize.range');
        });

        scope.$watch(function() { return iCtrl.$modelValue.minimum; }, function(newVal, oldVal) {
          if (newVal !== oldVal) {
            scope.minimum = iCtrl.$modelValue.minimum;
          }
        });

        scope.$watch(function() { return iCtrl.$modelValue.maximum; }, function(newVal, oldVal) {
          if (newVal !== oldVal) {
            scope.maximum = iCtrl.$modelValue.maximum;
          }
        });

        // Do minimum and maximum validation here
        // We are separating minimum and maximum from the range object
        // So that we can have any watches on the range object fire only once
        scope.$watch('minimum', function(min, oldMin) {
          if (min !== oldMin) {
            iCtrl.$valid = validateMinMax(function() {
              // Pass in the flipping function if the min/max order is invalid.
              scope.maximum = scope.minimum;
            });
            iCtrl.$modelValue.minimum = scope.minimum;
            iCtrl.$setValidity('range', iCtrl.$valid);

            // Updating the view value will programmatically make this dirty
            // Only do this if we've just selected an item in the dropdown
            //  because typing in the field will set the dirty flag for us.
            if (angular.isDefined(oldMin) || scope.dropdown.dropmin !== DEFAULT_DROPMIN) {
              iCtrl.$setViewValue(iCtrl.$viewValue);
            }
          }
        });

        scope.$watch('maximum', function(max, oldMax) {
          if (max !== oldMax) {
            iCtrl.$valid = validateMinMax(function() {
              // Pass in the flipping function if the min/max order is invalid.
              scope.minimum = scope.maximum;
            });
            iCtrl.$modelValue.maximum = scope.maximum;
            iCtrl.$setValidity('range', iCtrl.$valid);

            // Updating the view value will programmatically make this dirty
            // Only do this if we've just selected an item in the dropdown
            //  because typing in the field will set the dirty flag for us.
            if (angular.isDefined(oldMax) || scope.dropdown.dropmax !== DEFAULT_DROPMAX) {
              iCtrl.$setViewValue(iCtrl.$viewValue);
            }
          }
        });

        scope.setDropMin = function(val) {
          var dropDownUsedBefore = scope.dropMinChanged;
          
          scope.dropMinChanged = true;
          scope.dropdown.dropmin = val;

          var updateValue = function() {
            var analyticsValue = 'No min';

            if(val === -1) {
              scope.minimum = null;
            } else {
              scope.minimum = /\./.test(val) ? parseFloat(val, 10) : parseInt(val, 10);
            }

            $analytics.eventTrack(analyticsValue, { category: 'BestFitLeads2.0', label: (scope.header || '') + ' min selection' });
          };

          // Timeout the first time so that bt-dirty triggers on change
          if (!dropDownUsedBefore) {
            $timeout(updateValue);
          } else {
            updateValue();
          }

        };

        scope.setDropMax = function(val) {
          var dropDownUsedBefore = scope.dropMaxChanged;

          scope.dropMaxChanged = true;
          scope.dropdown.dropmax = val;

          var updateValue = function() {
            var analyticsValue = 'No max';

            if (val === -1) {
              scope.maximum = null;
            } else {
              scope.maximum = /\./.test(val) ? parseFloat(val, 10) : parseInt(val, 10);
              analyticsValue = scope.maximum.toString();
            }

            $analytics.eventTrack(analyticsValue, { category: 'BestFitLeads2.0', label: (scope.header || '') + ' max selection' });
          };

          // Timeout the first time so that bt-dirty triggers on change
          if (!dropDownUsedBefore) {
            $timeout(updateValue);
          } else {
            updateValue();
          }

        };
      }
    };
  });
})(angular.module('boomstrap'));