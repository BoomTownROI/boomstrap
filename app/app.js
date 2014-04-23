(function() {
  'use strict';

  angular.module('PatternLibrary', [
    'ui.bootstrap',
    'angular-chosen'
  ])
  .value('AUTO_START_TOUR', {
    value: false
  });
})();
