(function() {
  'use strict';

  angular.module('boomstrap', [
    'ui.bootstrap',
    'ui.select',
    'angular-chosen',
    'angularMoment',
    'perfect_scrollbar'
  ])
  .value('AUTO_START_TOUR', {
    value: false
  })
  .config(function(uiSelectConfig) {
    uiSelectConfig.theme = 'bootstrap';
  });

  angular.module('ui.bootstrap')
  .config(function($provide) {
    $provide.decorator('pagerDirective', function($delegate) {
      var defaultUrl = $delegate[0].templateUrl;
      $delegate[0].templateUrl = function(tElement, tAttrs) {
        return tAttrs.templateUrl || defaultUrl;
      };

      return $delegate;
    });
  });
})();
