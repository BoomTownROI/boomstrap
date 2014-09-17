(function(Boomstrap) {
  'use strict';

  /**
   * @ngdoc filter
   * @name phoneNumber
   *
   * @description The 'phoneNumberfilter' filter will format or unformat a phone number.
   * {{string|phoneNumber:'add'}} to format the number, {{string|phoneNumber:'remove'}}.
   *
   * @example
     $scope.string1 = '1234567890';
     <br />
     $scope.string2 = '123-456-7890';

     {{string1|phoneNumber:'add'}} // outputs (123) 456-7890
     <br />
     {{string2|phoneNumber:'remove'}} // outputs 1234567890
   */
  Boomstrap.filter('phoneNumber', function() {
    return function(string, params) {
      var number = string || '';
      var formattedNumber;
      var localPrefix;
      var localMain;
      var area;

      switch (params) {
        case 'remove':
          formattedNumber = number.replace(/\D/g, '');
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
