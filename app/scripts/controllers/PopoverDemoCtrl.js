(function(PatternLibrary) {
  'use strict';
  PatternLibrary.controller('PopoverDemoCtrl', ['$scope', function PopoverDemoCtrl($scope) {
    $scope.dynamicPopover = 'Hello, World!';
    $scope.dynamicPopoverTitle = 'Title';
  }]);
})(angular.module('PatternLibrary'));