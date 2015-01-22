(function (Boomstrap) {
  'use strict';

  Boomstrap.filter('btFormatDateToLocal', function ($filter) {
    return function(utcDate, params) {
      var formattedDate;
      var defaultFilter;

      if (utcDate) {
        utcDate = utcDate.replace(/Z$/, '') + 'Z';
        defaultFilter = params ? params : "EEEE, MMMM d, y 'at' h:mma";

        formattedDate = $filter('date')(utcDate, defaultFilter);
      }else{
        formattedDate = '';
      }

      return formattedDate;
    };
  });
})(angular.module('boomstrap'));
