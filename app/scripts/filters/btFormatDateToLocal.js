(function (Boomstrap) {
  'use strict';

  Boomstrap.filter('btFormatDateToLocal', function ($filter) {
    return function(utcDate) {
      return utcDate === null ? '' : $filter('date')(new Date(utcDate), "EEEE, MMMM d, y 'at' h:mma");
    };
  });
})(angular.module('boomstrap'));
