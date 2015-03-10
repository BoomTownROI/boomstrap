(function(Boomstrap) {
  'use strict';

  Boomstrap.filter('btPhoneNumber', function() {
    return function(string, params) {
      var number = string || '';
      var formattedNumber;
      var localPrefix;
      var localMain;
      var area;

      switch (params) {
        case 'remove':
          formattedNumber = number.replace(/\D/g, '');

          if (formattedNumber.length > 10 && formattedNumber.indexOf('1') === 0) {
            formattedNumber = formattedNumber.substring(1);
          }
          break;
        case 'add':
          number = number.replace(/\D/g, '');

          area        = number.substring(0, 3);
          localPrefix = number.substring(3, 6);
          localMain   = number.substring(6);

          formattedNumber = '(' + area + ') ' + localPrefix + '-' + localMain;
          break;
        default:
          formattedNumber = string;
          break;
      }

      return formattedNumber;
    };
  });
})(angular.module('boomstrap'));
