(function(boomstrap) {
  'use strict';
  boomstrap.controller('RelativeTimeCtrl', ['$scope', function($scope) {
    $scope.theDate = {
      timeString: moment(new Date()).subtract('days', 700),
      time: new Date()
    };
  }]);
})(angular.module('boomstrap'));
