(function(Boomstrap) {
  'use strict';

  /**
   * @ngdoc directive
   * @name boomstrap.directive:btDropdown
   * @restrict A
   *
   * @description `btDropdown` allows you to create a dropdown based on an object. The keys of the object
   * are what is stored in the ngModel and the values are the visual representations in the dropdown.
   * 
   *
   * @requires ngModel
   * @param {Object} values Object containing the values for the dropdown.
   * @param {Boolean} keysAreNumbers Indicates that the keys of the `values` object are `Number`s.
   * This is used for sorting because by default iterating over an object will sort based on the string representation.
   * Thus, 10 will come before 2, etc...
   * @param {expression} onAssign Expression to call when a value is chosen from the dropdown.
   *
   * @example
     <doc:example module="boomstrap">
        <doc:source>
          <style>
            .dropdown-test .btn.dropdown-toggle {
              width: 140px;
            }

            .dropdown-test > div {
              margin-bottom: 30px;
            }

            .doc-example-live {
              background-color: #FFFFFF;
              margin-bottom: 100px;
            }
          </style>
          <script>
            angular.module('boomstrap')
              .controller('dropTest', function($scope) {
                $scope.stringValues = {
                  'A': 'Aardvark',
                  'B': 'Bear',
                  'C': 'Cat'
                };

                $scope.numValues = {
                  '-1': 'Sean',
                  '0': 'Mark',
                  '1': 'Christian',
                  '10': 'Craig',
                  '2': 'David'
                }

                $scope.numValue = '1';
                $scope.stringValue = 'A';


                $scope.assigned = function(value, translation) {
                  alert('The value is ' + value + ' and the translation is ' + translation);
                } 
              });
          </script>
          <div ng-controller="dropTest" class="dropdown-test">
            <div bt-dropdown values="stringValues" ng-model="stringValue"></div>
            <div bt-dropdown values="numValues" ng-model="numValue" keys-are-numbers="true"></div>
            <p>The next dropdown will throw an alert on save</p>
            <div bt-dropdown values="stringValues"
                ng-model="stringValue" on-assign="assigned(ddValue, ddTranslation)" ></div>
          </div>
        </doc:source>
      </doc:example> 
   */
  Boomstrap.directive('btDropdown', function($window) {
    return {
      restrict: 'A',
      require: 'ngModel',
      templateUrl: 'template/dropdown/bt-dropdown.tpl.html',
      replace: true,
      scope: {
        values: '=',
        keysAreNumbers: '=',
        onAssign: '&'
      },
      link: function(scope, iElement, iAttrs, ngModel) {
        var windowEl = angular.element($window);

        /* Because angular will only sort objects by their key and our key is
         * always a string representation, if we want to sort by numbers as a key
         * we need to transform the object into an array of objects in which the item we are sorting on
         * is the parseInt value of the key
         */
        var sortNumberKeys = function(objectValues) {
          var sortedArray = [];

          Object.keys(objectValues).forEach(function(key) {
            sortedArray.push({
              'key': key,
              'value': objectValues[key]
            });
          });

          sortedArray.sort(function (a, b) {
            return (parseInt(a.key, 10) > parseInt(b.key, 10));
          });
          return sortedArray;
        };

        if(scope.keysAreNumbers) {
          scope.arrayValues = sortNumberKeys(scope.values);
          scope.$watch('values', function(newValues, oldValues) {
            if(newValues && oldValues && newValues.length !== oldValues.length) {
              scope.arrayValues = sortNumberKeys(scope.values);
            }
          });
        }

        scope.assignValue = function(value) {
          scope.selectedValue = scope.values[value];

          // Trigger $dirty for ngModel
          ngModel.$setViewValue(value);

          // If the user has provided an `onAssign` expression
          // call it with the value, and the view representation
          if (scope.onAssign) {
            scope.onAssign({
              ddValue: value,
              ddTranslation: scope.selectedValue
            });
          }
        };

        scope.valuesLength = function() {
          return (scope.values && Object.keys(scope.values).length) || 0;
        };

        // Handle setting the width of the dropdown based on the width
        // of the overall box
        var setDropdownWidth = function() {

          // Woo jQuery dependency because of border-box, yeah!
          scope.dropdownWidth = angular.element(iElement[0].children[0]).outerWidth();
        };
        setDropdownWidth();

        windowEl.on('resize.dropdown', function() {
          scope.$apply(setDropdownWidth);
        });


        scope.$watch(function() {
          return ngModel.$modelValue;
        }, function(newVal, oldVal) {
          if (newVal !== oldVal || angular.isUndefined(scope.selectedValue)) {
            scope.selectedValue = scope.values[newVal] || '';
          }
        });

        // Deconstruction
        scope.$on('$destroy', function() {
          windowEl.off('resize.dropdown');
        });
      }
    };
  });
})(angular.module('boomstrap'));