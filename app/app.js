(function() {
  'use strict';

  angular.module('boomstrap', [
    'ui.bootstrap',
    'angular-chosen'
  ])
  .value('AUTO_START_TOUR', {
    value: false
  });
})();
