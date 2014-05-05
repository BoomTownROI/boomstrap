(function(Boomstrap) {
  'use strict';

  /**
   * @ngdoc directive
   * @name  boomstrap.directive:btFormatMoney
   * @requires  $window
   * @requires  ngModel
   * @restrict A
   *
   * @description The `btFormatMoney` attribute directive will format the ngModel of the element it
   * is placed on.  The view will be in currency format $XXX,XXX with no decimal, and the model will
   * be stored as a Number.
   */
  Boomstrap.directive('btFormatMoney', function($filter) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, ele, attrs, ctrl) {

        var formatCurrency = function(input) {
          var currency = $filter('currency')(input);
          return currency.split('.')[0];
        };

        ctrl.$parsers.push(function(data) {
          //convert data from view format to model format
          var parsed;
          if(data) {
            parsed = parseInt(data.replace(/[^0-9]+/g,""));
            if(isNaN(parsed)) {
              parsed = null;
            }
          } else {
            parsed = null;
          }

          //Force an update of the view value because angular is too smart to trigger $parsers a second time
          var newViewValue;
          if (parsed) {
            newViewValue = formatCurrency(parsed);
          } else {
            newViewValue = null;
          }
          if(newViewValue != data) ctrl.$setViewValue(newViewValue); //Only update the view (which triggers $parsers) if the new view value is actually different
          ctrl.$render();

          return parsed; //converted value goes to the model
        });

        ctrl.$formatters.push(function(data) {
          //convert data from model format to view format
          if (data === null) {
            return null;
          }
          return formatCurrency(data); //converted value goes to the view
        });
      }
    };
  });
})(angular.module('boomstrap'));