(function(PatternLibrary) {
  'use strict';
  PatternLibrary.controller('TooltipDemoCtrl', ['$scope', function TabsDemoCtrl($scope) {
    $scope.tabs = [
      { title:"Dynamic Title 1", content:"Dynamic content 1" },
      { title:"Dynamic Title 2", content:"Dynamic content 2", disabled: true }
    ];

    $scope.alertMe = function() {
      setTimeout(function() {
        alert("You've selected the alert tab!");
      });
    };

    $scope.navType = 'pills';
  }]);
})(angular.module('PatternLibrary'));
