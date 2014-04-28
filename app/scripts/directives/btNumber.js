(function(Boomstrap) {
  Boomstrap.directive('btNumber', function() {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function(scope, iElement, iAttrs, modelCtrl) {
        modelCtrl.$parsers.push(function (data) {
          if (data) {
            // Basically, don't allow the user to type in anything other than a number or decimal
            var parsed = data.toString().replace(/[^0-9.]+/g, '');
            if (parsed) {
              parsed = /\./.test(data) ? parseFloat(data) : parseInt(data);
            }

            if(parsed != data){
              //Only update the view if the new view value is actually different
              modelCtrl.$setViewValue(parsed);
              modelCtrl.$render();
            }

            return parsed;
          }
          return data;
        });
      }
    };
  });
})(angular.module('Boomstrap'));