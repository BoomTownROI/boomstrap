(function(PatternLibrary) {
  'use strict';
  PatternLibrary.controller('ChosenDemoCtrl', ['$scope', function($scope) {
    $scope.superheroes = [
      'Batman',
      'Superman',
      'Green Arrow',
      'Wonder Woman'
    ];
    $scope.superhero = 'Spiderman';
  }]);
})(angular.module('PatternLibrary'));