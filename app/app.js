(function() {
  'use strict';

  angular.module('boomstrap', [
    'ui.bootstrap',
    'ui.select',
    'angularMoment'
  ])
  .value('AUTO_START_TOUR', {
    value: false
  })
  .config(function(uiSelectConfig) {
    uiSelectConfig.theme = 'bootstrap';
  })
  .config( ['$provide', function ($provide){
    // URL change listeners interact with React/SPA when doing pushState url changes
    // So we need to remove the offending methods here, iff we're on the SPA page
    var href = window.location.href || '';
    var isSPA = href.indexOf('/app/') >= 0;
    if (isSPA) {
      $provide.decorator('$browser', ['$delegate', function ($delegate) {
        $delegate.url = function () { return ''; };
        return $delegate;
      }]);
    }
  }]);

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
