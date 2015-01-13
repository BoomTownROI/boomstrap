(function (Boomstrap) {
  'use strict';

  Boomstrap.filter('btCurrency', function ($filter, $locale) {
    var formats        = $locale.NUMBER_FORMATS;
    var currencyFilter = $filter('currency');

    return function(amount, currencySymbol) {
      amount = amount ? (amount * 1).toFixed(2) : 0.00;

      var value = currencyFilter(amount, currencySymbol);

      var parts = value.split(formats.DECIMAL_SEP);

      var dollar = parts[0];
      var cents  = parts[1] || '00';

      cents = cents.substring(0, 2) === '00' ? cents.substring(2) : '.' + cents;

      return dollar + cents;
    };
  });
})(angular.module('boomstrap'));
