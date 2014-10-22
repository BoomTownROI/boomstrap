(function(Boomstrap) {
  'use strict';
  Boomstrap.directive('btDatePicker', function() {
    return {
      restrict: 'A',
      scope: {
        'date': '=btDatePicker'
      },
      link: function(scope, element) {
        element.bsDatepicker({
          dateFormat:'dd-MM-yyyy',
          todayHighlight: true,
          startDate: new Date(),
          language: 'en',
          pickTime: false,
          autoclose: true
        }).on('changeDate', function(e) {
          scope.$apply(function() {
            scope.date.value = e.date;
          });
        });

        scope.$on('$destroy', function() {
          element.bsDatepicker('remove');
        });
      }
    };
  });
})(angular.module('boomstrap'));