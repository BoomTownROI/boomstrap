(function(Boomstrap) {
  'use strict';

  Boomstrap.directive('btDropdown', function($window) {
    return {
      restrict: 'A',
      require: 'ngModel',
      // The wrapping span is so that bt-dirty and bt-dropdown
      // are not on the same node as they conflict
      templateUrl: 'template/dropdown/bt-dropdown.tpl.html',
      replace: true,
      scope: {
        values: '=',
        numberValues: '=',
        onAssign: '&'
      },
      link: function(scope, iElement, iAttrs, ngModel) {
        scope.dropdownChanged = false;

        var windowEl = angular.element($window);

        /* Because angular will only sort objects by their key and our key is
         * always a string representation, if we want to sort by numbers as a key
         * we need to transform the object into an array of objects in which the item we are sorting on
         * is the parseInt value of the key
         */
        var sortNumberValues = function(objectValues) {
          var sortedArray = [];

          angular.forEach(objectValues, function(item, key) {
            sortedArray.push({
              'key': key,
              'value': item
            });
          });

          sortedArray.sort(function (a, b) {
            return (parseInt(a.key, 10) > parseInt(b.key, 10));
          });

          return sortedArray;
        };
        scope.arrayValues = sortNumberValues(scope.values);

        if(scope.numberValues) {
          scope.$watch('values', function(newValues, oldValues) {
            if(newValues && oldValues && newValues.length !== oldValues.length) {
              scope.arrayValues = sortNumberValues(scope.values);
            }
          });
        }

        scope.assignValue = function(value) {
          scope.selectedValue = scope.values[value];

          ngModel.$setViewValue(value); // Trigger dirty
          scope.dropdownChanged = true; // Trigger bt-dirty

          if (scope.onAssign) {
            scope.onAssign({
              ddValue: value,
              ddTranslation: scope.selectedValue
            });
          }
        };

        scope.valuesLength = function() {
          return (scope.values && _.keys(scope.values).length) || 0;
        };

        var setDropdownWidth = function() {
          scope.dropdownWidth = angular.element(iElement[0].children[0].children[0]).width();
        };
        setDropdownWidth();

        windowEl.on('resize.dropdown', function() {
          scope.$apply(setDropdownWidth);
        });

        scope.$on('$destroy', function() {
          windowEl.off('resize.dropdown');
        });

        var initialized = scope.$watch(function() { return ngModel.$modelValue; }, function(newVal, oldVal) {
          // Sometimes two $modelValue changes happen before a digest loop occurs
          // If we have yet to set a selectedValue, but newVal is truthy, go ahead and set it
          if (newVal !== oldVal || (angular.isUndefined(scope.selectedValue) && (newVal || newVal === ''))) {
            scope.selectedValue = scope.values[ngModel.$modelValue];
            initialized();

            // Now we can set up the watch for when an external force changes the model
            scope.$watch(function() {
              return ngModel.$modelValue;
            }, function(newVal, oldVal) {
              if (newVal !== oldVal && newVal && !angular.isUndefined(scope.selectedValue) && newVal !== scope.selectedValue) {
                scope.selectedValue = scope.values[newVal];
              }
            });

          }
        });
      }
    };
  });
})(angular.module('boomstrap'));